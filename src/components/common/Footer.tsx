import React from 'react';
import { 
  Crown, 
  PhoneCall, 
  MessageCircle, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Truck, 
  RotateCcw, 
  Phone, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { AppView, PolicyType } from '../../types';
import { SocialMediaLinks } from './SocialMediaLinks';
import { PLATFORM_CONTACT } from '../../data/policyData';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handlePolicyClick = (policyType: PolicyType) => {
    onNavigate({ type: 'policy', policyType });
  };

  return (
    <footer className="bg-[#230B10] text-[#F5EAD4] border-t-2 border-[#D4AF37]/50 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#4A121A]">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#2A0E13] shadow-md">
                <Crown className="w-5 h-5 font-bold" />
              </div>
              <div>
                <span className="text-xl font-bold font-cinzel text-white tracking-wide">
                  Jwellersname<span className="text-[#D4AF37]">.com</span>
                </span>
                <p className="text-[10px] text-[#CBB99E] uppercase tracking-wider">
                  Jewellers Multi-Tenant SaaS
                </p>
              </div>
            </div>

            <p className="text-xs text-[#E1D3BF] leading-relaxed">
              India&apos;s specialized multi-tenant digital showroom platform for retail &amp; wholesale jewellers. Zero commission, direct customer WhatsApp inquiries, and complete data privacy.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="px-2.5 py-1 rounded-lg bg-[#3D1017] border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% BIS Hallmarking</span>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[#3D1017] border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-semibold">
                ✦ Zero Gateway Fees
              </div>
            </div>
          </div>

          {/* Col 2: Footer Pages & Policies (Requested Core Requirement) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
              <h4 className="text-xs font-bold text-[#E5C158] uppercase tracking-wider font-cinzel">
                Policies &amp; Legal
              </h4>
            </div>

            <ul className="space-y-2 text-xs text-[#E1D3BF]">
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('privacy')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-left group"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('terms')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-left group"
                >
                  <FileText className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>Terms &amp; Conditions</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('shipping')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-left group"
                >
                  <Truck className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>Shipping Policy (Insured Transit)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('refund')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-left group"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>Cancellation &amp; Refund Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('contact')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-left group"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>Contact Information &amp; Support</span>
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] text-[#A89480]">
                All policies adhere to BIS Hallmarking 2018 &amp; PMLA Indian guidelines.
              </span>
            </div>
          </div>

          {/* Col 3: Owner & Direct Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#E5C158] uppercase tracking-wider font-cinzel">
              Direct Contact &amp; Support
            </h4>
            <div className="bg-[#330C13] p-3.5 rounded-2xl border border-[#D4AF37]/30 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#CBB99E]">Founder &amp; Owner:</span>
                <span className="font-bold text-white text-sm">Rahul</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#CBB99E]">Direct Call:</span>
                <a 
                  href={`tel:${PLATFORM_CONTACT.phone}`} 
                  className="font-bold text-[#E5C158] hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" />
                  {PLATFORM_CONTACT.phone}
                </a>
              </div>
              <div className="flex items-start justify-between gap-2 pt-1 border-t border-[#4A121A]">
                <span className="text-[#CBB99E] shrink-0">Official Email:</span>
                <a 
                  href={`mailto:${PLATFORM_CONTACT.email}`} 
                  className="font-medium text-[#E1D3BF] hover:text-[#E5C158] truncate"
                >
                  {PLATFORM_CONTACT.email}
                </a>
              </div>
              <div className="pt-1">
                <a
                  href={`https://wa.me/${PLATFORM_CONTACT.whatsapp}?text=Hello%20Rahul%20ji,%20I%20want%20to%20setup%20my%20Jewellery%20Store%20on%20Jwellersname.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 bg-[#25D366] hover:bg-[#20b858] text-white rounded-xl font-semibold text-xs transition-all shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  Chat with Rahul on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Portals & Live Demos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#E5C158] uppercase tracking-wider font-cinzel">
              Portals &amp; Live Demos
            </h4>
            <ul className="space-y-2 text-xs text-[#E1D3BF]">
              <li>
                <button 
                  onClick={() => onNavigate({ type: 'landing' })}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <span>→</span> Main SaaS Landing Page
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate({ type: 'store', vendorSlug: 'rajwada-jewellers' })}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-left"
                >
                  <span>→</span> Live Showroom (Rajwada Palace)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate({ type: 'vendor', vendorId: 'vendor_rajwada' })}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <span>→</span> Jeweller Vendor Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate({ type: 'admin' })}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <span>→</span> Super Admin Control Room
                </button>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-[#A89480] space-y-1">
              <p>✔ HUID Verification Ready</p>
              <p>✔ Gross/Net Gold Weight Calculator</p>
            </div>
          </div>
        </div>

        {/* Social Media Links Bar (Prominently Showcased) */}
        <div className="pt-2 pb-6 border-b border-[#4A121A]">
          <SocialMediaLinks variant="footer" />
        </div>

        {/* Bottom Bar: Copyright & Quick Policy Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A89480] gap-4">
          <div>
            © {new Date().getFullYear()} Jwellersname.com. All rights reserved. Platform Founder &amp; Developer: Rahul (+91 7087033009).
          </div>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px]">
            <button 
              onClick={() => handlePolicyClick('privacy')}
              className="hover:text-[#E5C158] transition-colors"
            >
              Privacy
            </button>
            <span>&bull;</span>
            <button 
              onClick={() => handlePolicyClick('terms')}
              className="hover:text-[#E5C158] transition-colors"
            >
              Terms
            </button>
            <span>&bull;</span>
            <button 
              onClick={() => handlePolicyClick('shipping')}
              className="hover:text-[#E5C158] transition-colors"
            >
              Shipping
            </button>
            <span>&bull;</span>
            <button 
              onClick={() => handlePolicyClick('refund')}
              className="hover:text-[#E5C158] transition-colors"
            >
              Refunds
            </button>
            <span>&bull;</span>
            <button 
              onClick={() => handlePolicyClick('contact')}
              className="hover:text-[#E5C158] transition-colors"
            >
              Contact
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
