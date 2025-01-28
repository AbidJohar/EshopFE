/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Collection = () => {
  const { products, search } = useContext(ShopContext);

  const [category, setCategory] = useState({
    Men: false,
    Women: false,
    Kids: false,
  });

  const [sortValue, setSortValue] = useState(""); // State for sorting
  const [displayProducts, setDisplayProducts] = useState(products || []); // Products to display

 

  // Handle checkbox changes to update selected categories
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
  
    setCategory({
      Men: false,
      Women: false,
      Kids: false,
      [name]: checked, // Only the clicked category will be set to true
    });
  };
  // Filter and search logic
  useEffect(() => {
    let filteredProducts = [...products];

    // Apply category filters
    filteredProducts = filteredProducts.filter((product) => {
      if (category.Men && product.category !== "Men") return false;
      if (category.Women && product.category !== "Women") return false;
      if (category.Kids && product.category !== "Kids") return false;
      return true;
    });

    // Apply search filter
    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply sorting
    if (sortValue === "High") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === "Low") {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    setDisplayProducts(filteredProducts);
  }, [products, category, sortValue, search]);

  return (
    <div className="p-4 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Left Section: Filter */}
      <div className="p-2 shadow-sm h-44 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Filter</h2>
        <div className="space-y-2">
          {["Men", "Women", "Kids"].map((cat) => (
            <div key={cat} className="flex items-center">
              <input
                type="checkbox"
                name={cat}
                checked={category[cat]}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label className="text-gray-700">{cat}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Sort & Products */}
      <div className="col-span-2 sm:col-span-1 lg:col-span-3">
        {/* Sort Dropdown */}
        <div className="flex justify-between mb-4">
          <div className="text-2xl">
            <Title text1="All" text2="COLLECTION" />
          </div>
          <select
            onChange={(e) => setSortValue(e.target.value)}
            value={sortValue}
            name="filter"
            className="p-2 border-[1px] border-gray-600 rounded-md"
          >
            <option value="">Sort By</option>
            <option value="High">Price: High to Low</option>
            <option value="Low">Price: Low to High</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.length > 0 ? (
            displayProducts.map((pro) => (
              <ProductCard
                key={pro._id}
                id={pro._id}
                name={pro.name}
                image={pro.image}
                price={pro.price}
              />
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-500">
              No products match your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
