import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureGrid = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Large Feature: iPad Air */}
        <div className="md:col-span-1 bg-zinc-50 rounded-[2.5rem] p-12 flex flex-col min-h-[500px] relative group overflow-hidden">
            <div className="relative z-10 w-full mb-8">
                <h3 className="text-3xl font-black text-black mb-2 tracking-tighter">The new iPad Air.</h3>
                <p className="text-zinc-500 font-medium mb-6">Featuring the powerful Apple M2 chip.</p>
                <Link to="/products?category=iPad" className="bg-black text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 w-fit group-hover:bg-primary transition-all">
                    Order Now <ChevronRight size={14} />
                </Link>
            </div>
            <div className="mt-auto relative z-10 transition-transform duration-700 group-hover:scale-105">
                <img 
                    src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80" 
                    alt="iPad Air" 
                    className="w-full h-auto object-contain mix-blend-multiply"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Column of shorter features */}
        <div className="flex flex-col gap-8">
            {/* AirPods 4 */}
            <div className="bg-zinc-950 rounded-[2.5rem] p-10 flex border border-zinc-900 group relative overflow-hidden flex-1">
                <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-black text-white tracking-tighter">New AirPods 4</h3>
                    <p className="text-zinc-500 text-sm font-medium">The next evolution of sound and comfort.</p>
                    <div className="pt-4">
                        <span className="text-zinc-400 line-through text-xs mr-2">LKR 45,000</span>
                        <span className="text-primary font-black">LKR 39,990</span>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                    <img src="https://images.unsplash.com/photo-1588423770574-91021160dfbb?w=400&q=80" alt="AirPods 4" className="w-40 h-auto object-contain" />
                </div>
            </div>

            {/* Sub-grid of 2 items */}
            <div className="grid grid-cols-2 gap-8">
                {/* Watch Promo */}
                <div className="bg-zinc-50 rounded-[2.5rem] p-8 group overflow-hidden border border-zinc-100 flex flex-col justify-between h-48">
                    <h4 className="font-bold text-zinc-900 text-sm">Grab Your Watch Here.</h4>
                    <div className="flex items-end justify-between">
                         <Link to="/products?category=Watch" className="text-[10px] font-black uppercase text-primary border-b border-primary/20 pb-0.5">Details</Link>
                         <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&q=80" className="w-16 transition-transform group-hover:scale-110" />
                    </div>
                </div>
                {/* Mac Promo */}
                <div className="bg-white rounded-[2.5rem] p-8 group overflow-hidden border border-zinc-100 flex flex-col justify-between h-48 shadow-sm">
                    <h4 className="font-bold text-zinc-900 text-sm">World's Powerful MacBooks.</h4>
                    <div className="flex items-end justify-between">
                         <Link to="/products?category=Mac" className="text-[10px] font-black uppercase text-primary border-b border-primary/20 pb-0.5">View Details</Link>
                         <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80" className="w-16 transition-transform group-hover:scale-110" />
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default FeatureGrid;
