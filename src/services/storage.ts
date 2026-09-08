import { Vendor, Category, Product, OrderInquiry, CartItem, BlogPost, Testimonial, FAQItem } from '../types';
import { SEED_VENDORS, SEED_CATEGORIES, SEED_PRODUCTS, SEED_ORDERS, SEED_BLOGS, SEED_TESTIMONIALS, SEED_FAQS } from '../data/seedData';

const STORAGE_KEYS = {
  VENDORS: 'jwellers_vendors_v1',
  CATEGORIES: 'jwellers_categories_v1',
  PRODUCTS: 'jwellers_products_v1',
  ORDERS: 'jwellers_orders_v1',
  BLOGS: 'jwellers_blogs_v1',
  TESTIMONIALS: 'jwellers_testimonials_v1',
  FAQS: 'jwellers_faqs_v1',
  MASTER_ADMIN: 'jwellers_master_admin_session_v1',
};

export const DEFAULT_JEWELLERY_CATEGORIES: Omit<Category, 'id' | 'vendorId'>[] = [
  {
    name: 'Bridal Chokers & Necklaces',
    slug: 'bridal-chokers-necklaces',
    description: 'Heavy Kundan, Polki, and antique gold bridal necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Jhumkas & Earrings',
    slug: 'jhumkas-earrings',
    description: 'Traditional chaandbalis, jhumkas, and studded ear ornaments',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Antique Bangles & Kadas',
    slug: 'antique-bangles-kadas',
    description: '22K gold kadas, pachheli, and meenakari bangles',
    image: 'https://images.unsplash.com/photo-1611591475155-4286fa7c2e60?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Rings & Solitaires',
    slug: 'rings-solitaires',
    description: 'Hallmark certified gold rings and solitaire bands',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Mangalsutras & Chains',
    slug: 'mangalsutras-chains',
    description: 'Daily wear 916 gold chains and modern designer tanmaniya',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Maang Tikka & Bridal Sets',
    slug: 'maang-tikka-bridal-sets',
    description: 'Bridal mathapatti, tikkas, and hathphool sets',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Gold Coins & Bullion',
    slug: 'gold-coins-bullion',
    description: '24K 999 pure gold coins and silver bars with purity certificate',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&auto=format&fit=crop&q=80',
  },
];

class MultiTenantStorageService {
  private initStorage() {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEYS.VENDORS)) {
      localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(SEED_VENDORS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(SEED_CATEGORIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(SEED_PRODUCTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(SEED_ORDERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BLOGS)) {
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(SEED_BLOGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(SEED_TESTIMONIALS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FAQS)) {
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(SEED_FAQS));
    }
  }

  constructor() {
    this.initStorage();
  }

  // ---- VENDORS (Admin & Storefronts) ----
  getVendors(): Vendor[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VENDORS);
      return data ? JSON.parse(data) : SEED_VENDORS;
    } catch {
      return SEED_VENDORS;
    }
  }

  getVendorBySlug(slug: string): Vendor | undefined {
    return this.getVendors().find((v) => v.slug.toLowerCase() === slug.toLowerCase() && v.isActive);
  }

  getVendorById(id: string): Vendor | undefined {
    return this.getVendors().find((v) => v.id === id);
  }

  saveVendor(vendor: Vendor): void {
    const vendors = this.getVendors();
    const index = vendors.findIndex((v) => v.id === vendor.id);
    if (index >= 0) {
      vendors[index] = vendor;
    } else {
      vendors.unshift(vendor);
    }
    localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(vendors));
    // Ensure the vendor has initial default categories
    this.seedDefaultCategories(vendor.id);
  }

  toggleVendorStatus(vendorId: string): Vendor | undefined {
    const vendors = this.getVendors();
    const vendor = vendors.find((v) => v.id === vendorId);
    if (vendor) {
      vendor.isActive = !vendor.isActive;
      localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(vendors));
    }
    return vendor;
  }

  deleteVendor(vendorId: string): void {
    const vendors = this.getVendors().filter((v) => v.id !== vendorId);
    localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(vendors));
  }

  // ---- CATEGORIES (Vendor Isolated) ----
  seedDefaultCategories(vendorId: string): Category[] {
    if (!vendorId) return [];
    try {
      const all = this.getAllCategories();
      const existing = all.filter((c) => c.vendorId === vendorId);
      if (existing.length > 0) return existing;

      const safeVendorPrefix = vendorId.replace(/[^a-zA-Z0-9]/g, '_');
      const newCats: Category[] = DEFAULT_JEWELLERY_CATEGORIES.map((def, idx) => ({
        id: `cat_${safeVendorPrefix}_${idx + 1}`,
        vendorId,
        name: def.name,
        slug: def.slug,
        description: def.description,
        image: def.image,
        order: idx + 1,
      }));

      all.push(...newCats);
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(all));
      return newCats;
    } catch {
      return [];
    }
  }

  getCategories(vendorId: string): Category[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      const allCategories: Category[] = data ? JSON.parse(data) : SEED_CATEGORIES;
      const vendorCategories = allCategories.filter((c) => c.vendorId === vendorId);
      
      // If vendor has no categories, auto-seed standard jewellery categories!
      if (vendorCategories.length === 0 && vendorId) {
        return this.seedDefaultCategories(vendorId);
      }

      // If categories from existing local storage are missing feature image, backfill from seed or defaults
      return vendorCategories.map((c) => {
        if (!c.image) {
          const match = SEED_CATEGORIES.find((sc) => sc.id === c.id || sc.slug === c.slug)
            || DEFAULT_JEWELLERY_CATEGORIES.find((dc) => dc.slug === c.slug);
          if (match && match.image) {
            return { ...c, image: match.image };
          }
        }
        return c;
      });
    } catch {
      const fallback = SEED_CATEGORIES.filter((c) => c.vendorId === vendorId);
      return fallback.length > 0 ? fallback : this.seedDefaultCategories(vendorId);
    }
  }

  saveCategory(vendorId: string, category: Category): void {
    const all = this.getAllCategories();
    const categoryWithVendor = { ...category, vendorId };
    const index = all.findIndex((c) => c.id === category.id && c.vendorId === vendorId);
    if (index >= 0) {
      all[index] = categoryWithVendor;
    } else {
      all.push(categoryWithVendor);
    }
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(all));
  }

  deleteCategory(vendorId: string, categoryId: string): void {
    const all = this.getAllCategories().filter((c) => !(c.id === categoryId && c.vendorId === vendorId));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(all));
  }

  private getAllCategories(): Category[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return data ? JSON.parse(data) : SEED_CATEGORIES;
    } catch {
      return SEED_CATEGORIES;
    }
  }

  // ---- PRODUCTS (Vendor Isolated) ----
  getProducts(vendorId: string): Product[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      const all: Product[] = data ? JSON.parse(data) : SEED_PRODUCTS;
      return all.filter((p) => p.vendorId === vendorId);
    } catch {
      return SEED_PRODUCTS.filter((p) => p.vendorId === vendorId);
    }
  }

  saveProduct(vendorId: string, product: Product): void {
    const all = this.getAllProducts();
    const productWithVendor = { ...product, vendorId };
    const index = all.findIndex((p) => p.id === product.id && p.vendorId === vendorId);
    if (index >= 0) {
      all[index] = productWithVendor;
    } else {
      all.unshift(productWithVendor);
    }
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(all));
  }

  deleteProduct(vendorId: string, productId: string): void {
    const all = this.getAllProducts().filter((p) => !(p.id === productId && p.vendorId === vendorId));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(all));
  }

  private getAllProducts(): Product[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : SEED_PRODUCTS;
    } catch {
      return SEED_PRODUCTS;
    }
  }

  // ---- ORDERS & WHATSAPP INQUIRIES (Vendor Isolated) ----
  getOrders(vendorId: string): OrderInquiry[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      const all: OrderInquiry[] = data ? JSON.parse(data) : SEED_ORDERS;
      return all.filter((o) => o.vendorId === vendorId);
    } catch {
      return SEED_ORDERS.filter((o) => o.vendorId === vendorId);
    }
  }

  getAllOrders(): OrderInquiry[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : SEED_ORDERS;
    } catch {
      return SEED_ORDERS;
    }
  }

  // Create WhatsApp Order Inquiry Link and record it
  generateWhatsAppOrder({
    vendor,
    customer,
    cartItems,
  }: {
    vendor: Vendor;
    customer: {
      name: string;
      phone: string;
      city: string;
      address?: string;
      notes?: string;
    };
    cartItems: CartItem[];
  }): { whatsappUrl: string; orderInquiry: OrderInquiry } {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    // Clean Phone Number: remove spaces, symbols
    let rawPhone = vendor.whatsapp || vendor.phone || '7087033009';
    let cleanPhone = rawPhone.replace(/\D/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }

    // Build the clean, Indian Jewellery formatted WhatsApp message
    let message = `👑 *ORDER / INQUIRY - ${vendor.name.toUpperCase()}*\n`;
    message += `_via Jwellersname.com Digital Showroom_\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `• Name: *${customer.name.trim()}*\n`;
    message += `• Phone: *${customer.phone.trim()}*\n`;
    message += `• City: *${customer.city.trim()}*\n`;
    if (customer.address) {
      message += `• Address: ${customer.address.trim()}\n`;
    }
    if (customer.notes) {
      message += `• Note / Request: _${customer.notes.trim()}_\n`;
    }

    message += `\n✨ *Selected Jewellery Items (${cartItems.length}):*\n`;
    message += `------------------------------------\n`;

    cartItems.forEach((item, idx) => {
      const p = item.product;
      message += `${idx + 1}. *${p.title}*\n`;
      if (p.sku) {
        message += `   • SKU / Code: ${p.sku}\n`;
      }
      message += `   • Quantity: ${item.quantity}\n`;
      message += `   • Purity: ${p.purity}\n`;
      if (p.grossWeightGrams) {
        message += `   • Weight: ~${p.grossWeightGrams}g ${p.netWeightGrams ? `(Net: ${p.netWeightGrams}g)` : ''}\n`;
      }
      if (item.selectedSize || p.size) {
        message += `   • Size: ${item.selectedSize || p.size}\n`;
      }
      if (p.stoneDetails) {
        message += `   • Stone/Diamonds: ${p.stoneDetails}\n`;
      }
      if (p.makingCharges) {
        message += `   • Making: ${p.makingCharges}\n`;
      }
      message += `   • Price: ₹${p.price.toLocaleString('en-IN')} x ${item.quantity} = *₹${(p.price * item.quantity).toLocaleString('en-IN')}*\n\n`;
    });

    message += `------------------------------------\n`;
    message += `💎 *Estimated Total: ₹${totalAmount.toLocaleString('en-IN')}*\n`;
    message += `------------------------------------\n`;
    message += `🙏 _Please confirm current gold rate, making charges, and delivery/pickup details. Thank you!_`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

    const newOrder: OrderInquiry = {
      id: `inq_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      vendorId: vendor.id,
      vendorName: vendor.name,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerCity: customer.city,
      customerAddress: customer.address,
      notes: customer.notes,
      items: cartItems.map((ci) => ({
        productId: ci.product.id,
        productTitle: ci.product.title,
        purity: ci.product.purity,
        price: ci.product.price,
        quantity: ci.quantity,
        image: ci.product.images[0] || '',
        weight: ci.product.grossWeightGrams,
        size: ci.selectedSize || ci.product.size,
        stoneDetails: ci.product.stoneDetails,
      })),
      totalAmount,
      createdAt: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      status: 'Inquiry Sent',
      whatsappLinkUsed: whatsappUrl,
    };

    // Save order in storage
    const allOrders = this.getAllOrders();
    allOrders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(allOrders));

    return { whatsappUrl, orderInquiry: newOrder };
  }

  // ---- BLOGS & ARTICLES (Vendor Isolated) ----
  getBlogs(vendorId: string): BlogPost[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BLOGS);
      const all: BlogPost[] = data ? JSON.parse(data) : SEED_BLOGS;
      return all.filter((b) => b.vendorId === vendorId);
    } catch {
      return SEED_BLOGS.filter((b) => b.vendorId === vendorId);
    }
  }

  getAllBlogs(): BlogPost[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BLOGS);
      return data ? JSON.parse(data) : SEED_BLOGS;
    } catch {
      return SEED_BLOGS;
    }
  }

  saveBlog(vendorId: string, blog: BlogPost): void {
    const all = this.getAllBlogs();
    const blogWithVendor = { ...blog, vendorId };
    const index = all.findIndex((b) => b.id === blog.id && b.vendorId === vendorId);
    if (index >= 0) {
      all[index] = blogWithVendor;
    } else {
      all.unshift(blogWithVendor);
    }
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(all));
  }

  deleteBlog(vendorId: string, blogId: string): void {
    const all = this.getAllBlogs().filter((b) => !(b.id === blogId && b.vendorId === vendorId));
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(all));
  }

  // ---- TESTIMONIALS (Vendor Isolated) ----
  getTestimonials(vendorId: string): Testimonial[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      const all: Testimonial[] = data ? JSON.parse(data) : SEED_TESTIMONIALS;
      return all.filter((t) => t.vendorId === vendorId);
    } catch {
      return SEED_TESTIMONIALS.filter((t) => t.vendorId === vendorId);
    }
  }

  getAllTestimonials(): Testimonial[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return data ? JSON.parse(data) : SEED_TESTIMONIALS;
    } catch {
      return SEED_TESTIMONIALS;
    }
  }

  saveTestimonial(vendorId: string, testimonial: Testimonial): void {
    const all = this.getAllTestimonials();
    const testWithVendor = { ...testimonial, vendorId };
    const index = all.findIndex((t) => t.id === testimonial.id && t.vendorId === vendorId);
    if (index >= 0) {
      all[index] = testWithVendor;
    } else {
      all.unshift(testWithVendor);
    }
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(all));
  }

  deleteTestimonial(vendorId: string, testimonialId: string): void {
    const all = this.getAllTestimonials().filter((t) => !(t.id === testimonialId && t.vendorId === vendorId));
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(all));
  }

  // ---- FAQS (Vendor Isolated) ----
  getFAQs(vendorId: string): FAQItem[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAQS);
      const all: FAQItem[] = data ? JSON.parse(data) : SEED_FAQS;
      return all.filter((f) => f.vendorId === vendorId);
    } catch {
      return SEED_FAQS.filter((f) => f.vendorId === vendorId);
    }
  }

  getAllFAQs(): FAQItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAQS);
      return data ? JSON.parse(data) : SEED_FAQS;
    } catch {
      return SEED_FAQS;
    }
  }

  saveFAQ(vendorId: string, faq: FAQItem): void {
    const all = this.getAllFAQs();
    const faqWithVendor = { ...faq, vendorId };
    const index = all.findIndex((f) => f.id === faq.id && f.vendorId === vendorId);
    if (index >= 0) {
      all[index] = faqWithVendor;
    } else {
      all.push(faqWithVendor);
    }
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(all));
  }

  deleteFAQ(vendorId: string, faqId: string): void {
    const all = this.getAllFAQs().filter((f) => !(f.id === faqId && f.vendorId === vendorId));
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(all));
  }

  // ---- MASTER ADMIN AUTHENTICATION (Rahul / Platform Owner) ----
  isMasterAdmin(): boolean {
    if (typeof window === 'undefined') return false;
    return (
      localStorage.getItem(STORAGE_KEYS.MASTER_ADMIN) === 'true' ||
      sessionStorage.getItem(STORAGE_KEYS.MASTER_ADMIN) === 'true'
    );
  }

  setMasterAdmin(val: boolean): void {
    if (typeof window === 'undefined') return;
    if (val) {
      localStorage.setItem(STORAGE_KEYS.MASTER_ADMIN, 'true');
      sessionStorage.setItem(STORAGE_KEYS.MASTER_ADMIN, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.MASTER_ADMIN);
      sessionStorage.removeItem(STORAGE_KEYS.MASTER_ADMIN);
    }
  }

  // Reset sample data if needed
  resetToDefault(): void {
    localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(SEED_VENDORS));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(SEED_CATEGORIES));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(SEED_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(SEED_ORDERS));
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(SEED_BLOGS));
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(SEED_TESTIMONIALS));
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(SEED_FAQS));
  }
}

export const storageService = new MultiTenantStorageService();
