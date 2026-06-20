import { Shield, Award, Users, CheckCircle, Phone, MapPin, ExternalLink, Star } from 'lucide-react';
import { BBB_PROFILE_URL, PHONE_TEL, PHONE_LABEL, ADDRESS } from '@/lib/constants';

const stats = [
  { value: 'A+', label: 'BBB Rating', icon: Award, highlight: true },
  { value: '16+', label: 'Years Accredited', icon: Shield },
  { value: '16,000+', label: 'Happy Customers', icon: Users },
  { value: '5★', label: 'Star Reviews', icon: Star },
];

const features = [
  'Licensed & Insured (FL Reg: IM1733)',
  'Same-Day Service Available',
  'No Hidden Fees. Honest Pricing.',
  'Professional Packing & Unpacking',
  'Secure Storage Solutions',
  'Statewide Florida Coverage',
];

export function About() {
  return (
    <section id="about" className="relative py-20 lg:py-24 bg-[#F3F3F1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top: Image + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 lg:mb-20">
          {/* Image Column — sized to text, not full-bleed */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:max-w-none rounded-3xl overflow-hidden bg-white shadow-lg">
              <img
                src="/images/eduardo-2.webp"
                alt="Eduardo - Owner of We Move On Demand"
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
                width="400"
                height="500"
              />
            </div>

            {/* Floating BBB badge */}
            <a
              href={BBB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-4 -right-4 lg:bottom-6 lg:-right-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 flex items-center gap-3 hover:scale-105 transition-transform"
              aria-label="View our BBB Accredited A+ profile"
            >
              <img src="/images/bbb-logo.webp" alt="BBB A+" className="h-10 w-auto" loading="lazy" decoding="async" />
              <div className="leading-tight">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#a02135]">A+ Rated</p>
                <p className="text-[10px] text-gray-500">Since 2009</p>
              </div>
            </a>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7">
            <span className="section-label mb-4 block">About Us · BBB Accredited</span>

            <h2 className="heading-section mb-6">
              Trusted Moving Partner
              <br />
              <span className="text-[#a02135]">Since 2009</span>
            </h2>

            <p className="paragraph-large mb-4">
              We've helped over <strong className="text-[#0A0A0A]">16,000+ customers</strong> relocate across
              Florida with zero hassle and complete peace of mind. <strong className="text-[#0A0A0A]">BBB Accredited</strong>{' '}
              with an <span className="text-[#a02135] font-bold">A+ rating</span> — the gold standard in business trust.
            </p>

            <p className="paragraph-base mb-4">
              Our team treats your belongings like their own. From delicate antiques to heavy office equipment,
              we have the expertise and equipment to handle it all — packing, moving, unpacking, and furniture
              assembly included.
            </p>

            <p className="paragraph-base mb-8">
              Book your move today and get a free estimate. Call{' '}
              <a href={PHONE_TEL} className="text-[#a02135] font-semibold hover:underline">
                {PHONE_LABEL}
              </a>{' '}
              or use the form below.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#a02135] flex-shrink-0" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <MapPin className="w-4 h-4 text-[#a02135] flex-shrink-0" />
              {ADDRESS}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a href={PHONE_TEL} className="inline-flex items-center gap-2 bg-[#a02135] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#c41e46] hover:scale-105 transition-all shadow-lg">
                <Phone className="w-4 h-4" />
                Talk to the Owner
              </a>
              <a
                href={BBB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#0A0A0A] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-gray-50 hover:scale-105 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                View BBB Profile
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid - unified */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-3xl p-6 text-center transition-shadow hover:shadow-lg ${
                stat.highlight ? 'bg-[#0A0A0A] text-white' : 'bg-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                stat.highlight ? 'bg-[#a02135]/20' : 'bg-[#a02135]/10'
              }`}>
                <stat.icon className={`w-6 h-6 ${stat.highlight ? 'text-[#a02135]' : 'text-[#a02135]'}`} />
              </div>
              <p className={`text-3xl lg:text-4xl font-bold mb-1 ${
                stat.highlight ? 'text-[#a02135]' : 'text-[#0A0A0A]'
              }`}>{stat.value}</p>
              <p className={`text-xs uppercase tracking-wider ${
                stat.highlight ? 'text-gray-400' : 'text-gray-500'
              }`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
