import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import s from "./style.module.css"

const ProductGrid = ({ products }) => {
  return (
    <div className={s["product-grid"]}>


      
      {products.map((product) => (
        <div key={product.id} className={s["product-grid"]}>
          {/* Display the uploaded image */}
          <img src={product.image} alt={product.name} className={s["product-image"]} />
          
          <div className={s.productInfo}>
          <span  className={s["product-name"]}>{product.name}</span >
          
          <span  className={s["product-price"]}>{product.price} руб.</span >
        </div>
        </div>
      ))}
    </div>
  );

};




export default ProductGrid;

