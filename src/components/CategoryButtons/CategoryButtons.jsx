// CategoryButtons.js  
import React from 'react';
import s from './style.module.css'

const CategoryButtons = ({ setProductModalOpen, selectedSubcategory }) => {
    return (
        <>

  

            {selectedSubcategory && (

                <div className={s.addContainer}>
                <button className={s["add-product-button"]} onClick={() => setProductModalOpen(true)}>
                    + 
                </button>
                </div>
            )}
        </>
    );
};

export default CategoryButtons;