const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Cached MongoDB Connection for Serverless
let isConnected = false;
const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }
  const uri = process.env.MONGODB_URI;
  if (!uri) return;
  try {
    const db = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    isConnected = db.connections[0].readyState === 1;
  } catch (err) {
    console.error('Mongo Serverless Error:', err);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Import Routes from server
const productRoutes = require('../server/src/routes/productRoutes');
const categoryRoutes = require('../server/src/routes/categoryRoutes');
const orderRoutes = require('../server/src/routes/orderRoutes');
const quoteRoutes = require('../server/src/routes/quoteRoutes');
const bannerRoutes = require('../server/src/routes/bannerRoutes');
const couponRoutes = require('../server/src/routes/couponRoutes');
const inquiryRoutes = require('../server/src/routes/inquiryRoutes');
const adminRoutes = require('../server/src/routes/adminRoutes');
const uploadRoutes = require('../server/src/routes/uploadRoutes');

// Mount on both /api/path and /path for Vercel routing
app.use(['/api/products', '/products'], productRoutes);
app.use(['/api/categories', '/categories'], categoryRoutes);
app.use(['/api/orders', '/orders'], orderRoutes);
app.use(['/api/quotes', '/quotes'], quoteRoutes);
app.use(['/api/banners', '/banners'], bannerRoutes);
app.use(['/api/coupons', '/coupons'], couponRoutes);
app.use(['/api/inquiries', '/inquiries'], inquiryRoutes);
app.use(['/api/admin', '/admin'], adminRoutes);
app.use(['/api/upload', '/upload'], uploadRoutes);

app.get(['/api/health', '/health', '/api'], (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'AL-HRSH E-Commerce Serverless API',
    database: 'MongoDB Atlas'
  });
});

module.exports = app;
