import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Mail, Check, AlertCircle, HelpCircle, X } from 'lucide-react';

const colors = {
  primary: '#7e8b7f',
  primaryDark: '#656f66',
  primaryLight: '#bfc5bf',
  accent: '#d5a887',
  pink: '#d9c7c2',
  bgLight: '#f2f3f2',
  bgMedium: '#e5e8e5',
};

const formatPrice = (price) => {
  return `$${price.toLocaleString()}`;
};

const HelpTooltip = ({ content, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Create a unique ID for this tooltip
  const tooltipId = useRef(`tooltip-${id || Math.random()}`);
  
  // Listen for close events
  React.useEffect(() => {
    const handleCloseTooltips = () => {
      setIsOpen(false);
    };
    
    window.addEventListener('closeAllTooltips', handleCloseTooltips);
    return () => window.removeEventListener('closeAllTooltips', handleCloseTooltips);
  }, []);
  
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
        type="button"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-64 p-4 bg-white rounded-lg shadow-xl border border-gray-200" 
             style={{ top: '24px', left: '50%', transform: 'translateX(-50%)' }}>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="text-sm text-gray-700">{content}</p>
        </div>
      )}
    </div>
  );
};

const serviceData = {
  dispositionTypes: [
    { id: 'cremation', name: 'Cremation', description: 'A dignified cremation service' },
    { id: 'burial', name: 'Burial', description: 'A traditional burial service' }
  ],
  
  cremationServiceStyles: [
    { id: 'unattended', name: 'No Formal Service', description: 'Simple and dignified unattended cremation, without a ceremony' },
    { id: 'cemetery', name: 'Cemetery Chapel', description: 'Service at a cemetery chapel location' },
    { id: 'unique', name: 'Unique Venue or Church', description: 'Service at a church, meaningful venue, or location of your choice' }
  ],

  burialServiceStyles: [
    { id: 'graveside', name: 'Graveside Gathering', description: 'Intimate service at the gravesite' },
    { id: 'cemetery', name: 'Cemetery Chapel', description: 'Chapel service followed by graveside' },
    { id: 'unique', name: 'Unique Venue or Church', description: 'Service at a church, meaningful venue, or location of your choice' }
  ],

  crematedRemainsDelivery: [
    { id: 'premium_delivery', name: 'Premium Metro Delivery', price: 0, description: 'We deliver your loved ones cremated remains directly to you anywhere in metro Melbourne - seamless and dignified', mostPopular: true },
    { id: 'cemetery_collection', name: 'Collect from Cemetery', price: 0, description: 'Collect from your chosen crematorium at your convenience' },
    { id: 'office_collection', name: 'Collect from Our Office', price: 0, description: 'Collect from our Mornington office during business hours' },
    { id: 'decide_later', name: 'Decide Later', price: 0, description: 'Your funeral planner will help you through this decision when you are ready' }
  ],

  memorialCoordinationFees: [
    { 
      id: 'full_coordination', 
      name: 'Full Memorial Coordination', 
      price: 3300, 
      description: 'Complete coordination of your memorial service including all items you select', 
      inclusions: [
        'Dedicated event coordinator to liaise with all parties',
        'Venue sourcing and coordination from our extensive network',
        'Access to our complete supply list and preferred vendors',
        'Full planning and logistics management',
        'On-the-day coordination and support',
        'Comprehensive service timeline and checklist'
      ],
      minItems: 3 
    }
  ],

  cremationPackages: {
    unattended: [
      { id: 'essential_ballarat', name: 'Essential - Ballarat', price: 2900, location: 'Ballarat Cemetery', description: 'Unattended cremation at Ballarat Cemetery', inclusions: ['Transfer to our care 24/7','Essential mortuary care and preparation','All scheduling and paperwork','Liaison with cemetery staff','Cardboard Fibreboard Coffin','Cremation at Ballarat Cemeteries','Online Tribute Page'] },
      { id: 'essential_local', name: 'Essential - Local', price: 3350, locations: ['Bunurong Memorial Park', 'Springvale Botanical Cemetery'], description: 'Unattended cremation at Bunurong or Springvale', inclusions: ['Transfer to our care 24/7','Essential mortuary care and preparation','All scheduling and paperwork','Liaison with cemetery staff','Cardboard Fibreboard Coffin','Cremation fee','Delivery to Crematorium','Online Tribute Page'] },
      { id: 'essential_metro', name: 'Essential - Metro Melbourne', price: 3445, locations: ['Fawkner Memorial Park', 'Altona Memorial Park', 'Lilydale Memorial Park'], description: 'Unattended cremation at Fawkner, Altona, or Lilydale', inclusions: ['Transfer to our care 24/7','Essential mortuary care and preparation','All scheduling and paperwork','Liaison with cemetery staff','Cardboard Fibreboard Coffin','Cremation fee','Delivery to Crematorium','Online Tribute Page'] }
    ],
    cemetery: [
      { id: 'classic_cremation', name: 'Classic Package', price: 8984, locations: ['Bunurong', 'Springvale', 'Fawkner', 'Altona', 'Lilydale'], description: 'Service in cemetery chapel with cremation', inclusions: ['Transfer to our care 24/7','Full mortuary care and preparation','Chapel logistics and AV setup','Graveside/chapel coordination','All paperwork and on-the-day direction','Essential Floral Tribute (INCLUDED)','Cardboard Fibreboard Coffin','Use of chapel','Viewing (Private Farewell) - Optional','Photographic Tribute','Cremation fee','Return of Cremated Remains','Online Tribute Page'], flowersIncluded: true }
    ],
    unique: [
      { id: 'signature_cremation', name: 'Signature Service', price: 9684, description: 'Service at your chosen venue with full coordination support', inclusions: ['Transfer to our care 24/7','Full mortuary care and preparation','Venue sourcing from our extensive network','Venue logistics and AV setup','Comprehensive coordination','All paperwork and on-the-day direction','Essential Floral Tribute (INCLUDED)','Cardboard Fibreboard Coffin','Venue Hire (estimate - updated once confirmed)','Viewing (Private Farewell) - Optional','Photographic Tribute','Cremation fee','Return of Cremated Remains','Online Tribute Page'], flowersIncluded: true }
    ]
  },

  burialPackages: {
    graveside: [
      { id: 'essential_burial', name: 'Essential Burial', price: 5054, description: 'Intimate graveside gathering at any cemetery', inclusions: ['Transfer to our care 24/7','Essential mortuary care','Graveside coordination','All paperwork and on-the-day direction','Cardboard Fibreboard Coffin','Online Tribute Page'] }
    ],
    cemetery: [
      { id: 'classic_burial', name: 'Classic Package', price: 7919, locations: ['Bunurong', 'Springvale', 'Fawkner', 'Altona', 'Lilydale'], description: 'Chapel service followed by graveside burial', inclusions: ['Transfer to our care 24/7','Full mortuary care and preparation','Chapel logistics and AV setup','Graveside coordination','All paperwork and on-the-day direction','Essential Floral Tribute (INCLUDED)','Cardboard Fibreboard Coffin','Use of chapel','Viewing (Private Farewell) - Optional','Photographic Tribute','Online Tribute Page'], flowersIncluded: true }
    ],
    unique: [
      { id: 'signature_burial', name: 'Signature Service', price: 8519, description: 'Service at your chosen venue with full coordination support', inclusions: ['Transfer to our care 24/7','Full mortuary care and preparation','Venue sourcing from our extensive network','Venue logistics and AV setup','Comprehensive coordination','All paperwork and on-the-day direction','Essential Floral Tribute (INCLUDED)','Cardboard Fibreboard Coffin','Venue Hire (estimate - updated once confirmed)','Viewing (Private Farewell) - Optional','Photographic Tribute','Online Tribute Page'], flowersIncluded: true }
    ]
  },

  serviceLeaders: [
    { id: 'celebrant', name: 'Professional Celebrant', price: 770, description: 'Experienced funeral celebrant to conduct the service' },
    { id: 'minister', name: 'Religious Officiant', price: 440, description: 'Priest, minister, or faith leader' },
    { id: 'family', name: 'Family-Led', price: 0, description: 'Conducted by family members' }
  ],

  flowerPackages: [
    { id: 'included', name: 'Essential Tribute (Included)', price: 0, totalPrice: 550, description: 'Already included in your package', isIncluded: true },
    { id: 'classic', name: 'Classic Tribute', price: 200, totalPrice: 750, description: 'Balanced, mid-size tribute', upgrade: true },
    { id: 'signature', name: 'Signature Tribute', price: 400, totalPrice: 950, description: 'Generous, premium tribute', upgrade: true },
    { id: 'platinum', name: 'Platinum Tribute', price: 600, totalPrice: 1150, description: 'Most luxurious statement', upgrade: true }
  ],

  flowerPackagesMemorial: [
    { id: 'small_vase', name: 'Small Vase Arrangement', price: 250, description: 'Elegant arrangement to display at the front of the celebration space' },
    { id: 'medium_vase', name: 'Medium Vase Arrangement', price: 300, description: 'Beautiful mid-size arrangement as a focal point', mostPopular: true },
    { id: 'large_vase', name: 'Large Vase Arrangement', price: 350, description: 'Impressive statement arrangement for the memorial' },
    { id: 'custom', name: 'Custom Design', price: 0, description: 'Your funeral planner will help bring your vision to life within your budget', isCustom: true },
    { id: 'none', name: 'No Flowers Needed', price: 0, description: '' }
  ],

  flowerPackagesUnattended: [
    { id: 'essential', name: 'Essential Tribute', price: 550, description: 'Simple, elegant arrangement' },
    { id: 'classic', name: 'Classic Tribute', price: 750, description: 'Balanced, mid-size tribute' },
    { id: 'signature', name: 'Signature Tribute', price: 950, description: 'Generous, premium tribute' },
    { id: 'platinum', name: 'Platinum Tribute', price: 1150, description: 'Most luxurious statement' },
    { id: 'none', name: 'No Flowers Needed', price: 0, description: '' }
  ],

  flowerStyles: [
    { id: 'white_green', name: 'White & Green', description: 'Pure, elegant and timeless', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/676155c228191f6b3c69b285_Whites-%26-Green-(1)-804x804.jpg' },
    { id: 'roses', name: 'Roses', description: 'Timeless beauty and classic charm', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/67615621331ed2bcc8bdd97e_Roses-(8)-804x804.jpg' },
    { id: 'pastels', name: 'Pastels', description: 'Soft, calming hues', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/676155c265c2cad3990f2dd9_Pastels-(1)-804x804.jpg' },
    { id: 'wildflowers', name: 'Wildflowers', description: 'Locally sourced native beauty', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/676155c2553d4ec14c8133a0_Wildflowers-(5)-804x804.jpg' },
    { id: 'bright', name: 'Bright & Beautiful', description: 'Vibrant blooms full of life', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/676155c278456b6f74053ff4_Bright-and-Beautiful-(2)-804x804.jpg' },
    { id: 'decide_later', name: 'Decide Later', description: 'Work with our florist to decide' },
    { id: 'custom', name: 'Custom Arrangement', description: 'Create your own unique design' }
  ],

  coffinOptions: {
    eco_friendly: [
      { id: 'cardboard', name: 'Cardboard Fibreboard Coffin (Included)', price: 0, totalPrice: 550, description: 'Simple, dignified, and environmentally friendly', isIncluded: true, image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/6753c2663c400909535188fb_Carboard-Casket-5050-450x450.png' },
      { id: 'wicker_natural', name: 'Natural Wicker Casket', price: 714, totalPrice: 1264, description: 'Sustainable wicker, oval shape, calico liner', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/67505251f193436753252c8d_Daisybox-RTT01-Natural-Wicker215x215.png' },
      { id: 'wicker_white', name: 'White Wicker Casket', price: 754, totalPrice: 1304, description: 'White wicker finish, oval shape', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/675052b60a5518852b9a4f43_New-Wicker-White-RTT05215x215.png' },
      { id: 'enviro_rope', name: 'Enviro Coffin - Rope Handles', price: 1617, totalPrice: 2167, description: 'Solid plantation pine, raw finish, biodegradable', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/675052d32d1042ba3493fce7_Better---Enviro-Rope-215x215.png' },
      { id: 'enviro_casket_timber', name: 'Enviro Casket - Timber Handles', price: 2325, totalPrice: 2875, description: 'Rectangular casket, timber handles', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/68eb77d68b2570bcbbe5e987_Enviro%20Casket%20Timber%20Handles.png' },
      { id: 'natural_legacy', name: 'Natural Legacy Coffin', price: 2524, totalPrice: 3074, description: 'Premium pure new wool for a soft, natural aesthetic', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/68eb764adfbe5cdc01e694c6_Natural-Legacy.png' }
    ],
    paper_veneer: [
      { id: 'lambeth', name: 'Lambeth', price: 510, totalPrice: 1060, description: 'Maple colour, matt finish, fixed plastic handles', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/675053da91f42788479333e3_Lambeth-215x215.png' },
      { id: 'drummond_walnut', name: 'Drummond - Walnut', price: 1096, totalPrice: 1646, description: 'Walnut gloss finish, six fixed plastic handles', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/675053e8ef015b2fd2c6a122_Drummond-SRL-215x215.png' },
      { id: 'waverley_sapele', name: 'Waverley - Sapele', price: 1416, totalPrice: 1966, description: 'Sapele gloss finish, double raised lid', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/675053f222c3dcf624d86ac8_Waverley-215x215.png' },
      { id: 'montrose', name: 'Montrose', price: 1585, totalPrice: 2135, description: 'Rosewood gloss finish, gold plastic handles', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/675053fb9a9d99d3c16178bc_Montrose-Rosewood-215x215.png' }
    ],
    timber_veneer: [
      { id: 'rundle', name: 'Rundle', price: 1482, totalPrice: 2032, description: 'Rosewood gloss finish, slightly raised lid', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/6751780b46b2b485276dd1f6_Rundle-215x215.png' },
      { id: 'norwood_rose', name: 'Norwood Rosewood', price: 2103, totalPrice: 2653, description: 'Raised lid with fluted design, metal swing bar handles', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/6751782bcfff35b65dfcfa84_Norwood-Rosewood-215x215.png' },
      { id: 'norwood_white', name: 'Norwood White', price: 2199, totalPrice: 2749, description: 'White gloss finish, raised lid with fluted design', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/67517848f0f9c06d55a7507f_Norwood-White-215x215.png' },
      { id: 'hampton', name: 'Hampton', price: 2518, totalPrice: 3068, description: 'Satin finish, gold metal swing bar handles', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/6751785adbd3208095914bfd_Hampton-215x215.png' }
    ],
    solid_timber: [
      { id: 'teakdale', name: 'Teakdale Walnut', price: 2381, totalPrice: 2931, description: 'NZ Radiata Pine, walnut gloss finish', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/675178766c4d1c56abd1c75c_Teakdale-Walnut-215x215.png' },
      { id: 'denman', name: 'Denman Cedar', price: 3086, totalPrice: 3636, description: 'Solid Canadian cedar, natural finish', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/6751788a9a76da0ed740ffa4_Denman-Cedar-215x215.png' },
      { id: 'sapele_davidson', name: 'Sapele Davidson', price: 3368, totalPrice: 3918, description: 'Solid sapele timber, curved lid design', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/675178a7cf750a7d7d1d24a2_Sapele-Davidson-215x215.png' },
      { id: 'blackwood', name: 'Blackwood', price: 3861, totalPrice: 4411, description: 'Tasmanian blackwood, raised lid with bronze details', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/67517924f0b60e189c6ee143_Blackwood-215x215.png' }
    ],
    casket: [
      { id: 'devon', name: 'Devon', price: 3359, totalPrice: 3909, description: 'Radiata pine casket, walnut gloss, raised lid', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/67517945751e04caca3bcc38_Devon-215x215.png' },
      { id: 'grecian_rose', name: 'Grecian Urn Rosewood', price: 3879, totalPrice: 4429, description: 'Rosewood gloss, streamlined lid design', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/6751797d0575ab62a956b5d7_Grecian-Urn-Rosewood-215x215.png' },
      { id: 'grecian_white', name: 'Grecian Urn White', price: 4007, totalPrice: 4557, description: 'White gloss, streamlined lid design', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/675954c5de7e3fb37d254617_Grecian%20Urn%20White%20215x215.png' },
      { id: 'grecian_blackwood', name: 'Grecian Urn Blackwood', price: 5854, totalPrice: 6404, description: 'Tasmanian blackwood, premium finish', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/675179a5b3084b153c7fdd65_Grecian-Urn-Blackwood-215x215.png' }
    ]
  },

  photographicTributes: [
    { id: 'standard', name: 'Standard Slideshow', price: 375, description: 'Photo slideshow for the service' },
    { id: 'premium', name: 'Premium Package', price: 575, description: 'Service slideshow plus separate rolling display for refreshments area' },
    { id: 'none', name: 'No Slideshow', price: 0, description: '' }
  ],

  printedMaterials: [
    { id: 'signature_booklet', name: 'Candour Signature Booklet', price: 400, baseQuantity: 50, description: 'Our reimagined 6-page keepsake', mostPopular: true, image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/68eb7ba816529559bfa6c7ef_3.jpg' },
    { id: 'postcards', name: 'Memorial Postcards', price: 150, baseQuantity: 50, description: 'Simple memorial cards', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/68eb7ca7f52b293ce243acf2_Michael%20smith%20-%20Postcard.jpg' },
    { id: 'santini', name: 'Santini Cards', price: 200, baseQuantity: 50, description: 'Traditional prayer cards', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/6788fe64623e1be601f5b07e_Icon-Green-funeral-service.png' },
    { id: 'bookmarks', name: 'Memorial Bookmarks', price: 180, baseQuantity: 50, description: 'Keepsake bookmarks', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/68eb7c05247c379954ec0158_jenniffer%20smith-%20funeral%20flyer%204%20pages.jpg' },
    { id: 'none', name: 'No Printed Materials', price: 0, description: '', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/6753c730d586dbe25c2b35ad_icon-green-tree-120x120.png' }
  ],

  announcements: [
    { id: 'online', name: 'Online Tribute', price: 0, included: true },
    { id: 'newspaper', name: 'Newspaper Notice', price: 300, description: 'Estimate - varies by publication' },
    { id: 'facebook', name: 'Facebook Image', price: 0, included: true }
  ],

  cateringPackages: [
    { id: 'essential', name: 'Essentials', priceDropOff: 23.10, priceStaffed: 30.80, description: '3 sandwich halves, 2 sweet treats per person', serviceLevel: 'Simple presentation' },
    { id: 'classic', name: 'Classic', priceDropOff: 37.40, priceStaffed: 44.00, description: 'Sandwiches, 3 savouries, 3 sweet treats per person', serviceLevel: 'Styled presentation' },
    { id: 'premium', name: 'Premium', price: 53.30, description: '4 hot or cold items, 2 sweet treats per person', serviceLevel: 'Chef on site with elevated styling', chefOnSite: true, staffedOnly: true },
    { id: 'platinum', name: 'Platinum', price: 63.80, description: '6 hot or cold savouries, 3 sweet treats per person', serviceLevel: 'Chef on site with premium styling', chefOnSite: true, staffedOnly: true },
    { id: 'none', name: 'No Catering', price: 0, description: '' }
  ],

  cateringServiceTypes: [
    { id: 'dropoff', name: 'Drop-Off Service', description: 'Food delivered in disposable boxes' },
    { id: 'staffed', name: 'With Staff Service', description: 'Staff to set up, serve, and provide tea/coffee station' }
  ],

  memorialBooks: [
    { id: 'black', name: 'Classic Black', price: 240, description: 'Refined, timeless, and deeply respectful' },
    { id: 'dove', name: 'Soft Dove', price: 240, description: 'A gentle light grey — calm, serene, and understated' },
    { id: 'sand', name: 'Warm Sand', price: 240, description: 'A natural, earthy tone — simple, warm, and grounding' },
    { id: 'none', name: 'No Memorial Book', price: 0, description: '' }
  ],

  urnOptions: [
    { id: 'cemetery', name: 'Cemetery Supplied Urn is Fine', price: 0, description: 'Standard urn provided by cemetery' },
    { id: 'upgrade', name: 'Upgrade Urn - Send Me the Brochure', price: 0, description: 'Our team will contact you with our complete urn catalogue', needsCatalogue: true }
  ]
};

const FuneralServiceCalculator = () => {
  const designerTopRef = useRef(null);
  const navigationRef = useRef(null);
  const [step, setStep] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [savedCode, setSavedCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enlargedCoffin, setEnlargedCoffin] = useState(null);
  const [selections, setSelections] = useState({
    dispositionType: null,
    serviceStyle: null,
    package: null,
    crematedRemainsDelivery: null,
    needsMemorialHelp: null,
    memorialCoordinationFee: null,
    serviceLeader: null,
    flowers: null,
    flowerStyle: null,
    coffinCategory: null,
    coffin: null,
    photographicTribute: null,
    printedMaterials: [],
    printedMaterialsQuantities: {},
    announcements: [],
    cateringPackage: null,
    cateringServiceType: null,
    cateringGuests: 30,
    memorialBook: null,
    urn: { id: 'cemetery', name: 'Cemetery Supplied Urn is Fine', price: 0, description: 'Standard urn provided by cemetery' },
    skipPersonalisation: false
  });

  // Generate save code
  const generateSaveCode = () => {
    const saveData = {
      step: step,
      selections: selections,
      timestamp: new Date().toISOString()
    };
    // Create a simple base64 encoded string
    const jsonString = JSON.stringify(saveData);
    const encoded = btoa(jsonString).substring(0, 8).toUpperCase();
    
    // Store in localStorage with the code as key
    localStorage.setItem(`candour_funeral_${encoded}`, jsonString);
    return encoded;
  };

  // Load from save code
  const loadFromCode = (code) => {
    try {
      const savedData = localStorage.getItem(`candour_funeral_${code.toUpperCase()}`);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        
        // Restore all selections
        setSelections(parsed.selections);
        
        // Wait a moment for state to update, then set the step
        setTimeout(() => {
          setStep(parsed.step);
          // Scroll to top of designer
          designerTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading saved progress:', error);
      return false;
    }
  };

  // Check for saved progress on load
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const loadCode = urlParams.get('code');
    if (loadCode) {
      loadFromCode(loadCode);
    }
  }, []);

  const steps = [
    { id: 'disposition', title: 'Burial or Cremation?', subtitle: 'How would you like to say goodbye?' },
    { id: 'serviceStyle', title: 'Service Style', subtitle: 'What type of service feels right?' },
    { id: 'package', title: 'Service Package', subtitle: 'Choose your package level' },
    { id: 'crematedRemainsDelivery', title: 'Bringing Your Loved One Home', subtitle: 'How would you like to receive your loved ones ashes?', conditional: (sel) => sel.dispositionType === 'cremation' },
    { id: 'urn', title: 'Urn Selection', subtitle: 'For the cremated remains', conditional: (sel) => sel.dispositionType === 'cremation' },
    { id: 'memorialHelp', title: 'Memorial Services', subtitle: 'Would you like assistance?', conditional: (sel) => sel.dispositionType === 'cremation' && sel.serviceStyle === 'unattended' },
    { id: 'personalisationChoice', title: 'Personalise Your Service', subtitle: 'Add special touches or complete now', conditional: (sel) => !(sel.dispositionType === 'cremation' && sel.serviceStyle === 'unattended') && !sel.skipPersonalisation },
    { id: 'serviceLeader', title: 'Who Will Conduct the Service', subtitle: 'Choose your celebrant or officiant', conditional: (sel) => sel.serviceStyle !== 'unattended' && !sel.skipPersonalisation },
    { id: 'flowers', title: 'Floral Tribute', subtitle: 'Flowers bring comfort and beauty', conditional: (sel) => (!sel.skipPersonalisation && sel.serviceStyle !== 'unattended') || (sel.serviceStyle === 'unattended' && sel.needsMemorialHelp) },
    { id: 'flowerStyle', title: 'Flower Style', subtitle: 'Choose your preferred style', conditional: (sel) => (sel.flowers && sel.flowers.id !== 'none' && sel.flowers.id !== 'included') || (sel.flowers && sel.flowers.upgrade) },
    { id: 'coffinCategory', title: 'Coffin Selection', subtitle: 'Choose a category to explore', conditional: (sel) => !(sel.serviceStyle === 'unattended' && sel.needsMemorialHelp) },
    { id: 'coffinSelection', title: 'Select Your Coffin', subtitle: `${selections.coffinCategory?.name || ''} Options`, conditional: (sel) => sel.coffinCategory && !(sel.serviceStyle === 'unattended' && sel.needsMemorialHelp) },
    { id: 'photographicTribute', title: 'Photographic Tribute', subtitle: 'Honour their memory with photos', conditional: (sel) => (sel.serviceStyle !== 'unattended' && !sel.skipPersonalisation) || (sel.serviceStyle === 'unattended' && sel.needsMemorialHelp) },
    { id: 'printedMaterials', title: 'Printed Materials', subtitle: 'Service booklets and keepsakes', conditional: (sel) => (sel.serviceStyle !== 'unattended' && !sel.skipPersonalisation) || (sel.serviceStyle === 'unattended' && sel.needsMemorialHelp) },
    { id: 'announcements', title: 'Announcements', subtitle: 'Share the service details', conditional: (sel) => !sel.skipPersonalisation || (sel.serviceStyle === 'unattended' && sel.needsMemorialHelp) },
    { id: 'cateringPackage', title: 'Catering', subtitle: 'Refreshments after the service', conditional: (sel) => !sel.skipPersonalisation || (sel.serviceStyle === 'unattended' && sel.needsMemorialHelp) },
    { id: 'memorialBook', title: 'Memorial Book', subtitle: 'Guest attendance book with photos from your photo tribute', conditional: (sel) => !sel.skipPersonalisation || (sel.serviceStyle === 'unattended' && sel.needsMemorialHelp) },
    { id: 'summary', title: 'Your Service Summary', subtitle: 'Review and email your plan' }
  ];

  const filteredSteps = steps.filter(s => !s.conditional || s.conditional(selections));
  
  React.useEffect(() => {
    if (step >= filteredSteps.length && filteredSteps.length > 0) {
      setStep(filteredSteps.length - 1);
    }
  }, [filteredSteps.length, step]);
  
  const currentStep = filteredSteps[step] || filteredSteps[0];

  if (!currentStep) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.bgLight }}>
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading designer...</p>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    let total = 0;
    if (selections.package) total += selections.package.price;
    if (selections.crematedRemainsDelivery && selections.crematedRemainsDelivery.price > 0) total += selections.crematedRemainsDelivery.price;
    if (selections.memorialCoordinationFee && selections.memorialCoordinationFee.price > 0) total += selections.memorialCoordinationFee.price;
    if (selections.serviceLeader && selections.serviceLeader.price > 0) total += selections.serviceLeader.price;
    if (selections.flowers && selections.flowers.price > 0) total += selections.flowers.price;
    if (selections.coffin && selections.coffin.price > 0) total += selections.coffin.price;
    if (selections.photographicTribute) total += selections.photographicTribute.price;
    if (selections.printedMaterials && selections.printedMaterials.length > 0) {
      selections.printedMaterials.forEach(material => {
        if (material.price > 0) {
          if (material.baseQuantity) {
            const selectedQty = selections.printedMaterialsQuantities[material.id] || material.baseQuantity;
            const pricePerUnit = material.price / material.baseQuantity;
            total += pricePerUnit * selectedQty;
          } else {
            total += material.price;
          }
        }
      });
    }
    if (selections.cateringPackage && selections.cateringPackage.id !== 'none') {
      let cateringPrice = 0;
      if (selections.cateringPackage.staffedOnly) {
        cateringPrice = selections.cateringPackage.price;
      } else if (selections.cateringServiceType?.id === 'staffed') {
        cateringPrice = selections.cateringPackage.priceStaffed;
      } else if (selections.cateringServiceType?.id === 'dropoff') {
        cateringPrice = selections.cateringPackage.priceDropOff;
      }
      total += cateringPrice * (selections.cateringGuests || 30);
    }
    if (selections.memorialBook) total += selections.memorialBook.price;
    if (selections.urn && selections.urn.price > 0) total += selections.urn.price;
    selections.announcements.forEach(ann => {
      if (!ann.included) total += ann.price;
    });
    return total;
  };

  const handleSelection = (field, value, skipScroll = false) => {
    setSelections(prev => ({ ...prev, [field]: value }));
    
    // Removed auto-scrolling as it was too disruptive
    // Users can naturally see the navigation buttons after making a selection
  };

  const handleAnnouncementToggle = (announcement) => {
    setSelections(prev => {
      const exists = prev.announcements.find(a => a.id === announcement.id);
      if (exists) {
        return { ...prev, announcements: prev.announcements.filter(a => a.id !== announcement.id) };
      } else {
        return { ...prev, announcements: [...prev.announcements, announcement] };
      }
    });
  };

  const handlePrintedMaterialToggle = (material) => {
    setSelections(prev => {
      const exists = prev.printedMaterials.find(m => m.id === material.id);
      if (exists) {
        const newQuantities = { ...prev.printedMaterialsQuantities };
        delete newQuantities[material.id];
        return { 
          ...prev, 
          printedMaterials: prev.printedMaterials.filter(m => m.id !== material.id),
          printedMaterialsQuantities: newQuantities
        };
      } else {
        const newQuantities = { ...prev.printedMaterialsQuantities };
        if (material.baseQuantity) {
          newQuantities[material.id] = material.baseQuantity;
        }
        return { 
          ...prev, 
          printedMaterials: [...prev.printedMaterials, material],
          printedMaterialsQuantities: newQuantities
        };
      }
    });
  };

  const handlePrintedMaterialQuantity = (materialId, quantity) => {
    setSelections(prev => ({
      ...prev,
      printedMaterialsQuantities: {
        ...prev.printedMaterialsQuantities,
        [materialId]: quantity
      }
    }));
  };

  const skipToSummary = () => {
    // Close all tooltips when navigating
    window.dispatchEvent(new Event('closeAllTooltips'));
    
    setSelections(prev => ({ ...prev, skipPersonalisation: true }));
    const summaryIndex = filteredSteps.findIndex(s => s.id === 'summary');
    if (summaryIndex !== -1) {
      setStep(summaryIndex);
      setTimeout(() => {
        designerTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const nextStep = () => {
    // Close all tooltips when navigating
    window.dispatchEvent(new Event('closeAllTooltips'));
    
    if (step < filteredSteps.length - 1) {
      setStep(step + 1);
      setTimeout(() => {
        designerTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  const prevStep = () => {
    // Close all tooltips when navigating
    window.dispatchEvent(new Event('closeAllTooltips'));
    
    if (step > 0) {
      if (currentStep.id === 'summary' && selections.skipPersonalisation) {
        setSelections(prev => ({ ...prev, skipPersonalisation: false }));
      }
      setStep(step - 1);
      setTimeout(() => {
        designerTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  React.useEffect(() => {
    if (currentStep && currentStep.id === 'package' && !selections.package) {
      const packages = selections.dispositionType === 'cremation'
        ? serviceData.cremationPackages[selections.serviceStyle]
        : serviceData.burialPackages[selections.serviceStyle];
      
      if (packages && packages.length === 1) {
        handleSelection('package', packages[0]);
      }
    }
  }, [currentStep?.id, selections.dispositionType, selections.serviceStyle, selections.package]);

  const handleEmailSubmit = async (formData) => {
    setIsSubmitting(true);

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      newsletter: formData.newsletter,
      dispositionType: selections.dispositionType,
      serviceStyle: selections.serviceStyle,
      packageName: selections.package?.name,
      packagePrice: selections.package?.price,
      total: calculateTotal(),
      selections: {
        crematedRemainsDelivery: selections.crematedRemainsDelivery?.name,
        memorialCoordination: selections.memorialCoordinationFee?.name,
        serviceLeader: selections.serviceLeader?.name,
        flowers: selections.flowers?.name,
        flowerStyle: selections.flowerStyle?.name,
        coffin: selections.coffin?.name,
        photographicTribute: selections.photographicTribute?.name,
        printedMaterials: selections.printedMaterials.map(m => m.name).join(', '),
        catering: selections.cateringPackage?.name,
        cateringService: selections.cateringServiceType?.name,
        cateringGuests: selections.cateringGuests,
        memorialBook: selections.memorialBook?.name,
        urn: selections.urn?.name
      },
      timestamp: new Date().toISOString()
    };

    try {
      await fetch('https://hooks.zapier.com/hooks/catch/24815532/u55q6cj/', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      window.location.href = `/funeral-thank-you?firstName=${encodeURIComponent(data.firstName)}&email=${encodeURIComponent(data.email)}&total=${encodeURIComponent(formatPrice(calculateTotal()))}`;
    } catch (error) {
      console.error('Submission error:', error);
      alert('Thank you! Your summary will be sent to ' + data.email);
      setShowEmailModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    const stepId = currentStep.id;
    switch(stepId) {
      case 'disposition': return selections.dispositionType !== null;
      case 'serviceStyle': return selections.serviceStyle !== null;
      case 'package': return selections.package !== null;
      case 'crematedRemainsDelivery': return selections.crematedRemainsDelivery !== null;
      case 'urn':
      case 'urnRegular': return selections.urn !== null;
      case 'memorialHelp': return selections.needsMemorialHelp !== null;
      case 'personalisationChoice': return true;
      case 'serviceLeader': return selections.serviceLeader !== null;
      case 'flowers': return selections.flowers !== null;
      case 'flowerStyle': return selections.flowerStyle !== null;
      case 'coffinCategory': return selections.coffinCategory !== null;
      case 'coffinSelection': return selections.coffin !== null;
      case 'photographicTribute': return selections.photographicTribute !== null;
      case 'printedMaterials': 
        return selections.printedMaterials.length > 0;
      case 'announcements': return true;
      case 'cateringPackage': 
        if (selections.cateringPackage?.id === 'none') return true;
        if (!selections.cateringPackage) return false;
        if (selections.cateringPackage.staffedOnly) return selections.cateringGuests >= 30;
        return selections.cateringServiceType !== null && selections.cateringGuests >= 30;
      case 'memorialBook': return selections.memorialBook !== null;
      default: return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case 'disposition':
        return (
          <div>
            <div className="flex items-center justify-center mb-6">
              <p className="text-gray-600 text-center">There's no wrong choice here - both options provide a dignified farewell</p>
              <HelpTooltip 
                id="disposition"
                content="Cremation involves reducing the body to ashes, which are returned to the family. Burial is the traditional interment of the body in a cemetery. Both can include meaningful services and ceremonies. Consider your loved one's wishes, religious/cultural traditions, and family preferences."
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {serviceData.dispositionTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleSelection('dispositionType', type.id)}
                  className={`p-8 rounded-xl transition-all text-left ${
                    selections.dispositionType === type.id
                      ? 'border-4 shadow-lg'
                      : 'border-2 hover:border-4 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: selections.dispositionType === type.id ? colors.primary : '#d1d5db',
                    backgroundColor: selections.dispositionType === type.id ? colors.bgLight : 'white'
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold" style={{ color: colors.primaryDark }}>
                      {type.name}
                    </h3>
                    {selections.dispositionType === type.id && (
                      <Check className="w-6 h-6" style={{ color: colors.primary }} />
                    )}
                  </div>
                  <p className="text-gray-600 text-base">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'serviceStyle':
        const serviceStyles = selections.dispositionType === 'cremation' 
          ? serviceData.cremationServiceStyles 
          : serviceData.burialServiceStyles;
        
        return (
          <div>
            <div className="flex items-center justify-center mb-6">
              <p className="text-gray-600 text-center">Each service style offers a meaningful way to say goodbye</p>
              <HelpTooltip 
                content={selections.dispositionType === 'cremation' 
                  ? "Choose based on whether you'd like a formal service. 'No Formal Service' is a simple cremation without a ceremony. Chapel and venue options include a full service with family and friends."
                  : "Graveside gatherings are intimate and outdoors. Chapel services offer an indoor ceremony first. Unique venues let you celebrate somewhere special to your loved one."
                }
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {serviceStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleSelection('serviceStyle', style.id)}
                  className={`p-6 rounded-xl transition-all text-left ${
                    selections.serviceStyle === style.id
                      ? 'border-4 shadow-lg'
                      : 'border-2 hover:border-4 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: selections.serviceStyle === style.id ? colors.primary : '#d1d5db',
                    backgroundColor: selections.serviceStyle === style.id ? colors.bgLight : 'white'
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold" style={{ color: colors.primaryDark }}>
                      {style.name}
                    </h3>
                    {selections.serviceStyle === style.id && (
                      <Check className="w-6 h-6" style={{ color: colors.primary }} />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{style.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'package':
        const packages = selections.dispositionType === 'cremation'
          ? serviceData.cremationPackages[selections.serviceStyle]
          : serviceData.burialPackages[selections.serviceStyle];

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4">
              <p className="text-gray-600 text-center">Choose the package that best suits your needs</p>
              <HelpTooltip 
                content={
                  selections.serviceStyle === 'unattended' 
                    ? "All packages include professional funeral direction, mortuary care, essential paperwork, and a simple coffin. The main difference is the cremation location - Ballarat is furthest from Melbourne but most affordable, while metro locations offer convenience at a slightly higher cost."
                    : "All packages include professional funeral direction, mortuary care, and essential paperwork. The main differences are in location options and included features like floral tributes and chapel use."
                }
              />
            </div>
            {packages && packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => handleSelection('package', pkg)}
                className={`w-full p-6 rounded-xl transition-all text-left ${
                  selections.package?.id === pkg.id
                    ? 'border-4 shadow-lg'
                    : 'border-2 hover:border-4 hover:shadow-md'
                }`}
                style={{
                  borderColor: selections.package?.id === pkg.id ? colors.primary : '#d1d5db',
                  backgroundColor: selections.package?.id === pkg.id ? colors.bgLight : 'white'
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold" style={{ color: colors.primaryDark }}>
                        {pkg.name}
                      </h3>
                      {pkg.flowersIncluded && (
                        <span className="px-3 py-1 text-xs font-bold rounded-full text-white" style={{ backgroundColor: colors.accent }}>
                          Essential Floral Tribute INCLUDED
                        </span>
                      )}
                    </div>
                    {pkg.location && (
                      <p className="text-sm text-gray-500 mb-2">{pkg.location}</p>
                    )}
                    {pkg.locations && (
                      <p className="text-sm text-gray-500 mb-2">{pkg.locations.join(', ')}</p>
                    )}
                    <div className="text-3xl font-bold mb-3" style={{ color: colors.primary }}>
                      {formatPrice(pkg.price)}
                    </div>
                  </div>
                  {selections.package?.id === pkg.id && (
                    <Check className="w-6 h-6 flex-shrink-0 ml-4" style={{ color: colors.primary }} />
                  )}
                </div>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold mb-2">What's Included:</div>
                  <ul className="space-y-1">
                    {pkg.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {selections.package?.id !== pkg.id && (
                  <div className="mt-4 text-center">
                    <div className="py-3 px-6 rounded-lg font-semibold" style={{ backgroundColor: colors.bgMedium, color: colors.primaryDark }}>
                      Select This Package
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        );

      case 'crematedRemainsDelivery':
        return (
          <div>
            <div className="flex items-center justify-center mb-6">
              <p className="text-gray-600 text-center">All options are included at no extra cost</p>
              <HelpTooltip 
                content="After cremation, your loved one's ashes will be placed in a temporary urn. We can deliver them to your home, you can collect from the cemetery or our office, or decide later when you're ready. There's no rush - take your time with this decision."
              />
            </div>
            <div className="space-y-4">
              {serviceData.crematedRemainsDelivery.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelection('crematedRemainsDelivery', option)}
                  className={`w-full p-6 rounded-xl transition-all text-left ${
                    selections.crematedRemainsDelivery?.id === option.id
                      ? 'border-4 shadow-lg'
                      : 'border-2 hover:border-4 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: selections.crematedRemainsDelivery?.id === option.id ? colors.primary : '#d1d5db',
                    backgroundColor: selections.crematedRemainsDelivery?.id === option.id ? colors.bgLight : 'white'
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold" style={{ color: colors.primaryDark }}>
                          {option.name}
                        </h3>
                        {option.mostPopular && (
                          <span className="px-3 py-1 text-xs font-bold rounded-full text-white" style={{ backgroundColor: colors.accent }}>
                            Most Popular
                          </span>
                        )}
                        {option.id === 'decide_later' && (
                          <span className="px-3 py-1 text-xs font-bold rounded-full" style={{ backgroundColor: colors.bgLight, color: colors.primaryDark }}>
                            No Pressure
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{option.description}</p>
                    </div>
                    {selections.crematedRemainsDelivery?.id === option.id && (
                      <Check className="w-6 h-6 flex-shrink-0 ml-4" style={{ color: colors.primary }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'urn':
        return (
          <div>
            <div className="flex items-center justify-center mb-6">
              <p className="text-gray-600 text-center">The cemetery provides a standard urn at no cost, or explore our premium collection</p>
              <HelpTooltip 
                content="The cemetery's standard urn is a simple, dignified container suitable for most needs. If you'd like something more personalised - like wood, ceramic, or biodegradable options - we can send you our catalogue with various styles and price points."
              />
            </div>
            <div className="space-y-4">
              {serviceData.urnOptions.map((urn) => (
                <button
                  key={urn.id}
                  onClick={() => handleSelection('urn', urn)}
                  className={`w-full p-6 rounded-xl transition-all text-left ${
                    selections.urn?.id === urn.id
                      ? 'border-4 shadow-lg'
                      : 'border-2 hover:border-4 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: selections.urn?.id === urn.id ? colors.primary : '#d1d5db',
                    backgroundColor: selections.urn?.id === urn.id ? colors.bgLight : 'white'
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: colors.primaryDark }}>
                        {urn.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{urn.description}</p>
                    </div>
                    {selections.urn?.id === urn.id && (
                      <Check className="w-6 h-6 flex-shrink-0 ml-4" style={{ color: colors.primary }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'memorialHelp':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-4">
              <p className="text-gray-600 text-center">Would you like help planning a memorial service?</p>
              <HelpTooltip 
                content="Memorial coordination provides full event planning support for a celebration of life service after the cremation. This can be held days, weeks, or even months later when you're ready. Our team handles venue selection, catering, AV setup, and all logistics - you just need to be there."
              />
            </div>
            <button
              onClick={() => {
                handleSelection('needsMemorialHelp', true);
                handleSelection('memorialCoordinationFee', serviceData.memorialCoordinationFees[0]);
              }}
              className={`w-full p-6 rounded-xl transition-all text-left ${
                selections.needsMemorialHelp === true
                  ? 'border-4 shadow-lg'
                  : 'border-2 hover:border-4 hover:shadow-md'
              }`}
              style={{
                borderColor: selections.needsMemorialHelp === true ? colors.primary : '#d1d5db',
                backgroundColor: selections.needsMemorialHelp === true ? colors.bgLight : 'white'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.primaryDark }}>
                    Yes, I'd like Memorial Coordination
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {serviceData.memorialCoordinationFees[0].description}
                  </p>
                  <div className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
                    {formatPrice(serviceData.memorialCoordinationFees[0].price)}
                  </div>
                  
                  <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                    <div className="font-semibold mb-2">What's Included:</div>
                    <ul className="space-y-2">
                      {serviceData.memorialCoordinationFees[0].inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {selections.needsMemorialHelp === true && (
                  <Check className="w-6 h-6 flex-shrink-0 ml-4" style={{ color: colors.primary }} />
                )}
              </div>
            </button>

            <button
              onClick={() => {
                handleSelection('needsMemorialHelp', false);
                handleSelection('memorialCoordinationFee', null);
              }}
              className={`w-full p-6 rounded-xl transition-all text-left ${
                selections.needsMemorialHelp === false
                  ? 'border-4 shadow-lg'
                  : 'border-2 hover:border-4 hover:shadow-md'
              }`}
              style={{
                borderColor: selections.needsMemorialHelp === false ? colors.primary : '#d1d5db',
                backgroundColor: selections.needsMemorialHelp === false ? colors.bgLight : 'white'
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.primaryDark }}>
                    No Memorial Service Needed
                  </h3>
                  <p className="text-gray-600">
                    Continue with just the essential cremation service
                  </p>
                </div>
                {selections.needsMemorialHelp === false && (
                  <Check className="w-6 h-6 flex-shrink-0" style={{ color: colors.primary }} />
                )}
              </div>
            </button>
          </div>
        );

      case 'personalisationChoice':
        return (
          <div className="space-y-8">
            <div className="rounded-xl p-6 text-center" style={{ backgroundColor: '#e8f5e9', borderLeft: `4px solid ${colors.primary}` }}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                  <Check className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: colors.primaryDark }}>
                Your Foundation Package is Complete
              </h3>
              <p className="text-gray-700 max-w-2xl mx-auto">
                You've selected everything essential for a meaningful service. Now you can personalise it further or proceed with your current selections.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="relative">
                <div className="absolute -top-3 left-6 px-3 py-1 bg-white rounded-full text-xs font-bold" style={{ color: colors.accent, border: `2px solid ${colors.accent}` }}>
                  MOST POPULAR
                </div>
                <div className="bg-white rounded-xl shadow-lg border-2 transition-all hover:shadow-xl" style={{ borderColor: colors.accent }}>
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${colors.accent}20` }}>
                        <svg className="w-8 h-8" fill="none" stroke={colors.accent} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primaryDark }}>
                        Continue Personalising
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">Takes approximately 10-15 minutes</p>
                      <p className="text-gray-700">Make it uniquely theirs with personal touches</p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.bgLight }}>
                          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-3" style={{ backgroundColor: colors.accent + '30' }}>
                            <img 
                              src="https://cdn.prod.website-files.com/66c322edb04e041d40748187/683eeb9c94ad070a45a7bf20_tan-icon-talk.png" 
                              alt="Celebrant" 
                              className="w-7 h-7 object-contain"
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-700">Celebrant Choice</p>
                        </div>
                        <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.bgLight }}>
                          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-3" style={{ backgroundColor: colors.accent + '30' }}>
                            <img 
                              src="https://cdn.prod.website-files.com/66c322edb04e041d40748187/683eeb9dcbb9e36f90f43121_tan-icon-flower.png" 
                              alt="Flowers" 
                              className="w-7 h-7 object-contain"
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-700">Floral Tributes</p>
                        </div>
                        <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.bgLight }}>
                          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-3" style={{ backgroundColor: colors.accent + '30' }}>
                            <img 
                              src="https://cdn.prod.website-files.com/66c322edb04e041d40748187/683eeb9cbaf3e3066708e1da_tan-icon-tree.png" 
                              alt="Coffin" 
                              className="w-7 h-7 object-contain"
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-700">Coffin Selection</p>
                        </div>
                        <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.bgLight }}>
                          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-3" style={{ backgroundColor: colors.accent + '30' }}>
                            <img 
                              src="https://cdn.prod.website-files.com/66c322edb04e041d40748187/683eeb9c9120f0b561cd05b7_tan-icon-print.png" 
                              alt="Service Booklets" 
                              className="w-7 h-7 object-contain"
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-700">Service Booklets</p>
                        </div>
                        <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.bgLight }}>
                          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-3" style={{ backgroundColor: colors.accent + '30' }}>
                            <img 
                              src="https://cdn.prod.website-files.com/66c322edb04e041d40748187/683eeb9c8466d30e5221a842_tan-icon-cheese.png" 
                              alt="Catering" 
                              className="w-7 h-7 object-contain"
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-700">Catering</p>
                        </div>
                        <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.bgLight }}>
                          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-3" style={{ backgroundColor: colors.accent + '30' }}>
                            <img 
                              src="https://cdn.prod.website-files.com/66c322edb04e041d40748187/683eeb9c9120f0b561cd05b7_tan-icon-print.png" 
                              alt="Memorial Book" 
                              className="w-7 h-7 object-contain"
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-700">Memorial Book</p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={nextStep}
                          className="w-full py-4 rounded-lg font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-md"
                          style={{ backgroundColor: colors.primary }}
                        >
                          Continue Personalising
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 transition-all hover:shadow-xl">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: colors.bgLight }}>
                      <svg className="w-8 h-8" fill="none" stroke={colors.primaryDark} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primaryDark }}>
                      Complete With This Package
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">Proceed to summary</p>
                    <p className="text-gray-700">Everything essential is included</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold mb-3 text-gray-800">Your package includes:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                          <span className="text-gray-700">Professional funeral direction & care</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                          <span className="text-gray-700">All necessary paperwork & logistics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                          <span className="text-gray-700">Dignified coffin & service arrangements</span>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg p-4" style={{ backgroundColor: '#fff9e6', border: '1px solid #ffe082' }}>
                      <p className="text-sm text-gray-700">
                        <strong>Note:</strong> Our team will work with you during arrangement to finalise any additional details you'd like.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={skipToSummary}
                        className="w-full py-4 rounded-lg font-semibold transition-all hover:bg-gray-50 border-2"
                        style={{ 
                          borderColor: colors.primary,
                          color: colors.primaryDark 
                        }}
                      >
                        Complete Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600 pt-4">
              <p>✓ Prices locked in  ✓ No hidden fees  ✓ Change anytime before finalisation</p>
            </div>
          </div>
        );

      case 'serviceLeader':
        return (
          <div>
            <div className="flex items-center justify-center mb-6">
              <p className="text-gray-600 text-center">Choose who will guide the service and speak about your loved one</p>
              <HelpTooltip 
                content="A professional celebrant creates personalized ceremonies for all beliefs. Religious officiants conduct traditional faith-based services. Family-led services let loved ones speak directly from the heart. Services typically last 30-45 minutes."
              />
            </div>
            <div className="space-y-4">
              <div className="border-l-4 p-4 mb-6" style={{ backgroundColor: '#f5f1ed', borderColor: colors.accent }}>
                <p className="text-sm" style={{ color: colors.primaryDark }}>
                  <strong>Note:</strong> Prices shown are estimates and will be confirmed once your specific celebrant or officiant provides their fee.
                </p>
              </div>
              {serviceData.serviceLeaders.map((leader) => (
                <button
                  key={leader.id}
                  onClick={() => handleSelection('serviceLeader', leader)}
                  className={`w-full p-6 rounded-xl transition-all text-left ${
                    selections.serviceLeader?.id === leader.id
                      ? 'border-4 shadow-lg'
                      : 'border-2 hover:border-4 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: selections.serviceLeader?.id === leader.id ? colors.primary : '#d1d5db',
                    backgroundColor: selections.serviceLeader?.id === leader.id ? colors.bgLight : 'white'
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: colors.primaryDark }}>
                        {leader.name}
                      </h3>
                      <div className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
                        {formatPrice(leader.price)} {leader.price > 0 && <span className="text-base text-gray-500">(estimate)</span>}
                      </div>
                      <p className="text-gray-600 text-sm">{leader.description}</p>
                    </div>
                    {selections.serviceLeader?.id === leader.id && (
                      <Check className="w-6 h-6 flex-shrink-0" style={{ color: colors.primary }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'flowers':
        const flowerOptions = selections.needsMemorialHelp 
          ? serviceData.flowerPackagesMemorial
          : selections.package?.flowersIncluded 
            ? serviceData.flowerPackages 
            : serviceData.flowerPackagesUnattended;

        return (
          <div>
            <div className="flex items-center justify-center mb-6">
              <p className="text-gray-600 text-center">Flowers provide comfort and beauty during this difficult time</p>
              <HelpTooltip 
                content="Floral tributes honour your loved one and bring natural beauty to the service. We work with local florists to create fresh arrangements. You can choose a style now or work with your dedicated funeral planner later to create something unique."
              />
            </div>
            <div className="space-y-4">
              {selections.package?.flowersIncluded && !selections.needsMemorialHelp && (
                <div className="border-l-4 p-4 mb-6" style={{ backgroundColor: colors.bgLight, borderColor: colors.accent }}>
                  <p className="font-semibold mb-1" style={{ color: colors.primaryDark }}>
                    Your package includes an Essential Floral Tribute ($550 value)
                  </p>
                  <p className="text-gray-600 text-sm">
                    You can keep the included tribute or upgrade to a larger arrangement below.
                  </p>
                </div>
              )}
              {selections.needsMemorialHelp && (
                <div className="border-l-4 p-4 mb-6" style={{ backgroundColor: colors.bgLight, borderColor: colors.accent }}>
                  <p className="font-semibold mb-1" style={{ color: colors.primaryDark }}>
                    Memorial Service Floral Arrangements
                  </p>
                  <p className="text-gray-600 text-sm">
                    Choose a vase arrangement for your celebration space, or let your funeral planner help create exactly what you're envisioning.
                  </p>
                </div>
              )}
              {flowerOptions.map((flower) => (
                <button
                  key={flower.id}
                  onClick={() => handleSelection('flowers', flower)}
                  className={`w-full p-6 rounded-xl transition-all text-left ${
                    selections.flowers?.id === flower.id
                      ? 'border-4 shadow-lg'
                      : 'border-2 hover:border-4 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: selections.flowers?.id === flower.id ? colors.primary : '#d1d5db',
                    backgroundColor: selections.flowers?.id === flower.id ? colors.bgLight : 'white'
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold" style={{ color: colors.primaryDark }}>
                          {flower.name}
                        </h3>
                        {flower.isIncluded && (
                          <span className="px-3 py-1 text-xs font-bold rounded-full text-white" style={{ backgroundColor: colors.accent }}>
                            INCLUDED
                          </span>
                        )}
                        {flower.mostPopular && (
                          <span className="px-3 py-1 text-xs font-bold rounded-full text-white" style={{ backgroundColor: colors.accent }}>
                            MOST POPULAR
                          </span>
                        )}
                        {flower.upgrade && (
                          <span className="px-3 py-1 text-xs font-bold rounded-full text-white" style={{ backgroundColor: colors.primary }}>
                            UPGRADE
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{flower.description}</p>
                      {flower.totalPrice && (
                        <p className="text-xs text-gray-500 mb-2">Total: {formatPrice(flower.totalPrice)}</p>
                      )}
                      <div className="text-xl font-bold" style={{ color: colors.primary }}>
                        {flower.isCustom ? 'Price varies' : flower.price === 0 ? (flower.isIncluded ? 'Included' : 'Not needed') : formatPrice(flower.price)}
                      </div>
                      {flower.isCustom && (
                        <p className="text-xs text-gray-500 mt-1">We'll help coordinate exactly what you have in mind</p>
                      )}
                    </div>
                    {selections.flowers?.id === flower.id && (
                      <Check className="w-6 h-6 flex-shrink-0 ml-4" style={{ color: colors.primary }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'flowerStyle':
        return (
          <div>
            <div className="flex items-center justify-center mb-6">
              <p className="text-gray-600 text-center">Select a style that reflects your loved one's personality</p>
              <HelpTooltip 
                content="Each style creates a different feeling. White & Green is peaceful and classic. Roses convey deep love. Pastels are gentle and soothing. Wildflowers celebrate natural beauty. Bright arrangements celebrate a vibrant life. You can also create a custom design."
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {serviceData.flowerStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleSelection('flowerStyle', style)}
                  className={`p-6 rounded-xl transition-all text-left ${
                    selections.flowerStyle?.id === style.id
                      ? 'border-4 shadow-lg'
                      : 'border-2 hover:border-4 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: selections.flowerStyle?.id === style.id ? colors.primary : '#d1d5db',
                    backgroundColor: selections.flowerStyle?.id === style.id ? colors.bgLight : 'white'
                  }}
                >
                  {style.image && (
                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img 
                        src={style.image} 
                        alt={style.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<div class="text-center p-4"><div class="text-4xl mb-2">🌸</div><div class="text-sm text-gray-500">Image preview available on website</div></div>`;
                        }}
                      />
                    </div>
                  )}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: colors.primaryDark }}>
                        {style.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{style.description}</p>
                    </div>
                    {selections.flowerStyle?.id === style.id && (
                      <Check className="w-6 h-6 flex-shrink-0 ml-4" style={{ color: colors.primary }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'coffinCategory':
        const categories = [
          { id: 'eco_friendly', name: 'Eco-Friendly', description: 'Sustainable, biodegradable options', priceRange: '$0 - $2,524', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/68eb764adfbe5cdc01e694c6_Natural-Legacy.png' },
          { id: 'paper_veneer', name: 'Paper Veneer', description: 'Affordable, attractive finish', priceRange: '$510 - $1,585', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/675053f222c3dcf624d86ac8_Waverley-215x215.png' },
          { id: 'timber_veneer', name: 'Timber Veneer', description: 'Classic timber appearance', priceRange: '$1,482 - $2,518', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/6751782bcfff35b65dfcfa84_Norwood-Rosewood-215x215.png' },
          { id: 'solid_timber', name: 'Solid Timber', description: 'Premium solid wood', priceRange: '$2,381 - $3,861', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/67517924f0b60e189c6ee143_Blackwood-215x215.png' },
          { id: 'casket', name: 'Casket', description: 'Rectangular design, premium finish', priceRange: '$3,359 - $5,854', image: 'https://cdn.prod.website-files.com/66c322edb04e041d40748187/675179a5b3084b153c7fdd65_Grecian-Urn-Blackwood-215x215.png' }
        ];

        return (
          <div className="space-y-4">
            <div className="border-l-4 p-4 mb-6" style={{ backgroundColor: colors.bgLight, borderColor: colors.accent }}>
              <div className="flex items-start">
                <div className="flex-1">
                  <p className="font-semibold mb-1" style={{ color: colors.primaryDark }}>
                    Select a category to see the range
                  </p>
                  <p className="text-gray-600 text-sm">
                    Click on a category below to explore options. You can always return to this page to view other categories.
                  </p>
                </div>
                <HelpTooltip 
                  content="The main differences are in materials and construction. Eco-friendly options are biodegradable. Veneers offer beautiful finishes at lower prices. Solid timber provides traditional craftsmanship. Caskets differ from coffins in their rectangular shape."
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleSelection('coffinCategory', cat)}
                  className={`p-6 rounded-xl transition-all text-left ${
                    selections.coffinCategory?.id === cat.id
                      ? 'border-4 shadow-lg'
                      : 'border-2 hover:border-4 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: selections.coffinCategory?.id === cat.id ? colors.primary : '#d1d5db',
                    backgroundColor: selections.coffinCategory?.id === cat.id ? colors.bgLight : 'white'
                  }}
                >
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-32 h-32 mb-3 flex items-center justify-center bg-gray-50 rounded-lg">
                      <img 
                        src={cat.image} 
                        alt={cat.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="text-4xl">⚰️</div>';
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full justify-between">
                      <h3 className="text-lg font-bold" style={{ color: colors.primaryDark }}>
                        {cat.name}
                      </h3>
                      {selections.coffinCategory?.id === cat.id && (
                        <Check className="w-6 h-6 flex-shrink-0" style={{ color: colors.primary }} />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{cat.description}</p>
                  <div className="text-sm font-semibold" style={{ color: colors.primary }}>
                    {cat.priceRange}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    (upgrade cost from included coffin)
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'coffinSelection':
        const coffinCategory = selections.coffinCategory?.id;
        const coffins = coffinCategory ? serviceData.coffinOptions[coffinCategory] : [];

        return (
          <div className="space-y-4">
            <div className="border-l-4 p-4 mb-6" style={{ backgroundColor: colors.bgLight, borderColor: colors.accent }}>
              <p className="font-semibold mb-1" style={{ color: colors.primaryDark }}>
                Your package includes a Cardboard Fibreboard Coffin ($550 value)
              </p>
              <p className="text-gray-600 text-sm">
                Prices shown below are the additional cost to upgrade from the included coffin.
              </p>
            </div>
            {coffins.map((coffin) => (
              <button
                key={coffin.id}
                type="button"
                onClick={() => handleSelection('coffin', coffin)}
                className={`w-full p-6 rounded-xl transition-all text-left ${
                  selections.coffin?.id === coffin.id
                    ? 'border-4 shadow-lg'
                    : 'border-2 hover:border-4 hover:shadow-md'
                }`}
                style={{
                  borderColor: selections.coffin?.id === coffin.id ? colors.primary : '#d1d5db',
                  backgroundColor: selections.coffin?.id === coffin.id ? colors.bgLight : 'white'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-24 h-24 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors relative group"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Setting enlarged coffin:', coffin);
                      setEnlargedCoffin(coffin);
                    }}
                  >
                    <img 
                      src={coffin.image} 
                      alt={coffin.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="text-3xl">⚰️</div>';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold" style={{ color: colors.primaryDark }}>
                        {coffin.name}
                      </h3>
                      {coffin.isIncluded && (
                        <span className="px-3 py-1 text-xs font-bold rounded-full text-white" style={{ backgroundColor: colors.accent }}>
                          INCLUDED
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{coffin.description}</p>
                    <div className="flex items-baseline gap-2">
                      <div className="text-xl font-bold" style={{ color: colors.primary }}>
                        {coffin.price === 0 ? 'Included' : `+${formatPrice(coffin.price)}`}
                      </div>
                      <div className="text-sm text-gray-500">
                        (Total: {formatPrice(coffin.totalPrice)})
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Click image to enlarge</p>
                  </div>
                  {selections.coffin?.id === coffin.id && (
                    <Check className="w-6 h-6 flex-shrink-0 ml-4" style={{ color: colors.primary }} />
                  )}
                </div>
              </button>
            ))}

            {/* Enlarged Coffin Modal */}
            {enlargedCoffin && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
                style={{ zIndex: 9999 }}
                onClick={() => setEnlargedCoffin(null)}
              >
                <div 
                  className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 relative"
                  style={{ zIndex: 10000 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setEnlargedCoffin(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    style={{ zIndex: 10001 }}
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primaryDark }}>
                      {enlargedCoffin.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{enlargedCoffin.description}</p>
                    <div className="bg-gray-50 rounded-lg p-8 mb-4">
                      <img 
                        src={enlargedCoffin.image} 
                        alt={enlargedCoffin.name}
                        className="w-full h-auto max-h-96 object-contain mx-auto"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="text-6xl text-gray-400">⚰️<p class="text-lg mt-4">Image not available</p></div>';
                        }}
                      />
                    </div>
                    <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                      {enlargedCoffin.price === 0 ? 'Included' : `+${formatPrice(enlargedCoffin.price)}`}
                      <span className="text-base text-gray-500 ml-2">
                        (Total: {formatPrice(enlargedCoffin.totalPrice)})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'photographicTribute':
        return (
          <div>
            <div className="flex items-center justify-center mb-6">
              <p className="text-gray-600 text-center">Share precious memories through photos during the service</p>
              <HelpTooltip 
                content="A photo slideshow celebrates your loved one's life journey. The standard option plays during the service. The premium package includes an additional display for the refreshment area. We'll help you select and arrange photos to tell their story beautifully."
              />
            </div>
            <div className="space-y-4">
              {serviceData.photographicTributes.map((tribute) => (
                <button
                  key={tribute.id}
                  onClick={() => handleSelection('photographicTribute', tribute)}
                  className={`w-full p-6 rounded-xl transition-all text-left ${
                    selections.photographicTribute?.id === tribute.id
                      ? 'border-4 shadow-lg'
                      : 'border-2 hover:border-4 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: selections.photographicTribute?.id === tribute.id ? colors.primary : '#d1d5db',
                    backgroundColor: selections.photographicTribute?.id === tribute.id ? colors.bgLight : 'white'
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: colors.primaryDark }}>
                        {tribute.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{tribute.description}</p>
                      <div className="text-xl font-bold" style={{ color: colors.primary }}>
                        {tribute.price === 0 ? 'Not needed' : formatPrice(tribute.price)}
                      </div>
                    </div>
                    {selections.photographicTribute?.id === tribute.id && (
                      <Check className="w-6 h-6 flex-shrink-0 ml-4" style={{ color: colors.primary }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'printedMaterials':
        return (
          <div>
            <div className="flex items-center justify-center mb-6">
              <p className="text-gray-600 text-center">Create keepsakes for attendees to remember the service</p>
              <HelpTooltip 
                content="Service booklets guide attendees through the ceremony and become treasured keepsakes. Postcards and cards are perfect for sharing memories. Bookmarks offer a daily reminder. All materials include your loved one's photo and personalized text."
              />
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">Select all that apply:</p>
              {serviceData.printedMaterials.map((material) => {
                const isSelected = selections.printedMaterials.find(m => m.id === material.id);
                const isNoneSelected = selections.printedMaterials.find(m => m.id === 'none');
                
                return (
                  <div key={material.id}>
                    <button
                      onClick={() => {
                        if (material.id === 'none') {
                          if (isNoneSelected) {
                            setSelections(prev => ({
                              ...prev,
                              printedMaterials: prev.printedMaterials.filter(m => m.id !== 'none')
                            }));
                          } else {
                            setSelections(prev => ({
                              ...prev,
                              printedMaterials: [material],
                              printedMaterialsQuantities: {}
                            }));
                          }
                        } else {
                          handlePrintedMaterialToggle(material);
                          if (isNoneSelected) {
                            setSelections(prev => ({
                              ...prev,
                              printedMaterials: prev.printedMaterials.filter(m => m.id !== 'none')
                            }));
                          }
                        }
                      }}
                      disabled={isNoneSelected && material.id !== 'none'}
                      className={`w-full p-6 rounded-xl transition-all text-left ${
                        isSelected
                          ? 'border-4 shadow-lg'
                          : 'border-2 hover:border-4 hover:shadow-md'
                      } ${isNoneSelected && material.id !== 'none' ? 'opacity-50' : ''}`}
                      style={{
                        borderColor: isSelected ? colors.primary : '#d1d5db',
                        backgroundColor: isSelected ? colors.bgLight : 'white'
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded">
                          <img 
                            src={material.image} 
                            alt={material.name}
                            className="w-full h-full object-contain rounded"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = '<div class="text-2xl">📄</div>';
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold" style={{ color: colors.primaryDark }}>
                              {material.name}
                            </h3>
                            {material.mostPopular && (
                              <span className="px-3 py-1 text-xs font-bold rounded-full text-white" style={{ backgroundColor: colors.accent }}>
                                Most Popular
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{material.description}</p>
                          {material.baseQuantity && material.price > 0 && (
                            <p className="text-sm text-gray-500 mb-2">
                              Base price for {material.baseQuantity}: {formatPrice(material.price)}
                            </p>
                          )}
                          {material.price > 0 && !material.baseQuantity && (
                            <div className="text-xl font-bold" style={{ color: colors.primary }}>
                              {formatPrice(material.price)}
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <Check className="w-6 h-6 flex-shrink-0 ml-4" style={{ color: colors.primary }} />
                        )}
                      </div>
                    </button>

                    {isSelected && material.baseQuantity && material.id !== 'none' && (
                      <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: colors.bgLight }}>
                        <label className="block mb-2 text-sm font-semibold text-gray-700 text-center">
                          How many would you like? (minimum {material.baseQuantity})
                        </label>
                        <input
                          type="number"
                          min={material.baseQuantity}
                          step="10"
                          value={selections.printedMaterialsQuantities[material.id] || material.baseQuantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || material.baseQuantity;
                            handlePrintedMaterialQuantity(material.id, value);
                          }}
                          onBlur={(e) => {
                            const value = parseInt(e.target.value) || material.baseQuantity;
                            if (value < material.baseQuantity) {
                              handlePrintedMaterialQuantity(material.id, material.baseQuantity);
                            }
                          }}
                          className="w-full p-4 text-2xl text-center border-2 rounded-lg focus:outline-none"
                          style={{ borderColor: colors.primary }}
                          placeholder={material.baseQuantity.toString()}
                        />
                        <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'white' }}>
                          <p className="text-center text-gray-600 mb-2">Total cost for {selections.printedMaterialsQuantities[material.id] || material.baseQuantity} items:</p>
                          <p className="text-center text-3xl font-bold" style={{ color: colors.primary }}>
                            {formatPrice((material.price / material.baseQuantity) * (selections.printedMaterialsQuantities[material.id] || material.baseQuantity))}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'announcements':
        return (
          <div>
            <div className="flex items-center justify-center mb-6">
              <p className="text-gray-600 text-center">Let friends and family know about the service</p>
              <HelpTooltip 
                content="Online tributes and Facebook images are included free and can be shared easily. Newspaper notices reach those who may not use digital platforms - costs vary by publication and length. We'll help you write a meaningful announcement."
              />
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">Select all that apply:</p>
              {serviceData.announcements.map((announcement) => (
                <button
                  key={announcement.id}
                  onClick={() => handleAnnouncementToggle(announcement)}
                  className={`w-full p-6 rounded-xl transition-all text-left ${
                    selections.announcements.find(a => a.id === announcement.id)
                      ? 'border-4 shadow-lg'
                      : 'border-2 hover:border-4 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: selections.announcements.find(a => a.id === announcement.id) ? colors.primary : '#d1d5db',
                    backgroundColor: selections.announcements.find(a => a.id === announcement.id) ? colors.bgLight : 'white'
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold" style={{ color: colors.primaryDark }}>
                          {announcement.name}
                        </h3>
                        {announcement.included && (
                          <span className="px-2 py-1 text-xs font-semibold rounded" style={{ backgroundColor: colors.accent, color: 'white' }}>
                            Included
                          </span>
                        )}
                      </div>
                      {announcement.description && (
                        <p className="text-gray-600 text-sm mb-2">{announcement.description}</p>
                      )}
                      <div className="text-xl font-bold" style={{ color: colors.primary }}>
                        {announcement.included || announcement.price === 0 ? 'Included' : formatPrice(announcement.price)}
                      </div>
                    </div>
                    {selections.announcements.find(a => a.id === announcement.id) && (
                      <Check className="w-6 h-6 flex-shrink-0 ml-4" style={{ color: colors.primary }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'cateringPackage':
        return (
          <div>
            <div className="flex items-center justify-center mb-6">
              <p className="text-gray-600 text-center">Gather together over refreshments after the service</p>
              <HelpTooltip 
                content="Sharing food brings comfort and connection. Drop-off service provides food in disposable containers. Staffed service includes setup, serving, and tea/coffee station. Premium options include a chef on-site. Most gatherings last 1-2 hours."
              />
            </div>
            <div className="space-y-6">
              {serviceData.cateringPackages.map(option => (
                <div key={option.id}>
                  <button
                    onClick={() => handleSelection('cateringPackage', option)}
                    className={`w-full p-6 rounded-lg border-2 transition-all text-left hover:shadow-lg ${
                      selections.cateringPackage?.id === option.id ? 'bg-green-50' : 'border-gray-200'
                    }`}
                    style={{
                      borderColor: selections.cateringPackage?.id === option.id ? colors.primary : undefined,
                      backgroundColor: selections.cateringPackage?.id === option.id ? colors.bgLight : undefined
                    }}
                  >
                    {selections.cateringPackage?.id === option.id && (
                      <Check className="w-6 h-6 mb-3" style={{ color: colors.primary }} />
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{option.name}</h3>
                      {option.chefOnSite && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: colors.accent, color: 'white' }}>
                          CHEF ON SITE
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 font-medium text-sm mb-1">{option.description}</p>
                    {option.serviceLevel && (
                      <p className="text-gray-600 text-sm mb-3 italic">{option.serviceLevel}</p>
                    )}
                    <div style={{ color: colors.primary }}>
                      {option.id === 'none' ? (
                        <p className="text-xl font-bold">No catering</p>
                      ) : option.staffedOnly ? (
                        <p className="text-xl font-bold">{formatPrice(option.price)} per person</p>
                      ) : (
                        <div>
                          <p className="text-sm">Drop-off: {formatPrice(option.priceDropOff)}/person</p>
                          <p className="text-sm">With staff: {formatPrice(option.priceStaffed)}/person</p>
                        </div>
                      )}
                    </div>
                  </button>

                  {selections.cateringPackage?.id === option.id && option.id !== 'none' && (
                    <div className="mt-4 p-6 bg-white rounded-lg border-2" style={{ borderColor: colors.primary }}>
                      {!option.staffedOnly && (
                        <div className="mb-6">
                          <h4 className="font-semibold mb-4 text-center">Service Type</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {serviceData.cateringServiceTypes.map(type => (
                              <button
                                key={type.id}
                                onClick={() => handleSelection('cateringServiceType', type, true)}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                  selections.cateringServiceType?.id === type.id ? 'bg-green-50' : 'border-gray-200'
                                }`}
                                style={{
                                  borderColor: selections.cateringServiceType?.id === type.id ? colors.primary : undefined,
                                  backgroundColor: selections.cateringServiceType?.id === type.id ? colors.bgLight : undefined
                                }}
                              >
                                {selections.cateringServiceType?.id === type.id && (
                                  <Check className="w-5 h-5 mb-2" style={{ color: colors.primary }} />
                                )}
                                <p className="font-semibold text-sm mb-1">{type.name}</p>
                                <p className="text-xs text-gray-600">{type.description}</p>
                                <p className="text-sm font-bold mt-2" style={{ color: colors.primary }}>
                                  {formatPrice(type.id === 'staffed' ? option.priceStaffed : option.priceDropOff)}/person
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-4 text-center">Number of Guests (minimum 30)</h4>
                        <input
                          type="number"
                          min="30"
                          value={selections.cateringGuests || 30}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 30;
                            handleSelection('cateringGuests', value, true);
                          }}
                          onBlur={(e) => {
                            const value = parseInt(e.target.value) || 30;
                            if (value < 30) {
                              handleSelection('cateringGuests', 30, true);
                            }
                          }}
                          className="w-full p-4 text-2xl text-center border-2 rounded-lg focus:outline-none"
                          style={{ borderColor: colors.primary }}
                          placeholder="30"
                        />
                        {selections.cateringGuests >= 30 && (option.staffedOnly || selections.cateringServiceType) && (
                          <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: colors.bgLight }}>
                            <p className="text-center text-gray-600 mb-2">Estimated catering cost:</p>
                            <p className="text-center text-3xl font-bold" style={{ color: colors.primary }}>
                              {formatPrice((() => {
                                const price = option.staffedOnly 
                                  ? option.price 
                                  : selections.cateringServiceType?.id === 'staffed' 
                                    ? option.priceStaffed 
                                    : option.priceDropOff;
                                return price * selections.cateringGuests;
                              })())}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'memorialBook':
        return (
          <div>
            <div className="flex items-center justify-center mb-6">
              <p className="text-gray-600 text-center">Create a lasting record of attendees and their messages</p>
              <HelpTooltip 
                content="A memorial book becomes a treasured keepsake. Guests sign their names and can leave personal messages. The book includes photos from your photographic tribute. Choose a colour that resonates with your loved one's personality."
              />
            </div>
            <div className="space-y-4">
              <div className="border-l-4 p-4 mb-6" style={{ backgroundColor: colors.bgLight, borderColor: colors.accent }}>
                <p className="font-semibold mb-1" style={{ color: colors.primaryDark }}>
                  What's Included
                </p>
                <p className="text-gray-600 text-sm">
                  A cloth-bound guest attendance book featuring an elegant embossed cover with "In Loving Memory" and includes all photos from your photo tribute. Choose the colour that best reflects your loved one's story.
                </p>
              </div>
              {serviceData.memorialBooks.map((book) => (
                <button
                  key={book.id}
                  onClick={() => handleSelection('memorialBook', book)}
                  className={`w-full p-6 rounded-xl transition-all text-left ${
                    selections.memorialBook?.id === book.id
                      ? 'border-4 shadow-lg'
                      : 'border-2 hover:border-4 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: selections.memorialBook?.id === book.id ? colors.primary : '#d1d5db',
                    backgroundColor: selections.memorialBook?.id === book.id ? colors.bgLight : 'white'
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: colors.primaryDark }}>
                        {book.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{book.description}</p>
                      <div className="text-xl font-bold" style={{ color: colors.primary }}>
                        {book.price === 0 ? 'Not needed' : formatPrice(book.price)}
                      </div>
                    </div>
                    {selections.memorialBook?.id === book.id && (
                      <Check className="w-6 h-6 flex-shrink-0 ml-4" style={{ color: colors.primary }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'summary':
        const total = calculateTotal();
        
        return (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{ color: colors.primaryDark }}>
                Your Service Details
              </h3>
              
              <div className="space-y-4">
                {selections.dispositionType && (
                  <div className="pb-4 border-b">
                    <div className="font-semibold text-gray-700 mb-1">Service Type</div>
                    <div className="text-gray-600 capitalize">
                      {selections.dispositionType} - {
                        selections.serviceStyle === 'unattended' ? 'No Formal Service' :
                        selections.serviceStyle === 'cemetery' ? 'Cemetery Chapel' :
                        selections.serviceStyle === 'graveside' ? 'Graveside Gathering' :
                        'Unique Venue'
                      }
                    </div>
                  </div>
                )}

                {selections.package && (
                  <div className="pb-4 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-gray-700">{selections.package.name}</div>
                        <div className="text-sm text-gray-600">{selections.package.description}</div>
                      </div>
                      <div className="font-bold" style={{ color: colors.primary }}>
                        {formatPrice(selections.package.price)}
                      </div>
                    </div>
                  </div>
                )}

                {selections.memorialCoordinationFee && (
                  <div className="pb-4 border-b">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-gray-700">Memorial Coordination</div>
                      <div className="font-bold" style={{ color: colors.primary }}>
                        {formatPrice(selections.memorialCoordinationFee.price)}
                      </div>
                    </div>
                  </div>
                )}

                {selections.serviceLeader && selections.serviceLeader.price > 0 && (
                  <div className="pb-4 border-b">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-gray-700">{selections.serviceLeader.name}</div>
                      <div className="font-bold" style={{ color: colors.primary }}>
                        {formatPrice(selections.serviceLeader.price)}
                      </div>
                    </div>
                  </div>
                )}

                {selections.flowers && selections.flowers.id !== 'none' && (
                  <div className="pb-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-gray-700">{selections.flowers.name}</div>
                        {selections.flowerStyle && (
                          <div className="text-sm text-gray-600">{selections.flowerStyle.name}</div>
                        )}
                        {selections.flowers.isCustom && (
                          <div className="text-sm text-gray-600 italic">Price to be confirmed with your planner</div>
                        )}
                      </div>
                      <div className="font-bold" style={{ color: colors.primary }}>
                        {selections.flowers.isCustom ? 'TBC' : formatPrice(selections.flowers.price)}
                      </div>
                    </div>
                  </div>
                )}

                {selections.coffin && selections.coffin.price > 0 && (
                  <div className="pb-4 border-b">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-gray-700">{selections.coffin.name}</div>
                      <div className="font-bold" style={{ color: colors.primary }}>
                        +{formatPrice(selections.coffin.price)}
                      </div>
                    </div>
                  </div>
                )}

                {selections.photographicTribute && selections.photographicTribute.price > 0 && (
                  <div className="pb-4 border-b">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-gray-700">{selections.photographicTribute.name}</div>
                      <div className="font-bold" style={{ color: colors.primary }}>
                        {formatPrice(selections.photographicTribute.price)}
                      </div>
                    </div>
                  </div>
                )}

                {selections.printedMaterials && selections.printedMaterials.length > 0 && (
                  <div className="pb-4 border-b">
                    <div className="font-semibold text-gray-700 mb-2">Printed Materials</div>
                    {selections.printedMaterials.map(material => {
                      if (material.id === 'none' || material.price === 0) {
                        return (
                          <div key={material.id} className="text-gray-600 text-sm">
                            {material.name}
                          </div>
                        );
                      }
                      
                      const quantity = selections.printedMaterialsQuantities[material.id] || material.baseQuantity || 0;
                      const itemTotal = material.baseQuantity 
                        ? (material.price / material.baseQuantity) * quantity
                        : material.price;
                      
                      return (
                        <div key={material.id} className="flex justify-between items-start mb-2">
                          <div>
                            <div className="text-gray-700">{material.name}</div>
                            {material.baseQuantity && (
                              <div className="text-sm text-gray-600">
                                Quantity: {quantity}
                              </div>
                            )}
                          </div>
                          <div className="font-bold" style={{ color: colors.primary }}>
                            {formatPrice(itemTotal)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {selections.cateringPackage && selections.cateringPackage.id !== 'none' && (
                  <div className="pb-4 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-gray-700">{selections.cateringPackage.name} Catering</div>
                        {selections.cateringServiceType && (
                          <div className="text-sm text-gray-600">{selections.cateringServiceType.name}</div>
                        )}
                        <div className="text-sm text-gray-600">
                          {selections.cateringGuests} guests
                        </div>
                      </div>
                      <div className="font-bold" style={{ color: colors.primary }}>
                        {formatPrice(
                          (selections.cateringPackage.staffedOnly 
                            ? selections.cateringPackage.price 
                            : selections.cateringServiceType?.id === 'staffed' 
                              ? selections.cateringPackage.priceStaffed 
                              : selections.cateringPackage.priceDropOff
                          ) * selections.cateringGuests
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selections.memorialBook && selections.memorialBook.price > 0 && (
                  <div className="pb-4 border-b">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-gray-700">Memorial Book - {selections.memorialBook.name}</div>
                      <div className="font-bold" style={{ color: colors.primary }}>
                        {formatPrice(selections.memorialBook.price)}
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold" style={{ color: colors.primaryDark }}>
                      Total Estimate
                    </div>
                    <div className="text-3xl font-bold" style={{ color: colors.primary }}>
                      {formatPrice(total)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    This is an estimate. Final pricing will be confirmed once all details are finalised.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.primaryDark }}>
                Ready to take the next step?
              </h3>
              <p className="text-gray-600 mb-6">
                Our compassionate team is here to help guide you through this process and answer any questions you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="flex-1 py-4 px-6 rounded-lg font-semibold text-center transition-colors text-white hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Mail className="w-5 h-5" />
                  Email This Summary
                </button>
                <a
                  href="tel:1300788881"
                  className="flex-1 py-4 px-6 rounded-lg font-semibold text-center transition-colors border-2 hover:bg-gray-50"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Call 1300 788 881
                </a>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={designerTopRef} className="min-h-screen py-8 px-4" style={{ background: `linear-gradient(to bottom, ${colors.bgLight}, ${colors.bgMedium})` }}>
      {/* Save Progress Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowSaveModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primaryDark }}>
              Your Progress Has Been Saved
            </h3>
            <p className="text-gray-600 mb-6">
              Use this code to continue where you left off:
            </p>
            <div className="bg-gray-100 rounded-lg p-6 text-center mb-6">
              <div className="text-3xl font-bold tracking-widest mb-2" style={{ color: colors.primary }}>
                {savedCode}
              </div>
              <p className="text-xs text-gray-500">Write this down or copy it</p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Save this code</strong> - you'll need it to resume your progress. 
            </p>
            <button
              onClick={() => {
                // Try modern clipboard API first
                if (navigator.clipboard && window.isSecureContext) {
                  navigator.clipboard.writeText(savedCode)
                    .then(() => {
                      // Change button text temporarily to show success
                      const button = event.target;
                      const originalText = button.textContent;
                      button.textContent = 'Copied!';
                      button.style.backgroundColor = colors.primaryDark;
                      setTimeout(() => {
                        button.textContent = originalText;
                        button.style.backgroundColor = colors.primary;
                      }, 2000);
                    })
                    .catch(() => {
                      // Fallback to selection method
                      const textArea = document.createElement('textarea');
                      textArea.value = savedCode;
                      textArea.style.position = 'fixed';
                      textArea.style.left = '-999999px';
                      document.body.appendChild(textArea);
                      textArea.select();
                      try {
                        document.execCommand('copy');
                        const button = event.target;
                        const originalText = button.textContent;
                        button.textContent = 'Copied!';
                        button.style.backgroundColor = colors.primaryDark;
                        setTimeout(() => {
                          button.textContent = originalText;
                          button.style.backgroundColor = colors.primary;
                        }, 2000);
                      } catch (err) {
                        console.error('Copy failed:', err);
                      }
                      document.body.removeChild(textArea);
                    });
                } else {
                  // Fallback for older browsers
                  const textArea = document.createElement('textarea');
                  textArea.value = savedCode;
                  textArea.style.position = 'fixed';
                  textArea.style.left = '-999999px';
                  document.body.appendChild(textArea);
                  textArea.select();
                  try {
                    document.execCommand('copy');
                    const button = event.target;
                    const originalText = button.textContent;
                    button.textContent = 'Copied!';
                    button.style.backgroundColor = colors.primaryDark;
                    setTimeout(() => {
                      button.textContent = originalText;
                      button.style.backgroundColor = colors.primary;
                    }, 2000);
                  } catch (err) {
                    console.error('Copy failed:', err);
                  }
                  document.body.removeChild(textArea);
                }
              }}
              className="w-full py-3 rounded-lg font-semibold text-white transition-all"
              style={{ backgroundColor: colors.primary }}
            >
              Copy Code
            </button>
          </div>
        </div>
      )}

      {/* Load Progress Modal */}
      {showLoadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowLoadModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primaryDark }}>
              Continue Your Progress
            </h3>
            <p className="text-gray-600 mb-6">
              Enter your saved code to continue where you left off:
            </p>
            <input
              type="text"
              id="loadCode"
              placeholder="Enter your code"
              className="w-full p-4 text-2xl text-center uppercase border-2 rounded-lg mb-4"
              style={{ borderColor: colors.primaryLight }}
              maxLength="8"
            />
            <button
              onClick={() => {
                const code = document.getElementById('loadCode').value;
                if (loadFromCode(code)) {
                  setShowLoadModal(false);
                } else {
                  alert('Invalid code. Please check and try again.');
                }
              }}
              className="w-full py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: colors.primary }}
            >
              Load Progress
            </button>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primaryDark }}>
              Get Your Service Summary
            </h3>
            <p className="text-gray-600 mb-6">
              We'll email you a detailed summary of your selections and our team will be in touch shortly.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full p-3 border-2 rounded-lg"
                  style={{ borderColor: colors.primaryLight }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full p-3 border-2 rounded-lg"
                  style={{ borderColor: colors.primaryLight }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border-2 rounded-lg"
                  style={{ borderColor: colors.primaryLight }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-3 border-2 rounded-lg"
                  style={{ borderColor: colors.primaryLight }}
                />
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="mt-1"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-600">
                  Keep me connected with Candour's community stories, sustainability wins, and the moments that remind us life is worth celebrating
                </label>
              </div>
              <button
                onClick={() => {
                  const firstName = document.getElementById('firstName').value;
                  const lastName = document.getElementById('lastName').value;
                  const email = document.getElementById('email').value;
                  const phone = document.getElementById('phone').value;
                  const newsletter = document.getElementById('newsletter').checked;
                  
                  if (!firstName || !lastName || !email || !phone) {
                    alert('Please fill in all required fields');
                    return;
                  }
                  
                  handleEmailSubmit({ firstName, lastName, email, phone, newsletter });
                }}
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg font-semibold text-white transition-colors disabled:opacity-50"
                style={{ backgroundColor: colors.primary }}
              >
                {isSubmitting ? 'Sending...' : 'Send Me My Summary'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: colors.primaryDark }}>
            Candour Funerals
          </h1>
          <p className="text-xl text-gray-600">Service Designer</p>
          <p className="text-sm text-gray-500 mt-2">
            Tailored • Seamless • Exceptional
          </p>
          
          {/* Continue Previous Progress */}
          {step === 0 && (
            <div className="mt-4">
              <button
                onClick={() => setShowLoadModal(true)}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Have a saved code? Continue where you left off
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm font-semibold text-gray-600">
                {currentStep.title}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => {
                  const code = generateSaveCode();
                  setSavedCode(code);
                  setShowSaveModal(true);
                }}
                className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded border hover:bg-gray-50"
                style={{ borderColor: colors.primary, color: colors.primaryDark }}
              >
                Save
              </button>
              <span className="text-xs sm:text-sm font-semibold text-gray-600">
                {Math.round(((step + 1) / filteredSteps.length) * 100)}% Complete
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-300"
              style={{ 
                width: `${((step + 1) / filteredSteps.length) * 100}%`,
                backgroundColor: colors.primary
              }}
            />
          </div>
          
          {/* Skip to summary option - always visible except on first step and summary */}
          {step > 0 && currentStep.id !== 'summary' && (
            <div className="mt-4 text-center">
              <button
                onClick={skipToSummary}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Skip remaining questions and go to summary
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: colors.primaryDark }}>
            {currentStep.title}
          </h2>
          <p className="text-gray-600 mb-8">{currentStep.subtitle}</p>
          
          {renderStepContent()}
        </div>

        <div ref={navigationRef} className="flex justify-between items-center gap-4">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: step === 0 ? colors.bgMedium : 'white',
              color: colors.primaryDark,
              border: `2px solid ${colors.primary}`
            }}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          {currentStep.id !== 'summary' ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.primary }}
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-32"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FuneralServiceCalculator;
