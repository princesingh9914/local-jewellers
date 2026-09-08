import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Truck, 
  RotateCcw, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Award, 
  Scale, 
  Lock, 
  Building2, 
  Check, 
  Sparkles, 
  Printer, 
  MessageCircle, 
  ArrowLeft, 
  ExternalLink,
  ChevronRight,
  Send,
  HelpCircle,
  Copy
} from 'lucide-react';
import { AppView, PolicyType, Vendor } from '../../types';
import { storageService } from '../../services/storage';
import { POLICIES_DATA, PLATFORM_CONTACT } from '../../data/policyData';
import { SocialMediaLinks } from '../common/SocialMediaLinks';
import { HallmarkStamp } from '../common/IndianMotif';
import { VendorHeader } from '../store/VendorHeader';
import { VendorFooter } from '../store/VendorFooter';

interface PolicyPageProps {
  policyType: PolicyType;
  vendorSlug?: string;
  onNavigate: (view: AppView) => void;
  onOpenAdminAccess?: () => void;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ 
  policyType: initialPolicyType, 
  vendorSlug, 
  onNavigate,
  onOpenAdminAccess
}) => {
  const [activeTab, setActiveTab] = useState<PolicyType>(initialPolicyType || 'privacy');
  const [vendor, setVendor] = useState<Vendor | undefined>(undefined);
  
  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('General Policy Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(initialPolicyType);
  }, [initialPolicyType]);

  useEffect(() => {
    if (vendorSlug) {
      const v = storageService.getVendorBySlug(vendorSlug);
      setVendor(v);
    } else {
      setVendor(undefined);
    }
  }, [vendorSlug]);

  const activePolicy = POLICIES_DATA[activeTab] || POLICIES_DATA.privacy;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) return;

    // Direct WhatsApp message creation
    const targetPhone = vendor?.whatsapp || PLATFORM_CONTACT.whatsapp;
    const recipientName = vendor?.name || 'Rahul (Jwellersname Founder)';
    const text = `Namaste ${recipientName},\n\nNew Inquiry from Jwellersname Policy & Contact Page:\n• Name: ${contactName}\n• Mobile: ${contactPhone}\n• Subject: ${contactSubject}\n• Message: ${contactMessage || 'N/A'}\n\nPlease provide guidance.`;
    
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setFormSubmitted(true);
  };

  const getIconForHighlight = (iconName: string) => {
    switch (iconName) {
      case 'Lock': return <Lock className="w-5 h-5 text-[#8C232C]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#8C232C]" />;
      case 'FileText': return <FileText className="w-5 h-5 text-[#8C232C]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#8C232C]" />;
      case 'Award': return <Award className="w-5 h-5 text-[#8C232C]" />;
      case 'Scale': return <Scale className="w-5 h-5 text-[#8C232C]" />;
      case 'MessageCircle': return <MessageCircle className="w-5 h-5 text-[#8C232C]" />;
      case 'Truck': return <Truck className="w-5 h-5 text-[#8C232C]" />;
      case 'Check': return <Check className="w-5 h-5 text-[#8C232C]" />;
      case 'RotateCcw': return <RotateCcw className="w-5 h-5 text-[#8C232C]" />;
      case 'Clock': return <Clock className="w-5 h-5 text-[#8C232C]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#8C232C]" />;
      case 'Phone': return <Phone className="w-5 h-5 text-[#8C232C]" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-[#8C232C]" />;
      case 'Mail': return <Mail className="w-5 h-5 text-[#8C232C]" />;
      default: return <ShieldCheck className="w-5 h-5 text-[#8C232C]" />;
    }
  };

  const tabs: { id: PolicyType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'privacy', label: 'Privacy Policy', icon: Lock },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'shipping', label: 'Shipping Policy', icon: Truck },
    { id: 'refund', label: 'Cancellation & Refund', icon: RotateCcw },
    { id: 'contact', label: 'Contact Information', icon: Phone },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen flex flex-col justify-between">
      {/* If visiting in context of a vendor's website, show vendor's own header */}
      {vendor && (
        <VendorHeader
          vendor={vendor}
          onNavigate={onNavigate}
          onOpenAdminAccess={onOpenAdminAccess}
        />
      )}

      <div className="py-8 sm:py-12 flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFC8] pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-[#7A6855]">
              <button 
                onClick={() => onNavigate({ type: 'landing' })}
                className="hover:text-[#8C232C] transition-colors flex items-center gap-1 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <span>/</span>
              {vendor ? (
                <>
                  <button
                    onClick={() => onNavigate({ type: 'store', vendorSlug: vendor.slug })}
                    className="hover:text-[#8C232C] transition-colors font-medium truncate max-w-[160px]"
                  >
                    {vendor.name}
                  </button>
                  <span>/</span>
                </>
              ) : null}
              <span className="text-[#2A1810] font-bold">Policy &amp; Compliance Center</span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-royal font-bold text-[#2A1810]">
                {vendor ? `${vendor.name} &bull; Policies` : 'Legal & Compliance Center'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#7A6855]">
              Transparent BIS Hallmarking, Insured Jewellery Transit, Lifetime Buyback &amp; Patron Rights.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#D8CEBE] hover:bg-[#FAF6EE] text-[#2A1810] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#8C6D23]" />
              <span className="hidden sm:inline">Print Document</span>
            </button>

            {vendor ? (
              <button
                onClick={() => onNavigate({ type: 'store', vendorSlug: vendor.slug })}
                className="px-3.5 py-2 rounded-xl bg-[#720917] hover:bg-[#5C0712] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <span>Visit {vendor.name} Showroom</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <a
                href={`https://wa.me/${PLATFORM_CONTACT.whatsapp}?text=Hello%20Rahul%20ji,%20I%20have%20a%20legal%20or%20policy%20inquiry%20regarding%20Jwellersname.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Support on WhatsApp</span>
              </a>
            )}
          </div>
        </div>

        {/* Five Policy Tabs */}
        <div className="bg-white rounded-2xl p-1.5 border border-[#E8DFC8] shadow-2xs flex flex-wrap gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-[#720917] text-white shadow-xs'
                    : 'text-[#5C4D44] hover:bg-[#FAF6EE] hover:text-[#2A1810]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5C158]' : 'text-[#8C6D23]'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Policy Content Card */}
        <div className="bg-white rounded-3xl border border-[#E8DFC8] shadow-xs overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-linear-to-r from-[#2A0E13] via-[#4A121A] to-[#2A0E13] p-6 sm:p-8 text-[#F5EAD4] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-full opacity-10 pointer-events-none flex items-center justify-end pr-6">
              <HallmarkStamp className="w-64 h-64 text-[#D4AF37]" />
            </div>

            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D1017] border border-[#D4AF37]/40 text-[#E5C158] text-[11px] font-bold uppercase tracking-wider font-cinzel">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{activePolicy.badge || 'Official Showroom Policy'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-royal font-bold text-white">
                {activePolicy.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#E1D3BF] leading-relaxed">
                {activePolicy.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#CBB99E] pt-2">
                <span>Last Updated: {activePolicy.lastUpdated}</span>
                <span>&bull;</span>
                <span>Jurisdiction: Republic of India</span>
                <span>&bull;</span>
                <span className="text-[#E5C158] font-semibold">100% BIS Hallmarking Compliant</span>
              </div>
            </div>
          </div>

          {/* 4 Key Highlights Grid */}
          <div className="p-6 sm:p-8 border-b border-[#E8DFC8] bg-[#FAF8F5]">
            <h3 className="text-xs font-bold text-[#8C6D23] uppercase tracking-wider mb-4 font-cinzel">
              Guaranteed Protections &amp; Standards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activePolicy.keyHighlights.map((hl, i) => (
                <div 
                  key={i} 
                  className="bg-white p-4 rounded-2xl border border-[#E8DFC8] space-y-2 shadow-2xs hover:border-[#D4AF37] transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] flex items-center justify-center border border-[#E8DFC8]">
                    {getIconForHighlight(hl.icon)}
                  </div>
                  <h4 className="font-royal font-bold text-[#2A1810] text-sm">
                    {hl.title}
                  </h4>
                  <p className="text-xs text-[#7A6855] leading-relaxed">
                    {hl.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Paragraph Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {activePolicy.paragraphs.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-base sm:text-lg font-royal font-bold text-[#2A1810] flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-[#8C232C]" />
                  <span>{section.heading}</span>
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm text-[#4A3E38] leading-relaxed pl-3.5">
                  {section.body.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}

                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="space-y-2 pt-1">
                      {section.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#4A3E38]">
                          <span className="text-[#8C232C] font-bold mt-0.5">•</span>
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}

            {/* Special Section when Tab is 'contact' */}
            {activeTab === 'contact' && (
              <div className="pt-6 border-t border-[#E8DFC8] space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Direct Contact Cards */}
                  <div className="space-y-4">
                    <h3 className="text-base font-royal font-bold text-[#2A1810]">
                      Direct Assistance &amp; Escalations Desk
                    </h3>

                    <div className="space-y-3">
                      {/* Founder & Owner Card */}
                      <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#E5C158] space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[#8C232C] font-bold text-xs uppercase tracking-wider">
                            <Phone className="w-4 h-4" />
                            <span>Founder &amp; Owner Line</span>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-white text-[#8C6D23] rounded-full border border-[#D8CEBE]">
                            Direct Access
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-[#2A1810] text-sm">Rahul</p>
                            <p className="text-xs text-[#7A6855]">Managing Director &amp; Grievance Officer</p>
                          </div>
                          <a
                            href="tel:7087033009"
                            className="px-3 py-1.5 bg-[#720917] hover:bg-[#5C0712] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>7087033009</span>
                          </a>
                        </div>

                        <div className="pt-2 border-t border-[#E8DFC8] flex items-center justify-between">
                          <span className="text-xs text-[#7A6855]">WhatsApp Support:</span>
                          <a
                            href={`https://wa.me/917087033009?text=Hello%20Rahul%20ji,%20I%20am%20contacting%20you%20from%20Jwellersname.com`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-[#1e9647] hover:underline flex items-center gap-1"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span>+91 7087033009</span>
                          </a>
                        </div>
                      </div>

                      {/* Official Emails & Address */}
                      <div className="bg-white p-4 rounded-2xl border border-[#E8DFC8] space-y-2.5 text-xs">
                        <div className="flex items-start gap-2.5">
                          <Mail className="w-4 h-4 text-[#8C232C] shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="font-bold text-[#2A1810]">Official Inquiries:</span>
                            <div className="flex flex-wrap items-center gap-2">
                              <a href="mailto:rahul@jwellersname.com" className="text-[#8C232C] hover:underline">
                                rahul@jwellersname.com
                              </a>
                              <span>&bull;</span>
                              <a href="mailto:mrxsajwan@gmail.com" className="text-[#8C232C] hover:underline">
                                mrxsajwan@gmail.com
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 pt-2 border-t border-[#F0EAE1]">
                          <MapPin className="w-4 h-4 text-[#8C232C] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#2A1810]">Central Heritage Office:</span>
                            <p className="text-[#7A6855]">
                              {PLATFORM_CONTACT.address}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 pt-2 border-t border-[#F0EAE1]">
                          <Clock className="w-4 h-4 text-[#8C232C] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#2A1810]">Operating Hours:</span>
                            <p className="text-[#7A6855]">
                              {PLATFORM_CONTACT.businessHours}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* If Vendor Context exists, show their specific details too */}
                      {vendor && (
                        <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#E8DFC8] space-y-2 text-xs">
                          <h4 className="font-bold text-[#2A1810] flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-[#8C232C]" />
                            <span>{vendor.name} Showroom Details</span>
                          </h4>
                          <p className="text-[#5C4D44]"><strong className="text-[#2A1810]">Proprietor:</strong> {vendor.ownerName}</p>
                          <p className="text-[#5C4D44]"><strong className="text-[#2A1810]">Showroom Address:</strong> {vendor.address}, {vendor.city}, {vendor.state}</p>
                          {vendor.gstNumber && <p className="text-[#5C4D44]"><strong className="text-[#2A1810]">GSTIN:</strong> {vendor.gstNumber}</p>}
                          <p className="text-[#5C4D44]"><strong className="text-[#2A1810]">Direct Call:</strong> {vendor.phone}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Interactive Quick Message Form */}
                  <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E8DFC8] space-y-4">
                    <div className="space-y-1">
                      <h4 className="font-royal font-bold text-base text-[#2A1810]">
                        Send an Instant Inquiry / Message
                      </h4>
                      <p className="text-xs text-[#7A6855]">
                        Have a policy query, bulk purchase question, or hallmark verification need? Fill this out to connect directly on WhatsApp with Rahul.
                      </p>
                    </div>

                    {formSubmitted ? (
                      <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 space-y-2">
                        <div className="flex items-center gap-2 font-bold text-xs">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Inquiry Prepared Successfully!</span>
                        </div>
                        <p className="text-xs text-green-700">
                          Your message has been opened in WhatsApp. You can also call directly at <strong>7087033009</strong> for immediate resolution.
                        </p>
                        <button
                          type="button"
                          onClick={() => setFormSubmitted(false)}
                          className="text-xs font-bold text-green-800 underline pt-1"
                        >
                          Send another message
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                        <div>
                          <label className="block font-bold text-[#2A1810] mb-1">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="e.g. Smt. Sunita Sharma"
                            className="w-full px-3 py-2 rounded-xl border border-[#D8CEBE] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#8C232C]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-bold text-[#2A1810] mb-1">
                              Calling / WhatsApp Number *
                            </label>
                            <input
                              type="tel"
                              required
                              value={contactPhone}
                              onChange={(e) => setContactPhone(e.target.value)}
                              placeholder="e.g. 9876543210"
                              className="w-full px-3 py-2 rounded-xl border border-[#D8CEBE] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#8C232C]"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-[#2A1810] mb-1">
                              Inquiry Subject
                            </label>
                            <select
                              value={contactSubject}
                              onChange={(e) => setContactSubject(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-[#D8CEBE] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#8C232C]"
                            >
                              <option value="General Policy Inquiry">General Policy Inquiry</option>
                              <option value="BIS Hallmark & HUID Verification">BIS Hallmark &amp; HUID Verification</option>
                              <option value="Insured Shipping & Delivery Status">Insured Shipping &amp; Delivery Status</option>
                              <option value="Custom Bridal Jewellery Booking">Custom Bridal Jewellery Booking</option>
                              <option value="Lifetime Buyback & Exchange Query">Lifetime Buyback &amp; Exchange Query</option>
                              <option value="Jeweller Showroom Onboarding">Jeweller Showroom Onboarding</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-[#2A1810] mb-1">
                            Message / Specific Inquiry
                          </label>
                          <textarea
                            rows={3}
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            placeholder="Please describe your question or jewellery requirements..."
                            className="w-full px-3 py-2 rounded-xl border border-[#D8CEBE] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#8C232C]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 px-4 rounded-xl bg-[#720917] hover:bg-[#5C0712] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit &amp; Open Direct WhatsApp Discussion</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Social Media Links Section */}
        <SocialMediaLinks 
          vendor={vendor} 
          variant="card" 
        />

        {/* BIS Hallmark Trust Footer Strip */}
        <div className="bg-[#FAF6EE] rounded-2xl p-4 sm:p-5 border border-[#E8DFC8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <HallmarkStamp className="w-8 h-8 text-[#D4AF37] shrink-0" />
            <div>
              <h5 className="font-bold text-[#2A1810]">
                Bureau of Indian Standards (BIS) Hallmarking Assurance
              </h5>
              <p className="text-[#7A6855] text-[11px]">
                Verify any 6-digit HUID instantly using the official BIS CARE app on iOS and Android.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://www.bis.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8C6D23] hover:text-[#8C232C] font-semibold underline flex items-center gap-1 text-xs"
            >
              <span>BIS Official Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </div>

      {/* If visiting in context of a vendor's website, show vendor's own footer */}
      {vendor && (
        <VendorFooter
          vendor={vendor}
          onNavigate={onNavigate}
          onOpenAdminAccess={onOpenAdminAccess}
        />
      )}
    </div>
  );
};
