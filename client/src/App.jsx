import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import InspirationCollection from "./components/InspirationCollection";
import BeautifySection from "./components/BeautifySection";
import Footer from "./components/Footer";
import BrowseRange from "./components/BrowseRange";

import { Route, Routes } from "react-router-dom";
import Product from "./components/Product/Product";

import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserProfile } from "./redux/authThunk";
import Testimonial from "./components/Testimonial";
import CustomOrderSection from "./components/CustomOrderSection";
import Cart from "./components/Product/Cart";

import { Sidebar } from "lucide-react";
import SideMenu from "./admin/components/layouts/SideMenu";
import Productpage from "./admin/components/pages/Productpage";
import AdminProductsLayout from "./admin/components/AdminProductsLayout";
import OrderStatistics from "./admin/components/pages/OrderStatistics";

// Landing Page Component
const LandingPage = () => (
  <>
    <Hero />
    <InspirationCollection />
    <BeautifySection />
    <BrowseRange />
    <Testimonial />
    <Footer />
  </>
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className=""
        bodyClassName="!text-xs sm:!text-sm"
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/" element={<AdminProductsLayout />}>
          <Route path="admin" element={<OrderStatistics />} />
          <Route path="products" element={<Productpage />} />
        </Route>
        <Route path="/browse" element={<BrowseRange />} />
        <Route path="/inspiration" element={<InspirationCollection />} />
        <Route path="/testimonial" element={<Testimonial />} />

        {/* Public routes */}
        <Route path="/products" element={<Product />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/custom" element={<CustomOrderSection />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected Route (only after login) */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <div className="text-center mt-20 text-2xl font-semibold">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </div>
  );
}
