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

// Import hooks and utilities
import { useCart } from '../hooks/useCart';
import { scrollToProducts, scrollToBrands, scrollToFooter } from '../utils/scrollUtils';
import { CATEGORIES, BRANDS } from '../constants/appConstants';

const CrackerShop = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Use custom cart hook
  const {
    cart,
    addToCart,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    getUniqueProductCount
  } = useCart(BRANDS);

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
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        getTotalItems={getTotalItems}
        getUniqueProductCount={getUniqueProductCount}
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
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            setActiveCategory={setActiveCategory}
          />
        </>
      )}

      {/* Footer */}
      <Footer
        handleProductsClick={handleProductsClick}
        scrollToFooter={scrollToFooter}
      />

      {/* Cart Sidebar */}
      <CartSidebar
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        brands={BRANDS}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
      />

      {/* Floating Arrow Button */}
      <FloatingArrowButton />
    </div>
  );
};

export default CrackerShop;