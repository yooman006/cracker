import React from 'react';
import { Tag, Truck, Leaf } from 'lucide-react';

const HeroSection = ({ selectedBrand, scrollToBrands, scrollToProducts }) => {
  const handleShopNowClick = () => {
    if (!selectedBrand) {
      scrollToBrands();
    } else {
      scrollToProducts();
    }
  };

  return (
    <section className="relative py-8 xs:py-10 sm:py-16 md:py-20 overflow-hidden pt-[70px]">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 animate-pulse"></div>
      <div className="container mx-auto px-4 text-center relative z-20">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Light up your
          <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse">
            {" "}Celebration
          </span>
        </h2>
        <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Premium quality crackers for all your festive occasions. Safe, colorful, and spectacular!
        </p>

        {/* Special Offers Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 xs:gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Minimum Order Offer */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-400/30 rounded-xl xs:rounded-2xl px-3 py-2 xs:px-4 xs:py-3 sm:px-5 sm:py-3 md:px-6 md:py-4 flex items-center space-x-2 xs:space-x-3 hover:scale-105 transition-all duration-300 shadow-lg max-w-xs sm:max-w-none relative overflow-hidden">
            <div className="flex-shrink-0">
              <div className="relative">
                <Tag className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-purple-400 animate-pulse" />
                <div className="absolute inset-0 h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-purple-400/30 animate-ping">
                  <Tag className="h-full w-full" />
                </div>
              </div>
            </div>
            <div className="text-left">
              <p className="text-purple-400 font-bold text-xs xs:text-sm sm:text-base">MINIMUM ORDER ₹5000</p>
              <p className="text-purple-300 text-[10px] xs:text-xs sm:text-sm">
                To ensure the best quality service, we maintain a minimum order value of ₹5000.
                This helps us deliver premium products with proper packaging and safe handling.
              </p>
            </div>
          </div>

          {/* Free Delivery Offer */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg border border-green-400/30 rounded-xl xs:rounded-2xl px-3 py-2 xs:px-4 xs:py-3 sm:px-5 sm:py-3 md:px-6 md:py-4 flex items-center space-x-2 xs:space-x-3 hover:scale-105 transition-all duration-300 shadow-lg max-w-xs sm:max-w-none">
            <div className="flex-shrink-0">
              <div className="relative">
                <Truck className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-green-400 animate-bounce" />
                <div className="absolute -top-1 -right-1 w-2 h-2 xs:w-2.5 xs:h-2.5 bg-green-400 rounded-full animate-ping"></div>
              </div>
            </div>
            <div className="text-left">
              <p className="text-green-400 font-bold text-xs xs:text-sm sm:text-base">FREE DELIVERY</p>
              <p className="text-green-300 text-[10px] xs:text-xs sm:text-sm">
                Enjoy doorstep delivery at no extra cost! Place your order before
                <span className="font-semibold"> October 1st</span> and get your crackers delivered safely and fast – absolutely free.
              </p>
            </div>
          </div>

          {/* Eco-Friendly Badge */}
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border border-blue-400/30 rounded-xl xs:rounded-2xl px-3 py-2 xs:px-4 xs:py-3 sm:px-5 sm:py-3 md:px-6 md:py-4 flex items-center space-x-2 xs:space-x-3 hover:scale-105 transition-all duration-300 shadow-lg max-w-xs sm:max-w-none">
            <div className="flex-shrink-0">
              <div className="relative">
                <Leaf className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-blue-400 animate-pulse" />
                <div className="absolute inset-0 h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-blue-400/30 animate-ping">
                  <Leaf className="h-full w-full" />
                </div>
              </div>
            </div>
            <div className="text-left">
              <p className="text-blue-400 font-bold text-xs xs:text-sm sm:text-base">ECO-FRIENDLY</p>
              <p className="text-blue-300 text-[10px] xs:text-xs sm:text-sm">
                We care about the environment. Our crackers are made without harmful chemicals like Barium, Aluminum, or Chromium.
                Instead, we follow government-approved green formulas to ensure a safe and eco-friendly celebration.
                100% certified Green Crackers – burst with joy, not guilt!
              </p>
            </div>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg xs:rounded-xl px-2 py-2 xs:px-3 xs:py-3 sm:px-4 sm:py-3 border border-white/20 hover:border-yellow-400/50 transition-all duration-300">
            <div className="flex items-center justify-center space-x-1 xs:space-x-2">
              <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-[10px] xs:text-xs sm:text-sm font-medium">100% Safe</span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg xs:rounded-xl px-2 py-2 xs:px-3 xs:py-3 sm:px-4 sm:py-3 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 xs:col-span-2 sm:col-span-1">
            <div className="flex items-center justify-center space-x-1 xs:space-x-2">
              <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-white text-[10px] xs:text-xs sm:text-sm font-medium">Premium Quality</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleShopNowClick}
          className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-black px-4 py-2 xs:px-5 xs:py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-xs xs:text-sm sm:text-base md:text-lg font-semibold hover:from-yellow-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-bounce"
        >
          Shop Now
        </button>

        {/* Bulk Order Message */}
        <div className="flex flex-col items-center mt-4">
          <p className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 text-black px-5 py-2 rounded-full text-sm sm:text-base font-semibold shadow-lg animate-pulse">
            📢 <span className="text-red-700">Bulk orders special discount available</span> - Contact:
            <a href="tel:+918903623517" className="text-blue-700 hover:text-blue-900 ml-1">+91 8903623517</a>
            or
            <a href="mailto:seshakavitha30@gmail.com" className="text-blue-700 hover:text-blue-900 ml-1">seshakavitha30@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;