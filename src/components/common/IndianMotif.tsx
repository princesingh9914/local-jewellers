import React from 'react';

export const IndianBorderPattern: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center space-x-2 text-[#D4AF37] opacity-80 ${className}`}>
    <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
    <span className="text-xs">✦</span>
    <span className="text-sm">✤</span>
    <span className="text-xs">✦</span>
    <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
  </div>
);

export const GoldBadge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#FFF9E6] border border-[#E5C158] text-[#8C6D23] shadow-xs ${className}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
    {children}
  </span>
);

export const HallmarkStamp: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-[#B8860B]/40 bg-[#FFFDF9] text-[#8C6D23] text-[11px] font-bold ${className}`}>
    <span className="text-xs">✦</span>
    <span>BIS 916 HALLMARK</span>
  </div>
);
