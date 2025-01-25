/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row text-center justify-around py-10 gap-10 text-sm text-gray-900">
      <div>
        <img
          src={assets.exchange_icon}
          className="w-12 m-auto mb-5"
          alt="exhangeicon"
        />
        <p className=" fontisemibold">Easy exhange Policy</p>
        <p className="text-gray-600">we offer a hassle free exchange policy</p>
      </div>
      <div>
        <img
          src={assets.quality_icon}
          className="w-12 m-auto mb-5"
          alt="exhangeicon"
        />
        <p className=" fontisemibold ">7 day return policy</p>
        <p className="text-gray-600">we provide a customer satisfictying offers</p>
      </div>
      <div>
        <img
          src={assets.support_img}
          className="w-12 m-auto mb-5"
          alt="exhangeicon"
        />
        <p className=" fontisemibold">7/24 customer support</p>
        <p className="text-gray-600">You can contact anytime from anywhere</p>
      </div>
    </div>
  );
};

export default OurPolicy;
