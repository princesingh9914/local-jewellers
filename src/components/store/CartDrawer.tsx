import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  MapPin,
  User,
  Phone
} from 'lucide-react';
import { CartItem, Vendor, OrderInquiry } from '../../types';
import { storageService } from '../../services/storage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  vendor,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  
  const [orderSuccess, setOrderSuccess] = useState<{
    whatsappUrl: string;
    order: OrderInquiry;
  } | null>(null);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );

  const totalWeight = cartItems.reduce(
    (sum, item) => sum + (item.product.grossWeightGrams || 0) * item.quantity,
    0
  );

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim() || !customerCity.trim()) {
      alert('Please provide your name, mobile number, and city.');
      return;
    }

    const { whatsappUrl, orderInquiry } = storageService.generateWhatsAppOrder({
      vendor,
      customer: {
        name: customerName,
        phone: customerPhone,
        city: customerCity,
        address: customerAddress,
        notes: customerNotes,
      },
      cartItems,
    });

    setOrderSuccess({ whatsappUrl, order: orderInquiry });
    
    // Automatically launch WhatsApp in new window/tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#D4AF37] animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#4A0E17] to-[#720917] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#E5C158]" />
            <div>
              <h3 className="font-bold font-royal text-base leading-tight">
                Jewellery Cart
              </h3>
              <p className="text-[11px] text-[#E5C158] font-medium">
                {vendor.name} ({cartItems.length} items)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {orderSuccess ? (
            /* Order Sent Success Screen */
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#EBF9F0] text-[#1B6D3E] flex items-center justify-center mx-auto border-2 border-[#1B6D3E]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold font-royal text-[#2A1810]">
                  WhatsApp Order Ready!
                </h3>
                <p className="text-xs text-[#5C4D44] max-w-xs mx-auto">
                  Your order inquiry and specifications have been forwarded to <strong>{vendor.name}</strong> on WhatsApp.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8DFC8] text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-[#E8DFC8] pb-1.5">
                  <span className="text-[#7A6855]">Inquiry ID:</span>
                  <span className="font-mono font-bold text-[#2A1810]">{orderSuccess.order.id}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8DFC8] pb-1.5">
                  <span className="text-[#7A6855]">Jeweller:</span>
                  <span className="font-bold text-[#4A0E17]">{vendor.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8DFC8] pb-1.5">
                  <span className="text-[#7A6855]">Total Amount:</span>
                  <span className="font-bold text-lg text-[#1B6D3E] font-cinzel">
                    ₹{orderSuccess.order.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-[11px] text-[#7A6855] pt-1">
                  If WhatsApp did not open automatically, tap the button below.
                </div>
              </div>

              <a
                href={orderSuccess.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Open WhatsApp Chat</span>
              </a>

              <button
                onClick={() => {
                  setOrderSuccess(null);
                  onClearCart();
                  onClose();
                }}
                className="w-full py-2.5 text-xs font-semibold text-[#7A6855] hover:text-[#2A1810]"
              >
                ← Return to Store &amp; Clear Cart
              </button>
            </div>

          ) : cartItems.length === 0 ? (

            /* Empty Cart View */
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF0D7] text-[#8C6D23] flex items-center justify-center mx-auto border border-[#E5C158]">
                <ShoppingBag className="w-8 h-8 opacity-70" />
              </div>
              <h4 className="text-base font-bold font-royal text-[#2A1810]">
                Your Cart is Empty
              </h4>
              <p className="text-xs text-[#7A6855] max-w-xs mx-auto">
                Explore our catalog of certified gold, diamond, and silver jewellery and click &quot;Add to Cart&quot;.
              </p>
              <button
                onClick={onClose}
                className="py-2.5 px-6 rounded-xl bg-[#4A0E17] text-white text-xs font-bold hover:bg-[#681420] transition-colors shadow-sm"
              >
                Browse Jewellery Ornaments
              </button>
            </div>

          ) : (

            /* Cart Items List & Customer Details Form */
            <>
              {/* Itemized List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#7A6855] uppercase tracking-wider pb-1 border-b border-[#F0EAE1]">
                  <span>Selected Ornaments ({cartItems.length})</span>
                  <button
                    onClick={onClearCart}
                    className="text-red-600 hover:text-red-700 text-[11px] font-medium"
                  >
                    Clear All
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div 
                    key={item.product.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-[#E8DFC8] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors"
                  >
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.title} 
                      className="w-16 h-16 rounded-lg object-cover border border-[#E8DFC8] shrink-0 bg-white"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#2A1810] line-clamp-1">
                        {item.product.title}
                      </h4>
                      <div className="text-[11px] text-[#7A6855] flex flex-wrap items-center gap-1.5 mt-0.5">
                        <span className="font-semibold text-[#8C232C]">{item.product.purity}</span>
                        {item.product.grossWeightGrams && (
                          <span>&bull; ~{item.product.grossWeightGrams}g</span>
                        )}
                        {(item.selectedSize || item.product.size) && (
                          <span className="bg-[#FAF0D7] text-[#8C6D23] px-1 rounded text-[10px]">
                            {item.selectedSize || item.product.size}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-[#4A0E17] font-cinzel mt-1">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-gray-400 hover:text-red-600 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center border border-[#D8CEBE] rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 rounded-l"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 rounded-r"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Calculations */}
              <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#E8DFC8] space-y-2 text-xs">
                <div className="flex justify-between text-[#7A6855]">
                  <span>Estimated Total Weight:</span>
                  <span className="font-semibold text-[#2A1810]">~{totalWeight.toFixed(2)} g</span>
                </div>
                <div className="flex justify-between text-[#7A6855]">
                  <span>Payment Mode:</span>
                  <span className="font-semibold text-[#1B6D3E]">In Showroom / Direct Bank Transfer</span>
                </div>
                <div className="pt-2 border-t border-[#E8DFC8] flex justify-between items-baseline">
                  <span className="font-bold text-sm text-[#2A1810]">Total Amount:</span>
                  <span className="font-bold text-xl text-[#4A0E17] font-cinzel">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Customer Details Form (No Login Required!) */}
              <form id="whatsapp-order-form" onSubmit={handleSendWhatsAppOrder} className="space-y-3 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C232C] uppercase tracking-wider">
                  <User className="w-3.5 h-3.5" />
                  <span>Customer Details (No Login Required)</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#2A1810] mb-0.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBE] focus:outline-none focus:border-[#720917]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[#2A1810] mb-0.5">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBE] focus:outline-none focus:border-[#720917]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#2A1810] mb-0.5">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jaipur / Delhi"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBE] focus:outline-none focus:border-[#720917]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#2A1810] mb-0.5">
                    Delivery Address / Locality (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 42 Shanti Nagar, Ring Road"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBE] focus:outline-none focus:border-[#720917]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#2A1810] mb-0.5">
                    Special Notes / Ring Size / Delivery Date (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ring size 14, wedding is on 25th"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBE] focus:outline-none focus:border-[#720917]"
                  />
                </div>
              </form>
            </>
          )}

        </div>

        {/* Drawer Bottom Action */}
        {!orderSuccess && cartItems.length > 0 && (
          <div className="p-4 bg-[#FAF8F5] border-t border-[#E8DFC8] space-y-2">
            <button
              type="submit"
              form="whatsapp-order-form"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.99]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Send Order / Inquiry on WhatsApp →</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A6855]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1B6D3E]" />
              <span>0% Gateways &bull; Direct Deal with {vendor.name}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
