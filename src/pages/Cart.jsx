/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, quantityUpate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if(products.length > 0){

      const tempData = [];
      console.log("cartitems in cart:", cartItems);
  
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems,products]);

  return (
    <div className="mt-6 p-4">
      {/* Title */}
      <div className="text-2xl">
        <Title className="justify-start" text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div className="mt-5 space-y-4">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="border-b border-t border-gray-300 pb-4 pt-4 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] gap-4 items-center"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20 rounded-sm"
                  src={productData.image[0]}
                  alt="image"
                />
                <div>
                  <p className="text-xl text-black ">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="whitespace-nowrap">
                      {currency}{" "}
                      <span className="font-bold text-black">
                        {productData.price}
                      </span>
                    </p>
                    <p className="px-2 bg-slate-100 border-[1px] rounded-sm border-gray-200">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
              onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : quantityUpate(item._id, item.size, Number(e.target.value))}
                className="max-w-10  sm:max-w-20 px-2 border border-gray-300"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => quantityUpate(item._id, item.size, 0)}
                className="w-4 sm:w-5 mr-3"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <CartTotal/>
    </div>
  );
};

export default Cart;
