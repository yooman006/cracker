import React from 'react';
import { Sparkles, Phone, Mail, Home } from 'lucide-react';

const Footer = ({ handleProductsClick, scrollToFooter }) => {
  return (
    <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 py-6 xs:py-8 sm:py-10 md:py-12 relative z-20">
      <div className="container mx-auto px-3 xs:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-6 sm:gap-8">
          <div>
            <div className="flex items-center space-x-2 xs:space-x-3 mb-3 xs:mb-4">
              <Sparkles className="h-5 w-5 xs:h-6 xs:w-6 text-yellow-400 animate-pulse" />
              <h3 className="text-sm xs:text-base sm:text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                KavithaCrackers Palace
              </h3>
            </div>
            <p className="text-gray-300 text-xs xs:text-sm sm:text-base">Your trusted partner for safe and spectacular celebrations.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2 xs:mb-3 sm:mb-4 text-sm xs:text-base sm:text-lg">Quick Links</h4>
            <ul className="space-y-1 xs:space-y-2 text-gray-300 text-xs xs:text-sm sm:text-base">
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-yellow-400 transition-colors">Home</button></li>
              <li><button onClick={handleProductsClick} className="hover:text-yellow-400 transition-colors">Products</button></li>
              <li><button onClick={scrollToFooter} className="hover:text-yellow-400 transition-colors">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2 xs:mb-3 sm:mb-4 text-sm xs:text-base sm:text-lg">Contact Info</h4>
            <div className="space-y-1 xs:space-y-2 text-gray-300 text-xs xs:text-sm sm:text-base">
              <div className="flex items-center space-x-2">
                <Phone className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
                <span>+91 8903623517</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
                <span>seshakavitha30@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Home className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
                <span>Sivakasi - 626123</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-5 xs:mt-6 sm:mt-8 pt-5 xs:pt-6 sm:pt-8 text-center text-gray-400 text-xs xs:text-sm sm:text-base">
          <p>&copy; 2025 KavithaCrackers Palace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;