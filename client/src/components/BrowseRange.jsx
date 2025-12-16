import { useNavigate } from "react-router-dom";

const BrowseRange = () => {
  const categories = [
    { name: '4x4 Mini Frames', image: '🖼️' },
    { name: 'Portrait Digital', image: '👤' },
    { name: 'Pen Art', image: '✍️' },
    { name: 'Clay Frames', image: '🎭' },
    { name: 'Majuli Mukha', image: '🎨' },
    { name: 'Gamusa Frames', image: '🧵' },
    { name: 'Crochet Items', image: '🧶' },
    { name: 'Fridge Magnets', image: '🧲' }
  ];

  const navigate = useNavigate();

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Browse The Range
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-2 duration-300"
              onClick={() => navigate(`/product/${category.name.toLowerCase().replace(/\s+/g, '-')}`)}
            >
              <div className="text-6xl mb-4">{category.image}</div>
              <h3 className="font-semibold text-gray-800 text-lg">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BrowseRange;