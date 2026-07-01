import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'West Palm Beach, FL',
    rating: 5,
    text: "We Move On Demand made our office relocation seamless. They handled everything from packing to setup, and we were back in business the next day. Professional, efficient, and worth every penny!",
    service: 'Commercial Moving',
  },
  {
    name: 'Michael Rodriguez',
    location: 'Miami, FL',
    rating: 5,
    text: "I've moved five times in the last ten years, and this was by far the best experience. The team was punctual, careful with my belongings, and the price was exactly what they quoted. No surprises!",
    service: 'Residential Moving',
  },
  {
    name: 'Jennifer Chen',
    location: 'Fort Lauderdale, FL',
    rating: 5,
    text: "Talk about stress-free! From the first call to the last box, everything was perfect. They even helped me arrange furniture in my new place. Five stars aren't enough!",
    service: 'Local Moving',
  },
  {
    name: 'David Thompson',
    location: 'Orlando, FL',
    rating: 5,
    text: "Needed to move my retail store across the state. We Move On Demand handled the entire process flawlessly. Zero downtime, zero damage. These guys are the real deal.",
    service: 'Statewide Moving',
  },
  {
    name: 'Amanda Foster',
    location: 'Boca Raton, FL',
    rating: 5,
    text: "Their storage service saved me during my home renovation. My items were safe and secure for three months, and delivery was prompt when I was ready. Highly recommend!",
    service: 'Storage Services',
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">Testimonials</span>
          <h2 className="heading-section mb-6 whitespace-nowrap">
            What Our <span className="text-[#a02135]">Clients Say</span>
          </h2>
          <p className="paragraph-large max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say
            about their experience with We Move On Demand.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#F3F3F1] rounded-3xl p-8 lg:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
              <Quote className="w-12 h-12 text-[#a02135]/20" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-xl lg:text-2xl text-[#0A0A0A] leading-relaxed mb-8">
                "{testimonials[activeIndex].text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-lg font-bold text-[#0A0A0A]">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonials[activeIndex].location} • {testimonials[activeIndex].service}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevTestimonial}
                    aria-label="Previous testimonial"
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#a02135] hover:text-white hover:border-[#a02135] transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#0A0A0A]" aria-hidden="true" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    aria-label="Next testimonial"
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#a02135] hover:text-white hover:border-[#a02135] transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-[#0A0A0A]" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((t, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View testimonial from ${t.name}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-[#a02135] w-8'
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges - Always horizontal */}
        <div className="mt-16 flex justify-center items-center gap-6 sm:gap-8 overflow-x-auto">
          <div className="text-center flex-shrink-0">
            <p className="text-3xl sm:text-4xl font-bold text-[#0A0A0A] mb-1">16000+</p>
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">Happy Customers</p>
          </div>
          <div className="w-px h-10 bg-gray-200 flex-shrink-0" />
          <div className="text-center flex-shrink-0">
            <p className="text-3xl sm:text-4xl font-bold text-[#0A0A0A] mb-1">#1</p>
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">On Angi</p>
          </div>
          <div className="w-px h-10 bg-gray-200 flex-shrink-0" />
          <div className="text-center flex-shrink-0">
            <p className="text-3xl sm:text-4xl font-bold text-[#0A0A0A] mb-1">A+</p>
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">BBB Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
