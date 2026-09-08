import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Store, 
  X, 
  Lock, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Crown,
  PhoneCall
} from 'lucide-react';
import { Vendor, AppView } from '../../types';
import { storageService } from '../../services/storage';

interface AdminAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeVendor?: Vendor;
  onNavigate: (view: AppView) => void;
  onAdminAuthenticated: () => void;
}

export const AdminAccessModal: React.FC<AdminAccessModalProps> = ({
  isOpen,
  onClose,
  activeVendor,
  onNavigate,
  onAdminAuthenticated
}) => {
  const [activeTab, setActiveTab] = useState<'admin' | 'vendor'>('admin');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const alreadyAdmin = storageService.isMasterAdmin();

  if (!isOpen) return null;

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (alreadyAdmin) {
      onAdminAuthenticated();
      onNavigate({ type: 'admin' });
      onClose();
      return;
    }

    if (storageService.verifyAdminPin(pin)) {
      setSuccess(true);
      storageService.setMasterAdmin(true);
      onAdminAuthenticated();
      setTimeout(() => {
        onNavigate({ type: 'admin' });
        onClose();
      }, 400);
    } else {
      setError('Incorrect Admin PIN. Please enter Rahul ji\'s Master PIN (7087).');
    }
  };

  const handleVendorPanel = () => {
    if (activeVendor) {
      onNavigate({ type: 'vendor', vendorId: activeVendor.id });
    } else {
      const defaultVendor = storageService.getVendors()[0];
      onNavigate({ type: 'vendor', vendorId: defaultVendor?.id || 'vendor_rajwada' });
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#E8DFC8] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1F070B] text-white p-5 border-b-2 border-[#D4AF37] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#F5D061]">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-base font-bold text-[#F5D061] tracking-wide">
                Portal Authentication
              </h3>
              <p className="text-xs text-white/70">
                SaaS Master Admin &amp; Jeweller Staff Access
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

        {/* Tab Selection */}
        <div className="grid grid-cols-2 p-2 bg-[#FAF8F5] border-b border-[#E8DFC8] text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setActiveTab('admin'); setError(''); }}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'admin'
                ? 'bg-white text-[#720917] shadow-xs font-bold border border-[#E8DFC8]'
                : 'text-[#7A6855] hover:text-[#1E1915]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Master Admin (Rahul)</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('vendor'); setError(''); }}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'vendor'
                ? 'bg-white text-[#720917] shadow-xs font-bold border border-[#E8DFC8]'
                : 'text-[#7A6855] hover:text-[#1E1915]'
            }`}
          >
            <Store className="w-4 h-4 text-[#B8860B]" />
            <span>Jeweller Staff Panel</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {activeTab === 'admin' ? (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              {alreadyAdmin ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="text-sm font-bold">
                    Master Admin Verified
                  </div>
                  <p className="text-xs text-emerald-700">
                    You are currently authenticated as Master Admin (Rahul). You can return to the control room anytime.
                  </p>
                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>Return to Master Admin Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#2A1810]">
                      Master Admin PIN / Password
                    </label>
                    <p className="text-[11px] text-[#7A6855]">
                      Access the core SaaS management room for all jewellers &amp; platform settings.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <KeyRound className="w-4 h-4 text-[#B8860B]" />
                    </div>
                    <input
                      type="password"
                      autoFocus
                      value={pin}
                      onChange={(e) => { setPin(e.target.value); setError(''); }}
                      placeholder="Enter Master PIN (e.g. 7087)"
                      className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-[#D8CEBE] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#720917] focus:border-transparent font-mono"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#E8DFC8] text-[11px] text-[#7A6855] space-y-1">
                    <div className="font-semibold text-[#2A1810] flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#D4AF37]" />
                      <span>Owner Security Verification</span>
                    </div>
                    <div>
                      Platform Owner: <strong>Rahul (7087033009)</strong>
                    </div>
                    <div className="text-[10px] text-[#8C6D23]">
                      Hint: Enter default Master PIN <strong>7087</strong> or registered phone number.
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#720917] hover:bg-[#8C0B1D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Authenticate &amp; Open Admin Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#2A1810]">
                  Showroom Staff Management
                </h4>
                <p className="text-xs text-[#7A6855]">
                  Manage gold catalogues, inventory, WhatsApp customer inquiries and store policies for:
                </p>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFC8] mt-2 flex items-center gap-3">
                  <img
                    src={activeVendor?.logo || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&auto=format&fit=crop&q=80'}
                    alt="Logo"
                    className="w-10 h-10 rounded-lg object-cover border border-[#D4AF37]"
                  />
                  <div>
                    <div className="font-bold text-xs text-[#2A1810]">{activeVendor?.name || 'Showroom'}</div>
                    <div className="text-[11px] text-[#7A6855]">{activeVendor?.city || 'India'} &bull; Staff Panel</div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleVendorPanel}
                className="w-full py-2.5 px-4 rounded-xl bg-[#4A0E17] hover:bg-[#63141F] text-[#F3E5AB] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Enter Showroom Management Panel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
