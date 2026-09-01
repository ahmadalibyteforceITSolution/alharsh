const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Product = require('../models/Product');
const Category = require('../models/Category');
const Banner = require('../models/Banner');
const Coupon = require('../models/Coupon');
const Admin = require('../models/Admin');
const Order = require('../models/Order');
const Quote = require('../models/Quote');
const Inquiry = require('../models/Inquiry');

const categoriesBase = [
  {
    name: 'Sanitary',
    slug: 'sanitary',
    icon: 'Droplet',
    badge: 'Certified',
    description: 'Sanitary fittings, pipes, commodes, taps, and water storage.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    displayOrder: 1,
    subcategories: [
      { name: 'Wash Basins & Sinks', slug: 'wash-basins-sinks' },
      { name: 'Commodes / Toilets', slug: 'commodes-toilets' },
      { name: 'Bathroom Fittings & Taps', slug: 'bathroom-fittings-taps' },
      { name: 'Showers & Shower Sets', slug: 'showers-shower-sets' },
      { name: 'Bathroom Accessories', slug: 'bathroom-accessories' },
      { name: 'Pipes & Fittings (PPRC & PVC)', slug: 'pipes-fittings-pvc-ppr' },
      { name: 'Water Tanks & Accessories', slug: 'water-tanks-accessories' }
    ]
  },
  {
    name: 'Electrical',
    slug: 'electrical',
    icon: 'Zap',
    badge: 'Certified',
    description: 'Wires, cables, switches, circuit breakers, and lighting.',
    image: 'https://images.unsplash.com/photo-1558441719-f70e944f336f?auto=format&fit=crop&w=800&q=80',
    displayOrder: 2,
    subcategories: [
      { name: 'Wires & Cables', slug: 'wires-cables' },
      { name: 'Switches & Sockets', slug: 'switches-sockets' },
      { name: 'Circuit Breakers & DBs', slug: 'circuit-breakers-dbs' },
      { name: 'Lighting & LEDs', slug: 'lighting-leds' },
      { name: 'Fans & Ventilation', slug: 'fans-ventilation' },
      { name: 'Electrical Tools & Accessories', slug: 'electrical-tools-accessories' }
    ]
  },
  {
    name: 'Hardware',
    slug: 'hardware',
    icon: 'Wrench',
    badge: 'Certified',
    description: 'Hand tools, power tools, door locks, hinges, and fasteners.',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    displayOrder: 3,
    subcategories: [
      { name: 'Hand Tools', slug: 'hand-tools' },
      { name: 'Power Tools', slug: 'power-tools' },
      { name: 'Locks, Hinges & Door Fittings', slug: 'locks-hinges-door-fittings' },
      { name: 'Nails, Screws, Bolts & Fasteners', slug: 'fasteners-screws-bolts' },
      { name: 'Paints, Adhesives & Chemicals', slug: 'paints-adhesives-chemicals' },
      { name: 'General Hardware & Construction Supplies', slug: 'general-hardware' }
    ]
  }
];

const defaultBanner = [
  {
    title: 'AL-HRSH INDUSTRIAL SUPPLIES',
    highlightText: 'Sanitary, Electrical & Hardware Products',
    subtitle: 'Certified genuine building materials for contractors, builders, and homeowners across Pakistan.',
    tag: 'AUTHORIZED DISTRIBUTOR',
    badgeText: 'ISO 9001 CERTIFIED',
    buttonText: 'Explore Catalog',
    buttonLink: '/shop',
    secondaryButtonText: 'Request Bulk Quote',
    secondaryButtonLink: '/quote',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
    category: 'All',
    order: 1,
    isActive: true
  }
];

async function clearDummyData() {
  try {
    const mongoURI = process.env.MONGODB_URI;
    console.log('Connecting to MongoDB Atlas to remove all dummy data...');
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 8000 });
    console.log('Connected to MongoDB Atlas.');

    // 1. Delete all dummy products
    await Product.deleteMany({});
    console.log('🧹 Deleted all dummy products from MongoDB Atlas.');

    // 2. Delete all dummy orders
    await Order.deleteMany({});
    console.log('🧹 Deleted all dummy orders from MongoDB Atlas.');

    // 3. Delete all dummy quotes
    await Quote.deleteMany({});
    console.log('🧹 Deleted all dummy quotes from MongoDB Atlas.');

    // 4. Delete all dummy inquiries
    await Inquiry.deleteMany({});
    console.log('🧹 Deleted all dummy inquiries from MongoDB Atlas.');

    // 5. Delete all dummy coupons
    await Coupon.deleteMany({});
    console.log('🧹 Deleted all dummy coupons from MongoDB Atlas.');

    // 6. Reset Category structures for manual population
    await Category.deleteMany({});
    await Category.insertMany(categoriesBase);
    console.log('✅ Base category structure initialized.');

    // 7. Reset Banners to clean default
    await Banner.deleteMany({});
    await Banner.insertMany(defaultBanner);
    console.log('✅ Clean default banner set.');

    // 8. Ensure Admin exists for manual additions
    await Admin.deleteMany({});
    const admin = new Admin({
      name: 'AL-HRSH Administrator',
      email: 'admin@alharsh.com',
      password: 'admin12345',
      role: 'Admin'
    });
    await admin.save();
    console.log('✅ Admin credentials ready: admin@alharsh.com / admin12345');

    // 9. Clear local JSON stores
    const dataDir = path.join(__dirname, '../data');
    if (fs.existsSync(dataDir)) {
      fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify([], null, 2));
      fs.writeFileSync(path.join(dataDir, 'orders.json'), JSON.stringify([], null, 2));
      fs.writeFileSync(path.join(dataDir, 'quotes.json'), JSON.stringify([], null, 2));
      fs.writeFileSync(path.join(dataDir, 'inquiries.json'), JSON.stringify([], null, 2));
      fs.writeFileSync(path.join(dataDir, 'coupons.json'), JSON.stringify([], null, 2));
      fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(categoriesBase, null, 2));
      fs.writeFileSync(path.join(dataDir, 'banners.json'), JSON.stringify(defaultBanner, null, 2));
      console.log('🧹 Local cache cleared.');
    }

    console.log('✨ ALL DUMMY DATA DELETED SUCCESSFULLY! DATABASE READY FOR 100% MANUAL DATA UPLOADS.');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing data:', error);
    process.exit(1);
  }
}

clearDummyData();
