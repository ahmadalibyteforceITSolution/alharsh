const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

const slugify = (text) => text.toString().toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

// GET /api/categories (Fetch live categories from MongoDB)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: { $ne: false } }).sort({ displayOrder: 1 });
    res.json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/categories (Admin add category to MongoDB)
router.post('/', async (req, res) => {
  try {
    const { name, icon, description, badge, image, subcategories, displayOrder } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const category = new Category({
      name,
      slug: slugify(name),
      icon: icon || 'Layers',
      description: description || '',
      badge: badge || '',
      image: image || '',
      displayOrder: displayOrder || 10,
      subcategories: Array.isArray(subcategories) ? subcategories.map(s => ({
        name: s.name,
        slug: slugify(s.name),
        description: s.description || '',
        image: s.image || ''
      })) : [],
      isActive: true
    });

    await category.save();
    res.status(201).json({
      success: true,
      message: 'Category saved in MongoDB successfully',
      category
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/categories/:id
router.put('/:id', async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({
      success: true,
      message: 'Category updated in MongoDB',
      category
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/categories/:id
router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: 'Category deleted from MongoDB'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
