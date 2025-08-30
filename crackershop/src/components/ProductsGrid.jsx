import React from 'react';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';

const ProductsGrid = ({ filteredProducts, setActiveCategory }) => {
  // Get cart functionality from CartContext
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <section id="products" className="py-8 xs:py-10 sm:py-12 md:py-16 relative z-20">
      <div className="container mx-auto px-3 xs:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-white text-lg">No products found in this category</p>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-2 rounded-full font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;