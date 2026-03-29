import React, { useState } from "react";
import { Trash2, Plus, Minus, Tag, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/cartThunk";
import { toast } from "react-toastify";
import api from "../../axios";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  console.log("Cart Items from Redux:", cartItems); // Debug log
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [latestWhatsAppLink, setLatestWhatsAppLink] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  //Fetch Cart on mount

  useEffect(() => {
    // Dispatch the thunk to fetch cart data
    dispatch(fetchCart());
  }, [dispatch]);

  //  The REMOVE Handler
  const handleRemoveItem = async (productId) => {
    dispatch(removeFromCart(productId));
    dispatch(fetchCart());
  };

  const handleMinus = (productId, currentQuantity) => {
    const delta = -1;

    // Now we check the specific item's quantity, not the whole array
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ productId, delta }));
    } else {
      toast.error(
        "Quantity cannot be less than 1. To remove the item, click on REMOVE.",
      );
    }
  };

  const handlePlus = (productId, currentQuantity) => {
    const delta = 1; // We know it's an increase
    console.log(
      "Attempting to increase quantity for product ID:",
      productId,
      "Current Quantity:",
      currentQuantity,
    ); // Debug log

    // Now we check the specific item's quantity, not the whole array
    if (currentQuantity >= 1 && currentQuantity < 5) {
      // Assuming max stock is 5 for demo
      console.log("Dispatching update for:", productId);
      dispatch(updateQuantity({ productId, delta }));
    } else {
      toast.error("Quantity cannot be more than the available stock.");
    }
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleWhatsAppPayment = async () => {
    const requiredFields = [
      "fullName",
      "phone",
      "addressLine1",
      "city",
      "state",
      "pincode",
    ];

    const missingField = requiredFields.find((field) => !shippingAddress[field]);
    if (missingField) {
      toast.error("Please fill all required address fields.");
      return;
    }

    try {
      setIsProcessingPayment(true);
      const response = await api.post("/cart/checkout", {
        shippingAddress,
        paymentMethod: "whatsapp",
      });

      const orderId = response?.data?.orderId;
      const payableAmount = response?.data?.totalAmount;
      const merchantWhatsAppNumber = response?.data?.merchantWhatsAppNumber;

      if (!orderId || !payableAmount) {
        toast.error("Unable to prepare payment request. Please try again.");
        return;
      }

      const fullAddress = [
        shippingAddress.addressLine1,
        shippingAddress.addressLine2,
        shippingAddress.city,
        shippingAddress.state,
        shippingAddress.pincode,
        shippingAddress.country,
      ]
        .filter(Boolean)
        .join(", ");

      const paymentMessage = [
        "Hello, I want to place an order.",
        `Order ID: ${orderId}`,
        `Amount to Pay: INR ${Number(payableAmount).toFixed(2)}`,
        `Name: ${shippingAddress.fullName}`,
        `Phone: ${shippingAddress.phone}`,
        `Shipping Address: ${fullAddress}`,
        "Please share payment confirmation details.",
      ].join("\n");

      const encodedMessage = encodeURIComponent(paymentMessage);
      const generatedWhatsAppLink = merchantWhatsAppNumber
        ? `https://wa.me/${merchantWhatsAppNumber}?text=${encodedMessage}`
        : `https://wa.me/?text=${encodedMessage}`;

      setLatestWhatsAppLink(generatedWhatsAppLink);
      toast.success("Opening WhatsApp with your payment request...");
      dispatch(fetchCart());
      window.open(generatedWhatsAppLink, "_blank", "noopener,noreferrer");
    } catch (checkoutError) {
      toast.error(
        checkoutError.response?.data?.msg ||
          checkoutError.response?.data?.error ||
          "Checkout failed. Please try again.",
      );
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;
  // const totalOriginalPrice = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  // const totalDiscount = totalOriginalPrice - totalPrice;
  const deliveryCharges = cartItems.some((item) => !item.freeDelivery) ? 40 : 0;
  const finalAmount = totalPrice + deliveryCharges;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-medium">My Cart</h1>
            <span className="text-sm sm:text-base text-gray-500">
              ({cartItems.length} items)
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-sm shadow-sm p-8 sm:p-12 text-center">
            <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg sm:text-xl font-medium mb-2">
              Your cart is empty!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Add items to it now.
            </p>
            <button className="bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-sm font-medium hover:bg-blue-700">
              Shop now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-sm shadow-sm p-3 sm:p-6"
                >
                  <div className="flex gap-3 sm:gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 sm:w-28 sm:h-28 shrink-0">
                      <div
                        className="w-full aspect-square bg-cover bg-center rounded"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-medium mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                        Color: {item.color}
                      </p>
                      <p className="text-xs text-gray-500 mb-2 sm:mb-3">
                        Seller: {item.seller}
                      </p>

                      {/* Price */}
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                        <span className="text-lg sm:text-2xl font-medium">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                        {/* <span className="text-gray-400 line-through text-xs sm:text-sm">₹{item.originalPrice.toLocaleString('en-IN')}</span> */}
                        <span className="text-green-600 text-xs sm:text-sm font-medium">
                          5 % off
                        </span>
                      </div>

                      {/* Delivery Info */}
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        {item.freeDelivery && (
                          <span className="text-xs font-medium text-gray-700">
                            FREE Delivery
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          in {item.delivery}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center border border-gray-300 rounded-full">
                          <button
                            onClick={() =>
                              handleMinus(item.productId, item.quantity)
                            }
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-100 rounded-l-full"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="w-8 sm:w-10 text-center text-sm sm:text-base font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handlePlus(item.productId, item.quantity)
                            }
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-100 rounded-r-full"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
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
                <button
                  onClick={handleOpenCheckout}
                  className="w-full bg-orange-500 text-white py-3 sm:py-4 rounded-sm font-medium text-base sm:text-lg hover:bg-orange-600"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>

            {/* Price Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-sm shadow-sm p-4 sm:p-6 lg:sticky lg:top-4">
                <h2 className="text-gray-500 text-xs sm:text-sm font-medium mb-3 sm:mb-4 uppercase">
                  Price Details
                </h2>
                <div className="space-y-2 sm:space-y-3 pb-3 sm:pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>
                      Price (
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                      items)
                    </span>
                    {/* <span>₹{totalOriginalPrice.toLocaleString('en-IN')}</span> */}
                  </div>
                  {/* <div className="flex justify-between text-sm sm:text-base">
                    <span>Discount</span>
                    <span className="text-green-600">−₹{totalDiscount.toLocaleString('en-IN')}</span>
                  </div> */}
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
                  <span>₹{finalAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-sm p-2.5 sm:p-3 mb-4 sm:mb-6">
                  {/* <p className="text-green-700 font-medium text-xs sm:text-sm">
                    You will save ₹{totalDiscount.toLocaleString('en-IN')} on this order
                  </p> */}
                </div>
                <button
                  onClick={handleOpenCheckout}
                  className="w-full bg-orange-500 text-white py-2.5 sm:py-3 rounded-sm font-medium hover:bg-orange-600 hidden lg:block"
                >
                  PLACE ORDER
                </button>

                {showCheckoutForm && (
                  <div className="mt-6 border-t border-gray-200 pt-4 space-y-3">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                      Shipping Address
                    </h3>

                    <input
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleAddressChange}
                      placeholder="Full Name *"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                    />
                    <input
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleAddressChange}
                      placeholder="Phone Number *"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                    />
                    <input
                      name="addressLine1"
                      value={shippingAddress.addressLine1}
                      onChange={handleAddressChange}
                      placeholder="Address Line 1 *"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                    />
                    <input
                      name="addressLine2"
                      value={shippingAddress.addressLine2}
                      onChange={handleAddressChange}
                      placeholder="Address Line 2"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                    />
                    <input
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      placeholder="City *"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                    />
                    <input
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleAddressChange}
                      placeholder="State *"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                    />
                    <input
                      name="pincode"
                      value={shippingAddress.pincode}
                      onChange={handleAddressChange}
                      placeholder="Pincode *"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                    />
                    <input
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleAddressChange}
                      placeholder="Country"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                    />

                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 pt-2">
                      WhatsApp Payment Request
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Tap below to open WhatsApp and send your address + payment request.
                    </p>

                    <button
                      onClick={handleWhatsAppPayment}
                      disabled={isProcessingPayment}
                      className="w-full bg-green-600 text-white py-2.5 rounded-sm font-medium hover:bg-green-700 disabled:opacity-60"
                    >
                      {isProcessingPayment ? "Processing..." : "Request Payment on WhatsApp"}
                    </button>

                    {latestWhatsAppLink && (
                      <a
                        href={latestWhatsAppLink}
                        className="block text-xs text-blue-600 break-all"
                      >
                        If WhatsApp did not open, tap here: {latestWhatsAppLink}
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Offers Card */}
              <div className="bg-white rounded-sm shadow-sm p-4 sm:p-6 mt-3 sm:mt-4">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  <h3 className="font-medium text-sm sm:text-base">
                    Available Offers
                  </h3>
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
};

export default Cart;
