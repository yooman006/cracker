// components/OrderDetails.jsx
import { User, MapPin, ArrowLeft, CheckCircle, Truck, Calendar } from 'lucide-react';
import { useState } from 'react';
import { pdfService } from '../services/pdfService';
import { formatDate } from '../utils/dateUtils';

export default function OrderDetails({ order, onBackToList, onDeliveryStatusChange }) {
  const [isUpdatingDelivery, setIsUpdatingDelivery] = useState(false);

  const handleDownloadReceipt = () => {
    pdfService.generateReceipt(order);
  };

  const handleDeliveryToggle = async () => {
    setIsUpdatingDelivery(true);
    try {
      await onDeliveryStatusChange(order._id, !order.isDelivered);
    } catch (error) {
      console.error('Failed to update delivery status:', error);
      // You could add a toast notification here
    } finally {
      setIsUpdatingDelivery(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBackToList}
          className="flex items-center text-blue-700 hover:text-blue-900 mb-6 transition-colors duration-200 text-base font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Orders List
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">Customer Details</h1>
              <p className="text-sm text-gray-600 mt-1">Order ID: {order._id}</p>
              <span className="text-sm text-gray-500">
                {formatDate(order.orderDate)}
              </span>
            </div>
            
            <div className="flex flex-col space-y-3 lg:items-end">
              {/* Delivery Status Toggle */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">Delivery Status:</span>
                <button
                  onClick={handleDeliveryToggle}
                  disabled={isUpdatingDelivery}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    order.isDelivered
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  } ${isUpdatingDelivery ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {isUpdatingDelivery ? (
                    <div className="animate-spin rounded-full h-4 w-4 border border-gray-400 border-t-transparent" />
                  ) : order.isDelivered ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Truck className="w-4 h-4" />
                  )}
                  <span>{order.isDelivered ? 'Delivered' : 'Mark as Delivered'}</span>
                </button>
              </div>

              {/* Delivery Date */}
              {order.deliveredAt && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Delivered on: {new Date(order.deliveredAt).toLocaleDateString()}</span>
                </div>
              )}

              {/* Download Receipt Button */}
              <button
                onClick={handleDownloadReceipt}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 flex items-center justify-center transition-colors duration-200"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Download Receipt
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Customer Information
          </h2>

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Full Name</label>
                <p className="text-base text-gray-900 bg-gray-50 p-2 rounded-lg">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Email Address</label>
                <p className="text-xs text-gray-900 bg-gray-50 p-2 rounded-lg">
                  {order.customer.email}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Phone Number</label>
                <p className="text-base text-gray-900 bg-gray-50 p-2 rounded-lg">
                  {order.customer.phone}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Delivery Address
                </label>
                <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                  <p className="text-base text-gray-900">{order.customer.address}</p>
                  <p className="text-base text-gray-900">
                    {order.customer.city}, {order.customer.state}
                  </p>
                  <p className="text-base text-gray-900">PIN: {order.customer.pincode}</p>
                </div>
              </div>

              {order.customer.specialInstructions && (
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Special Instructions</label>
                  <p className="text-base text-gray-900 bg-yellow-50 p-2 rounded-lg border-l-4 border-yellow-400">
                    {order.customer.specialInstructions}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Order Summary</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-600">Total Amount</p>
                <p className="text-lg font-bold text-blue-600">₹{order.totals.total.toFixed(2)}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-600">Items Count</p>
                <p className="text-lg font-bold text-green-600">{order.items.length}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-600">Order Date</p>
                <p className="text-base font-semibold text-gray-600">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div className={`p-3 rounded-lg text-center ${
                order.isDelivered ? 'bg-green-50' : 'bg-yellow-50'
              }`}>
                <p className="text-xs text-gray-600">Status</p>
                <p className={`text-base font-semibold ${
                  order.isDelivered ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {order.isDelivered ? 'Delivered' : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}