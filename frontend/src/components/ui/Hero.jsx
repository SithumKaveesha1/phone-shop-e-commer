import React, { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import camImage from '../../assets/iphone_17_pro_camera_closeup.png';

const Hero = () => {
  const scrollToContent = () => {
    const nextSection = document.getElementById('categories');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center pt-20">
      
      {/* Background Animated Image */}
      <div className="absolute inset-0 z-0 scale-110">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 opacity-80" />
        <img
          src={camImage}
          alt="iPhone 17 Pro"
          className="w-full h-full object-cover animate-hero-zoom opacity-60"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center flex flex-col items-center max-w-5xl px-6 w-full">
        <div className="animate-reveal-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-2xl md:text-3xl font-bold text-zinc-400 tracking-tighter mb-2 block uppercase">
                iPhone 17
            </span>
            <h1 className="text-[120px] md:text-[200px] lg:text-[260px] font-black text-white leading-[0.7] tracking-tighter mb-12 drop-shadow-[0_0_80px_rgba(255,255,255,0.15)]">
                PRO<span className="text-primary italic">.</span>
            </h1>
        </div>

        <div className="animate-reveal-up mt-8" style={{ animationDelay: '0.6s' }}>
            <p className="text-zinc-400 text-lg md:text-xl font-medium tracking-wide max-w-lg mx-auto leading-relaxed">
                Titanium design. Action button. A18 Pro chip. <br/>
                <span className="text-white font-black italic mt-3 block text-2xl">Explore the most powerful iPhone ever.</span>
            </p>
        </div>

        {/* Explore Latest Lineup Text & See More Button */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-reveal-up w-full" style={{ animationDelay: '1s' }}>
            <span className="text-[10px] uppercase font-black tracking-[0.5em] text-zinc-500 mb-8 animate-pulse">
                Explore Latest Lineup
            </span>
            <button
                onClick={scrollToContent}
                className="group flex flex-col items-center gap-3 transition-all active:scale-95"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full animate-pulse opacity-50" />
                    <div className="relative w-40 h-16 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center gap-4 group-hover:bg-white/10 transition-all shadow-2xl">
                        <span className="text-white font-black text-xs uppercase tracking-[0.2em] pl-1">See More</span>
                        <div className="bg-primary/20 p-2 rounded-full border border-primary/30">
                            <ChevronDown size={16} className="text-primary animate-bounce" strokeWidth={3} />
                        </div>
                    </div>
                </div>
            </button>
        </div>
      </div>

      {/* Decorative Light Elements */}
      <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hero-zoom {
          0% { transform: scale(1.1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(1deg); }
          100% { transform: scale(1.1) rotate(0deg); }
        }
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(50px); filter: blur(20px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-hero-zoom {
          animation: hero-zoom 25s ease-in-out infinite;
        }
        .animate-reveal-up {
          animation: reveal-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}} />
    </section>
  );
};

export default Hero;