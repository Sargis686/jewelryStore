// NavigationBar.js
import React from 'react';
import s from './style.module.css';
import ToggleGender from '../ToggleGender/ToggleGender';

const NavigationBar = ({
  categories,
  onCategoryClick,
  setCategoryModalOpen,
  setSelectedGender,
  handleCategoryClick,
  handleSubcategoryClick
}) => {
  return (
    <div className={s.navigationBar}>
      {/* Toggle Gender Component */}
      <div className={s.toggleGenderContainer}>
        <ToggleGender
          toggleGender={setSelectedGender}
          setSelectedCategory={handleCategoryClick}
          setSelectedSubcategory={handleSubcategoryClick}
        />
      </div>

      {/* Categories Mapping */}
      {categories.map((category) => (
        <div key={category.id} className={s.categoryContainer}>
          <button
            className={s.categoryButton}
            onClick={() => onCategoryClick(category)}
          >
            <span className={s.categoryName}>{category.name}</span>
            <img  
              src={
                category.name === 'Кольца' ? '/assets/ring.png' :
                category.name === 'Колье' ? '/assets/necklace.png' :
                '/assets/default.png' // Fallback image
              }
              alt={category.name}
              className={s.categoryImage}
            />
          </button>
        </div>
      ))}

      {/* Add Category Button */}
      <div className={s.categoryButtonsContainer}>
        <button className={s.addCategory} onClick={() => setCategoryModalOpen(true)}>
          +
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
