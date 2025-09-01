// components/OrdersList.jsx
import { User, Eye } from 'lucide-react';

export default function OrdersList({ orders, onOrderClick, loading }) {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.customer.firstName} {order.customer.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order._id.slice(-8)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.totals.total.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {order.totals.discountAmount > 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {order.totals.discountPercentage}%
                          {order.promoCode && ` (${order.promoCode})`}
                        </span>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onOrderClick(order)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
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
      <div className="md:hidden">
        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div key={order._id} className="p-4 hover:bg-blue-50 transition-colors duration-150">
              <div className="flex justify-between items-start">
                <div className="flex items-center min-w-0">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {order.customer.firstName}{order.customer.lastName}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onOrderClick(order)}
                  className="ml-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 flex items-center transition-colors duration-150 text-sm flex-shrink-0"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="truncate">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="ml-1 font-medium">{order._id.slice(-8)}</span>
                </div>
                <div className="text-right truncate">
                  <span className="text-gray-500">Total:</span>
                  <span className="ml-1 font-medium">{order.totals.total.toFixed(2)}</span>
                </div>
                <div className="truncate">
                  <span className="text-gray-500">Date:</span>
                  <span className="ml-1">{new Date(order.orderDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}