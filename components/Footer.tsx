
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="text-2xl font-black tracking-tighter mb-6 block">
              URBAN<span className="text-blue-500">STEP</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Step Into Style. Walk With Confidence. Premium footwear designed for the modern urban lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-zinc-800 rounded-full hover:bg-blue-600 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="#" className="p-2 bg-zinc-800 rounded-full hover:bg-blue-600 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-zinc-300">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-zinc-400 hover:text-white transition-colors text-sm">Shop All</Link></li>
              <li><Link to="/about" className="text-zinc-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-zinc-400 hover:text-white transition-colors text-sm">Contact</Link></li>
              <li><Link to="/cart" className="text-zinc-400 hover:text-white transition-colors text-sm">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-zinc-300">Customer Care</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">Shipping Policy</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">Returns & Exchanges</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">Size Guide</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-zinc-300">Join the Tribe</h4>
            <p className="text-zinc-400 text-sm mb-6">Subscribe for exclusive offers and new drop alerts.</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-zinc-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600 transition-all outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-sm transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-xs gap-4">
          <p>© 2024 UrbanStep Footwear. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
