export const scrollToSection = (sectionId, offset = 0) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    window.scrollTo({
      top: section.offsetTop - headerHeight - offset,
      behavior: 'smooth'
    });
  }
};

export const scrollToProducts = () => {
  const scroll = () => {
    scrollToSection('products');
  };
  
  // Try immediately, then try again after a short delay if needed
  scroll();
  setTimeout(scroll, 100);
};

export const scrollToBrands = () => {
  scrollToSection('brands');
};

export const scrollToFooter = () => {
  const footer = document.querySelector('footer');
  if (footer) {
    window.scrollTo({
      top: footer.offsetTop,
      behavior: 'smooth'
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const scrollToCategory = () => {
  scrollToSection('category-section', 20);
};