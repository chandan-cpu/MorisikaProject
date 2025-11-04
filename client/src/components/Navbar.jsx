import { useState } from "react";
import { Upload, ShoppingBag, Truck, Shield, Headphones, X, Menu } from 'lucide-react';

import {Images} from '../data/mock'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <a href="#home" className="text-gray-700 hover:text-teal-700 font-medium transition-colors">Home</a>
            <a href="#services" className="text-gray-700 hover:text-teal-700 font-medium transition-colors">Services</a>
            <a href="#creations" className="text-gray-700 hover:text-teal-700 font-medium transition-colors">Creations</a>
            <a href="#products" className="text-gray-700 hover:text-teal-700 font-medium transition-colors">Products</a>
            <a href="#gallery" className="text-gray-700 hover:text-teal-700 font-medium transition-colors">Gallery</a>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <a href="#home" className="block text-gray-700 hover:text-teal-700 py-2">Home</a>
            <a href="#services" className="block text-gray-700 hover:text-teal-700 py-2">Services</a>
            <a href="#creations" className="block text-gray-700 hover:text-teal-700 py-2">Creations</a>
            <a href="#products" className="block text-gray-700 hover:text-teal-700 py-2">Products</a>
            <a href="#gallery" className="block text-gray-700 hover:text-teal-700 py-2">Gallery</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;