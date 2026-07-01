import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuoteSubmit } from '@/hooks/useQuoteSubmit';
import { PHONE_TEL, PHONE_LABEL, LEAD_EMAIL } from '@/lib/constants';

export function FreeEstimate() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    email: '',
    movingDate: '',
    fromZip: '',
    toZip: '',
  });
  const [smsConsent, setSmsConsent] = useState(false);
  const { submit, isLoading, state, errorMessage, reset } = useQuoteSubmit('free-estimate-section');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.phone || !smsConsent) return;
    const ok = await submit({ ...fields, smsConsent });
    if (ok) setIsSubmitted(true);
  };

  const inputCls =
    'w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#0A0A0A] placeholder:text-gray-500 focus:outline-none focus:border-[#a02135] focus:ring-2 focus:ring-[#a02135]/10 transition-all disabled:opacity-60';

  return (
    <section id="contact" className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="section-label mb-4 block">Get Started</span>
          <h2 className="heading-section mb-4">
            Get Your <span className="text-[#a02135]">Free Estimate</span>
          </h2>
          <p className="paragraph-large max-w-xl mx-auto">
            Fill in your details and our team will contact you within 24 hours.
          </p>
        </div>

        {/* 2-column layout: Form | Eduardo image (aligned to form height). Contact strip below. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Form Column */}
          <div className="bg-[#F3F3F1] rounded-3xl p-6 lg:p-8">
            {/* Header */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 bg-[#a02135]/10 text-[#a02135] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Free • No Obligation
              </div>
              <h3 className="text-2xl font-bold text-[#0A0A0A] tracking-tight leading-tight">
                Get your quote
                <br />
                <span className="text-[#a02135]">in minutes.</span>
              </h3>
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              <input
                type="text"
                required
                value={fields.name}
                onChange={(e) => setFields({ ...fields, name: e.target.value })}
                placeholder="Full name *"
                aria-label="Full name"
                disabled={isLoading}
                className={inputCls}
              />
              <input
                type="tel"
                required
                value={fields.phone}
                onChange={(e) => setFields({ ...fields, phone: e.target.value })}
                placeholder="Phone *"
                aria-label="Phone number"
                disabled={isLoading}
                className={inputCls}
              />
              <input
                type="email"
                value={fields.email}
                onChange={(e) => setFields({ ...fields, email: e.target.value })}
                placeholder="Email"
                aria-label="Email address"
                disabled={isLoading}
                className={inputCls}
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={fields.fromZip}
                  onChange={(e) => setFields({ ...fields, fromZip: e.target.value })}
                  placeholder="From ZIP"
                  aria-label="Moving from ZIP code"
                  disabled={isLoading}
                  className={inputCls}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={fields.toZip}
                  onChange={(e) => setFields({ ...fields, toZip: e.target.value })}
                  placeholder="To ZIP"
                  aria-label="Moving to ZIP code"
                  disabled={isLoading}
                  className={inputCls}
                />
              </div>

              <input
                type="date"
                value={fields.movingDate}
                onChange={(e) => setFields({ ...fields, movingDate: e.target.value })}
                aria-label="Preferred moving date"
                disabled={isLoading}
                className={`${inputCls} text-gray-500`}
              />

              {state === 'error' && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="flex items-start gap-3 text-xs text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={smsConsent}
                    onChange={(e) => setSmsConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#a02135] focus:ring-[#a02135] flex-shrink-0"
                    disabled={isLoading}
                  />
                  <span>
                    I consent to receive SMS communications from We Move On Demand. Message and data
                    rates may apply. Reply STOP to opt out.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-[#c41e46] hover:scale-[1.02] transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={isLoading || !fields.name || !fields.phone || !smsConsent}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Get My Free Estimate
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-gray-500 text-center pt-1">
                No Hidden Fees. Honest Pricing. Every Time.
              </p>
            </form>
          </div>

          {/* Eduardo Image Column — full PNG on white, contained, anchored bottom-center */}
          <div className="hidden lg:flex items-end justify-center">
            <img
              src="/images/eduardo-3.webp"
              alt="Eduardo - We Move On Demand"
              className="w-full h-full max-h-full object-contain object-bottom"
              loading="lazy"
              decoding="async"
              width="500"
              height="625"
            />
          </div>
        </div>

        {/* Contact Info Strip - below, full width */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-5xl mx-auto mt-6">
          <a href={PHONE_TEL} className="flex items-center gap-3 p-4 bg-[#F3F3F1] rounded-2xl hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-[#a02135]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-[#a02135]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Call Us</p>
              <p className="text-sm font-bold text-[#0A0A0A] truncate">{PHONE_LABEL}</p>
            </div>
          </a>

          <a href={`mailto:${LEAD_EMAIL}`} className="flex items-center gap-3 p-4 bg-[#F3F3F1] rounded-2xl hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-[#a02135]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-[#a02135]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-xs font-bold text-[#0A0A0A] truncate">{LEAD_EMAIL}</p>
            </div>
          </a>

          <div className="flex items-center gap-3 p-4 bg-[#F3F3F1] rounded-2xl">
            <div className="w-10 h-10 bg-[#a02135]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#a02135]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Office</p>
              <p className="text-sm font-bold text-[#0A0A0A] truncate">Boca Raton, FL</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[#F3F3F1] rounded-2xl">
            <div className="w-10 h-10 bg-[#a02135]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-[#a02135]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Hours</p>
              <p className="text-sm font-bold text-[#0A0A0A] truncate">24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isSubmitted} onOpenChange={(open) => {
        setIsSubmitted(open);
        if (!open) {
          reset();
          setFields({ name: '', phone: '', email: '', movingDate: '', fromZip: '', toZip: '' });
          setSmsConsent(false);
        }
      }}>
        <DialogContent className="bg-white border-gray-200 text-[#0A0A0A] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              Request Received!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Thank you, {fields.name}! We've received your request.
            </p>
            <p className="text-gray-600">
              Our team will contact you at {fields.phone} within 24 hours.
            </p>
            <div className="flex gap-4 pt-4">
              <a href={PHONE_TEL} className="inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-xs font-medium uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#c41e46] transition-all flex-1">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
