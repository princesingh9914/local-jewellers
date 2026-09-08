import React, { useState } from 'react';
import { Testimonial, Vendor } from '../../types';
import { storageService } from '../../services/storage';
import { ImageUploader } from '../common/ImageUploader';
import { Star, Plus, Trash2, Edit3, Sparkles, X, ShieldCheck, UserCheck, Check } from 'lucide-react';

interface VendorTestimonialsTabProps {
  vendor: Vendor;
  onRefresh: () => void;
  onViewStore: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80',
];

export const VendorTestimonialsTab: React.FC<VendorTestimonialsTabProps> = ({ vendor, onRefresh, onViewStore }) => {
  const testimonials = storageService.getTestimonials(vendor.id);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);

  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [photo, setPhoto] = useState(PRESET_AVATARS[0]);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [purchaseItem, setPurchaseItem] = useState('');
  const [date, setDate] = useState('March 2025');
  const [isVerifiedBuyer, setIsVerifiedBuyer] = useState(true);

  const handleOpenAdd = () => {
    setEditingId(null);
    setCustomerName('');
    setCustomerCity(vendor.city || '');
    setPhoto(PRESET_AVATARS[0]);
    setReview('');
    setRating(5);
    setPurchaseItem('');
    setDate('March 2025');
    setIsVerifiedBuyer(true);
    setIsEditing(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setCustomerName(t.customerName);
    setCustomerCity(t.customerCity || '');
    setPhoto(t.photo || PRESET_AVATARS[0]);
    setReview(t.review);
    setRating(t.rating);
    setPurchaseItem(t.purchaseItem || '');
    setDate(t.date || '');
    setIsVerifiedBuyer(t.isVerifiedBuyer ?? true);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !review.trim()) {
      alert('Please enter customer name and review.');
      return;
    }

    const newTestimonial: Testimonial = {
      id: editingId || `test_${Date.now()}`,
      vendorId: vendor.id,
      customerName: customerName.trim(),
      customerCity: customerCity.trim() || undefined,
      photo: photo.trim() || undefined,
      review: review.trim(),
      rating,
      purchaseItem: purchaseItem.trim() || undefined,
      date: date.trim() || undefined,
      isVerifiedBuyer,
    };

    const isUpdate = Boolean(editingId);
    storageService.saveTestimonial(vendor.id, newTestimonial);
    setIsEditing(false);
    setEditingId(null);
    onRefresh();
    const msg = isUpdate
      ? `Review from "${newTestimonial.customerName}" updated successfully!`
      : `New review from "${newTestimonial.customerName}" added successfully!`;
    setUpdateMsg(msg);
    setTimeout(() => setUpdateMsg(null), 5000);
  };

  const handleDelete = (testId: string) => {
    if (confirm('Are you sure you want to delete this customer review?')) {
      storageService.deleteTestimonial(vendor.id, testId);
      onRefresh();
      setUpdateMsg('Customer review deleted successfully.');
      setTimeout(() => setUpdateMsg(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Update Message Alert Banner */}
      {updateMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <span className="block font-black text-[13px] text-emerald-900">Updated Successfully!</span>
              <span className="text-[11px] text-emerald-700 font-medium">{updateMsg}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setUpdateMsg(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header with Stats & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs">
        <div>
          <h3 className="text-base font-bold font-royal text-[#2A1810] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            Customer Testimonials &amp; Reviews ({testimonials.length})
          </h3>
          <p className="text-xs text-[#7A6855] mt-0.5">
            Add genuine patron feedback, bridal testimonials, and verified gold buyer reviews to showcase on your digital showroom.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-[#4A0E17] hover:bg-[#681420] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4 text-[#E5C158]" />
          <span>Add New Review</span>
        </button>
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="bg-white rounded-2xl p-6 border-2 border-[#D4AF37] shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0EAE1] mb-5">
            <h4 className="text-base font-bold font-royal text-[#2A1810]">
              {editingId ? 'Edit Customer Review' : 'Add New Customer Testimonial'}
            </h4>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1.5 rounded-lg text-[#7A6855] hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2A1810] mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pooja Singhal or Rajesh Verma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D8CEBE] text-xs focus:border-[#4A0E17] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A1810] mb-1">
                  Customer City / State
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jaipur, Rajasthan"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D8CEBE] text-xs focus:border-[#4A0E17] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A1810] mb-1">
                  Star Rating (1 to 5)
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-hidden"
                    >
                      <Star
                        className={`w-6 h-6 transition-all ${
                          star <= rating
                            ? 'text-[#E5C158] fill-[#E5C158] scale-110'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#8C6D23] ml-2">
                    {rating} Star{rating > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A1810] mb-1">
                  Purchased Jewellery Item (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 22K Royal Bridal Kundan Choker"
                  value={purchaseItem}
                  onChange={(e) => setPurchaseItem(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D8CEBE] text-xs focus:border-[#4A0E17] focus:outline-hidden"
                />
              </div>

              <div className="md:col-span-2">
                <ImageUploader
                  value={photo}
                  onChange={(val) => setPhoto(val)}
                  label="Customer Photo / Reviewer Avatar (ग्राहक की फोटो अपलोड करें)"
                  helperText="Upload a photo from device or choose a preset avatar."
                  aspectRatio="square"
                  presets={PRESET_AVATARS.map((url, i) => ({ label: `Patron ${i + 1}`, url }))}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#2A1810] mb-1">
                  Customer Review Quote *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="What did the patron say about the hallmark purity, craftsmanship, or WhatsApp ordering experience?"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBE] text-xs focus:border-[#4A0E17] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A1810] mb-1">
                  Purchase Date / Month
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D8CEBE] text-xs focus:border-[#4A0E17] focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-3 pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#2A1810]">
                  <input
                    type="checkbox"
                    checked={isVerifiedBuyer}
                    onChange={(e) => setIsVerifiedBuyer(e.target.checked)}
                    className="w-4 h-4 accent-[#1B6D3E] rounded"
                  />
                  <span>Show Verified Buyer Badge</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F0EAE1]">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#4A0E17] hover:bg-[#681420] text-white text-xs font-bold shadow-md transition-colors"
              >
                {editingId ? 'Update Review' : 'Save Review'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials List */}
      {testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E8DFC8] space-y-3">
          <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto opacity-70" />
          <h4 className="text-base font-bold font-royal text-[#2A1810]">No Reviews Added Yet</h4>
          <p className="text-xs text-[#7A6855] max-w-md mx-auto">
            Add quotes and feedback from your loyal patrons to build strong social proof for online buyers.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-[#4A0E17] text-white text-xs font-bold"
          >
            Add First Review
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-5 border border-[#E8DFC8] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < t.rating ? 'text-[#E5C158] fill-[#E5C158]' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(t)}
                      className="p-1 rounded text-[#8C232C] hover:bg-[#FAF0F1]"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="p-1 rounded text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#4A3E34] leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>

                {t.purchaseItem && (
                  <span className="inline-block text-[10px] font-medium text-[#8C232C] bg-[#FAF0F1] px-2 py-0.5 rounded border border-[#8C232C]/20">
                    Item: {t.purchaseItem}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5 pt-4 mt-3 border-t border-[#F0EAE1]">
                {t.photo ? (
                  <img
                    src={t.photo}
                    alt={t.customerName}
                    className="w-9 h-9 rounded-full object-cover border border-[#D4AF37]"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#FAF6EE] text-[#8C232C] font-bold text-xs flex items-center justify-center border border-[#D4AF37]">
                    {t.customerName.charAt(0)}
                  </div>
                )}
                <div className="text-xs min-w-0 flex-1">
                  <div className="font-bold text-[#2A1810] flex items-center gap-1 truncate">
                    <span>{t.customerName}</span>
                    {t.isVerifiedBuyer && <ShieldCheck className="w-3 h-3 text-[#1B6D3E] shrink-0" />}
                  </div>
                  <div className="text-[10px] text-[#7A6855]">
                    {t.customerCity || vendor.city} {t.date && `• ${t.date}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
