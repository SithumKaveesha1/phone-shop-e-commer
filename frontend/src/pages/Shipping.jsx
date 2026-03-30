import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MapPin, Phone, User, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const CheckoutStepper = ({ currentStep }) => {
    const steps = ['Shipping', 'Payment', 'Review', 'Success'];
    return (
        <div className="flex items-center justify-center mb-16 relative z-10">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className="flex flex-col items-center relative">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${
                            index <= currentStep 
                            ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_25px_rgba(59,130,246,0.4)]' 
                            : 'bg-zinc-900 border-white/5 text-zinc-600'
                        }`}>
                            {index < currentStep ? <Check size={22} className="stroke-[3]" /> : <span className="font-black">{index + 1}</span>}
                        </div>
                        <span className={`absolute -bottom-8 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap ${
                            index <= currentStep ? 'text-blue-500' : 'text-zinc-700'
                        }`}>
                            {step}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`w-12 sm:w-24 md:w-32 h-[2px] mx-2 rounded-full transition-all duration-1000 ${
                            index < currentStep ? 'bg-gradient-to-r from-blue-600 to-blue-400' : 'bg-zinc-900'
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
        localStorage.setItem('shippingAddress', JSON.stringify(formData));
        navigate('/checkout/payment');
    };

    return (
        <div className="pt-28 pb-20 min-h-screen bg-black flex flex-col items-center relative overflow-hidden">
            {/* Background Glows */}
            <div className="mesh-glow bg-blue-600/10 w-[800px] h-[800px] -top-40 -left-60 opacity-30 blur-[180px] animate-pulse" />
            <div className="mesh-glow bg-purple-600/10 w-[600px] h-[600px] bottom-0 right-0 opacity-20 blur-[150px]" />

            <div className="w-full max-w-4xl px-4 relative z-10">
                <CheckoutStepper currentStep={0} />

                <div className="glass-card rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
                    <div className="p-8 md:p-14">
                        <div className="flex items-center gap-5 mb-12">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                <MapPin size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Deployment Location</h2>
                                <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mt-1">Specify your hardware destination</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Operational First Name</label>
                                    <div className="relative">
                                        <User className="absolute left-5 top-4.5 text-zinc-600" size={18} />
                                        <Input 
                                            name="firstname"
                                            value={formData.firstname}
                                            onChange={handleChange}
                                            className="pl-14 h-16 rounded-2xl bg-white/5 border-white/5 focus:border-blue-500/50 transition-all font-black text-white placeholder-zinc-700"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Operational Last Name</label>
                                    <Input 
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className="h-16 rounded-2xl bg-white/5 border-white/5 focus:border-blue-500/50 transition-all font-black text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Communication Link (Mobile)</label>
                                <div className="relative">
                                    <Phone className="absolute left-5 top-4.5 text-zinc-600" size={18} />
                                    <Input 
                                        name="phoneNo"
                                        value={formData.phoneNo}
                                        onChange={handleChange}
                                        placeholder="07X XXX XXXX"
                                        className="pl-14 h-16 rounded-2xl bg-white/5 border-white/5 focus:border-blue-500/50 transition-all font-black text-white placeholder-zinc-800"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Physical Coordinates (Address)</label>
                                <Input 
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="House No, Street Name"
                                    className="h-16 rounded-2xl bg-white/5 border-white/5 focus:border-blue-500/50 transition-all font-black text-white placeholder-zinc-800"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">City Hub</label>
                                    <Input 
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="h-16 rounded-2xl bg-white/5 border-white/5 focus:border-blue-500/50 transition-all font-black text-white"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Zone Code (Zip)</label>
                                    <Input 
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className="h-16 rounded-2xl bg-white/5 border-white/5 focus:border-blue-500/50 transition-all font-black text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    onClick={() => navigate('/cart')}
                                    className="text-zinc-500 font-black uppercase tracking-widest hover:text-white transition-colors"
                                >
                                    Cancel & Return
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-black h-16 px-14 rounded-2xl shadow-2xl shadow-blue-500/20 flex items-center gap-3 transition-all active:scale-95 uppercase tracking-widest text-xs"
                                >
                                    Proceed to Interface
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
