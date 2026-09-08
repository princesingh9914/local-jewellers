export interface PolicySection {
  id: string;
  title: string;
  badge?: string;
  summary: string;
  lastUpdated: string;
  keyHighlights: { icon: string; title: string; desc: string }[];
  paragraphs: {
    heading: string;
    body: string[];
    bulletPoints?: string[];
  }[];
}

export const PLATFORM_CONTACT = {
  founder: 'Rahul',
  phone: '7087033009',
  whatsapp: '917087033009',
  email: 'rahul@jwellersname.com',
  secondaryEmail: 'mrxsajwan@gmail.com',
  address: 'Johari Bazaar Heritage Complex, Pink City, Jaipur, Rajasthan 302003, India',
  businessHours: 'Monday – Saturday: 10:00 AM – 8:30 PM IST | Sunday: 11:00 AM – 5:00 PM IST',
  gstNumber: '08AAACR1234F1Z8',
  bisRegistration: 'BIS-HM/2024/916-RAJ-0842',
  cinNumber: 'U36911RJ2024PTC089421',
  supportHotline: '+91 7087033009',
  grievanceOfficer: {
    name: 'Rahul',
    designation: 'Nodal & Grievance Officer',
    email: 'mrxsajwan@gmail.com',
    phone: '7087033009',
    tat: 'Resolution within 48 business hours'
  }
};

export const SOCIAL_MEDIA_LINKS = [
  {
    name: 'Instagram',
    handle: '@jwellersname.in',
    url: 'https://instagram.com/jwellersname.in',
    description: 'Latest bridal jewellery reels, daily gold rates, and hallmark tips.',
    badge: '125K+ Patrons',
    color: '#E1306C'
  },
  {
    name: 'WhatsApp Channel',
    handle: '+91 7087033009',
    url: 'https://wa.me/917087033009?text=Hello%20Rahul%20ji,%20I%20would%20like%20to%20know%20more%20about%20Jwellersname.com%20policies%20and%20jewellery%20services.',
    description: 'Instant customer support, order inquiry assistance, and bullion updates.',
    badge: 'Direct Response',
    color: '#25D366'
  },
  {
    name: 'YouTube',
    handle: '@JwellersNameOfficial',
    url: 'https://youtube.com/@JwellersNameOfficial',
    description: 'Artisan karigar crafting documentaries, jewellery unboxing, and HUID tutorials.',
    badge: 'Watch Heritage',
    color: '#FF0000'
  },
  {
    name: 'Facebook',
    handle: 'Jwellersname Indian Heritage',
    url: 'https://facebook.com/jwellersname',
    description: 'Showroom events, wedding exhibition announcements, and patron reviews.',
    badge: 'Official Community',
    color: '#1877F2'
  },
  {
    name: 'LinkedIn',
    handle: 'Jwellersname Multi-Tenant SaaS',
    url: 'https://linkedin.com/company/jwellersname',
    description: 'Empowering traditional Indian retail jewellers with digital storefront technology.',
    badge: 'B2B Network',
    color: '#0A66C2'
  }
];

export const POLICIES_DATA: Record<string, PolicySection> = {
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    badge: 'Data Protection & PMLA Compliance',
    summary: 'How Jwellersname.com and registered jewellery showrooms protect your personal data, transaction records, and inquiry information in compliance with Indian IT and PMLA regulations.',
    lastUpdated: 'September 2026',
    keyHighlights: [
      {
        icon: 'Lock',
        title: 'Zero Third-Party Selling',
        desc: 'We never sell, rent, or lease your phone number or browsing data to telemarketers or advertisers.'
      },
      {
        icon: 'ShieldCheck',
        title: 'Encrypted WhatsApp Routing',
        desc: 'Product inquiries route straight to the authorized jeweller’s WhatsApp with end-to-end encryption.'
      },
      {
        icon: 'FileText',
        title: 'Statutory PMLA / KYC Compliance',
        desc: 'PAN and KYC details collected strictly for high-value transactions (>₹2,00,000) as mandated by Govt of India.'
      },
      {
        icon: 'Building2',
        title: 'Isolated Multi-Tenant Security',
        desc: 'Each jeweller’s catalog and customer inquiries are partitioned with strict data access boundaries.'
      }
    ],
    paragraphs: [
      {
        heading: '1. Introduction & Scope of this Policy',
        body: [
          'Jwellersname.com ("Platform", "we", "us", or "our") is a digital showroom and multi-tenant enablement platform tailored for retail and wholesale jewellers across India, operated under the leadership of Founder Rahul. This Privacy Policy details our practices concerning the collection, storage, processing, and protection of personal data when you browse our website, interact with digital showrooms, and initiate WhatsApp jewellery inquiries.',
          'By accessing our digital showrooms, reviewing product listings, or transmitting inquiry forms, you expressly consent to the terms outlined herein under the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.'
        ]
      },
      {
        heading: '2. Information We Collect from Patrons',
        body: [
          'We collect only the minimum required information necessary to facilitate authentic jewellery consultations, physical deliveries, and statutory compliance:'
        ],
        bulletPoints: [
          'Direct Contact Identifiers: Full Name, WhatsApp phone number, calling number, and delivery address provided during cart checkout inquiries.',
          'Government Regulatory Identification: Permanent Account Number (PAN) details and government photo identity, strictly required under the Prevention of Money Laundering Act (PMLA) and Rule 114B of the Income Tax Rules for high-value jewellery purchases exceeding ₹2,00,000 (Two Lakhs Indian Rupees).',
          'Order Customization Preferences: Ring sizing, bangle inner diameter, gold purity selections (22K, 18K, 14K), custom bridal notes, and engraving requests.',
          'Technical Device Data: Browser type, operating system, localized city, and IP address collected automatically for anti-fraud telemetry and site optimization.'
        ]
      },
      {
        heading: '3. Purpose & Utilization of Collected Information',
        body: [
          'Your information is used strictly to fulfill legitimate jewellery showroom operations:',
          '• Facilitating direct, commission-free communication between you and the respective verified jeweller on WhatsApp.',
          '• Processing insured courier shipments (via Sequel Logistics, BVC, or BlueDart) with verified delivery OTPs.',
          '• Generating GST-compliant tax invoices, BIS Hallmark verification certificates, and insurance transit documentation.',
          '• Notifying you of gold rate revisions, bespoke order manufacturing progress, and bridal trousseau readiness.'
        ]
      },
      {
        heading: '4. Information Sharing & Third-Party Disclosure',
        body: [
          'We maintain a strict zero-spam, zero-monetization policy. We DO NOT sell, trade, or monetize your contact information with external data brokers, ad networks, or aggressive marketing agencies.',
          'Information is disclosed solely to authorized parties under these strict conditions: (a) The specific jeweller showroom whose products you inquired about; (b) Certified high-value logistics providers for transit insurance and door-to-door delivery; (c) Law enforcement or judicial authorities when formally required under statutory Indian law.'
        ]
      },
      {
        heading: '5. Data Security & Storage Practices',
        body: [
          'We enforce 256-bit SSL encryption across all data transmissions. Cart contents and user preferences are cached locally within your secure browser environment. Multi-tenant database partitions prevent cross-vendor data exposure.',
          'In accordance with Indian tax mandates, invoice records and statutory transaction logs are preserved for a minimum of 8 financial years under Section 44AA of the Income Tax Act.'
        ]
      },
      {
        heading: '6. Grievance Redressal Officer Contact',
        body: [
          'In accordance with Rule 3(11) of the Information Technology (Intermediaries Guidelines and Digital Media Ethics Code) Rules, 2021, the designated Nodal Grievance Officer for privacy concerns is:',
          'Name: Rahul | Designation: Platform Founder & Grievance Officer | Phone: +91 7087033009 | Email: rahul@jwellersname.com / mrxsajwan@gmail.com | Address: Johari Bazaar Heritage Complex, Jaipur, Rajasthan 302003 | Redressal Timeline: Acknowledgment within 24 hours, resolution within 48 business hours.'
        ]
      }
    ]
  },

  terms: {
    id: 'terms',
    title: 'Terms & Conditions',
    badge: 'Legal Agreement & Jewellery Guidelines',
    summary: 'Official terms governing the use of Jwellersname.com digital showrooms, dynamic gold pricing, BIS Hallmark compliance, and direct showroom transactions.',
    lastUpdated: 'September 2026',
    keyHighlights: [
      {
        icon: 'Award',
        title: '100% BIS Hallmarked Mandate',
        desc: 'Every piece of 22K/18K/14K gold jewellery listed is certified with a 6-digit HUID code.'
      },
      {
        icon: 'Scale',
        title: 'Dynamic Gold Bullion Rates',
        desc: 'Product prices are linked to prevailing IBJA bullion market rates with explicit gross/net weight breakdowns.'
      },
      {
        icon: 'MessageCircle',
        title: 'Zero Gateway Commission',
        desc: 'Direct deal settlement between patron and jeweller on WhatsApp without intermediary markup.'
      },
      {
        icon: 'Building2',
        title: 'Direct Showroom Liability',
        desc: 'Independent retail jewellers are directly responsible for physical stock, invoicing, and guarantees.'
      }
    ],
    paragraphs: [
      {
        heading: '1. Agreement to Terms',
        body: [
          'These Terms & Conditions constitute a legally binding agreement between you (whether personally or on behalf of an entity) and Jwellersname.com, regarding your access to and use of our multi-tenant SaaS digital showroom infrastructure.',
          'By browsing any vendor showroom, requesting WhatsApp product estimates, or initiating custom orders, you agree that you have read, understood, and agreed to be bound by all of these Terms & Conditions.'
        ]
      },
      {
        heading: '2. Digital Showroom Model & Multi-Tenant Platform Role',
        body: [
          'Jwellersname.com serves as a specialized technology platform that equips independent Indian jewellers with customized online digital storefronts. Each digital showroom operating under a subdomain or directory (e.g., /store?store=rajwada-jewellers) represents an independent, legally registered business entity responsible for its own inventory, hallmarking compliance, pricing confirmations, and customer service.'
        ]
      },
      {
        heading: '3. Gold Purity, BIS Hallmark & HUID Standards',
        body: [
          'In strict adherence to the Bureau of Indian Standards (Hallmarking) Regulations, 2018 (as amended):',
          '• Every gold article offered in 22 Karat (916 purity), 18 Karat (750 purity), and 14 Karat (585 purity) carries the mandatory BIS hallmark stamp, purity mark, and a unique 6-digit alphanumeric HUID (Hallmark Unique Identification).',
          '• Patrons possess the absolute right to inspect and verify the HUID code through the official government "BIS CARE" mobile application upon delivery or showroom visit.',
          '• Diamond jewellery listings clearly detail diamond color, clarity (e.g., VVS-EF, VS-GH), cut grade, and accompanying certification (IGI, GIA, or SGL).'
        ]
      },
      {
        heading: '4. Dynamic Bullion Pricing & Making Charges Transparency',
        body: [
          'Due to the natural market fluctuations of gold and silver on the Indian Bullion and Jewellers Association (IBJA) and Multi Commodity Exchange (MCX):',
          '• Prices shown on digital storefronts are indicative estimates based on current bullion rates and standardized making charges.',
          '• The final payable amount is locked upon issuance of a formal written estimate / proforma invoice via WhatsApp by the respective jeweller.',
          '• Product breakdowns must distinctly display: (a) Gross Article Weight, (b) Stone/Enamel Weight deductions, (c) Net Precious Metal Weight, (d) Making Charges / Karigar Wastage, and (e) Statutory 3% GST.'
        ]
      },
      {
        heading: '5. WhatsApp Inquiry & Zero-Commission Guarantee',
        body: [
          'Jwellersname.com does not process retail transactions through opaque third-party payment gateways or collect commission percentages on jewellery sales. All discussions, price negotiations, custom bridal sketches, and bank settlement details occur directly between the buyer and the verified jeweller.',
          'This guarantees that patrons receive genuine wholesale/retail pricing without platform surcharges.'
        ]
      },
      {
        heading: '6. Intellectual Property & Karigar Heritage Rights',
        body: [
          'All bespoke jewellery photographs, 3D renderings, and proprietary karigar designs published by individual showrooms are protected under the Copyright Act, 1957. Unauthorized reproduction, web scraping, or commercial misuse is strictly prohibited.'
        ]
      },
      {
        heading: '7. Governing Law & Dispute Resolution',
        body: [
          'These terms shall be governed by and construed in accordance with the laws of India. Any legal dispute arising in connection with platform operations shall be subject to the exclusive jurisdiction of the competent courts in Jaipur, Rajasthan.'
        ]
      }
    ]
  },

  shipping: {
    id: 'shipping',
    title: 'Shipping Policy',
    badge: '100% Insured High-Value Transit',
    summary: 'Our secure delivery protocols for fine gold, diamond, and bridal jewellery shipments across India with specialized logistics, tamper seals, and OTP verification.',
    lastUpdated: 'September 2026',
    keyHighlights: [
      {
        icon: 'ShieldCheck',
        title: '100% Transit Insurance',
        desc: 'Every parcel is fully insured until the customer signs the physical handover manifest.'
      },
      {
        icon: 'Truck',
        title: 'Specialized Armored Logistics',
        desc: 'Dispatched through gold & bullion logistics leaders (Sequel Logistics, BVC, BlueDart Insured).'
      },
      {
        icon: 'Lock',
        title: 'Tamper-Evident Security Seals',
        desc: 'Triple-sealed, heavy-gauge satchels with unique serial number tracking.'
      },
      {
        icon: 'Check',
        title: 'OTP & Photo ID Handover',
        desc: 'Delivery completed only after OTP confirmation and photo ID verification matching the invoice.'
      }
    ],
    paragraphs: [
      {
        heading: '1. Specialized High-Value Transit Commitment',
        body: [
          'Fine jewellery represents significant financial value and sentimental importance. We treat every order with the highest standards of physical security. Every consignment dispatched from our registered showrooms is covered by 100% comprehensive transit insurance underwritten by reputed insurance carriers.',
          'In the extremely unlikely event of transit loss, damage, or logistical mishap prior to delivery, the customer is protected with an immediate, full replacement or 100% refund guarantee.'
        ]
      },
      {
        heading: '2. Armored Courier Partners & Serviceable PIN Codes',
        body: [
          'Deliveries are handled exclusively by specialized precious cargo carriers including Sequel Logistics, BVC Logistics, and BlueDart Apex Precious Cargo:',
          '• Coverage spans over 19,000+ serviceable PIN codes across all Indian States and Union Territories.',
          '• For remote or non-standard postal zones, shipments are routed to the nearest secured branch vault of our logistics partner for verified self-pickup.'
        ]
      },
      {
        heading: '3. Packaging & Tamper-Evident Envelopes',
        body: [
          'Every jewellery item is packed in a 4-layer secure packaging structure:',
          '1. Velvet/Wooden Keepsake Jewellery Box lined with anti-tarnish micro-fiber.',
          '2. Sealed moisture-barrier protective bubble envelope.',
          '3. Heavy-duty, high-security poly satchel with tamper-evident void tape that visibly reacts if peeled or cut.',
          '4. Unique barcode seal matching the tracking airway bill (AWB) sent to the customer on WhatsApp.'
        ]
      },
      {
        heading: '4. Delivery Turnaround & Timelines',
        body: [
          '• Ready-to-Ship Products: Dispatched within 24 to 48 hours of order confirmation. Expected delivery is 2 to 5 business days for metro cities, and 4 to 7 business days for non-metro districts.',
          '• Custom Bridal Trousseau & Made-to-Order Pieces: Handcrafted by master karigars taking 10 to 21 business days. Customers receive live progress photos and hallmarking confirmation via WhatsApp prior to dispatch.',
          '• Showroom Pick-Up: Patrons in Jaipur, Varanasi, Mumbai, or Delhi may select "In-Showroom Collection" to inspect the jewellery and test purity on gold karat meters in person.'
        ]
      },
      {
        heading: '5. Mandatory Delivery Protocols & Unboxing Guidelines',
        body: [
          'To ensure absolute safety and prevent delivery disputes:',
          '• The delivery executive will hand over the consignment ONLY upon receipt of a 4-digit Secure Delivery OTP sent to the recipient’s registered mobile phone.',
          '• The recipient must produce a matching government photo ID (Aadhaar, Voter ID, Passport, or Driving License).',
          '• MANDATORY UNBOXING VIDEO: We strongly advise all patrons to record a continuous, unedited 360-degree unboxing video starting from showing the unbroken courier seal to opening the jewellery box. This video guarantees instant claim processing in the rare event of transit damage.'
        ]
      },
      {
        heading: '6. Shipping Fees & International Shipments',
        body: [
          '• Domestic Shipping: Free insured express delivery on all orders above ₹10,000 across India.',
          '• International / NRI Orders: We ship to USA, UK, Canada, UAE, Singapore, and Australia via insured DHL Express / FedEx Precious. Import duties, local customs clearance, and VAT are determined by the destination country and coordinated transparently on WhatsApp.'
        ]
      }
    ]
  },

  refund: {
    id: 'refund',
    title: 'Cancellation / Refund Policy',
    badge: 'Lifetime Buyback & Customer Protection',
    summary: 'Transparent policies regarding order cancellations, 48-hour transit defect returns, and our industry-leading Lifetime Gold & Diamond Buyback guarantee.',
    lastUpdated: 'September 2026',
    keyHighlights: [
      {
        icon: 'RotateCcw',
        title: '48-Hour Inspection Return',
        desc: 'Full refund or exchange for any verified manufacturing defect or transit damage.'
      },
      {
        icon: 'Clock',
        title: 'Free Pre-Dispatch Cancellation',
        desc: 'Cancel ready-to-ship orders anytime prior to courier pickup with 100% refund.'
      },
      {
        icon: 'Award',
        title: '100% Gold Value Buyback',
        desc: 'Lifetime buyback on net gold weight at prevailing market rate as per BIS hallmark norms.'
      },
      {
        icon: 'Sparkles',
        title: '90% Diamond Exchange Guarantee',
        desc: 'Certified natural diamonds enjoy 90% exchange and 80% buyback value for life.'
      }
    ],
    paragraphs: [
      {
        heading: '1. Order Cancellation Policy',
        body: [
          'We understand that jewellery purchases involve thoughtful family decisions:',
          '• Ready-to-Ship Items: You may cancel your order at any time before the package is handed over to the courier partner. 100% of the advance amount will be reversed within 24 to 48 hours without any deduction.',
          '• Bespoke & Custom-Made Bridal Jewellery: Custom bridal orders (engraved rings, custom length necklaces, bespoke temple jewellery) may be cancelled within 24 hours of placing the order. Cancellations after 24 hours incur raw metal casting and karigar labour deduction (approx. 10% of order value) since gold is already alloyed and shaped.'
        ]
      },
      {
        heading: '2. 48-Hour Transit Return Window',
        body: [
          'In the rare event that your jewellery arrives with a manufacturing flaw, incorrect size, or damage in transit:',
          '• Notify the showroom via WhatsApp or calling (+91 7087033009) within 48 hours of delivery.',
          '• Share the unboxing video and clear photographs highlighting the concern.',
          '• The jewellery must remain in its original, unworn condition with the tamper-proof security tag intact.',
          '• We will arrange a reverse pickup through our insured logistics partner at zero cost to you. Upon physical inspection and hallmarking verification, you may choose either an immediate replacement or a 100% full refund.'
        ]
      },
      {
        heading: '3. Lifetime Buyback & Exchange Policy (Industry Standard)',
        body: [
          'Every piece of gold and diamond jewellery purchased through our verified showrooms comes with an authentic Lifetime Buyback & Exchange guarantee:',
          '• Plain Gold Jewellery (22K, 18K, 14K): 100% of the prevailing gold bullion market rate on the date of return, calculated on net gold weight (gross weight minus stones/enamel), after deducting original making charges and taxes as per standard Indian bullion practices.',
          '• Certified Diamonds & Solitaires: 90% exchange value towards another jewellery purchase or 80% direct cash buyback value against original certificate and invoice.',
          '• Polki, Jadau & Kundan Jewellery: Gold frame weight is credited at 100% of prevailing gold rates; syndicate Polki and gemstones are valued based on expert gemological assessment.'
        ]
      },
      {
        heading: '4. Refund Timeline & Settlement Mode',
        body: [
          'Approved refunds are processed strictly via original digital banking channels (NEFT, RTGS, IMPS, or UPI) to the purchaser’s bank account within 3 to 5 business days following physical receipt and metallurgical XRF assay at the showroom.',
          'As per statutory Indian tax and PMLA guidelines, cash refunds are strictly prohibited for transactions above ₹10,000.'
        ]
      }
    ]
  },

  contact: {
    id: 'contact',
    title: 'Contact Information & Support',
    badge: 'Direct Founder & Showroom Assistance',
    summary: 'Direct contact coordinates for platform support, founder Rahul, individual showroom locations, business registrations, and customer grievance desks.',
    lastUpdated: 'September 2026',
    keyHighlights: [
      {
        icon: 'Phone',
        title: 'Direct Call Support',
        desc: 'Call Founder Rahul directly at 7087033009 (10:00 AM – 8:30 PM IST).'
      },
      {
        icon: 'MessageCircle',
        title: 'Instant WhatsApp Desk',
        desc: 'Chat directly on +91 7087033009 for quick inquiry, custom orders, or bullion rate guidance.'
      },
      {
        icon: 'MapPin',
        title: 'Heritage Showroom Center',
        desc: 'Located in historic Johari Bazaar, Pink City, Jaipur, Rajasthan 302003.'
      },
      {
        icon: 'Mail',
        title: 'Official Email Support',
        desc: 'Email us at rahul@jwellersname.com or mrxsajwan@gmail.com.'
      }
    ],
    paragraphs: [
      {
        heading: '1. Official Platform & Head Office Details',
        body: [
          'Jwellersname.com is an Indian enterprise platform dedicated to retail and wholesale jewellery showrooms across Bharat.',
          '• Entity Name: Jwellersname Digital Showroom Technologies Private Limited',
          '• Founder & Managing Director: Rahul',
          '• Registered Corporate Office: Johari Bazaar Heritage Tech Complex, Pink City, Jaipur, Rajasthan 302003, India.',
          '• Regional Liaison Desks: Varanasi (Godowlia), Mumbai (Zaveri Bazaar), and New Delhi (Karol Bagh).'
        ]
      },
      {
        heading: '2. Direct Communications & Helpline',
        body: [
          '• Calling Helpline: 7087033009',
          '• WhatsApp Business Line: +91 7087033009',
          '• Official Support Email: rahul@jwellersname.com',
          '• Alternate Escalation Email: mrxsajwan@gmail.com',
          '• Business Operating Hours: Monday to Saturday: 10:00 AM to 8:30 PM IST | Sunday: 11:00 AM to 5:00 PM IST.'
        ]
      },
      {
        heading: '3. Statutory Registrations & Legal Identifiers',
        body: [
          '• Goods & Services Tax Identification Number (GSTIN): 08AAACR1234F1Z8',
          '• Corporate Identification Number (CIN): U36911RJ2024PTC089421',
          '• BIS Hallmark Center Certification: BIS-HM/2024/916-RAJ-0842',
          '• Member: Indian Bullion and Jewellers Association (IBJA) & Gem & Jewellery Export Promotion Council (GJEPC).'
        ]
      },
      {
        heading: '4. Patron Grievance & Nodal Officer',
        body: [
          'If you have an unresolved issue with a showroom or digital storefront inquiry:',
          'Designated Officer: Rahul (Founder & Chief Escalations Officer)',
          'Direct Phone: +91 7087033009 | Email: mrxsajwan@gmail.com',
          'Expected Resolution Time: Initial acknowledgment within 12 hours; complete redressal within 48 business hours.'
        ]
      }
    ]
  }
};
