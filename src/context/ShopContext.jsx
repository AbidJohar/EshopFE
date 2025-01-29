/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";
import { products } from "../assets/assets";
import { useEffect } from "react";

// Create the context
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "PKR";
  const delivery_charge = 150;
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});

 
  
  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);
    console.log("item id:", itemId, "size:", size);
    
    if (!cartData[itemId]) {
        cartData[itemId] = {}; // Initialize itemId as an object
    }
    
    if (!cartData[itemId][size]) {
        cartData[itemId][size] = 1;  // Start count from 1
    } else {
        cartData[itemId][size] += 1; // Increment count
    }

    setCartItems(cartData);
};
 useEffect(()=>{
  console.log(cartItems);
  
 },[cartItems])


  const value = {
    products,
    currency,
    delivery_charge,
    showSearch,
    setShowSearch,
    search,
    setSearch,
    addToCart
  };

  return (
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
