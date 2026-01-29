
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, PLACEHOLDER_IMAGE } from '../constants';
import ProductCard from '../components/ProductCard';
import { Category, Gender } from '../types';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Gender>('Men');
  const newArrivalsRef = useRef<HTMLDivElement>(null);

  const menProducts = PRODUCTS.filter(p => p.gender === 'Men' || p.gender === 'Unisex').slice(0, 4);
  const womenProducts = PRODUCTS.filter(p => p.gender === 'Women' || p.gender === 'Unisex').slice(0, 4);
  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 6);
  const trendingProducts = PRODUCTS.filter(p => p.rating >= 4.8).slice(0, 3);
  const productOfTheWeek = PRODUCTS.find(p => p.id === '7') || PRODUCTS[0];
  const saleProducts = PRODUCTS.filter(p => p.isSale).slice(0, 4);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  };

  // Automatic Slider Logic
  useEffect(() => {
    const container = newArrivalsRef.current;
    if (!container) return;

    let intervalId: number;

    const startSliding = () => {
      intervalId = window.setInterval(() => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const maxScroll = scrollWidth - clientWidth;
        
        // If we're near the end, reset to start, else scroll right
        if (scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 340, behavior: 'smooth' }); // card width + gap
        }
      }, 3000);
    };

    const stopSliding = () => clearInterval(intervalId);

    startSliding();

    // Pause on hover for better accessibility and UX
    container.addEventListener('mouseenter', stopSliding);
    container.addEventListener('mouseleave', startSliding);

    return () => {
      stopSliding();
      container.removeEventListener('mouseenter', stopSliding);
      container.removeEventListener('mouseleave', startSliding);
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Alex Rivera",
      avatar: "https://i.pravatar.cc/150?u=alex",
      text: "Literally the most comfortable sneakers I've ever owned. I wear my Urban Glides for 12 hours a day and my feet feel amazing. Truly a game changer.",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      text: "Style meets performance. I bought the Summit Pros for my morning runs, but I end up wearing them to the cafe too. They look so premium!",
      rating: 5
    },
    {
      id: 3,
      name: "Marcus Thorne",
      avatar: "https://i.pravatar.cc/150?u=marcus",
      text: "UrbanStep is my new go-to. The delivery was incredibly fast and the packaging felt like a luxury unboxing experience. 10/10 would recommend.",
      rating: 4
    }
  ];

  return (
    <div className="flex flex-col gap-0 overflow-x-hidden">
      {/* 1. Enhanced Hero Section */}
      <section className="relative h-screen w-full bg-zinc-950 overflow-hidden flex items-center">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1920&q=80" 
            alt="Hero Kicks" 
            onError={handleImageError}
            className="w-full h-full object-cover opacity-50 scale-110 animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-4 animate-fade-in-up">
              <span className="h-[2px] w-12 bg-blue-600"></span>
              <span className="text-blue-500 font-black tracking-[0.4em] text-xs uppercase block">Urban Collection 2025</span>
            </div>
            
            <h1 className="text-6xl md:text-[9rem] font-black text-white leading-[0.85] mb-8 tracking-tighter uppercase italic select-none">
              Step Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500 drop-shadow-2xl">Style.</span>
            </h1>

            <p className="text-zinc-400 text-lg md:text-2xl max-w-2xl leading-relaxed font-medium animate-fade-in-up [animation-delay:200ms]">
              Redefining movement for the modern explorer. <br className="hidden md:block" />
              Crafted with precision, worn with absolute confidence.
            </p>

            <div className="flex flex-wrap gap-6 pt-4 animate-fade-in-up [animation-delay:400ms]">
              <Link to="/shop" className="group relative bg-white text-zinc-950 px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm transition-all overflow-hidden hover:pr-16 active:scale-95 shadow-2xl shadow-blue-500/10">
                <span className="relative z-10">Shop Now</span>
                <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </span>
              </Link>
              <Link to="/about" className="bg-transparent border-2 border-white/20 text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm">
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Socials Side / Badge */}
        <div className="absolute right-12 bottom-12 hidden lg:flex flex-col items-center gap-6 animate-fade-in-up [animation-delay:600ms]">
          <div className="w-[1px] h-24 bg-white/20"></div>
          <span className="text-white/40 font-black text-[10px] uppercase tracking-[0.5em] [writing-mode:vertical-rl]">Follow Us</span>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-40">
           <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
             <div className="w-1 h-2 bg-white rounded-full"></div>
           </div>
        </div>
      </section>

      {/* 2. New Arrivals - Automatic Horizontal Slider */}
      <section className="py-24 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-blue-600 font-black uppercase tracking-widest text-xs mb-2 block">The Fresh List</span>
              <h2 className="text-4xl font-black text-zinc-900 uppercase tracking-tight">New Arrivals</h2>
            </div>
            <Link to="/shop?new=true" className="text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors pb-1 border-b-2 border-transparent hover:border-blue-600">View All</Link>
          </div>
          
          <div 
            ref={newArrivalsRef}
            className="flex gap-8 overflow-x-auto pb-12 snap-x scrollbar-hide cursor-grab active:cursor-grabbing select-none"
          >
            {newArrivals.map((product) => (
              <div key={product.id} className="w-[300px] flex-shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Product Grid – Men & Women */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-zinc-900 mb-8 uppercase tracking-tight">Our Favorites</h2>
            <div className="inline-flex p-1 bg-zinc-100 rounded-2xl">
              <button 
                onClick={() => setActiveTab('Men')}
                className={`px-12 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'Men' ? 'bg-white shadow-xl text-blue-600' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                Men
              </button>
              <button 
                onClick={() => setActiveTab('Women')}
                className={`px-12 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'Women' ? 'bg-white shadow-xl text-blue-600' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                Women
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 animate-fade-in-up">
            {(activeTab === 'Men' ? menProducts : womenProducts).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              to={`/shop?gender=${activeTab}`}
              className="inline-flex items-center gap-2 text-zinc-900 font-black uppercase tracking-widest text-sm border-b-2 border-zinc-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all"
            >
              View All {activeTab}'s Shoes
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Trending Now - High Visual Grid */}
      <section className="py-24 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Hottest Right Now</span>
             <h2 className="text-5xl font-black uppercase tracking-tighter">Trending Now</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {trendingProducts.map((p, i) => (
              <div key={p.id} className={`group relative rounded-[3rem] overflow-hidden bg-zinc-800 border border-zinc-700/50 hover:border-blue-500/50 transition-all duration-500 ${i === 1 ? 'md:-translate-y-8' : ''}`}>
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    onError={handleImageError}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                   <div className="flex items-center gap-2 mb-2">
                     <span className="bg-blue-600 text-white text-[8px] font-black uppercase px-2 py-1 rounded">Top Rated</span>
                     <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, star) => (
                          <svg key={star} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        ))}
                     </div>
                   </div>
                   <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">{p.name}</h3>
                   <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-6">${p.price}</p>
                   <Link to={`/product/${p.id}`} className="inline-block bg-white text-zinc-900 px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all">Shop It</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Product of the Week */}
      <section className="py-24 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center border border-zinc-100">
            <div className="w-full lg:w-1/2 aspect-square relative group">
              <img 
                src={productOfTheWeek.image} 
                alt={productOfTheWeek.name} 
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute top-10 left-10">
                <span className="bg-zinc-900 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">Product of the Week</span>
              </div>
            </div>
            <div className="w-full lg:w-1/2 p-12 lg:p-20">
              <div className="mb-4">
                <span className="text-blue-600 font-black uppercase tracking-widest text-xs">{productOfTheWeek.category}</span>
              </div>
              <h2 className="text-5xl font-black text-zinc-900 mb-6 uppercase tracking-tight leading-none">{productOfTheWeek.name}</h2>
              <p className="text-zinc-500 text-lg mb-10 leading-relaxed">
                {productOfTheWeek.description} Experience the next level of vertical response and lateral stability. This isn't just a shoe; it's an engineering marvel for your feet.
              </p>
              <div className="flex items-center gap-6 mb-12">
                <div className="flex flex-col">
                  <span className="text-zinc-400 line-through text-lg font-bold">$249</span>
                  <span className="text-4xl font-black text-zinc-900">${productOfTheWeek.price}</span>
                </div>
                <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-lg font-bold text-sm uppercase">Limited Offer</div>
              </div>
              <Link 
                to={`/product/${productOfTheWeek.id}`}
                className="inline-block w-full sm:w-auto bg-zinc-900 text-white text-center px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-zinc-200"
              >
                Add to Cart
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sale / Special Offers Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 bg-red-600 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
             <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">Summer Sale</h2>
                <p className="text-red-100 text-xl font-bold">Up to 30% Off on Selected Items</p>
             </div>
             <Link to="/shop?sale=true" className="relative z-10 bg-white text-red-600 px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-zinc-900 hover:text-white transition-all">
                Shop Sale
             </Link>
             <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 pointer-events-none">
                <svg className="h-full w-full" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 100 L100 0 L100 100 Z"/></svg>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {saleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Category Spotlight */}
      <section className="py-24 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[600px] md:h-[500px]">
            {[
              { name: Category.Sneakers, image: 'https://images.unsplash.com/photo-1597041066774-5d27e1d68a3a?auto=format&fit=crop&w=600&q=80', description: 'The Heart of the Street' },
              { name: Category.Sports, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80', description: 'Peak Performance' },
              { name: Category.Casual, image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=600&q=80', description: 'Everyday Versatility' },
            ].map((cat) => (
              <Link key={cat.name} to={`/shop?category=${cat.name}`} className="group relative overflow-hidden rounded-[3rem] shadow-2xl">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/10 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-1">{cat.name}</h3>
                  <p className="text-zinc-400 text-sm font-bold mb-6">{cat.description}</p>
                  <span className="inline-flex items-center text-xs font-black uppercase tracking-widest text-blue-400 group-hover:translate-x-2 transition-transform">
                    Explore Now
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Brand Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: '✨', title: 'Premium Materials', desc: 'Sustainably sourced premium leather and mesh.' },
              { icon: '☁️', title: 'All-Day Comfort', desc: 'Patented cloud-foam sole technology.' },
              { icon: '🏷️', title: 'Affordable Pricing', desc: 'Direct-to-consumer luxury without the markup.' },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Free worldwide shipping on orders over $150.' },
            ].map((v, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-20 h-20 bg-zinc-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                  <span className="text-4xl">{v.icon}</span>
                </div>
                <h4 className="text-lg font-black uppercase tracking-tighter text-zinc-900 mb-2">{v.title}</h4>
                <p className="text-sm text-zinc-500 max-w-[200px]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Customer Stories / Testimonials */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-zinc-900 mb-16 uppercase tracking-tight">Trusted by Thousands of Happy Walkers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-12 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-all flex flex-col items-center text-center">
                <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mb-6 ring-4 ring-blue-50" />
                <div className="flex gap-1 mb-6 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-zinc-600 italic mb-8 leading-relaxed">"{t.text}"</p>
                <h4 className="font-black text-zinc-900 uppercase tracking-widest text-xs">{t.name}</h4>
                <p className="text-[10px] text-blue-600 font-bold mt-1 uppercase tracking-widest">Verified Buyer</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Lifestyle Story Banner */}
      <section className="relative h-[60vh] w-full flex items-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1920&q=80" 
          alt="Lifestyle" 
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-zinc-900/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-7xl font-black mb-8 uppercase tracking-tighter">Your Journey, Our Sole.</h2>
          <p className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-zinc-100 font-medium opacity-90">
            Join a global community of creators, athletes, and explorers who choose UrbanStep to power their every move.
          </p>
          <Link to="/about" className="bg-white text-zinc-900 px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
            Join the Movement
          </Link>
        </div>
      </section>

      {/* 11. Newsletter Signup */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-zinc-900 mb-4 uppercase tracking-tight">Stay Ahead of the Drop</h2>
          <p className="text-zinc-500 text-lg mb-12">Get exclusive deals, early access to new collections, and the latest in urban footwear tech.</p>
          <form className="flex flex-col sm:flex-row gap-4 shadow-2xl rounded-[2.5rem] p-3 bg-zinc-50" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="flex-grow bg-transparent border-none rounded-full px-8 py-4 outline-none text-zinc-900 placeholder-zinc-400 font-bold"
            />
            <button className="bg-zinc-900 text-white px-10 py-4 rounded-[1.8rem] font-black uppercase tracking-widest text-sm hover:bg-blue-600 transition-all">
              Subscribe
            </button>
          </form>
          <p className="mt-8 text-[10px] text-zinc-400 uppercase tracking-widest font-bold">100k+ subscribers. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
