import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadProductsFromLocalStorage } from '../utils/localStoragesUtils';

const useProduct = (initialWoomansProducts, initialMansProducts) => {

  const [woomansProducts, setWoomansProducts] = useState(() => loadProductsFromLocalStorage('woomansProducts', initialWoomansProducts));
  const [mansProducts, setMansProducts] = useState(() => loadProductsFromLocalStorage('mansProducts', initialMansProducts));
  const [selectedGender, setSelectedGender] = useState('woomans');

  // Persist woomansProducts and mansProducts to localStorage
  useEffect(() => {
    saveToLocalStorage('woomansProducts', woomansProducts);
  }, [woomansProducts]);

  useEffect(() => {
    saveToLocalStorage('mansProducts', mansProducts);
  }, [mansProducts]);

  // Add a new product based on selected subcategory and gender
  const addProduct = (newProduct, selectedSubcategory) => {
    if (!selectedSubcategory) return; // Ensure a subcategory is selected

    newProduct.subcategoryId = selectedSubcategory.id; // Assign subcategory ID

    if (selectedGender === 'woomans') {
      setWoomansProducts(prevProducts => [...prevProducts, newProduct]);
    } else {
      setMansProducts(prevProducts => [...prevProducts, newProduct]);
    }
  };

  // Return the products based on the selected gender
  const getProducts = () => {
    return selectedGender === 'woomans' ? woomansProducts : mansProducts;
  };

  return {
    addProduct,
    selectedGender,
    setSelectedGender,
    getProducts,
  };
};

export default useProduct;
