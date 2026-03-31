import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';

const ProfileForm = ({ user, onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneNo: '',
        address: '',
        city: '',
        zipCode: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstname: user.firstname || '',
                lastname: user.lastname || '',
                email: user.email || '',
                phoneNo: user.phoneNo || '',
                address: user.address || '',
                city: user.city || '',
                zipCode: user.zipCode || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.firstname || !formData.lastname) {
            toast.error("Operational first and last names are mandatory.");
            return;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-10 bg-white p-10 md:p-14 rounded-[40px] border border-zinc-200 w-full shadow-sm relative overflow-hidden group'>
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center gap-5 mb-4 relative z-10">
                <div className="w-14 h-14 bg-blue-50/50 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-100 group-hover:bg-blue-50/80 transition-colors">
                    <User size={24} />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter">Profile Configuration</h2>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1 italic">Update your operational nodes</p>
                </div>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10'>
                <div className="space-y-3">
                    <Label htmlFor="firstname" className='text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2'>Node First Name</Label>
                    <Input 
                        id="firstname"
                        type='text' 
                        name="firstname" 
                        value={formData.firstname}
                        onChange={handleChange}
                        className='h-16 rounded-2xl bg-zinc-50 border-zinc-200 focus:border-blue-500/50 transition-all font-black text-zinc-900' 
                    />
                </div>
                <div className="space-y-3">
                    <Label htmlFor="lastname" className='text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2'>Node Last Name</Label>
                    <Input 
                        id="lastname"
                        type='text' 
                        name="lastname" 
                        value={formData.lastname}
                        onChange={handleChange}
                        className='h-16 rounded-2xl bg-zinc-50 border-zinc-200 focus:border-blue-500/50 transition-all font-black text-zinc-900' 
                    />
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                <Label htmlFor="email" className='text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2'>Grid Primary Link (Email)</Label>
                <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <Input 
                        id="email"
                        type='email' 
                        name="email" 
                        value={formData.email}
                        disabled 
                        className='h-16 pl-14 rounded-2xl border-zinc-200 bg-zinc-100/50 text-zinc-500 cursor-not-allowed font-black transition-all' 
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">LOCKED</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                <Label htmlFor="phoneNo" className='text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2'>Comm Frequency (Phone)</Label>
                <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <Input 
                        id="phoneNo"
                        type='text' 
                        name="phoneNo" 
                        value={formData.phoneNo}
                        onChange={handleChange}
                        className='h-16 pl-14 rounded-2xl bg-zinc-50 border-zinc-200 focus:border-blue-500/50 transition-all font-black text-zinc-900' 
                    />
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                <Label htmlFor="address" className='text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2'>Physical Deployment Address</Label>
                <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <Input 
                        id="address"
                        type='text' 
                        name="address" 
                        value={formData.address}
                        onChange={handleChange}
                        className='h-16 pl-14 rounded-2xl bg-zinc-50 border-zinc-200 focus:border-blue-500/50 transition-all font-black text-zinc-900' 
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10'>
                <div className="space-y-3">
                    <Label htmlFor="city" className='text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2'>Deployment Hub (City)</Label>
                    <Input 
                        id="city"
                        type='text' 
                        name="city" 
                        value={formData.city}
                        onChange={handleChange}
                        className='h-16 rounded-2xl bg-zinc-50 border-zinc-200 focus:border-blue-500/50 transition-all font-black text-zinc-900' 
                    />
                </div>
                <div className="space-y-3">
                    <Label htmlFor="zipCode" className='text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2'>Sector Code (Zip)</Label>
                    <Input 
                        id="zipCode"
                        type='text' 
                        name="zipCode" 
                        value={formData.zipCode}
                        onChange={handleChange}
                        className='h-16 rounded-2xl bg-zinc-50 border-zinc-200 focus:border-blue-500/50 transition-all font-black text-zinc-900' 
                    />
                </div>
            </div>

            <div className="pt-8 relative z-10">
                <Button 
                    type='submit' 
                    disabled={isLoading}
                    className='w-full h-20 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-black rounded-[28px] shadow-2xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[11px]'
                >
                    {isLoading ? "Synchronizing Configuration..." : (
                        <>
                            Commit Updates
                            <Save size={20} />
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};

export default ProfileForm;
