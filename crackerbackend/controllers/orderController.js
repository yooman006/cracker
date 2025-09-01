const Order = require('../models/Order');

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
      updateData.deliveredBy = deliveredBy;
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