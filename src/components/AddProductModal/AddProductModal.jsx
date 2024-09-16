import React, { useState } from 'react';
import Modal from 'react-modal'; // Assuming you're using react-modal
import s from "./style.module.css"

// Helper function to convert file to Base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const AddProductModal = ({ isOpen, onRequestClose, addProduct }) => {
  const [productType, setProductType] = useState('ring');
  const [image, setImage] = useState(null);
  const [articleNumber, setArticleNumber] = useState('');
  const [price, setPrice] = useState('');
  const [productName, setProductName] = useState('');

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64Image = await fileToBase64(file);
      setImage(base64Image); // Store the Base64 string
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!articleNumber || !price || !image || !productName) {
      alert('Please provide all the required fields (name, image, article number, price).');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: productName, // Use the user-defined product name
      type: productType,  // Store the type separately if needed
      image,              // Base64 string of the image
      articleNumber,
      price: parseFloat(price),
      subcategoryId: null, // Will be set in App.js based on the selected subcategory
    };

    addProduct(newProduct);
    onRequestClose(); // Close modal after submission
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add Product" className={s["add-product-modal"]}>
      <h2>Добавить Новый Товар</h2>

      {/* Product Name Input */}
      <div className={s["product-details"]}>
        <label>Название товара</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Введите название товара" />
      </div>

      {/* Product Type Selection */}
      <div className={s["product-type-selection"]}>
        <button className={productType === 'ring' ? s.active : ''} onClick={() => setProductType('ring')}>Кольцо</button>
        <button className={productType === 'necklace' ? s.active : ''} onClick={() => setProductType('necklace')}>Колье</button>
        <button className={productType === 'earrings' ? s.active : ''} onClick={() => setProductType('earrings')}>Серьги</button>
        <button className={productType === 'chain' ? s.active : ''} onClick={() => setProductType('chain')}>Цепи</button>
        <button className={productType === 'brooch' ? s.active : ''} onClick={() => setProductType('brooch')}>Броши</button>
      </div>

      {/* Image Upload */}
      <div className={s["image-upload"]}>
        <label>Загрузить Фото</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {/* Product Details */}
      <div className={s["product-details"]}>
        <label>Артикул</label>
        <input type="text" value={articleNumber} onChange={(e) => setArticleNumber(e.target.value)} placeholder="Введите артикул" />

        <label>Цена</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Введите цену" />
      </div>

      <button className={s["add-product-button"]} onClick={handleSubmit}>Добавить</button>
    </Modal>
  );
};

export default AddProductModal;
