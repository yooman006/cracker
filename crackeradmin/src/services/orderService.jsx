// services/orderService.js
export const orderService = {
  async fetchAllOrders() {
    const response = await fetch('https://sivakasi-crackers-shop-backend.azurewebsites.net/api/orders');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      const processedOrders = data.orders.map(order => ({
        ...order,
        totals: {
          ...order.totals,
          discountAmount: order.totals.discountAmount || 0,
          discountPercentage: order.totals.discountPercentage || 0
        }
      })).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

      return processedOrders;
    } else {
      throw new Error(data.error || 'Failed to fetch orders');
    }
  },

  async fetchOrderById(orderId) {
    const response = await fetch(`https://sivakasi-crackers-shop-backend.azurewebsites.net/api/orders/${orderId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      const orderWithDiscount = {
        ...data.order,
        totals: {
          ...data.order.totals,
          discountAmount: data.order.totals.discountAmount || 0,
          discountPercentage: data.order.totals.discountPercentage || 0
        }
      };
      return orderWithDiscount;
    } else {
      throw new Error(data.error || 'Failed to fetch order');
    }
  }
};