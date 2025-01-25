/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React from "react";
import { createContext } from "react";
import { products } from "../assets/assets";

// Create the context
export const ShopContext = createContext();

 
const ShopContextProvider = ({ children }) => {

      const currency = "PKR";
      const delivery_charge = 150;
    // Add shared state or functions here as needed
  const value = {
     products,
     currency,
     delivery_charge

  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
