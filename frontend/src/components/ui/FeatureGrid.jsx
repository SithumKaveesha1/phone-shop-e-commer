import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureGrid = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Large Feature: iPad Air */}
        <div className="lg:col-span-1 bg-[#f5f5f7] rounded-[48px] p-16 flex flex-col min-h-[640px] relative group overflow-hidden border border-zinc-100 shadow-sm transition-all duration-700 hover:shadow-2xl hover:-translate-y-2">
            <div className="relative z-10 w-full mb-12 animate-reveal-up">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em] mb-4 block">New Launch</span>
                <h3 className="text-4xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tighter">The new iPad Air.</h3>
                <p className="text-zinc-500 font-medium text-lg leading-relaxed max-w-sm mb-8">Featuring the powerful Apple M2 chip and vibrant advanced displays.</p>
                <Link to="/products?category=iPad" className="bg-zinc-900 text-white px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 w-fit hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                    Explore Now <ChevronRight size={16} strokeWidth={3} />
                </Link>
            </div>
            <div className="mt-auto relative z-10 transition-transform duration-1000 group-hover:scale-110 group-hover:-rotate-3">
                <img 
                    src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1000&q=80" 
                    alt="iPad Air" 
                    className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1000&q=80'; }}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

            {/* Column of shorter features */}
            <div className="flex flex-col gap-10">
                {/* AirPods 4 */}
                <div className="bg-white rounded-[48px] p-12 flex border border-zinc-100 group relative overflow-hidden flex-1 shadow-sm transition-all duration-700 hover:shadow-2xl hover:-translate-y-2">
                    <div className="flex-1 space-y-6 relative z-10">
                        <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-blue-600 border border-zinc-200">
                            <ChevronRight size={20} strokeWidth={3} />
                        </div>
                        <h3 className="text-3xl font-black text-zinc-900 tracking-tighter">New AirPods 4</h3>
                        <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-[180px]">The next evolution of sound and comfort. Optimized for audio intelligence.</p>
                        <div className="pt-2 flex items-center gap-4">
                            <span className="text-zinc-300 line-through text-px font-bold">LKR 45,000</span>
                            <span className="text-blue-600 font-black text-lg tracking-tighter">LKR 39,990</span>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center transition-transform duration-1000 group-hover:scale-125 group-hover:rotate-6 relative z-10">
                        <img 
                            src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80" 
                            alt="AirPods 4" 
                            className="w-48 h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]" 
                            onError={(e) => { e.target.src = 'https://placehold.co/600x600/FFFFFF/000000?text=AirPods+4'; }}
                        />
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 blur-[100px] rounded-full -mr-20 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Sub-grid of 2 items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Watch Promo */}
                    <div className="bg-zinc-50 rounded-[48px] p-10 group overflow-hidden border border-zinc-100 flex flex-col justify-between h-64 shadow-sm transition-all duration-700 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                        <div className="space-y-4">
                            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Interactive Tech</span>
                            <h4 className="font-black text-zinc-900 text-lg leading-tight tracking-tight">Elegance meets <br/> performance.</h4>
                        </div>
                        <div className="flex items-end justify-between">
                            <Link to="/products?category=Watch" className="text-[9px] font-black uppercase text-blue-600 tracking-widest bg-white px-4 py-2 rounded-full border border-zinc-100 shadow-sm hover:bg-blue-600 hover:text-white transition-all">Details</Link>
                            <img 
                                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&q=80" 
                                className="w-24 transition-transform duration-1000 group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]" 
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&q=80'; }}
                            />
                        </div>
                    </div>
                    {/* Mac Promo */}
                    <div className="bg-white rounded-[48px] p-10 group overflow-hidden border border-zinc-100 flex flex-col justify-between h-64 shadow-sm transition-all duration-700 hover:shadow-2xl hover:-translate-y-2">
                        <div className="space-y-4">
                            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Unmatched Power</span>
                            <h4 className="font-black text-zinc-900 text-lg leading-tight tracking-tight">World's Powerful <br/> Workspaces.</h4>
                        </div>
                        <div className="flex items-end justify-between">
                            <Link to="/products?category=Mac" className="text-[9px] font-black uppercase text-blue-600 tracking-widest bg-zinc-50 px-4 py-2 rounded-full border border-zinc-100 shadow-sm hover:bg-blue-600 hover:text-white transition-all">Procure</Link>
                            <img 
                                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80" 
                                className="w-24 transition-transform duration-1000 group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]" 
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80'; }}
                            />
                        </div>
                    </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default FeatureGrid;
