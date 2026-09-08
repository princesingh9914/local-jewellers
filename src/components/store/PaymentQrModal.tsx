import React, { useState } from 'react';
import { 
  QrCode, 
  X, 
  Copy, 
  Check, 
  ShieldCheck, 
  Building2, 
  MessageCircle, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { Vendor } from '../../types';

interface PaymentQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor;
}

export const PaymentQrModal: React.FC<PaymentQrModalProps> = ({
  isOpen,
  onClose,
  vendor
}) => {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  if (!isOpen) return null;

  const upiId = vendor.upiId || `${vendor.slug}@upi`;
  const upiPayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(vendor.name)}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(upiPayUrl)}`;

  const handleCopyUpi = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    }
  };

  const cleanWhatsApp = vendor.whatsapp ? vendor.whatsapp.replace(/\D/g, '') : '';
  const confirmWhatsappUrl = `https://wa.me/${cleanWhatsApp}?text=Hello%20${encodeURIComponent(vendor.name)},%20I%20have%20completed%20the%20payment%20via%20UPI.%20Here%20is%20my%20payment%20receipt.`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3B090F] via-[#5A121C] to-[#3B090F] text-white p-4 border-b-2 border-[#D4AF37] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#D4AF37]/50 flex items-center justify-center text-[#F5D061]">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-base font-bold text-[#F5D061] tracking-wide">
                Showroom Payment QR Code
              </h3>
              <p className="text-xs text-white/80">
                {vendor.name} &bull; Direct UPI &amp; Bank Transfer
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

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          {/* QR Code Container */}
          <div className="bg-gradient-to-b from-[#FAF8F5] to-[#FAF0D7]/40 rounded-2xl p-4 border border-[#E8DFC8] text-center space-y-3">
            <div className="inline-block p-3 bg-white rounded-2xl shadow-md border-2 border-[#D4AF37]/60">
              <img 
                src={qrCodeUrl} 
                alt={`${vendor.name} UPI Payment QR Code`}
                className="w-52 h-52 object-contain mx-auto rounded-lg"
              />
            </div>

            {/* Accepted UPI Apps */}
            <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-[#6B5A4E] pt-1">
              <span className="px-2 py-0.5 rounded bg-white border border-[#E8DFC8]">Google Pay</span>
              <span className="px-2 py-0.5 rounded bg-white border border-[#E8DFC8]">PhonePe</span>
              <span className="px-2 py-0.5 rounded bg-white border border-[#E8DFC8]">Paytm</span>
              <span className="px-2 py-0.5 rounded bg-white border border-[#E8DFC8]">BHIM UPI</span>
            </div>

            <p className="text-[11px] text-[#7A6855]">
              Scan with any UPI application to make an instant zero-commission payment.
            </p>
          </div>

          {/* Copy UPI ID Box */}
          <div className="bg-[#FAF8F5] rounded-xl p-3 border border-[#E8DFC8] flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[10px] text-[#8C6D23] font-bold uppercase tracking-wider block">
                Official UPI ID
              </span>
              <span className="text-xs font-mono font-bold text-[#2A1810] truncate block">
                {upiId}
              </span>
            </div>
            <button
              onClick={handleCopyUpi}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                copiedUpi 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#720917] hover:bg-[#5A121C] text-white shadow-xs'
              }`}
            >
              {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUpi ? 'Copied' : 'Copy UPI'}</span>
            </button>
          </div>

          {/* Bank Account Details (NEFT/RTGS/IMPS) */}
          <div className="bg-white rounded-xl p-3.5 border border-[#E8DFC8] space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#720917] uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Direct Bank Transfer Details</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#4A3E35]">
              <div>
                <span className="text-[#8C6D23] block">Account Name:</span>
                <span className="font-bold text-[#1F070B]">{vendor.name}</span>
              </div>
              <div>
                <span className="text-[#8C6D23] block">Account Type:</span>
                <span className="font-bold text-[#1F070B]">Current Account</span>
              </div>
              <div>
                <span className="text-[#8C6D23] block">Bank Name:</span>
                <span className="font-bold text-[#1F070B]">HDFC Bank</span>
              </div>
              <div>
                <span className="text-[#8C6D23] block">IFSC Code:</span>
                <span className="font-mono font-bold text-[#1F070B]">HDFC0001824</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Payment Confirmation CTA */}
          {vendor.whatsapp && (
            <a
              href={confirmWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Send Payment Screenshot on WhatsApp</span>
            </a>
          )}

          {/* Security & Direct Transfer Notice */}
          <div className="flex items-center gap-2 text-[10px] text-[#7A6855] justify-center pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1B6D3E]" />
            <span>100% Direct Account Settlement &bull; Zero Third-Party Fees</span>
          </div>

        </div>
      </div>
    </div>
  );
};
