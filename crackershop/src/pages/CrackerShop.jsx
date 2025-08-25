import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Plus, Minus, Sparkles, Home, ArrowUp, Phone, Mail, Menu, X, Truck, Leaf, Tag } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { products } from './productsData';

const CrackerShop = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [crackers, setCrackers] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const navigate = useNavigate();


  const categories = [
    { id: 'all', name: 'All' },
    { id: 'giftbox', name: 'Giftbox' },
    { id: 'Walla', name: 'Walla' },
    { id: 'flash-light', name: 'Flash Light Crackers' },
    { id: 'ground-chakkar', name: 'Ground Chakkar' },
    { id: 'flower-pots', name: 'Flower Pots' },
    { id: 'fountains', name: 'Fountains' },
    { id: 'bombs', name: 'Bombs' },
    { id: 'pencil', name: 'Pencil' },
    { id: 'rockets', name: 'Rockets' },
    { id: 'sliver-showers', name: 'Sliver Showers' },
    { id: 'bijili-crackers', name: 'Bijili Crackers' },
    { id: 'fancy-items', name: 'Fancy Items' },
    { id: 'paper-items', name: 'Paper Items' },
    { id: 'chotta-fancy-items', name: 'Chotta Fancy Items' },
    { id: 'aerial-fancy', name: 'Aerial Fancy' },
    { id: 'double-effect-fancy', name: 'Double Effect Fancy' },
    { id: 'mega-flash-fancy', name: 'Mega Flash Fancy' },
    { id: 'colour-magic', name: 'Colour Magic' },
    { id: 'multi-shot', name: 'Multi Shot' },
    { id: 'kids-crackers', name: 'Kids Crackers' },
    { id: 'flying-toys', name: 'Flying Toys' },
    { id: 'camera-crackers', name: 'Camera Crackers' },
    { id: 'spinners', name: 'Spinners' },
    { id: 'sound-crackers', name: 'Sound Crackers' },
    { id: 'sparklers-7cm', name: '7cm Sparklers' },
    { id: 'sparklers-10cm', name: '10cm Sparklers' },
    { id: 'sparklers-12cm', name: '12cm Sparklers' },
    { id: 'sparklers-15cm', name: '15cm Sparklers' },
    { id: 'sparklers-30cm', name: '30cm Sparklers' },
    { id: 'sparklers-50cm', name: '50cm Sparklers' },

  ];

  const brands = [
    {
      id: 'standard',
      name: 'Standard Crackers',
      description: 'Premium quality crackers with traditional designs',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'pothis',
      name: 'Sree Pothis Crackers',
      description: 'Innovative designs with spectacular effects',
      color: 'from-red-500 to-orange-500'
    }
  ];

  // Check for mobile viewport
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Create cracker animation effect
  useEffect(() => {
    const createCracker = () => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];
      const newCracker = {
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: colors[Math.floor(Math.random() * colors.length)], size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 4,
        speedY: (Math.random() - 0.5) * 4,
        life: 100
      };
      return newCracker;
    };

    const maxCrackers = isMobile ? 8 : 15;
    const interval = setInterval(() => {
      setCrackers(prev => {
        const newCrackers = prev
          .map(cracker => ({
            ...cracker,
            x: cracker.x + cracker.speedX,
            y: cracker.y + cracker.speedY,
            life: cracker.life - 1
          }))
          .filter(cracker => cracker.life > 0);

        if (newCrackers.length < maxCrackers) {
          newCrackers.push(createCracker());
        }

        return newCrackers;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set smooth scrolling behavior
  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      html.style.scrollBehavior = 'smooth';
    }
    return () => {
      if (html) {
        html.style.scrollBehavior = 'auto';
      }
    };
  }, []);

  const handleBrandSelect = (brandId) => {
    setSelectedBrand(brandId);
    setActiveCategory('all'); // Reset category to 'all'

    // Use setTimeout to allow the state to update before scrolling
    setTimeout(() => {
      scrollToProducts();
    }, 50);
  };

  const getAvailableCategories = () => {
    if (!selectedBrand) return [];

    const availableCategories = new Set();

    products.forEach(product => {
      if (product.brand === selectedBrand) {
        availableCategories.add(product.category);
      }
    });

    return [
      { id: 'all', name: 'All' },
      ...categories.filter(category => availableCategories.has(category.id))
    ];
  };

  const getUniqueProductCount = () => {
    return cart.length; // Simply returns the number of unique products
  };

  const addToCart = (product) => {
    // Check if cart is not empty and the new product's brand doesn't match existing items
    if (cart.length > 0 && cart[0].brand !== product.brand) {
      toast.error(
        `You can only purchase items from one brand at a time. 
            Your cart contains ${brands.find(b => b.id === cart[0].brand)?.name} items.`,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        ...product,
        quantity: 1,
        brand: product.brand
      }]);
    }
  };
  const removeFromCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredProducts = selectedBrand
    ? (activeCategory === 'all'
      ? products.filter(product => product.brand === selectedBrand)
      : products.filter(product => product.brand === selectedBrand && product.category === activeCategory))
    : [];

  const scrollToProducts = () => {
    const scroll = () => {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        window.scrollTo({
          top: productsSection.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    };

    // Try immediately, then try again after a short delay if needed
    scroll();
    setTimeout(scroll, 100);
  };
  const scrollToBrands = () => {
    const brandsSection = document.getElementById('brands');
    if (brandsSection) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      window.scrollTo({
        top: brandsSection.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
  };

  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      window.scrollTo({
        top: footer.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleProductsClick = () => {
    if (!selectedBrand) {
      scrollToBrands();
    } else {
      scrollToProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 relative overflow-hidden">
      {/* Animated Cracker Effects */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {crackers.map(cracker => (
          <div
            key={cracker.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${cracker.x}px`,
              top: `${cracker.y}px`,
              width: `${cracker.size}px`,
              height: `${cracker.size}px`,
              backgroundColor: cracker.color,
              opacity: cracker.life / 100,
              boxShadow: `0 0 ${cracker.size * 2}px ${cracker.color}`,
              transition: 'all 0.1s ease-out'
            }}
          />
        ))}
      </div>

      {/* Floating Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <Sparkles className="h-2 w-2 xs:h-3 xs:w-3 sm:h-4 sm:w-4 text-yellow-400 opacity-70" />
          </div>
        ))}
      </div>

      {/* Header - Fixed at top */}
      <header className="bg-black/30 backdrop-blur-lg border-b border-white/20 fixed top-0 left-0 right-0 z-50">
        <div className="w-full max-w-none px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 py-2 xs:py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-2 xs:space-x-3 flex-shrink-0">
              <div className="relative">
                <Sparkles className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-400 animate-spin" />
                <div className="absolute inset-0 h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-400 animate-ping opacity-25">
                  <Sparkles className="h-full w-full" />
                </div>
              </div>
              <div className="text-[20px] xs:text-xs sm:text-sm md:text-base lg:text-lg font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent whitespace-nowrap">
                KavithaCrackers
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex xl:space-x-8 lg:space-x-6 flex-1 justify-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-white hover:text-yellow-400 transition-colors duration-300 text-sm lg:text-base font-medium"
              >
                Home
              </button>
              <button
                onClick={handleProductsClick}
                className="text-white hover:text-yellow-400 transition-colors duration-300 text-sm lg:text-base font-medium"
              >
                Products
              </button>
              <button
                onClick={scrollToFooter}
                className="text-white hover:text-yellow-400 transition-colors duration-300 text-sm lg:text-base font-medium"
              >
                Contact
              </button>
            </nav>

            {/* Right Side - Cart & Menu */}
            <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 flex-shrink-0">
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black p-2 xs:px-3 xs:py-2 md:px-4 md:py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <ShoppingCart className="h-5 w-5 xs:h-4 xs:w-4 sm:h-4 sm:w-4" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 xs:-top-1.5 xs:-right-1.5 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[10px] xs:text-xs rounded-full h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 flex items-center justify-center animate-pulse font-bold">
                    {getUniqueProductCount()}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white p-1.5 xs:p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100 pt-4' : 'max-h-0 opacity-0'}`}>
            <div className="py-2 xs:py-4 border-t border-white/20 mt-3 xs:mt-4">
              <nav className="flex flex-col space-y-2 xs:space-y-3">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white hover:text-yellow-400 transition-colors duration-300 py-1.5 xs:py-2 px-2 rounded-lg hover:bg-white/10 text-xs xs:text-sm sm:text-base text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    handleProductsClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white hover:text-yellow-400 transition-colors duration-300 py-1.5 xs:py-2 px-2 rounded-lg hover:bg-white/10 text-xs xs:text-sm sm:text-base text-left"
                >
                  Products
                </button>
                <button
                  onClick={() => {
                    scrollToFooter();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white hover:text-yellow-400 transition-colors duration-300 py-1.5 xs:py-2 px-2 rounded-lg hover:bg-white/10 text-xs xs:text-sm sm:text-base text-left"
                >
                  Contact
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
                  <span className="font-semibold"> October 1st</span> and get your crackers delivered safely and fast — absolutely free.
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
                  100% certified Green Crackers—burst with joy, not guilt!
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
            onClick={() => {
              if (!selectedBrand) {
                scrollToBrands();
              } else {
                scrollToProducts();
              }
            }}
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

      {/* Brand Selection Section */}
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

      {/* Products Section - Only shown when a brand is selected */}
      {selectedBrand && (
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


          {/* Category Filter */}
          <section id="category-section" className="py-4 xs:py-5 sm:py-6 md:py-8 bg-black/30 backdrop-blur-md">
            <div className="container mx-auto px-3 xs:px-4">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">
                {brands.find(b => b.id === selectedBrand)?.name}
              </h2>
              <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4">
                {getAvailableCategories().map(category => (
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

          {/* Products Grid */}
          <section id="products" className="py-8 xs:py-10 sm:py-12 md:py-16 relative z-20">
            <div className="container mx-auto px-3 xs:px-4">
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div key={product.id} className="bg-white/10 backdrop-blur-lg rounded-xl xs:rounded-2xl overflow-hidden shadow-lg xs:shadow-xl md:shadow-2xl border border-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:scale-105 hover:rotate-1 group">

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

                          {/* Check if item is in cart */}
                          {(() => {
                            const cartItem = cart.find(item => item.id === product.id);
                            const isDisabled = cart.length > 0 && cart[0].brand !== product.brand;

                            if (cartItem) {
                              // Show quantity selector if item is in cart
                              return (
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
                              );
                            } else {
                              // Show Add button if item is not in cart
                              return (
                                <button
                                  onClick={() => addToCart(product)}
                                  disabled={isDisabled}
                                  className={`bg-gradient-to-r ${product.color} text-black px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 xs:space-x-2 text-xs xs:text-sm sm:text-base ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  <Plus className="h-3 w-3 xs:h-4 xs:w-4" />
                                  <span className="hidden xs:inline">Add to Cart</span>
                                  <span className="xs:hidden">Add</span>
                                </button>
                              );
                            }
                          })()}
                        </div>
                      </div>
                    </div>
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
        </>
      )}

      {/* Footer */}
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

      {/* Cart Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full xs:w-80 sm:w-96 bg-black/95 backdrop-blur-lg border-l border-white/20 transform transition-transform duration-300 z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-3 xs:p-4 sm:p-5 md:p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4 xs:mb-5 sm:mb-6">
            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white">Shopping Cart</h3>
            {cart.length > 0 && (
              <div className="text-xs xs:text-sm text-yellow-400">
                Brand: {brands.find(b => b.id === cart[0]?.brand)?.name}
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
              <p className="text-gray-400 text-center py-6 xs:py-8">Your cart is empty</p>
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
              <button
                onClick={() => {
                  // Additional check (though this shouldn't be needed if addToCart is properly implemented)
                  const brandsInCart = [...new Set(cart.map(item => item.brand))];
                  if (brandsInCart.length > 1) {
                    alert("Your cart contains items from multiple brands. Please only select items from one brand.");
                    return;
                  }
                  setIsCartOpen(false);
                  navigate('/checkout', { state: { cart } });
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-2 xs:py-2.5 sm:py-3 rounded-full font-medium xs:font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm xs:text-base"
              >
                Proceed to Checkout
              </button>
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
      {/* Floating Arrow Button */}
      <div
        className="fixed right-5 bottom-5 z-40 bg-gradient-to-r from-yellow-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce"
        onClick={() => {
          const categorySection = document.getElementById('category-section');
          if (categorySection) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            window.scrollTo({
              top: categorySection.offsetTop - headerHeight - 20,
              behavior: 'smooth'
            });
          }
        }}
      >
        <ArrowUp className="w-6 h-6 text-white" />
      </div>

    </div>
  );
};

export default CrackerShop;