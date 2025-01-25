/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductCard = ({ id, image, price, name }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="group shadow-sm">
      <div className="rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
        {/* Image Section */}
        <div className="h-64 overflow-hidden">
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
            src={image}
            alt={name}
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="text-lg font-medium text-gray-700 group-hover:text-gray-900 truncate">
            {name}
          </h3>
          {/* Product Price */}
          <p className="text-md font-semibold text-gray-500 group-hover:text-gray-900 mt-2">
            {currency}
            <span className="text-lg text-black"> {price}</span>
          </p>
          {/* Additional Details */}
          <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-700">
            Click to view details
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
