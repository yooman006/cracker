import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderSummary } from '../components/OrderSummary';
import { CustomerForm } from '../components/CustomerForm';
import { SuccessModal } from '../components/SuccessModel';
import { useCheckoutForm } from '../hooks/useCheckoutForm';
import { useOrderCalculations } from '../hooks/useOrderCalculations';
import { generateReceipt } from '../utils/receiptGenerator';
import { submitOrder } from '../services/orderService';

export default function CrackerShopCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cart || [];
  
  const [showAllItems, setShowAllItems] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { formData, errors, handleInputChange, validate } = useCheckoutForm();
  const calculations = useOrderCalculations(cartItems);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

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
          subtotal: calculations.subtotal,
          deliveryFee: calculations.deliveryFee,
          discountPercentage: calculations.DISCOUNT_PERCENTAGE * 100,
          discountAmount: calculations.discountAmount,
          total: calculations.total
        },
      };

      const responseData = await submitOrder(orderData);
      setShowSuccess(true);

      generateReceipt({
        ...orderData,
        _id: responseData.order._id,
        orderDate: responseData.order.orderDate
      });

    } catch (error) {
      console.error('Order submission error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4 relative">
      <SuccessModal showSuccess={showSuccess} onClose={handleSuccessClose} />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎆 Kavitha Crackers</h1>
          <p className="text-gray-600">Complete your festive order</p>
        </div>

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