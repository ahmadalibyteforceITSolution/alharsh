const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');

// GET /api/banners (Fetch active hero banners)
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: { $ne: false } }).sort({ order: 1 });
    res.json({ success: true, count: banners.length, banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/banners (Admin create banner)
router.post('/', async (req, res) => {
  try {
    const banner = new Banner(req.body);
    await banner.save();
    res.status(201).json({ success: true, message: 'Banner created successfully', banner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/banners/:id
router.put('/:id', async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Banner updated successfully', banner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/banners/:id
router.delete('/:id', async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
