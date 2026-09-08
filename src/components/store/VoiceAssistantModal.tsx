import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  X, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Search, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  ShoppingBag, 
  PhoneCall, 
  RotateCcw, 
  ChevronRight,
  ArrowRight,
  Globe,
  Loader2
} from 'lucide-react';
import { Vendor, Product } from '../../types';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor;
  products: Product[];
  onApplySearch: (keyword: string, purity?: string) => void;
  onSelectProduct?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

interface AIQueryResult {
  intent: 'product_search' | 'customer_query' | 'general_chat';
  spokenResponse: string;
  searchKeyword?: string;
  suggestedPurity?: string;
  matchedProductIds?: string[];
  whatsappFollowupText?: string;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  vendor,
  products,
  onApplySearch,
  onSelectProduct,
  onAddToCart
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AIQueryResult | null>(null);
  const [language, setLanguage] = useState<'hi-IN' | 'en-IN'>('hi-IN');
  const [isMuted, setIsMuted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Suggested Voice Prompts
  const voicePrompts = [
    { label: '💍 Bridal Choker dikhao', query: 'Padmavati bridal choker dikhao' },
    { label: '✨ 22K Gold Rings', query: '22 Karat pure gold rings dikhao' },
    { label: '🛡️ BIS Hallmark Guarantee', query: 'Kya aapka gold 100% BIS hallmarked hai?' },
    { label: '⚖️ Making Charges inquiry', query: 'Aapke making charges aur gold purity policies kya hain?' },
    { label: '📍 Showroom Address & Hours', query: 'Showroom kahan hai aur kab open hota hai?' },
    { label: '👑 Custom Bridal Jewellery', query: 'Kya aap bridal jewellery customize karte hain?' }
  ];

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Speak text response
  const speakText = (text: string) => {
    if (isMuted || !synthRef.current) return;
    try {
      synthRef.current.cancel(); // Stop prior speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      utterance.lang = language === 'hi-IN' ? 'hi-IN' : 'en-IN';
      synthRef.current.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  // Start Speech Recognition
  const startListening = () => {
    setErrorMsg(null);
    setTranscript('');
    setInterimTranscript('');
    setResult(null);
    stopSpeaking();

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMsg('Your browser does not support voice speech recognition. You can type your query below or pick a suggested voice prompt.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        if (final) {
          setTranscript(final);
          handleProcessVoiceQuery(final);
        } else {
          setInterimTranscript(interim);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMsg('Microphone access was denied. Please allow microphone permissions or use the text prompt below.');
        } else if (event.error === 'no-speech') {
          setErrorMsg('No speech detected. Please tap the microphone and speak clearly.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setErrorMsg('Could not initialize microphone. Please check permissions.');
    }
  };

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    setIsListening(false);
  };

  // Process Query via Server-side Gemini endpoint
  const handleProcessVoiceQuery = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsProcessing(true);
    setErrorMsg(null);
    stopListening();

    try {
      const response = await fetch('/api/ai/voice-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          vendor: {
            name: vendor.name,
            city: vendor.city,
            aboutText: vendor.aboutText,
            tagline: vendor.tagline,
            phone: vendor.phone,
            whatsapp: vendor.whatsapp,
            businessHours: vendor.businessHours
          },
          products: products.map((p) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            purity: p.purity,
            description: p.description,
            makingCharges: p.makingCharges
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setResult(data);

      if (data.spokenResponse) {
        speakText(data.spokenResponse);
      }

    } catch (err: any) {
      console.error('Error querying AI voice service:', err);
      // Fallback local heuristic
      const q = queryText.toLowerCase();
      const matched = products.filter((p) => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.purity.toLowerCase().includes(q)
      );

      const isPolicy = /hallmark|purity|return|exchange|charge|rate|address|hour|timing/i.test(q);
      const fallbackResult: AIQueryResult = {
        intent: isPolicy ? 'customer_query' : 'product_search',
        spokenResponse: isPolicy 
          ? `Namaste! At ${vendor.name}, all jewellery is 100% BIS Hallmarked with guaranteed pure gold. We are located in ${vendor.city || 'Jaipur'}.`
          : `Showing our handcrafted collection for "${queryText}". We found ${matched.length} ornaments for you.`,
        searchKeyword: queryText,
        suggestedPurity: /18k/i.test(q) ? '18K (750)' : /22k|916/i.test(q) ? '22K (916)' : 'all',
        matchedProductIds: matched.map((p) => p.id),
        whatsappFollowupText: `Hello ${vendor.name}, I inquired: ${queryText}`
      };

      setResult(fallbackResult);
      if (fallbackResult.spokenResponse) {
        speakText(fallbackResult.spokenResponse);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Auto-start listening when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        startListening();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      stopListening();
      stopSpeaking();
      setResult(null);
      setTranscript('');
      setErrorMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter matched products
  const matchedProducts = result?.matchedProductIds && result.matchedProductIds.length > 0
    ? products.filter((p) => result.matchedProductIds?.includes(p.id))
    : (result?.searchKeyword ? products.filter((p) => 
        p.title.toLowerCase().includes(result.searchKeyword!.toLowerCase()) ||
        p.purity.toLowerCase().includes(result.searchKeyword!.toLowerCase())
      ) : []);

  // Format WhatsApp URL
  const whatsappUrl = vendor.whatsapp
    ? `https://wa.me/${vendor.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
        result?.whatsappFollowupText || `Hello ${vendor.name}, I would like to inquire about: ${transcript || 'jewellery'}`
      )}`
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Voice Assistant Modal Card */}
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E8DFC8] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Royal Header */}
        <div className="bg-gradient-to-r from-[#1F070B] via-[#350A11] to-[#1F070B] text-white p-5 sm:p-6 border-b border-[#D4AF37]/30 relative">
          
          {/* Subtle gold glow */}
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FAF0D7] to-[#D4AF37] text-[#1F070B] flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-[#720917]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
                    AI Voice Concierge
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF0D7]/20 border border-[#E5C158]/50 text-[#F5D061]">
                    Smart Voice
                  </span>
                </div>
                <p className="text-xs text-[#E8DFC8]/90 font-medium">
                  {vendor.name} &bull; Speak to search ornaments or ask queries
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <button
                onClick={() => {
                  const newLang = language === 'hi-IN' ? 'en-IN' : 'hi-IN';
                  setLanguage(newLang);
                  if (isListening) {
                    stopListening();
                    setTimeout(() => startListening(), 200);
                  }
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-1.5 transition-all"
                title="Toggle Voice Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#F5D061]" />
                <span>{language === 'hi-IN' ? 'हिंदी' : 'English'}</span>
              </button>

              {/* Mute/Unmute Audio Speech */}
              <button
                onClick={() => {
                  if (!isMuted) stopSpeaking();
                  setIsMuted(!isMuted);
                }}
                className={`p-2 rounded-lg border transition-all ${
                  isMuted 
                    ? 'bg-red-500/20 border-red-400 text-red-300' 
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-[#F5D061]'
                }`}
                title={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Close Modal */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Central Voice Listening Orb & State */}
          <div className="text-center py-3 flex flex-col items-center justify-center">
            
            {/* Pulsing Microphone Orb */}
            <div className="relative mb-4">
              {isListening && (
                <>
                  <div className="absolute -inset-4 rounded-full bg-[#D4AF37]/20 animate-ping opacity-75" />
                  <div className="absolute -inset-8 rounded-full bg-[#720917]/10 animate-pulse" />
                </>
              )}
              
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing}
                className={`relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
                  isListening
                    ? 'bg-gradient-to-tr from-[#720917] to-[#A31627] text-white ring-4 ring-[#E5C158] scale-105'
                    : isProcessing
                    ? 'bg-[#FAF0D7] text-[#720917] ring-2 ring-[#D4AF37]'
                    : 'bg-gradient-to-tr from-[#D4AF37] to-[#FAF0D7] text-[#1F070B] hover:scale-105 ring-2 ring-[#B8860B]/50'
                }`}
                title={isListening ? 'Tap to stop listening' : 'Tap to speak'}
              >
                {isProcessing ? (
                  <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-[#720917]" />
                ) : isListening ? (
                  <Mic className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
                ) : (
                  <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-[#720917]" />
                )}
              </button>
            </div>

            {/* Listening Status & Transcript */}
            <div className="space-y-1.5 max-w-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-[#8C6D23]">
                {isProcessing 
                  ? 'Jeweller AI is thinking...' 
                  : isListening 
                  ? 'Listening to you... / सुन रहे हैं...' 
                  : 'Tap Microphone to Speak'}
              </p>

              {/* Real-time transcript display */}
              <div className="min-h-[36px] flex items-center justify-center px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <p className="text-sm sm:text-base font-medium text-[#1F070B] italic text-center">
                  {transcript || interimTranscript || (
                    <span className="text-[#998A78] not-italic text-xs sm:text-sm">
                      Try saying: &ldquo;Padmavati bridal choker dikhao&rdquo; or &ldquo;What are your hallmark policies?&rdquo;
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Error Message banner */}
            {errorMsg && (
              <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs max-w-md text-center">
                {errorMsg}
              </div>
            )}

          </div>

          {/* AI Result Section (When query is answered) */}
          {result && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FAF6EE] to-white border-2 border-[#D4AF37]/50 shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Spoken Response Display */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-bold text-[#720917] uppercase tracking-wider font-cinzel">
                      {result.intent === 'product_search' ? 'Ornaments Found' : 'Showroom Concierge Answer'}
                    </span>
                  </div>

                  {!isMuted && (
                    <button
                      onClick={() => speakText(result.spokenResponse)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8C6D23] hover:text-[#720917]"
                      title="Replay Voice Audio"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Repeat Audio</span>
                    </button>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#2A1810] leading-relaxed font-medium bg-white p-3 rounded-xl border border-[#E8DFC8]">
                  {result.spokenResponse}
                </p>
              </div>

              {/* If Product Search: Showcase matched products */}
              {matchedProducts.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#1F070B] uppercase tracking-wider">
                      Matching Ornaments ({matchedProducts.length})
                    </h4>
                    
                    {result.searchKeyword && (
                      <button
                        onClick={() => {
                          onApplySearch(result.searchKeyword || '', result.suggestedPurity);
                          onClose();
                        }}
                        className="text-xs font-bold text-[#720917] hover:underline flex items-center gap-1"
                      >
                        <span>View All in Catalog</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Horizontal Scrollable Product Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
                    {matchedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-[#E8DFC8] hover:border-[#D4AF37] transition-all group"
                      >
                        <img
                          src={prod.images[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&auto=format&fit=crop&q=80'}
                          alt={prod.title}
                          className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#E8DFC8]"
                        />
                        <div className="min-w-0 flex-1 space-y-1">
                          <h5 className="text-xs font-bold text-[#1F070B] truncate group-hover:text-[#720917]">
                            {prod.title}
                          </h5>
                          <div className="flex items-center gap-2 text-[11px]">
                            <span className="font-bold text-[#720917]">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#FAF0D7] text-[#8C6D23] font-semibold">
                              {prod.purity}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 pt-0.5">
                            {onSelectProduct && (
                              <button
                                onClick={() => {
                                  onSelectProduct(prod);
                                  onClose();
                                }}
                                className="text-[11px] font-bold text-[#8C6D23] hover:underline"
                              >
                                View Details
                              </button>
                            )}
                            {onAddToCart && (
                              <button
                                onClick={() => onAddToCart(prod)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#720917] text-white text-[10px] font-bold hover:bg-[#5A121C] transition-all ml-auto"
                              >
                                <ShoppingBag className="w-2.5 h-2.5" />
                                <span>Add</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Apply to Catalog Action */}
                  <button
                    onClick={() => {
                      onApplySearch(result.searchKeyword || '', result.suggestedPurity);
                      onClose();
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#1F070B] text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:brightness-105 transition-all"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Show These {matchedProducts.length} Ornaments on Storefront</span>
                  </button>
                </div>
              )}

              {/* Customer Query Action Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8DFC8]/60">
                {vendor.whatsapp && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-bold shadow-xs transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Ask Showroom on WhatsApp</span>
                  </a>
                )}

                {vendor.phone && (
                  <a
                    href={`tel:${vendor.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#D4AF37] bg-white hover:bg-[#FAF0D7] text-[#720917] text-xs font-bold transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#720917]" />
                    <span>Call Showroom</span>
                  </a>
                )}
              </div>

            </div>
          )}

          {/* Quick Voice Prompt Chips (Click to test or speak) */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#6B5A4E] uppercase tracking-wider">
                Popular Voice Searches &amp; Customer Queries:
              </span>
              <span className="text-[11px] text-[#8C6D23]">Tap any chip to ask</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {voicePrompts.map((vp, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTranscript(vp.query);
                    handleProcessVoiceQuery(vp.query);
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#FAF0D7] border border-[#E8DFC8] hover:border-[#D4AF37] text-xs font-medium text-[#2A1810] transition-all flex items-center gap-1.5 text-left"
                >
                  <span>{vp.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Fallback Input */}
          <div className="pt-2">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (textInput.trim()) {
                  setTranscript(textInput);
                  handleProcessVoiceQuery(textInput);
                  setTextInput('');
                }
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Or type your voice search or question here..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D8CEBE] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#720917] text-[#1F070B]"
                />
              </div>
              <button
                type="submit"
                disabled={!textInput.trim() || isProcessing}
                className="px-4 py-2 rounded-xl bg-[#720917] hover:bg-[#5A121C] disabled:opacity-50 text-white text-xs font-bold transition-all"
              >
                Ask
              </button>
            </form>
          </div>

        </div>

        {/* Modal Footer Note */}
        <div className="p-3 bg-[#FAF8F5] border-t border-[#E8DFC8] px-6 flex items-center justify-between text-[11px] text-[#7A6855]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Powered by Gemini AI &bull; 100% BIS Hallmarked Showroom Assistant</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#720917] font-bold hover:underline"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
};
