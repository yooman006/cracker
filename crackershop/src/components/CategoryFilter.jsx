import React from 'react';

const CategoryFilter = ({ 
  selectedBrand, 
  brands, 
  availableCategories, 
  activeCategory, 
  setActiveCategory,
  setSelectedBrand
}) => {
  return (
    <>
      {/* Back to Brands Button */}
      <div className="container mx-auto px-2 xs:px-3 mt-4 sm:mt-6">
        <button
          onClick={() => {
            setSelectedBrand(null);
            setActiveCategory('all');
          }}
          className="flex items-center text-white hover:text-yellow-400 transition-colors text-xs sm:text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Brands
        </button>
      </div>

      {/* Category Filter Section */}
      <section id="category-section" className="py-3 xs:py-4 sm:py-5 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto px-2 xs:px-3">
          <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">
            {brands.find(b => b.id === selectedBrand)?.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-1.5 xs:gap-2 sm:gap-3">
            {availableCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-2 py-1 xs:px-2.5 xs:py-1.5 sm:px-3 sm:py-2 rounded-full transition-all duration-200 text-xs xs:text-sm ${activeCategory === category.id
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold shadow-md transform scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryFilter;