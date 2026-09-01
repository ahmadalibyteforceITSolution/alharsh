const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// GET /api/inquiries (Admin view contact messages)
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: inquiries.length, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/inquiries (Customer submit contact form)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Name, phone, and message are required' });
    }
    const inquiry = new Inquiry({ name, email: email || '', phone, subject: subject || 'General Inquiry', message });
    await inquiry.save();
    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received. Our team will contact you shortly.',
      inquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/inquiries/:id/status
router.put('/:id/status', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, message: 'Status updated', inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/inquiries/:id
router.delete('/:id', async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
