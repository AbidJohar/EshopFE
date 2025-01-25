/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className=' text-white py-10 mt-20 border-[1px] border-t-gray-500'>
      {/* Footer Content */}
      <div className='container mx-auto px-1 sm:grid grid-cols-[2fr_1fr_1fr] gap-8'>
        
        {/* Logo and Description */}
        <div>
          <img src={assets.logo} alt="logo" className="w-32 mb-4" />
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nesciunt nihil veritatis ducimus est, sapiente fugit sed laborum. Minima veniam, officiis dolor eius ullam harum minus modi asperiores qui! Est!
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg font-semibold text-gray-800 mb-4">Company</p>
          <ul className="space-y-2">
            <li className="text-gray-600 cursor-pointer">Home</li>
            <li className="text-gray-600 cursor-pointer">About</li>
            <li className="text-gray-600 cursor-pointer">Delivery</li>
            <li className="text-gray-600 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h1 className="text-lg font-semibold text-gray-700 mb-4">GET IN TOUCH</h1>
          <p className="text-sm text-gray-400">Contact: +23522311</p>
          <p className="text-sm text-gray-400">abid@gmail.com</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm text-gray-500 py-6">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
