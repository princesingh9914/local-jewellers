import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Store, 
  ChevronDown, 
  Eye, 
  LogOut, 
  ChevronUp, 
  Sparkles,
  ExternalLink,
  Crown
} from 'lucide-react';
import { Vendor, AppView } from '../../types';
import { storageService } from '../../services/storage';

interface MasterAdminBarProps {
  activeVendor?: Vendor;
  onNavigate: (view: AppView) => void;
  onExitAdminMode?: () => void;
}

export const MasterAdminBar: React.FC<MasterAdminBarProps> = ({
  activeVendor,
  onNavigate,
  onExitAdminMode
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const allVendors = storageService.getVendors();

  if (isMinimized) {
    return (
      <aside 
        aria-label="Master Admin Quick Action Floating Control"
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-[#1F070B] text-white px-4 py-2.5 rounded-full shadow-2xl border-2 border-[#D4AF37] animate-in fade-in slide-in-from-bottom-2 duration-200"
      >
        <button
          onClick={() => onNavigate({ type: 'admin' })}
          className="flex items-center gap-2 text-xs font-bold text-[#F3E5AB] hover:text-white transition-colors"
          title="Return to Master Admin Portal"
        >
          <Crown className="w-4 h-4 text-[#D4AF37]" />
          <span>← Back to Admin Portal</span>
        </button>
        <span className="text-[#D4AF37]/50">|</span>
        <button
          onClick={() => setIsMinimized(false)}
          className="p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-white text-xs flex items-center gap-1"
          title="Expand Admin Bar"
        >
          <ChevronUp className="w-3.5 h-3.5" />
          <span className="text-[10px] hidden sm:inline">Expand</span>
        </button>
      </aside>
    );
  }

  return (
    <aside 
      aria-label="Master Admin Control Room Preview Bar"
      className="sticky top-0 z-50 bg-[#1A0508] text-white border-b-2 border-[#D4AF37] shadow-xl text-xs select-none"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Admin Status & Store Context */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F5D061]">
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-bold text-[11px] tracking-wide uppercase">Admin Preview</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-white/80">
            <span>Portal Owner:</span>
            <strong className="text-white font-medium">Rahul (7087033009)</strong>
          </div>

          {activeVendor && (
            <div className="flex items-center gap-1 text-white/90">
              <span className="hidden sm:inline text-white/40">&bull;</span>
              <span className="text-white/60 hidden sm:inline">Viewing:</span>
              <strong className="text-[#F3E5AB] truncate max-w-[150px] sm:max-w-[200px]">
                {activeVendor.name}
              </strong>
            </div>
          )}
        </div>

        {/* Center / Right: High-Priority Return Action & Tools */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          
          {/* PRIMARY ACTION: Return to Admin Portal */}
          <button
            onClick={() => onNavigate({ type: 'admin' })}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-[#1F070B] font-bold text-xs sm:text-xs shadow-md hover:brightness-110 active:scale-95 transition-all"
            title="Return to Master Admin Control Room"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Return to Admin Portal</span>
          </button>

          {/* Secondary: Vendor Panel for this Store */}
          {activeVendor && (
            <button
              onClick={() => onNavigate({ type: 'vendor', vendorId: activeVendor.id })}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FAF8F5] font-semibold text-xs transition-colors"
              title="Open Vendor Dashboard for this jeweller"
            >
              <Store className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Store Panel</span>
            </button>
          )}

          {/* Quick Switch Store Dropdown */}
          <div className="relative">
            <button
              onClick={() => setStoreDropdownOpen(!storeDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FAF8F5] font-semibold text-xs transition-colors"
              title="Switch to another Live Store"
            >
              <span className="hidden sm:inline">Switch Store</span>
              <span className="sm:hidden">Store</span>
              <ChevronDown className="w-3 h-3 text-[#E5C158]" />
            </button>

            {storeDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-[#2A0E13] border border-[#D4AF37] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-white">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#E5C158] tracking-wider border-b border-white/10">
                  Select Live Jeweller
                </div>
                <div className="max-h-60 overflow-y-auto py-1">
                  {allVendors.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        onNavigate({ type: 'store', vendorSlug: v.slug });
                        setStoreDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition-colors ${
                        activeVendor?.id === v.id ? 'bg-[#D4AF37]/20 text-[#F5D061] font-bold' : 'text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <img 
                          src={v.logo} 
                          alt={v.name} 
                          className="w-5 h-5 rounded-full object-cover border border-[#D4AF37]/50" 
                        />
                        <span className="truncate">{v.name}</span>
                      </div>
                      {activeVendor?.id === v.id && (
                        <span className="text-[10px] bg-[#D4AF37] text-[#1F070B] px-1.5 py-0.2 rounded font-bold">
                          Current
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Minimize Button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
            title="Minimize Admin Bar"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* Exit Admin Mode */}
          {onExitAdminMode && (
            <button
              onClick={onExitAdminMode}
              className="hidden xl:flex items-center gap-1 p-1.5 rounded-lg hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-colors text-[11px]"
              title="Exit Admin Preview Mode (Pure Customer View)"
            >
              <LogOut className="w-3 h-3" />
              <span>Exit Preview</span>
            </button>
          )}

        </div>

      </div>
    </aside>
  );
};
