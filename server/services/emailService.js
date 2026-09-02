import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const TARGET_ADMIN_EMAIL = 'alhrsh114333@gmail.com';

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

  // Fallback transporter (Direct send or ethereal simulation)
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'alhrsh114333@gmail.com',
      pass: process.env.GMAIL_APP_PASS || 'fallback_dummy_pass'
    }
  });
};

/**
 * Send Contact Form Inquiry Email to Admin
 */
export const sendInquiryEmail = async (inquiryData) => {
  const { name, phone, email, subject, message } = inquiryData;
  const formattedDate = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #072847 0%, #074c82 100%); padding: 30px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
        .header p { margin: 6px 0 0 0; font-size: 13px; color: #7dd3fc; }
        .badge { display: inline-block; background: #38bdf8; color: #072847; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; margin-top: 10px; }
        .content { padding: 28px 24px; }
        .info-grid { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 20px; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px; }
        .info-row:last-child { margin-bottom: 0; }
        .info-label { font-weight: bold; color: #64748b; }
        .info-val { font-weight: 700; color: #0f172a; text-align: right; }
        .message-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px; margin-top: 20px; }
        .message-title { font-size: 13px; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 8px; }
        .message-text { font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-line; }
        .actions { margin-top: 25px; text-align: center; }
        .btn { display: inline-block; background: #074c82; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: bold; margin: 0 5px; }
        .btn-wa { background: #16a34a; }
        .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AL-HRSH STORE</h1>
          <p>Sanitary, Electrical &amp; Hardware Products</p>
          <span class="badge">New Contact Inquiry</span>
        </div>
        <div class="content">
          <div class="info-grid">
            <div class="info-row">
              <span class="info-label">Customer Name:</span>
              <span class="info-val">${name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Phone Number:</span>
              <span class="info-val">${phone}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email Address:</span>
              <span class="info-val">${email || 'Not provided'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Subject:</span>
              <span class="info-val">${subject || 'General Inquiry'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Received At:</span>
              <span class="info-val">${formattedDate}</span>
            </div>
          </div>

          <div class="message-box">
            <div class="message-title">Customer Message:</div>
            <div class="message-text">${message}</div>
          </div>

          <div class="actions">
            <a href="tel:${cleanPhone}" class="btn">Call Customer</a>
            <a href="https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(name)},%20regarding%20your%20inquiry%20to%20AL-HRSH:" target="_blank" class="btn btn-wa">Reply on WhatsApp</a>
          </div>
        </div>
        <div class="footer">
          Notification automatically routed to <strong>${TARGET_ADMIN_EMAIL}</strong> from AL-HRSH Web Store.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: `"AL-HRSH Web Store" <${process.env.SMTP_USER || 'no-reply@alharsh.com'}>`,
      to: TARGET_ADMIN_EMAIL,
      replyTo: email || undefined,
      subject: `🔔 New Contact Inquiry: ${subject || 'General'} - from ${name} (${phone})`,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Inquiry notification email sent to ${TARGET_ADMIN_EMAIL} (MsgId: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.warn(`⚠️ Email delivery skipped/fallback (${error.message}). Logged for: ${TARGET_ADMIN_EMAIL}`);
    return { success: false, error: error.message };
  }
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
    couponCode,
    shippingFee = 0,
    totalAmount,
    paymentMethod,
    createdAt
  } = orderData;

  const formattedDate = new Date(createdAt || Date.now()).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
  const cleanPhone = (customer.phone || '').replace(/[^0-9]/g, '');

  // Render items rows
  const itemsRows = items.map((item, index) => `
    <tr style="border-bottom: 1px solid #f1f5f9;">
      <td style="padding: 12px 8px; font-size: 13px; color: #0f172a; font-weight: 600;">
        ${index + 1}. ${item.name}
        <div style="font-size: 11px; color: #64748b; font-weight: normal;">Unit: ${item.unit || 'Piece'}</div>
      </td>
      <td style="padding: 12px 8px; font-size: 13px; color: #0f172a; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 12px 8px; font-size: 13px; color: #0f172a; text-align: right;">
        Rs. ${(item.price || 0).toLocaleString()}
      </td>
      <td style="padding: 12px 8px; font-size: 13px; color: #074c82; font-weight: 800; text-align: right;">
        Rs. ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
      </td>
    </tr>
  `).join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #1e293b; }
        .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #072847 0%, #074c82 100%); padding: 30px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; }
        .header p { margin: 6px 0 0 0; font-size: 13px; color: #7dd3fc; }
        .invoice-tag { display: inline-block; background: #22c55e; color: #ffffff; font-size: 12px; font-weight: 800; padding: 5px 14px; border-radius: 9999px; text-transform: uppercase; margin-top: 12px; letter-spacing: 0.5px; }
        .content { padding: 28px 24px; }
        .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px; }
        .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 12px; }
        .meta-item strong { color: #0f172a; display: block; font-size: 13px; margin-top: 2px; }
        .section-title { font-size: 14px; font-weight: 800; color: #074c82; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        .items-table th { background: #f8fafc; padding: 10px 8px; text-align: left; font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 800; border-bottom: 2px solid #cbd5e1; }
        .calc-box { margin-left: auto; width: 280px; font-size: 13px; }
        .calc-row { display: flex; justify-content: space-between; padding: 6px 0; color: #64748b; }
        .calc-row.total { border-top: 2px solid #0f172a; padding-top: 10px; margin-top: 6px; font-size: 16px; font-weight: 800; color: #074c82; }
        .customer-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px; font-size: 13px; line-height: 1.5; }
        .actions { text-align: center; margin-top: 24px; }
        .btn { display: inline-block; background: #074c82; color: #ffffff !important; text-decoration: none; padding: 10px 22px; border-radius: 8px; font-size: 13px; font-weight: bold; margin: 0 6px; }
        .btn-wa { background: #16a34a; }
        .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AL-HRSH STORE INVOICE</h1>
          <p>Sanitary, Electrical &amp; Hardware Products</p>
          <span class="invoice-tag">Order Confirmed: ${orderNumber}</span>
        </div>

        <div class="content">
          <!-- Order Meta -->
          <div class="meta-box">
            <div class="meta-grid">
              <div class="meta-item">Order Number: <strong>${orderNumber}</strong></div>
              <div class="meta-item">Order Date: <strong>${formattedDate}</strong></div>
              <div class="meta-item">Payment Method: <strong>${paymentMethod}</strong></div>
              <div class="meta-item">Tracking Code: <strong>${trackingNumber || 'Assigned upon dispatch'}</strong></div>
            </div>
          </div>

          <!-- Customer & Shipping -->
          <div class="section-title">Delivery &amp; Customer Details</div>
          <div class="customer-card">
            <div><strong>Customer Name:</strong> ${customer.fullName}</div>
            <div><strong>Phone Number:</strong> ${customer.phone}</div>
            <div><strong>Email:</strong> ${customer.email || 'N/A'}</div>
            <div><strong>Delivery Address:</strong> ${customer.address}, ${customer.city}, ${customer.province || 'Pakistan'}</div>
            ${customer.orderNotes ? `<div style="margin-top: 6px; color: #d97706;"><strong>Customer Note:</strong> ${customer.orderNotes}</div>` : ''}
          </div>

          <!-- Items Table -->
          <div class="section-title">Order Items (${items.length})</div>
          <table class="items-table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Unit Price</th>
                <th style="text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
          </table>

          <!-- Pricing Calculation -->
          <div class="calc-box">
            <div class="calc-row">
              <span>Items Subtotal:</span>
              <span style="font-weight: 700; color: #0f172a;">Rs. ${subtotal.toLocaleString()}</span>
            </div>
            ${discount > 0 ? `
              <div class="calc-row" style="color: #16a34a;">
                <span>Discount (${couponCode || 'Promo'}):</span>
                <span>- Rs. ${discount.toLocaleString()}</span>
              </div>
            ` : ''}
            <div class="calc-row">
              <span>Shipping Freight:</span>
              <span>${shippingFee === 0 ? '<strong style="color: #16a34a;">FREE</strong>' : `Rs. ${shippingFee}`}</span>
            </div>
            <div class="calc-row total">
              <span>Grand Total:</span>
              <span>Rs. ${totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="actions">
            <a href="tel:${cleanPhone}" class="btn">Call Customer</a>
            <a href="https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(customer.fullName)},%20regarding%20your%20AL-HRSH%20order%20${orderNumber}:" target="_blank" class="btn btn-wa">WhatsApp Customer</a>
          </div>
        </div>

        <div class="footer">
          Official Sales Invoice routed to <strong>${TARGET_ADMIN_EMAIL}</strong> &bull; AL-HRSH Electrical, Hardware &amp; Sanitary Store.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const transporter = createTransporter();
    
    // Send to Admin
    const mailOptions = {
      from: `"AL-HRSH Web Store" <${process.env.SMTP_USER || 'no-reply@alharsh.com'}>`,
      to: TARGET_ADMIN_EMAIL,
      subject: `🛒 New Order Placed: ${orderNumber} - Rs. ${totalAmount.toLocaleString()} (${customer.fullName}, ${customer.city})`,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Order Invoice sent to ${TARGET_ADMIN_EMAIL} (MsgId: ${info.messageId})`);

    // Also send copy to customer if customer has email
    if (customer.email && customer.email.includes('@')) {
      try {
        await transporter.sendMail({
          from: `"AL-HRSH Web Store" <${process.env.SMTP_USER || 'no-reply@alharsh.com'}>`,
          to: customer.email,
          subject: `✅ Order Confirmation Invoice: ${orderNumber} - AL-HRSH Store`,
          html: htmlContent
        });
        console.log(`📧 Customer copy sent to ${customer.email}`);
      } catch (custErr) {
        console.warn(`Customer email error: ${custErr.message}`);
      }
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.warn(`⚠️ Order Email delivery skipped/fallback (${error.message}). Logged for: ${TARGET_ADMIN_EMAIL}`);
    return { success: false, error: error.message };
  }
};

/**
 * Send Contractor Quote Request / BOQ Email to Admin
 */
export const sendQuoteEmail = async (quoteData) => {
  const { quoteNumber, name, companyName, phone, email, city, category, urgency, itemsRequested } = quoteData;
  const formattedDate = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #072847 0%, #074c82 100%); padding: 30px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 800; }
        .header p { margin: 6px 0 0 0; font-size: 13px; color: #7dd3fc; }
        .badge { display: inline-block; background: #f59e0b; color: #072847; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; margin-top: 10px; }
        .content { padding: 28px 24px; }
        .info-grid { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 20px; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px; }
        .info-row:last-child { margin-bottom: 0; }
        .info-label { font-weight: bold; color: #64748b; }
        .info-val { font-weight: 700; color: #0f172a; text-align: right; }
        .boq-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px; margin-top: 20px; }
        .boq-title { font-size: 13px; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 8px; }
        .boq-text { font-family: monospace; font-size: 13px; line-height: 1.6; color: #1e293b; white-space: pre-line; background: #ffffff; padding: 12px; border-radius: 8px; border: 1px solid #dcfce7; }
        .actions { margin-top: 25px; text-align: center; }
        .btn { display: inline-block; background: #074c82; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: bold; margin: 0 5px; }
        .btn-wa { background: #16a34a; }
        .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AL-HRSH CONTRACTOR BOQ</h1>
          <p>Wholesale &amp; Project Quotation Portal</p>
          <span class="badge">Quote Ref: ${quoteNumber}</span>
        </div>
        <div class="content">
          <div class="info-grid">
            <div class="info-row">
              <span class="info-label">Contractor / Buyer:</span>
              <span class="info-val">${name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Company / Firm:</span>
              <span class="info-val">${companyName || 'Individual / Contractor'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Phone Number:</span>
              <span class="info-val">${phone}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email Address:</span>
              <span class="info-val">${email}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Project City:</span>
              <span class="info-val">${city || 'Pakistan'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Category &amp; Urgency:</span>
              <span class="info-val">${category} &bull; ${urgency}</span>
            </div>
          </div>

          <div class="boq-box">
            <div class="boq-title">Requested Bill of Quantities (BOQ):</div>
            <div class="boq-text">${itemsRequested}</div>
          </div>

          <div class="actions">
            <a href="tel:${cleanPhone}" class="btn">Call Contractor</a>
            <a href="https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(name)},%20regarding%20your%20AL-HRSH%20BOQ%20quote%20${quoteNumber}:" target="_blank" class="btn btn-wa">Send Quote on WhatsApp</a>
          </div>
        </div>
        <div class="footer">
          Contractor RFP routed to <strong>${TARGET_ADMIN_EMAIL}</strong> &bull; AL-HRSH Store.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: `"AL-HRSH Web Store" <${process.env.SMTP_USER || 'no-reply@alharsh.com'}>`,
      to: TARGET_ADMIN_EMAIL,
      replyTo: email,
      subject: `📋 New Contractor BOQ Quote: ${quoteNumber} - ${companyName || name} (${city || 'PK'})`,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Quote notification email sent to ${TARGET_ADMIN_EMAIL} (MsgId: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.warn(`⚠️ Quote Email delivery skipped/fallback (${error.message}). Logged for: ${TARGET_ADMIN_EMAIL}`);
    return { success: false, error: error.message };
  }
};
