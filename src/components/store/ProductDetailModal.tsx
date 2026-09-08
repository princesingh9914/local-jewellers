import React from 'react';
import { X, ShieldCheck, Scale, Sparkles, MessageCircle, ShoppingBag, Check } from 'lucide-react';
import { Product, Vendor } from '../../types';
import { HallmarkStamp } from '../common/IndianMotif';

interface ProductDetailModalProps {
  product: Product;
  vendor: Vendor;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  isAlreadyInCart: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  vendor,
  onClose,
  onAddToCart,
  isAlreadyInCart,
}) => {
  const [activeImageIdx, setActiveImageIdx] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const [chosenSize, setChosenSize] = React.useState(product.size || '');

  // Quick WhatsApp single product inquiry
  const getSingleItemWhatsAppUrl = () => {
    let rawPhone = vendor.whatsapp || vendor.phone || '7087033009';
    let cleanPhone = rawPhone.replace(/\D/g, '');
    if (cleanPhone.length === 10) cleanPhone = '91' + cleanPhone;

    let msg = `👑 *JEWELLERY INQUIRY - ${vendor.name.toUpperCase()}*\n\n`;
    msg += `Namaste, I am interested in this ornament:\n`;
    msg += `• Item: *${product.title}*\n`;
    if (product.sku) msg += `• SKU / Code: ${product.sku}\n`;
    msg += `• Purity: ${product.purity}\n`;
    if (product.grossWeightGrams) msg += `• Gross Weight: ~${product.grossWeightGrams}g\n`;
    if (product.netWeightGrams) msg += `• Net Gold: ~${product.netWeightGrams}g\n`;
    if (chosenSize || product.size) msg += `• Size: ${chosenSize || product.size}\n`;
    if (product.stoneDetails) msg += `• Diamond/Stones: ${product.stoneDetails}\n`;
    if (product.makingCharges) msg += `• Making Charges: ${product.makingCharges}\n`;
    msg += `• Price: ₹${product.price.toLocaleString('en-IN')}\n\n`;
    msg += `Please share real video/photos, current gold rate & delivery/visit availability.`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  const availabilityText = product.availability || (product.inStock ? 'In Stock' : 'Made to Order');

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#D4AF37] relative flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/95 text-gray-700 hover:bg-white hover:text-black flex items-center justify-center shadow-lg border border-gray-200 font-bold transition-transform hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Images */}
        <div className="md:w-1/2 bg-[#FAF6EE] p-4 sm:p-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8DFC8]">
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-white aspect-square shadow-inner border border-[#E8DFC8] group">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.isFeatured && (
                  <span className="bg-[#4A0E17] text-[#FAF8F5] text-[10px] font-bold px-2.5 py-1 rounded shadow-sm tracking-wide">
                    ✨ Featured Design
                  </span>
                )}
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded shadow-xs ${
                  availabilityText === 'In Stock' 
                    ? 'bg-[#1B6D3E] text-white' 
                    : 'bg-[#B8860B] text-white'
                }`}>
                  {availabilityText === 'In Stock' ? '● In Stock Showroom' : '○ Made to Order'}
                </span>
              </div>
            </div>

            {/* Multiple Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 mt-3.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIdx === idx 
                        ? 'border-[#8C232C] ring-2 ring-[#8C232C]/30 scale-105 shadow-sm' 
                        : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Store hallmark badge */}
          <div className="mt-4 pt-3 border-t border-[#E8DFC8] flex items-center justify-between text-xs text-[#7A6855]">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#1B6D3E]" />
              BIS 100% Purity Guaranteed
            </span>
            <HallmarkStamp />
          </div>
        </div>

        {/* Right: Product Specifications & Add to Cart */}
        <div className="md:w-1/2 p-5 sm:p-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            
            {/* Store & SKU */}
            <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2">
              <span className="text-xs font-bold text-[#8C232C] tracking-wide">
                {vendor.name}
              </span>
              {product.sku && (
                <span className="text-[11px] font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  SKU: {product.sku}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold font-royal text-[#2A1810] leading-snug">
              {product.title}
            </h2>

            {/* Price section */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#4A0E17] font-cinzel">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-[11px] text-green-700 bg-green-50 px-2 py-0.5 rounded font-medium">
                Tax Included / Free Showroom Packaging
              </span>
            </div>

            {/* Jewellery Specifics Grid */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8DFC8] grid grid-cols-2 gap-2.5 text-xs">
              <div>
                <span className="text-[#7A6855] block text-[11px]">Gold Purity:</span>
                <span className="font-bold text-[#4A0E17] text-sm">{product.purity}</span>
              </div>

              <div>
                <span className="text-[#7A6855] block text-[11px]">Availability:</span>
                <span className="font-semibold text-gray-800">{availabilityText}</span>
              </div>

              {product.grossWeightGrams && (
                <div>
                  <span className="text-[#7A6855] block text-[11px]">Gross Weight:</span>
                  <span className="font-bold text-[#2A1810] flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-[#B8860B]" />
                    {product.grossWeightGrams} grams
                  </span>
                </div>
              )}

              {product.netWeightGrams && (
                <div>
                  <span className="text-[#7A6855] block text-[11px]">Net Gold Weight:</span>
                  <span className="font-bold text-[#2A1810]">
                    {product.netWeightGrams} grams
                  </span>
                </div>
              )}

              {product.size && (
                <div className="col-span-2">
                  <span className="text-[#7A6855] block text-[11px]">Size / Length:</span>
                  <span className="font-semibold text-[#2A1810]">
                    {product.size}
                  </span>
                </div>
              )}

              {product.stoneDetails && (
                <div className="col-span-2 pt-1.5 border-t border-[#E8DFC8]/70">
                  <span className="text-[#7A6855] block text-[11px] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#B8860B]" />
                    Diamond / Stone Details:
                  </span>
                  <span className="font-medium text-[#2A1810]">
                    {product.stoneDetails}
                  </span>
                </div>
              )}

              {product.makingCharges && (
                <div className="col-span-2 pt-1 border-t border-[#E8DFC8]/70">
                  <span className="text-[#7A6855] block text-[11px]">Making Charges:</span>
                  <span className="font-semibold text-[#8C6D23]">
                    {product.makingCharges}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-[#2A1810] uppercase tracking-wider mb-1">
                Description &amp; Design Notes
              </h4>
              <p className="text-xs text-[#5C4D44] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-bold text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 font-bold text-xs text-gray-900 min-w-[28px] text-center">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-[#E8DFC8] space-y-2">
            <button
              onClick={() => {
                onAddToCart(product, qty, chosenSize);
              }}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md active:scale-98 ${
                isAlreadyInCart
                  ? 'bg-[#1B6D3E] text-white hover:bg-[#145630]'
                  : 'bg-gradient-to-r from-[#4A0E17] to-[#720917] hover:brightness-110 text-[#FAF8F5]'
              }`}
            >
              {isAlreadyInCart ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Update in Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#E5C158]" />
                  <span>Add to Cart ({qty})</span>
                </>
              )}
            </button>

            <a
              href={getSingleItemWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Inquire About This Ornament on WhatsApp</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
