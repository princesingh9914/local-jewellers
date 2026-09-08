import React from 'react';
import { BlogPost, Vendor } from '../../types';
import { X, Calendar, Clock, User, Share2, MessageCircle, BookOpen, ShieldCheck } from 'lucide-react';

interface BlogDetailModalProps {
  blog: BlogPost | null;
  vendor: Vendor;
  onClose: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ blog, vendor, onClose }) => {
  if (!blog) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  const handleWhatsAppConsult = () => {
    let rawPhone = vendor.whatsapp || vendor.phone || '7087033009';
    let cleanPhone = rawPhone.replace(/\D/g, '');
    if (cleanPhone.length === 10) cleanPhone = '91' + cleanPhone;

    const message = `Namaste ${vendor.name}!\n\nI was reading your article: "${blog.title}" on your digital showroom.\nI would like to consult with your master jeweller regarding custom designs or gold purity.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-[#D4AF37]/40 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0EAE1] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#B8860B]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A6855]">
              {blog.category || 'Jewellery Journal'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-black/5 text-[#7A6855] transition-colors"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 text-[#7A6855] transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="relative rounded-xl overflow-hidden aspect-video sm:aspect-21/9 shadow-md bg-gray-100">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white text-xs flex items-center justify-between">
                <span className="bg-[#D4AF37] text-[#2A0E13] px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                  {vendor.name} Atelier
                </span>
                <span className="flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
                  <Clock className="w-3 h-3 text-[#E5C158]" />
                  {blog.readTimeMinutes || 4} min read
                </span>
              </div>
            </div>
          )}

          {/* Article Title & Meta */}
          <div className="space-y-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-royal text-[#2A1810] leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#7A6855] pb-3 border-b border-[#F0EAE1]">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#B8860B]" />
                <span className="font-semibold text-[#2A1810]">{blog.author || vendor.name}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>{blog.publishedDate}</span>
              </span>
              <span className="flex items-center gap-1 text-[#1B6D3E] font-medium bg-[#EBF9F0] px-2 py-0.5 rounded-full border border-[#A7E6BC]/50">
                <ShieldCheck className="w-3 h-3" />
                Verified Jewellery Article
              </span>
            </div>

            {/* Description Excerpt */}
            {blog.description && (
              <p className="text-sm sm:text-base font-medium text-[#5C4D44] italic bg-[#FAF6EE] p-4 rounded-xl border-l-4 border-[#D4AF37]">
                &ldquo;{blog.description}&rdquo;
              </p>
            )}
          </div>

          {/* Formatted Content */}
          <div className="prose prose-sm sm:prose max-w-none text-[#3D332A] space-y-4 leading-relaxed font-sans">
            {blog.content.split('\n\n').map((para, idx) => {
              if (para.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg font-bold font-royal text-[#2A1810] pt-3 pb-1 border-b border-[#F0EAE1]">
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              if (para.startsWith('- ')) {
                const items = para.split('\n');
                return (
                  <ul key={idx} className="space-y-1.5 my-2 pl-4 list-disc marker:text-[#B8860B]">
                    {items.map((it, iIdx) => (
                      <li key={iIdx} className="text-xs sm:text-sm text-[#4A3E34]">
                        {it.replace(/^- \*\*(.*?)\*\*:?/, '• $1: ')}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (para.match(/^\d+\./)) {
                const items = para.split('\n');
                return (
                  <ol key={idx} className="space-y-1.5 my-2 pl-5 list-decimal marker:font-bold marker:text-[#8C232C]">
                    {items.map((it, iIdx) => (
                      <li key={iIdx} className="text-xs sm:text-sm text-[#4A3E34]">
                        {it.replace(/^\d+\.\s*/, '')}
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={idx} className="text-xs sm:text-sm text-[#4A3E34] leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Author Signature & Showroom Call-to-action */}
          <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#E8DFC8] flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-[#8C232C] uppercase tracking-wider font-cinzel">
                Bespoke Design & Purity Consultation
              </span>
              <p className="text-xs text-[#5C4D44]">
                Have questions about gold rates, custom designs, or bridal sizing with {vendor.name}?
              </p>
            </div>
            <button
              onClick={handleWhatsAppConsult}
              className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Consult on WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#F0EAE1] bg-[#FAF8F5] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#4A0E17] text-white text-xs font-bold hover:bg-[#681420] transition-colors"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};
