import React, { useState } from 'react';
import s from './style.module.css'; // Import your styles

const AddSubcategoryModal = ({ isOpen, onRequestClose, addSubcategory }) => {
  const [subcategoryName, setSubcategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subcategoryName) {
      addSubcategory(subcategoryName);
      setSubcategoryName(''); // Reset the input field
      onRequestClose(); // Close the modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <span className={s.closeButton} onClick={onRequestClose}>
          &times;
        </span>
        <h2>Кольцо: Добавить Подкатегорию</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            placeholder="Подкатегория"
            required
          />
          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default AddSubcategoryModal;
