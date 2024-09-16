import React from 'react';  
import s from './style.module.css';  

// Category navigation bar component  
const NavigationBar = ({ categories, onCategoryClick }) => {  
  return (  
    <div className={s.navigationBar}>  
      {categories.map((category) => (  
        <div key={category.id} className={s["category-container"]}>  
          <button  
            className={s["category-button"]}  
            onClick={() => onCategoryClick(category)}  
          >  
            <span className={s["category-name"]}>{category.name}</span>  

            {/* Conditional image rendering based on category name */}  
            <img  
              src={  
                category.name === 'Кольца' ? '/assets/ring.png' :  
                category.name === 'Колье' ? '/assets/necklace.png' :  
                '/assets/default.png' // Fallback image  
              }  
              alt={category.name}  
              className={s["category-image"]}  
            />  
          </button>  
        </div>  
      ))}  
    </div>  
  );  
};  

export default NavigationBar;