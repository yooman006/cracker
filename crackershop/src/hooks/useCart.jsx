import { useState } from 'react';
import { toast } from 'react-toastify';

export const useCart = (brands) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Check if cart is not empty and the new product's brand doesn't match existing items
    if (cart.length > 0 && cart[0].brand !== product.brand) {
      toast.error(
        `You can only purchase items from one brand at a time. 
            Your cart contains ${brands.find(b => b.id === cart[0].brand)?.name} items.`,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        ...product,
        quantity: 1,
        brand: product.brand
      }]);
    }
  };

  const removeFromCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getUniqueProductCount = () => {
    return cart.length;
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    getUniqueProductCount,
    clearCart
  };
};