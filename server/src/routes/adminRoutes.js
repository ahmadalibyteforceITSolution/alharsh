const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Quote = require('../models/Quote');
const Category = require('../models/Category');

const JWT_SECRET = process.env.JWT_SECRET || 'al_hrsh_super_secret_jwt_key_2026_industrial_secure';

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    let admin = await Admin.findOne({ email: email.toLowerCase() });
    
    // Auto-create default admin if not exists
    if (!admin && email.toLowerCase() === 'admin@alharsh.com' && password === 'admin12345') {
      admin = new Admin({
        name: 'AL-HRSH Administrator',
        email: 'admin@alharsh.com',
        password: 'admin12345',
        role: 'Admin'
      });
      await admin.save();
    }

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role, name: admin.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Admin authentication successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/stats (Live KPIs from MongoDB)
router.get('/stats', async (req, res) => {
  try {
    const [products, orders, quotes, categories] = await Promise.all([
      Product.find({}),
      Order.find({}).sort({ createdAt: -1 }),
      Quote.find({}).sort({ createdAt: -1 }),
      Category.find({})
    ]);

    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const lowStockProducts = products.filter(p => p.stock <= 15);
    const pendingOrders = orders.filter(o => o.orderStatus === 'Pending');
    const newQuotes = quotes.filter(q => q.status === 'New');

    const sanitaryCount = products.filter(p => p.category === 'Sanitary').length;
    const electricalCount = products.filter(p => p.category === 'Electrical').length;
    const hardwareCount = products.filter(p => p.category === 'Hardware').length;

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders: orders.length,
        totalProducts: products.length,
        totalCategories: categories.length,
        lowStockCount: lowStockProducts.length,
        pendingOrdersCount: pendingOrders.length,
        newQuotesCount: newQuotes.length,
        categoryBreakdown: {
          Sanitary: sanitaryCount,
          Electrical: electricalCount,
          Hardware: hardwareCount
        },
        recentOrders: orders.slice(0, 6),
        lowStockAlerts: lowStockProducts.slice(0, 6),
        recentQuotes: quotes.slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
