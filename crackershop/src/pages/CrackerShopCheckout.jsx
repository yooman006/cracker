import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { OrderSummary } from '../components/OrderSummary';
import { CustomerForm } from '../components/CustomerForm';
import { SuccessModal } from '../components/SuccessModel';
import { useCheckoutForm } from '../hooks/useCheckoutForm';
import { useOrderCalculations } from '../hooks/useOrderCalculations';
import { generateReceipt, sendReceiptEmail } from '../utils/receiptGenerator';
import { submitOrder } from '../services/orderService';
import { useCart } from '../context/CartContext';

export default function CrackerShopCheckout() {
  const navigate = useNavigate();
  const { cart: cartItems, clearCart } = useCart();
  
  const [showAllItems, setShowAllItems] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailStatus, setEmailStatus] = useState(''); // Track email sending status

  const { formData, errors, handleInputChange, validate } = useCheckoutForm();
  const calculations = useOrderCalculations(cartItems);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setEmailStatus('Processing order...');

    try {
      const orderData = {
        customer: formData,
        items: cartItems.map(item => ({
          productId: item.id.toString(),
          name: item.name,
          brand: item.brand,
          category: item.category, // Include category for gift box detection
          price: item.price,
          quantity: item.quantity
        })),
        totals: {
          subtotal: calculations.subtotal,
          deliveryFee: calculations.deliveryFee,
          discountPercentage: calculations.DISCOUNT_PERCENTAGE * 100,
          discountAmount: calculations.discountAmount,
          total: calculations.total
        },
      };

      // Submit order to backend
      const responseData = await submitOrder(orderData);
      
      const completeOrderData = {
        ...orderData,
        _id: responseData.order._id,
        orderDate: responseData.order.orderDate
      };

      // Generate PDF (downloads automatically) and get base64 for email
      setEmailStatus('Generating receipt...');
      const pdfBase64 = generateReceipt(completeOrderData);

      // Send receipt via email
      setEmailStatus('Sending receipt to your email...');
      try {
        await sendReceiptEmail(completeOrderData, pdfBase64);
        setEmailStatus('Receipt sent successfully to your email!');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        setEmailStatus('Order completed! Receipt downloaded, but email sending failed.');
        // Don't throw error here - order was successful, just email failed
      }

      setShowSuccess(true);

    } catch (error) {
      console.error('Order submission error:', error);
      setEmailStatus('');
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setEmailStatus('');
    // Clear the cart after successful order
    clearCart();
    navigate('/');
  };

  const handleGoBack = () => {
    // Cart is preserved automatically through context
    navigate(-1);
  };

  const handleContinueShopping = () => {
    // Cart is preserved automatically through context
    navigate('/');
  };

  // If no cart items, redirect back
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart before proceeding to checkout.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-3 px-6 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4 relative">
      <SuccessModal showSuccess={showSuccess} onClose={handleSuccessClose} />

      <div className="max-w-6xl mx-auto">
        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">🎆 Kavitha Crackers</h1>
              <p className="text-gray-600">Complete your festive order</p>
            </div>
          </div>
          
          <button
            onClick={handleContinueShopping}
            className="bg-white/50 hover:bg-white/70 text-gray-700 px-4 py-2 rounded-lg transition-all border border-gray-200"
          >
            Continue Shopping
          </button>
        </div>

        {/* Email Status Message */}
        {emailStatus && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-center">{emailStatus}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            <OrderSummary
              cartItems={cartItems}
              totals={calculations}
              showAllItems={showAllItems}
              setShowAllItems={setShowAllItems}
            />
            
            <CustomerForm
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}