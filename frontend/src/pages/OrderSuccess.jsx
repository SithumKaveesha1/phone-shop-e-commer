import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PartyPopper, ShoppingBag, ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { CheckoutStepper } from './Shipping';

const OrderSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Confetti logic could be added here
    }, []);

    const orderId = `INB-${Math.floor(100000 + Math.random() * 900000)}`;

    return (
        <div className="pt-28 pb-20 min-h-screen bg-black flex flex-col items-center px-4 overflow-hidden relative">
            
            {/* Background Glows */}
            <div className="mesh-glow bg-blue-600/10 w-[800px] h-[800px] -top-40 -left-60 opacity-30 blur-[180px] animate-pulse" />
            <div className="mesh-glow bg-purple-600/10 w-[600px] h-[600px] bottom-0 right-0 opacity-20 blur-[150px]" />

            <div className="w-full max-w-4xl relative z-10">
                <CheckoutStepper currentStep={3} />

                <div className="mt-16 flex flex-col items-center text-center">
                    <div className="relative mb-16 scale-[1.5] md:scale-[2]">
                        {/* Glowing ring animation */}
                        <div className="absolute inset-x-0 inset-y-0 bg-blue-500 rounded-full blur-[40px] opacity-30 animate-pulse scale-150"></div>
                        <div className="w-32 h-32 bg-gradient-to-tr from-blue-700 via-blue-500 to-indigo-400 rounded-full flex items-center justify-center text-white shadow-[0_0_50px_rgba(59,130,246,0.3)] relative animate-in zoom-in-50 duration-1000">
                            <CheckCircle2 size={64} className="animate-float" strokeWidth={1.5} />
                        </div>
                        {/* Floating stars */}
                        <Star size={24} className="absolute -top-6 -right-6 text-blue-400 fill-blue-400 animate-pulse" />
                        <Star size={18} className="absolute -bottom-4 -left-8 text-indigo-300 fill-indigo-300 animate-pulse delay-700" />
                    </div>

                    <div className="space-y-6 max-w-xl mb-16 animate-in slide-in-from-bottom-12 duration-1000">
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase">
                            Hardware <span className="text-gradient-blue italic">Allocated.</span>
                        </h1>
                        <p className="text-zinc-500 text-sm font-black uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed">
                            Order successfully synchronized with the global distribution grid. High-performance units are being prepared for deployment.
                        </p>
                        
                        <div className="inline-flex glass-card px-10 py-4 rounded-3xl border border-white/5 mt-4 shadow-2xl relative group overflow-hidden">
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] relative z-10">
                                System Reference: {orderId}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 w-full max-w-md animate-in slide-in-from-bottom-20 duration-1000">
                        <Button 
                            onClick={() => navigate('/profile')}
                            className="flex-1 h-20 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-black rounded-[32px] shadow-2xl shadow-blue-500/20 flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 group/btn"
                        >
                            <span className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Grid Tracking</span>
                            <div className="flex items-center gap-2">
                                <span className="uppercase tracking-widest text-xs">Observe Units</span>
                                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </div>
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => navigate('/products')}
                            className="flex-1 h-20 border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 font-black rounded-[32px] flex flex-col items-center justify-center transition-all hover:border-white/20 active:scale-95"
                        >
                            <span className="text-[10px] uppercase tracking-widest opacity-70 mb-1">System Market</span>
                            <span className="uppercase tracking-widest text-xs">New Procurements</span>
                        </Button>
                    </div>

                    <p className="mt-16 text-zinc-700 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
                        Digital verification protocol transmitted via encrypted link.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
