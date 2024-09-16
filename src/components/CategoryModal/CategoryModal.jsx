import React, { useState } from 'react';
import s from './style.module.css';

const CategoryModal = ({ isOpen, onRequestClose, addCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null); // State to manage the uploaded image
  const [gender, setGender] = useState('women'); // Default is women

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setImage(URL.createObjectURL(selectedFile)); // Create a preview of the image
    } else {
      setImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName && image) {
      const newCategory = {
        id: Date.now(), // A simple way to generate a unique ID for now
        name: categoryName,
        image: image, // Store the image URL
        gender: gender, // Add gender to category data
        subcategories: [], // Initially, no subcategories
      };
      addCategory(newCategory); // Add the new category
      setCategoryName(''); // Reset form
      setImage(null);
      setGender('women'); // Reset gender to default
      onRequestClose(); // Close the modal after submission
    }
  };

  if (!isOpen) return null; // If modal is not open, don't render anything

  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <span className={s.close} onClick={onRequestClose}>&times;</span>
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          {/* Category Name Input */}
          <label>Category Name</label>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />

          {/* Image Upload Section */}
          <div className={s.imageUpload}>
            <label htmlFor="imageUpload" className={s.imageLabel}>
              {image ? (
                <img src={image} alt="Category" className={s.imagePreview} />
              ) : (
                <>
                  <span className={s.imageIcon}>🖼️</span>
                  <p>Upload Image</p>
                </>
              )}
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Gender Selection Section */}
          <div className={s.genderSelection}>
            <label>Select Section:</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="men"
                  checked={gender === 'men'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <img src='/assets/man.png'/>
              </label>
              <label>
                <input
                  type="radio"
                  value="women"
                  checked={gender === 'women'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <img src='/assets/girl.png'/>
                </label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className={s.addButton}>
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
