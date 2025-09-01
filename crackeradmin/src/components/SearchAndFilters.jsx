// components/SearchAndFilters.jsx
import { Search, Tag, Truck, Filter } from 'lucide-react';

export default function SearchAndFilters({ 
  searchTerm, 
  setSearchTerm, 
  brandFilter, 
  setBrandFilter, 
  deliveryFilter,
  setDeliveryFilter,
  allBrands 
}) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8 backdrop-blur-sm bg-white/95">
      <div className="flex items-center mb-3 sm:mb-4">
        <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Search & Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Enhanced Search Input - Mobile First */}
        <div className="relative group col-span-1 sm:col-span-2 lg:col-span-1">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
          <input
            type="text"
            placeholder="Search by customer, email, order ID..."
            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-sm placeholder-gray-500 hover:border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-focus-within:from-blue-500/5 group-focus-within:to-purple-500/5 pointer-events-none transition-all duration-300"></div>
        </div>

        {/* Enhanced Brand Filter - Mobile Responsive */}
        <div className="relative group">
          <Tag className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200 z-10" />
          <select
            className="w-full pl-10 sm:pl-12 pr-8 sm:pr-10 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-sm appearance-none bg-white hover:border-gray-300 cursor-pointer"
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option value="all">All Brands</option>
            {allBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-focus-within:from-green-500/5 group-focus-within:to-emerald-500/5 pointer-events-none transition-all duration-300"></div>
        </div>

        {/* Enhanced Delivery Status Filter - Mobile Responsive */}
        <div className="relative group">
          <Truck className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200 z-10" />
          <select
            className="w-full pl-10 sm:pl-12 pr-8 sm:pr-10 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 text-sm appearance-none bg-white hover:border-gray-300 cursor-pointer"
            value={deliveryFilter}
            onChange={(e) => setDeliveryFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="delivered">Delivered Orders</option>
            <option value="pending">Pending Delivery</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/5 group-focus-within:to-pink-500/5 pointer-events-none transition-all duration-300"></div>
        </div>
      </div>
      
      {/* Filter indicators - Mobile Responsive */}
      <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
        {searchTerm && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            Search: "{searchTerm.length > 10 ? `${searchTerm.substring(0, 10)}...` : searchTerm}"
          </span>
        )}
        {brandFilter !== 'all' && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            Brand: {brandFilter}
          </span>
        )}
        {deliveryFilter !== 'all' && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
            Status: {deliveryFilter === 'delivered' ? 'Delivered' : 'Pending'}
          </span>
        )}
      </div>
    </div>
  );
}