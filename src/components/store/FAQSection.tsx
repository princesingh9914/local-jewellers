import React, { useState } from 'react';
import { FAQItem, Vendor } from '../../types';
import { HelpCircle, ChevronDown, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';

interface FAQSectionProps {
  faqs: FAQItem[];
  vendor: Vendor;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs, vendor }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleAskCustomQuestion = () => {
    let rawPhone = vendor.whatsapp || vendor.phone || '7087033009';
    let cleanPhone = rawPhone.replace(/\D/g, '');
    if (cleanPhone.length === 10) cleanPhone = '91' + cleanPhone;

    const message = `Namaste ${vendor.name}!\n\nI have a question about your jewellery collection, gold purity, or custom ordering process.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-12 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EE] border border-[#D4AF37]/40 text-[#8C6D23] text-xs font-bold uppercase tracking-widest font-cinzel">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Assurance & Transparency</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-royal text-[#2A1810]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6855]">
            Everything you need to know about our gold purity, custom sizing, delivery, and WhatsApp ordering.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id || idx}
                className="bg-white rounded-xl border border-[#E8DFC8] overflow-hidden transition-all shadow-xs hover:border-[#D4AF37]"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-hidden"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#FAF6EE] border border-[#D4AF37] text-[#8C232C] text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#2A1810]">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C6D23] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C4D44] leading-relaxed border-t border-[#F5EFE6] bg-[#FFFDF9]">
                    <p>{faq.answer}</p>
                    {faq.category && (
                      <div className="mt-3 flex items-center gap-2 text-[11px] text-[#8C6D23] font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Category: {faq.category}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Consultation Box */}
        <div className="mt-8 p-5 rounded-2xl bg-linear-to-r from-[#FFFDF9] to-[#FAF6EE] border border-[#D4AF37]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-bold font-royal text-[#2A1810] flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              Have another question about custom orders or gold rates?
            </h4>
            <p className="text-xs text-[#7A6855]">
              Speak directly with {vendor.name}'s master jewellers on WhatsApp with zero obligation.
            </p>
          </div>
          <button
            onClick={handleAskCustomQuestion}
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Ask on WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};
