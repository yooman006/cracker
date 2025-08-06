const Order = require('../models/Order');

// Create a new order
// controllers/orderController.js
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