import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  PhoneCall, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  ShoppingBag, 
  Sparkles, 
  Scale, 
  Check, 
  ArrowLeft,
  Share2,
  Gem,
  Clock,
  Navigation,
  ExternalLink,
  Award,
  ChevronRight,
  Info,
  BookOpen,
  Calendar,
  FileText,
  Truck,
  RotateCcw,
  Phone,
  Mic
} from 'lucide-react';
import { Vendor, Product, CartItem, AppView, BlogPost, PolicyType } from '../../types';
import { storageService } from '../../services/storage';
import { HallmarkStamp, IndianBorderPattern } from '../common/IndianMotif';
import { ProductDetailModal } from './ProductDetailModal';
import { CartDrawer } from './CartDrawer';
import { TestimonialsSection } from './TestimonialsSection';
import { FAQSection } from './FAQSection';
import { BlogDetailModal } from './BlogDetailModal';
import { SocialMediaLinks } from '../common/SocialMediaLinks';
import { VendorHeader } from './VendorHeader';
import { VendorFooter } from './VendorFooter';
import { AboutUsSection } from './AboutUsSection';
import { VoiceAssistantModal } from './VoiceAssistantModal';

interface PublicStorefrontProps {
  vendorSlug: string;
  onNavigate: (view: AppView) => void;
  onOpenAdminAccess?: () => void;
}

export const PublicStorefront: React.FC<PublicStorefrontProps> = ({
  vendorSlug,
  onNavigate,
  onOpenAdminAccess,
}) => {
  const vendor = storageService.getVendorBySlug(vendorSlug);

  // States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPurity, setSelectedPurity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [activeModalBlog, setActiveModalBlog] = useState<BlogPost | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // If vendor not found or deactivated
  if (!vendor) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-2xl font-bold">
          !
        </div>
        <h2 className="text-2xl font-bold font-royal text-[#2A1810]">
          Jewellery Store Unavailable
        </h2>
        <p className="text-sm text-[#7A6855]">
          This store might be currently deactivated by admin or the store link is invalid.
        </p>
        <button
          onClick={() => onNavigate({ type: 'landing' })}
          className="px-5 py-2.5 rounded-xl bg-[#4A0E17] text-white text-xs font-bold"
        >
          Return to Home Page →
        </button>
      </div>
    );
  }

  // Multi-tenant isolated products, categories, blogs, testimonials, and faqs
  const categories = storageService.getCategories(vendor.id);
  const products = storageService.getProducts(vendor.id);
  const blogs = useMemo(() => storageService.getBlogs(vendor.id).filter((b) => b.isPublished), [vendor.id]);
  const testimonials = useMemo(() => storageService.getTestimonials(vendor.id), [vendor.id]);
  const faqs = useMemo(() => storageService.getFAQs(vendor.id), [vendor.id]);

  // Primary Theme Color for the Storefront
  const storeThemeColor = vendor.themeColor || '#720917';

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) {
        return false;
      }
      // Purity match
      if (selectedPurity !== 'all' && p.purity !== selectedPurity) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchPurity = p.purity.toLowerCase().includes(q);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchPurity && !matchTags) return false;
      }
      return true;
    });
  }, [products, selectedCategory, selectedPurity, searchQuery]);

  // Active navigation tab
  const [activeNavTab, setActiveNavTab] = useState<'home' | 'categories' | 'about' | 'showroom'>('home');

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1, selectedSize?: string) => {
    const sizeToUse = selectedSize || product.size;
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === sizeToUse
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === sizeToUse
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize: sizeToUse }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleShareStore = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* VENDOR'S OWN DEDICATED STORE HEADER */}
      <VendorHeader
        vendor={vendor}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={onNavigate}
        onOpenAdminAccess={onOpenAdminAccess}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        activeNavTab={activeNavTab}
        onSelectNavTab={setActiveNavTab}
        hasReviews={testimonials.length > 0}
        hasBlogs={blogs.length > 0}
        hasFaqs={faqs.length > 0}
        onOpenVoiceAssistant={() => setIsVoiceModalOpen(true)}
      />

      {/* VENDOR STORE ROYAL HERO BANNER */}
      <div className="relative bg-[#1F070B] text-white overflow-hidden">
        {/* Background Image with luxury dark gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={vendor.banner}
            alt={vendor.name}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F070B] via-[#1F070B]/75 to-[#1F070B]/40" />
        </div>

        {/* Hero Content with natural in-flow spacing (zero font collision) */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0D7]/15 border border-[#E5C158]/40 text-[#E5C158] text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Govt. Approved BIS Hallmarked Showroom &bull; {vendor.city}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-royal font-bold text-white tracking-wide leading-tight sm:leading-snug">
            {vendor.tagline || 'Exquisite Handcrafted Bridal & Fine Gold Jewellery'}
          </h2>

          <p className="text-xs sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
            Explore authentic 22 Karat (916) and 18 Karat (750) hallmarked gold, uncut Polki diamonds, and temple jewellery directly from {vendor.name}.
          </p>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#categories-section"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:from-[#E5C158] hover:to-[#B8860B] text-[#2A1810] text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Gem className="w-4 h-4 text-[#2A1810]" />
              <span>Explore Ornaments</span>
            </a>

            <a
              href={`https://wa.me/${vendor.whatsapp.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(vendor.name)},%20I%20would%20like%20to%20inquire%20about%20your%20jewellery.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Showroom</span>
            </a>
          </div>
        </div>

        {/* 4 Hallmarks of Trust Strip */}
        <div className="relative z-10 border-t border-[#D4AF37]/20 bg-[#160407]/90 py-3.5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs text-gray-300">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E5C158] shrink-0" />
              <span>100% BIS 6-Digit HUID</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Truck className="w-4 h-4 text-[#E5C158] shrink-0" />
              <span>100% Insured Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#E5C158] shrink-0" />
              <span>Lifetime Buyback Guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E5C158] shrink-0" />
              <span>Zero-Login WhatsApp Ordering</span>
            </div>
          </div>
        </div>

      </div>

      {/* STORE SEARCH & CATEGORY FILTERS */}
      <div id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-5">
        
        {/* Search Bar, Voice Search & Purity Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#7A6855] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search jewellery (e.g. Bridal Choker, 22K Jhumka, Kada, Ring)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D8CEBE] bg-white focus:outline-none focus:border-[#8C232C] shadow-xs"
            />
            {/* Mic inside input */}
            <button
              type="button"
              onClick={() => setIsVoiceModalOpen(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#8C6D23] hover:text-[#720917] hover:bg-[#FAF0D7] transition-all"
              title="Voice Search / बोलकर खोजें"
            >
              <Mic className="w-4 h-4 text-[#720917] animate-pulse" />
            </button>
          </div>

          {/* Voice Search Button */}
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#FAF0D7] via-[#FDF5E2] to-[#F5E6BE] hover:brightness-105 border border-[#E5C158] text-[#720917] font-bold text-xs flex items-center justify-center gap-2 shadow-xs shrink-0 transition-all group"
            title="Voice Search: Speak to search ornaments or ask showroom queries"
          >
            <Mic className="w-4 h-4 text-[#720917] animate-pulse group-hover:scale-110 transition-transform" />
            <span>Voice Search</span>
            <span className="text-[10px] font-bold bg-[#720917] text-[#FAF0D7] px-1.5 py-0.5 rounded">बोलकर खोजें</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <Filter className="w-4 h-4 text-[#7A6855]" />
            <select
              value={selectedPurity}
              onChange={(e) => setSelectedPurity(e.target.value)}
              className="w-full sm:w-auto py-2.5 px-3 text-xs rounded-xl border border-[#D8CEBE] bg-white focus:outline-none focus:border-[#8C232C] text-[#2A1810]"
            >
              <option value="all">All Purities</option>
              <option value="22K (916)">22K (916) Hallmark</option>
              <option value="18K (750)">18K (750) Hallmark</option>
              <option value="Polki / Kundan">Polki / Kundan</option>
              <option value="Diamond Certified">Diamond Certified</option>
              <option value="925 Silver">925 Pure Silver</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#4A0E17] text-[#FAF8F5] shadow-sm'
                : 'bg-white border border-[#E8DFC8] text-[#5C4D44] hover:bg-[#FAF6EE]'
            }`}
          >
            All Ornaments ({products.length})
          </button>

          {categories.map((cat) => {
            const catCount = products.filter((p) => p.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#4A0E17] text-[#FAF8F5] shadow-sm'
                    : 'bg-white border border-[#E8DFC8] text-[#5C4D44] hover:bg-[#FAF6EE]'
                }`}
              >
                {cat.name} ({catCount})
              </button>
            );
          })}
        </div>

        {/* PRODUCT CATALOG GRID */}
        <div id="products-section" className="pt-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DFC8] mb-6">
            <div>
              <h2 className="text-lg font-bold font-royal text-[#2A1810]">
                {selectedCategory === 'all' 
                  ? 'All Jewellery Collections' 
                  : categories.find(c => c.id === selectedCategory)?.name || 'Jewellery'}
              </h2>
              <p className="text-xs text-[#7A6855]">
                Showing {filteredProducts.length} certified hallmark ornaments
              </p>
            </div>
            {selectedPurity !== 'all' && (
              <span className="text-xs bg-[#FAF0D7] text-[#8C6D23] px-3 py-1 rounded-full font-bold border border-[#E5C158]">
                Filter: {selectedPurity}
              </span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E8DFC8] p-12 text-center space-y-3">
              <Gem className="w-12 h-12 text-[#B8860B] mx-auto opacity-60" />
              <h3 className="text-base font-bold font-royal text-[#2A1810]">
                No Jewellery Found
              </h3>
              <p className="text-xs text-[#7A6855]">
                Please adjust your search keywords or select another category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedPurity('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-[#8C232C] underline"
              >
                View All Ornaments
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const inCart = cartItems.some((ci) => ci.product.id === product.id);
                const availabilityText = product.availability || (product.inStock ? 'In Stock' : 'Made to Order');

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden border border-[#E8DFC8] shadow-xs hover:shadow-lg transition-all duration-250 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Product Image */}
                      <div 
                        onClick={() => setActiveModalProduct(product)}
                        className="relative aspect-square overflow-hidden bg-[#FAF6EE] cursor-pointer"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Purity Tag */}
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FAF8F5]/90 text-[#4A0E17] border border-[#D4AF37]/50 shadow-xs backdrop-blur-xs">
                            {product.purity}
                          </span>
                        </div>

                        {/* Availability Tag */}
                        <div className="absolute top-2.5 right-2.5">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs backdrop-blur-xs ${
                            availabilityText === 'In Stock'
                              ? 'bg-[#EBF9F0]/90 text-[#1B6D3E] border border-[#1B6D3E]/30'
                              : availabilityText === 'Made to Order'
                              ? 'bg-[#FAF0D7]/90 text-[#8C6D23] border border-[#E5C158]/50'
                              : 'bg-gray-100/90 text-gray-600 border border-gray-300'
                          }`}>
                            {availabilityText}
                          </span>
                        </div>

                        {/* Weight Tag */}
                        {product.grossWeightGrams && (
                          <div className="absolute bottom-2.5 right-2.5">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 text-white shadow-xs backdrop-blur-xs flex items-center gap-1">
                              <Scale className="w-2.5 h-2.5" />
                              ~{product.grossWeightGrams}g
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <h3 
                          onClick={() => setActiveModalProduct(product)}
                          className="text-sm font-bold font-royal text-[#2A1810] line-clamp-1 hover:text-[#8C232C] cursor-pointer"
                        >
                          {product.title}
                        </h3>

                        {/* Stones & Size badges if present */}
                        <div className="flex flex-wrap items-center gap-1.5 min-h-[22px]">
                          {product.stoneDetails && (
                            <span className="text-[10px] bg-[#FAF3E6] text-[#7A5812] px-1.5 py-0.5 rounded flex items-center gap-1 line-clamp-1 border border-[#E8DFC8]">
                              <Gem className="w-2.5 h-2.5 text-[#B8860B] shrink-0" />
                              <span className="truncate max-w-[130px]">{product.stoneDetails}</span>
                            </span>
                          )}
                          {product.size && (
                            <span className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                              Size: {product.size}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-[#7A6855] line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        {/* Price & Making Charges */}
                        <div className="pt-2 flex items-baseline justify-between border-t border-[#F5EFE6]">
                          <div>
                            <span className="text-lg font-bold text-[#4A0E17] font-cinzel">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[11px] text-gray-400 line-through ml-1.5">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                          {product.makingCharges && (
                            <span className="text-[10px] text-[#8C6D23] font-medium">
                              Making: {product.makingCharges}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setActiveModalProduct(product)}
                        className="py-2 px-2.5 rounded-xl border border-[#D8CEBE] bg-[#FAF8F5] hover:bg-[#F0EAE1] text-[#2A1810] text-xs font-bold transition-all"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => handleAddToCart(product, 1)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-xs ${
                          inCart
                            ? 'bg-[#1B6D3E] text-white hover:bg-[#145630]'
                            : 'bg-[#4A0E17] hover:bg-[#681420] text-white'
                        }`}
                      >
                        {inCart ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-[#E5C158]" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ABOUT US SECTION - IMAGE AND PARAGRAPHS */}
        <AboutUsSection 
          vendor={vendor} 
          onExploreProducts={() => {
            const prodEl = document.getElementById('products-section') || document.getElementById('categories-section');
            if (prodEl) {
              prodEl.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* PATRON EXPERIENCES & TESTIMONIALS SECTION */}
        {testimonials.length > 0 && (
          <div id="testimonials-section" className="scroll-mt-16 -mx-4 sm:-mx-6 lg:-mx-8">
            <TestimonialsSection testimonials={testimonials} vendor={vendor} />
          </div>
        )}

        {/* JEWELLERY JOURNAL & BLOGS SECTION */}
        {blogs.length > 0 && (
          <section id="blogs-section" className="pt-10 pb-6 scroll-mt-20">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EE] border border-[#D4AF37]/40 text-[#8C6D23] text-xs font-bold uppercase tracking-widest font-cinzel">
                <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Editorial &amp; Articles</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-royal text-[#2A1810]">
                The Jewellery Journal
              </h2>
              <p className="text-xs sm:text-sm text-[#7A6855]">
                Curated guides on gold purity, bridal styling, gemstone lore, and royal heirloom care by {vendor.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  onClick={() => setActiveModalBlog(blog)}
                  className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs hover:shadow-md transition-all hover:border-[#D4AF37] cursor-pointer flex flex-col group"
                >
                  {/* Featured Image */}
                  <div className="relative aspect-16/10 bg-[#F5EFE6] overflow-hidden">
                    <img
                      src={blog.featuredImage || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    
                    {blog.tags && blog.tags[0] && (
                      <span className="absolute top-3 left-3 bg-[#4A0E17]/90 text-[#FAF8F5] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs">
                        {blog.tags[0]}
                      </span>
                    )}

                    <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {blog.readTimeMinutes || 3} min read
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-[#7A6855]">
                        <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>&bull;</span>
                        <span className="truncate">By {blog.authorName || vendor.name}</span>
                      </div>

                      <h3 className="font-bold font-royal text-[#2A1810] text-base leading-snug group-hover:text-[#8C232C] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-xs text-[#7A6855] line-clamp-2 leading-relaxed">
                        {blog.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#F0EAE1] flex items-center justify-between text-xs font-bold text-[#8C232C]">
                      <span>Read Full Article</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* FAQS SECTION */}
        {faqs.length > 0 && (
          <div id="faqs-section" className="scroll-mt-16 -mx-4 sm:-mx-6 lg:-mx-8">
            <FAQSection faqs={faqs} vendor={vendor} />
          </div>
        )}

        {/* SHOWROOM LOCATION, GOOGLE MAP & BUSINESS HOURS SECTION */}
        <section id="showroom-section" className="pt-8 pb-12 scroll-mt-20">
          <div className="bg-white rounded-3xl border border-[#E8DFC8] overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8 bg-[#4A0E17] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#E5C158] text-[11px] font-bold uppercase tracking-wider mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Showroom &amp; Location</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-royal">
                  Store Location, Directions &amp; Timings
                </h2>
                <p className="text-xs text-[#FAF8F5]/80 mt-0.5">
                  Visit our digital or physical showroom or contact directly via WhatsApp.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${vendor.phone}`}
                  className="py-2.5 px-4 rounded-xl bg-white text-[#4A0E17] font-bold text-xs hover:bg-[#FAF6EE] transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call {vendor.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${vendor.whatsapp.replace(/\D/g, '')}?text=Namaste%20${encodeURIComponent(vendor.name)},%20I%20would%20like%20to%20visit%20your%20showroom.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Left Column: Address & Business Hours */}
              <div className="space-y-6 flex flex-col justify-between">
                
                {/* Physical Address */}
                <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8DFC8] space-y-2">
                  <div className="flex items-center gap-2 text-[#4A0E17] font-bold text-xs uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-[#8C232C]" />
                    <span>Showroom Address</span>
                  </div>
                  <h3 className="text-base font-bold text-[#2A1810] font-royal">
                    {vendor.name}
                  </h3>
                  <p className="text-xs text-[#5C4D44] leading-relaxed">
                    {vendor.address || `${vendor.city}, ${vendor.state}`}
                  </p>
                  <div className="pt-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vendor.googleMapQuery || vendor.address || `${vendor.name} ${vendor.city}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C232C] hover:underline"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions on Google Maps &rarr;</span>
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8DFC8] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#4A0E17] font-bold text-xs uppercase tracking-wider">
                      <Clock className="w-4 h-4 text-[#8C232C]" />
                      <span>Business Hours</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF9F0] text-[#1B6D3E] border border-[#1B6D3E]/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B6D3E] animate-pulse" />
                      Open Today
                    </span>
                  </div>

                  <div className="text-xs text-[#2A1810] space-y-2 font-medium divide-y divide-[#E8DFC8]">
                    <div className="flex justify-between pt-1">
                      <span className="text-[#7A6855]">Monday &ndash; Saturday:</span>
                      <span className="font-bold text-[#2A1810]">10:30 AM &ndash; 08:30 PM</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-[#7A6855]">Sunday:</span>
                      <span className="font-bold text-[#2A1810]">11:00 AM &ndash; 05:00 PM</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-[#7A6855]">Festivals &amp; Auspicious Days:</span>
                      <span className="font-bold text-[#8C232C]">Special hours during Dhanteras &amp; Diwali</span>
                    </div>
                  </div>

                  {vendor.businessHours && (
                    <div className="text-[11px] text-[#7A6855] italic pt-1 border-t border-[#E8DFC8]">
                      Note: {vendor.businessHours}
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Interactive Google Map Card */}
              <div className="rounded-2xl border border-[#E8DFC8] overflow-hidden bg-[#FAF6EE] flex flex-col min-h-[320px]">
                {vendor.googleMapEmbedUrl ? (
                  <iframe
                    src={vendor.googleMapEmbedUrl}
                    title="Google Map Location"
                    className="w-full h-full min-h-[320px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[#8C232C] font-bold text-xs">
                        <MapPin className="w-4 h-4" />
                        <span>Google Map Location</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#2A1810]">
                        {vendor.name} — {vendor.city}, {vendor.state}
                      </h4>
                      <p className="text-xs text-[#7A6855]">
                        {vendor.address}
                      </p>
                    </div>

                    {/* Simulated Map Visual Card with Compass & Coordinates */}
                    <div className="bg-white rounded-xl p-5 border border-[#E5C158] space-y-3 text-center shadow-xs">
                      <div className="w-12 h-12 rounded-full bg-[#FAF0D7] text-[#8C6D23] flex items-center justify-center mx-auto">
                        <Navigation className="w-6 h-6 rotate-45" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#2A1810]">
                          GPS Navigation Available
                        </div>
                        <div className="text-[11px] text-[#7A6855]">
                          Click below to open exact directions and showroom navigation on Google Maps.
                        </div>
                      </div>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vendor.googleMapQuery || vendor.address || `${vendor.name} ${vendor.city}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-[#4A0E17] hover:bg-[#681420] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#E5C158]" />
                        <span>Open in Google Maps / Directions</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* VENDOR'S OWN DEDICATED STORE FOOTER */}
      <VendorFooter 
        vendor={vendor} 
        onNavigate={onNavigate} 
        onOpenAdminAccess={onOpenAdminAccess}
      />

      {/* FLOATING CART BUTTON (Always accessible for customer) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-in bounce-in duration-300">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#4A0E17] to-[#720917] text-white font-bold text-sm shadow-2xl hover:brightness-110 active:scale-95 border-2 border-[#D4AF37]"
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-[#E5C158]" />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#E5C158] text-[#2A0E13] text-xs font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            </div>
            <div>
              <div className="leading-tight">View Jewellery Cart</div>
              <div className="text-[10px] text-[#E5C158] font-normal">
                WhatsApp Order Checkout →
              </div>
            </div>
          </button>
        </div>
      )}

      {/* FLOATING AI VOICE CONCIERGE BUTTON */}
      <div 
        className={`fixed z-40 transition-all duration-300 ${
          totalCartCount > 0 ? 'bottom-24 right-6' : 'bottom-6 right-6'
        }`}
      >
        <button
          onClick={() => setIsVoiceModalOpen(true)}
          className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#1F070B] via-[#4A0E17] to-[#720917] text-white shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-[#D4AF37] transition-all group"
          title="AI Voice Assistant: Speak to search ornaments or ask showroom queries"
        >
          <div className="relative">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF0D7] text-[#720917] flex items-center justify-center shadow-xs">
              <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#720917] group-hover:scale-110 transition-transform animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5D061] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]"></span>
            </span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#FAF0D7] font-cinzel leading-tight">
                AI Voice Concierge
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#FAF0D7]/20 text-[#F5D061] rounded-full border border-[#E5C158]/50">
                Voice
              </span>
            </div>
            <span className="block text-[10px] text-white/80 leading-tight">
              बोलकर खोजें / Ask Queries
            </span>
          </div>
        </button>
      </div>

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        vendor={vendor}
        products={products}
        onApplySearch={(keyword, purity) => {
          setSearchQuery(keyword);
          if (purity && purity !== 'all') {
            setSelectedPurity(purity);
          }
          const prodEl = document.getElementById('products-section') || document.getElementById('categories-section');
          if (prodEl) {
            prodEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onSelectProduct={(product) => setActiveModalProduct(product)}
        onAddToCart={(product) => handleAddToCart(product)}
      />

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <ProductDetailModal
          product={activeModalProduct}
          vendor={vendor}
          onClose={() => setActiveModalProduct(null)}
          onAddToCart={handleAddToCart}
          isAlreadyInCart={cartItems.some((ci) => ci.product.id === activeModalProduct.id)}
        />
      )}

      {/* Blog & Editorial Article Detail Modal */}
      {activeModalBlog && (
        <BlogDetailModal
          blog={activeModalBlog}
          vendor={vendor}
          onClose={() => setActiveModalBlog(null)}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        vendor={vendor}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
};
