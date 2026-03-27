import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MapPin, Phone, User, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const CheckoutStepper = ({ currentStep }) => {
    const steps = ['Shipping', 'Payment', 'Review', 'Success'];
    return (
        <div className="flex items-center justify-center mb-12">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className="flex flex-col items-center relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                            index <= currentStep 
                            ? 'bg-pink-600 border-pink-600 text-white shadow-lg shadow-pink-200' 
                            : 'bg-white border-gray-200 text-gray-400'
                        }`}>
                            {index < currentStep ? <Check size={20} /> : <span>{index + 1}</span>}
                        </div>
                        <span className={`absolute -bottom-7 text-xs font-bold uppercase tracking-widest ${
                            index <= currentStep ? 'text-pink-600' : 'text-gray-400'
                        }`}>
                            {step}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`w-20 md:w-32 h-0.5 mx-2 ${
                            index < currentStep ? 'bg-pink-600' : 'bg-gray-200'
                        }`}></div>
                    )}
                </React.Fragment>
            ))}
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
        // Save to local storage for the next step
        localStorage.setItem('shippingAddress', JSON.stringify(formData));
        navigate('/checkout/payment');
    };

    return (
        <div className="pt-28 pb-20 min-h-screen bg-gray-50 flex flex-col items-center">
            <div className="w-full max-w-4xl px-4">
                <CheckoutStepper currentStep={0} />

                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">Shipping Details</h2>
                                <p className="text-gray-500 text-sm">Where should we send your order?</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">First Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                        <Input 
                                            name="firstname"
                                            value={formData.firstname}
                                            onChange={handleChange}
                                            className="pl-12 h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all font-medium"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Last Name</label>
                                    <Input 
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <Input 
                                        name="phoneNo"
                                        value={formData.phoneNo}
                                        onChange={handleChange}
                                        placeholder="07X XXX XXXX"
                                        className="pl-12 h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Street Address</label>
                                <Input 
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="House No, Street Name"
                                    className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all font-medium"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">City</label>
                                    <Input 
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all font-medium"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Zip Code</label>
                                    <Input 
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-50 flex items-center justify-between gap-4">
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    onClick={() => navigate('/cart')}
                                    className="text-gray-500 font-bold hover:text-pink-600"
                                >
                                    Back to Cart
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="bg-pink-600 hover:bg-pink-700 text-white font-black h-14 px-10 rounded-2xl shadow-xl shadow-pink-100 flex items-center gap-2 transition-all active:scale-95"
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
