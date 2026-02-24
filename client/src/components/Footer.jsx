import {Images} from '../data/mock'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="bg-teal-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <span className="text-white text-xl font-bold"><img src={Images.logo} alt="Logo" /></span>
            </div>
            <p className="text-sm text-gray-400">
              Celebrating Assamese heritage through authentic handcrafted art.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-teal-400 transition-colors">Products</a></li>
              <li><a href="#gallery" className="hover:text-teal-400 transition-colors">Gallery</a></li>
              <li><a href="#about" className="hover:text-teal-400 transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Mini Frames</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Paintings</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Clay Art</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Crochet</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>+91 7099414274</li>
              <li>chandan@gmail.com</li>
              <li>Guwahati, Assam, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© 2025 Mori Chikaa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;