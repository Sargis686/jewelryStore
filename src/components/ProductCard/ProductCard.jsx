import React from 'react';
import s from './style.module.css';

const ProductCard = ({ product }) => {
  return (
    <div className={s.productCard}>
      <img src={product.img} alt={product.name} className={s.productImage} />
      <div className={s.productInfo}>
        <span className={s.productCode}>AS{product.id}</span> 
        <span className={s.productPrice}>${product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
