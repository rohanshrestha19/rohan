
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar: React.FC = () => {
  const { cart, totalItems, totalPrice } = useCart();
  const { totalWishlistItems } = useWishlist();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Stories', path: '/stories', badge: 'New' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-extrabold tracking-tighter text-zinc-900 hover:opacity-80 transition-opacity">
              URBAN<span className="text-blue-600">STEP</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-all flex items-center gap-1.5 ${
                    location.pathname === link.path ? 'text-blue-600' : 'text-zinc-600 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="bg-blue-600 text-[8px] font-black text-white px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Wishlist Icon */}
            <Link to="/wishlist" className="relative p-2 group block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-900 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {totalWishlistItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCartPreviewOpen(true)}
              onMouseLeave={() => setIsCartPreviewOpen(false)}
            >
              <Link to="/cart" className="relative p-2 group block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-900 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mini Cart Preview */}
              {isCartPreviewOpen && totalItems > 0 && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in-up">
                  <div className="p-4 border-b border-gray-50 bg-zinc-50/50">
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Recently Added</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {cart.slice(0, 3).map((item) => (
                      <div key={`${item.id}-${item.selectedSize}`} className="p-4 flex gap-4 border-b border-gray-50 last:border-0">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-grow">
                          <p className="text-sm font-bold text-zinc-900 line-clamp-1">{item.name}</p>
                          <p className="text-[10px] text-zinc-500">Size {item.selectedSize} • Qty {item.quantity}</p>
                        </div>
                        <p className="text-sm font-black text-zinc-900">${item.price}</p>
                      </div>
                    ))}
                  </div>
                  {cart.length > 3 && (
                    <div className="p-2 text-center border-t border-gray-50">
                      <p className="text-[10px] text-zinc-400 font-bold uppercase">+{cart.length - 3} more items</p>
                    </div>
                  )}
                  <div className="p-4 bg-white">
                    <div className="flex justify-between mb-4">
                      <span className="text-xs font-bold text-zinc-400 uppercase">Subtotal</span>
                      <span className="text-sm font-black text-zinc-900">${totalPrice}</span>
                    </div>
                    <Link to="/cart" className="block w-full text-center bg-zinc-900 text-white py-3 rounded-xl text-xs font-black hover:bg-blue-600 transition-colors uppercase tracking-widest">
                      View Bag
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-zinc-600 hover:text-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-4 text-base font-medium text-zinc-700 hover:text-blue-600 hover:bg-zinc-50 rounded-lg transition-colors"
              >
                {link.name}
                {link.badge && (
                  <span className="ml-2 bg-blue-600 text-[8px] font-black text-white px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <Link
                to="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-4 text-base font-medium text-zinc-700 hover:text-red-600 hover:bg-zinc-50 rounded-lg transition-colors"
              >
                Wishlist ({totalWishlistItems})
              </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
