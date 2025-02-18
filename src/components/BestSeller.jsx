/* eslint-disable no-unused-vars */
import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react';
import { useEffect } from 'react';
import Title from './Title';
import ProductCard from './ProductCard';

const BestSeller = () => {

  const {products} = useContext(ShopContext);
  const [bestSellers, setBestSellers ] = useState([]);


  useEffect(()=>{
            //  console.log("products", products);
             
   const Sellerproducts =  products?.filter((pro) => (pro.bestSeller));
        // console.log(Sellerproducts);
        
   setBestSellers(Sellerproducts);

  },[products])

  return (
    <div className=' my-6'>
           <div className='text-center py-8 sm:text-3xl  text-2xl'>
             <Title text1="BEST" text2="SELLERS"/>
             <p className='text-gray-500 text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores optio minima libero qui fuga eveniet, accusamus, velit hic excepturi earum</p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-4 mb-3'>
         {
          bestSellers.map((pro) => (
             <ProductCard key={pro._id} name={pro.name} id={pro._id} image={pro.image[0]} price={pro.price} />
          ))

         }
        </div>

    </div>
  )
}

export default BestSeller
