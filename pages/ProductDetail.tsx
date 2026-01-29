
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS, PLACEHOLDER_IMAGE } from '../constants';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { GoogleGenAI } from "@google/genai";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // AI Style Concierge States
  const [isAiConciergeOpen, setIsAiConciergeOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [outfitImage, setOutfitImage] = useState<string | null>(null);
  const [vibeCheck, setVibeCheck] = useState<{ score: number, review: string } | null>(null);
  const conciergeFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const foundProduct = PRODUCTS.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.image);
      window.scrollTo(0, 0);
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomed(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, selectedSize);
      setIsAdding(false);
    }, 600);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  };

  const handleVibeCheck = async (base64Image: string) => {
    if (!product) return;
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            parts: [
              { text: `Analyze the uploaded outfit image and compare it with the ${product.name} shoe which is a ${product.category} shoe. Give me a style 'Vibe Check' score out of 100 and a short 2-sentence styling advice paragraph. Return only a JSON object like: {"score": 85, "review": "This is a perfect match! The casual vibe of your denim pairs excellently with the sleek lines of the Urban Glide X."}` },
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
      setVibeCheck(result);
    } catch (error) {
      console.error("Vibe Check failed:", error);
      alert("AI was unable to process your outfit. Try another photo!");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const onOutfitFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setOutfitImage(base64);
        setVibeCheck(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const activeInWishlist = isInWishlist(product.id);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Gallery */}
          <div className="flex-grow flex flex-col md:flex-row gap-4">
            <div className="hidden md:flex flex-col gap-4 w-24">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} onError={handleImageError} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div 
              className="flex-grow aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-50 cursor-zoom-in relative group"
              onClick={() => setIsZoomed(true)}
            >
              <img src={selectedImage} onError={handleImageError} alt={product.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                 <div className="bg-white/90 backdrop-blur-md p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                   </svg>
                 </div>
              </div>
            </div>
            {/* Mobile Thumbnails */}
            <div className="flex md:hidden gap-2 overflow-x-auto pb-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <img src={img} onError={handleImageError} alt={`${product.name} mobile thumb`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-[450px] flex-shrink-0 flex flex-col">
            <div className="mb-2 flex justify-between items-center">
               <span className="text-xs font-bold uppercase tracking-widest text-blue-600">{product.category}</span>
               <button 
                 onClick={() => toggleWishlist(product)}
                 className={`p-2 rounded-full transition-all ${activeInWishlist ? 'bg-red-50 text-red-500' : 'bg-zinc-100 text-zinc-400 hover:text-red-500'}`}
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${activeInWishlist ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                 </svg>
               </button>
            </div>
            <h1 className="text-4xl font-black text-zinc-900 mb-4 tracking-tighter">{product.name}</h1>
            <div className="flex items-center gap-4 mb-8">
              <p className="text-3xl font-bold text-zinc-900">${product.price}</p>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">{product.rating} / 5.0</span>
              </div>
            </div>

            {/* Main Description Section */}
            <div className="mb-10 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 border-b border-zinc-100 pb-2">Product Overview</h3>
              <p className="text-zinc-600 leading-relaxed">
                {product.description} Engineered to provide a seamless transition between athletic performance and everyday urban utility. Our signature {product.name} features refined contours and advanced materials to ensure you never have to compromise on style or substance.
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Peak Response</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Premium Finish</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Ultra Breathable</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">High Durability</span>
                 </div>
              </div>
            </div>

            {/* Sizes Selection */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">Select Size (US)</h3>
                <a href="#" className="text-xs text-blue-600 hover:underline font-bold">Size Guide</a>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                      selectedSize === size 
                        ? 'border-blue-600 bg-blue-50 text-blue-600' 
                        : 'border-zinc-100 text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Style Concierge Integration */}
            <div className="mb-10">
              <button 
                onClick={() => setIsAiConciergeOpen(!isAiConciergeOpen)}
                className="w-full flex items-center justify-between p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100 hover:bg-white hover:border-blue-200 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black uppercase tracking-widest text-zinc-900">AI Style Concierge</p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Does this match my outfit?</p>
                  </div>
                </div>
                <svg className={`w-5 h-5 text-zinc-300 group-hover:text-blue-600 transition-all ${isAiConciergeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
              </button>

              {isAiConciergeOpen && (
                <div className="mt-4 p-8 bg-zinc-50 rounded-[2.5rem] border border-blue-50 animate-fade-in">
                  {!outfitImage ? (
                    <div 
                      onClick={() => conciergeFileInputRef.current?.click()}
                      className="border-2 border-dashed border-zinc-200 rounded-3xl p-8 text-center cursor-pointer hover:bg-white transition-all group"
                    >
                      <svg className="w-8 h-8 text-zinc-300 mx-auto mb-4 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Upload your outfit photo</p>
                      <input 
                        ref={conciergeFileInputRef}
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={onOutfitFileChange}
                      />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                          <img src={outfitImage} alt="Outfit" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                           {vibeCheck ? (
                             <div>
                               <div className="flex items-baseline gap-2 mb-1">
                                 <span className="text-3xl font-black text-blue-600">{vibeCheck.score}</span>
                                 <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Style Score</span>
                               </div>
                               <button 
                                 onClick={() => setOutfitImage(null)}
                                 className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700"
                               >
                                 Try Different Outfit
                               </button>
                             </div>
                           ) : (
                             <button 
                               onClick={() => handleVibeCheck(outfitImage)}
                               disabled={isAnalyzing}
                               className="bg-zinc-900 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-2"
                             >
                               {isAnalyzing ? "Analyzing..." : "Get Vibe Check"}
                             </button>
                           )}
                        </div>
                      </div>
                      {vibeCheck && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50 animate-fade-in-up">
                           <p className="text-sm text-zinc-600 leading-relaxed italic">"{vibeCheck.review}"</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Technical Specs List */}
            <div className="mb-10 bg-zinc-50/50 p-6 rounded-3xl border border-zinc-100">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Detailed Specifications</h4>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Weight</span>
                        <span className="text-xs text-zinc-900 font-black">280g (Size 9)</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Arch Support</span>
                        <span className="text-xs text-zinc-900 font-black">Neutral / Mid</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Material</span>
                        <span className="text-xs text-zinc-900 font-black">Premium Knit & Leather</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Heel Drop</span>
                        <span className="text-xs text-zinc-900 font-black">10mm</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 ${
                  isAdding 
                    ? 'bg-green-600 text-white' 
                    : 'bg-zinc-900 text-white hover:bg-blue-600'
                }`}
              >
                {isAdding ? (
                  <>
                    <svg className="animate-bounce w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Added to Cart
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>
              <div className="flex items-center justify-center gap-8 py-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                  Free Shipping
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  30-Day Returns
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        <div className="mt-32 pt-16 border-t border-gray-100">
          <h2 className="text-3xl font-black text-zinc-900 mb-12 uppercase tracking-tighter">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Image Zoom Lightbox */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-12 animate-fade-in cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div 
            className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              onError={handleImageError}
              alt={product.name} 
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl animate-scale-up"
            />
            
            <div className="mt-8 flex gap-4 overflow-x-auto p-2 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-white scale-110' : 'border-white/10 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} onError={handleImageError} alt="Gallery item" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
