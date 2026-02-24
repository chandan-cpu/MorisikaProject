import React, { useState } from 'react';

// Dummy product data
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    slug: 'wireless-headphones'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    slug: 'smart-watch'
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    slug: 'laptop-stand'
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    slug: 'mechanical-keyboard'
  },
  {
    id: 5,
    name: 'USB-C Hub',
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
    slug: 'usb-c-hub'
  },
  {
    id: 6,
    name: 'Webcam HD',
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop',
    slug: 'webcam-hd'
  },
  {
    id: 7,
    name: 'Phone Case',
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
    slug: 'phone-case'
  },
  {
    id: 8,
    name: 'Portable Charger',
    price: 34.99,
    originalPrice: 54.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
    slug: 'portable-charger'
  },
  {
    id: 9,
    name: 'Bluetooth Speaker',
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    slug: 'bluetooth-speaker'
  },
  {
    id: 10,
    name: 'Gaming Mouse',
    price: 69.99,
    originalPrice: 109.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
    slug: 'gaming-mouse'
  },
  {
    id: 11,
    name: 'Monitor 27"',
    price: 299.99,
    originalPrice: 449.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
    slug: 'monitor-27'
  },
  {
    id: 12,
    name: 'Desk Lamp',
    price: 44.99,
    originalPrice: 69.99,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    slug: 'desk-lamp'
  }
];


// ProductCard Component
const ProductCard = ({ product, onCardClick }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  
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
        <h3 className="text-sm sm:text-base font-medium text-gray-500 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded">
            <span>{product.rating}</span>
            <span>★</span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            ₹{product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400 line-through">
            ₹{product.originalPrice.toFixed(2)}
          </p>
          <p className="text-sm text-green-600 font-medium">
            {discount}% off
          </p>
        </div>
      </div>
    </div>
  );
};

// ProductPage Component
const ProductPage = ({ onProductClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  // Filter and sort products
  let filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Price filter
  if (priceRange !== 'all') {
    filteredProducts = filteredProducts.filter(product => {
      if (priceRange === 'under50') return product.price < 50;
      if (priceRange === '50-100') return product.price >= 50 && product.price <= 100;
      if (priceRange === 'over100') return product.price > 100;
      return true;
    });
  }

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          />
          <svg 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Filter and Sort Bar - Same Row */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {/* Filter Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowFilters(!showFilters);
              setShowSort(false);
            }}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left flex justify-between items-center hover:border-slate-500 transition"
          >
            <span className="font-medium text-gray-700">Filter</span>
            <svg 
              className={`w-5 h-5 text-gray-500 transition-transform ${showFilters ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showFilters && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    value="all"
                    checked={priceRange === 'all'}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">All Prices</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    value="under50"
                    checked={priceRange === 'under50'}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">Under $50</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    value="50-100"
                    checked={priceRange === '50-100'}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">$50 - $100</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    value="over100"
                    checked={priceRange === 'over100'}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">Over $100</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Sort Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSort(!showSort);
              setShowFilters(false);
            }}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left flex justify-between items-center hover:border-slate-500 transition"
          >
            <span className="font-medium text-gray-700">Sort By</span>
            <svg 
              className={`w-5 h-5 text-gray-500 transition-transform ${showSort ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showSort && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-2">
              <button
                onClick={() => {
                  setSortBy('default');
                  setShowSort(false);
                }}
                className={`w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition ${sortBy === 'default' ? 'bg-slate-100 font-medium' : ''}`}
              >
                Default
              </button>
              <button
                onClick={() => {
                  setSortBy('price-low');
                  setShowSort(false);
                }}
                className={`w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition ${sortBy === 'price-low' ? 'bg-slate-100 font-medium' : ''}`}
              >
                Price: Low to High
              </button>
              <button
                onClick={() => {
                  setSortBy('price-high');
                  setShowSort(false);
                }}
                className={`w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition ${sortBy === 'price-high' ? 'bg-slate-100 font-medium' : ''}`}
              >
                Price: High to Low
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Our Products
        </h1>
        <span className="text-sm text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
        </span>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onCardClick={onProductClick} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
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