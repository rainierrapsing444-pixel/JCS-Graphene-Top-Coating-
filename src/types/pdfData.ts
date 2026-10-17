export interface ProductItem {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  badge: string;
  description: string;
  bulletPoints: string[];
  keyBenefits: { label: string; value: string }[];
  highlight: string;
  color: string;
  accentHex: number;
}

export interface PackageOption {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  recommendedFor: string;
  features: string[];
  badge?: string;
  isPopular?: boolean;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  role: string;
  description: string;
  highlight?: string;
  iconType: 'college' | 'retail' | 'food' | 'medrep' | 'car' | 'barbershop' | 'launch';
}

export const PDF_DATA = {
  header: {
    registeredName: 'JCS-AVIOR CarCare Trading',
    brandName: 'JCS Car Solution',
    tagline: 'GRAPHENE TOP COATING',
    year: '2026',
    establishedYear: '2024',
    presentedBy: 'John Christopher Soler',
    businessType: 'Sole Proprietorship',
    mainBusiness: 'Car Care Products',
    otherBusiness: 'Barbershop with 3 Branches',
  },
  
  executiveSummary: {
    sectionNum: 'I',
    title: 'Executive Summary',
    paragraphs: [
      'JCS-AVIOR CarCare Trading, operating under the brand name JCS Car Solution, is a sole proprietorship focused on providing practical and quality car care products for vehicle owners.',
      'The business was established in 2024 by John Christopher Soler, who has experience in retail, sales, business management, and the car care industry. His previous involvement as a strategic investor in Gorilla Wax, combined with his experience in managing other businesses, provided him with valuable knowledge of the automotive care market.',
      'JCS Car Solution offers products designed to help vehicle owners maintain the cleanliness, appearance, and protection of their vehicles. Its product lineup includes JCS Graphene Coat, Glass and Klin Acid Rain Remover, and All Around Stain Remover.',
      'The proposed business setup requires only a small 1.5 x 1 square meter booth, preferably located near a mall entrance or in a high-traffic area. Access to a parking space is also preferred to allow product demonstrations and direct customer engagement.',
      'Through this proposed setup, JCS Car Solution aims to increase brand awareness, reach more vehicle owners, demonstrate the effectiveness of its products, and establish a stronger presence in the car care market.',
    ],
    keyStats: [
      { label: 'Booth Footprint', value: '1.5m x 1m', subtext: 'Compact high-efficiency setup' },
      { label: 'Year Established', value: '2024', subtext: 'Rapidly expanding brand' },
      { label: 'Founder Stake in Gorilla Wax', value: '40%', subtext: 'Strategic automotive legacy' },
      { label: 'Gloss Restoration', value: '60%–70%', subtext: 'High-gloss hydrophobic finish' },
    ]
  },

  businessProfile: {
    sectionNum: 'II',
    title: 'Business Profile',
    details: [
      { label: 'Registered Business Name', value: 'JCS-AVIOR CarCare Trading' },
      { label: 'Brand / Trade Name', value: 'JCS Car Solution' },
      { label: 'Type of Business', value: 'Sole Proprietorship' },
      { label: 'Main Business', value: 'Car Care Products' },
      { label: 'Other Business', value: 'Barbershop with 3 Branches' },
      { label: 'Business Established', value: '2024' },
    ]
  },

  ownerBackground: {
    sectionNum: 'III',
    title: 'Owner Background',
    name: 'John Christopher Soler',
    age: '29 years old',
    education: 'I.T. Graduate from A.I.E. College (Batch 2015)',
    summary: 'With his experience in business and the car care industry, along with the support and knowledge gained from his involvement with Gorilla Wax, he decided to establish his own car care business in 2024. This led to the creation of JCS Car Solution.',
    timeline: [
      {
        year: '2015',
        title: 'Academic Milestone',
        role: 'I.T. Graduate',
        description: 'Graduated from A.I.E. College (Batch 2015) with an Information Technology degree, building sharp analytical and systems foundations.',
        iconType: 'college',
      },
      {
        year: '2015 – 2019',
        title: 'Mall Retail Industry',
        role: 'Retail Specialist & Operations',
        description: 'Worked across mall retail environments for 4+ years, mastering customer sales, foot traffic dynamics, kiosk setups, and merchandising psychology.',
        iconType: 'retail',
      },
      {
        year: '2019 – 2020',
        title: 'First Entrepreneurial Venture',
        role: 'Lechonan Business Owner',
        description: 'Ventured boldly into business by founding an independent lechonan. Navigated early commercial scaling until affected by COVID-19 pandemic closures.',
        iconType: 'food',
      },
      {
        year: '2021 – 2023',
        title: 'Pharmaceutical / Medical Field',
        role: 'Medical Representative (Medrep)',
        description: 'Achieved high-velocity B2B direct sales and professional client relationship management across clinical and commercial territories.',
        iconType: 'medrep',
      },
      {
        year: '2022',
        title: 'Automotive Industry Entry',
        role: 'Strategic Investor (40% Stockholder in Gorilla Wax)',
        description: 'Became deeply interested in automotive care and acquired a 40% ownership stake as a strategic stockholder in Gorilla Wax, gaining in-depth formulation and market insight.',
        highlight: '40% Ownership Stake in Gorilla Wax',
        iconType: 'car',
      },
      {
        year: '2022 – 2024',
        title: 'Multi-Branch Salon Expansion',
        role: 'Barbershop Founder & Operator',
        description: 'Established own barbershop brand in 2022 and grew it through disciplined management into 3 thriving branches opened across 2022, 2023, and 2024.',
        highlight: 'Expanded to 3 Branches',
        iconType: 'barbershop',
      },
      {
        year: '2024 – 2026',
        title: 'Creation of JCS Car Solution',
        role: 'Founder & Proprietor',
        description: 'Synthesized retail expertise, Gorilla Wax know-how, and multi-unit operational leadership to launch JCS-AVIOR CarCare Trading and JCS Car Solution.',
        highlight: 'Flagship Car Care Brand Established',
        iconType: 'launch',
      },
    ] as TimelineMilestone[]
  },

  businessDescription: {
    sectionNum: 'IV',
    title: 'Business Description',
    statement: 'JCS-AVIOR CarCare Trading, operating under the brand name JCS Car Solution, is a car care business that provides products designed to help vehicle owners maintain the cleanliness, appearance, and protection of their vehicles.',
    pillars: [
      {
        title: 'Easy-to-Use Solutions',
        desc: 'Designed for everyday motorists to achieve professional detailing results without specialized tools.',
      },
      {
        title: 'Practical & Waterless',
        desc: 'Maintains shine and surface protection without consuming large volumes of water or requiring drainage bays.',
      },
      {
        title: 'Affordable Quality',
        desc: 'Direct manufacturer pricing that makes premium graphene and acid rain protection accessible to all motorists.',
      },
      {
        title: 'Convenient Maintenance',
        desc: 'Accessible mall kiosk locations with on-the-spot vehicle parking demonstrations for guaranteed customer confidence.',
      }
    ]
  },

  products: [
    {
      id: 'graphene-coat',
      name: 'JCS Graphene Coat',
      category: 'Top Coating & Waterless Care',
      subtitle: 'Waterless maintenance spray with hydrophobic graphene barrier',
      badge: 'Flagship Product',
      description: "JCS Graphene Coat is a graphene-based, waterless maintenance product with hydrophobic properties that helps repel water and protect the vehicle's surface. It helps protect against acid rain, soil marks, and discoloration caused by UV exposure. It also helps restore approximately 60%–70% of the vehicle's high-gloss appearance and helps remove asphalt and other surface contaminants. The product provides a convenient option for vehicle owners who want to maintain the appearance and protection of their vehicles without requiring a large amount of water.",
      bulletPoints: [
        'Graphene-based nano-barrier technology',
        'Hydrophobic contact angle repels water beads effortlessly',
        'Protects against UV discoloration, acid rain & soil marks',
        'Restores 60% to 70% deep high-gloss mirror finish',
        'Lifts asphalt, road tar, and surface contaminants easily',
        '100% Waterless application saves time and resources'
      ],
      keyBenefits: [
        { label: 'Gloss Boost', value: '60%–70%' },
        { label: 'Water Usage', value: '0 Liters' },
        { label: 'UV Guard', value: 'Anti-Oxidation' },
        { label: 'Action', value: 'Hydrophobic Beading' },
      ],
      highlight: 'Ultra-hydrophobic graphene coating with zero water needed',
      color: 'from-red-600 to-rose-900',
      accentHex: 0xef4444,
    },
    {
      id: 'acid-rain-remover',
      name: 'Glass and Klin Acid Rain Remover',
      category: 'Windshield & Paint Restorer',
      subtitle: 'Specialized chemical formula for heavy etched mineral deposits',
      badge: 'Heavy Duty Formula',
      description: "Glass and Klin Acid Rain Remover is a specially formulated product designed to help remove heavy water marks, acid rain stains, and other residues from windshields and vehicle paint. It is intended to help improve the appearance of glass and painted surfaces affected by stubborn water marks and stains.",
      bulletPoints: [
        'Erases heavy etched water spots and mineral scale',
        'Restores optical clarity to cloudy windshields & windows',
        'Safe on clear coats and vehicle automotive paint',
        'Cuts through stubborn alkaline and acid rain calcification',
        'Eliminates wiper haze and night-time glare distortion'
      ],
      keyBenefits: [
        { label: 'Clarity', value: '100% Optical Glass' },
        { label: 'Application', value: 'Glass & Paint' },
        { label: 'Target', value: 'Heavy Water Marks' },
        { label: 'Finish', value: 'Streak-Free' },
      ],
      highlight: 'Removes stubborn acid rain water spots and restores windshield clarity',
      color: 'from-amber-500 to-red-700',
      accentHex: 0xf59e0b,
    },
    {
      id: 'all-around-remover',
      name: 'All Around Stain Remover',
      category: 'Multi-Surface Cleaner & Headlight Restorer',
      subtitle: 'Heavy-duty paste cleanser for paint transfers, yellowed lights & stubborn dirt',
      badge: 'Multi-Purpose Restorer',
      description: "All around Stain Remover is designed to help remove different types of stains and dirt from vehicle surfaces. It also helps remove paint transfer and can help improve the appearance of headlights, making them look clearer and cleaner.",
      bulletPoints: [
        'Lifts paint transfer from parking scuffs and minor rubs',
        'De-oxidizes yellowed, cloudy polycarbonate headlight lenses',
        'Removes grease, embedded grime, and road residue',
        'Versatile multi-surface detailing compound',
        'Safe on badges, chrome trim, and exterior painted body panels'
      ],
      keyBenefits: [
        { label: 'Headlights', value: 'Clears Yellow Fog' },
        { label: 'Scuffs', value: 'Removes Paint Transfer' },
        { label: 'Surfaces', value: 'Multi-Surface Safe' },
        { label: 'Form', value: 'Concentrated Tub' },
      ],
      highlight: 'Removes paint transfer and clears yellowed headlights',
      color: 'from-blue-600 to-indigo-900',
      accentHex: 0x3b82f6,
    }
  ] as ProductItem[],

  pricingPackages: [
    {
      id: 'solo',
      name: 'Solo Package',
      price: 1499,
      description: 'One product for customers who need a specific car care solution.',
      recommendedFor: 'Drivers targeting a single key concern (e.g. Graphene coating or water mark removal)',
      features: [
        'Choice of 1 Flagship JCS Product',
        'Premium Microfiber Application Towel',
        'Step-by-Step Detailing Guide',
        'Official JCS Shield Authenticity Guarantee',
      ],
      badge: 'Entry Level',
    },
    {
      id: 'duo',
      name: 'Duo Package',
      price: 2499,
      originalPrice: 2998,
      description: 'Two products for customers who want additional maintenance and protection.',
      recommendedFor: 'Motorists wanting comprehensive paint protection plus windshield optical clarity',
      features: [
        'Choice of any 2 JCS Products',
        'Save ₱499 vs buying individual items',
        '2x High-Density Detailing Microfiber Cloths',
        'Application Sponge / Applicator Pad',
        'Priority Customer Care Support',
      ],
      badge: 'Popular Value',
      isPopular: true,
    },
    {
      id: 'trio',
      name: 'Trio Package',
      price: 3499,
      originalPrice: 4497,
      description: 'Three products or a complete car care set for customers looking for a more complete solution.',
      recommendedFor: 'Ultimate complete care: Graphene gloss coat + Acid rain remover + All-around stain remover',
      features: [
        'All 3 Flagship JCS Car Solution Products',
        'Save ₱998 on the complete system',
        'Complete Detailing Toolkit (applicators + 3 cloths)',
        'Headlight Restoration Guide Included',
        'Maximum Protection for Body, Glass & Headlights',
        'VIP Loyalty Demo Pass',
      ],
      badge: 'Best Value Complete Set',
    }
  ] as PackageOption[],

  boothRequirements: {
    sectionNum: 'VI',
    title: 'Proposed Booth and Area Requirement',
    footprint: '1.5 x 1 Square Meters',
    preferredLocation: 'High-traffic area, particularly near a mall entrance or high-visibility thoroughfare',
    parkingAccess: 'Access to a parking space is also preferred to allow product demonstrations and direct customer engagement on actual vehicles.',
    summary: 'A small but strategically located booth will allow JCS Car Solution to maintain manageable operating costs while increasing its visibility and customer reach.',
    boothFunctions: [
      { title: 'Product Display', description: 'Illuminated elevated tiered shelving showcasing JCS Graphene Coat, Acid Rain Remover, and Stain Remover with branded banners.' },
      { title: 'Customer Inquiries', description: 'Welcoming consultation desk where vehicle owners get direct advice on their car’s paint and glass condition.' },
      { title: 'Product Demonstrations', description: 'Real-time hydrophobic water beading and windshield watermark removal tests on demonstration panels.' },
      { title: 'Sales & Order Processing', description: 'Streamlined POS counter for Solo (₱1,499), Duo (₱2,499), and Trio (₱3,499) package checkouts.' },
      { title: 'Brand Promotion', description: 'Bold overhead arch signage, carbon-textured counter livery, and branded uniforms establishing authority.' },
      { title: 'Customer Education', description: 'Guiding motorists on proper waterless maintenance, UV protection, and long-term vehicle resale value preservation.' },
    ],
    features: [
      { name: 'Overhead Curved Marquee', detail: 'Backlit "JCS GRAPHENE" header banner visible from 30+ meters' },
      { name: 'Branded Counter Livery', detail: 'UV Protection, Scratch Resistance, Chemical Resistance, Enhance Shine claims' },
      { name: 'Tiered Acrylic Riser', detail: 'Organized display for spray bottles, applicators, and microfiber kits' },
      { name: 'Dual Display Wings', detail: 'Side graphics explaining hydrophobic contact angles and acid rain removal' },
      { name: 'Compact 1.5m x 1m Footprint', detail: 'Fits standard mall tenant corridors with minimal lease footprint' },
    ]
  },

  pdfPages: [
    {
      page: 1,
      title: 'Cover Page',
      subtitle: 'JCS-AVIOR CarCare Trading (2026)',
      keyInfo: 'Presented by John Christopher Soler | JCS Car Solution | Graphene Top Coating',
      summary: 'Front title cover featuring bold red, black, and carbon fiber aesthetics with the JCS Car Care shield logo and high-gloss automotive backdrop.'
    },
    {
      page: 2,
      title: 'I. Executive Summary',
      subtitle: 'Overview, Vision & Strategy',
      keyInfo: 'Established 2024 | Strategic Investor in Gorilla Wax | 1.5x1m Mall Booth Setup',
      summary: 'Covers brand establishment, founder experience, product lineup, and the mall entrance + parking demo booth deployment strategy.'
    },
    {
      page: 3,
      title: 'II. Business Profile',
      subtitle: 'Entity Specifications',
      keyInfo: 'Registered: JCS-AVIOR CarCare Trading | Sole Proprietorship | Barbershop with 3 Branches',
      summary: 'Details corporate registration, brand name, business type, core focus on car care, and existing multi-branch enterprise.'
    },
    {
      page: 4,
      title: 'III. Owner Background',
      subtitle: 'Founder Journey & Credentials',
      keyInfo: 'John Christopher Soler (29) | A.I.E. College 2015 | 40% Gorilla Wax Stockholder',
      summary: 'Comprehensive career narrative: IT graduate, mall retail specialist (2015-2019), lechonan venture, Medrep (2021-2023), Gorilla Wax investor (2022), barbershop expansion (2022-2024), and JCS Car Solution founding.'
    },
    {
      page: 5,
      title: 'IV. Business Description',
      subtitle: 'Core Mission & Market Positioning',
      keyInfo: 'Practical, easy-to-use, affordable car care solutions for everyday motorists',
      summary: 'Focuses on convenient vehicle cleanliness, appearance restoration, and surface protection that builds long-term customer trust.'
    },
    {
      page: 6,
      title: 'V. Products and Services (Part 1)',
      subtitle: 'Graphene Coat & Acid Rain Remover',
      keyInfo: 'JCS Graphene Coat (Hydrophobic, 60-70% Gloss, Waterless) & Glass and Klin Acid Rain Remover',
      summary: 'Covers the flagship hydrophobic waterless coat and the heavy-duty mineral acid rain glass cleaner.'
    },
    {
      page: 7,
      title: 'V. Products (Part 2) & VI. Pricing',
      subtitle: 'All Around Stain Remover & Packages',
      keyInfo: 'All Around Stain Remover | Solo (₱1,499), Duo (₱2,499), Trio (₱3,499)',
      summary: 'Details the multi-purpose paint transfer & headlight cleanser alongside the tiered 3-tier pricing matrix.'
    },
    {
      page: 8,
      title: 'VI. Proposed Booth and Area Requirement',
      subtitle: 'Mall Kiosk Architecture & Photos',
      keyInfo: '1.5 x 1 Square Meters | Mall Entrance / High-Traffic | Parking Demo Access',
      summary: 'Specifies the 6 kiosk operations and shows real-world photos of the 1.5x1m branded blue & red promotional kiosk booth.'
    }
  ]
};
