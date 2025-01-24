/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../assets/assets'

const HeroSection = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-500'>
         {/* hero left side */}
         <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 px-[1rem] sm:px-[1rem]'>
             <div className=' text-gray-600'>
                <div className=' flex items-center  gap-[1rem]'>
                   <p className='w-8 md:w-11  h-[2px] bg-gray-700 '></p>
                   <p className='font font-medium text-base'>OUR BESTSELLER</p>
                </div>
                <h1 className='prata-regular text-5xl font-bold text-gray-600'>Latest Arrival</h1>
                <div className=' flex items-center  gap-[1rem]'>
                   <p className='font font-medium text-base'>SHOP NOW</p>
                   <p className='w-8 md:w-11  h-[2px] bg-gray-700 '></p>
                </div>

             </div>
         </div>
        {/* hero right side */}
         
                <img className='w-full sm:w-1/2 ' src={assets.hero_img} alt="heroimage" />
         
    </div>
  )
}

export default HeroSection
