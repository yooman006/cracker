// pages/AdminOrdersManagement.jsx
import { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { orderService } from '../services/orderService';
import OrdersList from '../components/OrdersList';
import SearchAndFilters from '../components/SearchAndFilters';
import OrderDetails from '../components/OrderDetails';
import ErrorDisplay from '../components/ErrorDisplay';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminOrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [deliveryFilter, setDeliveryFilter] = useState('all');

  // Fetch all orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const processedOrders = await orderService.fetchAllOrders();
        setOrders(processedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = async (order) => {
    try {
      setLoading(true);
      setError(null);
      const orderDetails = await orderService.fetchOrderById(order._id);
      setSelectedOrder(orderDetails);
    } catch (error) {
      console.error('Error fetching order:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  const handleDeliveryStatusChange = async (orderId, isDelivered) => {
    try {
      const updatedOrder = await orderService.updateDeliveryStatus(orderId, isDelivered);
      
      // Update the orders list
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId 
            ? { ...order, isDelivered, deliveredAt: isDelivered ? new Date() : null }
            : order
        )
      );

      // Update selected order if it's the same one
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(prev => ({
          ...prev,
          isDelivered,
          deliveredAt: isDelivered ? new Date() : null
        }));
      }

      return updatedOrder;
    } catch (error) {
      console.error('Error updating delivery status:', error);
      throw error;
    }
  };

  // Filter orders based on search term, brand, and delivery status
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.promoCode && order.promoCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
      order.items.some(item => item.brand.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesBrand = brandFilter === 'all' ||
      order.items.some(item => item.brand === brandFilter);

    const matchesDelivery = deliveryFilter === 'all' ||
      (deliveryFilter === 'delivered' && order.isDelivered) ||
      (deliveryFilter === 'pending' && !order.isDelivered);

    return matchesSearch && matchesBrand && matchesDelivery;
  });

  // Get all unique brands for filter
  const allBrands = [...new Set(orders.flatMap(order =>
    order.items.map(item => item.brand)
  ))].filter(brand => brand);

  // Calculate delivery statistics
  const deliveredCount = orders.filter(order => order.isDelivered).length;
  const pendingCount = orders.filter(order => !order.isDelivered).length;

  if (loading && !selectedOrder) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (selectedOrder) {
    return (
      <OrderDetails
        order={selectedOrder}
        onBackToList={handleBackToList}
        onDeliveryStatusChange={handleDeliveryStatusChange}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
              <p className="text-sm text-gray-600 mt-1">Manage all customer orders</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <span className="text-blue-600 font-semibold">Total Orders</span>
                <div className="text-lg font-bold text-blue-800">{filteredOrders.length}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <span className="text-green-600 font-semibold">Delivered</span>
                <div className="text-lg font-bold text-green-800">{deliveredCount}</div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <span className="text-yellow-600 font-semibold">Pending</span>
                <div className="text-lg font-bold text-yellow-800">{pendingCount}</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <span className="text-purple-600 font-semibold">Delivery Rate</span>
                <div className="text-lg font-bold text-purple-800">
                  {orders.length > 0 ? Math.round((deliveredCount / orders.length) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          brandFilter={brandFilter}
          setBrandFilter={setBrandFilter}
          deliveryFilter={deliveryFilter}
          setDeliveryFilter={setDeliveryFilter}
          allBrands={allBrands}
        />

        {/* Orders List */}
        <OrdersList
          orders={filteredOrders}
          onOrderClick={handleOrderClick}
          onDeliveryStatusChange={handleDeliveryStatusChange}
          loading={loading}
        />

        {/* No Orders Found */}
        {filteredOrders.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-3 text-base font-semibold text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || brandFilter !== 'all' || deliveryFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No orders have been placed yet'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}