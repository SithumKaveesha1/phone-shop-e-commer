import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PartyPopper, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { CheckoutStepper } from './Shipping';

const OrderSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Trigger some confetti if we had a library
    }, []);

    return (
        <div className="pt-28 pb-20 min-h-screen bg-white flex flex-col items-center px-4 overflow-hidden relative">
            
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-100/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>

            <div className="w-full max-w-4xl relative z-10">
                <CheckoutStepper currentStep={3} />

                <div className="mt-12 flex flex-col items-center text-center">
                    <div className="relative mb-10 scale-150 md:scale-[2]">
                        {/* Glowing ring animation */}
                        <div className="absolute inset-0 bg-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
                        <div className="w-24 h-24 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl relative animate-in zoom-in duration-700">
                            <PartyPopper size={48} className="animate-bounce" />
                        </div>
                        {/* Floating stars */}
                        <Star size={24} className="absolute -top-4 -right-4 text-yellow-400 fill-yellow-400 animate-pulse" />
                        <Star size={16} className="absolute -bottom-2 -left-6 text-pink-300 fill-pink-300 animate-pulse delay-700" />
                    </div>

                    <div className="space-y-4 max-w-lg mb-12 animate-in slide-in-from-bottom-8 duration-700">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                            Order Placed <span className="text-pink-600">Successfully!</span>
                        </h1>
                        <p className="text-gray-500 text-lg font-medium">
                            Thank you for shopping with EKART. Your high-tech goodies are being prepared for delivery.
                        </p>
                        <div className="bg-pink-50/50 inline-block px-6 py-2 rounded-full border border-pink-100">
                            <span className="text-pink-700 font-bold text-sm uppercase tracking-widest">Order ID: EK-{Math.floor(100000 + Math.random() * 900000)}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md animate-in slide-in-from-bottom-12 duration-1000">
                        <Button 
                            onClick={() => navigate('/profile')}
                            className="flex-1 h-14 bg-pink-600 hover:bg-pink-700 text-white font-black rounded-2xl shadow-xl shadow-pink-100 flex items-center justify-center gap-2 transition-all active:scale-95"
                        >
                            <ShoppingBag size={20} />
                            Track My Order
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => navigate('/products')}
                            className="flex-1 h-14 border-pink-200 text-pink-600 hover:bg-pink-50 font-black rounded-2xl flex items-center justify-center gap-2 transition-all"
                        >
                            Continue Shopping
                            <ArrowRight size={20} />
                        </Button>
                    </div>

                    <p className="mt-12 text-gray-400 text-sm font-medium">
                        A confirmation email has been sent to your registered address.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
