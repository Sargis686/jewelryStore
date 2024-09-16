// ProductFilter.js  
import React, { useState } from 'react';  
import FilterProductsModal from './FilterProductsModal'; // Adjust the path if necessary  

const ProductFilter = ({ products, selectedSubcategory, setFilteredProducts }) => {  
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);  

  const filterProducts = ({ name, minPrice, maxPrice }) => {  
    let filtered = products;  

    if (selectedSubcategory) {  
      // Filter by selected subcategory  
      filtered = filtered.filter(product => product.subcategoryId === selectedSubcategory.id);  
    }  

    if (name) {  
      filtered = filtered.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));  
    }  

    if (minPrice !== undefined) {  
      filtered = filtered.filter(product => product.price >= minPrice);  
    }  

    if (maxPrice !== undefined) {  
      filtered = filtered.filter(product => product.price <= maxPrice);  
    }  

    setFilteredProducts(filtered);  
  };  

  return (  
    <>  
      <button onClick={() => setFilterModalOpen(true)}>Filter Products</button>  


 
    </>  
  );  
};  

export default ProductFilter;