import React, { useState } from 'react';

// Dummy product data
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    slug: 'wireless-headphones'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    slug: 'smart-watch'
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    slug: 'laptop-stand'
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    slug: 'mechanical-keyboard'
  },
  {
    id: 5,
    name: 'USB-C Hub',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
    slug: 'usb-c-hub'
  },
  {
    id: 6,
    name: 'Webcam HD',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop',
    slug: 'webcam-hd'
  },
  {
    id: 7,
    name: 'Phone Case',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
    slug: 'phone-case'
  },
  {
    id: 8,
    name: 'Portable Charger',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
    slug: 'portable-charger'
  },
  {
    id: 9,
    name: 'Bluetooth Speaker',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    slug: 'bluetooth-speaker'
  },
  {
    id: 10,
    name: 'Gaming Mouse',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
    slug: 'gaming-mouse'
  },
  {
    id: 11,
    name: 'Monitor 27"',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
    slug: 'monitor-27'
  },
  {
    id: 12,
    name: 'Desk Lamp',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    slug: 'desk-lamp'
  }
];

// Navbar Component
// const Navbar = ({ onHomeClick }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <nav className="bg-slate-800 text-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
//         <div className="flex justify-between items-center h-14 sm:h-16">
//           <button 
//             onClick={onHomeClick} 
//             className="text-xl sm:text-2xl font-bold hover:text-slate-300 transition"
//           >
//             TechStore
//           </button>
          
//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-4 lg:space-x-6">
//             <button onClick={onHomeClick} className="hover:text-slate-300 transition text-sm lg:text-base">
//               Products
//             </button>
//             <button className="hover:text-slate-300 transition text-sm lg:text-base">About</button>
//             <button className="hover:text-slate-300 transition text-sm lg:text-base">Contact</button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button 
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="md:hidden p-2"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               {mobileMenuOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden pb-4 space-y-2">
//             <button 
//               onClick={() => { onHomeClick(); setMobileMenuOpen(false); }}
//               className="block w-full text-left px-3 py-2 hover:bg-slate-700 rounded transition"
//             >
//               Products
//             </button>
//             <button className="block w-full text-left px-3 py-2 hover:bg-slate-700 rounded transition">
//               About
//             </button>
//             <button className="block w-full text-left px-3 py-2 hover:bg-slate-700 rounded transition">
//               Contact
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// ProductCard Component
const ProductCard = ({ product, onCardClick }) => {
  return (
    <div
      onClick={() => onCardClick(product.slug)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-base sm:text-lg lg:text-xl font-bold text-slate-700">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

// ProductPage Component
const ProductPage = ({ onProductClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
        Our Products
      </h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onCardClick={onProductClick} />
        ))}
      </div>
    </div>
  );
};

// ProductDetails Component
const ProductDetails = ({ slug, onBackClick }) => {
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <button
          onClick={onBackClick}
          className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
      <button
        onClick={onBackClick}
        className="mb-4 sm:mb-6 text-slate-600 hover:text-slate-800 flex items-center transition text-sm sm:text-base"
      >
        <span className="mr-2">←</span> Back to Products
      </button>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
          <div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center space-y-3 sm:space-y-4 lg:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="text-2xl sm:text-3xl font-bold text-slate-700">
              ${product.price.toFixed(2)}
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center text-yellow-500 text-sm sm:text-base">
                <span>★★★★★</span>
                <span className="ml-2 text-gray-600">(4.8/5)</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Experience premium quality with our {product.name}. Designed for 
                performance and style, this product delivers exceptional value 
                and reliability for your everyday needs. Perfect for both personal 
                and professional use.
              </p>
            </div>
            <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-4">
              <button className="w-full bg-slate-800 text-white px-6 py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-slate-700 transition shadow-md">
                Add to Cart
              </button>
              <button className="w-full bg-white text-slate-800 border-2 border-slate-800 px-6 py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-slate-50 transition">
                Buy Now
              </button>
            </div>
            <div className="pt-2 sm:pt-4 border-t border-gray-200 space-y-2 text-xs sm:text-sm text-gray-600">
              <p>✓ Free shipping on orders over $50</p>
              <p>✓ 30-day money-back guarantee</p>
              <p>✓ 1-year warranty included</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Product Component
const Product = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedSlug, setSelectedSlug] = useState(null);

  const handleProductClick = (slug) => {
    setSelectedSlug(slug);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    setCurrentView('home');
    setSelectedSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'home' ? (
        <ProductPage onProductClick={handleProductClick} />
      ) : (
        <ProductDetails slug={selectedSlug} onBackClick={handleBackClick} />
      )}
    </div>
  );
};

export default Product;