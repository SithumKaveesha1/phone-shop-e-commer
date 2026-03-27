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
            title: 'Credit / Debit Card',
            description: 'Safe & Secure. Supports Visa, Mastercard, Amex.',
            icon: <CreditCard className="w-6 h-6" />,
            color: 'bg-blue-50 text-blue-600 border-blue-100',
        },
        {
            id: 'cod',
            title: 'Cash on Delivery',
            description: 'Pay with cash upon delivery of your order.',
            icon: <Banknote className="w-6 h-6" />,
            color: 'bg-green-50 text-green-600 border-green-100',
        }
    ];

    return (
        <div className="pt-28 pb-20 min-h-screen bg-gray-50 flex flex-col items-center">
            <div className="w-full max-w-4xl px-4">
                <CheckoutStepper currentStep={1} />

                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">Payment Method</h2>
                                <p className="text-gray-500 text-sm">Select how you'd like to pay</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {methods.map((method) => (
                                <div 
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id)}
                                    className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all flex items-center gap-6 ${
                                        paymentMethod === method.id 
                                        ? 'border-pink-600 bg-pink-50/30' 
                                        : 'border-gray-100 bg-white hover:border-pink-200 hover:bg-gray-50/50'
                                    }`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                                        paymentMethod === method.id ? 'bg-pink-600 text-white shadow-lg shadow-pink-200' : method.color
                                    }`}>
                                        {method.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className={`font-bold text-lg ${
                                            paymentMethod === method.id ? 'text-pink-600' : 'text-gray-900'
                                        }`}>
                                            {method.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm">{method.description}</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                        paymentMethod === method.id 
                                        ? 'border-pink-600 bg-pink-600' 
                                        : 'border-gray-300'
                                    }`}>
                                        {paymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-6 bg-pink-50/30 rounded-2xl border border-pink-100 flex items-center gap-4">
                            <ShieldCheck className="text-pink-600" size={32} />
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Safe & Secure Transactions</p>
                                <p className="text-gray-500 text-xs">Your payment information is encrypted and never stored on our servers.</p>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between gap-4">
                            <Button 
                                variant="ghost" 
                                onClick={() => navigate('/checkout/shipping')}
                                className="text-gray-500 font-bold hover:text-pink-600 flex items-center gap-2"
                            >
                                <ChevronLeft size={20} />
                                Back to Shipping
                            </Button>
                            <Button 
                                onClick={handleContinue}
                                className="bg-pink-600 hover:bg-pink-700 text-white font-black h-14 px-10 rounded-2xl shadow-xl shadow-pink-100 flex items-center gap-2 transition-all active:scale-95"
                            >
                                Review Order
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
