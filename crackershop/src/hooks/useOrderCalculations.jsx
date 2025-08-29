export function useOrderCalculations(cartItems) {
  const DISCOUNT_PERCENTAGE = 0.5; // 50% discount for all orders

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 0;
  const discountAmount = subtotal * DISCOUNT_PERCENTAGE;
  const total = subtotal + deliveryFee - discountAmount;

  return {
    subtotal,
    deliveryFee,
    discountAmount,
    total,
    DISCOUNT_PERCENTAGE
  };
}
