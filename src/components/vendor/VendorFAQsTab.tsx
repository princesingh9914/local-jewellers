import React, { useState } from 'react';
import { FAQItem, Vendor } from '../../types';
import { storageService } from '../../services/storage';
import { HelpCircle, Plus, Trash2, Edit3, X, Sparkles, ChevronDown } from 'lucide-react';

interface VendorFAQsTabProps {
  vendor: Vendor;
  onRefresh: () => void;
  onViewStore: () => void;
}

const FAQ_CATEGORIES = [
  'Purity & Certification',
  'Ordering Process',
  'Exchange & Upgrades',
  'Customization & Sizing',
  'Shipping & Delivery',
  'Showroom & Appointments',
];

export const VendorFAQsTab: React.FC<VendorFAQsTabProps> = ({ vendor, onRefresh, onViewStore }) => {
  const faqs = storageService.getFAQs(vendor.id);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState(FAQ_CATEGORIES[0]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setQuestion('');
    setAnswer('');
    setCategory(FAQ_CATEGORIES[0]);
    setIsEditing(true);
  };

  const handleOpenEdit = (f: FAQItem) => {
    setEditingId(f.id);
    setQuestion(f.question);
    setAnswer(f.answer);
    setCategory(f.category || FAQ_CATEGORIES[0]);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      alert('Please fill out both the question and answer.');
      return;
    }

    const newFaq: FAQItem = {
      id: editingId || `faq_${Date.now()}`,
      vendorId: vendor.id,
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim(),
    };

    storageService.saveFAQ(vendor.id, newFaq);
    setIsEditing(false);
    setEditingId(null);
    onRefresh();
  };

  const handleDelete = (faqId: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      storageService.deleteFAQ(vendor.id, faqId);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs">
        <div>
          <h3 className="text-base font-bold font-royal text-[#2A1810] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
            Frequently Asked Questions ({faqs.length})
          </h3>
          <p className="text-xs text-[#7A6855] mt-0.5">
            Clear customer doubts regarding Hallmark HUID verification, gold exchange, custom ring sizing, and insured deliveries.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-[#4A0E17] hover:bg-[#681420] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4 text-[#E5C158]" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="bg-white rounded-2xl p-6 border-2 border-[#D4AF37] shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0EAE1] mb-5">
            <h4 className="text-base font-bold font-royal text-[#2A1810]">
              {editingId ? 'Edit FAQ' : 'Add New FAQ'}
            </h4>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1.5 rounded-lg text-[#7A6855] hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#2A1810] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#D8CEBE] text-xs focus:border-[#4A0E17] focus:outline-hidden"
              >
                {FAQ_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2A1810] mb-1">
                Question *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. How can I verify the 6-digit HUID Hallmark code on my jewellery?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBE] text-xs sm:text-sm focus:border-[#4A0E17] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2A1810] mb-1">
                Answer *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Detailed answer explaining your policy or procedure..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBE] text-xs leading-relaxed focus:border-[#4A0E17] focus:outline-hidden"
              />
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
                {editingId ? 'Update FAQ' : 'Save FAQ'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FAQs List */}
      {faqs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E8DFC8] space-y-3">
          <HelpCircle className="w-10 h-10 text-[#D4AF37] mx-auto opacity-70" />
          <h4 className="text-base font-bold font-royal text-[#2A1810]">No FAQs Added Yet</h4>
          <p className="text-xs text-[#7A6855] max-w-md mx-auto">
            Provide answers to common questions about hallmarking, gold exchange, and WhatsApp orders.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-[#4A0E17] text-white text-xs font-bold"
          >
            Add First FAQ
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <div
              key={f.id}
              className="bg-white rounded-xl p-4 sm:p-5 border border-[#E8DFC8] shadow-xs hover:border-[#D4AF37] transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FAF0D7] text-[#8C6D23] text-[11px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    {f.category && (
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C232C] bg-[#FAF0F1] px-2 py-0.5 rounded">
                        {f.category}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#2A1810]">
                    {f.question}
                  </h4>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(f)}
                    className="p-1.5 rounded-lg text-[#8C232C] hover:bg-[#FAF0F1] transition-colors"
                    title="Edit FAQ"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(f.id)}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#5C4D44] leading-relaxed pl-7 border-t border-[#FAF6EE] pt-2">
                {f.answer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
