import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'al_hrsh_jwt_secret_2026_key';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// --- Non-blocking MongoDB Connection ---
let isConnected = false;
export const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return true;
  }
  const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://ahmedalihafeez25_db_user:%40Sublime12345@cluster0.oe0inne.mongodb.net/Alharsh?retryWrites=true&w=majority';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = true;
    console.log(`✅ [MongoDB Atlas] Connected: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.warn('⚠️ [MongoDB Warning] Connection deferred:', err.message);
    isConnected = false;
    return false;
  }
};

connectDB().then(connected => {
  isConnected = connected;
});

// --- Mongoose Models ---
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, trim: true },
  sku: { type: String, uppercase: true, trim: true },
  category: { type: String, required: true },
  subcategory: { type: String, default: 'General' },
  brand: { type: String, default: 'AL-HRSH Genuine' },
  price: { type: Number, required: true },
  salePrice: { type: Number, default: null },
  stock: { type: Number, default: 25 },
  unit: { type: String, default: 'Piece' },
  images: [{ type: String }],
  description: { type: String, default: '' },
  shortDescription: { type: String, default: '' },
  specifications: [{ label: String, value: String }],
  features: [{ type: String }],
  featured: { type: Boolean, default: false },
  bestSeller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  tags: [{ type: String }],
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, default: 'Package' },
  badge: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  displayOrder: { type: Number, default: 0 },
  subcategories: [{ name: String, slug: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  trackingNumber: { type: String, default: '' },
  customer: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, default: 'Punjab' },
    postalCode: { type: String },
    orderNotes: { type: String }
  },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number,
    image: String,
    unit: String
  }],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  couponCode: { type: String, default: '' },
  shippingFee: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'Cash on Delivery' },
  paymentStatus: { type: String, default: 'Pending' },
  orderStatus: { type: String, default: 'Pending' },
  timeline: [{ status: String, title: String, description: String, timestamp: { type: Date, default: Date.now } }]
}, { timestamps: true });

const quoteSchema = new mongoose.Schema({
  quoteNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  companyName: { type: String, default: '' },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, default: '' },
  category: { type: String, default: 'General' },
  urgency: { type: String, default: 'Standard' },
  itemsRequested: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  notes: { type: String, default: '' }
}, { timestamps: true });

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  highlightText: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  tag: { type: String, default: 'PREMIUM QUALITY' },
  badgeText: { type: String, default: 'ISO 9001:2015 TESTED' },
  buttonText: { type: String, default: 'Explore Catalog' },
  buttonLink: { type: String, default: '/shop' },
  secondaryButtonText: { type: String, default: 'Contractor Bulk Quote' },
  secondaryButtonLink: { type: String, default: '/quote' },
  image: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
  discountValue: { type: Number, required: true },
  minOrderAmount: { type: Number, default: 0 },
  maxDiscount: { type: Number, default: null },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  status: { type: String, default: 'Unread' }
}, { timestamps: true });

const adminSchema = new mongoose.Schema({
  name: { type: String, default: 'Administrator' },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Admin' }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema);
const Banner = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);
const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

// --- API ROUTES ---

// Health Check
app.get(['/api/health', '/health', '/api'], (req, res) => {
  res.json({
    status: 'online',
    service: 'AL-HRSH E-Commerce API',
    mongoDB: isConnected || mongoose.connection.readyState === 1 ? 'connected' : 'connecting',
    timestamp: new Date()
  });
});

// Products: GET list
app.get(['/api/products', '/products'], async (req, res) => {
  try {
    const { category, subcategory, brand, search, sort } = req.query;
    const query = { isActive: { $ne: false } };
    if (category && category !== 'All') query.category = new RegExp(`^${category}$`, 'i');
    if (subcategory) query.subcategory = new RegExp(`^${subcategory}$`, 'i');
    if (brand) query.brand = new RegExp(`^${brand}$`, 'i');
    if (search) {
      const reg = new RegExp(search, 'i');
      query.$or = [{ name: reg }, { description: reg }, { sku: reg }, { brand: reg }];
    }
    let sortObj = { createdAt: -1 };
    if (sort === 'price-low') sortObj = { price: 1 };
    else if (sort === 'price-high') sortObj = { price: -1 };

    const products = await Product.find(query).sort(sortObj);
    res.json({ success: true, count: products.length, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Products: GET single
app.get(['/api/products/:id', '/products/:id'], async (req, res) => {
  try {
    const { id } = req.params;
    let product = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) product = await Product.findById(id);
    if (!product) product = await Product.findOne({ slug: id });
    if (!product) product = await Product.findOne({ sku: id.toUpperCase() });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const relatedProducts = await Product.find({ category: product.category, _id: { $ne: product._id } }).limit(4);
    res.json({ success: true, product, relatedProducts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Products: POST create
app.post(['/api/products', '/products'], async (req, res) => {
  try {
    const data = req.body;
    const sku = data.sku || `ALH-${(data.category || 'GEN').substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const slug = (data.name || '').toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    const newProduct = new Product({ ...data, sku, slug });
    const saved = await newProduct.save();
    res.status(201).json({ success: true, message: 'Product saved in MongoDB successfully!', product: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Products: PUT update
app.put(['/api/products/:id', '/products/:id'], async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Product updated successfully', product: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Products: DELETE
app.delete(['/api/products/:id', '/products/:id'], async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Categories: GET & POST
app.get(['/api/categories', '/categories'], async (req, res) => {
  try {
    const categories = await Category.find({ isActive: { $ne: false } }).sort({ displayOrder: 1 });
    res.json({ success: true, count: categories.length, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post(['/api/categories', '/categories'], async (req, res) => {
  try {
    const slug = (req.body.name || '').toLowerCase().replace(/\s+/g, '-');
    const cat = new Category({ ...req.body, slug });
    await cat.save();
    res.status(201).json({ success: true, category: cat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put(['/api/categories/:id', '/categories/:id'], async (req, res) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, category: cat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Orders: POST Create & GET Track
app.post(['/api/orders', '/orders'], async (req, res) => {
  try {
    const { customer, items, subtotal, discount, couponCode, shippingFee, totalAmount, paymentMethod } = req.body;
    const orderNumber = `ALH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingNumber = `TRK-${Date.now().toString().slice(-8)}`;

    const order = new Order({
      orderNumber,
      trackingNumber,
      customer,
      items,
      subtotal,
      discount: discount || 0,
      couponCode: couponCode || '',
      shippingFee: shippingFee || 0,
      totalAmount,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      orderStatus: 'Pending',
      paymentStatus: 'Pending',
      timeline: [
        { status: 'Pending', title: 'Order Received', description: 'Order registered in AL-HRSH database.' }
      ]
    });

    const saved = await order.save();
    res.status(201).json({ success: true, message: 'Order placed successfully', orderNumber: saved.orderNumber, order: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get(['/api/orders/track/:term', '/orders/track/:term'], async (req, res) => {
  try {
    const term = req.params.term.trim();
    const order = await Order.findOne({
      $or: [{ orderNumber: new RegExp(`^${term}$`, 'i') }, { 'customer.phone': term }, { trackingNumber: term }]
    });
    if (!order) return res.status(404).json({ success: false, message: 'No matching order found' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get(['/api/orders/:orderNumber', '/orders/:orderNumber'], async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get(['/api/orders', '/orders'], async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put(['/api/orders/:id/status', '/orders/:id/status'], async (req, res) => {
  try {
    const { orderStatus, paymentStatus, trackingNumber, note } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (note) order.timeline.push({ status: orderStatus, title: `Status: ${orderStatus}`, description: note });
    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Quotes: POST & GET
app.post(['/api/quotes', '/quotes'], async (req, res) => {
  try {
    const quoteNumber = `QUO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const quote = new Quote({ ...req.body, quoteNumber });
    await quote.save();
    res.status(201).json({ success: true, quoteNumber: quote.quoteNumber, quote });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get(['/api/quotes', '/quotes'], async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json({ success: true, quotes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put(['/api/quotes/:id', '/quotes/:id'], async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, quote });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Banners: GET, POST, DELETE
app.get(['/api/banners', '/banners'], async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: { $ne: false } }).sort({ order: 1 });
    res.json({ success: true, banners });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post(['/api/banners', '/banners'], async (req, res) => {
  try {
    const banner = new Banner(req.body);
    await banner.save();
    res.status(201).json({ success: true, banner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete(['/api/banners/:id', '/banners/:id'], async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Coupons: GET, POST, Validate
app.get(['/api/coupons', '/coupons'], async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ success: true, coupons });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post(['/api/coupons', '/coupons'], async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json({ success: true, coupon });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post(['/api/coupons/validate', '/coupons/validate'], async (req, res) => {
  try {
    const { code, orderAmount = 0 } = req.body;
    const coupon = await Coupon.findOne({ code: (code || '').toUpperCase(), isActive: true });
    if (!coupon) return res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({ success: false, message: `Minimum order of Rs. ${coupon.minOrderAmount} required` });
    }
    let discount = coupon.discountType === 'percentage' ? Math.round((orderAmount * coupon.discountValue) / 100) : coupon.discountValue;
    if (coupon.maxDiscount && discount > coupon.maxDiscount) discount = coupon.maxDiscount;
    res.json({ success: true, discount, couponCode: coupon.code });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete(['/api/coupons/:id', '/coupons/:id'], async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Inquiries: POST & GET
app.post(['/api/inquiries', '/inquiries'], async (req, res) => {
  try {
    const inq = new Inquiry(req.body);
    await inq.save();
    res.status(201).json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get(['/api/inquiries', '/inquiries'], async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin: Auth & Stats
app.post(['/api/admin/login', '/admin/login'], async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: (email || '').toLowerCase() });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }
    const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, admin: { name: admin.name, email: admin.email, role: admin.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get(['/api/admin/stats', '/admin/stats'], async (req, res) => {
  try {
    const [totalProducts, totalCategories, orders, quotes, inquiries] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Order.find().sort({ createdAt: -1 }),
      Quote.find().sort({ createdAt: -1 }),
      Inquiry.find().sort({ createdAt: -1 })
    ]);

    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const lowStockAlerts = await Product.find({ stock: { $lte: 15 } }).limit(5);

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders: orders.length,
        totalProducts,
        totalCategories,
        lowStockCount: lowStockAlerts.length,
        pendingOrdersCount: orders.filter(o => o.orderStatus === 'Pending').length,
        newQuotesCount: quotes.filter(q => q.status === 'Pending').length,
        recentOrders: orders.slice(0, 5),
        lowStockAlerts
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default app;
