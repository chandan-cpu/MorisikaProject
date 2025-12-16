import { Images } from '../data/mock';


const InspirationCollection = () => {
  const products = [
    { id: 1, image: Images.gallery[0] },
    { id: 2, image: Images.gallery[1] },
    { id: 3, image: Images.gallery[2] },
  ];

  return (
    <section id="creations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Inspiration Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of Assamese artwork creations for inspiration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="overflow-hidden">
                <img 
                  src={product.image}
                  alt={`Product ${product.id}`}
                  className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InspirationCollection;