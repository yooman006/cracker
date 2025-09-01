// pages/AdminOrdersManagement.jsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { orderService } from '../services/orderService';
import OrdersList from '../components/OrdersList';
import SearchAndFilters from '../components/SearchAndFilters';
import ErrorDisplay from '../components/ErrorDisplay';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminOrdersManagement() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [deliveryFilter, setDeliveryFilter] = useState('all');

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchOrders = useCallback(async () => {
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
  }, []);

  // Fetch orders on component mount and every time the component becomes visible
  useEffect(() => {
    fetchOrders();

    // Optional: Add visibility change listener to refresh when tab becomes active
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchOrders();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listener
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchOrders]);

  // Optional: Add focus listener to refresh when window regains focus
  useEffect(() => {
    const handleFocus = () => {
      fetchOrders();
    };

    window.addEventListener('focus', handleFocus);

    // Cleanup event listener
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchOrders]);

  // Manual refresh function that can be called from UI
  const handleManualRefresh = () => {
    fetchOrders();
  };

  const handleOrderClick = (order) => {
    // Navigate directly to order details page
    navigate(`/order/${order._id}`);
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

  // Calculate statistics
  const deliveredCount = orders.filter(order => order.isDelivered).length;
  const pendingCount = orders.filter(order => !order.isDelivered).length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totals.total, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const deliveryRate = orders.length > 0 ? Math.round((deliveredCount / orders.length) * 100) : 0;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={handleManualRefresh} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-8 mb-8">
          <div className="flex flex-col">
            {/* Title Section with Refresh Button */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl flex items-center justify-center shadow-xl">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text">
                    Orders Dashboard
                  </h1>
                </div>
              </div>
            </div>

            {/* Enhanced Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Total Orders */}
              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-blue-600 bg-blue-200 px-2 py-1 rounded-full">
                    TOTAL
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-800 mb-1">{filteredOrders.length}</div>
                <div className="text-xs font-medium text-blue-600">Total Orders</div>
              </div>

              {/* Delivered Orders */}
              <div className="group bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xs font-semibold text-green-600 bg-green-200 px-2 py-1 rounded-full">
                    DONE
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-800 mb-1">{deliveredCount}</div>
                <div className="text-xs font-medium text-green-600">Delivered</div>
              </div>

              {/* Pending Orders */}
              <div className="group bg-gradient-to-br from-yellow-50 to-amber-100 p-4 rounded-xl border-2 border-yellow-200 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xs font-semibold text-yellow-600 bg-yellow-200 px-2 py-1 rounded-full">
                    PENDING
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-700 mb-1">{pendingCount}</div>
                <div className="text-xs font-medium text-yellow-600">Pending</div>
              </div>

              {/* Total Revenue */}
              <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-md">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xs font-semibold text-purple-600 bg-purple-200 px-2 py-1 rounded-full">
                    REVENUE
                  </div>
                </div>
                <div className="text-lg font-bold text-purple-800 mb-1">₹{totalRevenue.toFixed(0)}</div>
                <div className="text-xs font-medium text-purple-600">Total Revenue</div>
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

        {/* Orders Table */}
        <OrdersList
          orders={filteredOrders}
          onOrderClick={handleOrderClick}
          onDeliveryStatusChange={handleDeliveryStatusChange}
          loading={loading}
        />

        {/* Enhanced No Orders Found */}
        {filteredOrders.length === 0 && !loading && (
          <div className="text-center py-16 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Orders Found</h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              {searchTerm || brandFilter !== 'all' || deliveryFilter !== 'all'
                ? 'No orders match your current search criteria. Try adjusting your filters to see more results.'
                : 'No orders have been placed yet. Orders will appear here once customers start placing them.'
              }
            </p>
            
            {(searchTerm || brandFilter !== 'all' || deliveryFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setBrandFilter('all');
                  setDeliveryFilter('all');
                }}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}