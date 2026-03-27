import React from 'react';
import { Link } from 'react-router-dom';

const DeviceShowcase = ({ title, subtitle, desc, image, features, reverse, category }) => {
  return (
    <section className={`py-20 lg:py-32 ${reverse ? 'bg-zinc-50' : 'bg-white'} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
          
          {/* Main Image */}
          <div className="flex-1 w-full flex justify-center items-center drop-shadow-2xl transition-transform duration-1000 hover:scale-105">
            <img 
              src={image} 
              alt={title} 
              className="w-full max-w-2xl h-auto object-contain mix-blend-multiply" 
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 mb-4 tracking-tighter">{title}</h2>
              <p className="text-lg md:text-xl font-medium text-zinc-500 max-w-md mx-auto lg:mx-0">{desc}</p>
              <div className="pt-8">
                <Link 
                    to={`/products?category=${category}`}
                    className="bg-black text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl inline-block"
                >
                    Shop Now
                </Link>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-12 border-t border-zinc-100">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start p-6 rounded-3xl bg-white border border-zinc-100 shadow-sm transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
                  <div className="text-primary mb-3">
                    {f.icon}
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">{f.label}</h4>
                  <p className="text-xs font-bold text-zinc-900 leading-tight">{f.value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DeviceShowcase;
