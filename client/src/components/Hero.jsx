import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Truck, Shield, Headphones } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { Images } from '../data/mock';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const merchantWhatsAppNumber = (import.meta.env.VITE_MERCHANT_WHATSAPP_NUMBER || '918822014259').replace(/\D/g, '');

  const slides = useMemo(
    () => [Images.heroImage, ...(Images.gallery || [])],
    []
  );

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(id);
  }, [slides]);

  const goPrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id="home" className="relative bg-linear-to-br from-gray-50 to-gray-100">
      <div className="fixed right-3 sm:right-5 bottom-4 sm:bottom-6 z-50 flex flex-col gap-3">
        <a
          href={`https://wa.me/${merchantWhatsAppNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all"
        >
          <FaWhatsapp className="w-6 h-6" />
        </a>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Instagram"
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 shadow-lg transition-all"
        >
          <FaInstagram className="w-6 h-6" />
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-8 pt-0 sm:pt-6 pb-12">
        <div className="relative overflow-hidden rounded-none sm:rounded-3xl shadow-xl">
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className="w-full shrink-0 relative">
                <img
                  src={slide}
                  alt="Assamese Art"
                  className="w-full h-[82vh] min-h-[430px] sm:min-h-[540px] object-cover"
                />
                <div className="absolute inset-0 bg-black/35" />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              New Arrival
            </h1>
            <p className="text-lg sm:text-2xl text-white mb-2 drop-shadow-lg">
              অসমীয়া শিল্পকলা
            </p>
            <p className="text-base sm:text-lg text-white mb-8 drop-shadow-lg max-w-2xl">
              Handcrafted frames celebrating Assamese heritage and culture
            </p>

            <button
              onClick={() => navigate('/browse')}
              className="bg-teal-700 hover:bg-teal-800 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-xl transition-all transform hover:scale-105"
            >
              Shop Now
            </button>
          </div>

          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/45 text-white p-2 rounded-full hover:bg-black/60"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/45 text-white p-2 rounded-full hover:bg-black/60"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-6 bg-white' : 'w-2.5 bg-white/60'}`}
              />
            ))}
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
                <h3 className="font-bold text-gray-800 text-lg">Delivery All Over India</h3>
                <p className="text-gray-600 text-sm">Fast and reliable shipping to all corners of the country</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <Headphones className="w-12 h-12 text-teal-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Support 24/7</h3>
                <p className="text-gray-600 text-sm">Our dedicated support team is available around the clock to assist you</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <Shield className="w-12 h-12 text-teal-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">100% Authentic</h3>
                <p className="text-gray-600 text-sm">Each piece is handcrafted with authenticity and cultural significance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;