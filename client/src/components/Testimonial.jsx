import React from 'react';
import { Star } from 'lucide-react';

const Testimonial = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "Portland, OR",
      text: "The handcrafted jewelry I ordered exceeded all expectations. The attention to detail is incredible!",
      rating: 5,
      product: "Silver Moon Necklace"
    },
    {
      name: "James Chen",
      location: "Austin, TX",
      text: "Beautiful handmade pottery. Each piece feels unique and special. Will definitely order again!",
      rating: 5,
      product: "Ceramic Bowl Set"
    },
    {
      name: "Emily Rodriguez",
      location: "Seattle, WA",
      text: "The quality of the handwoven scarf is outstanding. You can feel the love in every stitch.",
      rating: 5,
      product: "Wool Winter Scarf"
    },
    {
      name: "Michael Thompson",
      location: "Denver, CO",
      text: "Amazing craftsmanship! The leather wallet is perfect and arrived beautifully packaged.",
      rating: 5,
      product: "Hand-stitched Wallet"
    },
    {
      name: "Lisa Park",
      location: "Boston, MA",
      text: "These handmade candles smell divine and burn evenly. Best purchase I've made all year!",
      rating: 5,
      product: "Lavender Soy Candles"
    },
    {
      name: "David Wilson",
      location: "Chicago, IL",
      text: "The wooden cutting board is a work of art. Functional and gorgeous in my kitchen!",
      rating: 5,
      product: "Walnut Cutting Board"
    }
  ];

  return (
    <div className="w-full bg-linear-to-br from-amber-50 to-orange-50 py-8 sm:py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6 sm:mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2 sm:mb-3">
          What Our Customers Say
        </h2>
        <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg">
          Real reviews from our handmade community
        </p>
      </div>

      <div className="relative">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-linear-to-r from-amber-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-linear-to-l from-orange-50 to-transparent z-10"></div>

        {/* Marquee container */}
        <div className="flex animate-marquee hover:pause">
          {/* First set of testimonials */}
          {testimonials.map((testimonial, index) => (
            <div
              key={`first-${index}`}
              className="shrink-0 w-72 sm:w-80 md:w-96 mx-2 sm:mx-3 md:mx-4 bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex mb-2 sm:mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 italic leading-relaxed">"{testimonial.text}"</p>
              <div className="border-t pt-3 sm:pt-4">
                <p className="font-semibold text-sm sm:text-base text-gray-800">{testimonial.name}</p>
                <p className="text-xs sm:text-sm text-gray-500">{testimonial.location}</p>
                <p className="text-xs sm:text-sm text-amber-600 mt-1">Purchased: {testimonial.product}</p>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {testimonials.map((testimonial, index) => (
            <div
              key={`second-${index}`}
              className="shrink-0 w-72 sm:w-80 md:w-96 mx-2 sm:mx-3 md:mx-4 bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex mb-2 sm:mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 italic leading-relaxed">"{testimonial.text}"</p>
              <div className="border-t pt-3 sm:pt-4">
                <p className="font-semibold text-sm sm:text-base text-gray-800">{testimonial.name}</p>
                <p className="text-xs sm:text-sm text-gray-500">{testimonial.location}</p>
                <p className="text-xs sm:text-sm text-amber-600 mt-1">Purchased: {testimonial.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Testimonial;