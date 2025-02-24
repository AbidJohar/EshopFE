/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";
// import { products } from "../assets/assets";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create the context
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const currency = "PKR";
  const delivery_charge = 150;
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const navigate = useNavigate();


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
      return 0;
    } 
    if(!token){
      navigate('/login')
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
    // console.log("controll reach here");
    

 if(token){
  console.log("token", token);
  
    try {
          await axios.post(backend_url+'/api/v1/carts/add', {itemId, size}, {headers:{token}});
           
    } catch (error) {
       console.log("Error in add to cart func",error);
       toast.error(error.message);
    }
 }


};

// --------( Quantity update or remove  Functionality)-----------------
  
 const quantityUpate = async (itemId,size,quantity) => {
  const cartData = structuredClone(cartItems);

  cartData[itemId][size]= quantity;

  setCartItems(cartData);

 if(token){
  try {
       const responce =   await axios.post(backend_url+"/api/v1/carts/update", {itemId,size,quantity}, {headers:{token}});

  } catch (error) {
     console.log("Error in cart quantity update func:", error);
      toast.error(error.message);
  }
 }

 }


// --------( Cart Total amount Functionality)-----------------

const getTotalAmount = () =>{
  
  let  totalAmount = 0;
  
  for(const items in cartItems){
    let productInfo = products.find((pro) => pro._id === items)
    for ( const item in cartItems[items]){
      try {
                    if(cartItems[items][item] > 0){
                       totalAmount += cartItems[items][item] * productInfo.price;
                      }
                    } catch (error) {
                      console.log("Error from Get cart Total amount:",error);
                      
                    }
                  }
                  
                }
                
                return totalAmount;
                
              }
              
              
// --------( list of product fetch funtionality)-----------------
       const fetchAllProducts = async () => {
            
         try {
            const responce =  await axios.get(`${backend_url}/api/v1/products/list-product`);
              if(responce.data.success){
                setProducts(responce.data.products)
              }
                 toast.error(responce.data.message)
         } catch (error) {
                 console.log("Error from the fetchAllProducts:",error);
                  toast.error(error.message)
         } 
       }

// ---------------(get user cart function)-----------------
       const getUserCart = async (token)=>{
             
         try {

          const responce =   await axios.post(backend_url+"/api/v1/carts/get", {}, {headers:{token}});
             if(responce.data.success){
                 setCartItems(responce.data.data)
             }
         } catch (error) {
          console.log("Error in get user cart func:", error);
          toast.error(error.message);
         }

       }


 useEffect(()=>{
   
   fetchAllProducts();
 },[])
 useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setToken(storedToken);
    getUserCart(storedToken);
  }
}, []);   
  
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
    getTotalCount,
    getTotalAmount,
    setProducts,
    token,
    setToken,
    backend_url,
    setCartItems
  };

  return (
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
