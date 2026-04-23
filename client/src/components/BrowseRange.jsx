import { useNavigate } from "react-router-dom";

const BrowseRange = () => {
  const customCategories = [
    { name: '4x4 Mini Frames', image: 'https://res.cloudinary.com/dl9o5oenm/image/upload/v1766211630/p9_v6bgfa.jpg' },
    { name: 'Portrait Digital', image: 'https://res.cloudinary.com/dl9o5oenm/image/upload/v1766211622/WhatsApp_Image_2025-12-20_at_10.29.44_AM_yr3uos.jpg' },
    { name: 'Pen Art', image: 'https://res.cloudinary.com/dl9o5oenm/image/upload/v1766211641/p15_rtn74u.jpg' },
    { name: 'Clay Frames', image: 'https://res.cloudinary.com/dl9o5oenm/image/upload/v1766211649/p17_n3srng.jpg' },
  ];

  const categories = [
    { name: 'Majuli Mukha', image: 'https://res.cloudinary.com/dl9o5oenm/image/upload/v1766211638/p14_psbg2t.jpg' },
    { name: 'Gamusa Frames', image: 'https://res.cloudinary.com/dl9o5oenm/image/upload/v1766211647/WhatsApp_Image_2025-12-20_at_10.30.02_AM_y8xuyl.jpg' },
    { name: 'Crochet Items', image: 'https://www.thesprucecrafts.com/thmb/_H8VwV_CeSbXnOHs6RLon6NoxJk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Crochetflowers-GettyImages-815401158-59796064845b340011b24152.jpg' },
    { name: 'Gifts Item', image: 'https://res.cloudinary.com/dl9o5oenm/image/upload/v1766344225/8312031_feum7f.jpg' }
  ];

  const navigate = useNavigate();

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find handmade art, photo frames, pen art, and gift items.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-4 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all p-5 sm:p-6 border border-teal-100">
            <h3 className="font-bold text-gray-800 text-xl sm:text-2xl mb-2 text-center">Custom Order</h3>
            <p className="text-sm text-gray-600 text-center mb-5">Choose a style and place your order.</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {customCategories.map((category, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden cursor-pointer border border-gray-100 hover:border-teal-600 transition-all hover:shadow-md"
                  onClick={() => navigate(`/custom`)}
                >
                  <div
                    className="w-full aspect-square bg-cover bg-center"
                    style={{ backgroundImage: `url(${category.image})` }}
                  ></div>
                  <h4 className="font-semibold text-gray-800 text-sm py-3 px-2 text-center">{category.name}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-3 lg:col-span-4 rounded-2xl bg-white/80 border border-gray-200 p-4 sm:p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Popular Categories</h3>
                <p className="text-sm text-gray-600">Easy to pick. Easy to order.</p>
              </div>
              <span className="shrink-0 rounded-full bg-teal-50 text-teal-700 px-3 py-1 text-xs font-semibold border border-teal-100">
                Shop Now
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-2 duration-300"
                  onClick={() => {
                    navigate(`/product/${category.name.toLowerCase().replace(/\s+/g, '-')}`)
                  }}
                >
                  <div 
                    className="w-full aspect-square bg-cover bg-center"
                    style={{ backgroundImage: `url(${category.image})` }}
                  ></div>
                  <h3 className="font-semibold text-gray-800 text-lg py-4 px-4 text-center">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BrowseRange;