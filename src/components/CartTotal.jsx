/* eslint-disable no-unused-vars */
import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import { useNavigate } from 'react-router-dom';

const CartTotal = () => {
  const { delivery_charge, getTotalAmount, currency } = useContext(ShopContext);
  const navigate = useNavigate()
  const subtotal = getTotalAmount();
  const displayDeliveryCharge = subtotal === 0 ? 0 : delivery_charge;
  const total = subtotal + displayDeliveryCharge;

  return (
    <div className='flex w-full md:w-1/2 flex-col space-y-4  mt-10'>
      <div className='mb-4 text-xl'>
        <Title className='text-start' text1={"TOTAL"} text2={"AMOUNT"} />
      </div>
      
      {/* Subtotal */}
      <div className='flex justify-between items-center'>
        <p className='text-gray-600 text-sm md:text-base'>Subtotal</p>
        <p className='text-gray-800 font-medium text-sm md:text-base'>
          {currency}{subtotal.toFixed(2)}
        </p>
      </div>

      {/* Delivery Charges */}
      <div className='flex justify-between items-center'>
        <p className='text-gray-600 text-sm md:text-base'>Delivery Charges</p>
        <p className='text-gray-800 font-medium text-sm md:text-base'>
          {currency}{displayDeliveryCharge.toFixed(2)}
        </p>
      </div>

      {/* Total Fee */}
      <div className='flex justify-between items-center pt-4 border-t-2 border-gray-500'>
        <p className='text-gray-800 font-semibold text-base md:text-lg'>Total Fee</p>
        <p className='text-gray-800 font-bold text-base md:text-lg'>
          {currency}{total.toFixed(2)}
        </p>
      </div>
      <button onClick={()=> navigate('/place-order') } className='px-4 py-2 bg-black/85 w-2/3 text-white hover:bg-black'>PROCEED TO CHECKOUT</button>
    </div>
  )
}

export default CartTotal