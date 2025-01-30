/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";
import { products } from "../assets/assets";
import { useEffect } from "react";
import { toast } from "react-toastify";

// Create the context
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "PKR";
  const delivery_charge = 150;
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});


// --------( Get total count of the item functionality)-----------------

 const getTotalCount = ()=>{
    let totalcount = 0

  for(const items in cartItems){
    for(const item in cartItems[items]){

     try {
       if(cartItems[items][item] > 0){
           totalcount += cartItems[items][item];
       }
     } catch (error) {
      console.log("Error form getTotalcount:",error);
      
     }
    }
  }
   return totalcount;
 }

 // --------( Add to cart Functionality)-----------------
  
  const addToCart = async (itemId, size) => {

    let cartData = structuredClone(cartItems);
    if(!size){
      toast.error("Please select Product size");
    } 
    
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

// --------( Quantity update or remove  Functionality)-----------------
  
 const quantityUpate = async (itemId,size,quantity) => {
  const cartData = structuredClone(cartItems);

  cartData[itemId][size]= quantity;

  setCartItems(cartData);
 }


  const value = {
    products,
    currency,
    delivery_charge,
    showSearch,
    setShowSearch,
    cartItems,
    search,
    setSearch,
    addToCart,
    quantityUpate,
    getTotalCount
  };

  return (
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
