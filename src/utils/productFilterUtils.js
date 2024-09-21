// utils/productFilterUtils.js

// Filter the products based on the selected subcategory and search query
export const filterProducts = (products, selectedSubcategory, searchQuery) => {
    return products
      .filter(product => selectedSubcategory ? product.subcategoryId === selectedSubcategory.id : true)
      .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };
  