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
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-black text-black mb-12">
            The latest. <span className="text-zinc-400">Take a look at what's new, right now.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id} className="group transition-all duration-700 hover:-translate-y-2">
              <div className="bg-zinc-50 rounded-[2.5rem] p-10 h-[500px] flex flex-col items-center relative overflow-hidden transition-all group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)]">
                {/* Badge */}
                {p.badge && (
                    <span className="absolute top-8 left-8 bg-black text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{p.badge}</span>
                )}

                {/* Main Product Image */}
                <div className="relative z-10 w-full h-64 flex items-center justify-center mb-10 transition-transform duration-700 group-hover:scale-110">
                    <img src={p.image} alt={p.name} className="max-h-full object-contain mix-blend-multiply" />
                </div>

                {/* Color Dots */}
                <div className="flex gap-2 mb-6">
                    {p.colors.map((c, i) => (
                        <div key={i} className="w-3 h-3 rounded-full border border-black/5" style={{ backgroundColor: c }} />
                    ))}
                </div>

                {/* Product Info */}
                <div className="text-center">
                    <h3 className="font-bold text-zinc-900 text-lg mb-2">{p.name}</h3>
                    <p className="text-primary font-black text-base mb-1">{p.price}</p>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">or</span>
                        <span className="text-[10px] font-black text-zinc-900">{p.koko} with <span className="text-primary">KOKO</span></span>
                    </div>
                </div>

                {/* Hover Action */}
                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <Link to={`/products`} className="w-full bg-black text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                        View Details <ChevronRight size={14} />
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
