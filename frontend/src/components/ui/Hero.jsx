import React from 'react'
import { Button } from './button'
import { ShoppingBag, ArrowRight, Star } from 'lucide-react'

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-black">
            {/* Immersive Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[10%] left-[5%] w-[30%] h-[40%] bg-primary/10 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[5%] w-[40%] h-[50%] bg-zinc-800/20 rounded-full blur-[120px]"></div>
            </div>

            <div className='max-w-7xl mx-auto px-6 relative z-10'>
                <div className='grid lg:grid-cols-2 gap-16 lg:gap-24 items-center'>
                    
                    {/* Text Content */}
                    <div className="space-y-10 animate-in fade-in slide-in-from-left-12 duration-1000">
                        <div className="inline-flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-zinc-800">
                            <Star size={14} className="text-primary fill-primary" />
                            <span className="text-[10px] font-black text-zinc-300 tracking-[0.2em] uppercase">Authorized Reseller 2026</span>
                        </div>

                        <div className="space-y-4">
                            <h1 className='text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter'>
                                THE NEW <br />
                                <span className="text-primary">IPHONE 16</span> <br />
                                PRO.
                            </h1>
                            <p className='text-lg md:text-xl text-zinc-400 leading-relaxed max-w-md font-medium'>
                                Titanium design. Action button. A18 Pro chip. Explore the most powerful iPhone ever.
                            </p>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-4'>
                            <Button className='h-14 px-10 bg-white text-black hover:bg-zinc-200 rounded-2xl text-sm font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3'>
                                Buy Now
                                <ShoppingBag size={18} />
                            </Button>
                            <Button variant='outline' className='h-14 px-10 border-zinc-800 bg-zinc-950/50 text-white hover:bg-zinc-900 rounded-2xl text-sm font-black uppercase tracking-widest transition-all flex items-center gap-3 border-2'>
                                Learn More
                                <ArrowRight size={18} />
                            </Button>
                        </div>

                        {/* Stats / Proof */}
                        <div className="pt-8 flex items-center gap-12 border-t border-zinc-900">
                            <div className="group">
                                <p className="text-3xl font-black text-white group-hover:text-primary transition-colors">100%</p>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Authentic</p>
                            </div>
                            <div className="group">
                                <p className="text-3xl font-black text-white group-hover:text-primary transition-colors">24/7</p>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Support</p>
                            </div>
                            <div className="group">
                                <p className="text-3xl font-black text-white group-hover:text-primary transition-colors">LKR</p>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Best Price</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Image Section */}
                    <div className='relative flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-300'>
                        {/* Dramatic Glow */}
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] scale-90 animate-pulse"></div>
                        
                        <div className="relative group">
                            <img
                                src="/premium-hero.png" 
                                alt="iPhone 16 Pro"
                                className='max-w-full h-auto drop-shadow-[0_0_50px_rgba(249,115,22,0.1)] select-none motion-safe:animate-[float_8s_ease-in-out_infinite] scale-110 lg:scale-125 transition-transform duration-1000 group-hover:rotate-1'
                            />
                            
                            {/* Floating Badge */}
                            <div className="absolute -bottom-8 -left-12 bg-black/80 backdrop-blur-2xl p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-800 hidden md:flex items-center gap-4 animate-bounce duration-[4000ms]">
                                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                                    <Star size={24} fill="currentColor" />
                                </div>
                                <div className="pr-4">
                                    <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Starting from</p>
                                    <p className="text-xl font-black text-white">Rs. 345,000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-40px) rotate(2deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                .motion-safe\\:animate-\\[float_8s_ease-in-out_infinite\\] {
                    animation: float 8s ease-in-out infinite;
                }
            `}</style>
        </section>
    )
}

export default Hero