
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info */}
          <div>
            <h1 className="text-5xl font-black text-zinc-900 mb-8 uppercase tracking-tighter">Get In Touch</h1>
            <p className="text-xl text-zinc-500 leading-relaxed mb-12">
              Have a question about our collections or need help with an order? Our team is here to help you 24/7.
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-1">Email Us</h4>
                  <p className="text-zinc-500">support@urbanstep.com</p>
                  <p className="text-zinc-500">press@urbanstep.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-1">Visit Us</h4>
                  <p className="text-zinc-500">123 Streetwear Ave, Suite 404</p>
                  <p className="text-zinc-500">New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-1">Call Us</h4>
                  <p className="text-zinc-500">+1 (888) STEP-NOW</p>
                  <p className="text-zinc-500">Mon - Fri: 9am - 6pm EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-zinc-50 p-10 md:p-16 rounded-[3rem]">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-black text-zinc-900 mb-4">Message Sent!</h3>
                <p className="text-zinc-500">We've received your inquiry and will get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-blue-600 font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Full Name</label>
                  <input 
                    required type="text" 
                    className="w-full bg-white border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Email Address</label>
                  <input 
                    required type="email" 
                    className="w-full bg-white border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    placeholder="john@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Message</label>
                  <textarea 
                    required rows={6} 
                    className="w-full bg-white border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-colors transform active:scale-[0.98]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
