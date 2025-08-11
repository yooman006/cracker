import { useState, useEffect } from 'react';
import { Package, User, MapPin, CreditCard, Clock, CheckCircle, ArrowLeft, Eye, Search, Filter, Tag } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function AdminOrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');

  // Fetch all orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
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
    const itemsPerPage = 15;
    const totalPages = Math.ceil(order.items.length / itemsPerPage);

    const addCommonElements = (pageNumber) => {
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, 210, 297, 'F');
      doc.setDrawColor(0, 153, 255);
      doc.setLineWidth(1);
      doc.rect(5, 5, 200, 287);
      doc.setFontSize(16);
      doc.setTextColor(0, 51, 153);
      doc.setFont(undefined, 'bold');
      doc.text('ORDER RECEIPT', 105, 20, null, null, 'center');
      doc.text(`Page: ${pageNumber}/${totalPages}`, 180, 285);

      if (pageNumber === 1) {
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Order Date: ${formatDate(order.orderDate)}`, 180, 30, null, null, 'right');
        doc.text(`Order ID: ${order._id}`, 180, 36, null, null, 'right');
        doc.setFontSize(12);
        doc.setTextColor(0, 51, 153);
        doc.text('Customer Information:', 20, 55);
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Name: ${order.customer.firstName}`, 25, 63);
        doc.text(`Email: ${order.customer.email}`, 25, 69);
        doc.text(`Phone: ${order.customer.phone}`, 25, 75);
        doc.text(`Address: ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`, 25, 81);
      }
    };

    const addItemsTable = (items, startY, pageNumber) => {
      doc.setFontSize(12);
      doc.setTextColor(0, 51, 153);
      doc.text('Order Items:', 20, startY);
      doc.setFillColor(240, 240, 240);
      doc.rect(20, startY + 5, 170, 8, 'F');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text('S.No', 25, startY + 10);
      doc.text('Item', 35, startY + 10);
      doc.text('Brand', 95, startY + 10);
      doc.text('Price', 140, startY + 10);
      doc.text('Qty', 160, startY + 10);
      doc.text('Total', 180, startY + 10);

      let yPos = startY + 15;
      items.forEach((item, index) => {
        const rowColor = index % 2 === 0 ? [255, 255, 255] : [245, 245, 245];
        doc.setFillColor(...rowColor);
        doc.rect(20, yPos - 3, 170, 6, 'F');
        doc.setTextColor(0, 0, 0);
        const serialNumber = (pageNumber - 1) * itemsPerPage + index + 1;
        doc.text(serialNumber.toString(), 25, yPos);
        const itemNameLines = doc.splitTextToSize(item.name, 55);
        const brandLines = doc.splitTextToSize(item.brand || '', 30);
        const linesNeeded = Math.max(itemNameLines.length, brandLines.length);
        doc.text(itemNameLines, 35, yPos);
        doc.text(brandLines, 95, yPos);
        doc.text(`${item.price.toFixed(2)}`, 140, yPos);
        doc.text(item.quantity.toString(), 160, yPos);
        doc.text(`${(item.price * item.quantity).toFixed(2)}`, 180, yPos);
        yPos += 6 * linesNeeded;
      });

      return yPos;
    };

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
        doc.text(`${order.totals.discountPercentage}%`, 180, yPos + 24);
        yPos += 6;
      }

      doc.setFont(undefined, 'bold');
      doc.text('Total Amount:', 140, yPos + 30);
      doc.text(`${order.totals.total.toFixed(2)}`, 180, yPos + 30);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Thank you for your business', 105, yPos + 50, null, null, 'center');
    };

    for (let page = 1; page <= totalPages; page++) {
      if (page > 1) doc.addPage();
      addCommonElements(page);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, order.items.length);
      const pageItems = order.items.slice(startIndex, endIndex);
      const startY = page === 1 ? 95 : 30;
      let yPos = addItemsTable(pageItems, startY, page);
      if (page === totalPages) addTotalsSection(yPos);
    }

    doc.save(`order_receipt_${order._id.slice(-8)}.pdf`);
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

    const matchesBrand = brandFilter === 'all' ||
      order.items.some(item => item.brand === brandFilter);

    return matchesSearch && matchesBrand;
  });

  const handleOrderClick = (order) => {
    fetchOrderById(order._id);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  if (loading && !selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <Package className="mx-auto h-16 w-16 text-red-500" />
          <h3 className="mt-4 text-xl font-medium text-gray-900"> Loading orders</h3>
         
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleBackToList}
            className="flex items-center text-blue-700 hover:text-blue-900 mb-6 transition-colors duration-200 text-base font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Orders List
          </button>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Customer Details</h1>
                <p className="text-sm text-gray-600 mt-1">Order ID: {selectedOrder._id}</p>
              </div>
              <div className="flex flex-col space-y-3">
                <span className="text-sm text-gray-500">
                  {formatDate(selectedOrder.orderDate)}
                </span>
                <button
                  onClick={() => generateReceipt(selectedOrder)}
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
                    {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Email Address</label>
                  <p className="text-xs text-gray-900 bg-gray-50 p-2 rounded-lg">
                    {selectedOrder.customer.email}
                  </p>

                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Phone Number</label>
                  <p className="text-base text-gray-900 bg-gray-50 p-2 rounded-lg">
                    {selectedOrder.customer.phone}
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
                    <p className="text-base text-gray-900">{selectedOrder.customer.address}</p>
                    <p className="text-base text-gray-900">
                      {selectedOrder.customer.city}, {selectedOrder.customer.state}
                    </p>
                    <p className="text-base text-gray-900">PIN: {selectedOrder.customer.pincode}</p>
                  </div>
                </div>

                {selectedOrder.customer.specialInstructions && (
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">Special Instructions</label>
                    <p className="text-base text-gray-900 bg-yellow-50 p-2 rounded-lg border-l-4 border-yellow-400">
                      {selectedOrder.customer.specialInstructions}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Order Summary</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-600">Total Amount</p>
                  <p className="text-lg font-bold text-blue-600"> {selectedOrder.totals.total.toFixed(2)}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-600">Items Count</p>
                  <p className="text-lg font-bold text-green-600">{selectedOrder.items.length}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center col-span-2">
                  <p className="text-xs text-gray-600">Order Date</p>
                  <p className="text-base font-semibold text-gray-600">{new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const allBrands = [...new Set(orders.flatMap(order =>
    order.items.map(item => item.brand)
  ))].filter(brand => brand);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
              <p className="text-sm text-gray-600 mt-1">Manage all customer orders</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 font-medium">
                Total Orders: {filteredOrders.length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm appearance-none"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
              >
                <option value="all">All Brands</option>
                {allBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
        </div>

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
                {filteredOrders.map((order) => (
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
                        onClick={() => handleOrderClick(order)}
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
            {filteredOrders.map((order) => (
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
                    onClick={() => handleOrderClick(order)}
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
                    <span className="ml-1 font-medium"> {order.totals.total.toFixed(2)}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-gray-500">Date:</span>
                    <span className="ml-1">{new Date(order.orderDate).toLocaleDateString()}</span>
                  </div>
                  {/* <div className="text-right truncate">
                    <span className="text-gray-500">Discount:</span>
                    <span className="ml-1">
                      {order.totals.discountAmount > 0 ? (
                        <>
                          {order.totals.discountPercentage}%
                          {order.promoCode && ` (${order.promoCode})`}
                        </>
                      ) : 'None'}
                    </span>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-3 text-base font-semibold text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || brandFilter !== 'all'
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