import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, ArrowRight, ChevronLeft, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { CheckoutStepper } from './Shipping';

const Payment = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState(localStorage.getItem('paymentMethod') || 'card');

    const handleContinue = () => {
        localStorage.setItem('paymentMethod', paymentMethod);
        navigate('/checkout/review');
    };

    const methods = [
        {
            id: 'card',
            title: 'Digital Workspace Payment',
            description: 'Encrypted via Secure Core. Supports Visa, Mastercard, Amex.',
            icon: <CreditCard className="w-7 h-7" />,
            color: 'text-blue-500',
        },
        {
            id: 'cod',
            title: 'Physical Exchange (COD)',
            description: 'Finalize payment upon hardware delivery.',
            icon: <Banknote className="w-7 h-7" />,
            color: 'text-emerald-500',
        }
    ];

    return (
        <div className="pt-28 pb-20 min-h-screen bg-black flex flex-col items-center relative overflow-hidden">
            {/* Background Glows */}
            <div className="mesh-glow bg-blue-600/10 w-[800px] h-[800px] -top-40 -left-60 opacity-30 blur-[180px] animate-pulse" />
            <div className="mesh-glow bg-purple-600/10 w-[600px] h-[600px] bottom-0 right-0 opacity-20 blur-[150px]" />

            <div className="w-full max-w-4xl px-4 relative z-10">
                <CheckoutStepper currentStep={1} />

                <div className="glass-card rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
                    <div className="p-8 md:p-14">
                        <div className="flex items-center gap-5 mb-12">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                <CreditCard size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Transaction Protocol</h2>
                                <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mt-1">Select your transfer method</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {methods.map((method) => (
                                <div 
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id)}
                                    className={`group cursor-pointer p-8 rounded-[32px] border-2 transition-all flex items-center gap-8 relative overflow-hidden ${
                                        paymentMethod === method.id 
                                        ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_40px_rgba(59,130,246,0.1)]' 
                                        : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'
                                    }`}
                                >
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                        paymentMethod === method.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-zinc-900 ' + method.color
                                    }`}>
                                        {method.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className={`font-black text-xl uppercase tracking-tighter ${
                                            paymentMethod === method.id ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                                        }`}>
                                            {method.title}
                                        </h3>
                                        <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mt-1 opacity-60">{method.description}</p>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                                        paymentMethod === method.id 
                                        ? 'border-blue-500 bg-blue-500' 
                                        : 'border-zinc-800'
                                    }`}>
                                        {paymentMethod === method.id && <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 glass-card rounded-[32px] border border-blue-500/10 flex items-center gap-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/10">
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <p className="font-black text-white text-sm uppercase tracking-widest">Quantum Encryption Active</p>
                                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Your data resides in secure buffers. No persistence on local nodes.</p>
                            </div>
                        </div>

                        <div className="mt-12 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <Button 
                                variant="ghost" 
                                onClick={() => navigate('/checkout/shipping')}
                                className="text-zinc-500 font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
                            >
                                <ChevronLeft size={20} />
                                Adjust Logistics
                            </Button>
                            <Button 
                                onClick={handleContinue}
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-black h-16 px-14 rounded-2xl shadow-2xl shadow-blue-500/20 flex items-center gap-3 transition-all active:scale-95 uppercase tracking-widest text-xs"
                            >
                                Finalize Protocol
                                <ArrowRight size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
