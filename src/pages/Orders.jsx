/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  const { token,backend_url, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);


const fetchUserOrders = async ()=>{

  try {
      if(!token){
        return null;
      }
      const responce = await axios.post(`${backend_url}/api/v1/orders/userOrders`,{},{headers:{token}})
      console.log(responce.data.orders);
      
         if(responce.data.success){
             const allOrders = [];
             responce.data.orders.map((order)=>{
                console.log("item:",order);
                order.item.map((item)=>{
                   item['status'] = order.status;
                   item['payment'] = order.payment;
                   item['paymentMethod'] = order.paymentMethod;
                   item['date'] = order.date;
                   allOrders.push(item)
                })
                
             })
             console.log("all orders:",allOrders);
             
            setOrders(allOrders);
         }
         else{
          toast.error(responce.data.message)
         }
         
  } catch (error) {
     console.log("Error in fetchuserOrders:",error);
     toast.error(error.message);
  }
}

 useEffect(()=>{
     fetchUserOrders();
 },[token])




  return (
    <div className="mt-10 px-4 sm:px-8">
      <div className="text-xl sm:text-2xl font-semibold">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="mt-5 space-y-6">
        {orders.map((item) => (
          <div
            key={item._id}
            className="border-t border-b border-gray-300 py-2 rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-[4fr_1.5fr_1fr] gap-4 items-center"
          >
            <div className="flex items-start gap-4 sm:gap-6">
              <img
                className="w-14 sm:w-20 rounded-md object-cover"
                src={item.image[0]}
                alt="product"
              />
              <div>
                <p className="text-lg sm:text-xl  text-black">{item.name}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-sm sm:text-base">
                  <p className="whitespace-nowrap">
                    {currency} <span className="font-bold text-black">{item.price}</span>
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p className="px-2 py-1 ">Size: {item.size}</p>
                </div>
                <p className="pt-2 text-md font-medium text-black sm:text-base">
                  Date: <span className="font-medium text-gray-700">{new Date(item.date).toDateString()}</span>
                </p>
              </div>
            </div>

            <div className="text-sm sm:text-base cursor-pointer font-medium text-green-600">
              {item.status}
            </div>

            <div className="text-sm sm:text-base  font-medium text-blue-600 cursor-pointer">
              Track the Order
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
