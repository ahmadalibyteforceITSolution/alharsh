const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Helper to generate slug
const slugify = (text) => text.toString().toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

// GET /api/products (Live Catalog from MongoDB)
router.get('/', async (req, res) => {
  try {
    const { category, subcategory, brand, search, sort, featured, bestSeller, isNewArrival, page = 1, limit = 100 } = req.query;
    
    const query = { isActive: { $ne: false } };
    
    if (category && category !== 'All') {
      query.category = new RegExp(`^${category}$`, 'i');
    }
    if (subcategory) {
      query.subcategory = new RegExp(`^${subcategory}$`, 'i');
    }
    if (brand) {
      query.brand = new RegExp(`^${brand}$`, 'i');
    }
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { shortDescription: searchRegex },
        { sku: searchRegex },
        { brand: searchRegex },
        { tags: { $in: [searchRegex] } }
      ];
    }
    if (featured === true || featured === 'true') query.featured = true;
    if (bestSeller === true || bestSeller === 'true') query.bestSeller = true;
    if (isNewArrival === true || isNewArrival === 'true') query.isNewArrival = true;

    let sortOptions = { createdAt: -1 };
    if (sort === 'price-low') sortOptions = { price: 1 };
    else if (sort === 'price-high') sortOptions = { price: -1 };
    else if (sort === 'rating') sortOptions = { rating: -1 };
    else if (sort === 'name-asc') sortOptions = { name: 1 };

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query).sort(sortOptions).skip(skip).limit(limitNum)
    ]);

    res.json({
      success: true,
      count: total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/products/:id (Single product by ID, Slug, or SKU)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let product = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }
    if (!product) {
      product = await Product.findOne({ slug: id });
    }
    if (!product) {
      product = await Product.findOne({ sku: id.toUpperCase() });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found in database' });
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: { $ne: false }
    }).limit(4);

    res.json({
      success: true,
      product,
      relatedProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/products (Save product and all attributes into MongoDB)
router.post('/', async (req, res) => {
  try {
    const {
      name,
      category,
      subcategory,
      brand,
      price,
      salePrice,
      stock,
      unit,
      images,
      description,
      shortDescription,
      specifications,
      features,
      featured,
      bestSeller,
      isNewArrival,
      sku,
      tags
    } = req.body;

    if (!name || !category || price === undefined || price === null) {
      return res.status(400).json({ success: false, message: 'Product Name, Category, and Price are required' });
    }

    const generatedSku = sku || `ALH-${(category || 'GEN').substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const slug = slugify(name);

    // Clean and filter specifications array
    let cleanSpecs = [];
    if (Array.isArray(specifications)) {
      cleanSpecs = specifications.filter(s => s && s.label && s.label.trim() && s.value && s.value.trim());
    }

    // Clean features list
    let cleanFeatures = [];
    if (Array.isArray(features)) {
      cleanFeatures = features.filter(f => typeof f === 'string' && f.trim().length > 0);
    }

    // Clean images
    let cleanImages = Array.isArray(images) && images.length > 0 
      ? images.filter(img => img && img.trim()) 
      : ['/images/placeholder.svg'];

    const product = new Product({
      name: name.trim(),
      slug,
      sku: generatedSku.trim().toUpperCase(),
      category: category.trim(),
      subcategory: subcategory ? subcategory.trim() : 'General',
      brand: brand ? brand.trim() : 'AL-HRSH Genuine',
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : null,
      stock: stock !== undefined ? Number(stock) : 25,
      unit: unit ? unit.trim() : 'Piece',
      images: cleanImages,
      description: description || '',
      shortDescription: shortDescription || (description ? description.substring(0, 160) : ''),
      specifications: cleanSpecs,
      features: cleanFeatures,
      featured: Boolean(featured),
      bestSeller: Boolean(bestSeller),
      isNewArrival: Boolean(isNewArrival),
      tags: Array.isArray(tags) ? tags : [category.toLowerCase()],
      rating: 5.0,
      reviewsCount: 1,
      isActive: true
    });

    const saved = await product.save();
    console.log(`✅ Product saved to MongoDB: "${saved.name}" (ID: ${saved._id})`);

    res.status(201).json({
      success: true,
      message: 'Product and all specifications saved in MongoDB successfully!',
      product: saved
    });
  } catch (error) {
    console.error('Error saving product to MongoDB:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/products/:id (Update product in MongoDB)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    if (req.body.price !== undefined) req.body.price = Number(req.body.price);
    if (req.body.salePrice !== undefined) req.body.salePrice = req.body.salePrice ? Number(req.body.salePrice) : null;
    if (req.body.stock !== undefined) req.body.stock = Number(req.body.stock);
    if (Array.isArray(req.body.specifications)) {
      req.body.specifications = req.body.specifications.filter(s => s && s.label && s.value);
    }

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found in database' });
    }
    
    console.log(`✅ Product updated in MongoDB: "${product.name}" (ID: ${product._id})`);
    res.json({
      success: true,
      message: 'Product updated in MongoDB successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/products/:id (Delete product from MongoDB)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    console.log(`🧹 Product deleted from MongoDB (ID: ${id})`);
    res.json({
      success: true,
      message: 'Product deleted from MongoDB successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
