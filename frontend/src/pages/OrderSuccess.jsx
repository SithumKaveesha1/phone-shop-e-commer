import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PartyPopper, ShoppingBag, ArrowRight, Star, CheckCircle2, Zap, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { CheckoutStepper } from './Shipping';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        const method = localStorage.getItem('paymentMethod');
        setPaymentMethod(method || '');
        // Confetti logic could be added here
    }, []);

    const orderId = `INB-${Math.floor(100000 + Math.random() * 900000)}`;
    const isKoko = paymentMethod === 'koko';
    const primaryColor = isKoko ? 'text-emerald-500' : 'text-blue-600';
    const bgColor = isKoko ? 'bg-emerald-500' : 'bg-blue-600';
    const softBg = isKoko ? 'bg-emerald-50' : 'bg-blue-50';

    return (
        <div className="pt-28 pb-20 min-h-screen bg-[#f5f5f7] flex flex-col items-center px-4 overflow-hidden relative">
            <div className="w-full max-w-4xl relative z-10">
                <CheckoutStepper currentStep={3} />

                <div className="mt-16 flex flex-col items-center text-center">
                    <div className="relative mb-16 scale-[1.5] md:scale-[2]">
                        {/* Glowing ring animation */}
                        <div className={`absolute inset-x-0 inset-y-0 ${isKoko ? 'bg-emerald-100' : 'bg-blue-100'} rounded-full blur-[40px] opacity-80 animate-pulse scale-150`}></div>
                        <div className={`w-32 h-32 ${bgColor} rounded-full flex items-center justify-center text-white shadow-lg relative animate-in zoom-in-50 duration-700`}>
                            {isKoko ? <Zap size={64} className="animate-float" strokeWidth={1.5} /> : <CheckCircle2 size={64} className="animate-float" strokeWidth={1.5} />}
                        </div>
                        {/* Floating stars */}
                        <Star size={24} className={`absolute -top-6 -right-6 ${isKoko ? 'text-emerald-400 fill-emerald-100' : 'text-blue-400 fill-blue-100'} animate-pulse`} />
                        <Star size={18} className={`absolute -bottom-4 -left-8 ${isKoko ? 'text-emerald-300 fill-emerald-50' : 'text-blue-300 fill-blue-50'} animate-pulse delay-700`} />
                    </div>

                    <div className="space-y-6 max-w-xl mb-12 animate-in slide-in-from-bottom-12 duration-700">
                        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter leading-[1.1] uppercase">
                            Order <span className={`${primaryColor} italic`}>Confirmed.</span>
                        </h1>
                        <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed">
                            {isKoko 
                                ? "Your Koko installment plan is active. We are preparing your order for shipment."
                                : "Your order has been successfully placed. We are preparing it for shipment and will notify you soon."}
                        </p>
                        
                        <div className="inline-flex bg-white px-10 py-4 rounded-3xl border border-zinc-200 mt-4 shadow-sm relative group overflow-hidden">
                            <span className={`${primaryColor} font-black text-[10px] uppercase tracking-[0.3em] relative z-10`}>
                                Order ID: {orderId}
                            </span>
                        </div>
                    </div>

                    {isKoko && (
                        <div className="w-full max-w-lg bg-white rounded-[40px] p-10 border border-zinc-200 shadow-xl mb-16 animate-in slide-in-from-bottom-16 duration-1000 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-100 transition-colors"></div>
                            
                            <div className="flex items-center gap-5 mb-10 pb-8 border-b border-zinc-100">
                                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                    <Calendar size={28} />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-black text-zinc-900 tracking-tighter">Installment Plan Summary</h3>
                                    <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mt-1">Split into 3 easy payments</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { month: 'Today', amount: 'Rs. 237', status: 'Paid', date: 'April 03' },
                                    { month: 'May', amount: 'Rs. 237', status: 'Upcoming', date: 'May 03' },
                                    { month: 'June', amount: 'Rs. 237', status: 'Upcoming', date: 'June 03' },
                                ].map((item, i) => (
                                    <div key={i} className={`flex items-center justify-between p-6 rounded-3xl border ${item.status === 'Paid' ? 'bg-emerald-50 border-emerald-100' : 'bg-zinc-50 border-zinc-200'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.status === 'Paid' ? 'bg-emerald-500 text-white shadow-md' : 'bg-white text-zinc-400 border border-zinc-200'}`}>
                                                <span className="font-black text-[10px]">{i + 1}</span>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">{item.date}</p>
                                                <p className="text-sm font-black text-zinc-900 tracking-tight">{item.month} Payment</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-zinc-900 tracking-tighter italic">{item.amount}</p>
                                            <p className={`text-[9px] font-black uppercase tracking-widest ${item.status === 'Paid' ? 'text-emerald-600' : 'text-zinc-400'}`}>{item.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 p-6 bg-emerald-500 rounded-3xl text-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 size={20} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Automatic Repayments Active</span>
                                    </div>
                                    <Zap size={18} className="animate-pulse" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-8 w-full max-w-md animate-in slide-in-from-bottom-20 duration-700">
                        <Button 
                            onClick={() => navigate('/profile')}
                            className={`flex-1 h-20 ${bgColor} hover:brightness-110 text-white font-black rounded-[32px] shadow-lg flex flex-col items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98] group/btn`}
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
