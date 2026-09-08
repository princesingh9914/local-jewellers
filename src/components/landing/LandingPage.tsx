import React, { useState } from 'react';
import { 
  Crown, 
  Store, 
  MessageCircle, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ShoppingBag, 
  Zap, 
  Users, 
  Percent, 
  Gem,
  ExternalLink,
  Plus
} from 'lucide-react';
import { AppView, Vendor } from '../../types';
import { storageService } from '../../services/storage';
import { IndianBorderPattern, GoldBadge, HallmarkStamp } from '../common/IndianMotif';

interface LandingPageProps {
  onNavigate: (view: AppView) => void;
  onOpenCreateStore?: () => void;
  onOpenAdminAccess?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onNavigate,
  onOpenCreateStore,
  onOpenAdminAccess
}) => {
  const vendors = storageService.getVendors().filter(v => v.isActive);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleOpenCreateModal = () => {
    if (onOpenCreateStore) {
      onOpenCreateStore();
    } else {
      setShowRegisterModal(true);
    }
  };

  // Quick state for registering new jeweller right from front page
  const [newStoreName, setNewStoreName] = useState('');
  const [newOwnerName, setNewOwnerName] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newWhatsApp, setNewWhatsApp] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);

  const handleQuickRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreName.trim() || !newPhone.trim()) return;

    const slug = newStoreName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newVendor: Vendor = {
      id: `vendor_${Date.now()}`,
      name: newStoreName.trim(),
      slug: slug || `jeweller-${Date.now()}`,
      ownerName: newOwnerName.trim() || 'Jeweller Owner',
      phone: newPhone.trim(),
      whatsapp: newWhatsApp.trim() || newPhone.trim(),
      email: `${slug}@jwellersname.com`,
      city: newCity.trim() || 'Jaipur',
      state: 'India',
      address: `${newCity.trim() || 'City'}, India`,
      logo: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&auto=format&fit=crop&q=80',
      tagline: 'Authentic 916 Hallmark Jewellery & Bespoke Ornaments',
      themeColor: '#720917',
      isActive: true,
      isVerified: true,
      plan: 'Gold VIP',
      createdAt: new Date().toISOString().split('T')[0],
      aboutText: 'Welcome to our digital showroom. Contact us for hallmark certified gold & diamond ornaments.',
      hallmarkCertified: true,
      upiId: `${slug}@upi`
    };

    storageService.saveVendor(newVendor);
    setRegisterSuccess(newVendor.slug);

    setTimeout(() => {
      onNavigate({ type: 'vendor', vendorId: newVendor.id });
    }, 1200);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION with Indian Royal Theme */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#38090F] via-[#4A0E17] to-[#2E070C] text-[#FAF8F5] pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b-4 border-[#D4AF37] scroll-mt-20">
        {/* Subtle Indian ornamental background decor */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5B141D] border border-[#D4AF37]/50 text-[#F5EAD4] text-xs font-semibold shadow-md">
            <Crown className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>India&apos;s Premium Multi-Tenant Jewellery SaaS</span>
            <span className="text-[#D4AF37]">✦</span>
            <span className="text-[#E5C158]">Zero Paid API &bull; 0% Commission</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-royal text-[#FFF8E7] leading-tight tracking-wide">
            Digital Showroom &amp; WhatsApp Orders <br className="hidden sm:inline" />
            <span className="gold-gradient-text drop-shadow-sm font-cinzel">
              For Every Indian Jeweller
            </span>
          </h1>

          <IndianBorderPattern className="my-2" />

          <p className="text-base sm:text-lg text-[#E3D4C1] max-w-3xl mx-auto font-normal leading-relaxed">
            Secure, isolated online catalogue for each jeweller. 
            Zero customer login required — customers browse ornaments, add to cart, and send direct orders to your 
            <strong className="text-[#51E386]"> WhatsApp </strong> 
            with exact gold weight, making charges, and total estimate.
          </p>

          {/* Key CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate({ type: 'store', vendorSlug: 'rajwada-jewellers' })}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] text-[#2A0E13] font-bold text-sm sm:text-base hover:brightness-105 transition-all shadow-lg flex items-center gap-2 transform active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 text-[#2A0E13]" />
              <span>Explore Live Customer Store (Demo)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate({ type: 'vendor', vendorId: vendors[0]?.id || 'vendor_rajwada' })}
              className="px-6 py-3.5 rounded-xl bg-[#5B141D] hover:bg-[#6D1B24] border border-[#D4AF37]/60 text-[#FFF8E7] font-semibold text-sm sm:text-base transition-all shadow-md flex items-center gap-2"
            >
              <Store className="w-5 h-5 text-[#E5C158]" />
              <span>Jeweller Dashboard (Vendor Panel)</span>
            </button>

            <button
              onClick={handleOpenCreateModal}
              className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-[#1F070B] text-sm font-bold shadow-md hover:brightness-105 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#1F070B]" />
              <span>Create Store</span>
            </button>
          </div>

          {/* Quick Founder Contact Banner right inside Hero */}
          <div className="pt-6">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 px-5 py-2.5 rounded-xl bg-[#2A0E13]/80 border border-[#D4AF37]/40 text-xs sm:text-sm text-[#F5EAD4]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                <span className="font-medium text-[#CBB99E]">Founder & Support:</span>
                <span className="font-bold text-[#FFF8E7]">Rahul</span>
              </div>
              <span className="text-[#8C6D23] hidden sm:inline">&bull;</span>
              <a 
                href="tel:7087033009" 
                className="flex items-center gap-1.5 font-bold text-[#E5C158] hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>7087033009</span>
              </a>
              <span className="text-[#8C6D23] hidden sm:inline">&bull;</span>
              <a 
                href="https://wa.me/917087033009?text=Namaste%20Rahul%20ji,%20I%20want%20to%20know%20more%20about%20Jwellersname.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#25D366] hover:text-[#4bee8a] font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* 4 Pillars Badges */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="bg-[#5B141D]/60 p-3 rounded-lg border border-[#D4AF37]/20 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#E5C158] shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">0% Commission</div>
                <div className="text-[#CBB99E] text-[11px]">Zero Gateway Cut</div>
              </div>
            </div>

            <div className="bg-[#5B141D]/60 p-3 rounded-lg border border-[#D4AF37]/20 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#E5C158] shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Isolated Security</div>
                <div className="text-[#CBB99E] text-[11px]">100% Tenant Isolation</div>
              </div>
            </div>

            <div className="bg-[#5B141D]/60 p-3 rounded-lg border border-[#D4AF37]/20 flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-[#E5C158] shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Free WhatsApp Flow</div>
                <div className="text-[#CBB99E] text-[11px]">No Paid API Charges</div>
              </div>
            </div>

            <div className="bg-[#5B141D]/60 p-3 rounded-lg border border-[#D4AF37]/20 flex items-center gap-2.5">
              <Gem className="w-5 h-5 text-[#E5C158] shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Hallmark &amp; Weight Specs</div>
                <div className="text-[#CBB99E] text-[11px]">Gross/Net Gold Weight</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED LIVE SHOWROOMS SECTION (Easy UI, Indian Theme) */}
      <section id="live-stores" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center space-y-3 mb-10">
          <GoldBadge>Live Showrooms</GoldBadge>
          <h2 className="text-2xl sm:text-4xl font-bold font-royal text-[#2A1810]">
            Live Digital Jewellery Showrooms
          </h2>
          <p className="text-sm sm:text-base text-[#6E5B4B] max-w-2xl mx-auto">
            Click on any showroom below to preview how customers browse ornaments and send instant WhatsApp inquiries with zero login required.
          </p>
          <IndianBorderPattern />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vendors.map((vendor) => {
            const vendorProducts = storageService.getProducts(vendor.id);
            return (
              <div
                key={vendor.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E8DFC8] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Banner Image with Brand Overlay */}
                  <div className="relative h-44 overflow-hidden bg-[#38090F]">
                    <img 
                      src={vendor.banner} 
                      alt={vendor.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FAF8F5]/90 text-[#38090F] shadow-sm backdrop-blur-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#B8860B]" />
                        {vendor.plan}
                      </span>
                    </div>

                    {/* Logo & City */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
                      <img 
                        src={vendor.logo} 
                        alt={vendor.name} 
                        className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md bg-white shrink-0"
                      />
                      <div className="text-white">
                        <h3 className="text-base font-bold font-royal line-clamp-1">
                          {vendor.name}
                        </h3>
                        <div className="text-xs text-[#E5C158] flex items-center gap-1 font-medium">
                          <span>{vendor.city}, {vendor.state}</span>
                          {vendor.hallmarkCertified && (
                            <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-white ml-1">
                              BIS 916
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vendor Details */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-[#5C4D44] italic leading-relaxed line-clamp-2">
                      &quot;{vendor.tagline}&quot;
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#7A6855] pt-2 border-t border-[#F0EAE1]">
                      <span>Catalog: <strong>{vendorProducts.length} Jewellery Items</strong></span>
                      <span className="text-[#25D366] font-semibold flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        WhatsApp Ready
                      </span>
                    </div>

                    {/* Mini preview tags of products */}
                    <div className="flex flex-wrap gap-1.5">
                      {vendorProducts.slice(0, 3).map(p => (
                        <span key={p.id} className="text-[10px] bg-[#FAF6EE] text-[#7A5812] border border-[#E8DFC8] px-2 py-0.5 rounded-md font-medium">
                          {p.purity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onNavigate({ type: 'store', vendorSlug: vendor.slug })}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#4A0E17] hover:bg-[#681420] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>View Storefront</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onNavigate({ type: 'vendor', vendorId: vendor.id })}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#FAF0D7] hover:bg-[#F5E2B8] border border-[#E5C158] text-[#7A5812] text-xs font-bold transition-all flex items-center justify-center gap-1"
                  >
                    <Store className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>Vendor Login</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS (Easy 3-Step Indian Jewellery Workflow) */}
      <section id="how-it-works" className="bg-[#FAF3E6] border-y border-[#E8DFC8] py-14 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-2 mb-12">
            <GoldBadge>Simple &amp; Intuitive</GoldBadge>
            <h2 className="text-2xl sm:text-3xl font-bold font-royal text-[#2A1810]">
              How The Platform Works
            </h2>
            <p className="text-sm text-[#6E5B4B]">
              No complicated payment gateways or app installations required. Just 3 simple steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] shadow-xs relative space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF0D7] text-[#8C6D23] font-cinzel font-bold text-xl flex items-center justify-center border border-[#E5C158]">
                01
              </div>
              <h3 className="text-lg font-bold font-royal text-[#2A1810]">
                Jeweller Sets Up Store
              </h3>
              <p className="text-xs text-[#5C4D44] leading-relaxed">
                Upload your logo, WhatsApp number, 22K/18K gold ornaments, gross weight, net gold weight, making charges, and images with ease.
              </p>
              <div className="text-[11px] text-[#8C6D23] font-semibold bg-[#FFF9E6] p-2 rounded-lg border border-[#F0DC9B]">
                ✔ 100% isolated and private tenant database
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] shadow-xs relative space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF0D7] text-[#8C6D23] font-cinzel font-bold text-xl flex items-center justify-center border border-[#E5C158]">
                02
              </div>
              <h3 className="text-lg font-bold font-royal text-[#2A1810]">
                Customers Browse (No Login)
              </h3>
              <p className="text-xs text-[#5C4D44] leading-relaxed">
                Share your store link on WhatsApp status, Instagram, or visiting cards. Customers browse immediately without registering or passwords.
              </p>
              <div className="text-[11px] text-[#8C6D23] font-semibold bg-[#FFF9E6] p-2 rounded-lg border border-[#F0DC9B]">
                ✔ Fast, responsive, and elegant on mobile &amp; desktop
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] shadow-xs relative space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF0D7] text-[#8C6D23] font-cinzel font-bold text-xl flex items-center justify-center border border-[#E5C158]">
                03
              </div>
              <h3 className="text-lg font-bold font-royal text-[#2A1810]">
                Cart &rarr; Direct WhatsApp Order
              </h3>
              <p className="text-xs text-[#5C4D44] leading-relaxed">
                Customers add chosen jewellery to cart and click &quot;Send WhatsApp Order&quot; to transfer the full invoice and specs straight to your WhatsApp.
              </p>
              <div className="text-[11px] text-[#1B6D3E] font-semibold bg-[#EBF9F0] p-2 rounded-lg border border-[#A7E6BC]">
                ✔ Zero commission, traditional offline settlement, full control
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY JEWELLERS CHOOSE JWELLERSNAME.COM (Comparison Table) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <GoldBadge>Clear Value Proposition</GoldBadge>
          <h2 className="text-2xl sm:text-3xl font-bold font-royal text-[#2A1810]">
            Traditional E-Commerce vs. Jwellersname.com
          </h2>
          <p className="text-sm text-[#6E5B4B]">
            Specially engineered for the operational realities of Indian retail &amp; wholesale jewellers
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DFC8] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF3E6] border-b border-[#E8DFC8] text-[#2A1810] font-cinzel">
                <tr>
                  <th className="p-4 sm:p-5 font-bold">Feature / Capability</th>
                  <th className="p-4 sm:p-5 font-bold text-[#720917]">Jwellersname.com</th>
                  <th className="p-4 sm:p-5 font-bold text-[#7A6855]">Marketplaces / Generic Shopify</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EAE1]">
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-[#2A1810]">Commission per Order</td>
                  <td className="p-4 sm:p-5 text-[#1B6D3E] font-bold">0% (Zero)</td>
                  <td className="p-4 sm:p-5 text-[#8C232C]">5% to 15% marketplace deduction</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-[#2A1810]">WhatsApp Messaging Cost</td>
                  <td className="p-4 sm:p-5 text-[#1B6D3E] font-bold">Free (Direct wa.me protocol)</td>
                  <td className="p-4 sm:p-5 text-[#8C232C]">₹500 - ₹2,000/month + API charges</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-[#2A1810]">Customer Login Friction</td>
                  <td className="p-4 sm:p-5 text-[#1B6D3E] font-bold">No Login Required (Zero Friction)</td>
                  <td className="p-4 sm:p-5 text-[#8C232C]">Mandatory OTP / Passwords (High drop-off)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-[#2A1810]">Gold &amp; Jewellery Specifications</td>
                  <td className="p-4 sm:p-5 text-[#1B6D3E] font-bold">22K/18K HUID, Gross/Net Weight, Making %</td>
                  <td className="p-4 sm:p-5 text-[#7A6855]">Generic apparel e-commerce format</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-[#2A1810]">Payment &amp; Delivery Terms</td>
                  <td className="p-4 sm:p-5 text-[#1B6D3E] font-bold">Showroom pickup or direct UPI / Bank transfer</td>
                  <td className="p-4 sm:p-5 text-[#8C232C]">Payment gateway hold times (2-4 days delay)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* JEWELLERY PLATFORM PRICING SECTION */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center space-y-2 mb-12">
          <GoldBadge>Transparent &amp; 100% Free</GoldBadge>
          <h2 className="text-2xl sm:text-4xl font-bold font-royal text-[#2A1810]">
            Simple &amp; Honest Platform Pricing
          </h2>
          <p className="text-sm text-[#6E5B4B] max-w-xl mx-auto">
            Zero setup fee, zero transaction cut, and zero hidden charges. Choose a plan and launch your showroom in under 2 minutes.
          </p>
          <IndianBorderPattern />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Plan 1: Free Starter */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8DFC8] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FAF0D7] text-[#7A5B12] border border-[#E5C158]">
                Starter Showroom
              </div>
              <h3 className="text-xl font-bold font-royal text-[#2A1810]">Free Starter</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold font-cinzel text-[#2A1810]">₹0</span>
                <span className="text-xs text-[#7A6855]">/ Lifetime Free</span>
              </div>
              <p className="text-xs text-[#6B5A4E] leading-relaxed">
                Ideal for family jewellers testing online catalogues and direct WhatsApp orders.
              </p>

              <div className="pt-4 border-t border-[#F0EAE1] space-y-2.5 text-xs text-[#3E342F]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span><strong>0% Commission</strong> per sale</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span>Up to 25 Gold/Silver Ornaments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span>Direct WhatsApp Inquiries &amp; Orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span>Isolated Public Storefront URL</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span>Standard Community Support</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenCreateModal}
              className="mt-6 w-full py-2.5 px-4 rounded-xl border border-[#D4AF37] bg-[#FFF9E6] hover:bg-[#FAF0D7] text-[#7A5B12] font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Create Free Store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Plan 2: Silver Pro (Featured) */}
          <div className="bg-gradient-to-b from-[#FFFDF8] to-[#FAF3E6] rounded-2xl p-6 sm:p-7 border-2 border-[#D4AF37] shadow-xl relative flex flex-col justify-between transform md:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#720917] text-[#FFF8E7] text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E5C158]" />
              <span>Most Popular Choice</span>
            </div>

            <div className="space-y-4 pt-1">
              <div className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FAF0D7] text-[#7A5B12] border border-[#E5C158]">
                Professional Showroom
              </div>
              <h3 className="text-xl font-bold font-royal text-[#720917]">Silver Pro</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold font-cinzel text-[#720917]">₹0</span>
                <span className="text-xs text-[#7A6855]">/ 100% Free Special Offer</span>
              </div>
              <p className="text-xs text-[#6B5A4E] leading-relaxed">
                For established jewellers wanting full ornament catalogues, reviews, and store QR standees.
              </p>

              <div className="pt-4 border-t border-[#E8DFC8] space-y-2.5 text-xs text-[#3E342F]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span><strong>0% Commission</strong> &bull; Zero Gateways</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span>Up to 200 Ornaments &amp; Collections</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span>BIS Hallmark 916 Trust Badges</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span>Patron Reviews &amp; Jewellery Journal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span>Daily Gold Rates Ticker Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span>Downloadable Showroom QR Code</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenCreateModal}
              className="mt-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D061] hover:brightness-105 text-[#1F070B] font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Store className="w-4 h-4" />
              <span>Create Store (Silver Pro)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Plan 3: Gold VIP */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8DFC8] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FAF0D7] text-[#7A5B12] border border-[#E5C158]">
                Royal &amp; Chain Jewellers
              </div>
              <h3 className="text-xl font-bold font-royal text-[#2A1810]">Gold VIP</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold font-cinzel text-[#2A1810]">₹0</span>
                <span className="text-xs text-[#7A6855]">/ By Rahul&apos;s Invitation</span>
              </div>
              <p className="text-xs text-[#6B5A4E] leading-relaxed">
                Tailored for multi-branch showrooms needing unlimited catalogues and personalized concierge setup.
              </p>

              <div className="pt-4 border-t border-[#F0EAE1] space-y-2.5 text-xs text-[#3E342F]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span><strong>Unlimited</strong> Ornaments &amp; Categories</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span>Priority Placement on Live Showrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span>Custom Subdomain &amp; Branding</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span>Dedicated Personal Support by Rahul</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6D3E] shrink-0" />
                  <span>High-Priority Catalogue Import</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenCreateModal}
              className="mt-6 w-full py-2.5 px-4 rounded-xl border border-[#D4AF37] bg-[#FFF9E6] hover:bg-[#FAF0D7] text-[#7A5B12] font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Create Store (Gold VIP)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Pricing Reassurance Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-[#FAF0D7]/60 border border-[#E5C158] text-center text-xs text-[#7A5B12] max-w-2xl mx-auto">
          🔒 <strong>100% Free &amp; Self-Hosted Guarantee:</strong> We never charge fees on customer transactions. All financial settlements occur directly between you and your customers offline or via your personal UPI.
        </div>
      </section>

      {/* FOUNDER & DIRECT SUPPORT SECTION (Owner Rahul - 7087033009) */}
      <section id="contact-us" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-gradient-to-br from-[#4A0E17] via-[#5B141D] to-[#3B090F] rounded-3xl p-8 sm:p-10 text-white shadow-xl border-2 border-[#D4AF37]/50 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Crown className="w-48 h-48 text-[#D4AF37]" />
          </div>

          <div className="relative z-10 space-y-6 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-8">
            <div className="space-y-3 sm:max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F3E5AB] text-xs font-bold tracking-wider uppercase font-cinzel">
                Direct Owner Support
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-royal text-[#FFF8E7]">
                Contact Rahul for Platform Onboarding &amp; Custom Features
              </h3>
              <p className="text-xs sm:text-sm text-[#E1D3BF] leading-relaxed">
                Need assistance setting up your digital showroom, custom domains, or custom jewellery specifications? Reach out directly via call or WhatsApp.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#E5C158]">
                <span>✔ 100% Free Onboarding</span>
                <span>✔ Instant Store Activation</span>
                <span>✔ Dedicated Personal Support</span>
              </div>
            </div>

            <div className="shrink-0 bg-[#2A0E13]/80 p-5 rounded-2xl border border-[#D4AF37]/40 space-y-3.5 text-center sm:w-64">
              <div className="text-xs text-[#CBB99E] uppercase tracking-wider font-semibold">
                Platform Owner
              </div>
              <div className="text-xl font-bold font-royal text-[#FFF8E7]">
                Rahul
              </div>

              <a
                href="tel:7087033009"
                className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#2A0E13] font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call: 7087033009</span>
              </a>

              <a
                href="https://wa.me/917087033009?text=Namaste%20Rahul%20ji,%20I%20want%20to%20register%20my%20Jewellery%20Store%20on%20Jwellersname.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Message</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK REGISTER JEWELLERY STORE MODAL */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37] relative animate-in fade-in zoom-in duration-200">
            
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg"
            >
              ✕
            </button>

            <div className="text-center space-y-1.5 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#FAF0D7] text-[#8C6D23] mx-auto flex items-center justify-center border border-[#E5C158]">
                <Crown className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-royal text-[#2A1810]">
                Register Your Jewellery Store
              </h3>
              <p className="text-xs text-[#7A6855]">
                Create your digital showroom instantly and receive direct customer WhatsApp orders
              </p>
            </div>

            {registerSuccess ? (
              <div className="bg-[#EBF9F0] border border-[#A7E6BC] rounded-xl p-4 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#1B6D3E] mx-auto" />
                <h4 className="text-sm font-bold text-[#1B6D3E]">
                  Store Registered Successfully!
                </h4>
                <p className="text-xs text-[#2A1810]">
                  Opening your vendor dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuickRegister} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    Jewellery Store Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maharaja Gold &amp; Diamonds"
                    value={newStoreName}
                    onChange={(e) => setNewStoreName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBE] focus:outline-none focus:border-[#720917] text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#2A1810] mb-1">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Soni"
                      value={newOwnerName}
                      onChange={(e) => setNewOwnerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBE] focus:outline-none focus:border-[#720917] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2A1810] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jaipur / Mumbai"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBE] focus:outline-none focus:border-[#720917] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#2A1810] mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 7087033009"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBE] focus:outline-none focus:border-[#720917] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2A1810] mb-1">
                      WhatsApp Number (For Orders)
                    </label>
                    <input
                      type="tel"
                      placeholder="7087033009"
                      value={newWhatsApp}
                      onChange={(e) => setNewWhatsApp(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBE] focus:outline-none focus:border-[#720917] text-sm"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-[#7A6855] italic">
                  Note: No payment or card required. Your store activates immediately.
                </p>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4A0E17] to-[#720917] text-[#FFF8E7] font-bold text-sm hover:brightness-110 transition-all shadow-md"
                  >
                    Create Store &amp; Open Dashboard &rarr;
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
