import React from 'react';
import { Testimonial, Vendor } from '../../types';
import { Star, ShieldCheck, Quote, Sparkles } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  vendor: Vendor;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials, vendor }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-12 bg-linear-to-b from-[#FAF8F5] via-[#FFFDF9] to-[#FAF8F5] border-t border-b border-[#E8DFC8]/60 relative overflow-hidden">
      {/* Decorative Gold Flourish Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8C232C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EE] border border-[#D4AF37]/40 text-[#8C6D23] text-xs font-bold uppercase tracking-widest font-cinzel">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Patron Experiences</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-royal text-[#2A1810]">
            Trusted by Connoisseurs & Families
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6855]">
            Real reviews from patrons who crafted their bridal trousseaus and heirloom jewellery with {vendor.name}.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-[#E8DFC8] shadow-xs hover:shadow-md transition-all hover:border-[#D4AF37] relative flex flex-col justify-between group"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#E8DFC8]/50 group-hover:text-[#D4AF37]/30 transition-colors pointer-events-none" />

              <div className="space-y-4">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating
                          ? 'text-[#E5C158] fill-[#E5C158]'
                          : 'text-gray-200 fill-gray-200'
                      }`}
                    />
                  ))}
                  {t.rating === 5 && (
                    <span className="ml-1.5 text-[11px] font-bold text-[#1B6D3E] bg-[#EBF9F0] px-2 py-0.2 rounded">
                      5.0 Perfect
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#4A3E34] leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>

                {/* Purchased Item Pill */}
                {t.purchaseItem && (
                  <div className="inline-block">
                    <span className="text-[11px] font-medium text-[#8C232C] bg-[#FAF0F1] px-2.5 py-0.5 rounded-full border border-[#8C232C]/20">
                      Purchased: {t.purchaseItem}
                    </span>
                  </div>
                )}
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-3 pt-5 mt-4 border-t border-[#F0EAE1]">
                {t.photo ? (
                  <img
                    src={t.photo}
                    alt={t.customerName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#D4AF37] shadow-xs shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#FAF6EE] border-2 border-[#D4AF37] flex items-center justify-center text-[#8C232C] font-bold text-sm shrink-0 font-royal">
                    {t.customerName.charAt(0)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-[#2A1810] truncate">
                      {t.customerName}
                    </span>
                    {t.isVerifiedBuyer !== false && (
                      <ShieldCheck className="w-3.5 h-3.5 text-[#1B6D3E] shrink-0" title="Verified Customer" />
                    )}
                  </div>
                  <div className="text-[11px] text-[#7A6855] flex items-center gap-2">
                    {t.customerCity && <span>{t.customerCity}</span>}
                    {t.date && <span>&bull; {t.date}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
