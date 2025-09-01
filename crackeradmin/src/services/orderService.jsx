// services/orderService.js
const API_BASE_URL =  'https://sivakasi-crackers-shop-backend.azurewebsites.net/api';

export const orderService = {
  // Existing methods
  async fetchAllOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      return data.orders || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  async fetchOrderById(orderId) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  },

  async createOrder(orderData) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      
      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // New method for updating delivery status
  async updateDeliveryStatus(orderId, isDelivered, deliveredBy = null) {
    try {
      const requestBody = {
        isDelivered: isDelivered
      };
      
      // Optional: include who marked it as delivered
      if (deliveredBy) {
        requestBody.deliveredBy = deliveredBy;
      }

      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/delivery-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update delivery status');
      }
      
      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error('Error updating delivery status:', error);
      throw error;
    }
  }
};