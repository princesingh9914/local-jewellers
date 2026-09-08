import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Truck, 
  RotateCcw, 
  Phone, 
  Sparkles,
  MapPin,
  Clock,
  MessageCircle,
  PhoneCall,
  ExternalLink,
  Lock
} from 'lucide-react';
import { Vendor, AppView, PolicyType } from '../../types';
import { SocialMediaLinks } from '../common/SocialMediaLinks';
import { HallmarkStamp } from '../common/IndianMotif';

interface VendorFooterProps {
  vendor: Vendor;
  onNavigate: (view: AppView) => void;
  onOpenAdminAccess?: () => void;
}

export const VendorFooter: React.FC<VendorFooterProps> = ({ 
  vendor, 
  onNavigate,
  onOpenAdminAccess
}) => {
  const cleanWhatsApp = vendor.whatsapp.replace(/\D/g, '');

  const handlePolicyClick = (policyType: PolicyType) => {
    onNavigate({ type: 'policy', policyType, vendorSlug: vendor.slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2A0E13] text-[#FAF8F5] border-t-2 border-[#D4AF37] mt-16 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Main 4-Column Showroom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#4A121A]">
          
          {/* Col 1: Showroom Profile & BIS Hallmarking */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="w-13 h-13 rounded-2xl object-cover border border-[#D4AF37] bg-white p-0.5 shadow-sm"
              />
              <div>
                <h3 className="text-base font-bold font-royal text-white tracking-wide">
                  {vendor.name}
                </h3>
                <p className="text-[11px] text-[#E5C158] italic line-clamp-1">
                  {vendor.tagline || 'Fine Heritage Jewellery'}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              {vendor.address || `${vendor.city}, ${vendor.state}`}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-[#3D1017] text-[#D4AF37] text-[11px] font-semibold border border-[#D4AF37]/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% BIS Hallmarked</span>
              </span>
              {vendor.gstNumber && (
                <span className="px-2 py-1 rounded-lg bg-[#3D1017] text-gray-300 text-[10px] font-mono border border-white/10">
                  GST: {vendor.gstNumber}
                </span>
              )}
            </div>
          </div>

          {/* Col 2: Showroom Policies & Patron Guarantees */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5C158] font-cinzel">
                Showroom Policies &amp; Legal
              </h4>
            </div>

            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('privacy')}
                  className="hover:text-[#E5C158] transition-colors flex items-center gap-2 text-left group"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>Privacy Policy &amp; PMLA</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('terms')}
                  className="hover:text-[#E5C158] transition-colors flex items-center gap-2 text-left group"
                >
                  <FileText className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>Terms &amp; BIS 6-Digit HUID</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('shipping')}
                  className="hover:text-[#E5C158] transition-colors flex items-center gap-2 text-left group"
                >
                  <Truck className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>100% Insured Courier Transit</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('refund')}
                  className="hover:text-[#E5C158] transition-colors flex items-center gap-2 text-left group"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>Lifetime Buyback &amp; Refunds</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('contact')}
                  className="hover:text-[#E5C158] transition-colors flex items-center gap-2 text-left group"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>Showroom Contact &amp; Support</span>
                </button>
              </li>
            </ul>

            <div className="pt-1">
              <span className="text-[10px] text-gray-400">
                All jewellery certified under BIS Hallmarking Regulations 2018.
              </span>
            </div>
          </div>

          {/* Col 3: Direct Showroom Contact & Timings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5C158] font-cinzel">
              Direct Contact &amp; Timings
            </h4>
            <div className="bg-[#330C13] p-3.5 rounded-2xl border border-[#D4AF37]/30 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">WhatsApp Desk:</span>
                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=Hello%20${encodeURIComponent(vendor.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline font-bold font-mono flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  +{cleanWhatsApp}
                </a>
              </div>

              {vendor.phone && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Direct Phone:</span>
                  <a 
                    href={`tel:${vendor.phone}`} 
                    className="text-[#E5C158] hover:underline font-bold font-mono flex items-center gap-1"
                  >
                    <PhoneCall className="w-3 h-3" />
                    {vendor.phone}
                  </a>
                </div>
              )}

              <div className="flex items-center justify-between pt-1 border-t border-[#4A121A]">
                <span className="text-gray-400">City &amp; State:</span>
                <span className="text-white font-semibold">{vendor.city}, {vendor.state}</span>
              </div>

              {vendor.businessHours && (
                <div className="pt-1 border-t border-[#4A121A] text-[11px] text-gray-300 flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#E5C158] shrink-0 mt-0.5" />
                  <span>{vendor.businessHours}</span>
                </div>
              )}
            </div>
          </div>

          {/* Col 4: Zero Login WhatsApp Checkout & Guarantee */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5C158] font-cinzel">
              Zero Login WhatsApp Checkout
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Explore our bridal &amp; daily jewellery collections, select your gold karat (22K/18K) and bangle/ring size, and send your order inquiry directly to our WhatsApp with zero login required.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => handlePolicyClick('shipping')}
                className="text-xs text-[#E5C158] hover:text-white underline transition-colors flex items-center gap-1"
              >
                <span>Insured Doorstep Delivery Policy →</span>
              </button>
            </div>
          </div>

        </div>

        {/* Social Media Links Section */}
        <div className="pt-2 pb-6 border-b border-[#4A121A]">
          <SocialMediaLinks vendor={vendor} variant="footer" />
        </div>

        {/* Bottom Copyright Bar with Discreet Jeweller Admin Link */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} {vendor.name}. All designs BIS Hallmarked.
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <button 
              onClick={() => handlePolicyClick('privacy')}
              className="hover:text-[#E5C158] transition-colors"
            >
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button 
              onClick={() => handlePolicyClick('terms')}
              className="hover:text-[#E5C158] transition-colors"
            >
              Terms of Service
            </button>
            <span>&bull;</span>
            <button 
              onClick={() => handlePolicyClick('shipping')}
              className="hover:text-[#E5C158] transition-colors"
            >
              Insured Shipping
            </button>
            <span>&bull;</span>
            <button 
              onClick={() => handlePolicyClick('refund')}
              className="hover:text-[#E5C158] transition-colors"
            >
              Lifetime Buyback
            </button>
            <span>&bull;</span>
            <button 
              onClick={() => {
                if (onOpenAdminAccess) {
                  onOpenAdminAccess();
                } else {
                  onNavigate({ type: 'vendor', vendorId: vendor.id });
                }
              }}
              className="text-[#E5C158]/80 hover:text-[#E5C158] transition-colors underline font-medium"
            >
              Staff Portal
            </button>
            <span>&bull;</span>
            <button
              onClick={() => {
                if (onOpenAdminAccess) {
                  onOpenAdminAccess();
                } else {
                  onNavigate({ type: 'admin' });
                }
              }}
              className="inline-flex items-center gap-1 text-[11px] text-white/50 hover:text-[#E5C158] transition-colors"
              title="Master Admin Portal (Platform Owner)"
            >
              <Lock className="w-3 h-3 text-[#D4AF37]" />
              <span>Admin Access</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
