import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MapPin, Phone, User, ArrowRight, Check, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const CheckoutStepper = ({ currentStep }) => {
    const navigate = useNavigate();
    const steps = ['Shipping', 'Payment', 'Review', 'Success'];
    return (
        <div className="flex flex-col md:flex-row items-center justify-center mb-16 relative z-10 w-full max-w-4xl mx-auto gap-8 md:gap-0">
            <div className="absolute left-0 -top-4 md:top-1/2 md:-translate-y-1/2">
                <Button 
                    variant="ghost" 
                    onClick={() => navigate('/products')}
                    className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-all font-black uppercase tracking-[0.2em] text-[10px]"
                >
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Exit
                </Button>
            </div>
            <div className="flex items-center justify-center flex-1 w-full md:w-auto">
                {steps.map((step, index) => (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center relative">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${
                                index < currentStep 
                                ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                                : index === currentStep
                                ? 'bg-white border-blue-600 text-blue-600 shadow-sm shadow-blue-500/10'
                                : 'bg-zinc-50 border-zinc-200 text-zinc-400'
                            }`}>
                                {index < currentStep ? <Check size={22} className="stroke-[3]" /> : <span className="font-black">{index + 1}</span>}
                            </div>
                            <span className={`absolute -bottom-8 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap ${
                                index <= currentStep ? 'text-zinc-900' : 'text-zinc-400'
                            }`}>
                                {step}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-[2px] mx-2 sm:mx-4 rounded-full transition-all duration-1000 ${
                                index < currentStep ? 'bg-blue-600' : 'bg-zinc-200'
                            }`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

const Shipping = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    
    const [formData, setFormData] = useState({
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        phoneNo: user?.phoneNo || '',
        address: user?.address || '',
        city: user?.city || '',
        zipCode: user?.zipCode || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('shippingAddress', JSON.stringify(formData));
        navigate('/checkout/payment');
    };

    return (
        <div className="pt-28 pb-20 min-h-screen bg-[#f5f5f7] flex flex-col items-center relative overflow-hidden">
            <div className="w-full max-w-4xl px-4 relative z-10">
                <CheckoutStepper currentStep={0} />

                <div className="bg-white rounded-[40px] border border-zinc-200 overflow-hidden shadow-sm mt-8">
                    <div className="p-8 md:p-14">
                        <div className="flex items-center gap-5 mb-12">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                                <MapPin size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-zinc-900 tracking-tighter">Shipping Details</h2>
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Specify your delivery address</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">First Name</label>
                                    <div className="relative">
                                        <User className="absolute left-5 top-4.5 text-zinc-400" size={18} />
                                        <Input 
                                            name="firstname"
                                            value={formData.firstname}
                                            onChange={handleChange}
                                            placeholder="Enter your first name"
                                            className="pl-14 h-16 rounded-2xl bg-zinc-50 border-zinc-200 focus:border-blue-500 transition-all font-bold text-zinc-900 placeholder:text-zinc-400"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Last Name</label>
                                    <Input 
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        placeholder="Enter your last name"
                                        className="h-16 rounded-2xl bg-zinc-50 border-zinc-200 focus:border-blue-500 transition-all font-bold text-zinc-900 placeholder:text-zinc-400 px-5"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Mobile Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-5 top-4.5 text-zinc-400" size={18} />
                                    <Input 
                                        name="phoneNo"
                                        value={formData.phoneNo}
                                        onChange={handleChange}
                                        placeholder="07X XXX XXXX"
                                        className="pl-14 h-16 rounded-2xl bg-zinc-50 border-zinc-200 focus:border-blue-500 transition-all font-bold text-zinc-900 placeholder:text-zinc-400"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Street Address</label>
                                <Input 
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="House No, Street Name"
                                    className="h-16 rounded-2xl bg-zinc-50 border-zinc-200 focus:border-blue-500 transition-all font-bold text-zinc-900 placeholder:text-zinc-400 px-5"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">City</label>
                                    <Input 
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Enter city"
                                        className="h-16 rounded-2xl bg-zinc-50 border-zinc-200 focus:border-blue-500 transition-all font-bold text-zinc-900 placeholder:text-zinc-400 px-5"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">ZIP / Postal Code</label>
                                    <Input 
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        placeholder="Enter ZIP code"
                                        className="h-16 rounded-2xl bg-zinc-50 border-zinc-200 focus:border-blue-500 transition-all font-bold text-zinc-900 placeholder:text-zinc-400 px-5"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-10 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    onClick={() => navigate('/cart')}
                                    className="text-zinc-500 font-black uppercase tracking-[0.2em] hover:text-zinc-900 hover:bg-zinc-100 rounded-xl px-6 transition-colors"
                                >
                                    Return to Cart
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black h-16 px-14 rounded-2xl shadow-xl shadow-blue-500/20 flex items-center gap-3 transition-all active:scale-95 uppercase tracking-[0.2em] text-xs"
                                >
                                    Continue to Payment
                                    <ArrowRight size={20} />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
export { CheckoutStepper };
