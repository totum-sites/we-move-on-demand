import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import {
  ADDRESS,
  LEAD_FROM_EMAIL,
  LEAD_TO_EMAIL,
  PHONE_LABEL,
  PHONE_TEL,
  SITE_URL,
} from '../src/lib/constants';

type QuotePayload = {
  name?: string;
  phone?: string;
  email?: string;
  movingDate?: string;
  fromZip?: string;
  toZip?: string;
  smsConsent?: boolean;
  source?: string;
};

const TO_EMAIL = process.env.LEAD_TO_EMAIL || LEAD_TO_EMAIL;
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || LEAD_FROM_EMAIL;
const FROM_NAME = 'We Move On Demand';

const ALLOWED_ORIGINS = new Set([
  SITE_URL,
  'https://www.wemoveondemand.com',
  'http://localhost:3000',
  'http://localhost:5173',
]);

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

function getRequestIp(req: VercelRequest): string | undefined {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded)) {
    return forwarded[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  entry.count += 1;
  return true;
}

function setCorsHeaders(req: VercelRequest, res: VercelResponse): void {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function maskName(name: string): string {
  if (name.length <= 2) return '*';
  return `${name[0]}${'*'.repeat(name.length - 2)}${name[name.length - 1]}`;
}

function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length <= 4) return '****';
  return `****${digits.slice(-4)}`;
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '****';
  const maskedLocal = local.length <= 2 ? '**' : `${local.slice(0, 2)}***`;
  return `${maskedLocal}@${domain}`;
}

function buildLeadHtml(payload: {
  name: string;
  phone: string;
  email: string;
  movingDate: string;
  fromZip: string;
  toZip: string;
  smsConsent: boolean;
  source: string;
  receivedAt: string;
}): string {
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#F3F3F1;">
      <div style="background:#fff;border-radius:16px;padding:28px;">
        <h2 style="color:#a02135;margin:0 0 16px;font-size:22px;">New Quote Request</h2>
        <p style="color:#666;margin:0 0 20px;font-size:13px;">Submitted from <b>${escapeHtml(payload.source)}</b> at ${escapeHtml(payload.receivedAt)}</p>
        <table style="width:100%;border-collapse:collapse;font-size:15px;color:#0A0A0A;">
          <tr><td style="padding:8px 0;color:#888;width:130px;">Name</td><td><b>${escapeHtml(payload.name)}</b></td></tr>
          <tr><td style="padding:8px 0;color:#888;">Phone</td><td><a href="tel:${escapeHtml(payload.phone)}" style="color:#a02135;text-decoration:none;"><b>${escapeHtml(payload.phone)}</b></a></td></tr>
          <tr><td style="padding:8px 0;color:#888;">Email</td><td>${payload.email ? `<a href="mailto:${escapeHtml(payload.email)}" style="color:#a02135;text-decoration:none;">${escapeHtml(payload.email)}</a>` : '<span style="color:#bbb;">—</span>'}</td></tr>
          ${payload.movingDate ? `<tr><td style="padding:8px 0;color:#888;">Moving Date</td><td>${escapeHtml(payload.movingDate)}</td></tr>` : ''}
          ${payload.fromZip ? `<tr><td style="padding:8px 0;color:#888;">From ZIP</td><td>${escapeHtml(payload.fromZip)}</td></tr>` : ''}
          ${payload.toZip ? `<tr><td style="padding:8px 0;color:#888;">To ZIP</td><td>${escapeHtml(payload.toZip)}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#888;">SMS Consent</td><td><b>${payload.smsConsent ? 'Yes' : 'No'}</b></td></tr>
        </table>
      </div>
      <p style="color:#999;font-size:12px;text-align:center;margin-top:16px;">wemoveondemand.com</p>
    </div>
  `;
}

function buildLeadText(payload: {
  name: string;
  phone: string;
  email: string;
  movingDate: string;
  fromZip: string;
  toZip: string;
  smsConsent: boolean;
  source: string;
  receivedAt: string;
}): string {
  return (
    `New Quote Request\n` +
    `Source: ${payload.source}\nReceived: ${payload.receivedAt}\n\n` +
    `Name:  ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email || '—'}\n` +
    (payload.movingDate ? `Moving Date: ${payload.movingDate}\n` : '') +
    (payload.fromZip ? `From ZIP: ${payload.fromZip}\n` : '') +
    (payload.toZip ? `To ZIP: ${payload.toZip}\n` : '') +
    `SMS Consent: ${payload.smsConsent ? 'Yes' : 'No'}\n`
  );
}

function buildAutoReplyHtml(name: string): string {
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#F3F3F1;">
      <div style="background:#ffffff;border-radius:24px;padding:40px 32px;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <img src="${SITE_URL}/images/logo-color.png" alt="We Move On Demand" style="height:48px;width:auto;margin-bottom:28px;" />

        <h2 style="color:#0A0A0A;margin:0 0 16px;font-size:24px;font-weight:700;letter-spacing:-0.02em;">Thank You, ${escapeHtml(name)}!</h2>

        <p style="color:#6b7280;margin:0 0 24px;font-size:16px;line-height:1.6;">
          We have received your quote request and truly appreciate you considering <strong style="color:#0A0A0A;">We Move On Demand</strong> for your upcoming move here in sunny Florida.
        </p>

        <div style="background:#F3F3F1;border-radius:16px;padding:24px;margin:24px 0;text-align:left;">
          <p style="color:#0A0A0A;margin:0 0 12px;font-size:15px;font-weight:600;">What happens next?</p>
          <ul style="color:#6b7280;margin:0;padding-left:20px;font-size:15px;line-height:1.7;">
            <li>Our team is reviewing your request right now.</li>
            <li>We will reach out to you shortly — usually within <strong style="color:#0A0A0A;">a few hours</strong> during business hours.</li>
            <li>We will discuss your moving details and provide a transparent, no-hidden-fee quote.</li>
          </ul>
        </div>

        <p style="color:#6b7280;margin:0 0 24px;font-size:16px;line-height:1.6;">
          If your move is urgent, feel free to call us directly and mention your quote request.
        </p>

        <a href="${PHONE_TEL}" style="display:inline-flex;align-items:center;gap:8px;background:#a02135;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:9999px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">
          Call ${PHONE_LABEL}
        </a>

        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e7eb;">
          <p style="color:#9ca3af;margin:0 0 4px;font-size:13px;">Licensed & Insured · BBB A+ Rated</p>
          <p style="color:#9ca3af;margin:0;font-size:12px;">${ADDRESS}</p>
        </div>
      </div>

      <p style="color:#9ca3af;font-size:12px;text-align:center;margin-top:20px;">
        This is an automated message from We Move On Demand.<br/>
        Please do not reply directly to this email.
      </p>
    </div>
  `;
}

function buildAutoReplyText(name: string): string {
  return (
    `Thank You, ${name}!\n\n` +
    `We have received your quote request and truly appreciate you considering We Move On Demand for your upcoming move here in sunny Florida.\n\n` +
    `What happens next?\n` +
    `- Our team is reviewing your request right now.\n` +
    `- We will reach out to you shortly — usually within a few hours during business hours.\n` +
    `- We will discuss your moving details and provide a transparent, no-hidden-fee quote.\n\n` +
    `If your move is urgent, feel free to call us directly at ${PHONE_LABEL} and mention your quote request.\n\n` +
    `We Move On Demand\n` +
    `Licensed & Insured · BBB A+ Rated\n` +
    `${ADDRESS}\n\n` +
    `This is an automated message. Please do not reply directly to this email.`
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    return res.status(415).json({ ok: false, error: 'Content-Type must be application/json' });
  }

  const ip = getRequestIp(req);
  if (ip && !checkRateLimit(ip)) {
    return res.status(429).json({ ok: false, error: 'Too many requests. Please try again later.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[quote] Missing RESEND_API_KEY env var');
    return res.status(500).json({ ok: false, error: 'Email service not configured' });
  }

  const body = (typeof req.body === 'string' ? safeParse(req.body) : req.body) as QuotePayload;
  if (!body) return res.status(400).json({ ok: false, error: 'Invalid JSON body' });

  const name = (body.name || '').trim().slice(0, 100);
  const phone = (body.phone || '').trim().slice(0, 30);
  const email = (body.email || '').trim().slice(0, 254);
  const movingDate = (body.movingDate || '').trim().slice(0, 30);
  const fromZip = (body.fromZip || '').trim().slice(0, 10);
  const toZip = (body.toZip || '').trim().slice(0, 10);
  const smsConsent = body.smsConsent === true;
  const source = (body.source || 'website').trim().slice(0, 50);

  if (!name || name.length < 2) return res.status(400).json({ ok: false, error: 'Name is required' });
  if (!phone || !isValidPhone(phone)) return res.status(400).json({ ok: false, error: 'Valid phone is required' });
  if (!smsConsent) return res.status(400).json({ ok: false, error: 'SMS consent is required' });
  if (email && !isValidEmail(email)) return res.status(400).json({ ok: false, error: 'Invalid email' });

  const receivedAt = new Date().toISOString();

  // Structured log = backup of every lead, but with PII masked.
  console.log(
    '[lead]',
    JSON.stringify({
      receivedAt,
      source,
      name: maskName(name),
      phone: maskPhone(phone),
      email: email ? maskEmail(email) : undefined,
      movingDate,
      fromZip,
      toZip,
      smsConsent,
    })
  );

  const resend = new Resend(apiKey);

  // 1. Send lead notification to owner
  const leadHtml = buildLeadHtml({ receivedAt, source, name, phone, email, movingDate, fromZip, toZip, smsConsent });
  const leadText = buildLeadText({ receivedAt, source, name, phone, email, movingDate, fromZip, toZip, smsConsent });

  try {
    const { error: leadError } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email || undefined,
      subject: `New Lead — ${name} (${phone})`,
      html: leadHtml,
      text: leadText,
    });

    if (leadError) {
      console.error('[quote] Lead email error', leadError);
      return res.status(502).json({ ok: false, error: 'Failed to send lead notification' });
    }
  } catch (err) {
    console.error('[quote] Lead email unexpected error', err);
    return res.status(500).json({ ok: false, error: 'Unexpected server error' });
  }

  // 2. Send auto-reply confirmation to customer (if email provided)
  if (email) {
    try {
      const { error: replyError } = await resend.emails.send({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [email],
        subject: 'We Received Your Quote Request — We Move On Demand',
        html: buildAutoReplyHtml(name),
        text: buildAutoReplyText(name),
      });

      if (replyError) {
        console.error('[quote] Auto-reply error', replyError);
        // Don't fail the request if auto-reply fails; lead was already saved
      }
    } catch (err) {
      console.error('[quote] Auto-reply unexpected error', err);
      // Don't fail the request if auto-reply fails
    }
  }

  // TODO: forward to upixel.app CRM webhook when credentials provided.

  return res.status(200).json({ ok: true });
}

function safeParse(s: string): QuotePayload | null {
  try { return JSON.parse(s); } catch { return null; }
}
