import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import s from "./style.module.css"

const ProductGrid = ({ products }) => {
  return (
    <div className={s["product-grid"]}>


      
      {products.map((product) => (
        <div key={product.id} className={s["product-item"]}>
          {/* Display the uploaded image */}
          <img src={product.image} alt={product.name} className={s["product-image"]} />
          
          {/* Display the correct product name */}
          <h3 className={s["product-name"]}>{product.name}</h3>
          
          <p className={s["product-price"]}>{product.price} руб.</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

