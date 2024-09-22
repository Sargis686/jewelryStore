import React from 'react';
import s from './style.module.css';

const SubcategoryBar = ({ selectedCategory, onSubcategoryClick, onAddSubcategory }) => {
  return (
    <div className={s.subcategoryBar}>
      {selectedCategory.subcategories.map((subcategory) => (
        <span
          key={subcategory.id}
          className={s.subcategoryItem}
          onClick={() => onSubcategoryClick(subcategory)}
        >
          {subcategory.name}
        </span>
      ))}

      <button onClick={onAddSubcategory} className={s.addSubcategoryButton}>
        + 
      </button>
    </div>
  );
};

export default SubcategoryBar;
