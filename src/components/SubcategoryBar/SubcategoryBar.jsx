// src/components/SubcategoryBar/SubcategoryBar.js
import React from 'react';
import  s  from './style.module.css';

const SubcategoryBar = ({ selectedCategory, onSubcategoryClick, onAddSubcategory }) => {
  return (
    <div className={s["subcategory-bar"]}>
     {selectedCategory.subcategories.map((subcategory) => (
        <button
          key={subcategory.id}
          onClick={() => onSubcategoryClick(subcategory)}
        >
          {subcategory.name}
        </button>
      ))}
       

<button  onClick={onAddSubcategory} className={s["add-subcategory-button"]}>
+ 

</button>




      
    </div>
  );
};

export default SubcategoryBar;
