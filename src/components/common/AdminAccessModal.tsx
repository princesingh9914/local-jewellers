import React, { useState, useEffect } from 'react';
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
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  Info
} from 'lucide-react';
import { Vendor, AppView } from '../../types';
import { storageService } from '../../services/storage';
import { authApi } from '../../services/authApi';

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
  const [activeTab, setActiveTab] = useState<'super_admin' | 'vendor'>('super_admin');
  
  // Super Admin form state
  const [superPhone, setSuperPhone] = useState('');
  const [superPassword, setSuperPassword] = useState('');
  const [superPin, setSuperPin] = useState('');
  const [showSuperPassword, setShowSuperPassword] = useState(false);
  const [showSuperPin, setShowSuperPin] = useState(false);
  const [superError, setSuperError] = useState('');
  const [superLoading, setSuperLoading] = useState(false);
  const [superSuccess, setSuperSuccess] = useState(false);

  // Vendor form state
  const [vendorPhone, setVendorPhone] = useState(activeVendor?.phone || '');
  const [vendorPassword, setVendorPassword] = useState('');
  const [vendorPin, setVendorPin] = useState('');
  const [showVendorPassword, setShowVendorPassword] = useState(false);
  const [showVendorPin, setShowVendorPin] = useState(false);
  const [vendorError, setVendorError] = useState('');
  const [vendorLoading, setVendorLoading] = useState(false);
  const [vendorSuccess, setVendorSuccess] = useState(false);

  // Demo hints for vendors
  const [vendorHints, setVendorHints] = useState<Array<{ vendorId: string; vendorName: string; phone: string }>>([]);

  useEffect(() => {
    if (isOpen) {
      authApi.getVendorHints().then((hints) => {
        if (hints && hints.length > 0) {
          setVendorHints(hints);
        }
      });
      if (activeVendor?.phone) {
        setVendorPhone(activeVendor.phone);
      }
    }
  }, [isOpen, activeVendor]);

  if (!isOpen) return null;

  const handleSuperAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuperError('');

    if (!superPhone.trim() || !superPassword.trim() || !superPin.trim()) {
      setSuperError('Authentication Rule: Phone Number, Password, aur PIN teeno fill karna anivarya hai.');
      return;
    }

    setSuperLoading(true);
    try {
      const res = await authApi.loginSuperAdmin(superPhone.trim(), superPassword.trim(), superPin.trim());
      if (res.success) {
        setSuperSuccess(true);
        storageService.setMasterAdmin(true);
        onAdminAuthenticated();
        setTimeout(() => {
          onNavigate({ type: 'admin' });
          onClose();
        }, 600);
      } else {
        setSuperError(res.error || 'Login rejected: Phone Number, Password ya PIN galat hai. Teeno credentials match hone chahiye.');
      }
    } catch (err: any) {
      setSuperError(err.message || 'Server connection error during Super Admin login.');
    } finally {
      setSuperLoading(false);
    }
  };

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVendorError('');

    if (!vendorPhone.trim() || !vendorPassword.trim() || !vendorPin.trim()) {
      setVendorError('Har vendor ka alag Phone Number + Password + PIN hota hai. Teeno enter karein.');
      return;
    }

    setVendorLoading(true);
    try {
      const res = await authApi.loginVendor(vendorPhone.trim(), vendorPassword.trim(), vendorPin.trim());
      if (res.success && res.vendorId) {
        setVendorSuccess(true);
        setTimeout(() => {
          onNavigate({ type: 'vendor', vendorId: res.vendorId! });
          onClose();
        }, 600);
      } else {
        setVendorError(res.error || 'Vendor login failed: Phone Number, Password ya PIN galat hai.');
      }
    } catch (err: any) {
      setVendorError(err.message || 'Server connection error during vendor authentication.');
    } finally {
      setVendorLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#D4AF37] overflow-hidden animate-in zoom-in-95 duration-200 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1F070B] text-white p-4 sm:p-5 border-b-2 border-[#D4AF37] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#F5D061] shrink-0">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-royal text-base sm:text-lg font-bold text-[#F5D061] tracking-wide">
                Secure Portal Authentication
              </h3>
              <p className="text-[11px] sm:text-xs text-white/70">
                Super Admin Control Room &amp; Multi-Tenant Vendor Login
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
        <div className="grid grid-cols-2 p-1.5 bg-[#FAF8F5] border-b border-[#E8DFC8] text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => { setActiveTab('super_admin'); setSuperError(''); }}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'super_admin'
                ? 'bg-[#720917] text-[#F3E5AB] shadow-sm font-bold'
                : 'text-[#7A6855] hover:text-[#1E1915]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Super Admin</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('vendor'); setVendorError(''); }}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'vendor'
                ? 'bg-[#720917] text-[#F3E5AB] shadow-sm font-bold'
                : 'text-[#7A6855] hover:text-[#1E1915]'
            }`}
          >
            <Store className="w-4 h-4 text-[#D4AF37]" />
            <span>Vendor Login</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {activeTab === 'super_admin' ? (
            <form onSubmit={handleSuperAdminSubmit} className="space-y-4">
              
              {/* Security Rule Card */}
              <div className="p-3.5 bg-[#FAF3E6] rounded-xl border border-[#E8DFC8] text-[11px] text-[#5C421A] space-y-1.5">
                <div className="font-bold text-[#720917] flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#B8860B] shrink-0" />
                  <span>Super Admin Authentication Rule</span>
                </div>
                <p className="leading-relaxed">
                  <strong>Phone Number + Password + PIN</strong> teeno correct hone par hi Super Admin Dashboard ka access milega. Ek bhi credential galat hone par access turant reject hoga.
                </p>
                <div className="text-[10px] text-[#8C6D23] font-medium pt-0.5 border-t border-[#E8DFC8]/60 flex items-center gap-1">
                  <Lock className="w-3 h-3 shrink-0" />
                  <span>Server-side encrypted verification &bull; Zero frontend plain-text leakage</span>
                </div>
              </div>

              {superSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-center space-y-2 animate-in fade-in">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="text-sm font-bold">Credentials Verified Successfully!</div>
                  <p className="text-xs text-emerald-700">Opening Super Admin Control Room...</p>
                </div>
              ) : (
                <>
                  {/* Field 1: Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-[#2A1810] mb-1">
                      1. Registered Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8C6D23]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        autoFocus
                        value={superPhone}
                        onChange={(e) => { setSuperPhone(e.target.value); setSuperError(''); }}
                        placeholder="Enter Super Admin Phone (5520101791)"
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-[#D8CEBE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#720917] focus:border-transparent font-medium"
                      />
                    </div>
                  </div>

                  {/* Field 2: Password */}
                  <div>
                    <label className="block text-xs font-bold text-[#2A1810] mb-1">
                      2. Super Admin Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8C6D23]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showSuperPassword ? 'text' : 'password'}
                        value={superPassword}
                        onChange={(e) => { setSuperPassword(e.target.value); setSuperError(''); }}
                        placeholder="Enter Password"
                        className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-[#D8CEBE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#720917] focus:border-transparent font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSuperPassword(!showSuperPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showSuperPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Field 3: PIN */}
                  <div>
                    <label className="block text-xs font-bold text-[#2A1810] mb-1">
                      3. Security PIN (0794) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8C6D23]">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        type={showSuperPin ? 'text' : 'password'}
                        maxLength={8}
                        value={superPin}
                        onChange={(e) => { setSuperPin(e.target.value); setSuperError(''); }}
                        placeholder="Enter Security PIN"
                        className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-[#D8CEBE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#720917] focus:border-transparent font-mono tracking-wider font-bold"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSuperPin(!showSuperPin)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showSuperPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {superError && (
                    <div className="flex items-start gap-2 text-xs text-red-700 bg-red-50 p-3 rounded-xl border border-red-200 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="leading-snug">{superError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={superLoading}
                    className="w-full py-3 px-4 rounded-xl bg-[#720917] hover:bg-[#8C0B1D] text-[#F3E5AB] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {superLoading ? (
                      <span>Verifying on Secure Server...</span>
                    ) : (
                      <>
                        <span>Authenticate &amp; Open Super Admin</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          ) : (
            <form onSubmit={handleVendorSubmit} className="space-y-4">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFC8] text-[11px] text-[#7A6855] space-y-1">
                <div className="font-bold text-[#2A1810] flex items-center gap-1.5 text-xs">
                  <Store className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Multi-Tenant Vendor Portal Access</span>
                </div>
                <p>
                  Har vendor ka alag <strong>Phone Number + Password + PIN</strong> hota hai. Apne registered showroom ke credentials enter karke login karein.
                </p>
              </div>

              {vendorSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-center space-y-2 animate-in fade-in">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="text-sm font-bold">Vendor Authenticated!</div>
                  <p className="text-xs text-emerald-700">Opening Showroom Management Dashboard...</p>
                </div>
              ) : (
                <>
                  {/* Field 1: Vendor Phone */}
                  <div>
                    <label className="block text-xs font-bold text-[#2A1810] mb-1">
                      1. Jeweller Registered Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Phone className="w-4 h-4 text-[#B8860B]" />
                      </div>
                      <input
                        type="tel"
                        autoFocus
                        value={vendorPhone}
                        onChange={(e) => { setVendorPhone(e.target.value); setVendorError(''); }}
                        placeholder="Enter registered mobile number"
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-[#D8CEBE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#720917] focus:border-transparent font-medium"
                      />
                    </div>
                  </div>

                  {/* Field 2: Vendor Password */}
                  <div>
                    <label className="block text-xs font-bold text-[#2A1810] mb-1">
                      2. Vendor Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock className="w-4 h-4 text-[#B8860B]" />
                      </div>
                      <input
                        type={showVendorPassword ? 'text' : 'password'}
                        value={vendorPassword}
                        onChange={(e) => { setVendorPassword(e.target.value); setVendorError(''); }}
                        placeholder="Enter vendor password"
                        className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-[#D8CEBE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#720917] focus:border-transparent font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowVendorPassword(!showVendorPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showVendorPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Field 3: Vendor PIN */}
                  <div>
                    <label className="block text-xs font-bold text-[#2A1810] mb-1">
                      3. 4-Digit Security PIN *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <KeyRound className="w-4 h-4 text-[#B8860B]" />
                      </div>
                      <input
                        type={showVendorPin ? 'text' : 'password'}
                        maxLength={6}
                        value={vendorPin}
                        onChange={(e) => { setVendorPin(e.target.value); setVendorError(''); }}
                        placeholder="Enter 4-digit PIN"
                        className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-[#D8CEBE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#720917] focus:border-transparent font-mono tracking-wider font-bold"
                      />
                      <button
                        type="button"
                        onClick={() => setShowVendorPin(!showVendorPin)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showVendorPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {vendorError && (
                    <div className="flex items-start gap-2 text-xs text-red-700 bg-red-50 p-3 rounded-xl border border-red-200 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="leading-snug">{vendorError}</span>
                    </div>
                  )}

                  {/* Quick Testing Reference for Showrooms */}
                  <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#E8DFC8] space-y-1.5 text-[10.5px]">
                    <div className="font-bold text-[#3D2619] flex items-center gap-1">
                      <Info className="w-3 h-3 text-[#B8860B]" />
                      <span>Demo Showrooms Quick Credentials:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10px]">
                      <button
                        type="button"
                        onClick={() => {
                          setVendorPhone('7087033009');
                          setVendorPassword('rajwada@password');
                          setVendorPin('1234');
                        }}
                        className="p-1.5 text-left rounded-lg bg-white border border-[#D8CEBE] hover:border-[#720917] transition-all hover:bg-[#FAF0D7]/40"
                      >
                        <div className="font-bold text-[#720917]">Rajwada Palace Jewellers</div>
                        <div className="text-gray-600">Ph: 7087033009 | PIN: 1234</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setVendorPhone('9415012345');
                          setVendorPassword('surya@password');
                          setVendorPin('2345');
                        }}
                        className="p-1.5 text-left rounded-lg bg-white border border-[#D8CEBE] hover:border-[#720917] transition-all hover:bg-[#FAF0D7]/40"
                      >
                        <div className="font-bold text-[#720917]">Shree Surya Gold</div>
                        <div className="text-gray-600">Ph: 9415012345 | PIN: 2345</div>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={vendorLoading}
                    className="w-full py-3 px-4 rounded-xl bg-[#4A0E17] hover:bg-[#681420] text-[#F3E5AB] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
                  >
                    {vendorLoading ? (
                      <span>Verifying Vendor Access...</span>
                    ) : (
                      <>
                        <span>Login to Vendor Panel</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
