import React from 'react';
import { Link } from 'react-router-dom';

const DeviceShowcase = ({ title, subtitle, desc, image, features, reverse, category }) => {
  // Determine glow color based on category
  const getGlowColor = () => {
    switch(category) {
      case 'Watch': return 'bg-amber-500/20';
      case 'iPad': return 'bg-blue-500/20';
      case 'Mac': return 'bg-purple-600/20';
      default: return 'bg-blue-600/10';
    }
  };

  const glowColor = getGlowColor();

  return (
    <section className="py-24 lg:py-40 bg-black relative overflow-hidden">
      {/* Background Mesh Glow */}
      <div className={`mesh-glow ${glowColor} w-[600px] h-[600px] top-1/2 ${reverse ? 'right-0 -translate-x-1/2' : 'left-0 translate-x-1/2'} -translate-y-1/2 blur-[150px] opacity-20`} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-32`}>
          
          {/* Main Image */}
          <div className="flex-1 w-full flex justify-center items-center relative transition-transform duration-1000 hover:scale-105">
            <div className={`absolute inset-0 ${glowColor} blur-[120px] rounded-full opacity-30 animate-pulse`} />
            <img 
              src={image} 
              alt={title} 
              className="w-full max-w-2xl h-auto object-contain relative z-10 drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]" 
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-10 text-center lg:text-left">
            <div className="space-y-6">
              <h2 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter ${reverse ? 'text-gradient-purple' : 'text-gradient-blue'}`}>
                {title}
              </h2>
              <p className="text-xl md:text-2xl font-medium text-zinc-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {desc}
              </p>
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link 
                    to={`/products?category=${category}`}
                    className="group relative w-full sm:w-auto h-16 px-12 glass-card rounded-full font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 transition-all active:scale-95 hover:bg-white/10"
                >
                    <span className="text-white relative z-10">Explore Now</span>
                    <div className={`absolute inset-0 ${glowColor} blur-2xl opacity-0 group-hover:opacity-40 transition-opacity`} />
                </Link>
                <Link to="/products" className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.4em] hover:text-white transition-colors py-4 px-8">
                  View Full Catalog
                </Link>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-16 border-t border-white/5">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start p-8 rounded-[32px] glass-card border border-white/5 transition-all hover:scale-105 hover:bg-white/10 group">
                  <div className="text-blue-500 mb-5 group-hover:animate-bounce">
                    {f.icon}
                  </div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">{f.label}</h4>
                  <p className="text-xs font-black text-white leading-tight uppercase tracking-tight">{f.value}</p>
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
