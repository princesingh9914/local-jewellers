import { Vendor, Category, Product, OrderInquiry, BlogPost, Testimonial, FAQItem } from '../types';

export const SEED_VENDORS: Vendor[] = [
  {
    id: 'vendor_rajwada',
    name: 'Rajwada Palace Jewellers',
    slug: 'rajwada-jewellers',
    ownerName: 'Manoj Soni',
    phone: '7087033009', // Owner Rahul's phone for testing directly
    whatsapp: '917087033009',
    email: 'rajwada@jwellersname.com',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'Johari Bazaar, Pink City, Jaipur, Rajasthan 302003',
    logo: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Authentic 22K Royal Rajasthani Kundan & Bridal Heritage',
    themeColor: '#720917', // Royal Deep Burgundy / Maroon
    isActive: true,
    isVerified: true,
    plan: 'Gold VIP',
    createdAt: '2025-01-15',
    aboutText: 'Crafting royal bridal jewelry for 3 generations in the historic Johari Bazaar of Jaipur. All pieces are 100% BIS Hallmarked 22K/18K Gold, verified with HUID, and set with authentic syndicate Kundan Polki.',
    aboutImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&auto=format&fit=crop&q=80',
    businessHours: 'Monday – Saturday: 10:30 AM – 8:30 PM | Sunday: 11:30 AM – 5:00 PM',
    googleMapEmbedUrl: 'https://maps.google.com/maps?q=Johari+Bazaar+Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed',
    googleMapQuery: 'Johari Bazaar, Pink City, Jaipur, Rajasthan 302003',
    gstNumber: '08AAACR1234F1Z8',
    hallmarkCertified: true,
    upiId: 'rajwada@upi',
    instagram: 'https://instagram.com/rajwadajewellers.jaipur',
    facebook: 'https://facebook.com/rajwadajewellers',
    youtube: 'https://youtube.com/@rajwadajewellers',
    pinterest: 'https://pinterest.com/rajwadajewellers'
  },
  {
    id: 'vendor_surya',
    name: 'Shree Surya Gold & Diamond',
    slug: 'surya-gold',
    ownerName: 'Rahul Verma',
    phone: '7087033009',
    whatsapp: '917087033009',
    email: 'surya@jwellersname.com',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    address: 'Thatheri Bazaar, Godowlia, Varanasi, UP 221001',
    logo: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1611591475878-a400c6bbbece?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Pure 916 Hallmarked Temple Jewellery & Modern Gold Kadas',
    themeColor: '#B8860B', // Pure Indian Gold
    isActive: true,
    isVerified: true,
    plan: 'Silver',
    createdAt: '2025-02-01',
    aboutText: 'Trusted family jewellers since 1984. Specialist in handcrafted sacred Temple necklaces, Lakshmi chokers, certified diamond rings, and authentic antique finish.',
    aboutImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&auto=format&fit=crop&q=80',
    businessHours: 'Monday – Saturday: 10:00 AM – 9:00 PM | Sunday: 11:00 AM – 4:00 PM',
    googleMapEmbedUrl: 'https://maps.google.com/maps?q=Godowlia+Varanasi&t=&z=15&ie=UTF8&iwloc=&output=embed',
    googleMapQuery: 'Thatheri Bazaar, Godowlia, Varanasi, UP 221001',
    gstNumber: '09AABCS5432G1Z3',
    hallmarkCertified: true,
    upiId: 'surya@okhdfcbank',
    instagram: 'https://instagram.com/suryagoldvaranasi',
    facebook: 'https://facebook.com/suryagold',
    youtube: 'https://youtube.com/@suryagold'
  },
  {
    id: 'vendor_meenakshi',
    name: 'Meenakshi Solitaires & Polki',
    slug: 'meenakshi-jewels',
    ownerName: 'Vikram Zaveri',
    phone: '7087033009',
    whatsapp: '917087033009',
    email: 'contact@meenakshi.com',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Zaveri Bazaar, Marine Lines, Mumbai, MH 400002',
    logo: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Contemporary Diamond Cocktail Rings & Uncut Jadau Sets',
    themeColor: '#1B4D3E', // Royal Emerald Green
    isActive: true,
    isVerified: true,
    plan: 'Gold VIP',
    createdAt: '2025-02-18',
    aboutText: 'Exquisite cocktail diamond jewelry, certified solitaires, and delicate rose gold sets designed for modern Indian celebrations and weddings.',
    aboutImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&auto=format&fit=crop&q=80',
    businessHours: 'Monday – Saturday: 11:00 AM – 8:00 PM | Sunday: Closed',
    googleMapEmbedUrl: 'https://maps.google.com/maps?q=Zaveri+Bazaar+Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed',
    googleMapQuery: 'Zaveri Bazaar, Marine Lines, Mumbai, MH 400002',
    gstNumber: '27AABCV8976M1Z5',
    hallmarkCertified: true,
    upiId: 'meenakshi@icici'
  }
];

export const SEED_CATEGORIES: Category[] = [
  // Rajwada categories
  { 
    id: 'cat_r1', 
    vendorId: 'vendor_rajwada', 
    name: 'Bridal Chokers', 
    slug: 'bridal-chokers', 
    description: 'Royal heavy Kundan and Polki bridal necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80'
  },
  { 
    id: 'cat_r2', 
    vendorId: 'vendor_rajwada', 
    name: 'Jhumkas & Chaandbalis', 
    slug: 'jhumkas-chaandbalis', 
    description: 'Traditional Rajasthani earrings and ear chains',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&auto=format&fit=crop&q=80'
  },
  { 
    id: 'cat_r3', 
    vendorId: 'vendor_rajwada', 
    name: 'Antique Kadas & Bangles', 
    slug: 'antique-kadas', 
    description: 'Solid 22K gold kadas with meenakari work',
    image: 'https://images.unsplash.com/photo-1611591475155-4286fa7c2e60?w=600&auto=format&fit=crop&q=80'
  },
  { 
    id: 'cat_r4', 
    vendorId: 'vendor_rajwada', 
    name: 'Maang Tikka & Mathapatti', 
    slug: 'maang-tikka', 
    description: 'Bridal head jewelry with gemstones',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&auto=format&fit=crop&q=80'
  },

  // Surya categories
  { 
    id: 'cat_s1', 
    vendorId: 'vendor_surya', 
    name: 'Temple Necklaces', 
    slug: 'temple-necklaces', 
    description: 'Sacred Lakshmi & peacock motifs in 22K antique finish',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&auto=format&fit=crop&q=80'
  },
  { 
    id: 'cat_s2', 
    vendorId: 'vendor_surya', 
    name: 'Gold Chains & Mangalsutras', 
    slug: 'chains-mangalsutras', 
    description: 'Daily wear 916 hallmark chains and designer tanmaniya',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&auto=format&fit=crop&q=80'
  },
  { 
    id: 'cat_s3', 
    vendorId: 'vendor_surya', 
    name: 'Gold Rings & Bands', 
    slug: 'gold-rings', 
    description: 'Lightweight & couple bands with hallmark guarantee',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80'
  },

  // Meenakshi categories
  { 
    id: 'cat_m1', 
    vendorId: 'vendor_meenakshi', 
    name: 'Diamond Solitaires', 
    slug: 'diamond-solitaires', 
    description: 'IGI & GIA certified conflict-free solitaires',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&auto=format&fit=crop&q=80'
  },
  { 
    id: 'cat_m2', 
    vendorId: 'vendor_meenakshi', 
    name: 'Emerald & Jadau Sets', 
    slug: 'emerald-jadau', 
    description: 'Zambian emeralds with uncut raw diamonds',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80'
  },
  { 
    id: 'cat_m3', 
    vendorId: 'vendor_meenakshi', 
    name: 'Rose Gold Daily Wear', 
    slug: 'rose-gold-wear', 
    description: 'Modern office wear jewellery in 18K rose gold',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80'
  }
];

export const SEED_PRODUCTS: Product[] = [
  // Vendor: Rajwada Jewellers
  {
    id: 'prod_r1',
    vendorId: 'vendor_rajwada',
    categoryId: 'cat_r1',
    title: 'Padmavati Royal Kundan & Meenakari Bridal Choker',
    sku: 'RAJ-CH-01',
    description: 'Bespoke bridal choker handcrafted with uncut syndicate polki stones, Russian emerald drops, and intricate peacock meenakari on the reverse side. Comes with matching jhumkas.',
    price: 245000,
    originalPrice: 265000,
    purity: '22K (916)',
    grossWeightGrams: 58.4,
    netWeightGrams: 42.1,
    size: 'Adjustable Dori (16" - 20")',
    stoneDetails: 'Syndicate Polki, Russian Emerald Beads, Basra Pearls',
    makingCharges: '12% on Net Gold',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611591475878-a400c6bbbece?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    availability: 'In Stock',
    isFeatured: true,
    tags: ['Bridal', 'Kundan', 'Choker', 'Royal', 'Wedding'],
    createdAt: '2025-01-20'
  },
  {
    id: 'prod_r2',
    vendorId: 'vendor_rajwada',
    categoryId: 'cat_r2',
    title: 'Heritage Peacock Jadau Chaandbalis with Pearls',
    sku: 'RAJ-ER-02',
    description: 'Signature Rajasthani chaandbalis featuring basra pearl tassels, natural ruby accents, and fine 22kt yellow gold filigree.',
    price: 68500,
    originalPrice: 75000,
    purity: '22K (916)',
    grossWeightGrams: 16.8,
    netWeightGrams: 14.2,
    size: 'Length: 2.8 inches',
    stoneDetails: 'Natural Burmese Rubies & Basra Seed Pearls',
    makingCharges: '₹850 / gram',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    availability: 'In Stock',
    isFeatured: true,
    tags: ['Earrings', 'Chaandbali', 'Pearls', 'Festival'],
    createdAt: '2025-01-22'
  },
  {
    id: 'prod_r3',
    vendorId: 'vendor_rajwada',
    categoryId: 'cat_r3',
    title: 'Shahi Pachheli Antique Screw Kadas (Pair)',
    sku: 'RAJ-KD-03',
    description: 'Set of two heavy pachheli gold bangles with hand-embossed floral carvings and lion-head clasp lock with ruby eyes.',
    price: 310000,
    originalPrice: 325000,
    purity: '22K (916)',
    grossWeightGrams: 52.0,
    netWeightGrams: 52.0,
    size: 'Bangle Size: 2.6 (Screw Openable)',
    stoneDetails: 'Cabochon Ruby eyes (0.35 ct)',
    makingCharges: '10% flat',
    images: [
      'https://images.unsplash.com/photo-1611591475878-a400c6bbbece?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    availability: 'In Stock',
    isFeatured: false,
    tags: ['Bangles', 'Kada', '22K Gold', 'Antique'],
    createdAt: '2025-01-25'
  },
  {
    id: 'prod_r4',
    vendorId: 'vendor_rajwada',
    categoryId: 'cat_r4',
    title: 'Noorani Polki Mathapatti with Emerald Drops',
    sku: 'RAJ-MP-04',
    description: 'Three-tiered traditional Rajasthani mathapatti featuring gold foil-backed polki stones and soothing Zambian emerald tassels.',
    price: 115000,
    originalPrice: 125000,
    purity: 'Polki / Kundan',
    grossWeightGrams: 28.5,
    netWeightGrams: 19.8,
    size: 'Adjustable Chain Hooks',
    stoneDetails: 'Uncut Jadau Polki & Zambian Emerald Tassels',
    makingCharges: 'Fixed Craftsmanship',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    availability: 'In Stock',
    isFeatured: false,
    tags: ['Mathapatti', 'Bridal', 'Headpiece'],
    createdAt: '2025-02-01'
  },

  // Vendor: Surya Gold
  {
    id: 'prod_s1',
    vendorId: 'vendor_surya',
    categoryId: 'cat_s1',
    title: 'Divine Mahalakshmi Temple Kasu Harame Set',
    sku: 'SRY-TP-01',
    description: 'Sacred antique Lakshmi coins interspersed with carved temple deities and ruby-studded pendant. Hallmarked 916 with Certificate of Authenticity.',
    price: 185000,
    originalPrice: 198000,
    purity: '22K (916)',
    grossWeightGrams: 36.2,
    netWeightGrams: 34.8,
    size: 'Standard Harame 22 Inches',
    stoneDetails: 'Synthetic Rubies & Emerald Cabochons',
    makingCharges: '₹750 / gram',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    availability: 'In Stock',
    isFeatured: true,
    tags: ['Temple Jewellery', 'Lakshmi', 'Traditional', 'South Gold'],
    createdAt: '2025-02-03'
  },
  {
    id: 'prod_s2',
    vendorId: 'vendor_surya',
    categoryId: 'cat_s2',
    title: 'Aastha 22K Designer Mangalsutra with Black Beads',
    sku: 'SRY-MG-02',
    description: 'Traditional double line black crystal beads chain with lightweight floral gold pendant. Perfect balance of auspicious tradition and daily comfort.',
    price: 54000,
    originalPrice: 59000,
    purity: '22K (916)',
    grossWeightGrams: 11.2,
    netWeightGrams: 9.8,
    size: 'Length: 18 Inches',
    stoneDetails: 'Auspicious Black Crystal Beads',
    makingCharges: '8% Special Festive rate',
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    availability: 'In Stock',
    isFeatured: true,
    tags: ['Mangalsutra', 'Daily Wear', 'Gold Chain'],
    createdAt: '2025-02-05'
  },
  {
    id: 'prod_s3',
    vendorId: 'vendor_surya',
    categoryId: 'cat_s3',
    title: 'Siddhivinayak 22K Hallmarked Men Ring',
    sku: 'SRY-RG-03',
    description: 'Substantial solid gold signet ring with engraved Ganesha motif and textured matte-gloss finish.',
    price: 42000,
    originalPrice: 45000,
    purity: '22K (916)',
    grossWeightGrams: 7.8,
    netWeightGrams: 7.8,
    size: 'Ring Size: 18 (Standard Men)',
    stoneDetails: 'Pure Gold (No Stones)',
    makingCharges: 'Included',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    availability: 'In Stock',
    isFeatured: false,
    tags: ['Men Ring', 'Ganesha', 'Gold Ring'],
    createdAt: '2025-02-10'
  },

  // Vendor: Meenakshi Jewels
  {
    id: 'prod_m1',
    vendorId: 'vendor_meenakshi',
    categoryId: 'cat_m1',
    title: 'Celestial 1.5 Carat VVS Solitaire Diamond Ring',
    sku: 'MNK-DR-01',
    description: 'GIA certified natural round brilliant solitaire diamond set in 18K white gold with halo micropavé band.',
    price: 385000,
    originalPrice: 420000,
    purity: 'Diamond Certified',
    grossWeightGrams: 4.8,
    netWeightGrams: 4.5,
    size: 'Ring Size: 13 (Free Resizing)',
    stoneDetails: '1.50 ct Center Diamond (VVS1 Clarity, E Color) + 0.35 ct Halo',
    makingCharges: 'Included with GIA Dossier',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    availability: 'In Stock',
    isFeatured: true,
    tags: ['Diamond', 'Solitaire', 'Ring', 'Engagement'],
    createdAt: '2025-02-12'
  },
  {
    id: 'prod_m2',
    vendorId: 'vendor_meenakshi',
    categoryId: 'cat_m2',
    title: 'Royal Columbian Emerald & Polki Cocktail Choker',
    sku: 'MNK-EM-02',
    description: 'Vibrant octagonal Columbian emerald center stone surrounded by sparkling uncut polki diamonds and south sea pearl drops.',
    price: 495000,
    originalPrice: 530000,
    purity: '18K (750)',
    grossWeightGrams: 64.0,
    netWeightGrams: 45.0,
    size: 'Adjustable Velvet Cord (14" - 18")',
    stoneDetails: '4.20 ct Natural Colombian Emerald, 8.5 ct Polki, South Sea Pearls',
    makingCharges: 'Custom Atelier Craft',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    availability: 'In Stock',
    isFeatured: true,
    tags: ['Emerald', 'Polki', 'Luxury', 'High Jewellery'],
    createdAt: '2025-02-14'
  }
];

export const SEED_ORDERS: OrderInquiry[] = [
  {
    id: 'inq_101',
    vendorId: 'vendor_rajwada',
    vendorName: 'Rajwada Palace Jewellers',
    customerName: 'Anjali Singhal',
    customerPhone: '9811223344',
    customerCity: 'New Delhi',
    customerAddress: 'Greater Kailash 1, New Delhi',
    notes: 'Bride sister looking for matching necklace for wedding on 24th',
    items: [
      {
        productId: 'prod_r1',
        productTitle: 'Padmavati Royal Kundan & Meenakari Bridal Choker',
        purity: '22K (916)',
        price: 245000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
        weight: 58.4
      }
    ],
    totalAmount: 245000,
    createdAt: '2025-03-01 14:32',
    status: 'Deal Closed',
    whatsappLinkUsed: 'https://wa.me/917087033009'
  }
];

export const SEED_BLOGS: BlogPost[] = [
  {
    id: 'blog_1',
    vendorId: 'vendor_rajwada',
    title: 'The Essential Guide to 916 BIS Hallmark & 6-Digit HUID Code',
    slug: 'guide-to-916-bis-hallmark-huid',
    description: 'Learn how the government mandated BIS 6-digit alphanumeric HUID protects Indian gold buyers from purity tampering.',
    category: 'Gold Purity & Education',
    author: 'Manoj Soni (Master Jeweller)',
    publishedDate: '2025-02-28',
    readTimeMinutes: 4,
    isPublished: true,
    featuredImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&auto=format&fit=crop&q=80',
    content: `When purchasing gold jewellery in India, trust and purity are paramount. The Bureau of Indian Standards (BIS) introduced the mandatory 6-digit alphanumeric Hallmarking Unique Identification (HUID) to provide complete traceability for consumers.

### What is 916 Gold?
22 Karat gold contains 91.6% pure gold alloyed with 8.4% metals such as copper and silver to give structural strength for intricate craftsmanship. On jewellery, this is stamped as '22K916'.

### The 3 Mandatory BIS Hallmarking Symbols:
1. **BIS Triangular Logo**: The official hallmark of authentication.
2. **Purity in Karat and Fineness**: E.g., 22K916, 18K750, or 14K585.
3. **6-Digit Alphanumeric HUID**: A laser-engraved unique identifier registered on the national portal.

### How Can You Verify Your Ornaments?
Download the official **BIS CARE App** on your smartphone. Enter the 6-digit code stamped on your jewellery piece. The app immediately reveals the jeweller registration details, assaying and hallmarking center (AHC), and date of hallmarking. At our showroom, all jewellery carries verifiable HUID stamps.`
  },
  {
    id: 'blog_2',
    vendorId: 'vendor_rajwada',
    title: 'Royal Rajasthani Kundan vs. Jadau Polki: What Every Bride Should Know',
    slug: 'kundan-vs-jadau-polki-guide',
    description: 'Discover the heritage technique of setting uncut syndicate diamonds and foil-backed gemstones in 24K pure gold bezels.',
    category: 'Bridal Heritage',
    author: 'Heritage Design Atelier',
    publishedDate: '2025-02-15',
    readTimeMinutes: 5,
    isPublished: true,
    featuredImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&auto=format&fit=crop&q=80',
    content: `For centuries, royal Rajput and Mughal dynasties patronized the intricate art of Kundan and Jadau. While often used interchangeably, there are distinct artistic differences between the two.

### What is Polki?
Polki consists of natural, uncut and un-faceted diamonds. Mined directly from the earth, each Polki retains its raw organic shape and character. In our atelier, each Polki is enveloped in a pure 24K gold foil (Kundan) bed that bounces light through the crystal with warm candle-lit brilliance.

### What is Jadau?
Jadau is not a stone, but the traditional Rajasthani technique of embedding stones into malleable pure 24K gold bezels without claws or prongs.

### Meenakari: The Royal Secret on the Reverse Side
Authentic Rajasthani bridal ornaments are always decorated on the reverse with vibrant glass enamel (Meenakari). This protects the wearer's skin from sharp gold edges while acting as an intimate mark of artisanal luxury.

When styling your bridal ensemble, pair a deep neckline blouse with a multi-layered choker, chaandbalis, and a mathapatti for balanced royal symmetry.`
  },
  {
    id: 'blog_3',
    vendorId: 'vendor_rajwada',
    title: 'How to Clean and Safely Preserve Heirloom Ornaments at Home',
    slug: 'cleaning-preserving-gold-jewellery-care',
    description: 'Expert care secrets to keep your gold lustrous, prevent enamel chipping, and protect pearls and emeralds from moisture damage.',
    category: 'Jewellery Care',
    author: 'Master Craftsman Team',
    publishedDate: '2025-01-20',
    readTimeMinutes: 3,
    isPublished: true,
    featuredImage: 'https://images.unsplash.com/photo-1611591475878-a400c6bbbece?w=900&auto=format&fit=crop&q=80',
    content: `Heirloom jewellery is meant to be passed down across generations. Simple mindful practices ensure your ornaments retain their divine glow for decades.

### Golden Rules of Preservation:
- **Last On, First Off**: Always put on perfumes, hairsprays, and cosmetics before wearing your jewellery. Chemical aerosols cause surface tarnishing and dull polki luster.
- **Never Soak Kundan or Enamel in Water**: Moisture seeping beneath 24K gold foils will oxidize and discolor the reflective bed. Only wipe gently with a soft micro-fiber lens cloth.
- **Store in Velvet or Muslin**: Wrap each set separately in natural cotton muslin or velvet pouches to prevent metal friction and scratches.
- **Avoid Plastic Bags**: Prolonged storage in airtight synthetic ziplocks can trap humidity.`
  },
  {
    id: 'blog_4',
    vendorId: 'vendor_surya',
    title: 'Significance of Temple Jewellery in South Indian & Vedic Rituals',
    slug: 'significance-temple-jewellery',
    description: 'Explore the divine symbolism of Goddess Lakshmi, peacocks, and temple architecture carved into 22K antique gold.',
    category: 'Temple Tradition',
    author: 'Rahul Verma',
    publishedDate: '2025-02-10',
    readTimeMinutes: 4,
    isPublished: true,
    featuredImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&auto=format&fit=crop&q=80',
    content: `Originating in the Chola and Pandya dynasties of ancient India, Temple Jewellery was initially crafted to adorn temple deities before being worn by classical Bharatanatyam dancers and royal families.

Today, 22K antique Temple chokers and Lakshmi Kasu malas form an essential pillar of wedding trousseaus and auspicious festivities like Akshaya Tritiya and Dhanteras.`
  }
];

export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test_1',
    vendorId: 'vendor_rajwada',
    customerName: 'Pooja Kashyap',
    customerCity: 'Jaipur',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
    review: 'Purchased my complete bridal choker and mathapatti set from Rajwada Palace. The BIS HUID certificate gave my family absolute peace of mind, and the meenakari work on the back is breathtaking!',
    rating: 5,
    purchaseItem: 'Royal Kundan Bridal Set',
    date: 'February 2025',
    isVerifiedBuyer: true
  },
  {
    id: 'test_2',
    vendorId: 'vendor_rajwada',
    customerName: 'Vikram & Shweta Rathore',
    customerCity: 'New Delhi',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    review: 'Ordering through WhatsApp was so easy and transparent! We received exact gross & net weights, hallmark codes, and photos from different angles before finalizing. Truly five-star service.',
    rating: 5,
    purchaseItem: '22K Antique Polki Kadas',
    date: 'January 2025',
    isVerifiedBuyer: true
  },
  {
    id: 'test_3',
    vendorId: 'vendor_rajwada',
    customerName: 'Meera Deshmukh',
    customerCity: 'Mumbai',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    review: 'The chaandbalis arrived safely packaged in royal velvet cases. The craftsmanship is pure heirloom quality. Highly recommend their bespoke design service!',
    rating: 5,
    purchaseItem: 'Jharokha Chaandbalis',
    date: 'March 2025',
    isVerifiedBuyer: true
  },
  {
    id: 'test_4',
    vendorId: 'vendor_surya',
    customerName: 'Sunita Agrawal',
    customerCity: 'Varanasi',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    review: 'Shree Surya Jewellers has been our trusted family jeweller for 20+ years. The temple necklace we ordered was made to perfection with 916 hallmark stamping.',
    rating: 5,
    purchaseItem: '22K Lakshmi Temple Choker',
    date: 'February 2025',
    isVerifiedBuyer: true
  },
  {
    id: 'test_5',
    vendorId: 'vendor_meenakshi',
    customerName: 'Tanvi Shah',
    customerCity: 'Mumbai',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80',
    review: 'Got our engagement solitaire ring with IGI diamond certificate. Transparent pricing on making charges and gold rates.',
    rating: 5,
    purchaseItem: '1.20ct Solitaire Ring',
    date: 'January 2025',
    isVerifiedBuyer: true
  }
];

export const SEED_FAQS: FAQItem[] = [
  {
    id: 'faq_1',
    vendorId: 'vendor_rajwada',
    question: 'How do I know the gold purity and authenticity of your jewellery?',
    answer: 'Every piece in our catalog is 100% BIS Hallmarked (22K916 or 18K750) and engraved with a unique 6-digit alphanumeric HUID (Hallmark Unique Identification). You can instantly verify it on the government BIS Care Mobile App.',
    category: 'Purity & Certification'
  },
  {
    id: 'faq_2',
    vendorId: 'vendor_rajwada',
    question: 'How does placing an order work through WhatsApp?',
    answer: 'Browse our catalog, select your desired ornaments, and tap "Send Inquiry on WhatsApp". Your complete cart breakdown (weights, purity, SKU, and total estimate) opens directly in WhatsApp chat with our master showroom team. We verify live gold rates and coordinate delivery or showroom pickup with you directly.',
    category: 'Ordering Process'
  },
  {
    id: 'faq_3',
    vendorId: 'vendor_rajwada',
    question: 'Do you accept old gold exchange or scrap gold?',
    answer: 'Yes, we provide 100% fair value for old gold exchange. We use computerized karat meters in our showroom to accurately measure purity in front of you with zero deduction on pure metal content.',
    category: 'Exchange & Upgrades'
  },
  {
    id: 'faq_4',
    vendorId: 'vendor_rajwada',
    question: 'Can bangles, rings, and necklace lengths be custom fitted?',
    answer: 'Absolutely. We offer custom sizing for rings (sizes 8 to 26), bangles (2.2, 2.4, 2.6, 2.8), and necklace cords. Simply mention your requested size in the notes or during your WhatsApp conversation.',
    category: 'Customization & Sizing'
  },
  {
    id: 'faq_5',
    vendorId: 'vendor_rajwada',
    question: 'Is shipping insured across India?',
    answer: 'Yes. For outstation customers, all consignments are dispatched via tamper-proof, fully insured logistics partners (BVC Logistics / Sequel Logistics) with real-time tracking until safely received.',
    category: 'Shipping & Delivery'
  }
];

