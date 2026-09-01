const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  slug: {
    type: String,
    lowercase: true,
    index: true
  },
  sku: {
    type: String,
    trim: true,
    uppercase: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Sanitary', 'Electrical', 'Hardware']
  },
  subcategory: {
    type: String,
    required: [true, 'Subcategory is required']
  },
  brand: {
    type: String,
    default: 'AL-HRSH Genuine'
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  salePrice: {
    type: Number,
    default: null
  },
  stock: {
    type: Number,
    default: 25,
    min: 0
  },
  unit: {
    type: String,
    default: 'Piece' // Piece, Meter, Coil, Length, Box, Set, Pack
  },
  images: [{
    type: String
  }],
  description: {
    type: String,
    default: ''
  },
  shortDescription: {
    type: String,
    default: ''
  },
  specifications: [{
    label: { type: String, required: true },
    value: { type: String, required: true }
  }],
  features: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  bestSeller: {
    type: Boolean,
    default: false
  },
  isNewArrival: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4.8,
    min: 1,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 12
  },
  tags: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create slug from name before saving
ProductSchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
