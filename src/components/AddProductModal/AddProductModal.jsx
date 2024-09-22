import React, { useState } from 'react';  
import Modal from 'react-modal'; // Assuming you're using react-modal  
import s from "./style.module.css";  

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
  const [errorMessage, setErrorMessage] = useState('');  
  const [successMessage, setSuccessMessage] = useState('');  

  // Handle image upload  
  const handleImageUpload = async (e) => {  
    const file = e.target.files[0];  
    if (file) {  
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];  
      if (!allowedTypes.includes(file.type)) {  
        setErrorMessage('Пожалуйста, загрузите изображение в формате JPEG, PNG или GIF.'); // "Please upload an image in JPEG, PNG, or GIF format."  
        setImage(null);  
        return;  
      }  
      if (file.size > 2000000) { // Limit to 2MB  
        setErrorMessage('Файл слишком большой! Максимальный размер 2MB.'); // "File is too large! Maximum size is 2MB."  
        setImage(null);  
        return;  
      }  

      const base64Image = await fileToBase64(file);  
      setImage(base64Image); // Store the Base64 string  
      setErrorMessage(''); // Clear error message  
    }  
  };  

  // Handle form submission  
  const handleSubmit = () => {  
    if (!productName || !articleNumber || !price || !image) {  
      setErrorMessage('Пожалуйста, заполните все обязательные поля (название, изображение, артикул, цена).'); // "Please provide all the required fields..."  
      setSuccessMessage('');  
      return;  
    }  

    const newProduct = {  
      id: Date.now(),  
      name: productName,  
      type: productType,  
      image,  
      articleNumber,  
      price: parseFloat(price),  
      subcategoryId: null,  
    };  

    addProduct(newProduct);  
    setSuccessMessage('Продукт успешно добавлен!'); // "Product added successfully!"  
    setErrorMessage('');  
    resetForm();  
  };  

  // Reset the form fields  
  const resetForm = () => {  
    setProductName('');  
    setArticleNumber('');  
    setPrice('');  
    setImage(null);  
    setProductType('ring');  
    setErrorMessage('');  
    setSuccessMessage('');  
  };  

  // Handle modal close  
  const handleCloseModal = () => {  
    resetForm();  
    onRequestClose();  
  };  

  return (  
    <Modal isOpen={isOpen} onRequestClose={handleCloseModal} contentLabel="Add Product" className={s["add-product-modal"]} ariaHideApp={false}>  
      <h2>Добавить Новый Товар</h2>  

      {errorMessage && <div className={s.error}>{errorMessage}</div>}  
      {successMessage && <div className={s.success}>{successMessage}</div>}  

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

      <div className={s.buttonContainer}>  
        <button className={s["add-product-button"]} onClick={handleSubmit}>Добавить</button>  
        <button className={s["close-modal-button"]} onClick={handleCloseModal}>X</button> {/* Close Button */}  
      </div>  
    </Modal>  
  );  
};  

export default AddProductModal;