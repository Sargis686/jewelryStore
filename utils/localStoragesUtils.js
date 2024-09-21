  export const loadCategoriesFromLocalStorage = (initialCategoriesData) => {
    const savedCategories = localStorage.getItem('categoriesData',initialCategoriesData);
    return savedCategories ? JSON.parse(savedCategories) : initialCategoriesData;
  };

  // Load products from localStorage or use initial data
  export  const loadProductsFromLocalStorage = (key, initialProducts) => {
    const savedProducts = localStorage.getItem(key);
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  };
