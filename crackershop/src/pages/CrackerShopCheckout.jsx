import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, MapPin, Phone, Mail, CreditCard, Shield, CheckCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function CrackerShopCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cart || [];
  const [showAllItems, setShowAllItems] = useState(false);


  const DISCOUNT_PERCENTAGE = 0.5; // 50% discount for all orders

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    specialInstructions: ''
  });

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate order totals with discount
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 0;
  const discountAmount = subtotal * DISCOUNT_PERCENTAGE;
  const total = subtotal + deliveryFee - discountAmount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';

    // Format validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateReceipt = (orderData) => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const itemsPerPage = 15; // Number of items to show per page
    const totalPages = Math.ceil(orderData.items.length / itemsPerPage);

    // Function to add common elements to each page
    const addCommonElements = (pageNumber) => {
      doc.setLineWidth(5);
      doc.roundedRect(5, 5, 200, 287, 3, 3);

      // Header
      doc.setFontSize(22);
      doc.setTextColor(0, 102, 204);
      doc.setFont(undefined, 'bold');
      doc.text('FireCracker ', 105, 30, null, null, 'center');

      // Contact Info
      doc.setFontSize(12);
      doc.setTextColor(51, 153, 255);
      doc.text('Sivakasi - 626123', 105, 40, null, null, 'center');
      doc.text('Phone: +91 8903623517 | Email: seshakavitha30@gmail.com', 105, 46, null, null, 'center');

      // Divider
      doc.setDrawColor(0, 153, 255);
      doc.setLineWidth(1);
      doc.line(30, 55, 180, 55);

     



      // Customer Info (only on first page)
      if (pageNumber === 1) {
         // Order Header
      doc.setFontSize(16);
      doc.setTextColor(80, 80, 80);
      doc.text('ORDER RECEIPT', 105, 65, null, null, 'center');

        // Order Info (on all pages, right aligned)
        doc.setFontSize(10);
        doc.setTextColor(0, 102, 204);
        doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 180, 75, null, null, 'right');
        doc.text(`Order ID: ${orderData._id}`, 180, 81, null, null, 'right');
        doc.setFontSize(12);
        doc.setTextColor(0, 51, 153);
        doc.text('Customer Information:', 20, 95);

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Name: ${orderData.customer.firstName} ${orderData.customer.lastName}`, 25, 103);
        doc.text(`Email: ${orderData.customer.email}`, 25, 109);
        doc.text(`Phone: ${orderData.customer.phone}`, 25, 115);
        doc.text(`Address: ${orderData.customer.address}, ${orderData.customer.city}, ${orderData.customer.state} - ${orderData.customer.pincode}`, 25, 121);
      }

      // Page number (bottom right)
      doc.text(`Page: ${pageNumber}/${totalPages}`, 180, 285);
    };

    // Function to add order items table with serial numbers
    const addItemsTable = (items, startY, pageNumber) => {
      // Order Items header
      doc.setFontSize(12);
      doc.setTextColor(0, 51, 153);
      doc.text('Order Items:', 20, startY);

      // Header row with solid blue fill
      doc.setFillColor(0, 153, 255);
      doc.rect(20, startY + 5, 170, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text('S.No', 25, startY + 10); // Serial Number column
      doc.text('Item', 40, startY + 10);  // Adjusted position
      doc.text('Brand', 95, startY + 10);
      doc.text('Price', 140, startY + 10);
      doc.text('Qty', 160, startY + 10);
      doc.text('Total', 180, startY + 10);

      // Table rows with alternating background
      let yPos = startY + 15;
      items.forEach((item, index) => {
        const rowColor = index % 2 === 0 ? [245, 250, 255] : [230, 240, 255];
        doc.setFillColor(...rowColor);
        doc.rect(20, yPos - 3, 180, 6, 'F');

        doc.setTextColor(0, 0, 0);

        // Calculate serial number considering pagination
        const serialNumber = (pageNumber - 1) * itemsPerPage + index + 1;

        // Draw serial number
        doc.text(serialNumber.toString(), 25, yPos);

        // Split long item names into multiple lines if needed
        const itemNameLines = doc.splitTextToSize(item.name, 50); // Reduced width for item name
        const brandLines = doc.splitTextToSize(item.brand || '', 30);

        // Get the number of lines needed for this row
        const linesNeeded = Math.max(itemNameLines.length, brandLines.length);

        // Draw item name (multiple lines if needed)
        doc.text(itemNameLines, 40, yPos);

        // Draw brand (multiple lines if needed)
        doc.text(brandLines, 95, yPos);

        // Draw price, quantity and total (aligned to first line)
        doc.text(`${Math.round(item.price.toFixed(2))}`, 140, yPos);
        doc.text(item.quantity.toString(), 160, yPos);
        doc.text(`${Math.round(item.price * item.quantity).toFixed(2)}`, 180, yPos);

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
      doc.text(`${Math.round(orderData.totals.subtotal.toFixed(2))}`, 180, yPos + 18);

      if (orderData.totals.discountAmount > 0) {
        doc.text(`Discount :`, 140, yPos + 24);
        doc.text(`-${orderData.totals.discountPercentage}%`, 180, yPos + 24);
        yPos += 6;
      }

      doc.setFont(undefined, 'bold');
      doc.text('Total Amount:', 140, yPos + 30);
      doc.text(`${Math.round(orderData.totals.total.toFixed(2))}`, 180, yPos + 30);

      // Footer
      doc.setFontSize(12);
      doc.setTextColor(0, 102, 204);
      doc.text(' Thank you for your purchase!', 105, yPos + 50, null, null, 'center');
      doc.setTextColor(0, 0, 0);
      doc.text('For any queries, contact us at seshkavitha30@gmail.com', 105, yPos + 56, null, null, 'center');

      // Dragon Ball Stars
      doc.setFillColor(255, 204, 0);
      for (let i = 1; i <= 4; i++) {
        doc.circle(30 + (i * 30), yPos + 65, 3, 'F');
      }
    };

    // Generate each page
    for (let page = 1; page <= totalPages; page++) {
      if (page > 1) {
        doc.addPage();
      }

      addCommonElements(page);

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, orderData.items.length);
      const pageItems = orderData.items.slice(startIndex, endIndex);

      // Calculate starting Y position based on whether it's the first page
      const startY = page === 1 ? 135 : 30;
      let yPos = addItemsTable(pageItems, startY, page);

      // Add totals only on the last page
      if (page === totalPages) {
        addTotalsSection(yPos);
      }
    }

    doc.save(`order_receipt_${orderData._id}.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const orderData = {
        customer: formData,
        items: cartItems.map(item => ({
          productId: item.id.toString(),
          name: item.name,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity
        })),
        totals: {
          subtotal,
          deliveryFee,
          discountPercentage: DISCOUNT_PERCENTAGE * 100,
          discountAmount: discountAmount,
          total
        },

      };

      const response = await fetch('https://sivakasi-crackers-shop-backend.azurewebsites.net/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit order');
      }

      const responseData = await response.json(); // Read the response once

      setShowSuccess(true);

      // Pass both the orderData and the actual order ID from the response
      // This call will trigger the PDF download.
      generateReceipt({
        ...orderData,
        _id: responseData.order._id, // Use the actual order ID from the server
        orderDate: responseData.order.orderDate // Use the server-generated order date
      });

    } catch (error) {
      console.error('Order submission error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4 relative">
      {/* Success Popup Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full animate-pop-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600 mb-6">Thank you for your purchase. We've received your order.</p>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  navigate('/');
                }}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎆 Sparkling Crackers</h1>
          <p className="text-gray-600">Complete your festive order</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Customer Details Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-orange-600" />
                Customer Details
              </h2>

              <div className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    Delivery Address
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.address ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="House/Flat number, Street, Area"
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.city ? 'border-red-500' : 'border-gray-300'
                            }`}
                          placeholder="City"
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.state ? 'border-red-500' : 'border-gray-300'
                            }`}
                          placeholder="State"
                        />
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.pincode ? 'border-red-500' : 'border-gray-300'
                            }`}
                          placeholder="000000"
                        />
                        {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="Any special instructions for delivery or handling..."
                  />
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-2 text-orange-500" />
                  Your information is secure and will not be shared with third parties.
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Payment Information
                  </h3>
                  <div className="text-sm text-blue-700 space-y-2">
                    <p className="font-medium">We will call you once your estimate order is placed. You can choose your Payment option.
                      We accept Google Pay, Account Transfer
                      Note:Cash on delivery not available</p>

                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Place Order 🎆'
                  )}
                </button>
              </div>
            </div>

            {/* Order Summary */}
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
                <table className="w-full">
                  <thead className="sticky top-0 bg-white z-10">
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-2 text-sm font-medium text-gray-500">Item</th>
                      <th className="text-right pb-2 text-sm font-medium text-gray-500">Price</th>
                      <th className="text-right pb-2 text-sm font-medium text-gray-500">Qty</th>
                      <th className="text-right pb-2 text-sm font-medium text-gray-500">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {/* Always show first 3 items */}
                    {cartItems.slice(0, 3).map((item) => (
                      <tr key={`visible-${item.id}`} className="hover:bg-gray-50">
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

                    {/* Show "Show more" button if more than 3 items */}
                    {cartItems.length > 3 && (
                      <tr className="border-t border-gray-200">
                        <td colSpan="4" className="py-2 text-center">
                          <button
                            className="text-orange-600 text-sm font-medium hover:underline"
                            onClick={() => setShowAllItems(!showAllItems)}
                          >
                            {showAllItems ? 'Show less' : `Show ${cartItems.length - 3} more items`}
                          </button>
                        </td>
                      </tr>
                    )}

                    {/* Hidden items (shown when expanded) */}
                    {showAllItems && cartItems.slice(3).map((item) => (
                      <tr key={`hidden-${item.id}`} className="hover:bg-gray-50">
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
              </div>

              {/* Sticky totals section with whole numbers */}
              <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{Math.round(subtotal)}</span>
                  </div>
                  {DISCOUNT_PERCENTAGE > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (50%)</span>
                      <span>-₹{Math.round(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-gray-800 pt-2">
                    <span>Total</span>
                    <span>₹{Math.round(total)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">💡 Important Notes:</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• All crackers are tested for quality</li>
                    <li>• Safe handling instructions included</li>
                    <li>• 24/7 customer support available</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
