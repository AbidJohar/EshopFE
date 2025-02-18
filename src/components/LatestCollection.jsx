/* eslint-disable no-unused-vars */
import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { useState } from 'react'
import { useEffect } from 'react'
import ProductCard from './ProductCard'

const LatestCollection = () => {

      const {products} = useContext(ShopContext);
      const [productslist, setProductslist] = useState([]);

      useEffect(()=>{
            setProductslist(products.slice(-8))
      },[products])

  return (
    <div className='my-10 '>
        <div className='text-center py-8 sm:text-3xl  text-2xl'>
             <Title text1="LATEST" text2="COLLECTION"/>
             <p className='text-gray-500 text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores optio minima libero qui fuga eveniet, accusamus, velit hic excepturi earum, ex numquam eaque repellendus similique modi dignissimos. Minima, asperiores tenetur?</p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-4 mb-3'>
         {
          productslist.map((pro) => (
             <ProductCard key={pro._id} name={pro.name} id={pro._id} image={pro.image[0]} price={pro.price} />
          ))

         }
        </div>
    </div>
  )
}

export default LatestCollection
