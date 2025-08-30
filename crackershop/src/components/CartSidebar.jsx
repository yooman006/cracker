import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BRANDS } from '../constants/appConstants';

const CartSidebar = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    addToCart, 
    removeFromCart, 
    getTotalPrice 
  } = useCart();

  const handleCheckout = () => {
    // Additional check (though this shouldn't be needed if addToCart is properly implemented)
    const brandsInCart = [...new Set(cart.map(item => item.brand))];
    if (brandsInCart.length > 1) {
      alert("Your cart contains items from multiple brands. Please only select items from one brand.");
      return;
    }
    setIsCartOpen(false);
    navigate('/checkout', { 
      state: { 
        cart,
        fromCart: true
      } 
    });
  };

  return (
    <>
      {/* Cart Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full xs:w-80 sm:w-96 bg-black/95 backdrop-blur-lg border-l border-white/20 transform transition-transform duration-300 z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-3 xs:p-4 sm:p-5 md:p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4 xs:mb-5 sm:mb-6">
            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white">Shopping Cart</h3>
            {cart.length > 0 && (
              <div className="text-xs xs:text-sm text-yellow-400">
                Brand: {BRANDS.find(b => b.id === cart[0]?.brand)?.name}
              </div>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-white hover:text-yellow-400 bg-white/10 hover:bg-white/20 p-1 rounded-full transition-all duration-300 text-xl xs:text-2xl flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">Your cart is empty</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/');
                  }}
                  className="text-yellow-400 hover:text-yellow-300 font-medium"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3 xs:space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-white/10 rounded-lg p-3 xs:p-4 flex items-center space-x-3 xs:space-x-4">
                    <img src={item.image} alt={item.name} className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-xs xs:text-sm sm:text-base">{item.name}</h4>
                      <p className="text-yellow-400 text-xs xs:text-sm sm:text-base">₹{Math.round(item.price)}</p>
                    </div>
                    <div className="flex items-center space-x-1.5 xs:space-x-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 sm:w-7 sm:h-7 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full flex items-center justify-center shadow-md shadow-yellow-500/30 transition-all"
                      >
                        <Minus className="w-3 h-3 stroke-2" />
                      </button>

                      <span className="text-white w-5 xs:w-6 sm:w-7 text-center text-xs xs:text-sm sm:text-base">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => addToCart(item)}
                        className="w-6 h-6 sm:w-7 sm:h-7 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full flex items-center justify-center shadow-md shadow-yellow-500/30 transition-all"
                      >
                        <Plus className="w-3 h-3 stroke-2" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-white/20 pt-4 xs:pt-5 sm:pt-6">
              <div className="flex justify-between items-center mb-3 xs:mb-4">
                <span className="text-white text-sm xs:text-base sm:text-lg">Total:</span>
                <span className="text-yellow-400 text-base xs:text-lg sm:text-xl md:text-2xl font-bold">₹{Math.round(getTotalPrice())}</span>
              </div>
              
              {/* Action buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-2 xs:py-2.5 sm:py-3 rounded-full font-medium xs:font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm xs:text-base"
                >
                  Proceed to Checkout
                </button>
                
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-2 xs:py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm xs:text-base border border-white/20"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for cart */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}
    </>
  );
};

export default CartSidebar;