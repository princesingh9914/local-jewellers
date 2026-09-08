import React, { useState } from 'react';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  Linkedin, 
  MessageCircle, 
  Share2, 
  ExternalLink, 
  Copy, 
  Check,
  Sparkles
} from 'lucide-react';
import { Vendor } from '../../types';
import { SOCIAL_MEDIA_LINKS, PLATFORM_CONTACT } from '../../data/policyData';

interface SocialMediaLinksProps {
  vendor?: Vendor;
  variant?: 'footer' | 'card' | 'banner';
  className?: string;
}

export const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ 
  vendor, 
  variant = 'footer',
  className = '' 
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // If vendor has specific social accounts, blend them with platform links
  const socialItems = [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: vendor?.instagram ? `@${vendor.slug}` : '@jwellersname.in',
      url: vendor?.instagram || 'https://instagram.com/jwellersname.in',
      icon: Instagram,
      description: vendor ? `Watch ${vendor.name} bridal reels & live collections` : 'Latest bridal jewellery reels & hallmark purity tips',
      color: '#E1306C',
      badge: vendor ? 'Showroom Reels' : '125K+ Patrons'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Desk',
      handle: vendor?.whatsapp ? `+${vendor.whatsapp}` : `+${PLATFORM_CONTACT.whatsapp}`,
      url: vendor?.whatsapp 
        ? `https://wa.me/${vendor.whatsapp}?text=Hello%20${encodeURIComponent(vendor.name)},%20I%20am%20interested%20in%20your%20jewellery%20collection!`
        : `https://wa.me/${PLATFORM_CONTACT.whatsapp}?text=Hello%20Rahul%20ji,%20I%20have%20an%20inquiry%20regarding%20Jwellersname.com`,
      icon: MessageCircle,
      description: vendor ? `Direct WhatsApp inquiry with ${vendor.ownerName}` : 'Instant customer assistance with Founder Rahul',
      color: '#25D366',
      badge: 'Live Chat'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      handle: vendor?.youtube ? `@${vendor.slug}` : '@JwellersNameOfficial',
      url: vendor?.youtube || 'https://youtube.com/@JwellersNameOfficial',
      icon: Youtube,
      description: 'Jewellery making craft, unboxing, and BIS HUID verification guides',
      color: '#FF0000',
      badge: 'Video Guides'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      handle: vendor?.facebook ? `${vendor.name}` : 'Jwellersname Heritage',
      url: vendor?.facebook || 'https://facebook.com/jwellersname',
      icon: Facebook,
      description: 'Patron celebrations, exhibition notices, and customer community',
      color: '#1877F2',
      badge: 'Community'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'Jwellersname Multi-Tenant SaaS',
      url: 'https://linkedin.com/company/jwellersname',
      icon: Linkedin,
      description: 'B2B digital showroom technology for traditional Indian jewellers',
      color: '#0A66C2',
      badge: 'Enterprise B2B'
    }
  ];

  const handleCopy = (text: string, index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  if (variant === 'card') {
    return (
      <div className={`bg-[#FAF6EE] rounded-2xl p-5 border border-[#E8DFC8] space-y-4 ${className}`}>
        <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-3">
          <div className="flex items-center gap-2 text-[#2A1810]">
            <Share2 className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-royal font-bold text-sm">
              {vendor ? `${vendor.name} on Social Media` : 'Connect with Jwellersname'}
            </h4>
          </div>
          <span className="text-[10px] font-bold text-[#8C6D23] bg-white px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
            Verified Channels
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {socialItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-white border border-[#E8DFC8] hover:border-[#D4AF37] hover:shadow-md transition-all flex items-start justify-between gap-3 text-left"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-[#2A1810] truncate group-hover:text-[#8C232C] transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-[#FAF6EE] text-[#8C6D23] rounded font-semibold border border-[#E8DFC8]">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7A6855] truncate">{item.handle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleCopy(item.url, idx, e)}
                    title="Copy Link"
                    className="p-1 rounded text-[#998A78] hover:text-[#2A1810] hover:bg-[#FAF6EE] transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <ExternalLink className="w-3.5 h-3.5 text-[#998A78] group-hover:text-[#8C232C] transition-colors" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // Default: Footer style
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
        <h4 className="text-xs font-bold text-[#E5C158] uppercase tracking-wider font-cinzel">
          Official Social Media Channels
        </h4>
      </div>

      <p className="text-xs text-[#E1D3BF] leading-relaxed">
        Follow daily gold rate broadcasts, karigar craftsmanship videos, hallmark updates, and real bridal showcases:
      </p>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {socialItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#3D1017] hover:bg-[#521720] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all text-xs text-[#F5EAD4] group shadow-xs"
              title={`${item.name}: ${item.handle}`}
            >
              <span 
                className="w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: item.color }}
              >
                <Icon className="w-3 h-3" />
              </span>
              <span className="font-medium group-hover:text-white transition-colors">{item.name}</span>
              <ExternalLink className="w-3 h-3 text-[#CBB99E] group-hover:text-[#E5C158] transition-colors opacity-70" />
            </a>
          );
        })}
      </div>
    </div>
  );
};
