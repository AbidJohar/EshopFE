/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";

import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Orderplace = () => {
  const { currency, getTotalAmount, delivery_charge,products, token,cartItems, setCartItems, backend_url } = useContext(ShopContext);
  const navigate = useNavigate();
  const [method, setMethod] = useState('COD');
  const subtotal = getTotalAmount();
  const displayDeliveryCharge = subtotal === 0 ? 0 : delivery_charge;
  const total = subtotal + displayDeliveryCharge;

  // Initialize state for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Handle input change dynamically
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {

     let orderItems = [];

     for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
             console.log("before item info",cartItems[items]);
             console.log("items id",items);
             
             
               const itemInfo = structuredClone(products.find(product => product._id === items ));
               console.log("itemInfo:",itemInfo);
               
                 if(itemInfo){
                   itemInfo.size = item;
                   itemInfo.quantity = cartItems[items][item];
                   orderItems.push(itemInfo);
                 }
          }
        }
     }

     let orderData = {
      address: formData,
      item: orderItems,
      amount: getTotalAmount() + delivery_charge
     }
     console.log("orderd data:",orderData);
     
    

     switch (method) {
      case 'COD':
        { 

          const responce =  await axios.post(`${backend_url}/api/v1/orders/cash-on-delivery`, orderData, {headers:{token}});
          console.log("responce:",responce);
          
           if(responce.data.success){
             setCartItems({});
             navigate('/orders')
           } else{
            toast.error(responce.data.message)
           }
        break; 
      }
     
      default:
        break;
     }

     
    } catch (error) {
      console.log("Error from onSubmithander,", error);
      
    }

 }



  return (
    <form onSubmit={onSubmitHandler} className="mt-6 w-full p-4 flex flex-col justify-start lg:flex-row gap-16">
      {/* Delivery Information */}
      <div className="w-full lg:w-1/2 mr-4">
        <div className="text-2xl mb-5">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="w-full mb-4 flex items-center justify-between flex-row gap-4">
          <div className="w-1/2">
            <input
              required
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              className="w-full hover:border-black/30 p-2 border border-gray-300 rounded"
              placeholder="First name"
            />
          </div>
          <div className="w-1/2">
            <input
              required
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              className="w-full hover:border-black/30 p-2 border border-gray-300 rounded"
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="mb-4">
          <input
            required
            type="text"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            className="w-full hover:border-black/30 p-2 border border-gray-300 rounded"
            placeholder="Email address"
          />
        </div>

        <div className="mb-4">
          <input
            required
            type="text"
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            className="w-full hover:border-black/30 p-2 border border-gray-300 rounded"
            placeholder="Street"
          />
        </div>

        <div className="w-full hover:border-black/30 mb-4 flex items-center justify-between flex-row gap-4">
          <div className="w-1/2">
            <input
              required
              type="text"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              className="w-full hover:border-black/30 p-2 border border-gray-300 rounded"
              placeholder="City"
            />
          </div>
          <div className="w-1/2">
            <input
              required
              type="text"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              className="w-full hover:border-black/30 p-2 border border-gray-300 rounded"
              placeholder="State"
            />
          </div>
        </div>

        <div className="w-full hover:border-black/30 mb-4 flex items-center justify-between flex-row gap-4">
          <div className="w-1/2">
            <input
              required
              type="number"
              name="zipcode"
              value={formData.zipcode}
              onChange={onChangeHandler}
              className="w-full hover:border-black/30 p-2 border border-gray-300 rounded"
              placeholder="Zip code"
            />
          </div>
          <div className="w-1/2">
            <input
              required
              type="text"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              className="w-full hover:border-black/30 p-2 border border-gray-300 rounded"
              placeholder="Country"
            />
          </div>
        </div>

        <div className="mb-4">
          <input
            required
            type="text"
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            className="w-full hover:border-black/30 p-2 border border-gray-300 rounded"
            placeholder="Phone"
          />
        </div>
      </div>

      {/* Payment Information */}
      <div className="flex flex-col justify-start rounded-lg">
        <div className="text-2xl mb-6">
          <Title text1="PAYMENT" text2="INFORMATION" />
        </div>
        <div className="flex w-full flex-col space-y-4">
          <div className="mb-4 text-xl">
            <Title className="text-start" text1={"TOTAL"} text2={"AMOUNT"} />
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm md:text-base">Subtotal</p>
            <p className="text-gray-800 font-medium text-sm md:text-base">
              {currency}
              {subtotal.toFixed(2)}
            </p>
          </div>

          {/* Delivery Charges */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm md:text-base">Delivery Charges</p>
            <p className="text-gray-800 font-medium text-sm md:text-base">
              {currency}
              {displayDeliveryCharge.toFixed(2)}
            </p>
          </div>

          {/* Total Fee */}
          <div className="flex justify-between items-center pt-4 border-t-2 border-gray-500">
            <p className="text-gray-800 font-semibold text-base md:text-lg">
              Total Fee
            </p>
            <p className="text-gray-800 font-bold text-base md:text-lg">
              {currency}
              {total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* ---- Payment Types */}
        <div>
          <div className="flex flex-col p-6 rounded-lg mt-10 shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="mb-4">
              <div className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <Title text1={"PAYMENT"} text2={"METHOD"} />
              </div>
              <hr className="mt-2 border-t border-gray-100" />
            </div>

            <div
              onClick={() => navigate("/orders")}
              className="flex items-center justify-center p-2 rounded-md bg-gray-50 border border-gray-300 hover:border-gray-400 hover:bg-gray-200 transition-colors duration-200"
            >
              <span className="text-md font-md cursor-pointer text-gray-700 flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cash on Delivery
              </span>
            </div>
          </div>
        </div>
      </div>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default Orderplace;
