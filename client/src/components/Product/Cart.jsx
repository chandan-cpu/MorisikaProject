import React, { useState } from 'react';
import { Trash2, Plus, Minus, Tag, ShoppingBag } from 'lucide-react';

const  Cart=() => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Apple iPhone 15 Pro',
      color: 'Natural Titanium',
      seller: 'SuperComNet',
      price: 134900,
      originalPrice: 144900,
      discount: 7,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop',
      delivery: '3 days',
      freeDelivery: true
    },
    {
      id: 2,
      name: 'Sony WH-1000XM5 Wireless Headphones',
      color: 'Black',
      seller: 'RetailNet',
      price: 24990,
      originalPrice: 33990,
      discount: 26,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=300&h=300&fit=crop',
      delivery: '2 days',
      freeDelivery: true
    },
    {
      id: 3,
      name: 'Samsung 43" Crystal 4K TV',
      color: 'Black',
      seller: 'Samsung India',
      price: 28990,
      originalPrice: 44900,
      discount: 35,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
      delivery: '5 days',
      freeDelivery: false
    }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalOriginalPrice = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalDiscount = totalOriginalPrice - totalPrice;
  const deliveryCharges = cartItems.some(item => !item.freeDelivery) ? 40 : 0;
  const finalAmount = totalPrice + deliveryCharges;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-medium">My Cart</h1>
            <span className="text-sm sm:text-base text-gray-500">({cartItems.length} items)</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-sm shadow-sm p-8 sm:p-12 text-center">
            <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg sm:text-xl font-medium mb-2">Your cart is empty!</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">Add items to it now.</p>
            <button className="bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-sm font-medium hover:bg-blue-700">
              Shop now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white rounded-sm shadow-sm p-3 sm:p-6">
                  <div className="flex gap-3 sm:gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0">
                      <div 
                        className="w-full aspect-square bg-cover bg-center rounded"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-medium mb-1 line-clamp-2">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Color: {item.color}</p>
                      <p className="text-xs text-gray-500 mb-2 sm:mb-3">Seller: {item.seller}</p>

                      {/* Price */}
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                        <span className="text-lg sm:text-2xl font-medium">₹{item.price.toLocaleString('en-IN')}</span>
                        <span className="text-gray-400 line-through text-xs sm:text-sm">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                        <span className="text-green-600 text-xs sm:text-sm font-medium">{item.discount}% off</span>
                      </div>

                      {/* Delivery Info */}
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        {item.freeDelivery && (
                          <span className="text-xs font-medium text-gray-700">FREE Delivery</span>
                        )}
                        <span className="text-xs text-gray-500">in {item.delivery}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center border border-gray-300 rounded-full">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-100 rounded-l-full"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="w-8 sm:w-10 text-center text-sm sm:text-base font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-100 rounded-r-full"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs sm:text-sm font-medium hover:text-red-600 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Place Order Button (Mobile) */}
              <div className="lg:hidden sticky bottom-0 bg-white shadow-lg border-t border-gray-200 p-3 -mx-2 sm:-mx-4">
                <button className="w-full bg-orange-500 text-white py-3 sm:py-4 rounded-sm font-medium text-base sm:text-lg hover:bg-orange-600">
                  PLACE ORDER
                </button>
              </div>
            </div>

            {/* Price Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-sm shadow-sm p-4 sm:p-6 lg:sticky lg:top-4">
                <h2 className="text-gray-500 text-xs sm:text-sm font-medium mb-3 sm:mb-4 uppercase">Price Details</h2>
                <div className="space-y-2 sm:space-y-3 pb-3 sm:pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Price ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Discount</span>
                    <span className="text-green-600">−₹{totalDiscount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Delivery Charges</span>
                    {deliveryCharges === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      <span>₹{deliveryCharges}</span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-base sm:text-lg font-medium pt-3 sm:pt-4 mb-4 sm:mb-6">
                  <span>Total Amount</span>
                  <span>₹{finalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-sm p-2.5 sm:p-3 mb-4 sm:mb-6">
                  <p className="text-green-700 font-medium text-xs sm:text-sm">
                    You will save ₹{totalDiscount.toLocaleString('en-IN')} on this order
                  </p>
                </div>
                <button className="w-full bg-orange-500 text-white py-2.5 sm:py-3 rounded-sm font-medium hover:bg-orange-600 hidden lg:block">
                  PLACE ORDER
                </button>
              </div>

              {/* Offers Card */}
              <div className="bg-white rounded-sm shadow-sm p-4 sm:p-6 mt-3 sm:mt-4">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  <h3 className="font-medium text-sm sm:text-base">Available Offers</h3>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>10% Instant Discount on SBI Credit Cards</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>Get extra 20% off upto ₹50 on 1 item(s)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;