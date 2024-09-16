import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid/ProductGrid';
import NavigationBar from './components/NavigationBar/NavigationBar';
import SubcategoryBar from './components/SubcategoryBar/SubcategoryBar';
import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import CategoryButtons from './components/CategoryButtons/CategoryButtons';
import ModalsContainer from './components/ModalsContainer/ModalsContainer';

const App = () => {
  
  const initialCategoriesData = {
    woomans: [
      {
        id: 1,
        name: 'Кольца',
        subcategories: [
          { id: 1, name: 'Обручальные' },
          { id: 2, name: 'Печатки' },
          { id: 3, name: 'Коктейльные' },
          { id: 4, name: 'Помолвочные' },
        ],
      },
      {
        id: 2,
        name: 'Колье',
        subcategories: [
          { id: 5, name: 'Чокеры' },
          { id: 6, name: 'Ожерелья' },
          { id: 7, name: 'Кулонные Колье' },
        ],
      },

      
    ],
    mans: [
      {
        id: 1,
        name: 'Кольцo',
        subcategories: [
          { id: 1, name: 'Обручальные' },
          { id: 2, name: 'Печатки' },
        ],
      },
      {
        id: 2,
        name: 'Колье',
        subcategories: [
          { id: 3, name: 'Чокеры' },
          { id: 4, name: 'Кожаные Ожерелья' },
        ],
      },
    ],
  };

  const initialWoomansProducts = [
    { id: 1, name: 'Кольцо', price: 2600, image: '/assets/Rectangle.png', subcategoryId: 1 },
    { id: 2, name: 'Обручальные', price: 2600, image: '/assets/Rectangle1.png', subcategoryId: 2 },
    { id: 3, name: 'Коктейльные', price: 2600, image: '/assets/Rectangle2.png', subcategoryId: 3 },
    { id: 4, name: 'Помолвочные', price: 2600, image: '/assets/Rectangle3.png', subcategoryId: 4 },
    { id: 5, name: 'Чокеры', price: 2500, image: '/assets/Necklace.png', subcategoryId: 5 },
    { id: 6, name: 'Ожерелья', price: 2500, image: '/assets/Necklace1.png', subcategoryId: 6 },
    { id: 7, name: 'Кулонные Колье', price: 2500, image: '/assets/Necklace2.png', subcategoryId: 7 },
  ];

  const initialMansProducts = [
    { id: 1, name: 'Кольца', price: 2500, image: '/assets/ring.png', subcategoryId: 1 },
    { id: 2, name: 'Печатки', price: 2500, image: '/assets/ring.png', subcategoryId: 2 },
    { id: 3, name: 'Колье', price: 2500, image: '/assets/ring.png', subcategoryId: 3 },
    // { id: 4, name: 'Кожаные Ожерелья', price: 2500, image: '/assets/LeatherNecklaces.png', subcategoryId: 4 },
  ];

  // Load categories from localStorage or use initial data
  const loadCategoriesFromLocalStorage = (initialCategoriesData) => {
    const savedCategories = localStorage.getItem('categoriesData',initialCategoriesData);
    return savedCategories ? JSON.parse(savedCategories) : initialCategoriesData;
  };

  // Load products from localStorage or use initial data
  const loadProductsFromLocalStorage = (key, initialProducts) => {
    const savedProducts = localStorage.getItem(key);
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  };

  // State for gender selection
  const [selectedGender, setSelectedGender] = useState('woomans');
  const [categoriesData, setCategoriesData] = useState(() => loadCategoriesFromLocalStorage(initialCategoriesData));
  const [woomansProducts, setWoomansProducts] = useState(() => loadProductsFromLocalStorage('woomansProducts', initialWoomansProducts));
  const [mansProducts, setMansProducts] = useState(() => loadProductsFromLocalStorage('mansProducts', initialMansProducts));
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setSubcategoryModalOpen] = useState(false);
  const [isProductModalOpen, setProductModalOpen] = useState(false);


  const [searchQuery, setSearchQuery] = useState('');



  // Save to localStorage whenever products or categories change
  useEffect(() => {
    localStorage.setItem('categoriesData', JSON.stringify(categoriesData));
  }, [categoriesData]);

  useEffect(() => {
    localStorage.setItem('woomansProducts', JSON.stringify(woomansProducts));
  }, [woomansProducts]);

  useEffect(() => {
    localStorage.setItem('mansProducts', JSON.stringify(mansProducts));
  }, [mansProducts]);

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  // Get the products based on the selected gender
  const getProducts = () => {
    return selectedGender === 'woomans' ? woomansProducts : mansProducts;
  };

  // Filter the products based on the selected subcategory
  const filteredProducts = () => {
    const products = getProducts();
  
    return products
      .filter(product => selectedSubcategory ? product.subcategoryId === selectedSubcategory.id : true)
      .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  


  const toggleGender = (gender) => {
    setSelectedGender(gender);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
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

  const addProduct = (newProduct) => {
    if (!selectedSubcategory) return; // Ensure a subcategory is selected

    // Assign the selected subcategory ID to the new product
    newProduct.subcategoryId = selectedSubcategory.id;

    // Add the product to the correct gender product list
    if (selectedGender === 'woomans') {
      setWoomansProducts((prevProducts) => [...prevProducts, newProduct]);
    } else {
      setMansProducts((prevProducts) => [...prevProducts, newProduct]);
    }
  };

  return (
    <div className="App">



<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />




 <div className="gender-toggle">
   <button onClick={() => toggleGender('woomans')}>
     <img src='/assets/girl.png' />
   </button>
   <button onClick={() => toggleGender('mans')}>
     <img src='/assets/man.png' />
   </button>

      </div>

      <NavigationBar categories={categoriesData[selectedGender]} onCategoryClick={handleCategoryClick}/>

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
        addProduct={addProduct}  
      />  

    



    </div>
  );
};

export default App;
