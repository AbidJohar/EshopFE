/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from './ProductCard';
import Title from './Title';

const RelatedProduct = ({ category, currentProductId }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (item) => item.category === category && item._id !== currentProductId
      );
      setRelatedProducts(filteredProducts.slice(0,7));
    }
  }, [products, category, currentProductId]);

  return (
    <div className="mt-6">
        <div className='text-start w-full text-3xl bg-gray-100 mb-4'>
          <Title  text1="RELATED" text2="PRODUCTS" />
          </div>
      {relatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
             <ProductCard key={product._id} name={product.name} price = {product.price} image={product.image} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No related products found.</p>
      )}
    </div>
  );
};

export default RelatedProduct;