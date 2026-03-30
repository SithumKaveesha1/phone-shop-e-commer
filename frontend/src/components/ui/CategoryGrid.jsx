import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { 
    name: 'iPhone', 
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-1-202409?wid=600&hei=600&fmt=p-jpg&qlt=95&.v=1723146433543', 
    path: '/products?category=iPhone' 
  },
  { 
    name: 'AirPods', 
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=600&hei=600&fmt=jpeg&qlt=95&.v=1694014871985', 
    path: '/products?category=AirPods' 
  },
  { 
    name: 'iPad', 
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-model-select-gallery-1-202405?wid=600&hei=600&fmt=p-jpg&qlt=95&.v=1713302525141', 
    path: '/products?category=iPad' 
  },
  { 
    name: 'Watch', 
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=500', 
    path: '/products?category=Watch' 
  },
  { 
    name: 'Mac', 
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-card-40-macbookpro-14-16-202310?wid=600&hei=600&fmt=p-jpg&qlt=95&.v=1697230410752', 
    path: '/products?category=Mac' 
  },
  { 
    name: 'Accessories', 
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWNF3?wid=600&hei=600&fmt=jpeg&qlt=95&.v=1723226955000', 
    path: '/products?category=Accessories' 
  },
  { 
    name: 'More', 
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-single-select-202104?wid=600&hei=600&fmt=jpeg&qlt=95&.v=1617761671000', 
    path: '/products' 
  },
];

const CategoryGrid = () => {
  return (
    <section id="categories" className="py-40 bg-white relative overflow-hidden">
      
      {/* HIGH-END MESH GLOW BACKGROUNDS */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/5 blur-[200px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-600/5 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-10 relative z-10 text-center lg:text-left">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-32 text-zinc-900 tracking-tighter leading-tight italic">
            Procure by <span className="text-blue-500">category.</span>
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-12 md:gap-20">
          {categories.map((cat, idx) => (
            <Link 
              key={cat.name} 
              to={cat.path}
              className="flex flex-col items-center group relative animate-reveal-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center mb-10 transition-all duration-1000 group-hover:scale-115">
                
                {/* Iridescent Glass Orb Backdrop - Pristine White Optimization */}
                <div className="absolute inset-0 bg-zinc-50 rounded-[48px] border border-zinc-100 shadow-sm group-hover:bg-white group-hover:border-blue-500/10 group-hover:shadow-[0_30px_70px_rgba(37,99,235,0.12)] transition-all duration-700" />
                <div className="absolute inset-2 bg-gradient-to-tr from-blue-600/5 via-transparent to-purple-600/5 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Image integration with blend mode where possible */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="max-h-full max-w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:drop-shadow-[0_40px_60px_rgba(0,0,0,0.15)] transition-all duration-1000 group-hover:-translate-y-4 group-hover:rotate-6" 
                    />
                </div>
              </div>

              {/* High-Contrast Bold Label - Pristine White Protocol */}
              <div className="space-y-2 text-center group-hover:-translate-y-2 transition-transform duration-700">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 group-hover:text-blue-600 transition-all duration-500">
                    {cat.name}
                  </span>
                  <div className="w-0 h-[2px] bg-blue-600 mx-auto group-hover:w-8 transition-all duration-700 rounded-full" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(40px); filter: blur(20px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-reveal-up {
          animation: reveal-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}} />
    </section>
  );
};

export default CategoryGrid;
