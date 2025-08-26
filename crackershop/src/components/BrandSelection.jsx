import React from 'react';

const BrandSelection = ({ brands, handleBrandSelect }) => {
  return (
    <section id="brands" className="py-8 xs:py-10 sm:py-12 md:py-16 relative z-20">
      <div className="container mx-auto px-3 xs:px-4">
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
          Select a Brand
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 max-w-3xl mx-auto">
          {brands.map(brand => (
            <div
              key={brand.id}
              onClick={() => handleBrandSelect(brand.id)}
              className={`bg-gradient-to-r ${brand.color} rounded-xl xs:rounded-2xl overflow-hidden shadow-lg xs:shadow-xl md:shadow-2xl border border-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:scale-105 cursor-pointer group relative`}
            >
              {/* Discount Ribbon */}
              <div className="absolute top-4 right-[-30px] bg-red-600 text-white text-xs sm:text-sm font-bold py-1 px-10 transform rotate-45 shadow-lg">
                50% OFF
              </div>

              <div className="relative overflow-hidden h-48 xs:h-56 sm:h-64">
                <div className="absolute inset-0 bg-black/30 opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white">
                    {brand.name}
                  </h3>
                  <p className="text-white/90 mt-2 text-sm xs:text-base">
                    {brand.description}
                  </p>
                </div>
              </div>
              <div className="p-4 xs:p-5 sm:p-6 text-center bg-black/20">
                <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-white/90 transition-all duration-300">
                  View Products
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSelection;