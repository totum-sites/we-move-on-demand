# We Move On Demand — Website

React 19 + Vite + TypeScript site for We Move On Demand, deployed on Vercel.

## Lead capture (Fase 1 — DONE)

All "Request a Quote" / "Free Estimate" forms POST to the Vercel serverless function
[`api/quote.ts`](api/quote.ts), which sends the lead via **Resend** to `move@wemoveondemand.com`
and logs it as a structured `[lead]` JSON line in Vercel logs (backup).

Forms wired:
- [src/sections/Hero.tsx](src/sections/Hero.tsx) — desktop quick form
- [src/sections/Hero.tsx](src/sections/Hero.tsx) — mobile quick form
- [src/sections/FreeEstimate.tsx](src/sections/FreeEstimate.tsx) — full form section

Shared submit hook: [src/hooks/useQuoteSubmit.ts](src/hooks/useQuoteSubmit.ts).

### Required Vercel environment variables

| Variable          | Purpose                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| `RESEND_API_KEY`  | Resend API key — create at https://resend.com/api-keys                  |
| `LEAD_TO_EMAIL`   | Recipient. Default `move@wemoveondemand.com`                            |
| `LEAD_FROM_EMAIL` | Verified sender. Default `move@wemoveondemand.com`                      |

### Deploy checklist

1. In **Resend**: add `wemoveondemand.com` as a domain, verify SPF/DKIM via the DNS records Resend shows.
2. Create an API key, copy it.
3. In **Vercel → Project → Settings → Environment Variables**, add the 3 vars above (Production + Preview).
4. Push to `main` (auto-deploys). Vercel detects `/api/quote.ts` as a serverless function.
5. Verify: open prod site, submit a form, check `move@wemoveondemand.com` and the function logs in Vercel.

### Local development

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY
npx vercel dev               # serves /api/* + Vite together
```

`npm run dev` alone runs Vite without the serverless function — forms will 404 on submit.
Use `vercel dev` when testing the form end-to-end locally.

### CRM extension point

The function has a `TODO` hook for forwarding leads to the **upixel.app** CRM (see
[api/quote.ts](api/quote.ts)). When the webhook URL/token is available, add a `fetch` call
right before the final `return res.status(200)`.

## Project scripts

| Command            | Purpose                            |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Vite dev server (no API)           |
| `npx vercel dev`   | Full local emulation (API + Vite)  |
| `npm run build`    | Production build (`tsc -b && vite build`) |
| `npm run lint`     | ESLint                             |
| `npm run preview`  | Preview built bundle               |
