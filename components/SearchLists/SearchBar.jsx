"use client"
import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const groceryItems = ['Household',
        'Dairy & Bakery',
        'Fruits & Vegetables',
        'Snacks & Beverages',
        'Cooking Essentials',
        'Spices & Masalas'];
        
  const placeholderTerms = [
        'Household',
        'Dairy & Bakery',
        'Fruits & Vegetables',
        'Snacks & Beverages',
        'Cooking Essentials',
        'Spices & Masalas',
        'Rice & Grains',
        'Atta & Flours',
        'Oil & Ghee',
        'Tea & Coffee',
        'Pulses & Legumes',
        'Personal Care',
        'Household Cleaners',
        'Baby Care',
        'Pet Supplies',
        'Frozen Foods',
        'Organic Foods',
        'Health Supplements',
        'Beverages & Juices',
        'Stationery & Books',
        'Party Supplies'
    ];
    
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (!isFocused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % groceryItems.length);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isFocused, groceryItems.length]);

  useEffect(() => {
    if (searchValue.trim()) {
      const filtered = placeholderTerms.filter(term =>
        term.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  }, [searchValue]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex items-center justify-center p-4 w-full">
      <div className="w-full max-w-xl md:max-w-3xl md:mr-10">
        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full px-4 py-2 border-2 border-[#8c3dee] rounded-lg focus:border-[#8c3dee]/50 focus:outline-none text-md"
            placeholder={isFocused ? "Search List..." : ""}
          />
          
          {!isFocused && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none overflow-hidden h-5">
              <div 
                className="flex flex-col transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateY(-${currentIndex * 24}px)` 
                }}
              >
                {groceryItems.concat(groceryItems).map((item, index) => (
                  <div key={index} className="h-6 flex items-center">
                    <span className="text-gray-500 text-lg whitespace-nowrap">
                      {item} list
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}          
          {isFocused && searchValue.trim() && filteredResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white/80 border-2 border-[#8c3dee] border-t-0 rounded-b-lg max-h-60 overflow-y-auto z-10">
              {filteredResults.map((result, index) => (
                <div 
                  key={index} 
                  className="px-4 py-2 hover:bg-white/50 cursor-pointer text-gray-700"
                  onMouseDown={() => setSearchValue(result)}
                >
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;