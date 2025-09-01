// pages/OrderDetails.jsx
import { User, MapPin, ArrowLeft, CheckCircle, Truck, Calendar, Download, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pdfService } from '../services/pdfService';
import { orderService } from '../services/orderService';
import { formatDate } from '../utils/dateUtils';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isUpdatingDelivery, setIsUpdatingDelivery] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDownloadReceipt = () => {
    if (order) {
      pdfService.generateReceipt(order);
    }
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const orderDetails = await orderService.fetchOrderById(orderId);
        setOrder(orderDetails);
      } catch (error) {
        console.error('Error fetching order:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleBackToList = () => {
    navigate('/');
  };

  const handleDeliveryStatusChange = async (orderId, isDelivered) => {
    setIsUpdatingDelivery(true);
    try {
      const updatedOrder = await orderService.updateDeliveryStatus(orderId, isDelivered);
      setOrder(updatedOrder);
      return updatedOrder;
    } catch (error) {
      console.error('Failed to update delivery status:', error);
      throw error;
    } finally {
      setIsUpdatingDelivery(false);
    }
  };

  const handleDeliveryToggle = async () => {
    if (!order) return;
    
    try {
      await handleDeliveryStatusChange(order._id, !order.isDelivered);
    } catch (error) {
      console.error('Failed to update delivery status:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={() => window.location.reload()} />;
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
          <button
            onClick={handleBackToList}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Enhanced Back Button */}
        <button
          onClick={handleBackToList}
          className="group flex items-center text-blue-700 hover:text-blue-900 mb-8 transition-all duration-300 text-base font-semibold bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Orders List
        </button>

        {/* Header Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                    Order Details
                  </h1>
                  <p className="text-gray-600 font-medium">Customer Information & Status</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-mono rounded-lg border">
                  ID: {order._id.slice(-12)}
                </span>
                <span className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-800 text-sm font-medium rounded-lg border border-blue-200">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(order.orderDate)}
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col space-y-4 lg:items-end">
              {/* Enhanced Delivery Status Toggle */}
              <div className="flex flex-col space-y-3">
                <label className="text-sm font-medium text-gray-700">Delivery Status:</label>
                <button
                  onClick={handleDeliveryToggle}
                  disabled={isUpdatingDelivery}
                  className={`group relative inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                    order.isDelivered
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50'
                      : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50'
                  } ${isUpdatingDelivery ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'}`}
                >
                  {isUpdatingDelivery ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                  ) : order.isDelivered ? (
                    <CheckCircle className="w-5 h-5 mr-2" />
                  ) : (
                    <Truck className="w-5 h-5 mr-2" />
                  )}
                  <span>{isUpdatingDelivery ? 'Updating...' : order.isDelivered ? 'Delivered' : 'Mark as Delivered'}</span>
                  
                  {!isUpdatingDelivery && (
                    <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>

                {/* Delivery Date */}
                {order.deliveredAt && (
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Delivered: {new Date(order.deliveredAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Enhanced Download Button */}
              <button
                onClick={handleDownloadReceipt}
                className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl text-sm font-bold hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
              >
                <Download className="w-5 h-5 mr-2" />
                <span>Download Receipt</span>
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information Card */}
          <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Customer Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Personal Details</h3>
                
                <div className="space-y-4">
                  <div className="group">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">Full Name</label>
                    <div className="flex items-center p-3 bg-gray-50 rounded-xl border-2 border-gray-100 group-hover:border-blue-200 transition-colors duration-200">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-base font-medium text-gray-900">
                        {order.customer.firstName} {order.customer.lastName}
                      </span>
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">Email Address</label>
                    <div className="flex items-center p-3 bg-gray-50 rounded-xl border-2 border-gray-100 group-hover:border-blue-200 transition-colors duration-200">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 truncate">
                        {order.customer.email}
                      </span>
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">Phone Number</label>
                    <div className="flex items-center p-3 bg-gray-50 rounded-xl border-2 border-gray-100 group-hover:border-blue-200 transition-colors duration-200">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-base font-medium text-gray-900">
                        {order.customer.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Delivery Address
                </h3>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border-2 border-blue-100 space-y-3">
                  <div className="text-base font-medium text-gray-900">{order.customer.address}</div>
                  <div className="text-base text-gray-800">
                    {order.customer.city}, {order.customer.state}
                  </div>
                  <div className="inline-flex items-center px-3 py-1 bg-white rounded-lg text-sm font-semibold text-gray-700 border">
                    PIN: {order.customer.pincode}
                  </div>
                </div>

                {order.customer.specialInstructions && (
                  <div className="mt-4">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">Special Instructions</label>
                    <div className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border-l-4 border-yellow-400 border border-yellow-200">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {order.customer.specialInstructions}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-lg mr-3">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              Order Summary
            </h3>
            
            <div className="space-y-4">
              {/* Total Amount */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center border-2 border-blue-200">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-blue-700">₹{order.totals.total.toFixed(2)}</p>
              </div>
              
              {/* Items Count */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center border-2 border-green-200">
                <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Items Count</p>
                <p className="text-2xl font-bold text-green-700">{order.items.length}</p>
              </div>
              
              {/* Order Date */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl text-center border-2 border-gray-200">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Order Date</p>
                <p className="text-base font-bold text-gray-700">
                  {new Date(order.orderDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              
              {/* Status */}
              <div className={`p-4 rounded-xl text-center border-2 ${
                order.isDelivered 
                  ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200' 
                  : 'bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200'
              }`}>
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                  order.isDelivered ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  Delivery Status
                </p>
                <div className="flex items-center justify-center">
                  {order.isDelivered ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  ) : (
                    <Truck className="w-5 h-5 text-yellow-600 mr-2" />
                  )}
                  <p className={`text-base font-bold ${
                    order.isDelivered ? 'text-green-700' : 'text-yellow-700'
                  }`}>
                    {order.isDelivered ? 'Delivered' : 'Pending'}
                  </p>
                </div>
              </div>

              {/* Discount Info */}
              {order.totals.discountAmount > 0 && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-xl text-center border-2 border-purple-200">
                  <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Discount Applied</p>
                  <p className="text-lg font-bold text-purple-700">{order.totals.discountPercentage}% OFF</p>
                  {order.promoCode && (
                    <p className="text-sm font-mono text-purple-600 mt-1">Code: {order.promoCode}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}