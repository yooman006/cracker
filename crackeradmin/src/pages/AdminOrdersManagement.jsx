import { useState, useEffect } from 'react';
import { Package, User, MapPin, CreditCard, Clock, CheckCircle, ArrowLeft, Eye, Search, Filter, Tag } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function AdminOrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');

  // Fetch all orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:5000/api/orders');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          // Ensure discount fields exist in each order
          const processedOrders = data.orders.map(order => ({
            ...order,
            totals: {
              ...order.totals,
              discountAmount: order.totals.discountAmount || 0,
              discountPercentage: order.totals.discountPercentage || 0
            }
          }));
          setOrders(processedOrders);
        } else {
          throw new Error(data.error || 'Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const fetchOrderById = async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Ensure discount fields exist
        const orderWithDiscount = {
          ...data.order,
          totals: {
            ...data.order.totals,
            discountAmount: data.order.totals.discountAmount || 0,
            discountPercentage: data.order.totals.discountPercentage || 0
          }
        };
        setSelectedOrder(orderWithDiscount);
      } else {
        throw new Error(data.error || 'Failed to fetch order');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

const generateReceipt = (order) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const itemsPerPage = 15; // Number of items to show per page
  const totalPages = Math.ceil(order.items.length / itemsPerPage);

  // Function to add common elements to each page
  const addCommonElements = (pageNumber) => {
    // Simple white background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, 'F');

    // Light blue border
    doc.setDrawColor(0, 153, 255);
    doc.setLineWidth(1);
    doc.rect(5, 5, 200, 287);

    // Order Header
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 153);
    doc.setFont(undefined, 'bold');
    doc.text('ORDER RECEIPT', 105, 20, null, null, 'center');

    // Page number (bottom right)
    doc.text(`Page: ${pageNumber}/${totalPages}`, 180, 285);

    // Order Info and Customer Info (only on first page)
    if (pageNumber === 1) {
      // Order Info (right aligned)
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Order Date: ${formatDate(order.orderDate)}`, 180, 30, null, null, 'right');
      doc.text(`Order ID: ${order._id}`, 180, 36, null, null, 'right');

      // Customer Info
      doc.setFontSize(12);
      doc.setTextColor(0, 51, 153);
      doc.text('Customer Information:', 20, 55);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Name: ${order.customer.firstName} ${order.customer.lastName}`, 25, 63);
      doc.text(`Email: ${order.customer.email}`, 25, 69);
      doc.text(`Phone: ${order.customer.phone}`, 25, 75);
      doc.text(`Address: ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`, 25, 81);
    }
  };

  // Function to add order items table
  const addItemsTable = (items, startY) => {
    // Order Items header
    doc.setFontSize(12);
    doc.setTextColor(0, 51, 153);
    doc.text('Order Items:', 20, startY);

    // Header row
    doc.setFillColor(240, 240, 240);
    doc.rect(20, startY + 5, 170, 8, 'F');

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text('Item', 25, startY + 10);
    doc.text('Brand', 95, startY + 10); // Adjusted brand position
    doc.text('Price', 140, startY + 10);
    doc.text('Qty', 160, startY + 10);
    doc.text('Total', 180, startY + 10);

    // Table rows with text wrapping
    let yPos = startY + 15;
    items.forEach((item, index) => {
      const rowColor = index % 2 === 0 ? [255, 255, 255] : [245, 245, 245];
      doc.setFillColor(...rowColor);
      doc.rect(20, yPos - 3, 170, 6, 'F');

      doc.setTextColor(0, 0, 0);
      
      // Split long item names and brands into multiple lines if needed
      const itemNameLines = doc.splitTextToSize(item.name, 60); // 60mm width for item name
      const brandLines = doc.splitTextToSize(item.brand || '', 30); // 30mm width for brand
      
      // Get the number of lines needed for this row
      const linesNeeded = Math.max(itemNameLines.length, brandLines.length);
      
      // Draw item name (multiple lines if needed)
      doc.text(itemNameLines, 25, yPos);
      
      // Draw brand (multiple lines if needed)
      doc.text(brandLines, 95, yPos);
      
      // Draw price, quantity and total (aligned to first line)
      doc.text(`${item.price.toFixed(2)}`, 140, yPos);
      doc.text(item.quantity.toString(), 160, yPos);
      doc.text(`${(item.price * item.quantity).toFixed(2)}`, 180, yPos);
      
      // Adjust yPos based on lines needed
      yPos += 6 * linesNeeded;
    });

    return yPos;
  };

  // Function to add totals section (only on last page)
  const addTotalsSection = (yPos) => {
    doc.setFontSize(12);
    doc.setTextColor(0, 51, 153);
    doc.text('Order Summary:', 20, yPos + 10);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Subtotal:', 140, yPos + 18);
    doc.text(`${order.totals.subtotal.toFixed(2)}`, 180, yPos + 18);

    if (order.totals.discountAmount > 0) {
      doc.text(`Discount:`, 140, yPos + 24);
      doc.text(`-${order.totals.discountAmount.toFixed(2)} (${order.totals.discountPercentage}%)`, 180, yPos + 24);
      yPos += 6;
    }

    doc.text('Delivery Fee:', 140, yPos + 24);
    doc.text(`${order.totals.deliveryFee.toFixed(2)}`, 180, yPos + 24);

    doc.setFont(undefined, 'bold');
    doc.text('Total Amount:', 140, yPos + 30);
    doc.text(`${order.totals.total.toFixed(2)}`, 180, yPos + 30);

    // Simple footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for your business', 105, yPos + 50, null, null, 'center');
  };

  // Generate each page
  for (let page = 1; page <= totalPages; page++) {
    if (page > 1) {
      doc.addPage();
    }

    addCommonElements(page);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, order.items.length);
    const pageItems = order.items.slice(startIndex, endIndex);

    // Calculate starting Y position based on whether it's the first page
    const startY = page === 1 ? 95 : 30; // 95 for first page (after customer details), 30 for subsequent pages
    let yPos = addItemsTable(pageItems, startY);

    // Add totals only on the last page
    if (page === totalPages) {
      addTotalsSection(yPos);
    }
  }

  doc.save(`order_receipt_${order._id.slice(-8)}.pdf`);
};

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.promoCode && order.promoCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
      order.items.some(item => item.brand.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    const matchesBrand = brandFilter === 'all' ||
      order.items.some(item => item.brand === brandFilter);

    return matchesSearch && matchesStatus && matchesBrand;
  });

  const handleOrderClick = (order) => {
    fetchOrderById(order._id);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  if (loading && !selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Error loading orders</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleBackToList}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Orders List
          </button>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                <p className="text-sm text-gray-600 mt-1">Order ID: {selectedOrder._id}</p>
              </div>
              <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(selectedOrder.orderDate)}
                </span>
                <button
                  onClick={() => generateReceipt(selectedOrder)}
                  className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Download Receipt
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Items
                </h2>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                        <p className="text-sm text-gray-500">Product ID: {item.productId}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Name</p>
                    <p className="text-sm text-gray-900">{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-sm text-gray-900">{selectedOrder.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-sm text-gray-900">{selectedOrder.customer.phone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Delivery Address
                </h2>
                <div className="text-sm text-gray-600">
                  <p>{selectedOrder.customer.address}</p>
                  <p>{selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pincode}</p>
                  {selectedOrder.customer.specialInstructions && (
                    <div className="mt-3">
                      <p className="font-medium text-gray-700">Special Instructions:</p>
                      <p className="text-gray-600">{selectedOrder.customer.specialInstructions}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{selectedOrder.totals.subtotal.toFixed(2)}</span>
                  </div>

                  {selectedOrder.totals.discountAmount > 0 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount ({selectedOrder.totals.discountPercentage}%)</span>
                        <span className="text-green-600">-{selectedOrder.totals.discountAmount.toFixed(2)}</span>
                      </div>
                      {selectedOrder.promoCode && (
                        <div className="flex justify-between text-sm items-center">
                          <span className="text-gray-600">Promo Code</span>
                          <span className="flex items-center text-gray-900">
                            <Tag className="w-4 h-4 mr-1" />
                            {selectedOrder.promoCode}
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-gray-900">{selectedOrder.totals.deliveryFee.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{selectedOrder.totals.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Order Timeline
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">Order Placed</p>
                      <p className="text-gray-500">{formatDate(selectedOrder.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className={`w-2 h-2 rounded-full mr-3 ${selectedOrder.status === 'processing' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">Current Status</p>
                      <p className="text-gray-500">{selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get unique brands from all orders
  const allBrands = [...new Set(orders.flatMap(order =>
    order.items.map(item => item.brand)
  ))].filter(brand => brand);


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
              <p className="text-sm text-gray-600 mt-1">Manage all customer orders</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="text-sm text-gray-500">
                Total Orders: {filteredOrders.length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer name, email, order ID, promo code, or brand..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="processing">Processing</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="relative">
              <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
              >
                <option value="all">All Brands</option>
                {allBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading orders...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Discount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="h-5 w-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {order.customer.firstName} {order.customer.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {order.customer.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order._id.slice(-8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.totals.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.totals.discountAmount > 0 ? (
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-900">
                                -{order.totals.discountAmount.toFixed(2)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {order.totals.discountPercentage}% off
                                {order.promoCode && ` (${order.promoCode})`}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">None</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.orderDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleOrderClick(order)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
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

              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm || statusFilter !== 'all' || brandFilter !== 'all'
                      ? 'Try adjusting your search or filter criteria'
                      : 'No orders have been placed yet'
                    }
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}