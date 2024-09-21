
    export  const initialCategoriesData = {
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
    
      export  const initialWoomansProducts = [
        { id: 1, name: 'Кольцо', price: 2600, image: '/assets/Rectangle.png', subcategoryId: 1 },
        { id: 2, name: 'Обручальные', price: 2600, image: '/assets/Rectangle1.png', subcategoryId: 2 },
        { id: 3, name: 'Коктейльные', price: 2600, image: '/assets/Rectangle2.png', subcategoryId: 3 },
        { id: 4, name: 'Помолвочные', price: 2600, image: '/assets/Rectangle3.png', subcategoryId: 4 },
        { id: 5, name: 'Чокеры', price: 2500, image: '/assets/Necklace.png', subcategoryId: 5 },
        { id: 6, name: 'Ожерелья', price: 2500, image: '/assets/Necklace1.png', subcategoryId: 6 },
        { id: 7, name: 'Кулонные Колье', price: 2500, image: '/assets/Necklace2.png', subcategoryId: 7 },
      ];
    
      export const initialMansProducts = [
        { id: 1, name: 'Кольца', price: 2500, image: '/assets/ring.png', subcategoryId: 1 },
        { id: 2, name: 'Печатки', price: 2500, image: '/assets/ring.png', subcategoryId: 2 },
        { id: 3, name: 'Колье', price: 2500, image: '/assets/ring.png', subcategoryId: 3 },
        // { id: 4, name: 'Кожаные Ожерелья', price: 2500, image: '/assets/LeatherNecklaces.png', subcategoryId: 4 },
      ];
    



