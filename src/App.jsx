/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import Orderplace from "./pages/Orderplace";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Orders from "./pages/Orders";
import { ToastContainer} from "react-toastify";
import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { token } = useContext(ShopContext);

  return (
    <>
      <div className="px-4 sm:px-[2vw] md:px-[3vw] lg:px-[5vw]">
        <Navbar />
        <ToastContainer />
        <SearchBar />
        <Routes>
  <Route path="/login" element={<Login />} />
  
  {/* Protected Routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/product/:productId" element={<Product />} />
    <Route path="/about" element={<About />} />
    <Route path="/collection" element={<Collection />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/place-order" element={<Orderplace />} />
    <Route path="/orders" element={<Orders />} />
  </Route>
  
  <Route path="*" element={<NotFound />} />
</Routes>    <Footer />
      </div>
    </>
  );
}

export default App;
