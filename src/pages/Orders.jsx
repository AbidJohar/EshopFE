/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="mt-10 px-4 sm:px-8">
      <div className="text-xl sm:text-2xl font-semibold">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="mt-5 space-y-6">
        {products.slice(1, 5).map((item, index) => (
          <div
            key={index}
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
                  <p>Quantity: 1</p>
                  <p className="px-2 py-1 ">Size: M</p>
                </div>
                <p className="pt-2 text-sm sm:text-base">
                  Date: <span className="font-medium">20, Jun, 2024</span>
                </p>
              </div>
            </div>

            <div className="text-sm sm:text-base cursor-pointer font-medium text-green-600">
              Ready to Ship
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
