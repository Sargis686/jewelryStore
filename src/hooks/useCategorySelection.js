// hooks/useCategorySelection.js
import { useState } from 'react';

export const useCategorySelection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  return {
    selectedCategory,
    selectedSubcategory,
    
    handleCategoryClick,
    handleSubcategoryClick,
  };
};
