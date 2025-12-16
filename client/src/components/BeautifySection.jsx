import {Images } from '../data/mock';

const BeautifySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Beautify Your Space
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Discover our exquisite Assamese artwork creations that add a touch of elegance and culture to your living space. Each piece is crafted with care, reflecting the rich heritage and artistic traditions of Assam.
            </p>
            <button className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all transform hover:scale-105">
              LEARN MORE
            </button>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-200 rounded-full transform translate-x-4 translate-y-4"></div>
              <img 
                src={Images.BeautifySectionImage}
                alt="Person"
                className="relative w-full max-w-md h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BeautifySection;