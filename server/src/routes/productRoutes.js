const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Helper to generate slug
const slugify = (text) => text.toString().toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

// GET /api/products (Live Catalog, filters, search, sort, pagination from MongoDB)
router.get('/', async (req, res) => {
  try {
    const { category, subcategory, brand, search, sort, featured, bestSeller, isNewArrival, page = 1, limit = 50 } = req.query;
    
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

// GET /api/products/:id (Single product by Mongo ID or Slug)
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
      return res.status(404).json({ success: false, message: 'Product not found' });
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

// POST /api/products (Admin manual product upload to MongoDB)
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

    if (!name || !category || !price) {
      return res.status(400).json({ success: false, message: 'Product Name, Category, and Price are required' });
    }

    const generatedSku = sku || `ALH-${category.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const slug = slugify(name);

    const product = new Product({
      name,
      slug,
      sku: generatedSku,
      category,
      subcategory: subcategory || 'General',
      brand: brand || 'AL-HRSH Genuine',
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : null,
      stock: stock !== undefined ? Number(stock) : 25,
      unit: unit || 'Piece',
      images: Array.isArray(images) && images.length > 0 ? images : ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'],
      description: description || '',
      shortDescription: shortDescription || '',
      specifications: Array.isArray(specifications) ? specifications : [],
      features: Array.isArray(features) ? features : [],
      featured: Boolean(featured),
      bestSeller: Boolean(bestSeller),
      isNewArrival: Boolean(isNewArrival),
      tags: Array.isArray(tags) ? tags : [category.toLowerCase()],
      rating: 5.0,
      reviewsCount: 1,
      isActive: true
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created and saved into MongoDB successfully!',
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/products/:id (Admin manual update in MongoDB)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found in MongoDB' });
    }
    res.json({
      success: true,
      message: 'Product updated successfully in MongoDB',
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/products/:id (Admin delete from MongoDB)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({
      success: true,
      message: 'Product deleted from MongoDB successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/products/bulk (Admin bulk product upload to MongoDB)
router.post('/bulk', async (req, res) => {
  try {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: 'Valid array of products is required' });
    }

    const preparedProducts = products.map((p) => ({
      ...p,
      slug: slugify(p.name || 'product'),
      sku: p.sku || `ALH-${(p.category || 'GEN').substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: p.rating || 4.9,
      reviewsCount: p.reviewsCount || 5,
      isActive: true
    }));

    const inserted = await Product.insertMany(preparedProducts);
    res.json({
      success: true,
      message: `Successfully uploaded ${inserted.length} products to MongoDB database!`,
      count: inserted.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
