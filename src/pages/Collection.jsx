/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {
  const { products } = useContext(ShopContext);
  console.log(products);

  // State to track selected categories
  const [category, setCategory] = useState({
    Men: false,
    Women: false,
    Kids: false,
  });

  // Handle checkbox changes to update selected categories
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    // If the clicked category is being selected, deselect all other categories
    setCategory((prevCategory) => ({
      Men: name === "Men" ? checked : false,
      Women: name === "Women" ? checked : false,
      Kids: name === "Kids" ? checked : false,
    }));
  };

  // Filter products based on selected categories
  const filteredProducts = products.filter((product) => {
    if (category.Men && product.category !== "Men") return false;
    if (category.Women && product.category !== "Women") return false;
    if (category.Kids && product.category !== "Kids") return false;
    return true;
  });

  return (
    <div className="p-4 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Left Section: Filter */}
      <div className="p-2 shadow-sm h-44 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Filter</h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="Men"
              checked={category.Men}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label className="text-gray-700">Man</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="Women"
              checked={category.Women}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label className="text-gray-700">Woman</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="Kids"
              checked={category.Kids}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label className="text-gray-700">Kids</label>
          </div>
        </div>
      </div>

      {/* Right Section: Sort & Products */}
      <div className="col-span-2 sm:col-span-1 lg:col-span-3">
        {/* Sort Dropdown */}
        <div className="flex justify-end mb-4">
          <select name="filter" defaultValue="sort the Product" className="p-2 border-[1px] border-gray-600 rounded-md">
            <option value="relevant">Relevant</option>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((pro, index) => (
            <ProductCard
              key={index}
              id={pro._id}
              name={pro.name}
              image={pro.image}
              price={pro.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
