/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Product from './pages/Product'
import About from './pages/About'
import Collection from './pages/Collection'
import Cart from './pages/Cart'
import Orderplace from './pages/Orderplace'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'

function App() {
 

  return (
    <>
       <div className='px-4 sm:px-[2vw] md:px-[3vw] lg:px-[5vw]'>
          <Navbar/>
          <SearchBar/>
        <Routes>
         <Route path='/'  element={<Home/>} />
         <Route path='/login'  element={<Login/>} />
         <Route path='/contact'  element={<Contact/>} />
         <Route path='/product/:productId'  element={<Product/>} />
         <Route path='/about'  element={<About/>} />
         <Route path='/collection'  element={<Collection/>} />
         <Route path='/cart' element={<Cart/>} />
         <Route path='/placeOrder' element={<Orderplace/>} />

        </Routes>
      <Footer/>
       </div>
    </>
  )
}

export default App
