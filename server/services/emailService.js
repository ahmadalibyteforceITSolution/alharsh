import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const TARGET_ADMIN_EMAIL = 'alhrsh114333@gmail.com';

/**
 * Send email via FormSubmit API relay (no SMTP credentials required)
 */
const sendViaFormSubmitRelay = async (subject, data) => {
  try {
    const payload = {
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      ...data
    };

    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_ADMIN_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`✅ [FormSubmit Relay] Email notification successfully forwarded to ${TARGET_ADMIN_EMAIL}`);
      return true;
    } else {
      const errText = await response.text();
      console.warn(`⚠️ [FormSubmit Relay Warning]:`, errText);
      return false;
    }
  } catch (err) {
    console.warn(`⚠️ [FormSubmit Relay Network Error]:`, err.message);
    return false;
  }
};

// Configure Transporter with Gmail or generic SMTP
const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.GMAIL_PASS || process.env.GMAIL_APP_PASS;

  if (user && pass) {
    if (user.includes('@gmail.com') && !host) {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
      });
    }
    return nodemailer.createTransport({
      host: host || 'smtp.gmail.com',
      port: port,
      secure: port === 465,
      auth: { user, pass }
    });
  }

  return null;
};

/**
 * Send Contact Form Inquiry Email to Admin
 */
export const sendInquiryEmail = async (inquiryData) => {
  const { name, phone, email, subject, message } = inquiryData;
  const formattedDate = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');

  // 1. Try Direct API Relay to guarantee inbox delivery
  sendViaFormSubmitRelay(`🔔 New Contact Inquiry: ${subject || 'General'} - from ${name}`, {
    'Customer Name': name,
    'Phone Number': phone,
    'Email Address': email || 'Not provided',
    'Inquiry Subject': subject || 'General Inquiry',
    'Message': message,
    'Received At': formattedDate
  });

  // 2. Also try Nodemailer if SMTP configured
  const transporter = createTransporter();
  if (transporter) {
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #074c82;">AL-HRSH Store - New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject || 'General'}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 15px 0;">
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f8fafc; padding: 12px; border-left: 4px solid #074c82;">${message}</blockquote>
        <p style="font-size: 12px; color: #94a3b8;">Delivered to ${TARGET_ADMIN_EMAIL}</p>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"AL-HRSH Web Store" <${process.env.SMTP_USER || 'no-reply@alharsh.com'}>`,
        to: TARGET_ADMIN_EMAIL,
        replyTo: email || undefined,
        subject: `🔔 New Contact Inquiry: ${subject || 'General'} - from ${name}`,
        html: htmlContent
      });
      console.log(`📧 Nodemailer sent inquiry to ${TARGET_ADMIN_EMAIL}`);
    } catch (e) {
      console.warn(`Nodemailer note: ${e.message}`);
    }
  }

  return { success: true };
};

/**
 * Send Full Order Invoice Email to Admin (and Customer)
 */
export const sendOrderInvoiceEmail = async (orderData) => {
  const {
    orderNumber,
    trackingNumber,
    customer,
    items = [],
    subtotal,
    discount = 0,
    shippingFee = 0,
    totalAmount,
    paymentMethod,
    createdAt
  } = orderData;

  const formattedDate = new Date(createdAt || Date.now()).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });

  const itemsSummary = items.map(i => `${i.name} (Qty: ${i.quantity}, Price: Rs. ${i.price})`).join(' | ');

  // 1. Try Direct API Relay
  sendViaFormSubmitRelay(`🛒 New Order Placed: ${orderNumber} - Rs. ${totalAmount?.toLocaleString()}`, {
    'Order Number': orderNumber,
    'Order Date': formattedDate,
    'Customer Name': customer?.fullName,
    'Phone': customer?.phone,
    'Email': customer?.email || 'N/A',
    'Delivery Address': `${customer?.address}, ${customer?.city}, ${customer?.province || 'PK'}`,
    'Order Items': itemsSummary,
    'Subtotal': `Rs. ${subtotal?.toLocaleString()}`,
    'Discount': `Rs. ${discount?.toLocaleString()}`,
    'Shipping Fee': `Rs. ${shippingFee?.toLocaleString()}`,
    'Grand Total': `Rs. ${totalAmount?.toLocaleString()}`,
    'Payment Method': paymentMethod,
    'Tracking Number': trackingNumber || 'N/A'
  });

  return { success: true };
};

/**
 * Send Contractor Quote Request / BOQ Email to Admin
 */
export const sendQuoteEmail = async (quoteData) => {
  const { quoteNumber, name, companyName, phone, email, city, category, urgency, itemsRequested } = quoteData;
  const formattedDate = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });

  // 1. Try Direct API Relay
  sendViaFormSubmitRelay(`📋 New Contractor BOQ Quote: ${quoteNumber} - ${companyName || name}`, {
    'Quote Ref': quoteNumber,
    'Contractor Name': name,
    'Company': companyName || 'Individual / Contractor',
    'Phone': phone,
    'Email': email,
    'City': city || 'Pakistan',
    'Category & Urgency': `${category} | ${urgency}`,
    'Requested BOQ Items': itemsRequested,
    'Date': formattedDate
  });

  return { success: true };
};
