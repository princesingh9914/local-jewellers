import React, { useState } from 'react';
import { 
  Crown, 
  Store, 
  X, 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  CheckCircle2,
  Gem,
  Building2,
  ShieldCheck,
  Lock,
  KeyRound
} from 'lucide-react';
import { Vendor, AppView } from '../../types';
import { storageService } from '../../services/storage';
import { authApi } from '../../services/authApi';

interface CreateStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AppView) => void;
  defaultPlan?: Vendor['plan'];
}

export const CreateStoreModal: React.FC<CreateStoreModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  defaultPlan = 'Gold VIP'
}) => {
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Rajasthan');
  const [tagline, setTagline] = useState('Authentic 916 Hallmark Gold & Diamond Jewellery');
  const [plan, setPlan] = useState<Vendor['plan']>(defaultPlan);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdSlug, setCreatedSlug] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim() || !phone.trim()) return;

    const slug = storeName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newVendor: Vendor = {
      id: `vendor_${Date.now()}`,
      name: storeName.trim(),
      slug: slug || `jeweller-${Date.now()}`,
      ownerName: ownerName.trim() || 'Jeweller Owner',
      phone: phone.trim(),
      whatsapp: (whatsapp.trim() || phone.trim()).replace(/\D/g, ''),
      email: `${slug}@jwellersname.com`,
      city: city.trim() || 'Jaipur',
      state: state.trim() || 'India',
      address: `${city.trim() || 'Jewellery Market'}, ${state.trim() || 'India'}`,
      logo: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&auto=format&fit=crop&q=80',
      tagline: tagline.trim() || 'Authentic 916 Hallmark Gold & Diamond Jewellery',
      themeColor: '#720917',
      isActive: true,
      isVerified: true,
      plan: plan,
      createdAt: new Date().toISOString().split('T')[0],
      aboutText: 'Trusted family jewellers offering pure hallmark certified jewellery, bespoke bridal sets, and zero-commission WhatsApp consultations.',
      hallmarkCertified: true,
      upiId: `${slug}@upi`
    };

    storageService.saveVendor(newVendor);

    // Register unique vendor credentials in secure backend
    authApi.registerVendorCredentials(
      newVendor.id,
      newVendor.name,
      newVendor.phone,
      loginPassword.trim() || `${slug}@123`,
      loginPin.trim() || '1234'
    );

    setCreatedSlug(newVendor.slug);
    setIsSuccess(true);

    setTimeout(() => {
      onNavigate({ type: 'store', vendorSlug: newVendor.slug });
      onClose();
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#D4AF37] overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1F070B] text-white p-5 border-b-2 border-[#D4AF37] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#F5D061]">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-base font-bold text-[#F5D061] tracking-wide">
                Create Jewellery Store
              </h3>
              <p className="text-xs text-white/70">
                Launch your free digital showroom with WhatsApp orders
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {isSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-cinzel text-xl font-bold text-[#2A1810]">
                Store Created Successfully!
              </h4>
              <p className="text-xs text-[#6B5A4E] max-w-sm mx-auto">
                Your new digital showroom is live with 100% tenant isolation and WhatsApp ordering. Redirecting to your storefront...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Highlight Badge */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF0D7] border border-[#E5C158] text-[11px] text-[#7A5B12]">
                <Crown className="w-4 h-4 text-[#B8860B] shrink-0" />
                <span>
                  <strong>100% Free Forever</strong> &bull; 0% Commission &bull; Instant Store Activation
                </span>
              </div>

              {/* Showroom Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#2A1810]">
                  Showroom / Jeweller Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Building2 className="w-4 h-4 text-[#B8860B]" />
                  </div>
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="e.g. Kalyan Jewellers, Rajwada Ornaments"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#D8CEBE] rounded-xl focus:ring-2 focus:ring-[#720917] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Owner Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#2A1810]">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Ramesh Verma"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D8CEBE] rounded-xl focus:ring-2 focus:ring-[#720917] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#2A1810]">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D8CEBE] rounded-xl focus:ring-2 focus:ring-[#720917] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* WhatsApp Number & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#2A1810]">
                    WhatsApp Number (for Orders)
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D8CEBE] rounded-xl focus:ring-2 focus:ring-[#720917] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#2A1810]">
                    City &amp; State
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D8CEBE] rounded-xl focus:ring-2 focus:ring-[#720917] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#2A1810]">
                  Tagline / Speciality
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Exclusive 22K/18K Hallmark Bridal Jewellery"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D8CEBE] rounded-xl focus:ring-2 focus:ring-[#720917] focus:outline-hidden"
                />
              </div>

              {/* Plan Choice */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#2A1810]">
                  Select Plan
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Free Starter', 'Silver Pro', 'Gold VIP'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlan(p)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        plan === p
                          ? 'bg-[#720917] text-[#FFF8E7] border-[#720917] shadow-xs'
                          : 'bg-[#FAF8F5] text-[#4A3E35] border-[#D8CEBE] hover:bg-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vendor Account Credentials */}
              <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#E8DFC8] space-y-2">
                <div className="font-bold text-[#720917] text-xs flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Showroom Staff Login Credentials</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#2A1810] mb-0.5">
                      Password (Optional)
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Default: store@123"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#D8CEBE] rounded-lg font-mono focus:ring-2 focus:ring-[#720917]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#2A1810] mb-0.5">
                      4-Digit PIN (Optional)
                    </label>
                    <input
                      type="password"
                      maxLength={6}
                      value={loginPin}
                      onChange={(e) => setLoginPin(e.target.value)}
                      placeholder="Default: 1234"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#D8CEBE] rounded-lg font-mono font-bold focus:ring-2 focus:ring-[#720917]"
                    />
                  </div>
                </div>
              </div>

              {/* Support note */}
              <div className="text-[11px] text-[#7A6855] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E8DFC8]">
                Need assistance? Call platform owner Rahul ji at{' '}
                <a href="tel:7087033009" className="font-bold text-[#720917] underline">
                  7087033009
                </a>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-[#1F070B] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:brightness-105 active:scale-98 transition-all"
              >
                <Store className="w-4 h-4" />
                <span>Launch My Free Jewellery Store Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
