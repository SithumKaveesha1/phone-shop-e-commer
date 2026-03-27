import { Smartphone, Laptop, Tablet, Watch, Headphones, Layers, LayoutGrid, Home } from 'lucide-react';

const categories = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'iPhone', icon: Smartphone, path: '/products?category=iPhone' },
  { name: 'AirPods', icon: Headphones, path: '/products?category=AirPods' },
  { name: 'iPad', icon: Tablet, path: '/products?category=iPad' },
  { name: 'Watch', icon: Watch, path: '/products?category=Watch' },
  { name: 'Mac', icon: Laptop, path: '/products?category=Mac' },
  { name: 'Accessories', icon: Layers, path: '/products?category=Accessories' },
  { name: 'More', icon: LayoutGrid, path: '/products' },
];

import React from 'react';
import { Link } from 'react-router-dom';

const CategoryGrid = () => {
  return (
    <section id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-black text-black mb-12 text-center md:text-left">Popular Categories</h2>
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-8 md:gap-4">
          {categories.map((cat, idx) => (
            <Link 
              key={cat.name} 
              to={cat.path}
              className="flex flex-col items-center group transition-all"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 bg-zinc-50 rounded-2xl group-hover:bg-zinc-100 border border-zinc-100 group-hover:border-zinc-200">
                <cat.icon 
                  size={32}
                  className="text-zinc-400 group-hover:text-black transition-all" 
                />
              </div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-black transition-colors text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
