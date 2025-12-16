import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InspirationCollection from './components/InspirationCollection';
import BeautifySection from './components/BeautifySection';
import Footer from './components/Footer';
import BrowseRange from './components/BrowseRange';

import { Route, Routes } from 'react-router-dom';
import Product from './components/Product/Product';

import Login from './pages/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Landing Page Component
const LandingPage = () => (
  <>
    <Hero />
    <InspirationCollection />
    <BeautifySection />
    <BrowseRange />
    <Footer />
  </>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Public routes */}
        <Route path="/products" element={<Product />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Route (only after login) */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div className="text-center mt-20 text-2xl font-semibold">404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}
