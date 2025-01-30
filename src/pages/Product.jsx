/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { products, currency, addToCart,setNumOfCartItems } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
 
  useEffect(() => {
    window.scrollTo(0, 0); 
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  return productData ? (
    <div className="max-w-7xl mx-auto p-6 flex flex-col gap-8">
      {/* Main Product Display */}
      <div className="flex gap-4 flex-col sm:gap-8 sm:flex-row">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4 w-fit sm:w-1/3">
          <img
            src={image}
            alt={productData.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="flex gap-2">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                className="w-16 h-16 object-cover border rounded-lg cursor-pointer hover:border-gray-600"
                onClick={() => setImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-2/3">
          <h1 className="text-2xl font-bold">{productData.name}</h1>
          <p className="text-gray-500">{productData.shortDescription}</p>
          <div className="flex items-center justify-start py-2">
            <img className="w-3" src={assets.star_icon} alt="" />
            <img className="w-3" src={assets.star_icon} alt="" />
            <img className="w-3" src={assets.star_icon} alt="" />
            <img className="w-3" src={assets.star_icon} alt="" />
            <img className="w-3" src={assets.star_dull_icon} alt="" />
            <p className="pl-2">(122 Reviews)</p>
          </div>
          <p className="text-xl font-semibold mt-2">
            {currency} {productData.price}
          </p>

          {/* Select Size */}
          <div className="mt-4">
            <h3 className="font-semibold">Select Size</h3>
            <div className="flex gap-2 mt-2 mb-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border-[1px] border-black/20 px-4 py-2 rounded-sm ${
                    size === item ? "bg-black text-white" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              addToCart(productData._id, size);
            }}
            className="mt-6 bg-black text-white px-6 py-3 rounded-sm hover:bg-gray-800"
          >
            Add to Cart
          </button>

          {/* Product Info */}
          <div className="mt-6 border-t border-gray-500 pt-6 text-gray-600">
            <p>✔ 100% Original product</p>
            <p>✔ Cash on delivery available</p>
            <p>✔ Easy return policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews Section */}
      <div className="mt-10">
        <div className="flex border-b pb-2">
          <button className="px-6 py-2 text-md font-semibold">
            Description
          </button>
          <button className="px-6 py-2 text-md font-semibold">
            Reviews (122)
          </button>
        </div>
        <div className="mt-4">
          <p className="text-gray-600 mt-2">{productData.description}</p>
        </div>

        {/* Reviews */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Customer Reviews</h2>
          <div className="mt-4">
            {productData.reviews?.length > 0 ? (
              productData.reviews.map((review, index) => (
                <div key={index} className="border-b py-4">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-gray-500 text-sm">{review.date}</p>
                  <p className="mt-2">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No reviews yet. Be the first to review this product!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products section */}

      <div className="mt-10">
        <RelatedProduct
          currentProductId={productData._id}
          category={productData.category}
        />
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-500 mt-20">Loading product...</div>
  );
};

export default Product;
