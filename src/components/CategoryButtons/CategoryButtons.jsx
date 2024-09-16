// CategoryButtons.js  
import React from 'react';
import s from './style.module.css'

const CategoryButtons = ({ setCategoryModalOpen, setProductModalOpen, selectedSubcategory }) => {
    return (
        <>

            <div className={s.categoryButtonsContainer}>
                <div className={s.categoryButtons}>

                    <button className="add-category-button" onClick={() => setCategoryModalOpen(true)}>
                        + Add Category
                    </button>
                </div>

            </div>



            {selectedSubcategory && (
                <button className="add-product-button" onClick={() => setProductModalOpen(true)}>
                    + Add Product
                </button>
            )}
        </>
    );
};

export default CategoryButtons;