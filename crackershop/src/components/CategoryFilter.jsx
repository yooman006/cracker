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
      <div className="container mx-auto px-3 xs:px-4 mt-6 sm:mt-8">
        <button
          onClick={() => {
            setSelectedBrand(null);
            setActiveCategory('all');
          }}
          className="flex items-center text-white hover:text-yellow-400 transition-colors text-sm sm:text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Brands
        </button>
      </div>

      {/* Category Filter Section */}
      <section id="category-section" className="py-4 xs:py-5 sm:py-6 md:py-8 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto px-3 xs:px-4">
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">
            {brands.find(b => b.id === selectedBrand)?.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4">
            {availableCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-2 py-1 xs:px-3 xs:py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 rounded-full transition-all duration-300 ${activeCategory === category.id
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold shadow-lg transform scale-105'
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