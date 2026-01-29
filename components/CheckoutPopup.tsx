
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface CheckoutPopupProps {
  onClose: () => void;
}

const CheckoutPopup: React.FC<CheckoutPopupProps> = ({ onClose }) => {
  const { totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    payment: 'credit'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    setTimeout(() => {
        clearCart();
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-up">
        {step < 3 && (
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-2 text-zinc-400 hover:text-zinc-900 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        )}

        <div className="flex h-full">
          {/* Form Side */}
          <div className="flex-grow p-10 md:p-14">
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-black text-zinc-900 mb-2">Shipping Information</h2>
                <p className="text-zinc-500 text-sm mb-10">Where should we send your new steps?</p>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" name="firstName" placeholder="First Name" required 
                      className="bg-zinc-50 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none w-full"
                      value={formData.firstName} onChange={handleInputChange}
                    />
                    <input 
                      type="text" name="lastName" placeholder="Last Name" required 
                      className="bg-zinc-50 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none w-full"
                      value={formData.lastName} onChange={handleInputChange}
                    />
                  </div>
                  <input 
                    type="email" name="email" placeholder="Email Address" required 
                    className="bg-zinc-50 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none w-full"
                    value={formData.email} onChange={handleInputChange}
                  />
                  <input 
                    type="text" name="address" placeholder="Delivery Address" required 
                    className="bg-zinc-50 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none w-full"
                    value={formData.address} onChange={handleInputChange}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" name="city" placeholder="City" required 
                      className="bg-zinc-50 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none w-full"
                      value={formData.city} onChange={handleInputChange}
                    />
                    <input 
                      type="text" name="zip" placeholder="ZIP Code" required 
                      className="bg-zinc-50 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none w-full"
                      value={formData.zip} onChange={handleInputChange}
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-black text-lg mt-6 hover:bg-blue-600 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <button onClick={() => setStep(1)} className="text-zinc-400 hover:text-zinc-900 mb-6 flex items-center text-xs font-bold uppercase tracking-widest gap-2">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                   Back
                </button>
                <h2 className="text-3xl font-black text-zinc-900 mb-2">Payment Method</h2>
                <p className="text-zinc-500 text-sm mb-10">Select your preferred payment option.</p>
                
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="space-y-3">
                    <label className={`flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all ${formData.payment === 'credit' ? 'border-blue-600 bg-blue-50' : 'border-zinc-100'}`}>
                      <div className="flex items-center gap-4">
                        <input type="radio" name="payment" value="credit" checked={formData.payment === 'credit'} onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-zinc-900">Credit Card</span>
                      </div>
                      <div className="flex gap-2">
                         <div className="w-8 h-5 bg-zinc-200 rounded"></div>
                         <div className="w-8 h-5 bg-zinc-200 rounded"></div>
                      </div>
                    </label>
                    <label className={`flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all ${formData.payment === 'paypal' ? 'border-blue-600 bg-blue-50' : 'border-zinc-100'}`}>
                      <div className="flex items-center gap-4">
                        <input type="radio" name="payment" value="paypal" checked={formData.payment === 'paypal'} onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-zinc-900">PayPal</span>
                      </div>
                      <span className="text-blue-700 font-bold italic">PayPal</span>
                    </label>
                  </div>
                  
                  <div className="bg-zinc-50 p-6 rounded-2xl">
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Grand Total</span>
                        <span className="text-xl font-black text-zinc-900">${totalPrice}</span>
                     </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-zinc-900 transition-colors shadow-xl shadow-blue-100"
                  >
                    Place Your Order
                  </button>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-10 animate-fade-in">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-4xl font-black text-zinc-900 mb-4">Order Confirmed!</h2>
                <p className="text-zinc-500 mb-10 leading-relaxed">Thank you for your purchase, {formData.firstName}! We've sent a confirmation email to {formData.email}. Your order will arrive in 3-5 business days.</p>
                <button 
                  onClick={onClose}
                  className="bg-zinc-900 text-white px-12 py-4 rounded-full font-bold hover:bg-blue-600 transition-all shadow-xl"
                >
                  Back to Website
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPopup;
