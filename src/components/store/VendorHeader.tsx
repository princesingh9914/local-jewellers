import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  ShoppingBag, 
  Search, 
  X, 
  Menu, 
  Sparkles, 
  BookOpen, 
  ChevronDown, 
  Share2,
  Lock,
  FileText,
  Truck,
  RotateCcw,
  Gem,
  Check,
  Building2,
  Award,
  Store,
  Info,
  Package,
  Mail,
  QrCode,
  Users,
  Mic
} from 'lucide-react';
import { Vendor, Category, AppView, PolicyType } from '../../types';
import { PaymentQrModal } from './PaymentQrModal';

interface VendorHeaderProps {
  vendor: Vendor;
  cartCount?: number;
  onOpenCart?: () => void;
  onNavigate: (view: AppView) => void;
  onOpenAdminAccess?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  categories?: Category[];
  selectedCategory?: string;
  onSelectCategory?: (catId: string) => void;
  activeNavTab?: string;
  onSelectNavTab?: (tab: 'home' | 'categories' | 'about' | 'showroom') => void;
  hasReviews?: boolean;
  hasBlogs?: boolean;
  hasFaqs?: boolean;
  onOpenVoiceAssistant?: () => void;
}

export const VendorHeader: React.FC<VendorHeaderProps> = ({
  vendor,
  cartCount = 0,
  onOpenCart,
  onNavigate,
  onOpenAdminAccess,
  searchQuery = '',
  onSearchChange,
  categories = [],
  selectedCategory = 'all',
  onSelectCategory,
  activeNavTab = 'home',
  onSelectNavTab,
  hasReviews = false,
  hasBlogs = false,
  hasFaqs = false,
  onOpenVoiceAssistant
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [policiesDropdownOpen, setPoliciesDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const policiesRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (policiesRef.current && !policiesRef.current.contains(e.target as Node)) {
        setPoliciesDropdownOpen(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cleanWhatsApp = vendor.whatsapp ? vendor.whatsapp.replace(/\D/g, '') : '';
  const themeColor = vendor.themeColor || '#720917';

  const handleShareStore = () => {
    const url = `${window.location.origin}/?store=${vendor.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handlePolicyNavigate = (policyType: PolicyType) => {
    setMobileMenuOpen(false);
    setPoliciesDropdownOpen(false);
    onNavigate({ type: 'policy', policyType, vendorSlug: vendor.slug });
  };

  const handleCategoryClick = (catId: string) => {
    onSelectCategory?.(catId);
    onSelectNavTab?.('home');
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
    const elem = document.getElementById('products-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBrandClick = () => {
    if (window.location.search.includes('policy')) {
      onNavigate({ type: 'store', vendorSlug: vendor.slug });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onSelectNavTab?.('home');
      onSelectCategory?.('all');
    }
  };

  const [showPaymentQrModal, setShowPaymentQrModal] = useState(false);

  // Navigation Handlers for the 6 requested menu items:
  // Home | About | Categories (as Products) | New Collection | Our Clients | Contact Us

  // 1. Home
  const handleNavHome = () => {
    setMobileMenuOpen(false);
    onSelectNavTab?.('home');
    onSelectCategory?.('all');
    const heroEl = document.getElementById('store-hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 2. About
  const handleNavAbout = () => {
    setMobileMenuOpen(false);
    onSelectNavTab?.('about');
    const aboutEl = document.getElementById('about-section') || document.getElementById('showroom-section');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3. Categories (as Products)
  const handleNavCategories = () => {
    setMobileMenuOpen(false);
    onSelectNavTab?.('home');
    const prodEl = document.getElementById('products-section') || document.getElementById('categories-section');
    if (prodEl) {
      prodEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 4. New Collection
  const handleNavNewCollection = () => {
    setMobileMenuOpen(false);
    onSelectNavTab?.('home');
    onSelectCategory?.('all');
    const prodEl = document.getElementById('products-section');
    if (prodEl) {
      prodEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 5. Our Clients
  const handleNavOurClients = () => {
    setMobileMenuOpen(false);
    const clientsEl = document.getElementById('testimonials-section') || document.getElementById('about-section');
    if (clientsEl) {
      clientsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 6. Contact Us
  const handleNavContactUs = () => {
    setMobileMenuOpen(false);
    onSelectNavTab?.('showroom');
    const showroomEl = document.getElementById('showroom-section') || document.getElementById('contact-section');
    if (showroomEl) {
      showroomEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Vendor Portal / Merchant Login
  const handleNavMerchant = () => {
    setMobileMenuOpen(false);
    onNavigate({ type: 'vendor', vendorId: vendor.id });
  };

  const handleNavLogin = () => {
    setMobileMenuOpen(false);
    if (onOpenAdminAccess) {
      onOpenAdminAccess();
    } else {
      onNavigate({ type: 'vendor', vendorId: vendor.id });
    }
  };

  const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=Hello%20${encodeURIComponent(vendor.name)},%20I%20am%20visiting%20your%20digital%20showroom%20and%20would%20like%20to%20inquire.`;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-[#E8DFC8]">
      
      {/* 1. TOP INFO LINE */}
      {/* Requested: “100% Certified 22K (916) & 18K Hallmarked Jewellery • Showroom in Jaipur, India” */}
      {/* Added: Vendor Login button + Email ID. Removed: Phone Number aur Share Button */}
      <div 
        className="text-white text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-black/10 transition-colors"
        style={{ backgroundColor: themeColor }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          
          {/* Left: Top Info Line Text */}
          <div className="flex items-center gap-2 text-xs shrink-0 whitespace-nowrap">
            <span className="text-[#E5C158] font-bold text-sm leading-none">✦</span>
            <span className="font-semibold tracking-wide text-white/95">
              100% Certified 22K (916) &amp; 18K Hallmarked Jewellery • Showroom in {vendor.city || 'Jaipur'}, {vendor.state || 'India'}
            </span>
          </div>

          {/* Right: Email ID + Vendor Login button */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs shrink-0 whitespace-nowrap">
            
            {/* Email ID */}
            <a 
              href={`mailto:${vendor.email || `${vendor.slug}@jwellersname.com`}`}
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
              title="Email Showroom"
            >
              <Mail className="w-3.5 h-3.5 text-[#E5C158]" />
              <span className="font-medium text-xs hidden sm:inline">{vendor.email || `${vendor.slug}@jwellersname.com`}</span>
              <span className="font-medium text-xs sm:hidden">Email</span>
            </a>

            <span className="text-white/30 hidden sm:inline">|</span>

            {/* Vendor Login button */}
            <button
              onClick={handleNavMerchant}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FAF0D7]/20 hover:bg-[#FAF0D7]/30 border border-[#E5C158]/50 text-[#F5D061] hover:text-white transition-all text-[11px] font-bold"
              title="Vendor Showroom Portal Login"
            >
              <Lock className="w-3 h-3 text-[#E5C158]" />
              <span>Vendor Login</span>
            </button>

          </div>

        </div>
      </div>

      {/* 2. JEWELLERY INFO SECTION */}
      {/* Requested: “Prince Jewellers | BIS Certified | Jaipur • Authentic 916 Hallmark Jewellery & Bespoke Ornaments” */}
      {/* Added: Phone Number button + Payment QR Code */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-200 ${isScrolled ? 'py-2' : 'py-3'}`}>
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Jewellery Info (Logo + Name + BIS Certified badge + City • Tagline) */}
          <div 
            onClick={handleBrandClick}
            className="flex items-center gap-3 cursor-pointer group shrink-0 min-w-0"
          >
            {/* Showroom Logo */}
            <div className="relative shrink-0">
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl object-cover border-2 border-[#D4AF37] shadow-xs bg-white group-hover:scale-105 transition-transform"
              />
              {vendor.hallmarkCertified && (
                <div 
                  className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-[#D4AF37]" 
                  title="BIS 916 Hallmark Certified Showroom"
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#B8860B] to-[#F5D061] flex items-center justify-center text-white">
                    <ShieldCheck className="w-2.5 h-2.5 text-white stroke-[2.5]" />
                  </div>
                </div>
              )}
            </div>

            {/* Jewellery Titles */}
            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-cinzel text-lg sm:text-2xl font-bold text-[#1F070B] tracking-wide leading-tight capitalize group-hover:text-[#720917] transition-colors truncate">
                  {vendor.name || 'Prince Jewellers'}
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FAF0D7] text-[#7A5B12] border border-[#E5C158] shrink-0">
                  <Award className="w-3 h-3 text-[#D4AF37]" />
                  <span>BIS Certified</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#6B5A4E] font-medium leading-normal truncate max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg">
                <span className="flex items-center gap-1 text-[#720917] font-semibold shrink-0">
                  <MapPin className="w-3 h-3 text-[#720917]" />
                  <span>{vendor.city || 'Jaipur'}</span>
                  <span className="text-[#D4AF37]">&bull;</span>
                </span>
                <span className="truncate">
                  {vendor.tagline || 'Authentic 916 Hallmark Jewellery & Bespoke Ornaments'}
                </span>
              </div>
            </div>
          </div>

          {/* Center: Live Product Search Bar (Desktop) */}
          {onSearchChange && (
            <div className="hidden xl:flex flex-1 max-w-xs mx-2">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#998A78]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search jewellery..."
                  className="w-full pl-10 pr-16 py-1.5 rounded-xl text-xs sm:text-sm bg-[#FAF8F5] border border-[#E8DFC8] text-[#2A1810] placeholder:text-[#998A78] focus:bg-white focus:border-[#720917] focus:ring-1 focus:ring-[#720917] focus:outline-hidden transition-all"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {onOpenVoiceAssistant && (
                    <button
                      type="button"
                      onClick={onOpenVoiceAssistant}
                      className="p-1 rounded-full text-[#8C6D23] hover:text-[#720917] hover:bg-[#FAF0D7] transition-all"
                      title="AI Voice Search / बोलकर खोजें"
                    >
                      <Mic className="w-3.5 h-3.5 animate-pulse" />
                    </button>
                  )}
                  {searchQuery && (
                    <button
                      onClick={() => onSearchChange('')}
                      className="p-0.5 rounded-full text-[#998A78] hover:text-[#2A1810]"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Right: Phone Number button + Payment QR Code + AI Voice + Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* AI Voice Assistant button */}
            {onOpenVoiceAssistant && (
              <button
                onClick={onOpenVoiceAssistant}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#FAF0D7] to-[#F5E6BE] hover:brightness-105 border border-[#E5C158] text-[#720917] font-bold text-xs sm:text-sm shadow-2xs transition-all whitespace-nowrap group"
                title="AI Voice: Speak to search ornaments or ask questions"
              >
                <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#720917] group-hover:scale-110 transition-transform animate-pulse" />
                <span className="hidden sm:inline font-bold">AI Voice</span>
                <span className="sm:hidden font-bold">Voice</span>
              </button>
            )}

            {/* Phone Number button */}
            {vendor.phone && (
              <a
                href={`tel:${vendor.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-[#D4AF37] bg-[#FAF8F5] hover:bg-[#FAF0D7] text-[#720917] font-bold text-xs sm:text-sm shadow-2xs transition-all whitespace-nowrap group"
                title={`Call Showroom: ${vendor.phone}`}
              >
                <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#720917] group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline font-bold">{vendor.phone}</span>
                <span className="sm:hidden font-bold">Call</span>
              </a>
            )}

            {/* Payment QR Code button */}
            <button
              onClick={() => setShowPaymentQrModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] hover:brightness-105 text-[#1F070B] font-bold text-xs sm:text-sm shadow-xs transition-all whitespace-nowrap border border-[#B8860B]/40 group"
              title="Showroom UPI & Payment QR Code"
            >
              <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1F070B] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Payment QR Code</span>
              <span className="sm:hidden">Pay QR</span>
            </button>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-bold transition-all shadow-2xs whitespace-nowrap"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Whatsapp</span>
            </a>

            {/* Cart Button */}
            {onOpenCart && (
              <button
                onClick={onOpenCart}
                className="relative inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#FAF0D7] hover:bg-[#F5E6BE] text-[#8C6D23] border border-[#E5C158] font-bold text-xs sm:text-sm transition-all shadow-2xs group whitespace-nowrap"
                title="View Selected Jewellery Bag"
              >
                <ShoppingBag className="w-4 h-4 text-[#8C6D23] group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Cart</span>
                <span className="w-5 h-5 rounded-full bg-[#720917] text-white text-[11px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-[#E8DFC8] bg-[#FAF8F5] text-[#2A1810] hover:bg-[#FAF0D7] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* 3. NAVIGATION MENU (Desktop) */}
      {/* Requested Items: Home | About | Categories (as Products) | New Collection | Our Clients | Contact Us */}
      <div className="hidden md:block border-t border-[#F0EAE1] bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          <nav className="flex items-center gap-1 sm:gap-2 py-2 overflow-x-auto scrollbar-none text-xs sm:text-sm font-semibold text-[#4A3E35]">
            
            {/* 1. Home */}
            <button
              onClick={handleNavHome}
              className={`px-3.5 py-1.5 rounded-lg transition-colors shrink-0 whitespace-nowrap ${
                activeNavTab === 'home' && selectedCategory === 'all'
                  ? 'bg-[#720917] text-white font-bold' 
                  : 'hover:bg-white text-[#2A1810]'
              }`}
            >
              Home
            </button>

            {/* 2. About */}
            <button
              onClick={handleNavAbout}
              className={`px-3.5 py-1.5 rounded-lg transition-colors shrink-0 whitespace-nowrap ${
                activeNavTab === 'about'
                  ? 'bg-[#720917] text-white font-bold'
                  : 'hover:bg-white text-[#2A1810]'
              }`}
            >
              About
            </button>

            {/* 3. Categories (as Products) */}
            <div className="relative" ref={categoriesRef}>
              <div className="flex items-center">
                <button
                  onClick={handleNavCategories}
                  className="px-3.5 py-1.5 rounded-lg hover:bg-white text-[#2A1810] flex items-center gap-1.5 transition-colors shrink-0 whitespace-nowrap"
                >
                  <Gem className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Categories (as Products)</span>
                </button>
                {categories.length > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCategoriesDropdownOpen(!categoriesDropdownOpen);
                    }}
                    className="p-1 rounded-md text-[#7A6855] hover:text-[#2A1810] hover:bg-white transition-colors ml-0.5"
                    title="Filter by category"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {categoriesDropdownOpen && categories.length > 0 && (
                <div className="absolute left-0 top-full mt-1.5 w-56 rounded-xl bg-white border border-[#E8DFC8] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <button
                    onClick={() => handleCategoryClick('all')}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-[#FAF6EE] transition-colors ${
                      selectedCategory === 'all' ? 'font-bold text-[#720917]' : 'text-[#2A1810]'
                    }`}
                  >
                    <span>All Products &amp; Jewellery</span>
                    {selectedCategory === 'all' && <Check className="w-3.5 h-3.5 text-[#720917]" />}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-[#FAF6EE] transition-colors ${
                        selectedCategory === cat.id ? 'font-bold text-[#720917]' : 'text-[#2A1810]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.id && <Check className="w-3.5 h-3.5 text-[#720917]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. New Collection */}
            <button
              onClick={handleNavNewCollection}
              className="px-3.5 py-1.5 rounded-lg hover:bg-white text-[#2A1810] flex items-center gap-1.5 transition-colors shrink-0 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>New Collection</span>
            </button>

            {/* 5. Our Clients */}
            <button
              onClick={handleNavOurClients}
              className="px-3.5 py-1.5 rounded-lg hover:bg-white text-[#2A1810] flex items-center gap-1.5 transition-colors shrink-0 whitespace-nowrap"
            >
              <Users className="w-3.5 h-3.5 text-[#8C6D23]" />
              <span>Our Clients</span>
            </button>

            {/* 6. Contact Us */}
            <button
              onClick={handleNavContactUs}
              className={`px-3.5 py-1.5 rounded-lg hover:bg-white text-[#2A1810] flex items-center gap-1.5 transition-colors shrink-0 whitespace-nowrap ${
                activeNavTab === 'showroom' ? 'bg-[#720917] text-white font-bold' : ''
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#720917]" />
              <span>Contact Us</span>
            </button>

          </nav>

          {/* Right status badge */}
          <div className="hidden xl:flex items-center gap-2 text-xs text-[#5C4D44] shrink-0 font-medium whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Showroom Open &bull; {vendor.city || 'Jaipur'}</span>
          </div>

        </div>
      </div>

      {/* 4. MOBILE SLIDE-OUT DRAWER */}
      {/* Contains exact requested 6 items: Home | About | Categories (as Products) | New Collection | Our Clients | Contact Us */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E8DFC8] px-4 py-4 space-y-3 max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-top-2">
          
          <div className="text-[11px] font-bold text-[#8C6D23] uppercase tracking-wider pb-1 border-b border-[#F0EAE1]">
            Navigation Menu
          </div>

          {/* Quick Action Buttons in Mobile: Phone + Payment QR */}
          <div className="grid grid-cols-2 gap-2">
            {vendor.phone && (
              <a
                href={`tel:${vendor.phone}`}
                className="py-2 px-3 rounded-xl border border-[#D4AF37] bg-[#FAF8F5] text-[#720917] text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#720917]" />
                <span>Call {vendor.phone}</span>
              </a>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowPaymentQrModal(true);
              }}
              className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-[#1F070B] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Payment QR</span>
            </button>
          </div>

          {/* Mobile Search Box with Voice */}
          {onSearchChange && (
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#998A78]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search jewellery..."
                className="w-full pl-10 pr-12 py-2 rounded-xl text-xs bg-[#FAF8F5] border border-[#E8DFC8] text-[#2A1810] focus:outline-none focus:border-[#720917]"
              />
              {onOpenVoiceAssistant && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenVoiceAssistant();
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#FAF0D7] text-[#720917] hover:bg-[#F3E5C2] transition-all"
                  title="Search by Voice / बोलकर खोजें"
                >
                  <Mic className="w-3.5 h-3.5 animate-pulse" />
                </button>
              )}
            </div>
          )}

          {/* Core 6 Requested Navigation Items in Mobile */}
          <div className="space-y-1 text-sm font-semibold text-[#2A1810]">
            
            {/* 1. Home */}
            <button
              onClick={handleNavHome}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#FAF6EE] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span>🏠</span>
                <span>Home</span>
              </div>
              <span className="text-xs text-[#7A6855] font-normal">Showroom Top</span>
            </button>

            {/* 2. About */}
            <button
              onClick={handleNavAbout}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#FAF6EE] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span>ℹ️</span>
                <span>About</span>
              </div>
              <span className="text-xs text-[#7A6855] font-normal">Showroom Legacy</span>
            </button>

            {/* 3. Categories (as Products) */}
            <button
              onClick={handleNavCategories}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#FAF6EE] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Gem className="w-4 h-4 text-[#D4AF37]" />
                <span>Categories (as Products)</span>
              </div>
              <span className="text-xs text-[#8C6D23] font-bold">
                {categories.length} Categories
              </span>
            </button>

            {/* 4. New Collection */}
            <button
              onClick={handleNavNewCollection}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#FAF6EE] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>New Collection</span>
              </div>
              <span className="text-[10px] font-bold bg-[#FAF0D7] text-[#8C6D23] px-2 py-0.5 rounded">
                Trending
              </span>
            </button>

            {/* 5. Our Clients */}
            <button
              onClick={handleNavOurClients}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#FAF6EE] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#8C6D23]" />
                <span>Our Clients</span>
              </div>
              <span className="text-xs text-[#7A6855] font-normal">Reviews</span>
            </button>

            {/* 6. Contact Us */}
            <button
              onClick={handleNavContactUs}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#FAF6EE] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span>📍</span>
                <span>Contact Us</span>
              </div>
              <span className="text-xs text-[#7A6855] font-normal">{vendor.city || 'Jaipur'}</span>
            </button>

          </div>

          {/* Showroom Policies & Legal */}
          <div className="pt-2 border-t border-[#F0EAE1] space-y-1">
            <span className="text-[10px] text-[#8C6D23] font-bold uppercase tracking-wider block">
              Showroom Policies:
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-[#5C4D44]">
              <button
                onClick={() => handlePolicyNavigate('shipping')}
                className="text-left px-2.5 py-1.5 rounded-lg hover:bg-[#FAF6EE]"
              >
                Insured Shipping
              </button>
              <button
                onClick={() => handlePolicyNavigate('refund')}
                className="text-left px-2.5 py-1.5 rounded-lg hover:bg-[#FAF6EE]"
              >
                Buyback Policy
              </button>
              <button
                onClick={() => handlePolicyNavigate('terms')}
                className="text-left px-2.5 py-1.5 rounded-lg hover:bg-[#FAF6EE]"
              >
                Terms &amp; BIS
              </button>
              <button
                onClick={() => handlePolicyNavigate('privacy')}
                className="text-left px-2.5 py-1.5 rounded-lg hover:bg-[#FAF6EE]"
              >
                Privacy Policy
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Showroom Payment QR Modal */}
      <PaymentQrModal
        isOpen={showPaymentQrModal}
        onClose={() => setShowPaymentQrModal(false)}
        vendor={vendor}
      />

    </header>
  );
};
