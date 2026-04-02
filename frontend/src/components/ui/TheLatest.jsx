import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'iPhone 16 Pro Max',
    price: 'LKR 374,990 - LKR 434,990',
    koko: '3 X LKR 124,996.67',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80',
    colors: ['#D2B48C', '#808080', '#F5F5F5', '#1A1A1A'],
    badge: 'NEW',
  },
  {
    id: 2,
    name: 'iPhone 16',
    price: 'LKR 239,990 - LKR 269,990',
    koko: '3 X LKR 79,996.67',
    image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?w=600&q=80',
    colors: ['#4682B4', '#EE82EE', '#90EE90', '#FFFFFF', '#000000'],
  },
  {
    id: 3,
    name: 'iPhone 15',
    price: 'LKR 202,990 - LKR 237,990',
    koko: '3 X LKR 67,663.33',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80',
    colors: ['#1A1A1A', '#87CEEB', '#90EE90', '#FFB6C1', '#F5F5F5'],
  }
];

const TheLatest = () => {
  return (
    <section className="py-32 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-16 tracking-tighter">
            The latest. Take a look at <span className="text-gradient-purple">what's new</span>, right now.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((p, idx) => (
            <div key={p.id} className="group transition-all duration-700 hover:-translate-y-4" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="bg-[#f5f5f7] rounded-[48px] p-10 h-[560px] flex flex-col items-center relative overflow-hidden transition-all group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-transparent group-hover:border-zinc-200">
                
                {/* Badge */}
                {p.badge && (
                    <span className="absolute top-8 left-8 bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] z-20 shadow-lg shadow-blue-500/20">{p.badge}</span>
                )}

                {/* Main Product Image */}
                <div className="relative z-10 w-full h-72 flex items-center justify-center mb-10 transition-transform duration-700 group-hover:scale-110">
                    <img 
                        src={p.image} 
                        alt={p.name} 
                        className="max-h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.08)]" 
                        onError={(e) => { 
                            const name = p.name.toLowerCase();
                            if (name.includes('iphone')) e.target.src = 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80';
                            else if (name.includes('mac')) e.target.src = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80';
                            else if (name.includes('watch')) e.target.src = 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80';
                            else e.target.src = 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=600&q=80';
                        }}
                    />
                </div>

                {/* Color Dots */}
                <div className="flex gap-2.5 mb-8 relative z-10 p-2 bg-white rounded-full border border-zinc-100 shadow-sm">
                    {p.colors.map((c, i) => (
                        <div key={i} className="w-3.5 h-3.5 rounded-full border border-zinc-100 shadow-inner" style={{ backgroundColor: c }} />
                    ))}
                </div>

                {/* Product Info */}
                <div className="text-center relative z-10 transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-10">
                    <h3 className="font-black text-zinc-900 text-xl mb-3 tracking-tight">{p.name}</h3>
                    <p className="text-blue-600 font-black text-base mb-2 tracking-tight">{p.price}</p>
                    <div className="flex items-center justify-center gap-2 bg-zinc-200/50 px-4 py-1.5 rounded-full">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">or</span>
                        <span className="text-[10px] font-black text-zinc-600 tracking-tight">{p.koko} with <span className="text-blue-600">KOKO</span></span>
                    </div>
                </div>

                {/* Hover Action - Re-engineered for "Beautiful Pop-up" */}
                <div className="absolute inset-x-0 bottom-0 p-8 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-[-40px] transition-all duration-500 ease-out z-20">
                    <Link to={`/products`} className="w-full bg-black/95 backdrop-blur-xl text-white py-6 rounded-3xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all active:scale-95 hover:scale-[1.02] border border-white/10">
                        View Details <ChevronRight size={18} strokeWidth={3} className="text-blue-400" />
                    </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheLatest;
