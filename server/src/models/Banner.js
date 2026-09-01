const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  highlightText: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  tag: {
    type: String,
    default: 'PREMIUM QUALITY'
  },
  badgeText: {
    type: String,
    default: 'ISO 9001:2015 CERTIFIED'
  },
  buttonText: {
    type: String,
    default: 'Explore Catalog'
  },
  buttonLink: {
    type: String,
    default: '/shop'
  },
  secondaryButtonText: {
    type: String,
    default: 'Request Bulk Quote'
  },
  secondaryButtonLink: {
    type: String,
    default: '/quote'
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'All'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);
