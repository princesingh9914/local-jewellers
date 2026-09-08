export interface Vendor {
  id: string;
  name: string;
  slug: string;
  ownerName: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  state: string;
  address: string;
  logo: string;
  banner: string;
  tagline: string;
  themeColor: string; // e.g. '#800020' (Burgundy) or '#B8860B' (Gold) or '#1B4D3E' (Emerald)
  isActive: boolean;
  isVerified: boolean;
  plan: 'Free' | 'Silver' | 'Gold VIP';
  createdAt: string;
  aboutText: string;
  aboutImage?: string;
  businessHours?: string;
  googleMapEmbedUrl?: string;
  googleMapQuery?: string;
  gstNumber?: string;
  hallmarkCertified: boolean;
  upiId?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  pinterest?: string;
}

export interface Category {
  id: string;
  vendorId: string;
  name: string;
  slug: string;
  iconName?: string;
  description?: string;
}

export interface Product {
  id: string;
  vendorId: string;
  categoryId: string;
  title: string;
  sku?: string;
  description: string;
  price: number;
  originalPrice?: number;
  purity: '24K (999)' | '22K (916)' | '18K (750)' | '14K' | '925 Silver' | 'Polki / Kundan' | 'Diamond Certified';
  grossWeightGrams?: number;
  netWeightGrams?: number;
  size?: string;
  stoneDetails?: string;
  makingCharges?: string;
  images: string[];
  inStock: boolean;
  availability?: 'In Stock' | 'Made to Order' | 'Out of Stock';
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight?: number;
  selectedSize?: string;
}

export interface BlogPost {
  id: string;
  vendorId: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage: string;
  category?: string;
  author?: string;
  publishedDate: string;
  readTimeMinutes?: number;
  isPublished: boolean;
}

export interface Testimonial {
  id: string;
  vendorId: string;
  customerName: string;
  customerCity?: string;
  photo?: string;
  review: string;
  rating: number; // 1 to 5
  purchaseItem?: string;
  date?: string;
  isVerifiedBuyer?: boolean;
}

export interface FAQItem {
  id: string;
  vendorId: string;
  question: string;
  answer: string;
  category?: string;
}

export interface OrderInquiry {
  id: string;
  vendorId: string;
  vendorName: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress?: string;
  notes?: string;
  items: {
    productId: string;
    productTitle: string;
    purity: string;
    price: number;
    quantity: number;
    image: string;
    weight?: number;
    size?: string;
    stoneDetails?: string;
  }[];
  totalAmount: number;
  createdAt: string;
  status: 'Inquiry Sent' | 'Followed Up' | 'Deal Closed' | 'Cancelled';
  whatsappLinkUsed: string;
}

export type PolicyType = 'privacy' | 'terms' | 'shipping' | 'refund' | 'contact';

export type AppView = 
  | { type: 'landing' }
  | { type: 'admin' }
  | { type: 'vendor'; vendorId: string; tab?: 'products' | 'categories' | 'profile' | 'inquiries' | 'settings' | 'blogs' | 'testimonials' | 'faqs' }
  | { type: 'store'; vendorSlug: string }
  | { type: 'policy'; policyType: PolicyType; vendorSlug?: string };
