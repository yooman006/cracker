import React from 'react';
import { Star, Plus, Minus } from 'lucide-react';

const ProductCard = ({ product, cart, addToCart, removeFromCart }) => {
  const cartItem = cart.find(item => item.id === product.id);
  const isDisabled = cart.length > 0 && cart[0].brand !== product.brand;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl xs:rounded-2xl overflow-hidden shadow-lg xs:shadow-xl md:shadow-2xl border border-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:scale-105 hover:rotate-1 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 xs:h-40 sm:h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-3 xs:top-4 right-3 xs:right-4 bg-black/70 backdrop-blur-sm rounded-full px-2 xs:px-3 py-0.5 xs:py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 xs:h-4 xs:w-4 text-yellow-400 fill-current animate-pulse" />
          <span className="text-white text-xs xs:text-sm">{product.rating}</span>
        </div>
        <div className={`absolute bottom-3 xs:bottom-4 left-3 xs:left-4 right-3 xs:right-4 h-1.5 xs:h-2 bg-gradient-to-r ${product.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`}></div>
      </div>
      <div className="p-3 xs:p-4 sm:p-5 md:p-6">
        <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-white mb-1 xs:mb-2">{product.name}</h3>
        <p className="text-gray-300 text-xs xs:text-sm mb-3 xs:mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className={`text-base xs:text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>
            ₹{Math.round(product.price)}
          </span>

          {cartItem ? (
            // Show quantity selector if item is in cart
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full border border-white/30 overflow-hidden">
              <button
                onClick={() => removeFromCart(product.id)}
                className="w-8 h-8 xs:w-9 xs:h-9 bg-red-500 hover:bg-red-600 text-white font-bold flex items-center justify-center transition-all duration-300 hover:scale-105"
                disabled={isDisabled}
              >
                <Minus className="w-3 h-3 xs:w-4 xs:h-4 stroke-2" />
              </button>

              <span className="px-3 xs:px-4 py-2 text-white font-semibold text-sm xs:text-base min-w-[2rem] text-center">
                {cartItem.quantity}
              </span>

              <button
                onClick={() => addToCart(product)}
                className="w-8 h-8 xs:w-9 xs:h-9 bg-green-500 hover:bg-green-600 text-white font-bold flex items-center justify-center transition-all duration-300 hover:scale-105"
                disabled={isDisabled}
              >
                <Plus className="w-3 h-3 xs:w-4 xs:h-4 stroke-2" />
              </button>
            </div>
          ) : (
            // Show Add button if item is not in cart
            <button
              onClick={() => addToCart(product)}
              disabled={isDisabled}
              className={`bg-gradient-to-r ${product.color} text-black px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 xs:space-x-2 text-xs xs:text-sm sm:text-base ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Plus className="h-3 w-3 xs:h-4 xs:w-4" />
              <span className="hidden xs:inline">Add to Cart</span>
              <span className="xs:hidden">Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;