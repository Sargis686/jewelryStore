import React, { useState } from 'react';  
import s from './style.module.css';  

const FilterProductsModal = ({ isOpen, onRequestClose, filterProducts }) => {  
  const [name, setName] = useState('');  
  const [minPrice, setMinPrice] = useState('');  
  const [maxPrice, setMaxPrice] = useState('');  

  const handleFilter = (e) => {  
    e.preventDefault();  

    // Convert price inputs to numbers  
    const minPriceNum = minPrice ? parseFloat(minPrice) : undefined;  
    const maxPriceNum = maxPrice ? parseFloat(maxPrice) : undefined;  

    filterProducts({ name, minPrice: minPriceNum, maxPrice: maxPriceNum });  
    setName('');  
    setMinPrice('');  
    setMaxPrice('');  
    onRequestClose(); // Close the modal after filtering  
  };  

  if (!isOpen) return null;  

  return (  
    <div className={s.modal}>  
      <div className={s.modalContent}>  
        <span className={s.close} onClick={onRequestClose}>&times;</span>  
        <h2>Filter Products</h2>  
        <form onSubmit={handleFilter}>  
          <input  
            type="text"  
            placeholder="Product Name"  
            value={name}  
            onChange={(e) => setName(e.target.value)}  
          />  
          <input  
            type="number"  
            placeholder="Min Price"  
            value={minPrice}  
            onChange={(e) => setMinPrice(e.target.value)}  
          />  
          <input  
            type="number"  
            placeholder="Max Price"  
            value={maxPrice}  
            onChange={(e) => setMaxPrice(e.target.value)}  
          />  
          <button type="submit">Filter</button>  
        </form>  
      </div>  
    </div>  
  );  
};  

export default FilterProductsModal;