/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";
import { products } from "../assets/assets";

// Create the context
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "PKR";
  const delivery_charge = 150;
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [cartData, setCartData] = useState({});

  // Function to filter products based on search term

  // const addToCart = async ({productId, size})=>{

  //    const copyCartData = 
    

  // }

  const value = {
    products,
    currency,
    delivery_charge,
    showSearch,
    setShowSearch,
    search,
    setSearch,
  };

  return (
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
