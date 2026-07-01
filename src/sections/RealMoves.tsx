import { Camera, Play, ArrowRight } from 'lucide-react';

type PhotoSlot = { id: string; label: string; hint: string };
type VideoSlot = { id: string; label: string; hint: string };

const featuredVideo: VideoSlot = {
  id: 'hero-video',
  label: 'Behind the Scenes',
  hint: 'Featured video — crew loading a premium Boca Raton residence',
};

const gallery: PhotoSlot[] = [
  { id: 'premium-home', label: 'Premium Homes', hint: 'Florida luxury residence on moving day' },
  { id: 'crew-working', label: 'Trusted Crew', hint: 'Uniformed crew handling client belongings' },
  { id: 'clean-truck', label: 'Clean Trucks', hint: 'Branded We Move On Demand truck' },
  { id: 'pro-packing', label: 'Pro Packing', hint: 'Professional packing of fragile items' },
  { id: 'assembly', label: 'Furniture Assembly', hint: 'Crew assembling furniture in the new home' },
  { id: 'happy-customer', label: 'Real Customers', hint: 'Smiling customer with Eduardo' },
];

function Placeholder({
  id,
  label,
  hint,
  type,
}: {
  id: string;
  label: string;
  hint: string;
  type: 'photo' | 'video';
}) {
  const Icon = type === 'video' ? Play : Camera;
  return (
    <div
      data-placeholder={id}
      data-media-type={type}
      className="group relative w-full h-full bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 shadow-md"
    >
      {/* subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* red glow */}
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#a02135]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">
        <div className="w-11 h-11 bg-white/10 backdrop-blur rounded-full flex items-center justify-center mb-3">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a02135] mb-1.5">
          {type === 'video' ? 'Video Slot' : 'Photo Slot'}
        </p>
        <p className="text-sm font-semibold text-white mb-1.5">{label}</p>
        <p className="text-[11px] text-gray-400 max-w-[200px] leading-relaxed">{hint}</p>
      </div>
    </div>
  );
}

export function RealMoves() {
  return (
    <section id="real-moves" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="section-label mb-4 block">Real Operation</span>
          <h2 className="heading-section mb-4">
            Real Moves. <span className="text-[#a02135]">Real Customers.</span>
          </h2>
          <p className="paragraph-large max-w-xl mx-auto">
            A behind-the-scenes look at how We Move On Demand operates across Florida. Real moves, real crew, real care.
          </p>
        </div>

        {/* Featured Video — single 16:9 slot, max-w to control scale */}
        <div className="mb-10 lg:mb-12 max-w-5xl mx-auto">
          <div className="aspect-[16/9]">
            <Placeholder id={featuredVideo.id} label={featuredVideo.label} hint={featuredVideo.hint} type="video" />
          </div>
        </div>

        {/* Gallery Grid — uniform 3x2 portrait grid (lg) / 2x3 (md) / 1 col (mobile)
            All cells share the SAME aspect ratio (4/5 portrait) for strict alignment. */}
        <div className="mb-16 lg:mb-20">
          <div className="flex items-end justify-between mb-5">
            <h3 className="text-2xl lg:text-3xl font-bold text-[#0A0A0A]">The Operation</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hidden sm:block">
              6 Photo Slots
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {gallery.map((slot) => (
              <div key={slot.id} className="aspect-[4/5]">
                <Placeholder id={slot.id} label={slot.label} hint={slot.hint} type="photo" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#a02135] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-[#c41e46] hover:scale-105 transition-all shadow-lg"
          >
            Book Your Move
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-4">
            No Hidden Fees · Honest Pricing · Every Time
          </p>
        </div>
      </div>
    </section>
  );
}
