/* eslint-disable no-unused-vars */
import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="flex p-4">
      {/* Left side: Image */}
      <div className="w-1/2 p-4">
        <img src={assets.about_img} alt="Dry Fruits" className="w-full md:max-w-[400px] h-auto object-cover rounded-lg"/>
      </div>

      {/* Right side: Title and Description */}
      <div className="w-1/2 p-4">
        <div className='text-2xl'>
          <Title text1={"ABOUT"} text2={"US"} />
        </div>
        <p className="mt-4 text-sm leading-relaxed">
          Our dry fruit products are carefully selected, high-quality, and packed with essential nutrients. 
          Whether you're looking for a healthy snack or ingredients for your recipes, we offer a variety of dry fruits that are 
          naturally rich in vitamins, minerals, and fiber. Enjoy the taste of freshness in every bite and treat yourself to the goodness of nature.
        </p>

        {/* Our Mission Section */}
       
          <h2 className="font-semibold mt-6">Our Mission</h2>
          <p className=" text-sm leading-relaxed">
            Our mission is to provide premium dry fruit products that promote a healthier lifestyle. We aim to deliver the finest quality, 
            sourced sustainably, to ensure that every bite supports both your well-being and the planet. With a commitment to excellence, 
            we are dedicated to offering a product that is not only good for you but also good for the environment.
          </p>
        
      </div>
    </div>
  )
}

export default About
