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
        <div className="pt-28 pb-20 min-h-screen bg-[#f5f5f7] flex flex-col items-center px-4 overflow-hidden relative">
            <div className="w-full max-w-4xl relative z-10">
                <CheckoutStepper currentStep={3} />

                <div className="mt-16 flex flex-col items-center text-center">
                    <div className="relative mb-16 scale-[1.5] md:scale-[2]">
                        {/* Glowing ring animation */}
                        <div className="absolute inset-x-0 inset-y-0 bg-blue-100 rounded-full blur-[40px] opacity-80 animate-pulse scale-150"></div>
                        <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg relative animate-in zoom-in-50 duration-700">
                            <CheckCircle2 size={64} className="animate-float" strokeWidth={1.5} />
                        </div>
                        {/* Floating stars */}
                        <Star size={24} className="absolute -top-6 -right-6 text-blue-400 fill-blue-100 animate-pulse" />
                        <Star size={18} className="absolute -bottom-4 -left-8 text-blue-300 fill-blue-50 animate-pulse delay-700" />
                    </div>

                    <div className="space-y-6 max-w-xl mb-16 animate-in slide-in-from-bottom-12 duration-700">
                        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter leading-[1.1] uppercase">
                            Order <span className="text-blue-600 italic">Confirmed.</span>
                        </h1>
                        <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed">
                            Your order has been successfully placed. We are preparing it for shipment and will notify you soon.
                        </p>
                        
                        <div className="inline-flex bg-white px-10 py-4 rounded-3xl border border-zinc-200 mt-4 shadow-sm relative group overflow-hidden">
                            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] relative z-10">
                                Order ID: {orderId}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 w-full max-w-md animate-in slide-in-from-bottom-20 duration-700">
                        <Button 
                            onClick={() => navigate('/profile')}
                            className="flex-1 h-20 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[32px] shadow-lg flex flex-col items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98] group/btn"
                        >
                            <span className="text-[10px] uppercase tracking-widest opacity-80 mb-1">View Details</span>
                            <div className="flex items-center gap-2">
                                <span className="uppercase tracking-widest text-xs font-black">Track Order</span>
                                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </div>
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => navigate('/products')}
                            className="flex-1 h-20 bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-50 font-black rounded-[32px] flex flex-col items-center justify-center transition-all active:scale-[0.98]"
                        >
                            <span className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Back to Store</span>
                            <span className="uppercase tracking-widest text-xs font-black">Continue Shopping</span>
                        </Button>
                    </div>

                    <p className="mt-16 text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
                        A confirmation receipt has been sent via email.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
