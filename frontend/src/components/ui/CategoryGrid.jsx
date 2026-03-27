import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'iPhone', icon: 'https://www.apple.com/v/home/br/images/logos/thp-categories/iphone_light__be9vpk08f6ue_large.png', path: '/products?category=iPhone' },
  { name: 'AirPods', icon: 'https://www.apple.com/v/home/br/images/logos/thp-categories/airpods_light__f9pe8v8n4362_large.png', path: '/products?category=AirPods' },
  { name: 'iPad', icon: 'https://www.apple.com/v/home/br/images/logos/thp-categories/ipad_light__dp990z7l8m6u_large.png', path: '/products?category=iPad' },
  { name: 'Watch', icon: 'https://www.apple.com/v/home/br/images/logos/thp-categories/watch_light__f0b694f454eq_large.png', path: '/products?category=Watch' },
  { name: 'Mac', icon: 'https://www.apple.com/v/home/br/images/logos/thp-categories/mac_light__f6u56598586a_large.png', path: '/products?category=Mac' },
  { name: 'Accessories', icon: 'https://www.apple.com/v/home/br/images/logos/thp-categories/accessories_light__fa6r9fyrp9ue_large.png', path: '/products?category=Accessories' },
  { name: 'More', icon: 'https://www.apple.com/v/home/br/images/logos/thp-categories/more_light__dyf18f78q9ue_large.png', path: '/products' },
];

const CategoryGrid = () => {
  return (
    <section id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-black text-black mb-12 text-center md:text-left">Popular Categories</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 md:gap-4">
          {categories.map((cat, idx) => (
            <Link 
              key={cat.name} 
              to={cat.path}
              className="flex flex-col items-center group transition-all"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                <img 
                  src={cat.icon} 
                  alt={cat.name} 
                  className="w-full h-auto object-contain brightness-0 group-hover:brightness-100 transition-all opacity-80 group-hover:opacity-100" 
                />
              </div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-black transition-colors">
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
