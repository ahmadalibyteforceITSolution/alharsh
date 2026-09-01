const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    default: 'General Inquiry'
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Unread', 'Read', 'Replied', 'Archived'],
    default: 'Unread'
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
