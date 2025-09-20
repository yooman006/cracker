const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/', orderController.createOrder);

// Send receipt email - ONLY ADD THIS LINE
router.post('/send-receipt-email', orderController.sendReceiptEmail);

// Get all orders
router.get('/', orderController.getOrders);

// Get order by ID
router.get('/:id', orderController.getOrderById);

router.patch('/:id/delivery-status', orderController.updateDeliveryStatus);

module.exports = router;