
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] bg-zinc-900 flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1920&q=80" alt="UrbanStep Heritage" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tight mb-4">Our Heritage</h1>
          <p className="text-blue-400 font-bold tracking-[0.4em] uppercase">Est. 2018 — UrbanStep Footwear</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-zinc-900 mb-12 uppercase tracking-tighter">Designed for the Hustle</h2>
          <p className="text-xl text-zinc-600 leading-relaxed mb-8">
            UrbanStep was founded in the heart of the city with a simple mission: to create high-performance footwear that doesn't sacrifice style. We believe your shoes are the foundation of your journey.
          </p>
          <p className="text-lg text-zinc-500 leading-relaxed">
            From the boardroom to the basketball court, our sneakers are engineered with precision, using sustainable materials and cutting-edge comfort technology. We don't just sell shoes; we provide the gear you need to step into your next challenge with absolute confidence.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-black text-blue-600 mb-2">500K+</div>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Happy Walkers</p>
            </div>
            <div>
              <div className="text-5xl font-black text-blue-600 mb-2">45</div>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Countries Reached</p>
            </div>
            <div>
              <div className="text-5xl font-black text-blue-600 mb-2">100+</div>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Unique Styles</p>
            </div>
            <div>
              <div className="text-5xl font-black text-blue-600 mb-2">98%</div>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-blue-600">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-black mb-4">Innovation First</h3>
              <p className="text-zinc-500 leading-relaxed">Always pushing the boundaries of what a sneaker can do. We invest heavily in R&D to bring you the future of walking.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-green-600">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
              </div>
              <h3 className="text-xl font-black mb-4">Sustainability</h3>
              <p className="text-zinc-500 leading-relaxed">We care about the planet we walk on. Our materials are ethically sourced and designed to last.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-zinc-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-zinc-900">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <h3 className="text-xl font-black mb-4">Community</h3>
              <p className="text-zinc-500 leading-relaxed">UrbanStep is built by people for people. We support urban art and sports projects globally.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
