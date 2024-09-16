
import React from "react"
import CategoryModal from "../CategoryModal/CategoryModal"
import AddSubcategoryModal from "../AddSubcategoryModal/AddSubcategoryModal"
import AddProductModal from "../AddProductModal/AddProductModal"

const ModalsContainer = ({ isCategoryModalOpen, setCategoryModalOpen, addCategory,
    isSubcategoryModalOpen, setSubcategoryModalOpen,
    addSubcategory, isProductModalOpen, setProductModalOpen,
    addProduct }) => {

    return (
        <>
            <CategoryModal
                isOpen={isCategoryModalOpen}
                onRequestClose={() => setCategoryModalOpen(false)}
                addCategory={addCategory}
            />

            <AddSubcategoryModal
                isOpen={isSubcategoryModalOpen}
                onRequestClose={() => setSubcategoryModalOpen(false)}
                addSubcategory={addSubcategory}
            />



            <AddProductModal
                isOpen={isProductModalOpen}
                onRequestClose={() => setProductModalOpen(false)}
                addProduct={addProduct}
            />        
            
            
              </>

    )
}

export default ModalsContainer