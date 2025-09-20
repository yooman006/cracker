const Order = require('../models/Order');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER ,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Email template function
const createEmailTemplate = (customerName, orderId, orderData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #10b981, #14b8a6); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; max-width: 600px; margin: 0 auto; }
        .order-info { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .highlight { color: #10b981; font-weight: bold; }
        .total { font-size: 18px; font-weight: bold; color: #10b981; }
        .items-list { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .item { border-bottom: 1px solid #e9ecef; padding: 8px 0; }
        .item:last-child { border-bottom: none; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎆 Kavitha Crackers</h1>
        <p>Thank you for your order!</p>
      </div>
      
      <div class="content">
        <h2>Dear ${customerName},</h2>
        
        <p>We're excited to confirm that your order has been successfully placed! 🎉</p>
        
        <div class="order-info">
          <h3>Order Details:</h3>
          <p><strong>Order ID:</strong> <span class="highlight">${orderId}</span></p>
          <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Total Items:</strong> ${orderData.items.length} items</p>
          <p class="total">Final Total: ₹${Math.round(orderData.totals.total)}</p>
        </div>

        <div class="items-list">
          <h3>Items Ordered:</h3>
          ${orderData.items.map(item => `
            <div class="item">
              <strong>${item.name}</strong><br>
              Brand: ${item.brand || 'N/A'} | Qty: ${item.quantity} | Price: ₹${item.price}
            </div>
          `).join('')}
        </div>
        
        <h3>What's Next?</h3>
        <ul>
          <li>Your order is being processed</li>
          <li>We'll notify you when your order is ready for delivery/pickup</li>
          <li>Your detailed receipt is attached to this email</li>
        </ul>
        
        <p>If you have any questions about your order, please don't hesitate to contact us:</p>
        <p>
          📞 Phone: +91 8903623517<br>
          📧 Email: seshakavitha30@gmail.com<br>
          📍 Address: Sivakasi - 626123
        </p>
        
        <p>Thank you for choosing Kavitha Crackers for your festive celebrations!</p>
        
        <p>Best regards,<br>
        <strong>Kavitha Crackers Team</strong><br>
        Sivakasi - 626123</p>
      </div>
      
      <div class="footer">
        <p>This is an automated email. Please do not reply directly to this message.</p>
      </div>
    </body>
    </html>
  `;
};

// Function to send receipt email
const sendReceiptEmail = async (customerEmail, customerName, orderId, pdfBase64, orderData) => {
  try {
    const transporter = createTransporter();
    
    const htmlTemplate = createEmailTemplate(customerName, orderId, orderData);

    const mailOptions = {
      from: {
        name: 'Kavitha Crackers',
        address: process.env.EMAIL_USER || 'seshakavitha30@gmail.com'
      },
      to: customerEmail,
      subject: `🎆 Order Confirmation - ${orderId} - Kavitha Crackers`,
      html: htmlTemplate,
      attachments: [
        {
          filename: `order_receipt_${orderId}.pdf`,
          content: pdfBase64,
          encoding: 'base64',
          contentType: 'application/pdf'
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    console.log('Received order data:', req.body); // Debug log
    
    // Validate required fields
    if (!req.body.customer || !req.body.items || !req.body.totals) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    const order = new Order({
      customer: req.body.customer,
      items: req.body.items,
      totals: req.body.totals
    });

    const savedOrder = await order.save();
    console.log('Order saved:', savedOrder); // Debug log

    res.status(201).json({ 
      success: true, 
      order: savedOrder 
    });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

exports.sendReceiptEmail = async (req, res) => {
  try {
    const { customerEmail, customerName, orderId, pdfBase64, orderData } = req.body;

    if (!customerEmail || !pdfBase64 || !orderId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const transporter = createTransporter();

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #10b981, #14b8a6); color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; max-width: 600px; margin: 0 auto; }
          .order-info { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .highlight { color: #10b981; font-weight: bold; }
          .total { font-size: 18px; font-weight: bold; color: #10b981; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎆 Kavitha Crackers</h1>
          <p>Thank you for your order!</p>
        </div>
        <div class="content">
          <h2>Dear ${customerName},</h2>
          <p>We're excited to confirm that your order has been successfully placed! 🎉</p>
          <div class="order-info">
            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> <span class="highlight">${orderId}</span></p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p class="total">Final Total: ₹${Math.round(orderData.totals.total)}</p>
          </div>
          <p>Thank you for choosing Kavitha Crackers!</p>
          <p>Best regards,<br><strong>Kavitha Crackers Team</strong></p>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: {
        name: 'Kavitha Crackers',
        address: process.env.EMAIL_USER || 'seshakavitha30@gmail.com'
      },
      to: customerEmail,
      subject: `🎆 Order Confirmation - ${orderId} - Kavitha Crackers`,
      html: htmlTemplate,
      attachments: [
        {
          filename: `order_receipt_${orderId}.pdf`,
          content: pdfBase64,
          encoding: 'base64',
          contentType: 'application/pdf'
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    
    res.status(200).json({
      success: true,
      message: 'Receipt email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId');
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update delivery status
exports.updateDeliveryStatus = async (req, res) => {
  try {
    console.log('Updating delivery status for order:', req.params.id);
    console.log('Request body:', req.body);
    
    const { id } = req.params;
    const { isDelivered, deliveredBy } = req.body;
    
    const updateData = {
      isDelivered: isDelivered,
      deliveredAt: isDelivered ? new Date() : null
    };
    
    // Optional: add who marked it as delivered
    if (deliveredBy) {
      updateData.isDelivered = deliveredBy;
    }
    
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).json({ 
        success: false, 
        error: 'Order not found' 
      });
    }
    
    console.log('Order updated successfully:', updatedOrder._id);
    
    res.status(200).json({ 
      success: true, 
      order: updatedOrder,
      message: isDelivered ? 'Order marked as delivered' : 'Order marked as not delivered'
    });
  } catch (error) {
    console.error('Error updating delivery status:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};