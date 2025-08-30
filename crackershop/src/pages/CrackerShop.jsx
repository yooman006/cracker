import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { products } from './productsData';

// Import components
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import BrandSelection from '../components/BrandSelection';
import CategoryFilter from '../components/CategoryFilter';
import ProductsGrid from '../components/ProductsGrid';
import CartSidebar from '../components/CartSidebar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import FloatingArrowButton from '../components/FloatingArrowButton';

// Import CartContext instead of custom hook
import { useCart } from '../context/CartContext';
import { scrollToProducts, scrollToBrands, scrollToFooter } from '../utils/scrollUtils';
import { CATEGORIES, BRANDS } from '../constants/appConstants';

const CrackerShop = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Use CartContext - this provides all cart functionality with persistence
  const {
    cart,
    addToCart,
    removeFromCart,
    getTotalPrice,
    getTotalItems
  } = useCart();

  // Helper function to get unique product count (similar to your previous implementation)
  const getUniqueProductCount = () => {
    return cart.length;
  };

  // Auto-select brand based on cart contents when component mounts
  useEffect(() => {
    if (cart.length > 0 && !selectedBrand) {
      // Get the brand from the first item in cart
      const cartBrand = cart[0].brand;
      if (cartBrand) {
        setSelectedBrand(cartBrand);
        // Optional: scroll to products section after a short delay
        setTimeout(() => {
          scrollToProducts();
        }, 100);
      }
    }
  }, [cart, selectedBrand]);

  // Check for mobile viewport
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close mobile menu when resizing to desktop
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
    setActiveCategory('all');
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
      ...CATEGORIES.filter(category => availableCategories.has(category.id))
    ];
  };

  const filteredProducts = selectedBrand
    ? (activeCategory === 'all'
      ? products.filter(product => product.brand === selectedBrand)
      : products.filter(product => product.brand === selectedBrand && product.category === activeCategory))
    : [];

  const handleProductsClick = () => {
    if (!selectedBrand) {
      scrollToBrands();
    } else {
      scrollToProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 relative overflow-hidden">
      {/* Animated Background Effects */}
      <AnimatedBackground isMobile={isMobile} />
      
      {/* Header */}
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        selectedBrand={selectedBrand}
        scrollToBrands={scrollToBrands}
        scrollToProducts={scrollToProducts}
        scrollToFooter={scrollToFooter}
      />
      
      {/* Hero Section */}
      <HeroSection
        selectedBrand={selectedBrand}
        scrollToBrands={scrollToBrands}
        scrollToProducts={scrollToProducts}
      />

      {/* Brand Selection Section */}
      <BrandSelection
        brands={BRANDS}
        handleBrandSelect={handleBrandSelect}
      />

      {/* Products Section - Only shown when a brand is selected */}
      {selectedBrand && (
        <>
          <CategoryFilter
            selectedBrand={selectedBrand}
            brands={BRANDS}
            availableCategories={getAvailableCategories()}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            setSelectedBrand={setSelectedBrand}
          />

          <ProductsGrid
            filteredProducts={filteredProducts}
            setActiveCategory={setActiveCategory}
          />
        </>
      )}

      {/* Footer */}
      <Footer
        handleProductsClick={handleProductsClick}
        scrollToFooter={scrollToFooter}
      />

      {/* Cart Sidebar - Now managed by CartContext */}
      <CartSidebar />

      {/* Floating Arrow Button */}
      <FloatingArrowButton />
    </div>
  );
};

export default CrackerShop;