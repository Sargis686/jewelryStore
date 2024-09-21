import React, { useState, useEffect } from 'react';

import ProductGrid from './components/ProductGrid/ProductGrid';
import NavigationBar from './components/NavigationBar/NavigationBar';
import SubcategoryBar from './components/SubcategoryBar/SubcategoryBar';
import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import CategoryButtons from './components/CategoryButtons/CategoryButtons';
import ModalsContainer from './components/ModalsContainer/ModalsContainer';
import { initialCategoriesData, initialWoomansProducts, initialMansProducts } from './components/data/data'
import { loadCategoriesFromLocalStorage, loadProductsFromLocalStorage } from './utils/localStoragesUtils'
import ToggleGender from './components/ToggleGender/ToggleGender';
import { filterProducts } from './utils/productFilterUtils';
import { useCategorySelection } from './hooks/useCategorySelection';
import useProduct from './hooks/useProduct.js';

// Inside App component


const App = () => {



  // State for gender selection
  const [categoriesData, setCategoriesData] = useState(() => loadCategoriesFromLocalStorage(initialCategoriesData));
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setSubcategoryModalOpen] = useState(false);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedCategory, selectedSubcategory, handleCategoryClick, handleSubcategoryClick } = useCategorySelection();
  const { selectedGender, setSelectedGender, getProducts, addProduct } = useProduct(initialWoomansProducts, initialMansProducts);





  // Save to localStorage whenever products or categories change
  useEffect(() => {
    localStorage.setItem('categoriesData', JSON.stringify(categoriesData));
  }, [categoriesData]);



  
  // Filter the products based on the selected subcategory
  //click es anum  selectedSubcategory -var qo uzac u inky filtracnuma yst dra iran hamastasxan productn ery
  const filteredProducts = () => {
    const products = getProducts();
    return filterProducts(products, selectedSubcategory, searchQuery);

  };




  const addCategory = (newCategory) => {
    const genderKey = newCategory.gender === 'women' ? 'woomans' : 'mans';
    setCategoriesData(prevState => ({
      ...prevState,
      [genderKey]: [...prevState[genderKey], newCategory],
    }));
  };

  const addSubcategory = (newSubcategoryName) => {
    setCategoriesData(prevState => ({
      ...prevState,
      [selectedGender]: prevState[selectedGender].map(category => {
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



      <ToggleGender toggleGender={setSelectedGender} setSelectedCategory={handleCategoryClick} setSelectedSubcategory={handleSubcategoryClick} />


      <NavigationBar categories={categoriesData[selectedGender]} onCategoryClick={handleCategoryClick} />

      {selectedCategory && (
        <SubcategoryBar
          selectedCategory={selectedCategory}
          onSubcategoryClick={handleSubcategoryClick}
          onAddSubcategory={() => setSubcategoryModalOpen(true)}
        />
      )}

      {selectedSubcategory && <ProductGrid products={filteredProducts()} />}




      <CategoryButtons  
        setCategoryModalOpen={setCategoryModalOpen}
        setProductModalOpen={setProductModalOpen}
        selectedSubcategory={selectedSubcategory}
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
  addProduct={(newProduct)=>addProduct(newProduct, selectedSubcategory)}  // Make sure selectedSubcategory is passed
/>
{/* inky mi parametrova chi chanachum f() */}

{/* why callback can  not I just put  addProduct={addProduct(newProduct, selectedSubcategory)}  */}
{/* //che vor parametery karanas vorpes f() use anes */}
{/* heto vor inqy iranov render chlini ail erb add anes kancvir u veradarcni  addProduct-y(useProduct  -i) */}
    </div>
  );
};

export default App;
