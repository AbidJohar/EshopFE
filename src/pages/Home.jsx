/* eslint-disable no-unused-vars */
import React from 'react'
import HeroSection from '../components/HeroSection'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'

const Home = () => {
  return (
    <div>
       <HeroSection/>
       <LatestCollection/>
       <BestSeller/>
       <OurPolicy/>
    </div>
  )
}

export default Home
