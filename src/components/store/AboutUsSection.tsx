import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Gem, 
  Scale, 
  MapPin, 
  Clock, 
  HeartHandshake
} from 'lucide-react';
import { Vendor } from '../../types';

interface AboutUsSectionProps {
  vendor: Vendor;
  onExploreProducts?: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  vendor
}) => {
  // Curated high quality showroom/craftsmanship image
  const displayImage = vendor.aboutImage || vendor.banner || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&auto=format&fit=crop&q=80';

  return (
    <section id="about-section" className="pt-14 pb-4 scroll-mt-20">
      <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-10 lg:p-12 shadow-sm overflow-hidden relative">
        
        {/* Decorative subtle background watermark or pattern */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FAF0D7]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FAF0D7]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex items-center gap-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0D7] border border-[#E5C158] text-[#8C6D23] text-xs font-bold uppercase tracking-widest font-cinzel">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Heritage &bull; Craftsmanship &bull; Purity</span>
          </div>
        </div>

        {/* 2-Column Responsive Layout: IMAGE + PARAGRAPHS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* LEFT COLUMN: Large High-Resolution Jewellery & Craftsmanship Image */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative group">
              
              {/* Image Frame with Royal Gold Border */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-xl bg-[#1F070B] aspect-4/5 sm:aspect-square lg:aspect-4/5">
                <img
                  src={displayImage}
                  alt={`${vendor.name} Jewellery Heritage & Showroom`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Luxury Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Hallmark Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-[#E5C158]/60 text-[#F5D061] text-xs font-bold shadow-md">
                    <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>100% BIS Hallmarked</span>
                  </span>
                  
                  {vendor.city && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-medium">
                      <MapPin className="w-3 h-3 text-[#E5C158]" />
                      <span>{vendor.city}</span>
                    </span>
                  )}
                </div>

                {/* Bottom Inset Showroom Card on Image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-[#D4AF37]/50 text-white space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#F5D061] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>Atelier &amp; Showroom</span>
                  </div>
                  <h4 className="font-cinzel text-base font-bold text-white leading-snug">
                    {vendor.name}
                  </h4>
                  <p className="text-xs text-white/80 line-clamp-2">
                    {vendor.address || `Premier jewellery destination in ${vendor.city || 'Jaipur'}, ${vendor.state || 'India'}.`}
                  </p>
                </div>

              </div>

              {/* Floating Patron Experience Badge */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-gradient-to-r from-[#FAF0D7] to-white border-2 border-[#D4AF37] px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#720917] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <HeartHandshake className="w-5 h-5 text-[#F5D061]" />
                </div>
                <div className="leading-tight">
                  <span className="text-xs font-bold text-[#720917] block font-cinzel">
                    Legacy of Trust
                  </span>
                  <span className="text-[10px] text-[#6B5A4E] font-medium">
                    Generations of Happy Families
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Timing & Location snippet below image */}
            {vendor.businessHours && (
              <div className="flex items-center gap-2 text-xs text-[#7A6855] px-2 pt-2">
                <Clock className="w-3.5 h-3.5 text-[#8C6D23] shrink-0" />
                <span className="font-medium">Hours: {vendor.businessHours}</span>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Rich Paragraphs & Heritage Story */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title & Tagline */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-royal text-[#1F070B] tracking-tight leading-tight">
                About {vendor.name}
              </h2>
              <p className="text-sm sm:text-base font-medium text-[#8C6D23] italic">
                &ldquo;{vendor.tagline || 'Bespoke Handcrafted Bridal & Fine Gold Jewellery'}&rdquo;
              </p>
            </div>

            {/* Rich Narrative Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-[#4A3E35] leading-relaxed">
              
              {/* Paragraph 1: Showroom Heritage & Origin Story */}
              <p className="font-normal text-justify sm:text-left">
                {vendor.aboutText || (
                  `Rooted in the timeless goldsmithing traditions of ${vendor.city || 'Jaipur'}, ${vendor.name} stands as a beacon of uncompromised purity, royal elegance, and family trust. For generations, our showroom has been the cherished destination for patrons seeking bespoke ornaments that commemorate weddings, sacred festivals, and treasured family milestones.`
                )}
              </p>

              {/* Paragraph 2: Master Karigars & Handcrafted Precision */}
              <p className="font-normal text-justify sm:text-left">
                Every creation in our collection is an ode to authentic Indian heritage, painstakingly shaped by master karigars (artisans) whose ancestry spans decades of jewellery craftsmanship. From the intricate open-setting filigree of royal Kundan and syndicate uncut Polki to contemporary lightweight solitaires and antique temple gold, each masterpiece is forged with absolute passion and artistic perfection.
              </p>

              {/* Paragraph 3: BIS Hallmark & Purity Assurance */}
              <p className="font-normal text-justify sm:text-left">
                Our foundational covenant is absolute transparency. All our 22 Karat (916) and 18 Karat gold ornaments are authenticated with the official Government-approved 6-digit HUID laser hallmark, guaranteeing verified purity down to the last milligram. With state-of-the-art live digital caratomenter weighing, clear itemized price breakdowns, and zero hidden deductions, we ensure complete peace of mind for you and your family.
              </p>

            </div>

            {/* 4 Trust Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <div className="w-8 h-8 rounded-lg bg-[#FAF0D7] text-[#8C6D23] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#720917]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1F070B]">100% BIS Hallmarked</h4>
                  <p className="text-[11px] text-[#7A6855] leading-snug">
                    6-digit HUID laser engraved under strict purity standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <div className="w-8 h-8 rounded-lg bg-[#FAF0D7] text-[#8C6D23] flex items-center justify-center shrink-0">
                  <Gem className="w-4 h-4 text-[#720917]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1F070B]">Certified Diamonds &amp; Gems</h4>
                  <p className="text-[11px] text-[#7A6855] leading-snug">
                    Natural diamonds and syndicate Kundan verified for authenticity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <div className="w-8 h-8 rounded-lg bg-[#FAF0D7] text-[#8C6D23] flex items-center justify-center shrink-0">
                  <Scale className="w-4 h-4 text-[#720917]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1F070B]">Zero Hidden Deductions</h4>
                  <p className="text-[11px] text-[#7A6855] leading-snug">
                    Exact net gold weight breakdown and honest making charges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <div className="w-8 h-8 rounded-lg bg-[#FAF0D7] text-[#8C6D23] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-[#720917]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1F070B]">Custom Bridal Atelier</h4>
                  <p className="text-[11px] text-[#7A6855] leading-snug">
                    Bespoke design, sizing, and personalized trousseau curation.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
