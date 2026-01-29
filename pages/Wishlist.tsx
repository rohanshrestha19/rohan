
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-8">
          <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </div>
        <h1 className="text-3xl font-black text-zinc-900 mb-4 uppercase tracking-tighter">Your wishlist is empty</h1>
        <p className="text-zinc-500 mb-8 max-w-sm text-center">Save your favorite pairs for later. Browse our collection and click the heart icon to add items here!</p>
        <Link to="/shop" className="bg-zinc-900 text-white px-12 py-4 rounded-full font-bold hover:bg-blue-600 transition-all shadow-xl">
          Start Exploring
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-gray-100 pb-10">
          <h1 className="text-5xl font-black text-zinc-900 uppercase tracking-tighter mb-2">My Wishlist</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Saved {wishlist.length} Items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-24 bg-zinc-50 rounded-[3rem] p-12 text-center">
          <h2 className="text-2xl font-black text-zinc-900 mb-4 uppercase tracking-tight">Want to see more?</h2>
          <p className="text-zinc-500 mb-8 max-w-md mx-auto">Our latest Summer Collection just dropped with over 20+ new styles. Don't miss out!</p>
          <Link to="/shop" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-zinc-900 transition-all">
            Browse New Arrivals
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
