import { useState } from 'react';
import { ArrowRight, Phone, Star, Award, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuoteSubmit } from '@/hooks/useQuoteSubmit';
import { BBB_PROFILE_URL, PHONE_TEL } from '@/lib/constants';

function HeroQuickForm({ variant, onSuccess }: { variant: 'desktop' | 'mobile'; onSuccess: () => void }) {
  const [fields, setFields] = useState({ name: '', phone: '', email: '' });
  const [smsConsent, setSmsConsent] = useState(false);
  const { submit, isLoading, state, errorMessage } = useQuoteSubmit(`hero-${variant}`);

  const dark = variant === 'desktop';
  const inputCls = dark
    ? 'bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 transition-colors disabled:opacity-60'
    : 'bg-gray-100 border border-gray-200 rounded-full px-5 py-3 text-sm text-[#0A0A0A] placeholder:text-gray-500 focus:outline-none focus:border-[#a02135] transition-colors disabled:opacity-60';
  const btnCls = dark
    ? 'inline-flex items-center justify-center gap-2 bg-white text-[#a02135] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-white/90 hover:scale-105 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100'
    : 'inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#c41e46] hover:scale-105 transition-all shadow-lg whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.phone || !smsConsent) return;
    const ok = await submit({ ...fields, smsConsent });
    if (ok) {
      onSuccess();
      setFields({ name: '', phone: '', email: '' });
      setSmsConsent(false);
    }
  };

  const gridCls = variant === 'desktop'
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
    : 'grid grid-cols-1 gap-3';

  return (
    <form className={gridCls} onSubmit={onSubmit}>
      <input
        type="text"
        required
        value={fields.name}
        onChange={(e) => setFields({ ...fields, name: e.target.value })}
        placeholder="Your name"
        aria-label="Your name"
        disabled={isLoading}
        className={inputCls}
      />
      <input
        type="tel"
        required
        value={fields.phone}
        onChange={(e) => setFields({ ...fields, phone: e.target.value })}
        placeholder="Your phone"
        aria-label="Your phone number"
        disabled={isLoading}
        className={inputCls}
      />
      <input
        type="email"
        value={fields.email}
        onChange={(e) => setFields({ ...fields, email: e.target.value })}
        placeholder="Your email"
        aria-label="Your email address"
        disabled={isLoading}
        className={inputCls}
      />
      <div className={variant === 'desktop' ? 'col-span-1 sm:col-span-2 lg:col-span-4' : ''}>
        <label
          className={`flex items-start gap-3 text-xs cursor-pointer ${
            dark ? 'text-white/80' : 'text-gray-600'
          }`}
        >
          <input
            type="checkbox"
            required
            checked={smsConsent}
            onChange={(e) => setSmsConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#a02135] focus:ring-[#a02135] flex-shrink-0"
            disabled={isLoading}
          />
          <span>
            I consent to receive SMS communications from We Move On Demand. Message and data rates may
            apply. Reply STOP to opt out.
          </span>
        </label>
      </div>
      <button type="submit" className={btnCls} disabled={isLoading || !fields.name || !fields.phone || !smsConsent}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 flex-shrink-0 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Get Estimate
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </>
        )}
      </button>
      {state === 'error' && (
        <div className={`sm:col-span-2 lg:col-span-4 flex items-start gap-2 px-4 py-2 rounded-full text-xs ${dark ? 'bg-white/10 text-white' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}
    </form>
  );
}

export function Hero() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen bg-[#F3F3F1] overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#a02135]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#242550]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-200px)]">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gray-500 mb-6">
              5 Star Rated Moving Company
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[0.9] text-[#0A0A0A] mb-6">
              WE MOVE
              <br />
              <span className="relative inline-block">
                ON DEMAND
                <span className="absolute -top-2 -right-2 lg:-top-3 lg:-right-4 bg-[#a02135] text-white px-2 py-0.5 lg:px-3 lg:py-1 rounded-full text-[0.5rem] lg:text-[0.6rem] font-bold uppercase tracking-widest shadow-lg transform rotate-3 z-10">
                  Talk to the Owner
                </span>
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-4 max-w-md">
              For a <span className="text-[#a02135] font-semibold">5-star move</span>, choose a 5-star company known for care and attention.
              We have the right plan for you.
            </p>

            <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-lg">
              Serving all of Florida with professional residential and commercial moving services.
              Licensed & Insured <span className="text-[#a02135] font-semibold">FL Reg: IM1733</span>
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href={PHONE_TEL} className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white text-xs font-medium uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#a02135] hover:scale-105 transition-all shadow-lg">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a href="#services" className="inline-flex items-center gap-2 text-[#a02135] text-xs font-medium uppercase tracking-widest px-4 py-3 rounded-full hover:bg-[#a02135]/10 transition-colors">
                Our Services
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="hidden md:flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div>
                  <p className="text-xl font-bold text-[#0A0A0A]">16000+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Customers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#a02135]" />
                <div>
                  <p className="text-sm font-semibold text-[#0A0A0A]">All Florida</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Coverage</p>
                </div>
              </div>
              <a
                href={BBB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                aria-label="View our BBB Accredited A+ profile"
              >
                <img src="/images/bbb-logo.webp" alt="BBB A+ Rated" className="h-10 w-auto" loading="lazy" decoding="async" />
              </a>
            </div>
          </div>

          {/* Right Column - Eduardo Image */}
          <div className="relative flex items-center justify-center order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#a02135]/10 to-[#242550]/10 rounded-full blur-3xl scale-75" />

              <img
                src="/images/eduardo-hero.webp"
                alt="Eduardo - Owner of We Move On Demand"
                className="relative z-10 w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto drop-shadow-2xl"
                fetchPriority="high"
                decoding="async"
                width="576"
                height="720"
              />

              <div className="absolute bottom-16 right-0 z-20">
                <div className="px-4 py-2 rounded-full border border-[#0A0A0A]/10 bg-white/80 backdrop-blur-xl text-[#0A0A0A] text-[0.6rem] font-semibold uppercase tracking-widest shadow-lg">
                  5 Star Service
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Free Estimate Form - Desktop Red Strip */}
      <div className="relative bg-[#a02135] border-t border-[#a02135] hidden md:block">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Free Estimate</h3>
                <p className="text-sm text-white/70">Get your quote in minutes</p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <HeroQuickForm variant="desktop" onSuccess={() => setIsQuoteOpen(true)} />
            </div>
          </div>
        </div>
      </div>

      {/* Free Estimate Form - Mobile White Strip */}
      <div className="relative bg-white border-t border-gray-200 md:hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#a02135] rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0A0A0A]">Free Estimate</h3>
              <p className="text-xs text-gray-500">Get your quote in minutes</p>
            </div>
          </div>
          <HeroQuickForm variant="mobile" onSuccess={() => setIsQuoteOpen(true)} />
        </div>
      </div>

      {/* Quote Dialog */}
      <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
        <DialogContent className="bg-white border-gray-200 text-[#0A0A0A] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Thank You!</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            We've received your request. Our team will contact you within 24 hours to discuss your move.
          </p>
          <div className="flex gap-4 mt-4">
            <a href={PHONE_TEL} className="inline-flex items-center justify-center gap-2 bg-[#a02135] text-white text-xs font-medium uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#c41e46] transition-all flex-1">
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
