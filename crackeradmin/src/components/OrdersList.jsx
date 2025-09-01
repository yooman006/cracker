// components/OrdersList.jsx
import { User, Eye, CheckCircle, Circle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrdersList({ orders, onDeliveryStatusChange, loading }) {
  const [updatingOrders, setUpdatingOrders] = useState(new Set());
  const navigate = useNavigate();

  const handleOrderClick = (order) => {
    // Navigate to order details page
    navigate(`/order/${order._id}`);
  };

  const handleDeliveryToggle = async (e, orderId, currentStatus) => {
    e.stopPropagation(); // Prevent triggering the row click
    
    setUpdatingOrders(prev => new Set(prev).add(orderId));
    
    try {
      await onDeliveryStatusChange(orderId, !currentStatus);
    } catch (error) {
      console.error('Failed to update delivery status:', error);
    } finally {
      setUpdatingOrders(prev => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  const DeliveryCheckbox = ({ order }) => {
    const isUpdating = updatingOrders.has(order._id);
    
    return (
      <button
        onClick={(e) => handleDeliveryToggle(e, order._id, order.isDelivered)}
        disabled={isUpdating}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
          order.isDelivered
            ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-200'
            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border border-yellow-200'
        } ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-sm'}`}
      >
        {isUpdating ? (
          <div className="animate-spin rounded-full h-3 w-3 border border-current border-t-transparent" />
        ) : order.isDelivered ? (
          <CheckCircle className="h-3 w-3" />
        ) : (
          <Circle className="h-3 w-3" />
        )}
        <span>{order.isDelivered ? 'Delivered' : 'Pending'}</span>
      </button>
    );
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Discount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Delivery Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order, index) => (
                <tr 
                  key={order._id} 
                  className={`transition-all duration-150 hover:bg-blue-50/50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                  onClick={() => handleOrderClick(order)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.customer.firstName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded-lg inline-block">
                      {order._id.slice(-8)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">
                      ₹{order.totals.total.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {order.totals.discountAmount > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        {order.totals.discountPercentage}%
                        {order.promoCode && ` (${order.promoCode})`}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <DeliveryCheckbox order={order} />
                      {order.deliveredAt && (
                        <div className="text-xs text-gray-500">
                          {new Date(order.deliveredAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderClick(order);
                      }}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 border border-blue-200 hover:shadow-sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div 
            key={order._id} 
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200"
            onClick={() => handleOrderClick(order)}
            style={{ cursor: 'pointer' }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center min-w-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {order.customer.firstName} {order.customer.lastName}
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOrderClick(order);
                }}
                className="ml-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center transition-colors duration-150 text-sm flex-shrink-0 border border-blue-200"
              >
                <Eye className="w-3 h-3 mr-1" />
                View
              </button>
            </div>

            <div className="flex justify-between items-center mb-3">
              <DeliveryCheckbox order={order} />
              {order.deliveredAt && (
                <div className="text-xs text-gray-500">
                  Delivered: {new Date(order.deliveredAt).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 rounded-lg p-3">
              <div className="truncate">
                <span className="text-gray-500 font-medium">Order ID:</span>
                <span className="ml-1 font-mono text-gray-700 text-xs">{order._id.slice(-8)}</span>
              </div>
              <div className="text-right truncate">
                <span className="text-gray-500 font-medium">Total:</span>
                <span className="ml-1 font-semibold text-gray-900">₹{order.totals.total.toFixed(2)}</span>
              </div>
              <div className="truncate">
                <span className="text-gray-500 font-medium">Date:</span>
                <span className="ml-1 text-gray-700">{new Date(order.orderDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}