
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { PLACEHOLDER_IMAGE } from '../constants';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const active = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  };

  return (
    <Link to={`/product/${product.id}`} className="group relative block">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-zinc-50 relative border border-transparent group-hover:border-zinc-100 transition-all duration-500 shadow-sm group-hover:shadow-2xl">
        <img
          src={product.image}
          alt={product.name}
          onError={handleImageError}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistClick}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all hover:scale-110 active:scale-90 z-20"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-colors ${active ? 'text-red-500 fill-current' : 'text-zinc-400'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {product.isNew && (
          <span className="absolute top-6 left-6 bg-blue-600 text-white text-[10px] uppercase font-black px-3 py-1.5 rounded-full shadow-lg shadow-blue-200">
            New Arrival
          </span>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
            <button className="w-full bg-white text-zinc-900 text-xs font-black py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 uppercase tracking-widest">
                Quick View
            </button>
        </div>
      </div>
      <div className="mt-6 px-2 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-black text-zinc-900 uppercase tracking-tighter line-clamp-1">{product.name}</h3>
          <p className="mt-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{product.category}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-zinc-900">${product.price}</p>
          <div className="flex items-center gap-0.5 mt-1">
             <span className="text-[10px] font-black text-yellow-400">★</span>
             <span className="text-[10px] font-black text-zinc-400">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
