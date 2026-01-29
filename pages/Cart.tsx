
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutPopup from '../components/CheckoutPopup';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-8">
          <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        </div>
        <h1 className="text-3xl font-black text-zinc-900 mb-4 uppercase tracking-tighter">Your cart is empty</h1>
        <p className="text-zinc-500 mb-8 max-w-sm text-center">Looks like you haven't added anything to your cart yet. Let's find your perfect pair!</p>
        <Link to="/shop" className="bg-blue-600 text-white px-12 py-4 rounded-full font-bold hover:bg-zinc-900 transition-all shadow-xl">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-zinc-900 mb-12 uppercase tracking-tight">Shopping Bag ({totalItems})</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-grow space-y-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="bg-white p-6 rounded-3xl flex flex-col sm:flex-row gap-6 items-center border border-gray-100 shadow-sm transition-hover hover:shadow-md">
                <div className="w-32 h-32 flex-shrink-0 bg-zinc-50 rounded-2xl overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-lg font-black text-zinc-900 mb-1">{item.name}</h3>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-4">{item.category} • Size {item.selectedSize}</p>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-4">
                    <div className="flex items-center border border-zinc-200 rounded-xl px-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                        className="p-2 text-zinc-500 hover:text-blue-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-zinc-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                        className="p-2 text-zinc-500 hover:text-blue-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-widest"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                
                <div className="text-right sm:min-w-[100px]">
                  <p className="text-xl font-black text-zinc-900">${item.price * item.quantity}</p>
                  <p className="text-xs text-zinc-400">${item.price} each</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="w-full lg:w-[400px] flex-shrink-0">
            <div className="bg-zinc-900 text-white p-10 rounded-[2.5rem] shadow-2xl sticky top-28">
              <h2 className="text-2xl font-black mb-10 uppercase tracking-tighter">Summary</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-zinc-400">
                  <span className="text-sm font-medium">Subtotal</span>
                  <span className="text-white font-bold">${totalPrice}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span className="text-sm font-medium">Shipping</span>
                  <span className="text-white font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span className="text-sm font-medium">Estimated Tax</span>
                  <span className="text-white font-bold">$0.00</span>
                </div>
                <div className="pt-6 border-t border-zinc-800 flex justify-between">
                  <span className="text-xl font-black">Total</span>
                  <span className="text-2xl font-black text-blue-500">${totalPrice}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-lg transition-all transform active:scale-95 shadow-xl shadow-blue-900/40"
              >
                Checkout Now
              </button>
              
              <div className="mt-8 flex justify-center gap-4 opacity-40">
                <svg className="w-10 h-6" viewBox="0 0 36 24" fill="currentColor"><rect width="36" height="24" rx="4" fill="#1A1F71"/><path d="M13.5 12c0-1.6 1.3-3 3-3s3 1.4 3 3-1.3 3-3 3-3-1.4-3-3z" fill="#F7B600"/><circle cx="14" cy="12" r="5" fill="#EB001B" fillOpacity=".8"/><circle cx="22" cy="12" r="5" fill="#F7B600" fillOpacity=".8"/></svg>
                <svg className="w-10 h-6" viewBox="0 0 36 24" fill="white"><rect width="36" height="24" rx="4" fill="#003087"/><path d="M11 11.5L9 15h2l2-3.5-1-1.5-1 1.5M16 11.5L14 15h2l2-3.5-1-1.5-1 1.5" fill="currentColor"/></svg>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {isCheckoutOpen && <CheckoutPopup onClose={() => setIsCheckoutOpen(false)} />}
    </div>
  );
};

export default Cart;
