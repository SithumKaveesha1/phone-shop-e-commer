import React, { useRef } from 'react';
import { ChevronDown, ChevronRight, Apple, Smartphone, Laptop, Watch, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import camImage from '../../assets/iphone_17_pro_camera_closeup.png';
import logo from '../../assets/logo.jpeg';

const Hero = () => {
  const scrollToContent = () => {
    const nextSection = document.getElementById('categories');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[110vh] w-full bg-black overflow-hidden flex flex-col items-center justify-center pt-32 pb-20">
      
      {/* FULL SCREEN CINEMATIC VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            poster={camImage}
            className="w-full h-full object-cover opacity-80"
          >
            {/* Using high-quality immersive hardware loop */}
            <source src="https://www.apple.com/105/media/ww/iphone-16-pro/2024/0167d0e4-279c-4393-b4d6-e04f05804579/anim/hero/large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Professional Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Main Luxury Content - Floating over Video */}
      <div className="relative z-20 text-center flex flex-col items-center max-w-7xl px-8 w-full">
        
        {/* Branding Node - Ringed Logo */}
        <div className="animate-reveal-up mb-12" style={{ animationDelay: '0s' }}>
            <div className="relative inline-block hover:scale-110 transition-transform duration-1000">
                <img 
                    src={logo} 
                    alt="INBOX APPLE STORE" 
                    className="h-32 w-32 object-contain rounded-full border-[8px] border-blue-600 p-1.5 bg-white shadow-[0_20px_60px_rgba(0,0,100,0.4)]"
                />
            </div>
        </div>

        {/* Status Badge */}
        <div className="animate-reveal-up mb-12" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-2xl border border-white/20 px-8 py-3 rounded-full shadow-2xl hover:bg-white/20 transition-all group cursor-default">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.5em] group-hover:text-blue-400 transition-colors">Quantum Ecosystem Launch State</span>
            </div>
        </div>

        {/* Big Bold Typography - Interactive White on Video */}
        <div className="animate-reveal-up space-y-4" style={{ animationDelay: '0.4s' }}>
            <h1 className="text-[100px] md:text-[200px] lg:text-[260px] font-black leading-none tracking-tighter text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                HELLO<span className="text-blue-600 italic">.</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12">
                {[
                    { icon: <Smartphone size={28} />, label: 'iPhone 17', path: '/products?category=iPhone' },
                    { icon: <Laptop size={28} />, label: 'Mac Pro', path: '/products?category=Mac' },
                    { icon: <Watch size={28} />, label: 'Watch Ultra', path: '/products?category=Watch' },
                    { icon: <Headphones size={28} />, label: 'Studio', path: '/products?category=AirPods' }
                ].map((item, i) => (
                    <Link key={i} to={item.path} className="flex flex-col items-center gap-4 text-white/40 hover:text-white transition-all duration-700 group">
                        <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 group-hover:border-blue-500/30 group-hover:bg-blue-600 group-hover:shadow-2xl transition-all">
                             {item.icon}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-50 group-hover:opacity-100">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>

        {/* Subtext Paragraph */}
        <div className="animate-reveal-up mt-24 max-w-3xl" style={{ animationDelay: '0.6s' }}>
            <p className="text-white/60 text-xl md:text-2xl font-medium tracking-wide leading-relaxed drop-shadow-lg">
                Aerospace-grade Titanium. Liquid Logic Architecture. <br/>
                <span className="text-white font-black italic mt-8 block text-4xl md:text-6xl tracking-tighter">
                   The <span className="text-blue-600">future</span> of interaction is here.
                </span>
            </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 mt-20 animate-reveal-up" style={{ animationDelay: '0.8s' }}>
            <Link 
                to="/products"
                className="group px-16 py-7 bg-white text-zinc-900 font-black text-xs uppercase tracking-[0.5em] rounded-[40px] hover:bg-blue-600 hover:text-white transition-all shadow-2xl shadow-blue-500/20 active:scale-95 flex items-center gap-4"
            >
                Procure Hardware <ChevronRight size={20} strokeWidth={4} className="group-hover:translate-x-3 transition-transform" />
            </Link>
            <button 
                onClick={scrollToContent}
                className="px-16 py-7 bg-white/5 backdrop-blur-2xl border border-white/10 text-white font-black text-xs uppercase tracking-[0.5em] rounded-[40px] hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
            >
                Browse Specs
            </button>
        </div>
      </div>

      {/* Interactive Bottom Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-reveal-up w-full z-30" style={{ animationDelay: '1.5s' }}>
            <div className="w-8 h-14 border-2 border-white/20 rounded-full flex justify-center p-2 shadow-2xl backdrop-blur-xl">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
            </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(80px); filter: blur(30px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-reveal-up {
          animation: reveal-up 2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}} />
    </section>
  );
};

export default Hero;