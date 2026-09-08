import React, { useState, useRef, useEffect } from 'react';
import { 
  Crown, 
  Store, 
  ShieldCheck, 
  PhoneCall, 
  MessageCircle, 
  Menu, 
  X, 
  ShoppingBag,
  Sparkles, 
  ChevronDown,
  Lock,
  Plus,
  HelpCircle,
  Tag,
  Users
} from 'lucide-react';
import { AppView, Vendor } from '../../types';
import { storageService } from '../../services/storage';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  activeVendor?: Vendor;
  onOpenAdminAccess?: () => void;
  onOpenCreateStore?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount = 0,
  onOpenCart,
  activeVendor,
  onOpenAdminAccess,
  onOpenCreateStore
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showVendorSelect, setShowVendorSelect] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const vendors = storageService.getVendors().filter(v => v.isActive);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowVendorSelect(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Universal navigation helper
  const handleNav = (sectionId: string) => {
    if (sectionId === 'home') {
      if (currentView.type !== 'landing') {
        onNavigate({ type: 'landing' });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView.type !== 'landing') {
      onNavigate({ type: 'landing' });
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFC8]/80 shadow-xs transition-all">
      {/* Top Auspicious Gold Bar */}
      <div className="bg-[#4A0E17] text-[#F3E5AB] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37]">✦</span>
            <span className="font-medium tracking-wide">
              India&apos;s 100% Free &amp; Self-Hosted Jewellery SaaS Platform
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a 
              href="tel:7087033009" 
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#E5C158]" />
              <span>Owner: Rahul (<strong>7087033009</strong>)</span>
            </a>
            <span className="text-[#8C6D23]">|</span>
            <a 
              href="https://wa.me/917087033009?text=Hello%20Rahul%20ji,%20I%20am%20interested%20in%20Jwellersname.com%20software" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 text-[#25D366] hover:text-[#45ea82] transition-colors"
            >
              <MessageCircle className="w-3 h-3 fill-current" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4A0E17] to-[#720917] flex items-center justify-center text-[#E5C158] shadow-md border border-[#D4AF37]/30 group-hover:scale-105 transition-transform">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight font-cinzel text-[#2A1810]">
                  Jwellersname<span className="text-[#B8860B]">.com</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold bg-[#FAF0D7] text-[#8C6D23] border border-[#E5C158] rounded">
                  SaaS
                </span>
              </div>
              <p className="text-[11px] text-[#7A6855] tracking-wider font-medium">
                Indian Jewellers Digital Showroom &amp; WhatsApp Commerce
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links: Home, Live store, how it work, pricing, contact us, login, create stores */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* 1. Home */}
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-colors ${
                currentView.type === 'landing'
                  ? 'text-[#720917] bg-[#FAF0D7]/60 border border-[#E5C158]/50 font-bold' 
                  : 'text-[#4A3E35] hover:text-[#720917] hover:bg-[#FAF6EE]'
              }`}
            >
              Home
            </button>

            {/* 2. Live store */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center">
                <button
                  onClick={() => handleNav('live-stores')}
                  className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-[#4A3E35] hover:text-[#720917] hover:bg-[#FAF6EE] transition-colors flex items-center gap-1.5"
                >
                  <Store className="w-4 h-4 text-[#B8860B]" />
                  <span>Live store</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#FAF0D7] text-[#8C6D23] text-[10px] font-bold border border-[#E5C158]">
                    {vendors.length}
                  </span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVendorSelect(!showVendorSelect);
                  }}
                  className="p-1 rounded-md text-[#7A6855] hover:text-[#2A1810] hover:bg-[#FAF6EE] transition-colors ml-0.5"
                  title="View all live stores"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {showVendorSelect && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#E8DFC8] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 border-b border-[#F0EAE1] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#8C6D23] uppercase tracking-wider">
                      Select Live Store
                    </span>
                    <span className="text-[10px] text-[#7A6855]">
                      {vendors.length} Showrooms
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {vendors.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          onNavigate({ type: 'store', vendorSlug: v.slug });
                          setShowVendorSelect(false);
                        }}
                        className="w-full text-left px-3 py-2.5 hover:bg-[#FAF6EE] flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img 
                            src={v.logo} 
                            alt={v.name} 
                            className="w-8 h-8 rounded-full object-cover border border-[#E8DFC8] shrink-0"
                          />
                          <div className="truncate">
                            <div className="text-xs font-semibold text-[#2A1810] group-hover:text-[#720917] truncate">
                              {v.name}
                            </div>
                            <div className="text-[10px] text-[#7A6855] truncate">
                              {v.city}, {v.state}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] bg-[#FAF0D7] text-[#8C6D23] px-2 py-0.5 rounded font-bold shrink-0">
                          Visit
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="pt-1.5 border-t border-[#F0EAE1] px-3">
                    <button
                      onClick={() => {
                        setShowVendorSelect(false);
                        handleNav('live-stores');
                      }}
                      className="w-full py-1.5 text-center text-xs font-bold text-[#720917] hover:underline"
                    >
                      View All Live Showrooms &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. How it work */}
            <button
              onClick={() => handleNav('how-it-works')}
              className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-[#4A3E35] hover:text-[#720917] hover:bg-[#FAF6EE] transition-colors"
            >
              How it work
            </button>

            {/* 4. Pricing */}
            <button
              onClick={() => handleNav('pricing')}
              className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-[#4A3E35] hover:text-[#720917] hover:bg-[#FAF6EE] transition-colors"
            >
              Pricing
            </button>

            {/* 5. Contact us */}
            <button
              onClick={() => handleNav('contact-us')}
              className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-[#4A3E35] hover:text-[#720917] hover:bg-[#FAF6EE] transition-colors"
            >
              Contact us
            </button>

            {/* 6. Login */}
            <button
              onClick={() => {
                if (onOpenAdminAccess) {
                  onOpenAdminAccess();
                } else {
                  onNavigate({ type: 'admin' });
                }
              }}
              className="px-3.5 py-1.5 rounded-xl border border-[#D8CEBE] hover:border-[#720917] text-[#2A1810] hover:text-[#720917] hover:bg-[#FAF6EE] text-xs xl:text-sm font-bold transition-all flex items-center gap-1.5 ml-2"
              title="Jeweller Staff & Admin Portal Login"
            >
              <Lock className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Login</span>
            </button>

            {/* 7. Create stores */}
            <button
              onClick={() => {
                if (onOpenCreateStore) {
                  onOpenCreateStore();
                } else {
                  handleNav('pricing');
                }
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] hover:brightness-105 text-[#1F070B] text-xs xl:text-sm font-bold shadow-md active:scale-95 transition-all flex items-center gap-1.5 ml-1"
            >
              <Store className="w-4 h-4 text-[#1F070B]" />
              <span>Create stores</span>
            </button>

          </nav>

          {/* Mobile Right Controls: Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Quick Create Store on Mobile */}
            <button
              onClick={() => {
                if (onOpenCreateStore) {
                  onOpenCreateStore();
                } else {
                  handleNav('pricing');
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-[#1F070B] font-bold text-xs shadow-xs"
            >
              Create Store
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#4A3E35] hover:bg-[#FAF0D7] transition-colors border border-[#E8DFC8]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation with all 7 requested items */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E8DFC8] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] font-bold text-[#8C6D23] uppercase tracking-wider pb-1 border-b border-[#F0EAE1]">
            Navigation Menu
          </div>

          {/* 1. Home */}
          <button
            onClick={() => {
              handleNav('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-[#2A1810] hover:bg-[#FAF6EE] hover:text-[#720917] flex items-center gap-2"
          >
            <span>🏠</span>
            <span>Home</span>
          </button>

          {/* 2. Live store */}
          <button
            onClick={() => {
              handleNav('live-stores');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-[#2A1810] hover:bg-[#FAF6EE] hover:text-[#720917] flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span>🏪</span>
              <span>Live store</span>
            </div>
            <span className="text-[10px] font-bold bg-[#FAF0D7] text-[#8C6D23] px-2 py-0.5 rounded">
              {vendors.length} Showrooms
            </span>
          </button>

          {/* 3. How it work */}
          <button
            onClick={() => {
              handleNav('how-it-works');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-[#2A1810] hover:bg-[#FAF6EE] hover:text-[#720917] flex items-center gap-2"
          >
            <span>⚙️</span>
            <span>How it work</span>
          </button>

          {/* 4. Pricing */}
          <button
            onClick={() => {
              handleNav('pricing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-[#2A1810] hover:bg-[#FAF6EE] hover:text-[#720917] flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span>💰</span>
              <span>Pricing</span>
            </div>
            <span className="text-[10px] font-bold text-[#1B6D3E] bg-[#EBF9F0] px-2 py-0.5 rounded">
              100% Free
            </span>
          </button>

          {/* 5. Contact us */}
          <button
            onClick={() => {
              handleNav('contact-us');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-[#2A1810] hover:bg-[#FAF6EE] hover:text-[#720917] flex items-center gap-2"
          >
            <span>📞</span>
            <span>Contact us</span>
          </button>

          {/* Action CTAs in Mobile: 6. Login, 7. Create stores */}
          <div className="pt-3 border-t border-[#F0EAE1] grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAdminAccess) {
                  onOpenAdminAccess();
                } else {
                  onNavigate({ type: 'admin' });
                }
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-[#D8CEBE] hover:border-[#720917] text-[#2A1810] hover:text-[#720917] text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-[#FAF8F5]"
            >
              <Lock className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Login</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCreateStore) {
                  onOpenCreateStore();
                } else {
                  handleNav('pricing');
                }
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-[#1F070B] text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Create stores</span>
            </button>
          </div>

          <div className="pt-2 text-center text-xs text-[#7A6855]">
            Founder &amp; Support: <a href="tel:7087033009" className="text-[#720917] font-bold">7087033009</a> (Rahul)
          </div>
        </div>
      )}

      {/* If currently viewing a vendor store, show small banner indicator */}
      {activeVendor && currentView.type === 'store' && (
        <div className="bg-[#FAF0D7] border-t border-[#E8DFC8] text-xs py-1.5 px-4 text-center text-[#5A4526] flex items-center justify-center gap-3">
          <span>You are previewing public showroom for: <strong className="text-[#2A1810]">{activeVendor.name}</strong> ({activeVendor.city})</span>
          <button 
            onClick={() => onNavigate({ type: 'vendor', vendorId: activeVendor.id })}
            className="text-[11px] underline font-bold text-[#720917] hover:text-[#4A0E17]"
          >
            Edit this store in Vendor Panel &rarr;
          </button>
        </div>
      )}
    </header>
  );
};
