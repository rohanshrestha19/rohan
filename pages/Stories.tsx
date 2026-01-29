
import React from 'react';
import { Link } from 'react-router-dom';

const Stories: React.FC = () => {
  const articles = [
    {
      id: 1,
      category: 'Design',
      title: 'The Engineering of AeroLift: Breaking Gravity',
      excerpt: 'How we spent 18 months perfecting the vertical response tech that redefined the high-performance athlete market.',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      date: 'March 15, 2025',
      author: 'David Chen',
      featured: true
    },
    {
      id: 2,
      category: 'Culture',
      title: 'Street Style: Brooklyn Chapter',
      excerpt: 'Following the local creators who are using the Urban Glide X to navigate the concrete jungle.',
      image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
      date: 'March 12, 2025',
      author: 'Maya Ross'
    },
    {
      id: 3,
      category: 'Innovation',
      title: 'Sustainability at the Core',
      excerpt: 'Discover our journey toward a zero-waste future with the new Ocean-Mesh recycled collection.',
      image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80',
      date: 'March 10, 2025',
      author: 'Liam Forster'
    },
    {
      id: 4,
      category: 'Community',
      title: 'Steps for Change: NYC Run',
      excerpt: 'Recapping our latest community run event through lower Manhattan with over 200 participants.',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80',
      date: 'March 05, 2025',
      author: 'Sarah James'
    }
  ];

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Header */}
      <header className="pt-24 pb-16 border-b border-zinc-100 text-center max-w-4xl mx-auto px-4">
        <span className="text-blue-600 font-black uppercase tracking-[0.5em] text-[10px] block mb-4">Urban Journal</span>
        <h1 className="text-6xl md:text-8xl font-black text-zinc-900 tracking-tighter uppercase italic leading-none mb-8">
          The Step <br /> Journal.
        </h1>
        <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed uppercase tracking-tight">
          Exploring the intersection of performance, design, and street culture.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Featured Story */}
        <section className="mb-32">
          <Link to="#" className="group relative block overflow-hidden rounded-[3rem] bg-zinc-900 aspect-[21/9]">
            <img 
              src={featuredArticle.image} 
              alt={featuredArticle.title}
              className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/20 to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12 max-w-3xl">
              <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest mb-6 inline-block">Featured Story</span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-tight mb-4">{featuredArticle.title}</h2>
              <p className="text-zinc-300 text-lg mb-8 line-clamp-2 max-w-xl">{featuredArticle.excerpt}</p>
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/50">
                 <span>{featuredArticle.author}</span>
                 <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                 <span>{featuredArticle.date}</span>
              </div>
            </div>
          </Link>
        </section>

        {/* Article Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {otherArticles.map((article) => (
            <Link key={article.id} to="#" className="group flex flex-col">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-100 mb-8 relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-8 left-8">
                   <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-900">
                     {article.category}
                   </span>
                </div>
              </div>
              <div className="px-2">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 bg-zinc-200 rounded-full"></span>
                  <span>5 Min Read</span>
                </div>
                <h3 className="text-2xl font-black text-zinc-900 tracking-tighter uppercase mb-4 leading-tight group-hover:text-blue-600 transition-colors">{article.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2">{article.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-100 pb-1 group-hover:border-blue-600 group-hover:text-blue-600 transition-all">
                  Read Story
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* Journal Subscription Section */}
        <section className="bg-zinc-50 rounded-[4rem] p-12 md:p-24 text-center border border-zinc-100 relative overflow-hidden">
           <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-black text-zinc-900 mb-6 tracking-tighter uppercase italic leading-none">Subscribe to <br /> The Journal.</h2>
             <p className="text-zinc-500 text-lg mb-12">Deep dives, limited drop alerts, and exclusive interviews with urban creators delivered weekly.</p>
             <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="flex-grow bg-white border-2 border-zinc-100 rounded-2xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                />
                <button className="bg-zinc-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-zinc-200">
                  Join List
                </button>
             </form>
             <p className="mt-8 text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">Join 12,000+ subscribers worldwide.</p>
           </div>
           
           {/* Decorative elements */}
           <div className="absolute top-10 left-10 text-[12rem] font-black text-zinc-200 opacity-20 pointer-events-none select-none">“</div>
           <div className="absolute bottom-10 right-10 text-[12rem] font-black text-zinc-200 opacity-20 pointer-events-none select-none">”</div>
        </section>
      </main>

      {/* Recommended Reading */}
      <section className="py-24 bg-zinc-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-end mb-16">
              <div>
                <span className="text-blue-500 font-black uppercase tracking-widest text-xs mb-2 block">Deep Dive</span>
                <h2 className="text-4xl font-black uppercase tracking-tighter">The Archive</h2>
              </div>
              <button className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">View All Stories</button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Designing the 2025 Winter Sole', cat: 'Process', img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80' },
                { title: 'The Rise of Urban Athletics', cat: 'Culture', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' },
              ].map((item, i) => (
                <div key={i} className="group relative h-[400px] rounded-[3rem] overflow-hidden">
                   <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                   <div className="absolute bottom-10 left-10">
                      <span className="text-blue-400 font-black text-[10px] uppercase tracking-widest mb-2 block">{item.cat}</span>
                      <h3 className="text-3xl font-black uppercase tracking-tighter leading-tight">{item.title}</h3>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Stories;
