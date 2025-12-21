import { Upload, ShoppingBag, Truck, Shield, Headphones, X, Menu } from 'lucide-react';
import { Images } from '../data/mock';
import { Link, useNavigate } from 'react-router-dom';
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="relative bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative">
          <div className="absolute inset-0 bg-opacity-40 rounded-3xl"></div>
          <img
            src={Images.heroImage}
            alt="Assamese Art"
            className="w-full h-96 object-cover rounded-3xl"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              New Arrival
            </h1>
            <p className="text-xl sm:text-2xl text-white mb-2 drop-shadow-lg">
              অসমীয়া শিল্পকলা
            </p>
            <p className="text-lg text-white mb-8 drop-shadow-lg max-w-2xl">
              Handcrafted frames celebrating Assamese heritage and culture
            </p>

            <button
              onClick={() => navigate("/browse")}
              className="bg-teal-700 hover:bg-teal-800 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-xl transition-all transform hover:scale-105"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <Truck className="w-12 h-12 text-teal-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Free Delivery</h3>
                <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <Headphones className="w-12 h-12 text-teal-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Support 24/7</h3>
                <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <Shield className="w-12 h-12 text-teal-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">100% Authentic</h3>
                <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;