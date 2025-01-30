/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Title = ({text1, text2,className=""}) => {
  
  return (
    <div className={` w-full flex items-center ${className} gap-1 sm:gap-3 whitespace-nowrap`}>
        <p className='text-gray-500 '>{text1} <span className='text-gray-700 '>{text2} </span></p>
        <p className='w-12 h-1 bg-gray-600'></p>
    </div>
  )
}

export default Title
