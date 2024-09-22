import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid/ProductGrid';
import NavigationBar from './components/NavigationBar/NavigationBar';
import SubcategoryBar from './components/SubcategoryBar/SubcategoryBar';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import CategoryButtons from './components/CategoryButtons/CategoryButtons';
import ModalsContainer from './components/ModalsContainer/ModalsContainer';
import { initialCategoriesData, initialWoomansProducts, initialMansProducts } from './components/data/data';
import { loadCategoriesFromLocalStorage } from './utils/localStoragesUtils';
import { filterProducts } from './utils/productFilterUtils';
import { useCategorySelection } from './hooks/useCategorySelection';
import useProduct from './hooks/useProduct.js';

const App = () => {
  const [categoriesData, setCategoriesData] = useState(() => loadCategoriesFromLocalStorage(initialCategoriesData));
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setSubcategoryModalOpen] = useState(false);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { selectedCategory, selectedSubcategory, handleCategoryClick, handleSubcategoryClick } = useCategorySelection();
  const { selectedGender, setSelectedGender, getProducts, addProduct } = useProduct(initialWoomansProducts, initialMansProducts);

  useEffect(() => {
    localStorage.setItem('categoriesData', JSON.stringify(categoriesData));
  }, [categoriesData]);

  const filteredProducts = () => {
    const products = getProducts();
    return filterProducts(products, selectedSubcategory, searchQuery);
  };

  const addCategory = (newCategory) => {
    const genderKey = newCategory.gender === 'women' ? 'woomans' : 'mans';
    setCategoriesData((prevState) => ({
      ...prevState,
      [genderKey]: [...prevState[genderKey], newCategory],
    }));
  };

  const addSubcategory = (newSubcategoryName) => {
    setCategoriesData((prevState) => ({
      ...prevState,
      [selectedGender]: prevState[selectedGender].map((category) => {
        if (category.id === selectedCategory.id) {
          return {
            ...category,
            subcategories: [
              ...category.subcategories,
              { id: Date.now(), name: newSubcategoryName },
            ],
          };
        }
        return category;
      }),
    }));
    setSubcategoryModalOpen(false);
  };

  return (
    <div className="App">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className='category'>
        <NavigationBar
          categories={categoriesData[selectedGender]}
          onCategoryClick={handleCategoryClick}
          setCategoryModalOpen={setCategoryModalOpen}
          setSelectedGender={setSelectedGender}
          handleCategoryClick={handleCategoryClick}
          handleSubcategoryClick={handleSubcategoryClick}
        />
      </div>

      <div className='SubcategorywithProducts'>
        {selectedCategory && (
          <SubcategoryBar
            selectedCategory={selectedCategory}
            onSubcategoryClick={handleSubcategoryClick}
            onAddSubcategory={() => setSubcategoryModalOpen(true)}
          />
        )}
        {selectedSubcategory && <ProductGrid products={filteredProducts()} />}
      </div>

      <CategoryButtons
        setProductModalOpen={setProductModalOpen}
        selectedSubcategory={selectedSubcategory}
        setCategoryModalOpen={setCategoryModalOpen}
      />

      <ModalsContainer
        isCategoryModalOpen={isCategoryModalOpen}
        setCategoryModalOpen={setCategoryModalOpen}
        addCategory={addCategory}
        isSubcategoryModalOpen={isSubcategoryModalOpen}
        setSubcategoryModalOpen={setSubcategoryModalOpen}
        addSubcategory={addSubcategory}
        isProductModalOpen={isProductModalOpen}
        setProductModalOpen={setProductModalOpen}
        addProduct={(newProduct) => addProduct(newProduct, selectedSubcategory)}
      />
    </div>
  );
};

export default App;
