import React from 'react';
import { ShoppingCart, CheckCircle } from 'lucide-react';

export function OrderSummary({ cartItems, totals, showAllItems, setShowAllItems }) {
  const { subtotal, discountAmount, total, DISCOUNT_PERCENTAGE } = totals;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 h-fit">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <ShoppingCart className="w-6 h-6 text-orange-600" />
        Order Summary
      </h2>

      <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-100">
        <p className="text-green-700 font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Special Offer: 50% discount applied to all orders!
        </p>
      </div>

      {/* Scrollable items container */}
      <div className="max-h-[300px] overflow-y-auto pr-2 mb-4 custom-scrollbar">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-gray-200">
              <th className="text-left pb-3 text-sm font-medium text-gray-500 w-[50%]">Item</th>
              <th className="text-right pb-3 text-sm font-medium text-gray-500">Price</th>
              <th className="text-right pb-3 text-sm font-medium text-gray-500">Qty</th>
              <th className="text-right pb-3 text-sm font-medium text-gray-500">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cartItems.slice(0, showAllItems ? cartItems.length : 3).map((item) => (
              <tr key={`item-${item.id}`} className="hover:bg-gray-50">
                <td className="py-3">
                  <div className="font-medium text-gray-800">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.brand}</div>
                </td>
                <td className="text-right text-sm text-gray-600">₹{Math.round(item.price)}</td>
                <td className="text-right text-sm text-gray-600">{item.quantity}</td>
                <td className="text-right font-medium text-gray-800">
                  ₹{Math.round(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Show more/less button */}
        {cartItems.length > 3 && (
          <div className="text-center mt-3">
            <button
              onClick={() => setShowAllItems(!showAllItems)}
              className="text-orange-600 text-sm font-medium hover:underline focus:outline-none"
            >
              {showAllItems ? 'Show less' : `Show ${cartItems.length - 3} more items`}
            </button>
          </div>
        )}
      </div>

      {/* Totals section */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800">₹{Math.round(subtotal)}</span>
          </div>
          <div className="flex justify-between items-center text-green-600">
            <span>Discount (50%)</span>
            <span>-₹{Math.round(discountAmount)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-xl font-bold text-gray-800">₹{Math.round(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Important notes */}
      <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
        <h3 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Important Notes:
        </h3>
        <ul className="text-sm text-orange-700 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>All crackers are tested for quality</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Safe handling instructions included</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>24/7 customer support available</span>
          </li>
        </ul>
      </div>
    </div>
  );
}