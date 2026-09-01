const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  quoteNumber: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'General'
  },
  projectType: {
    type: String,
    enum: ['Plumbing & Sanitary Contractor', 'Electrical Contractor', 'Construction Company', 'Wholesale/Retail Reseller', 'Home Renovation / Individual', 'Other'],
    default: 'Plumbing & Sanitary Contractor'
  },
  itemsRequested: {
    type: String,
    required: true
  },
  estimatedQuantity: {
    type: String,
    default: ''
  },
  urgency: {
    type: String,
    enum: ['Immediate (Within 48 hrs)', '1 to 2 Weeks', 'Within 1 Month', 'Tender / Planning Phase'],
    default: 'Immediate (Within 48 hrs)'
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['New', 'In Review', 'Quoted', 'Approved', 'Closed'],
    default: 'New'
  },
  adminReply: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Quote || mongoose.model('Quote', QuoteSchema);
