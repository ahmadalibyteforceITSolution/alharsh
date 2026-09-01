const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET /api/orders (Admin list all orders from MongoDB)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { orderStatus: status } : {};
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/track/:orderNumber (Public order tracking by orderNumber or phone)
router.get('/track/:orderNumber', async (req, res) => {
  try {
    const term = req.params.orderNumber.trim();
    const order = await Order.findOne({
      $or: [
        { orderNumber: new RegExp(`^${term}$`, 'i') },
        { 'customer.phone': term },
        { trackingNumber: new RegExp(`^${term}$`, 'i') }
      ]
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'No matching order found. Please verify your Order ID or Phone number.' });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/:id (Single order detail)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let order = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id);
    }
    if (!order) {
      order = await Order.findOne({ orderNumber: id });
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/orders (Customer checkout - creates live order in MongoDB)
router.post('/', async (req, res) => {
  try {
    const { customer, items, subtotal, totalAmount, paymentMethod, discount, couponCode, shippingFee } = req.body;
    if (!customer || !customer.fullName || !customer.phone || !customer.address || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Delivery details and items are required' });
    }

    const orderCount = await Order.countDocuments();
    const orderNumber = `ALH-${new Date().getFullYear()}-${1051 + orderCount}`;
    const trackingNumber = `LEO-${Math.floor(100000000 + Math.random() * 900000000)}`;

    const order = new Order({
      orderNumber,
      customer,
      items,
      subtotal: Number(subtotal),
      shippingFee: Number(shippingFee || 0),
      discount: Number(discount || 0),
      couponCode: couponCode || '',
      totalAmount: Number(totalAmount),
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      orderStatus: 'Pending',
      trackingNumber,
      timeline: [
        {
          status: 'Pending',
          title: 'Order Placed',
          description: `Order successfully recorded in system with payment method: ${paymentMethod || 'COD'}.`,
          timestamp: new Date()
        }
      ]
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully in MongoDB database!',
      orderNumber: order.orderNumber,
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/orders/:id/status (Admin updates status in MongoDB)
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus, trackingNumber, note } = req.body;

    const order = await Order.findOne({
      $or: [
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null },
        { orderNumber: id }
      ]
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found in MongoDB' });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (trackingNumber !== undefined) order.trackingNumber = trackingNumber;

    if (orderStatus || note) {
      order.timeline.push({
        status: orderStatus || order.orderStatus,
        title: `Status Changed to ${orderStatus || order.orderStatus}`,
        description: note || `Order updated to ${orderStatus || order.orderStatus} by operations team.`,
        timestamp: new Date()
      });
    }

    await order.save();

    res.json({
      success: true,
      message: 'Order status updated in MongoDB',
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
