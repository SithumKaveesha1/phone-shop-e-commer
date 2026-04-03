import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, ArrowRight, ChevronLeft, ShieldCheck, Zap, Smartphone, Download, Apple, Play, Loader2, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { CheckoutStepper } from './Shipping';

const KokoSimulation = ({ onCancel, onConfirm, onNoApp }) => {
    const [step, setStep] = useState('loading'); // 'loading', 'prompt', 'fallback'

    useEffect(() => {
        if (step === 'loading') {
            const timer = setTimeout(() => setStep('prompt'), 1500);
            return () => clearTimeout(timer);
        }
    }, [step]);

    if (step === 'loading') {
        return (
            <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
                <div className="relative">
                    <div className="w-24 h-24 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Zap size={32} className="text-emerald-500 animate-pulse" />
                    </div>
                </div>
                <h2 className="mt-10 text-2xl font-black text-zinc-900 tracking-tighter uppercase italic">Redirecting to Koko...</h2>
                <p className="mt-2 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Connecting to Secure Payment Gateway</p>
            </div>
        );
    }

    if (step === 'prompt') {
        return (
            <div className="fixed inset-0 z-[100] bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-white w-full max-w-sm rounded-[40px] shadow-2xl border border-zinc-200 overflow-hidden">
                    <div className="p-10 text-center">
                        <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto mb-8 border border-emerald-100 shadow-sm">
                            <Smartphone size={36} />
                        </div>
                        <h3 className="text-2xl font-black text-zinc-900 tracking-tighter mb-2">Open Koko App?</h3>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed">We're trying to open the Koko mobile app to complete your secure payment.</p>
                        
                        <div className="mt-10 space-y-4">
                            <Button 
                                onClick={onConfirm}
                                className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3 transition-all active:scale-95 uppercase tracking-widest text-xs"
                            >
                                Open Koko App
                                <ArrowRight size={18} />
                            </Button>
                            <Button 
                                variant="ghost"
                                onClick={() => setStep('fallback')}
                                className="w-full h-14 text-zinc-400 font-black rounded-2xl hover:text-zinc-900 hover:bg-zinc-50 transition-all uppercase tracking-widest text-[10px]"
                            >
                                I don't have the app
                            </Button>
                        </div>
                    </div>
                    <button 
                        onClick={onCancel}
                        className="absolute top-8 right-8 w-10 h-10 bg-white rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors shadow-lg border border-zinc-100"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        );
    }

    if (step === 'fallback') {
        return (
            <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 animate-in slide-in-from-bottom-full duration-700">
                <div className="w-full max-w-md text-center">
                    <div className="w-32 h-32 bg-zinc-100 rounded-[40px] flex items-center justify-center text-emerald-500 mx-auto mb-10 shadow-inner relative overflow-hidden group">
                        <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Download size={48} className="relative z-10" />
                    </div>
                    <h2 className="text-4xl font-black text-zinc-900 tracking-tighter mb-4 uppercase">Download Koko App</h2>
                    <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed mb-12 max-w-xs mx-auto">To use 3 interest-free installments, please install the Koko app from your store.</p>
                    
                    <div className="grid grid-cols-1 gap-6">
                        <button className="h-20 bg-zinc-900 text-white rounded-[32px] flex items-center justify-center gap-5 transition-all hover:scale-[1.02] active:scale-98 shadow-xl">
                            <Apple size={32} />
                            <div className="text-left">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 leading-none mb-1">Download on the</p>
                                <p className="text-xl font-black tracking-tight leading-none">App Store</p>
                            </div>
                        </button>
                        <button className="h-20 bg-zinc-900 text-white rounded-[32px] flex items-center justify-center gap-5 transition-all hover:scale-[1.02] active:scale-98 shadow-xl">
                            <Play size={32} />
                            <div className="text-left">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 leading-none mb-1">Get it on</p>
                                <p className="text-xl font-black tracking-tight leading-none">Google Play</p>
                            </div>
                        </button>
                    </div>

                    <Button 
                        variant="ghost"
                        onClick={onCancel}
                        className="mt-12 text-zinc-400 font-black uppercase tracking-[0.3em] text-[10px] hover:text-zinc-900 transition-colors"
                    >
                        Go Back to Payment
                    </Button>
                </div>
            </div>
        );
    }
};

const Payment = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState(
        typeof window !== 'undefined' ? localStorage.getItem('paymentMethod') || 'card' : 'card'
    );
    const [showSimulation, setShowSimulation] = useState(false);

    const handleContinue = () => {
        localStorage.setItem('paymentMethod', paymentMethod);
        if (paymentMethod === 'koko') {
            setShowSimulation(true);
        } else {
            navigate('/checkout/review');
        }
    };

    const handleKokoConfirm = () => {
        // Simulate successful payment in app and return
        localStorage.setItem('paymentMethod', 'koko');
        // We bypass review for this demo as requested in UX flow: Checkout -> Select Koko -> Redirect -> App -> Success
        // Wait, the prompt said: Checkout Page → Select Koko → Redirect → App Payment → Return → Success Page
        // I will navigate to Success Page directly to simulate the "Return"
        setShowSimulation(false);
        navigate('/checkout/success');
    };

    const methods = [
        {
            id: 'card',
            title: 'Credit / Debit Card',
            description: 'Visa, Mastercard, Amex supported. Secured by SSL.',
            icon: <CreditCard className="w-7 h-7" />,
            color: 'text-blue-500',
        },
        {
            id: 'koko',
            title: 'Pay with Koko – 0% Interest',
            description: 'Pay in 3 easy installments',
            icon: <Zap className="w-7 h-7" />,
            color: 'text-emerald-500',
            extra: 'Rs. 237 x 3' // Example amount
        },
        {
            id: 'cod',
            title: 'Cash on Delivery',
            description: 'Pay when your order arrives.',
            icon: <Banknote className="w-7 h-7" />,
            color: 'text-zinc-500',
        }
    ];

    return (
        <div className="pt-28 pb-20 min-h-screen bg-[#f5f5f7] flex flex-col items-center relative overflow-hidden">
            {showSimulation && (
                <KokoSimulation 
                    onCancel={() => setShowSimulation(false)}
                    onConfirm={handleKokoConfirm}
                />
            )}
            
            <div className="w-full max-w-4xl px-4 relative z-10">
                <CheckoutStepper currentStep={1} />

                <div className="bg-white rounded-[40px] border border-zinc-200 overflow-hidden shadow-sm mt-8">
                    <div className="p-8 md:p-14">
                        <div className="flex items-center gap-5 mb-12">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                                <CreditCard size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase">Payment Method</h2>
                                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Select your preferred option</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {methods.map((method) => (
                                <div 
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id)}
                                    className={`group cursor-pointer p-8 rounded-[32px] border-2 transition-all flex items-center gap-8 relative overflow-hidden ${
                                        paymentMethod === method.id 
                                        ? method.id === 'koko' ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-blue-600 bg-blue-50 shadow-sm' 
                                        : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                                    }`}
                                >
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                        paymentMethod === method.id 
                                            ? method.id === 'koko' ? 'bg-emerald-500 text-white shadow-md' : 'bg-blue-600 text-white shadow-md'
                                            : 'bg-zinc-100 ' + method.color
                                    }`}>
                                        {method.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className={`font-black text-xl tracking-tighter ${
                                            paymentMethod === method.id ? 'text-zinc-900' : 'text-zinc-700 group-hover:text-zinc-900'
                                        }`}>
                                            {method.title}
                                        </h3>
                                        <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mt-2">{method.description}</p>
                                        {method.extra && (
                                            <div className="mt-3 inline-flex px-4 py-1.5 bg-white border border-emerald-100 rounded-full">
                                                <span className="text-emerald-600 font-black text-[9px] uppercase tracking-widest">{method.extra}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                                        paymentMethod === method.id 
                                        ? method.id === 'koko' ? 'border-emerald-500 bg-emerald-500' : 'border-blue-600 bg-blue-600' 
                                        : 'border-zinc-300'
                                    }`}>
                                        {paymentMethod === method.id && <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 bg-zinc-50 rounded-[32px] border border-zinc-200 flex items-center gap-6 relative overflow-hidden group">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 border border-zinc-200 shadow-sm">
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <p className="font-black text-zinc-900 text-sm uppercase tracking-widest">Secure Payment Processing</p>
                                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Your payment information is encrypted and secure.</p>
                            </div>
                        </div>

                        <div className="mt-12 pt-10 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <Button 
                                variant="ghost" 
                                onClick={() => navigate('/checkout/shipping')}
                                className="text-zinc-400 font-black uppercase tracking-[0.2em] hover:text-zinc-900 hover:bg-zinc-100 rounded-xl px-6 transition-colors flex items-center gap-2"
                            >
                                <ChevronLeft size={20} />
                                Back
                            </Button>
                            <Button 
                                onClick={handleContinue}
                                className={`w-full sm:w-auto font-black h-16 px-14 rounded-2xl shadow-xl flex items-center gap-3 transition-all active:scale-95 uppercase tracking-[0.2em] text-xs ${
                                    paymentMethod === 'koko' 
                                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20' 
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                                }`}
                            >
                                {paymentMethod === 'koko' ? 'Continue with KOKO' : 'Continue to Review'}
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
