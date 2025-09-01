const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    specialInstructions: { type: String }
  },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  totals: {
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 }, // Changed from discount amount to percentage
    discountAmount: { type: Number, default: 0 }, // You can still store the amount if needed
    total: { type: Number, required: true }
  },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: '' },
  // New delivery status fields
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  deliveredBy: { type: String } // Optional: store who marked it as delivered
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);