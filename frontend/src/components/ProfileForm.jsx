import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { toast } from 'sonner';

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
        
        // Validation
        if (!formData.firstname || !formData.lastname) {
            toast.error("First and Last name are required");
            return;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-5 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 w-full'>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Update Profile</h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className="space-y-1.5">
                    <Label htmlFor="firstname" className='text-sm font-semibold text-gray-600'>First Name</Label>
                    <Input 
                        id="firstname"
                        type='text' 
                        name="firstname" 
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="John"
                        className='h-11 rounded-xl border-gray-200 focus:ring-pink-500 focus:border-pink-500' 
                    />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="lastname" className='text-sm font-semibold text-gray-600'>Last Name</Label>
                    <Input 
                        id="lastname"
                        type='text' 
                        name="lastname" 
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Doe"
                        className='h-11 rounded-xl border-gray-200 focus:ring-pink-500 focus:border-pink-500' 
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="email" className='text-sm font-semibold text-gray-600'>Email</Label>
                <Input 
                    id="email"
                    type='email' 
                    name="email" 
                    value={formData.email}
                    disabled 
                    className='h-11 rounded-xl border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed' 
                />
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="phoneNo" className='text-sm font-semibold text-gray-600'>Phone Number</Label>
                <Input 
                    id="phoneNo"
                    type='text' 
                    name="phoneNo" 
                    value={formData.phoneNo}
                    onChange={handleChange}
                    placeholder="Enter your Contact No" 
                    className='h-11 rounded-xl border-gray-200 focus:ring-pink-500 focus:border-pink-500' 
                />
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="address" className='text-sm font-semibold text-gray-600'>Address</Label>
                <Input 
                    id="address"
                    type='text' 
                    name="address" 
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your Address" 
                    className='h-11 rounded-xl border-gray-200 focus:ring-pink-500 focus:border-pink-500' 
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className="space-y-1.5">
                    <Label htmlFor="city" className='text-sm font-semibold text-gray-600'>City</Label>
                    <Input 
                        id="city"
                        type='text' 
                        name="city" 
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your City" 
                        className='h-11 rounded-xl border-gray-200 focus:ring-pink-500 focus:border-pink-500' 
                    />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="zipCode" className='text-sm font-semibold text-gray-600'>Zip Code</Label>
                    <Input 
                        id="zipCode"
                        type='text' 
                        name="zipCode" 
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="Enter your ZipCode" 
                        className='h-11 rounded-xl border-gray-200 focus:ring-pink-500 focus:border-pink-500' 
                    />
                </div>
            </div>

            <Button 
                type='submit' 
                disabled={isLoading}
                className='w-full h-12 mt-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.98]'
            >
                {isLoading ? "Updating..." : "Update Profile"}
            </Button>
        </form>
    );
};

export default ProfileForm;
