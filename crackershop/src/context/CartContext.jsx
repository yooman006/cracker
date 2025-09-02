import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Enhanced cart persistence
  useEffect(() => {
    // Try to load from multiple sources
    const savedCart = window.cartData || 
                     (window.parent && window.parent.cartData) || 
                     [];
    
    if (savedCart.length > 0) {
      setCart(savedCart);
    }
  }, []);

  // Enhanced save to multiple locations
  useEffect(() => {
    window.cartData = cart;
    // Also try to save to parent window if available
    if (window.parent && window.parent !== window) {
      window.parent.cartData = cart;
    }
    // Store in a more persistent way using window name as backup
    if (cart.length > 0) {
      try {
        window.name = JSON.stringify({ cartData: cart, timestamp: Date.now() });
      } catch (e) {
        // Fallback if JSON.stringify fails
        console.warn('Could not persist cart data');
      }
    }
  }, [cart]);

  // Try to restore from window.name on mount
  useEffect(() => {
    try {
      if (window.name && cart.length === 0) {
        const stored = JSON.parse(window.name);
        if (stored.cartData && Array.isArray(stored.cartData)) {
          // Check if data is not too old (less than 24 hours)
          const isRecent = Date.now() - stored.timestamp < 24 * 60 * 60 * 1000;
          if (isRecent) {
            setCart(stored.cartData);
          }
        }
      }
    } catch (e) {
      // Ignore JSON parse errors
    }
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== productId);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
    window.cartData = [];
    window.name = '';
    if (window.parent && window.parent !== window) {
      window.parent.cartData = [];
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};