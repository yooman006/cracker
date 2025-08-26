import React from 'react';
import { ArrowUp } from 'lucide-react';

const FloatingArrowButton = () => {
  const handleScrollToCategory = () => {
    const categorySection = document.getElementById('category-section');
    if (categorySection) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      window.scrollTo({
        top: categorySection.offsetTop - headerHeight - 20,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className="fixed right-5 bottom-5 z-40 bg-gradient-to-r from-yellow-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce"
      onClick={handleScrollToCategory}
    >
      <ArrowUp className="w-6 h-6 text-white" />
    </div>
  );
};

export default FloatingArrowButton;