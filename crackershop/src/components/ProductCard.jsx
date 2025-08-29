import React from 'react';
import { Star, Plus, Minus } from 'lucide-react';

const ProductCard = ({ product, cart, addToCart, removeFromCart }) => {
  const cartItem = cart.find(item => item.id === product.id);
  const isDisabled = cart.length > 0 && cart[0].brand !== product.brand;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg md:shadow-xl border border-white/20 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-102 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-24 sm:h-32 md:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/70 backdrop-blur-sm rounded-full px-1.5 sm:px-2 py-0.5 flex items-center space-x-1">
          <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400 fill-current" />
          <span className="text-white text-xs">{product.rating}</span>
        </div>
        <div className={`absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 h-1 sm:h-1.5 bg-gradient-to-r ${product.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      </div>
      <div className="p-2 sm:p-3 md:p-4">
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-300 text-xs mb-2 sm:mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className={`text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>
            ₹{Math.round(product.price)}
          </span>

          {cartItem ? (
            // Show quantity selector if item is in cart
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full border border-white/30 overflow-hidden">
              <button
                onClick={() => removeFromCart(product.id)}
                className="w-6 h-6 sm:w-7 sm:h-7 bg-red-500 hover:bg-red-600 text-white font-bold flex items-center justify-center transition-all duration-200"
                disabled={isDisabled}
              >
                <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-2" />
              </button>

              <span className="px-1.5 sm:px-2 py-1 text-white font-semibold text-xs sm:text-sm min-w-[1.5rem] text-center">
                {cartItem.quantity}
              </span>

              <button
                onClick={() => addToCart(product)}
                className="w-6 h-6 sm:w-7 sm:h-7 bg-green-500 hover:bg-green-600 text-white font-bold flex items-center justify-center transition-all duration-200"
                disabled={isDisabled}
              >
                <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-2" />
              </button>
            </div>
          ) : (
            // Show Add button if item is not in cart
            <button
              onClick={() => addToCart(product)}
              disabled={isDisabled}
              className={`bg-gradient-to-r ${product.color} text-black px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full hover:shadow transition-all duration-200 flex items-center space-x-1 text-xs sm:text-sm ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="hidden sm:inline">Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;