import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, ArrowRight, ChevronLeft, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { CheckoutStepper } from './Shipping';

const Payment = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState(
        typeof window !== 'undefined' ? localStorage.getItem('paymentMethod') || 'card' : 'card'
    );

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
        <div className="pt-28 pb-20 min-h-screen bg-[#f5f5f7] flex flex-col items-center relative overflow-hidden">
            <div className="w-full max-w-4xl px-4 relative z-10">
                <CheckoutStepper currentStep={1} />

                <div className="bg-white rounded-[40px] border border-zinc-200 overflow-hidden shadow-sm mt-8">
                    <div className="p-8 md:p-14">
                        <div className="flex items-center gap-5 mb-12">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                                <CreditCard size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-zinc-900 tracking-tighter">Payment Method</h2>
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Select your preferred option</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {methods.map((method) => (
                                <div 
                                    key={method.id}
                                    onClick={() => {
                                        setPaymentMethod(method.id);
                                        localStorage.setItem('paymentMethod', method.id);
                                        navigate('/checkout/review');
                                    }}
                                    className={`group cursor-pointer p-8 rounded-[32px] border-2 transition-all flex items-center gap-8 relative overflow-hidden ${
                                        paymentMethod === method.id 
                                        ? 'border-blue-600 bg-blue-50 shadow-sm' 
                                        : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                                    }`}
                                >
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                        paymentMethod === method.id ? 'bg-blue-600 text-white shadow-md' : 'bg-zinc-100 ' + method.color
                                    }`}>
                                        {method.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className={`font-black text-xl tracking-tighter ${
                                            paymentMethod === method.id ? 'text-zinc-900' : 'text-zinc-700 group-hover:text-zinc-900'
                                        }`}>
                                            {method.title === 'Digital Workspace Payment' ? 'Credit / Debit Card' : 'Cash on Delivery'}
                                        </h3>
                                        <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mt-2">{method.description}</p>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                                        paymentMethod === method.id 
                                        ? 'border-blue-600 bg-blue-600' 
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
                                className="text-zinc-500 font-black uppercase tracking-[0.2em] hover:text-zinc-900 hover:bg-zinc-100 rounded-xl px-6 transition-colors flex items-center gap-2"
                            >
                                <ChevronLeft size={20} />
                                Back to Shipping
                            </Button>
                            <Button 
                                onClick={handleContinue}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black h-16 px-14 rounded-2xl shadow-xl shadow-blue-500/20 flex items-center gap-3 transition-all active:scale-95 uppercase tracking-[0.2em] text-xs"
                            >
                                Continue to Review
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
