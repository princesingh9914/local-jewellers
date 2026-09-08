import React, { useState } from 'react';
import { 
  Store, 
  Package, 
  Layers, 
  Settings, 
  MessageSquare, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Check, 
  Eye, 
  Scale, 
  PhoneCall, 
  MessageCircle, 
  ArrowLeft,
  Share2,
  AlertCircle,
  BookOpen,
  Sparkles,
  HelpCircle,
  Palette
} from 'lucide-react';
import { Vendor, Product, Category, OrderInquiry, AppView } from '../../types';
import { storageService } from '../../services/storage';
import { HallmarkStamp } from '../common/IndianMotif';
import { VendorBlogsTab } from './VendorBlogsTab';
import { VendorTestimonialsTab } from './VendorTestimonialsTab';
import { VendorFAQsTab } from './VendorFAQsTab';

interface VendorDashboardProps {
  vendorId: string;
  onNavigate: (view: AppView) => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({
  vendorId,
  onNavigate,
}) => {
  const vendors = storageService.getVendors();
  const [currentVendorId, setCurrentVendorId] = useState<string>(vendorId);
  
  const currentVendor = vendors.find((v) => v.id === currentVendorId) || vendors[0];

  // Active Tab
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'blogs' | 'testimonials' | 'faqs' | 'profile' | 'inquiries'>('products');
  
  // Refresh trigger
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey((k) => k + 1);

  // Data for current vendor (strictly isolated!)
  const categories = storageService.getCategories(currentVendor.id);
  const products = storageService.getProducts(currentVendor.id);
  const inquiries = storageService.getOrders(currentVendor.id);
  const blogs = storageService.getBlogs(currentVendor.id);
  const testimonials = storageService.getTestimonials(currentVendor.id);
  const faqs = storageService.getFAQs(currentVendor.id);

  // Product Form State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  
  const [prodTitle, setProdTitle] = useState('');
  const [prodSku, setProdSku] = useState('');
  const [prodCategory, setProdCategory] = useState(categories[0]?.id || '');
  const [prodPrice, setProdPrice] = useState<number>(50000);
  const [prodOriginalPrice, setProdOriginalPrice] = useState<number>(55000);
  const [prodPurity, setProdPurity] = useState<Product['purity']>('22K (916)');
  const [prodGrossWeight, setProdGrossWeight] = useState<number>(10);
  const [prodNetWeight, setProdNetWeight] = useState<number>(9.5);
  const [prodMakingCharges, setProdMakingCharges] = useState('₹750 / gram');
  const [prodSize, setProdSize] = useState('');
  const [prodStoneDetails, setProdStoneDetails] = useState('');
  const [prodAvailability, setProdAvailability] = useState<'In Stock' | 'Made to Order' | 'Out of Stock'>('In Stock');
  const [prodDescription, setProdDescription] = useState('');
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80');
  const [prodInStock, setProdInStock] = useState(true);
  const [prodFeatured, setProdFeatured] = useState(false);

  // Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Profile Form State
  const [profileName, setProfileName] = useState(currentVendor.name);
  const [profileTagline, setProfileTagline] = useState(currentVendor.tagline);
  const [profileWhatsapp, setProfileWhatsapp] = useState(currentVendor.whatsapp);
  const [profilePhone, setProfilePhone] = useState(currentVendor.phone);
  const [profileCity, setProfileCity] = useState(currentVendor.city);
  const [profileAddress, setProfileAddress] = useState(currentVendor.address);
  const [profileBusinessHours, setProfileBusinessHours] = useState(currentVendor.businessHours || 'Monday – Saturday: 10:30 AM – 8:30 PM | Sunday: 11:00 AM – 5:00 PM');
  const [profileGoogleMapQuery, setProfileGoogleMapQuery] = useState(currentVendor.googleMapQuery || '');
  const [profileGoogleMapEmbedUrl, setProfileGoogleMapEmbedUrl] = useState(currentVendor.googleMapEmbedUrl || '');
  const [profileLogo, setProfileLogo] = useState(currentVendor.logo);
  const [profileBanner, setProfileBanner] = useState(currentVendor.banner);
  const [profileAbout, setProfileAbout] = useState(currentVendor.aboutText);
  const [profileThemeColor, setProfileThemeColor] = useState(currentVendor.themeColor || '#720917');
  const [profileSavedMsg, setProfileSavedMsg] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Handle Switch Vendor
  const handleVendorChange = (newId: string) => {
    setCurrentVendorId(newId);
    const target = vendors.find(v => v.id === newId);
    if (target) {
      setProfileName(target.name);
      setProfileTagline(target.tagline);
      setProfileWhatsapp(target.whatsapp);
      setProfilePhone(target.phone);
      setProfileCity(target.city);
      setProfileAddress(target.address);
      setProfileBusinessHours(target.businessHours || 'Monday – Saturday: 10:30 AM – 8:30 PM | Sunday: 11:00 AM – 5:00 PM');
      setProfileGoogleMapQuery(target.googleMapQuery || '');
      setProfileGoogleMapEmbedUrl(target.googleMapEmbedUrl || '');
      setProfileLogo(target.logo);
      setProfileBanner(target.banner);
      setProfileAbout(target.aboutText);
      setProfileThemeColor(target.themeColor || '#720917');
    }
  };

  // Open Edit Product Modal/Form
  const handleStartEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProdTitle(p.title);
    setProdSku(p.sku || '');
    setProdCategory(p.categoryId);
    setProdPrice(p.price);
    setProdOriginalPrice(p.originalPrice || p.price);
    setProdPurity(p.purity);
    setProdGrossWeight(p.grossWeightGrams || 0);
    setProdNetWeight(p.netWeightGrams || 0);
    setProdMakingCharges(p.makingCharges || '');
    setProdSize(p.size || '');
    setProdStoneDetails(p.stoneDetails || '');
    setProdAvailability(p.availability || (p.inStock ? 'In Stock' : 'Out of Stock'));
    setProdDescription(p.description);
    setProdImage(p.images?.join('\n') || '');
    setProdInStock(p.inStock);
    setProdFeatured(p.isFeatured);
    setIsAddingProduct(true);
  };

  // Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle.trim() || !prodPrice) return;

    // Split multiple images if provided (separated by newline or comma)
    const rawImages = prodImage
      .split(/[\n,]+/)
      .map(url => url.trim())
      .filter(url => url.length > 0);

    const imagesList = rawImages.length > 0 
      ? rawImages 
      : ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80'];

    const newProduct: Product = {
      id: editingProductId || `prod_${Date.now()}`,
      vendorId: currentVendor.id,
      categoryId: prodCategory || categories[0]?.id || 'cat_default',
      title: prodTitle.trim(),
      sku: prodSku.trim() || `SKU-${Date.now().toString().slice(-4)}`,
      description: prodDescription.trim(),
      price: Number(prodPrice),
      originalPrice: Number(prodOriginalPrice) || undefined,
      purity: prodPurity,
      grossWeightGrams: Number(prodGrossWeight) || undefined,
      netWeightGrams: Number(prodNetWeight) || undefined,
      makingCharges: prodMakingCharges.trim() || undefined,
      size: prodSize.trim() || undefined,
      stoneDetails: prodStoneDetails.trim() || undefined,
      availability: prodAvailability,
      images: imagesList,
      inStock: prodAvailability !== 'Out of Stock' && prodInStock,
      isFeatured: prodFeatured,
      tags: [prodPurity, 'Jewellery', prodCategory],
      createdAt: new Date().toISOString().split('T')[0],
    };

    storageService.saveProduct(currentVendor.id, newProduct);
    setIsAddingProduct(false);
    setEditingProductId(null);
    resetProductForm();
    triggerRefresh();
  };

  const resetProductForm = () => {
    setProdTitle('');
    setProdSku('');
    setProdPrice(50000);
    setProdOriginalPrice(55000);
    setProdGrossWeight(10);
    setProdNetWeight(9.5);
    setProdMakingCharges('₹750 / gram');
    setProdSize('');
    setProdStoneDetails('');
    setProdAvailability('In Stock');
    setProdDescription('');
    setProdImage('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80');
    setProdInStock(true);
    setProdFeatured(false);
  };

  // Delete Product
  const handleDeleteProduct = (prodId: string) => {
    if (confirm('Are you sure you want to delete this jewellery item from the catalog?')) {
      storageService.deleteProduct(currentVendor.id, prodId);
      triggerRefresh();
    }
  };

  // Add Category
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat: Category = {
      id: `cat_${Date.now()}`,
      vendorId: currentVendor.id,
      name: newCatName.trim(),
      slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: newCatDesc.trim() || undefined,
    };

    storageService.saveCategory(currentVendor.id, newCat);
    setNewCatName('');
    setNewCatDesc('');
    triggerRefresh();
  };

  // Delete Category
  const handleDeleteCategory = (catId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      storageService.deleteCategory(currentVendor.id, catId);
      triggerRefresh();
    }
  };

  // Save Store Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedVendor: Vendor = {
      ...currentVendor,
      name: profileName.trim(),
      tagline: profileTagline.trim(),
      whatsapp: profileWhatsapp.trim(),
      phone: profilePhone.trim(),
      city: profileCity.trim(),
      address: profileAddress.trim(),
      businessHours: profileBusinessHours.trim(),
      googleMapQuery: profileGoogleMapQuery.trim(),
      googleMapEmbedUrl: profileGoogleMapEmbedUrl.trim(),
      logo: profileLogo.trim(),
      banner: profileBanner.trim(),
      aboutText: profileAbout.trim(),
      themeColor: profileThemeColor.trim() || '#720917',
    };

    storageService.saveVendor(updatedVendor);
    setProfileSavedMsg(true);
    setTimeout(() => setProfileSavedMsg(false), 3000);
    triggerRefresh();
  };

  // Copy Storefront Link
  const handleCopyStoreLink = () => {
    const url = `${window.location.origin}/?store=${currentVendor.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Top Multi-Tenant Context Header */}
      <div className="bg-[#4A0E17] text-white py-3 px-4 sm:px-6 lg:px-8 border-b-2 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate({ type: 'landing' })}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#E5C158] transition-colors"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-[#E5C158]" />
              <div>
                <span className="font-bold text-sm sm:text-base font-royal">
                  Jeweller Vendor Portal
                </span>
                <span className="hidden sm:inline-block ml-2 text-[11px] text-[#E5C158] bg-black/30 px-2 py-0.5 rounded">
                  100% Data Isolated
                </span>
              </div>
            </div>
          </div>

          {/* Jeweller Store Switcher (Multi-Tenant selector) */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#E1D3BF] hidden md:inline">Active Store:</span>
            <select
              value={currentVendor.id}
              onChange={(e) => handleVendorChange(e.target.value)}
              className="bg-[#2A0E13] border border-[#D4AF37]/50 rounded-lg text-xs font-semibold px-3 py-1.5 text-[#FAF8F5] focus:outline-none"
            >
              {vendors.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.city})
                </option>
              ))}
            </select>

            <button
              onClick={() => onNavigate({ type: 'store', vendorSlug: currentVendor.slug })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#2A0E13] font-bold text-xs transition-all shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Customer Storefront</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Vendor Dashboard Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Quick Store Info Summary Banner */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8DFC8] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <img 
              src={currentVendor.logo} 
              alt={currentVendor.name} 
              className="w-14 h-14 rounded-xl object-cover border border-[#D4AF37] shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-royal text-[#2A1810]">
                  {currentVendor.name}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-[#EBF9F0] text-[#1B6D3E] border border-[#A7E6BC]">
                  Active
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-[#FAF0D7] text-[#8C6D23] border border-[#E5C158]">
                  {currentVendor.plan} Plan
                </span>
              </div>
              <p className="text-xs text-[#7A6855]">
                WhatsApp: <strong className="text-[#25D366]">+{currentVendor.whatsapp}</strong> &bull; City: {currentVendor.city}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyStoreLink}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D8CEBE] bg-[#FAF8F5] text-xs font-bold text-[#2A1810] hover:bg-[#F0EAE1]"
            >
              <Share2 className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>{copiedLink ? 'Link Copied!' : 'Copy Store Link'}</span>
            </button>

            <button
              onClick={() => {
                resetProductForm();
                setIsAddingProduct(true);
                setActiveTab('products');
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4A0E17] hover:bg-[#681420] text-white text-xs font-bold shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#E5C158]" />
              <span>Add New Jewellery</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E8DFC8] pb-1 overflow-x-auto scrollbar-none mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'products'
                ? 'bg-[#4A0E17] text-white shadow-xs'
                : 'text-[#5C4D44] hover:bg-[#FAF6EE]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Jewellery Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'categories'
                ? 'bg-[#4A0E17] text-white shadow-xs'
                : 'text-[#5C4D44] hover:bg-[#FAF6EE]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'blogs'
                ? 'bg-[#4A0E17] text-white shadow-xs'
                : 'text-[#5C4D44] hover:bg-[#FAF6EE]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#B8860B]" />
            <span>Articles &amp; Blogs ({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'testimonials'
                ? 'bg-[#4A0E17] text-white shadow-xs'
                : 'text-[#5C4D44] hover:bg-[#FAF6EE]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Reviews ({testimonials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'faqs'
                ? 'bg-[#4A0E17] text-white shadow-xs'
                : 'text-[#5C4D44] hover:bg-[#FAF6EE]'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-[#8C232C]" />
            <span>FAQs ({faqs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'inquiries'
                ? 'bg-[#4A0E17] text-white shadow-xs'
                : 'text-[#5C4D44] hover:bg-[#FAF6EE]'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Orders ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'profile'
                ? 'bg-[#4A0E17] text-white shadow-xs'
                : 'text-[#5C4D44] hover:bg-[#FAF6EE]'
            }`}
          >
            <Palette className="w-4 h-4 text-[#E5C158]" />
            <span>Store Profile &amp; Colours</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS LIST */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Modal / Inline Add Product Form */}
            {isAddingProduct && (
              <div className="bg-white rounded-2xl p-6 border-2 border-[#D4AF37] shadow-lg space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
                  <h3 className="text-base font-bold font-royal text-[#2A1810]">
                    {editingProductId ? 'Edit Jewellery Details' : 'Add New Ornament to Catalog'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingProduct(false);
                      setEditingProductId(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#2A1810] mb-1">
                        Jewellery Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 22K Royal Kundan Bridal Choker"
                        value={prodTitle}
                        onChange={(e) => setProdTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2A1810] mb-1">
                        Category
                      </label>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block font-bold text-[#2A1810] mb-1">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        required
                        value={prodPrice}
                        onChange={(e) => setProdPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2A1810] mb-1">
                        MRP / Original Price (₹)
                      </label>
                      <input
                        type="number"
                        value={prodOriginalPrice}
                        onChange={(e) => setProdOriginalPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2A1810] mb-1">
                        Purity *
                      </label>
                      <select
                        value={prodPurity}
                        onChange={(e) => setProdPurity(e.target.value as Product['purity'])}
                        className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs"
                      >
                        <option value="22K (916)">22K (916) Hallmark</option>
                        <option value="18K (750)">18K (750) Hallmark</option>
                        <option value="Polki / Kundan">Polki / Kundan</option>
                        <option value="Diamond Certified">Diamond Certified</option>
                        <option value="24K (999)">24K (999) Pure Gold</option>
                        <option value="925 Silver">925 Pure Silver</option>
                        <option value="14K">14K Gold</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-[#2A1810] mb-1">
                        SKU / Design Code
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. RAJ-01"
                        value={prodSku}
                        onChange={(e) => setProdSku(e.target.value)}
                        className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-[#2A1810] mb-1">
                        Gross Weight (Grams)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={prodGrossWeight}
                        onChange={(e) => setProdGrossWeight(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2A1810] mb-1">
                        Net Gold Weight (Grams)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={prodNetWeight}
                        onChange={(e) => setProdNetWeight(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2A1810] mb-1">
                        Making Charges
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ₹750/gram or 12% on gold"
                        value={prodMakingCharges}
                        onChange={(e) => setProdMakingCharges(e.target.value)}
                        className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  {/* Size, Stone & Availability */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-[#2A1810] mb-1">
                        Size / Length
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2.4, 2.6 or Ring Size 14, 18 inch"
                        value={prodSize}
                        onChange={(e) => setProdSize(e.target.value)}
                        className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2A1810] mb-1">
                        Diamond / Stone Details
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 0.85ct VVS Diamonds, Natural Emerald"
                        value={prodStoneDetails}
                        onChange={(e) => setProdStoneDetails(e.target.value)}
                        className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2A1810] mb-1">
                        Stock Availability Status
                      </label>
                      <select
                        value={prodAvailability}
                        onChange={(e) => setProdAvailability(e.target.value as any)}
                        className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs"
                      >
                        <option value="In Stock">In Stock (Ready Showroom)</option>
                        <option value="Made to Order">Made to Order</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#2A1810] mb-1">
                      Image URLs (Enter one or more links separated by newline or comma)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="https://images.unsplash.com/...\nhttps://..."
                      value={prodImage}
                      onChange={(e) => setProdImage(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs font-mono"
                    />
                    <p className="text-[10px] text-[#7A6855] mt-0.5">
                      You can add multiple image URLs from different angles on new lines.
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-[#2A1810] mb-1">
                      Ornament Description &amp; Specifications
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Handcrafted polki, ruby stones with fine meenakari work..."
                      value={prodDescription}
                      onChange={(e) => setProdDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={prodInStock}
                        onChange={(e) => setProdInStock(e.target.checked)}
                        className="rounded text-[#4A0E17]"
                      />
                      <span className="font-bold text-[#2A1810]">Available In Stock</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={prodFeatured}
                        onChange={(e) => setProdFeatured(e.target.checked)}
                        className="rounded text-[#4A0E17]"
                      />
                      <span className="font-bold text-[#2A1810]">Featured on Storefront Home</span>
                    </label>
                  </div>

                  <div className="pt-3 flex gap-2">
                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-xl bg-[#4A0E17] text-white font-bold text-xs hover:bg-[#681420] transition-colors"
                    >
                      {editingProductId ? 'Save Changes' : 'Save Ornament'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingProduct(false);
                        setEditingProductId(null);
                      }}
                      className="py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-[#E8DFC8] shadow-xs overflow-hidden">
              <div className="p-4 border-b border-[#F0EAE1] flex items-center justify-between">
                <div>
                  <h3 className="font-bold font-royal text-[#2A1810]">
                    Your Jewellery Products
                  </h3>
                  <p className="text-[11px] text-[#7A6855]">
                    This inventory data is completely isolated to your store. Other jewellers cannot view or access it.
                  </p>
                </div>

                {!isAddingProduct && (
                  <button
                    onClick={() => {
                      resetProductForm();
                      setIsAddingProduct(true);
                    }}
                    className="py-2 px-3 rounded-xl bg-[#4A0E17] text-white text-xs font-bold hover:bg-[#681420] transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>New Item</span>
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF6EE] text-[#7A6855] border-b border-[#E8DFC8]">
                    <tr>
                      <th className="p-3.5">Photo &amp; Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Purity &amp; Weight</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Stock Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EAE1]">
                    {products.map((p) => {
                      const catName = categories.find((c) => c.id === p.categoryId)?.name || 'General';

                      return (
                        <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.images[0]}
                                alt={p.title}
                                className="w-12 h-12 rounded-lg object-cover border border-[#E8DFC8] shrink-0"
                              />
                              <div>
                                <div className="font-bold text-[#2A1810] line-clamp-1">{p.title}</div>
                                <div className="text-[11px] text-[#7A6855] font-mono">{p.sku}</div>
                              </div>
                            </div>
                          </td>

                          <td className="p-3.5 text-[#5C4D44]">
                            {catName}
                          </td>

                          <td className="p-3.5">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF0D7] text-[#8C6D23] border border-[#E5C158] mb-1">
                              {p.purity}
                            </span>
                            {p.grossWeightGrams && (
                              <div className="text-[11px] text-[#7A6855]">
                                ~{p.grossWeightGrams}g (Net: {p.netWeightGrams}g)
                              </div>
                            )}
                          </td>

                          <td className="p-3.5 font-bold text-[#4A0E17] font-cinzel text-sm">
                            ₹{p.price.toLocaleString('en-IN')}
                          </td>

                          <td className="p-3.5">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              p.inStock 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                              {p.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>

                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleStartEditProduct(p)}
                                className="p-1.5 rounded text-gray-600 hover:text-[#4A0E17] hover:bg-gray-100"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: WHATSAPP INQUIRIES & ORDERS LOG */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-[#E8DFC8] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold font-royal text-base text-[#2A1810]">
                    WhatsApp Order Inquiries Log
                  </h3>
                  <p className="text-xs text-[#7A6855]">
                    Whenever a customer submits a cart inquiry from your store on WhatsApp, their contact and order records are safely saved here.
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#EBF9F0] text-[#1B6D3E] text-xs font-bold rounded-lg border border-[#A7E6BC]">
                  {inquiries.length} Orders Logged
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#7A6855] space-y-2">
                  <MessageSquare className="w-8 h-8 text-gray-300 mx-auto" />
                  <p>No orders or inquiries logged yet.</p>
                  <p className="text-[11px]">Share your store link with customers to start receiving orders.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      className="p-4 rounded-xl border border-[#E8DFC8] bg-[#FAF8F5] space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8DFC8] pb-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#4A0E17]">{inq.id}</span>
                          <span className="text-[#7A6855]">&bull; {inq.createdAt}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EBF9F0] text-[#1B6D3E]">
                          {inq.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-[#7A6855] block text-[11px]">Customer:</span>
                          <div className="font-bold text-[#2A1810] text-sm">{inq.customerName}</div>
                          <div className="text-[#7A6855]">📞 {inq.customerPhone}</div>
                          <div className="text-[#7A6855]">📍 {inq.customerCity} {inq.customerAddress && `(${inq.customerAddress})`}</div>
                        </div>

                        <div>
                          <span className="text-[#7A6855] block text-[11px]">Selected Ornaments ({inq.items.length}):</span>
                          <ul className="space-y-1 mt-1">
                            {inq.items.map((it, idx) => (
                              <li key={idx} className="font-medium text-[#2A1810]">
                                • {it.productTitle} (Qty: {it.quantity}) - ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                              </li>
                            ))}
                          </ul>
                          {inq.notes && (
                            <div className="mt-1 text-[11px] text-[#8C232C] italic">
                              Notes: &quot;{inq.notes}&quot;
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col justify-between items-end text-right">
                          <div>
                            <span className="text-[#7A6855] block text-[11px]">Estimated Amount:</span>
                            <span className="text-xl font-bold font-cinzel text-[#1B6D3E]">
                              ₹{inq.totalAmount.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <a
                            href={`https://wa.me/91${inq.customerPhone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(inq.customerName)},%20thank%20you%20for%20your%20inquiry%20at%20${encodeURIComponent(currentVendor.name)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-bold text-xs hover:bg-[#20b858] transition-colors flex items-center gap-1.5"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span>Reply to Customer</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Add Category Form */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DFC8] shadow-xs space-y-4 h-fit">
              <h3 className="font-bold font-royal text-base text-[#2A1810]">
                Add New Category
              </h3>

              <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Antique Kadas / Bridal Sets"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="22K handcrafted royal bangles and kadas"
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#4A0E17] text-white font-bold text-xs hover:bg-[#681420] transition-colors"
                >
                  Save Category
                </button>
              </form>
            </div>

            {/* Existing Categories */}
            <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-[#E8DFC8] shadow-xs space-y-3">
              <h3 className="font-bold font-royal text-base text-[#2A1810]">
                Existing Categories ({categories.length})
              </h3>

              <div className="divide-y divide-[#F0EAE1]">
                {categories.map((cat) => {
                  const count = products.filter((p) => p.categoryId === cat.id).length;
                  return (
                    <div key={cat.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-sm text-[#2A1810]">{cat.name}</span>
                        {cat.description && (
                          <p className="text-[11px] text-[#7A6855]">{cat.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] bg-[#FAF6EE] text-[#7A5812] px-2 py-0.5 rounded font-medium">
                          {count} Items
                        </span>
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="text-gray-400 hover:text-red-600 p-1"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB: BLOGS & JOURNAL ARTICLES */}
        {activeTab === 'blogs' && (
          <VendorBlogsTab
            vendor={currentVendor}
            onRefresh={triggerRefresh}
            onViewStore={() => onNavigate({ type: 'store', vendorSlug: currentVendor.slug })}
          />
        )}

        {/* TAB: CUSTOMER TESTIMONIALS & REVIEWS */}
        {activeTab === 'testimonials' && (
          <VendorTestimonialsTab
            vendor={currentVendor}
            onRefresh={triggerRefresh}
            onViewStore={() => onNavigate({ type: 'store', vendorSlug: currentVendor.slug })}
          />
        )}

        {/* TAB: FAQS MANAGEMENT */}
        {activeTab === 'faqs' && (
          <VendorFAQsTab
            vendor={currentVendor}
            onRefresh={triggerRefresh}
            onViewStore={() => onNavigate({ type: 'store', vendorSlug: currentVendor.slug })}
          />
        )}

        {/* TAB 4: STORE PROFILE & WHATSAPP SETTINGS */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl p-6 border border-[#E8DFC8] shadow-xs max-w-3xl mx-auto space-y-6">
            <div className="border-b border-[#F0EAE1] pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-bold font-royal text-lg text-[#2A1810]">
                  Store Profile &amp; WhatsApp Settings
                </h3>
                <p className="text-xs text-[#7A6855]">
                  Configure your store brand identity, contact numbers, and WhatsApp order routing.
                </p>
              </div>
              {profileSavedMsg && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 animate-in fade-in">
                  ✓ Profile settings saved!
                </span>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              
              {/* Showroom Theme Colours & Palette (Crucial Customization) */}
              <div className="bg-[#FAF6EE] p-4 sm:p-5 rounded-2xl border border-[#E5C158] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#8C6D23] font-bold text-xs uppercase tracking-wider">
                    <Palette className="w-4 h-4 text-[#8C232C]" />
                    <span>Showroom Theme Colours &amp; Palette *</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#2A1810] bg-white px-2 py-0.5 rounded border border-[#D8CEBE]">
                    {profileThemeColor}
                  </span>
                </div>
                
                <p className="text-[11px] text-[#5C4D44]">
                  Choose your showroom&apos;s royal accent colour. This changes the headers, checkout buttons, product badges, and highlight borders across your customer storefront.
                </p>

                {/* Preset Palettes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                  {[
                    { name: 'Royal Crimson & Maroon', hex: '#720917' },
                    { name: 'Regal Emerald Green', hex: '#1B4D3E' },
                    { name: 'Imperial Sapphire Blue', hex: '#0E2A47' },
                    { name: 'Antique Heritage Gold', hex: '#8C6D23' },
                    { name: 'Royal Velvet Plum', hex: '#4A0E2E' },
                    { name: 'Classic Luxury Charcoal', hex: '#1F1F1F' },
                  ].map((col) => (
                    <button
                      key={col.hex}
                      type="button"
                      onClick={() => setProfileThemeColor(col.hex)}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                        profileThemeColor.toLowerCase() === col.hex.toLowerCase()
                          ? 'border-[#2A1810] ring-2 ring-[#D4AF37] bg-white shadow-xs font-bold'
                          : 'border-[#E8DFC8] bg-white/60 hover:bg-white text-[#5C4D44]'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full shrink-0 border border-black/20 shadow-xs"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="text-[11px] truncate">{col.name}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Color Picker & Live Swatch */}
                <div className="flex flex-wrap items-center gap-3 pt-2 bg-white/80 p-3 rounded-xl border border-[#E8DFC8]">
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] font-bold text-[#2A1810] shrink-0">
                      Custom Shade:
                    </label>
                    <input
                      type="color"
                      value={profileThemeColor}
                      onChange={(e) => setProfileThemeColor(e.target.value)}
                      className="w-8 h-8 p-0 rounded-lg cursor-pointer border border-gray-300"
                    />
                    <input
                      type="text"
                      value={profileThemeColor}
                      onChange={(e) => setProfileThemeColor(e.target.value)}
                      placeholder="#720917"
                      className="w-24 px-2 py-1 rounded-lg border border-[#D8CEBE] font-mono text-xs font-bold"
                    />
                  </div>

                  {/* Live Mini Preview Bar */}
                  <div
                    className="flex-1 min-w-[160px] py-1.5 px-3 rounded-lg text-white font-bold text-center text-[11px] truncate shadow-xs border border-white/20"
                    style={{ backgroundColor: profileThemeColor }}
                  >
                    {profileName || 'Showroom Name'} &bull; Live Color Preview
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    Jewellery Shop Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={profileTagline}
                    onChange={(e) => setProfileTagline(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                  />
                </div>
              </div>

              {/* Crucial WhatsApp Setting */}
              <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#E5C158] space-y-2">
                <div className="flex items-center gap-2 text-[#8C6D23] font-bold text-xs uppercase tracking-wider">
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                  <span>WhatsApp Order Number (Key Configuration) *</span>
                </div>
                <p className="text-[11px] text-[#5C4D44]">
                  Whenever a customer taps &quot;Send Order on WhatsApp&quot;, their cart items and details will automatically open on this WhatsApp number.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block font-bold text-[#2A1810] mb-1">
                      WhatsApp Number (With country code 91 or 10 digits)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="917087033009"
                      value={profileWhatsapp}
                      onChange={(e) => setProfileWhatsapp(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg font-mono font-bold text-[#1B6D3E]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2A1810] mb-1">
                      Calling Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="7087033009"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between bg-white/70 p-2.5 rounded-lg border border-[#E5C158]/50">
                  <span className="text-[11px] text-[#5C4D44]">
                    Verify that your WhatsApp link is routing properly:
                  </span>
                  <a
                    href={`https://wa.me/${profileWhatsapp.replace(/\D/g, '')}?text=Hello!%20Testing%20WhatsApp%20order%20link%20for%20${encodeURIComponent(profileName)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Test WhatsApp Link</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={profileCity}
                    onChange={(e) => setProfileCity(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    Showroom Physical Address
                  </label>
                  <input
                    type="text"
                    value={profileAddress}
                    onChange={(e) => setProfileAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                  />
                </div>
              </div>

              {/* Business Hours & Google Map */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    Business Hours
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mon-Sat: 10:30 AM - 8:30 PM | Sun: 11:00 AM - 5:00 PM"
                    value={profileBusinessHours}
                    onChange={(e) => setProfileBusinessHours(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    Google Maps Search Query / Landmark
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Johari Bazar, Jaipur, Rajasthan"
                    value={profileGoogleMapQuery}
                    onChange={(e) => setProfileGoogleMapQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2A1810] mb-1">
                  Google Maps Embed Iframe URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  value={profileGoogleMapEmbedUrl}
                  onChange={(e) => setProfileGoogleMapEmbedUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    Logo Image URL
                  </label>
                  <input
                    type="url"
                    value={profileLogo}
                    onChange={(e) => setProfileLogo(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    Banner Image URL
                  </label>
                  <input
                    type="url"
                    value={profileBanner}
                    onChange={(e) => setProfileBanner(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2A1810] mb-1">
                  About Store / Heritage Story
                </label>
                <textarea
                  rows={2}
                  value={profileAbout}
                  onChange={(e) => setProfileAbout(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-[#4A0E17] hover:bg-[#681420] text-white font-bold text-xs transition-colors shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#E5C158]" />
                  <span>Save Store Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
