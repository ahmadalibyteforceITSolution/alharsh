const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');

// GET /api/quotes (Admin view all bulk quote requests from MongoDB)
router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: quotes.length,
      quotes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/quotes (Contractor / Customer submit bulk quote into MongoDB)
router.post('/', async (req, res) => {
  try {
    const { name, companyName, phone, email, city, category, projectType, itemsRequested, estimatedQuantity, urgency, notes } = req.body;
    if (!name || !phone || !email || !itemsRequested) {
      return res.status(400).json({ success: false, message: 'Name, phone, email, and required products list are required' });
    }

    const quoteCount = await Quote.countDocuments();
    const quoteNumber = `QTE-${2026}-${1001 + quoteCount}`;

    const quote = new Quote({
      quoteNumber,
      name,
      companyName: companyName || '',
      phone,
      email,
      city: city || '',
      category: category || 'General',
      projectType: projectType || 'Plumbing & Sanitary Contractor',
      itemsRequested,
      estimatedQuantity: estimatedQuantity || '',
      urgency: urgency || 'Immediate (Within 48 hrs)',
      notes: notes || '',
      status: 'New'
    });

    await quote.save();

    res.status(201).json({
      success: true,
      message: 'Bulk quotation request submitted successfully. Our commercial sales engineer will contact you shortly.',
      quoteNumber: quote.quoteNumber,
      quote
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/quotes/:id (Admin update quote status in MongoDB)
router.put('/:id', async (req, res) => {
  try {
    const { status, adminReply } = req.body;
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { ...(status && { status }), ...(adminReply !== undefined && { adminReply }) },
      { new: true }
    );
    res.json({
      success: true,
      message: 'Quote status updated in MongoDB',
      quote
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
