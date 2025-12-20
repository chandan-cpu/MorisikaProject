import { useState } from "react";
import { Upload, ShoppingBag, Truck, Shield, Headphones, X, Menu, ShoppingCart } from 'lucide-react';

import { Images } from '../data/mock'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = ({ onCartClick }) => {
  const [cartCount, setCartCount] = useState(5);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();


  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="bg-teal-900 rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-white text-2xl font-bold"><img src={Images.logo} alt="Logo" className="w-12 h-12 rounded-full" /></span>
            </div>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-teal-700 font-medium transition-colors">Home</Link>
            <Link to="/browse" className="text-gray-700 hover:text-teal-700 font-medium transition-colors">Services</Link>
            <Link to="/inspiration" className="text-gray-700 hover:text-teal-700 font-medium transition-colors">Creations</Link>
            <Link to="/browse" className="text-gray-700 hover:text-teal-700 font-medium transition-colors">Products</Link>
            <Link to="/testimonial" className="text-gray-700 hover:text-teal-700 font-medium transition-colors">Testimonial</Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
              onClick={onCartClick || (() => navigate('/cart'))}
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5 min-w-5 text-center">
                  {cartCount}
                </span>
              )}
            </button>

            {!user && (
              <Link
                to="/login"
                className="block text-gray-700 hover:text-teal-700 py-2"
              >
                Login
              </Link>
            )}

            {/* Token valid hai */}
            {user && (
              <button
                onClick={() => dispatch(logout())}
                className="block text-gray-700 hover:text-red-600 py-2"
              >
                Logout
              </button>
            )}


            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <a href="#home" className="block text-gray-700 hover:text-teal-700 py-2">Home</a>
            <a href="#services" className="block text-gray-700 hover:text-teal-700 py-2">Services</a>
            <a href="#creations" className="block text-gray-700 hover:text-teal-700 py-2">Creations</a>
            <a href="#products" className="block text-gray-700 hover:text-teal-700 py-2">Products</a>
            <a href="#gallery" className="block 
            ztext-gray-700 hover:text-teal-700 py-2">Testimonial</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;