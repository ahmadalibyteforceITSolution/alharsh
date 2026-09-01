const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Product = require('../models/Product');
const Category = require('../models/Category');
const Banner = require('../models/Banner');
const Coupon = require('../models/Coupon');
const Admin = require('../models/Admin');
const Order = require('../models/Order');

const categoriesData = [
  {
    name: 'Sanitary',
    slug: 'sanitary',
    icon: 'Droplet',
    badge: 'Popular & Tested',
    description: 'Premium bathroom fittings, commodes, wash basins, PPRC/UPVC pipes, and luxury shower systems.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    displayOrder: 1,
    subcategories: [
      { name: 'Wash Basins & Sinks', slug: 'wash-basins-sinks', description: 'Countertop, vanity, and pedestal wash basins' },
      { name: 'Commodes / Toilets', slug: 'commodes-toilets', description: 'One-piece, wall-hung, and smart commode suites' },
      { name: 'Bathroom Fittings & Taps', slug: 'bathroom-fittings-taps', description: 'Brass basin mixers, bib cocks, concealed valves' },
      { name: 'Showers & Shower Sets', slug: 'showers-shower-sets', description: 'Rain showers, telephone showers, thermostat panels' },
      { name: 'Bathroom Accessories', slug: 'bathroom-accessories', description: 'Towel racks, soap holders, mirrors, paper holders' },
      { name: 'Pipes & Fittings (PPRC & PVC)', slug: 'pipes-fittings-pvc-ppr', description: 'PN20/PN25 hot & cold pipes, elbows, tees, sockets' },
      { name: 'Water Tanks & Accessories', slug: 'water-tanks-accessories', description: 'Multi-layer anti-bacterial tanks, ball valves, floats' }
    ]
  },
  {
    name: 'Electrical',
    slug: 'electrical',
    icon: 'Zap',
    badge: 'Certified Copper',
    description: '99.99% pure copper cables, distribution boards, MCBs, designer switches, and energy-efficient LED lighting.',
    image: 'https://images.unsplash.com/photo-1558441719-f70e944f336f?auto=format&fit=crop&w=800&q=80',
    displayOrder: 2,
    subcategories: [
      { name: 'Wires & Cables', slug: 'wires-cables', description: 'Single core, 3-core flexible, armoured & solar cables' },
      { name: 'Switches & Sockets', slug: 'switches-sockets', description: 'Luxury acrylic piano switches, gang plates, smart sockets' },
      { name: 'Circuit Breakers & DBs', slug: 'circuit-breakers-dbs', description: 'Single/Double/3-Pole MCBs, MCCBs, distribution boxes' },
      { name: 'Lighting & LEDs', slug: 'lighting-leds', description: 'SMD panel lights, COB downlights, LED flood lights' },
      { name: 'Fans & Ventilation', slug: 'fans-ventilation', description: 'Inverter ceiling fans, high-velocity exhaust fans' },
      { name: 'Electrical Tools & Accessories', slug: 'electrical-tools-accessories', description: 'Multimeters, PVC conduits, junction boxes, tapes' }
    ]
  },
  {
    name: 'Hardware',
    slug: 'hardware',
    icon: 'Wrench',
    badge: 'Industrial Grade',
    description: 'Heavy duty power tools, hand tools, security locks, architectural door hinges, and high-strength fasteners.',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    displayOrder: 3,
    subcategories: [
      { name: 'Hand Tools', slug: 'hand-tools', description: 'Hammers, screwdrivers, pipe wrenches, pliers, measuring tapes' },
      { name: 'Power Tools', slug: 'power-tools', description: 'Impact drills, angle grinders, marble cutters, blowers' },
      { name: 'Locks, Hinges & Door Fittings', slug: 'locks-hinges-door-fittings', description: 'Heavy mortise locks, stainless steel hinges, door handles' },
      { name: 'Nails, Screws, Bolts & Fasteners', slug: 'fasteners-screws-bolts', description: 'Anchor expansion bolts, drywall screws, rawal plugs' },
      { name: 'Paints, Adhesives & Chemicals', slug: 'paints-adhesives-chemicals', description: 'Silicone sealants, PVC solvent cement, anti-rust sprays' },
      { name: 'General Hardware & Construction Supplies', slug: 'general-hardware', description: 'Safety helmets, wire mesh, wheelbarrows, tarpaulins' }
    ]
  }
];

const productsData = [
  // --- SANITARY PRODUCTS ---
  {
    name: 'Popular Standard PPRC Pipe PN-20 (32mm x 4m)',
    sku: 'ALH-SAN-001',
    category: 'Sanitary',
    subcategory: 'Pipes & Fittings (PPRC & PVC)',
    brand: 'Popular Pipes Group',
    price: 1850,
    salePrice: 1650,
    stock: 250,
    unit: 'Length (4m)',
    featured: true,
    bestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'High-pressure PN-20 PPRC pipe manufactured from 100% virgin European raw material for hot and cold plumbing.',
    description: 'Designed specifically for heavy-duty domestic, commercial, and industrial plumbing. Popular PPRC pipes offer superior resistance against high temperature (up to 95°C), high pressure (PN-20), corrosion, and scale buildup.',
    specifications: [
      { label: 'Outer Diameter', value: '32 mm (1 Inch)' },
      { label: 'Pressure Rating', value: 'PN-20 (20 Bar)' },
      { label: 'Standard Length', value: '4 Meters' },
      { label: 'Material', value: '100% Virgin PPRC Type-3' },
      { label: 'Standard Compliance', value: 'DIN 8077 / 8078 & ISO 15874' },
      { label: 'Expected Life', value: '50+ Years' },
      { label: 'Color', value: 'Forest Green with Red Striping' }
    ],
    features: ['Zero scaling & calcification', 'Heat resistance up to 95°C', 'High chemical & corrosion resistance', 'Seamless fusion welded joints', 'Non-toxic & drinking water safe'],
    tags: ['pprc', 'pipe', 'popular', 'plumbing', 'sanitary'],
    isActive: true
  },
  {
    name: 'Heavy Brass Luxury Basin Mixer Tap - Chrome Finish',
    sku: 'ALH-SAN-002',
    category: 'Sanitary',
    subcategory: 'Bathroom Fittings & Taps',
    brand: 'Sonex Luxury',
    price: 8500,
    salePrice: 7650,
    stock: 45,
    unit: 'Set',
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Solid brass single-lever wash basin mixer with multi-layer mirror chrome electroplating and ceramic cartridge.',
    description: 'Crafted from virgin A-grade solid brass ingot, this luxury basin mixer features ultra-smooth ceramic disc cartridges tested for over 500,000 cycles. Comes with complete SS 304 braided connection pipes and brass fittings.',
    specifications: [
      { label: 'Material', value: 'Solid High-Grade Brass' },
      { label: 'Finish', value: 'Triple Chrome Electroplated' },
      { label: 'Cartridge Type', value: '35mm Ceramic Disc Cartridge' },
      { label: 'Inlet Connectors', value: '1/2 Inch Stainless Steel Braided' },
      { label: 'Warranty', value: '5 Years Leakage Warranty' }
    ],
    features: ['Sedal ceramic core', 'Smooth single lever temperature & flow control', 'Includes hot & cold SS hoses', 'Water-saving honeycomb aerator'],
    tags: ['tap', 'faucet', 'basin mixer', 'sanitary', 'brass'],
    isActive: true
  },
  {
    name: 'Smart One-Piece Rimless Tornado Flush Commode',
    sku: 'ALH-SAN-003',
    category: 'Sanitary',
    subcategory: 'Commodes / Toilets',
    brand: 'Master Sanitary',
    price: 24500,
    salePrice: 22000,
    stock: 18,
    unit: 'Piece',
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 16,
    images: [
      'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Ultra-modern one-piece toilet with high glazed ceramic, rimless dual cyclone flush, and soft-closing seat.',
    description: 'Engineered for luxury bathrooms, this commode features nano-antibacterial glaze preventing stains and bacterial growth. Powerful dual-flush system uses only 3L/4.5L of water per flush with 360-degree rimless swirl action.',
    specifications: [
      { label: 'Flush Type', value: 'Tornado Rimless Dual-Flush (3L/4.5L)' },
      { label: 'Roughing-in', value: 'S-Trap 250mm / 300mm' },
      { label: 'Glaze Technology', value: 'Nano Anti-Stain Ceramic Glaze' },
      { label: 'Seat Cover', value: 'Heavy Duty UF Soft Close Quick Release' },
      { label: 'Dimensions', value: '680 x 370 x 780 mm' }
    ],
    features: ['Rimless hygiene design', 'Dual flush water saving', 'Soft close heavy seat', 'Anti-clog large trapway'],
    tags: ['commode', 'toilet', 'sanitary', 'master'],
    isActive: true
  },
  {
    name: 'Thermostatic Rainfall Shower System with Hand Shower',
    sku: 'ALH-SAN-004',
    category: 'Sanitary',
    subcategory: 'Showers & Shower Sets',
    brand: 'Sonex Luxury',
    price: 18900,
    salePrice: 16500,
    stock: 22,
    unit: 'Set',
    featured: false,
    bestSeller: true,
    isNewArrival: false,
    rating: 4.7,
    reviewsCount: 21,
    images: [
      'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Exquisite 10-inch ultra-thin rainfall overhead shower with adjustable height riser rail and brass handheld spray.',
    description: 'Transform your bathroom into a 5-star spa experience. Features constant water temperature thermostatic mixer body, silicone anti-lime scale nozzles, and high-pressure air-injection rainfall.',
    specifications: [
      { label: 'Shower Head Size', value: '10 Inch (250mm)' },
      { label: 'Shower Arm Material', value: 'SUS 304 Stainless Steel' },
      { label: 'Valve Body', value: 'Solid Brass Diverter Valve' },
      { label: 'Hose Length', value: '1.5m Anti-Tangle Stainless Steel' }
    ],
    features: ['10-inch wide rainfall coverage', 'Anti-limescale silicone jets', '3-mode handheld shower wand', 'Adjustable height wall mount'],
    tags: ['shower', 'rainfall', 'sanitary', 'bathroom'],
    isActive: true
  },
  {
    name: '3-Layer Antibacterial Water Storage Tank (500 Gallons)',
    sku: 'ALH-SAN-005',
    category: 'Sanitary',
    subcategory: 'Water Tanks & Accessories',
    brand: 'Popular Pipes Group',
    price: 32000,
    salePrice: 29500,
    stock: 12,
    unit: 'Tank',
    featured: false,
    bestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 14,
    images: [
      'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Triple-layer 100% virgin food-grade polymer water tank with UV sun protection and silver-ion antibacterial inner layer.',
    description: 'Popular water tanks are manufactured using state-of-the-art rotational moulding technology. 3 specialized layers ensure algae-free, hygienic, and temperature-controlled water in all seasons.',
    specifications: [
      { label: 'Capacity', value: '500 Gallons (~2,270 Liters)' },
      { label: 'Layers', value: '3-Layer (UV Outer, Insulated Core, Antibacterial Inner)' },
      { label: 'Material', value: '100% Virgin LLDPE Polymer' },
      { label: 'Warranty', value: '10 Years Replacement Warranty' }
    ],
    features: ['100% Food grade raw material', 'Keeps water cooler in summer', 'UV stabilized outer shield', 'Anti-fungal & anti-bacterial inner wall'],
    tags: ['water tank', 'tank', 'popular', 'storage'],
    isActive: true
  },
  {
    name: 'Popular PPRC PN-25 Brass Union (25mm x 3/4")',
    sku: 'ALH-SAN-007',
    category: 'Sanitary',
    subcategory: 'Pipes & Fittings (PPRC & PVC)',
    brand: 'Popular Pipes Group',
    price: 980,
    salePrice: null,
    stock: 120,
    unit: 'Piece',
    featured: false,
    bestSeller: true,
    isNewArrival: false,
    rating: 4.8,
    reviewsCount: 11,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'High precision PPRC brass threaded union fitting for water pump and geyser connections.',
    description: 'Provides easily detachable connection for pumps, water meters, and geysers without needing pipe cutting.',
    specifications: [
      { label: 'Pipe Size', value: '25 mm (3/4 Inch)' },
      { label: 'Insert Material', value: 'Solid Brass DZR' },
      { label: 'Pressure Rating', value: 'PN-25' }
    ],
    features: ['EPDM O-ring seal included', 'Precision threaded', 'High pressure resistance'],
    tags: ['union', 'pprc', 'popular', 'fitting'],
    isActive: true
  },

  // --- ELECTRICAL PRODUCTS ---
  {
    name: 'Fast Cables 7/0.029 Single Core 100% Pure Copper Cable (90m Coil)',
    sku: 'ALH-ELE-001',
    category: 'Electrical',
    subcategory: 'Wires & Cables',
    brand: 'Fast Cables',
    price: 16800,
    salePrice: 15500,
    stock: 80,
    unit: 'Coil (90m)',
    featured: true,
    bestSeller: true,
    isNewArrival: false,
    rating: 5.0,
    reviewsCount: 52,
    images: [
      'https://images.unsplash.com/photo-1558441719-f70e944f336f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: '99.99% pure annealed electrolytic copper building wire with flame-retardant PVC insulation.',
    description: 'Pakistan PSQCA & ISO certified building wire for residential and commercial electrical wiring. Delivers maximum electrical conductivity, minimal resistance heating, and superior safety with flame retardant grade 1 PVC.',
    specifications: [
      { label: 'Conductor', value: '99.99% Pure Oxygen-Free Copper' },
      { label: 'Configuration', value: '7 Strands / 0.029 Inch' },
      { label: 'Coil Length', value: '90 Meters (Standard Coil)' },
      { label: 'Insulation', value: 'Flame Retardant (FR) PVC Grade 1' },
      { label: 'Voltage Rating', value: '450/750V AC' },
      { label: 'Compliance', value: 'BS 6004 / PS: 714' }
    ],
    features: ['100% Certified pure copper', 'Flame retardant insulation', 'Guaranteed standard 90m length', 'Anti-rodent outer sheath'],
    tags: ['wire', 'cable', 'copper', 'fast cables', 'electrical'],
    isActive: true
  },
  {
    name: 'Schneider Electric Acti9 32A Double Pole (DP) MCB Breaker',
    sku: 'ALH-ELE-002',
    category: 'Electrical',
    subcategory: 'Circuit Breakers & DBs',
    brand: 'Schneider Electric',
    price: 2450,
    salePrice: 2150,
    stock: 120,
    unit: 'Piece',
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 31,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Industrial-grade 6kA breaking capacity double pole miniature circuit breaker for overload & short circuit protection.',
    description: 'Industry-standard miniature circuit breaker ensuring infallible overload and short-circuit protection for residential main distribution and AC circuits.',
    specifications: [
      { label: 'Rated Current', value: '32 Ampere' },
      { label: 'Poles', value: '2 Poles (DP - Line & Neutral)' },
      { label: 'Breaking Capacity', value: '6000A (6 kA)' },
      { label: 'Tripping Curve', value: 'C-Curve' },
      { label: 'Standard', value: 'IEC/EN 60898-1' }
    ],
    features: ['VisiSafe & VisiTrip indicators', 'High breaking capacity 6kA', 'DIN rail mounting ready', 'Silver alloy contacts'],
    tags: ['breaker', 'mcb', 'schneider', 'electrical', 'distribution'],
    isActive: true
  },
  {
    name: 'Luxury Acrylic Mirror Glass 8-Gang Switch Plate',
    sku: 'ALH-ELE-003',
    category: 'Electrical',
    subcategory: 'Switches & Sockets',
    brand: 'Clipsal Elite',
    price: 3600,
    salePrice: 3200,
    stock: 65,
    unit: 'Set',
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1558441719-f70e944f336f?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Tempered glass touch-feel piano switch panel with LED backlight indicators and fireproof polycarbonate base.',
    description: 'Elevate your interior aesthetics with crystal glass switchplates. Features phosphor bronze contact clips, spark-resistant mechanisms, and scratch-resistant acrylic glass panel.',
    specifications: [
      { label: 'Plate Configuration', value: '8 Gang (Switches + 2 Sockets)' },
      { label: 'Faceplate Material', value: 'Toughened Acrylic Crystal Glass' },
      { label: 'Rated Current', value: '16A Switches / 13A Universal Socket' },
      { label: 'Color', value: 'Midnight Slate & Rose Gold Bezel' }
    ],
    features: ['Scratch & fire resistant', 'Soft-click piano action', 'Fluorescent glow night guides', 'Fits standard conceal wall boxes'],
    tags: ['switch', 'socket', 'glass', 'interior', 'electrical'],
    isActive: true
  },
  {
    name: 'Royal Fans 56-Inch BLDC Inverter Energy Saver Ceiling Fan',
    sku: 'ALH-ELE-005',
    category: 'Electrical',
    subcategory: 'Fans & Ventilation',
    brand: 'Royal Fans',
    price: 13500,
    salePrice: 12200,
    stock: 30,
    unit: 'Piece',
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 44,
    images: [
      'https://images.unsplash.com/photo-1558441719-f70e944f336f?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Super-efficient 35W BLDC motor ceiling fan with RF wireless remote control and 60% electricity savings.',
    description: 'Consumes only 35 watts at top speed compared to 90W standard fans. Works seamlessly on low voltage (110V-260V) and solar inverter setups with zero motor humming noise.',
    specifications: [
      { label: 'Sweep Size', value: '56 Inch (1400mm)' },
      { label: 'Motor Type', value: 'Pure Copper BLDC Inverter Motor' },
      { label: 'Power Rating', value: '35 Watts' },
      { label: 'Air Delivery', value: '280 m³/min' },
      { label: 'Control', value: 'RF Remote Control with Timer' }
    ],
    features: ['Saves up to 60% electricity bill', 'Runs on solar & UPS without humming', 'Noisy-free aerodynamically balanced blades', '2 Years warranty'],
    tags: ['fan', 'inverter', 'bldc', 'energy saver', 'electrical'],
    isActive: true
  },

  // --- HARDWARE PRODUCTS ---
  {
    name: 'Total 850W Heavy Duty SDS-Plus Rotary Hammer Drill',
    sku: 'ALH-HDW-001',
    category: 'Hardware',
    subcategory: 'Power Tools',
    brand: 'Total Tools',
    price: 14200,
    salePrice: 12800,
    stock: 35,
    unit: 'Kit Box',
    featured: true,
    bestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 37,
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Professional 850W rotary hammer with 2.8J impact energy, 3 drilling modes, and BMC carry case with drill bits.',
    description: 'Indispensable tool for contractors, electricians, and plumbers. Handles concrete drilling up to 26mm with effortless pneumatic hammering mechanism and anti-vibration ergonomic grip.',
    specifications: [
      { label: 'Rated Power', value: '850 Watts' },
      { label: 'No-Load Speed', value: '0-1100 RPM' },
      { label: 'Impact Rate', value: '0-5100 BPM' },
      { label: 'Impact Energy', value: '2.8 Joules' },
      { label: 'Max Drilling Concrete', value: '26 mm' },
      { label: 'Chuck System', value: 'SDS-Plus Quick Change' }
    ],
    features: ['3 functions: Hammer drilling, drilling & chiseling', 'Heavy-duty copper armature motor', 'Includes 3 SDS drill bits & 2 chisels', 'Sturdy blow-mold carry case'],
    tags: ['drill', 'rotary hammer', 'power tool', 'total', 'hardware'],
    isActive: true
  },
  {
    name: 'Yale Solid Brass High-Security Mortise Door Lock Set',
    sku: 'ALH-HDW-003',
    category: 'Hardware',
    subcategory: 'Locks, Hinges & Door Fittings',
    brand: 'Yale Security',
    price: 9200,
    salePrice: 8400,
    stock: 28,
    unit: 'Set',
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 18,
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Heavy-duty 85mm European standard mortise lock body with solid brass cylinder and 5 computer keys.',
    description: 'Engineered for maximum entrance security with anti-drill, anti-pick brass cylinder, and satin nickel forged zinc alloy door handles.',
    specifications: [
      { label: 'Backset Size', value: '60 mm / 85 mm Center' },
      { label: 'Cylinder', value: 'Solid Brass 70mm Double Sided' },
      { label: 'Keys', value: '5 High-Precision Dimple / Computer Keys' },
      { label: 'Material', value: 'Forged Zinc Alloy Handles & Brass Latch' }
    ],
    features: ['Anti-drill & anti-saw hardened deadbolt', 'Smooth reversible latch mechanism', 'Satin nickel rustproof finish', 'Includes strike plate & screws'],
    tags: ['lock', 'door lock', 'yale', 'security', 'hardware'],
    isActive: true
  },
  {
    name: 'Ingco 4-Inch 750W Slim Body Angle Grinder',
    sku: 'ALH-HDW-002',
    category: 'Hardware',
    subcategory: 'Power Tools',
    brand: 'Ingco Industrial',
    price: 6800,
    salePrice: 5950,
    stock: 50,
    unit: 'Piece',
    featured: false,
    bestSeller: true,
    isNewArrival: false,
    rating: 4.8,
    reviewsCount: 42,
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'High-speed 11,000 RPM compact angle grinder for steel cutting, pipe chamfering, and marble grooving.',
    description: 'Lightweight and powerful slim barrel design allows comfortable one-handed operation. Built-in dust ejection system protects the motor from grinding debris.',
    specifications: [
      { label: 'Disc Diameter', value: '100 mm (4 Inch)' },
      { label: 'Input Power', value: '750 Watts' },
      { label: 'No-Load Speed', value: '11,000 RPM' },
      { label: 'Spindle Thread', value: 'M10' }
    ],
    features: ['Slim grip ergonomic handle', 'Spindle lock for easy disc change', 'Reinforced metal gear housing', 'Auxiliary handle included'],
    tags: ['grinder', 'angle grinder', 'ingco', 'cutting', 'hardware'],
    isActive: true
  }
];

const bannersData = [
  {
    title: 'ENGINEERED FOR SUPREME DURABILITY',
    highlightText: 'Popular PPRC & UPVC Piping Systems',
    subtitle: '100% Virgin European Polymer pipes & luxury sanitary fittings designed for 50+ years of leak-free performance.',
    tag: 'AUTHORISED INDUSTRIAL DISTRIBUTOR',
    badgeText: 'ISO 9001:2015 & DIN CERTIFIED',
    buttonText: 'Shop Sanitary Catalog',
    buttonLink: '/shop?category=Sanitary',
    secondaryButtonText: 'Request Bulk Quote',
    secondaryButtonLink: '/quote',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
    category: 'Sanitary',
    order: 1,
    isActive: true
  },
  {
    title: 'HEAVY-DUTY INDUSTRIAL ELECTRICAL',
    highlightText: '99.99% Pure Copper Cables & Switchgear',
    subtitle: 'Authorized dealer for Fast Cables, Schneider Electric MCBs, and luxury tempered glass switches at wholesale rates.',
    tag: '100% TESTED GENUINE CONDUCTORS',
    badgeText: 'PSQCA & BS 6004 COMPLIANT',
    buttonText: 'Explore Electrical Range',
    buttonLink: '/shop?category=Electrical',
    secondaryButtonText: 'Contractor Pricing',
    secondaryButtonLink: '/quote',
    image: 'https://images.unsplash.com/photo-1558441719-f70e944f336f?auto=format&fit=crop&w=1600&q=85',
    category: 'Electrical',
    order: 2,
    isActive: true
  },
  {
    title: 'PROFESSIONAL TOOLS & FASTENERS',
    highlightText: 'High-Torque Power Tools & Hardware Supplies',
    subtitle: 'Empowering plumbers, electricians, and construction builders with industrial grade tools, locks, and structural fasteners.',
    tag: 'PRO-CONTRACTOR GRADE HARDWARE',
    badgeText: 'HEAVY DUTY LIFETIME VALUE',
    buttonText: 'Browse Hardware Tools',
    buttonLink: '/shop?category=Hardware',
    secondaryButtonText: 'Download Price List',
    secondaryButtonLink: '/contact',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=1600&q=85',
    category: 'Hardware',
    order: 3,
    isActive: true
  }
];

const couponsData = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 2000,
    maxDiscount: 1500,
    isActive: true
  },
  {
    code: 'BULK500',
    discountType: 'fixed',
    discountValue: 500,
    minOrderAmount: 10000,
    maxDiscount: 500,
    isActive: true
  },
  {
    code: 'CONTRACTOR15',
    discountType: 'percentage',
    discountValue: 15,
    minOrderAmount: 25000,
    maxDiscount: 5000,
    isActive: true
  }
];

const sampleOrders = [
  {
    orderNumber: 'ALH-2026-1049',
    customer: {
      fullName: 'Muhammad Tariq Khan',
      email: 'tariq.khan@gmail.com',
      phone: '0300-8456123',
      address: 'House 42, Street 8, Sector F-7/2',
      city: 'Islamabad',
      province: 'Islamabad Capital Territory',
      postalCode: '44000',
      orderNotes: 'Please deliver before 4 PM. Call before dispatch.'
    },
    items: [
      {
        name: 'Popular Standard PPRC Pipe PN-20 (32mm x 4m)',
        sku: 'ALH-SAN-001',
        price: 1650,
        quantity: 10,
        unit: 'Length (4m)',
        image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80',
        subtotal: 16500
      },
      {
        name: 'Fast Cables 7/0.029 Single Core 100% Pure Copper Cable (90m Coil)',
        sku: 'ALH-ELE-001',
        price: 15500,
        quantity: 2,
        unit: 'Coil (90m)',
        image: 'https://images.unsplash.com/photo-1558441719-f70e944f336f?auto=format&fit=crop&w=800&q=80',
        subtotal: 31000
      }
    ],
    subtotal: 47500,
    shippingFee: 0,
    discount: 1500,
    couponCode: 'WELCOME10',
    totalAmount: 46000,
    paymentMethod: 'BankTransfer',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    trackingNumber: 'TCS-992817263',
    timeline: [
      { status: 'Pending', title: 'Order Placed', description: 'Order was placed online with Bank Transfer payment.', timestamp: new Date(Date.now() - 36 * 3600 * 1000) },
      { status: 'Confirmed', title: 'Payment Verified', description: 'Bank transfer receipt confirmed by finance team.', timestamp: new Date(Date.now() - 24 * 3600 * 1000) },
      { status: 'Processing', title: 'Packed at Central Warehouse', description: 'Pipes & Cables bundled and QC inspection passed.', timestamp: new Date(Date.now() - 6 * 3600 * 1000) }
    ]
  },
  {
    orderNumber: 'ALH-2026-1050',
    customer: {
      fullName: 'Engr. Bilal Aslam',
      email: 'bilal.aslam.eng@gmail.com',
      phone: '0321-4987654',
      address: 'Plot 112, Commercial Area, Phase 5 DHA',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54000',
      orderNotes: 'Need official invoice with NTN details.'
    },
    items: [
      {
        name: 'Schneider Electric Acti9 32A Double Pole (DP) MCB Breaker',
        sku: 'ALH-ELE-002',
        price: 2150,
        quantity: 6,
        unit: 'Piece',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        subtotal: 12900
      },
      {
        name: 'Total 850W Heavy Duty SDS-Plus Rotary Hammer Drill',
        sku: 'ALH-HDW-001',
        price: 12800,
        quantity: 1,
        unit: 'Kit Box',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
        subtotal: 12800
      }
    ],
    subtotal: 25700,
    shippingFee: 0,
    discount: 500,
    couponCode: 'BULK500',
    totalAmount: 25200,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    orderStatus: 'Confirmed',
    trackingNumber: 'LEO-441209381',
    timeline: [
      { status: 'Pending', title: 'Order Received', description: 'Customer selected Cash on Delivery.', timestamp: new Date(Date.now() - 12 * 3600 * 1000) },
      { status: 'Confirmed', title: 'Order Verified via Call', description: 'Order confirmed with customer over phone 0321-4987654.', timestamp: new Date(Date.now() - 4 * 3600 * 1000) }
    ]
  }
];

async function seedDatabase() {
  try {
    const mongoURI = process.env.MONGODB_URI;
    console.log(`Connecting to MongoDB Atlas...`);
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 8000 });
    console.log('MongoDB Atlas Connected successfully!');

    // Clear existing
    await Promise.all([
      Category.deleteMany({}),
      Product.deleteMany({}),
      Banner.deleteMany({}),
      Coupon.deleteMany({}),
      Admin.deleteMany({}),
      Order.deleteMany({})
    ]);

    await Category.insertMany(categoriesData);
    console.log(`✅ Seeded ${categoriesData.length} Categories to MongoDB Atlas.`);

    await Product.insertMany(productsData);
    console.log(`✅ Seeded ${productsData.length} Products to MongoDB Atlas.`);

    await Banner.insertMany(bannersData);
    console.log(`✅ Seeded ${bannersData.length} Hero Banners to MongoDB Atlas.`);

    await Coupon.insertMany(couponsData);
    console.log(`✅ Seeded ${couponsData.length} Promo Coupons to MongoDB Atlas.`);

    await Order.insertMany(sampleOrders);
    console.log(`✅ Seeded ${sampleOrders.length} Orders to MongoDB Atlas.`);

    const admin = new Admin({
      name: 'AL-HRSH Admin Master',
      email: 'admin@alharsh.com',
      password: 'admin12345',
      role: 'Admin'
    });
    await admin.save();
    console.log('✅ Seeded Admin Account (admin@alharsh.com / admin12345) to MongoDB Atlas.');

    console.log('🚀 ALL DATA SUCCESSFULLY SEEDED INTO LIVE MONGODB ATLAS DATABASE!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = { categoriesData, productsData, bannersData, couponsData, sampleOrders, seedDatabase };
