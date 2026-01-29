
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Category, Gender, Product } from '../types';
import ProductCard from '../components/ProductCard';
import { GoogleGenAI } from "@google/genai";

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [selectedGender, setSelectedGender] = useState<string>(searchParams.get('gender') || 'All');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'All');
  const [isSaleOnly, setIsSaleOnly] = useState<boolean>(searchParams.get('sale') === 'true');
  const [priceRange, setPriceRange] = useState<number>(250);
  const [sortBy, setSortBy] = useState<string>('newest');

  // AI Visual Search States
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const gender = searchParams.get('gender');
    const category = searchParams.get('category');
    const sale = searchParams.get('sale');
    if (gender) setSelectedGender(gender);
    if (category) setSelectedCategory(category);
    if (sale) setIsSaleOnly(sale === 'true');
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedGender !== 'All') {
      result = result.filter(p => p.gender === selectedGender || p.gender === 'Unisex');
    }

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (isSaleOnly) {
      result = result.filter(p => p.isSale);
    }

    result = result.filter(p => p.price <= priceRange);

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => (a.isNew ? -1 : 1));
    }

    return result;
  }, [selectedGender, selectedCategory, isSaleOnly, priceRange, sortBy]);

  const handleVisualSearch = async (base64Image: string) => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            parts: [
              { text: "Analyze this shoe image and tell me the most likely category (Sneakers, Sports, or Casual) and if it looks more like a Men's or Women's shoe. Return only a JSON object like: {\"category\": \"Sneakers\", \"gender\": \"Men\"}" },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: base64Image.split(',')[1],
                },
              },
            ],
          },
        ],
      });

      const text = response.text || "{}";
      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const result = JSON.parse(cleanJson);

      if (result.category) setSelectedCategory(result.category);
      if (result.gender) setSelectedGender(result.gender);
      
      setIsVisualSearchOpen(false);
      setPreviewImage(null);
    } catch (error) {
      console.error("AI Analysis failed:", error);
      alert("AI was unable to process the image. Please try another one.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const categories = ['All', ...Object.values(Category)];
  const genders = ['All', 'Men', 'Women'];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-10 gap-8">
          <div>
            <h1 className="text-5xl font-black text-zinc-900 uppercase tracking-tighter mb-2">Our Collection</h1>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Showing {filteredProducts.length} Results</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            {/* Visual Search Trigger */}
            <button 
              onClick={() => setIsVisualSearchOpen(true)}
              className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-zinc-200 group"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Search by Image
            </button>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-50 border-none rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-12">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-zinc-400">Gender</h3>
              <div className="flex flex-wrap gap-2">
                {genders.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                      selectedGender === g 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                        : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-zinc-400">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between w-full px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                      selectedCategory === cat 
                        ? 'bg-zinc-900 text-white' 
                        : 'text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    {cat}
                    {selectedCategory === cat && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Max Price</h3>
                <span className="text-zinc-900 font-black text-sm">${priceRange}</span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                step="5"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-3 text-[10px] text-zinc-400 font-bold uppercase">
                <span>$50</span>
                <span>$250</span>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-100">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={isSaleOnly}
                  onChange={(e) => setIsSaleOnly(e.target.checked)}
                  className="w-5 h-5 rounded-md border-zinc-200 text-blue-600 focus:ring-blue-600"
                />
                <span className="text-xs font-black uppercase tracking-widest text-zinc-900 group-hover:text-blue-600 transition-colors">On Sale Only</span>
              </label>
            </div>

            <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-2xl font-black mb-4 leading-none uppercase tracking-tight">Need help with size?</h4>
                <p className="text-sm text-blue-100 mb-8 opacity-80">Check our interactive size guide to find your perfect fit every time.</p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all">
                  View Guide
                </button>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-grow">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 text-center bg-zinc-50 rounded-[3rem]">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl">
                  <svg className="w-10 h-10 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-2xl font-black text-zinc-900 mb-2 uppercase tracking-tight">No results found</h3>
                <p className="text-zinc-500 max-w-sm font-medium">Try adjusting your filters or search criteria to find what you're looking for.</p>
                <button 
                  onClick={() => { setSelectedGender('All'); setSelectedCategory('All'); setIsSaleOnly(false); setPriceRange(250); }}
                  className="mt-10 bg-zinc-900 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Visual Search Modal */}
      {isVisualSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-xl" onClick={() => setIsVisualSearchOpen(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-scale-up p-12 text-center">
             <button className="absolute top-8 right-8 text-zinc-400 hover:text-zinc-900" onClick={() => setIsVisualSearchOpen(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
             
             <div className="mb-8">
               <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                 <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
               </div>
               <h2 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-2">Visual Search</h2>
               <p className="text-zinc-500 text-sm">Upload a photo of any shoe to find something similar.</p>
             </div>

             {previewImage ? (
               <div className="space-y-6">
                 <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-100 border-4 border-white shadow-xl">
                   <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                 </div>
                 <div className="flex gap-4">
                   <button 
                     onClick={() => setPreviewImage(null)}
                     disabled={isAnalyzing}
                     className="flex-grow py-4 rounded-2xl bg-zinc-100 text-zinc-900 font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all disabled:opacity-50"
                   >
                     Cancel
                   </button>
                   <button 
                     onClick={() => handleVisualSearch(previewImage)}
                     disabled={isAnalyzing}
                     className="flex-grow py-4 rounded-2xl bg-zinc-900 text-white font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-zinc-200 flex items-center justify-center gap-2"
                   >
                     {isAnalyzing ? (
                       <>
                         <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         Analyzing...
                       </>
                     ) : (
                       "Find Matches"
                     )}
                   </button>
                 </div>
               </div>
             ) : (
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="aspect-[4/3] rounded-[2.5rem] border-4 border-dashed border-zinc-100 bg-zinc-50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
               >
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                   <svg className="w-8 h-8 text-zinc-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                 </div>
                 <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest">Select an Image</p>
                 <input 
                   ref={fileInputRef}
                   type="file" 
                   accept="image/*" 
                   className="hidden" 
                   onChange={onFileChange}
                 />
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
