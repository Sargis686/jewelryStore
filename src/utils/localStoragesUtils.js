      
      // Importance: This is essential for maintaining user preferences or application state across browser sessions. It allows the application to persist category data (like product categories) even if the page is refreshed or reopened.
      
      export const loadCategoriesFromLocalStorage = (initialCategoriesData) => {
        const savedCategories = localStorage.getItem('categoriesData');
        return savedCategories ? JSON.parse(savedCategories) : initialCategoriesData;
      };

      // Load products from localStorage or use initial data
      //Importance: It ensures that product information is accessible even after page closures

      export  const loadProductsFromLocalStorage = (key, initialProducts) => {
        const savedProducts = localStorage.getItem(key);
        return savedProducts ? JSON.parse(savedProducts) : initialProducts;
      };

      export const saveToLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
      };


    