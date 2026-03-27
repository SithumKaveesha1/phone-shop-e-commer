import React, { useState } from 'react';
import { 
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import AvatarSection from '../components/AvatarSection';
import ProfileForm from '../components/ProfileForm';

const Profile = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [profilePic, setProfilePic] = useState(user?.profilePic || "");

    const handleProfileUpdate = async (formData) => {
        setIsLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        
        try {
            const res = await axios.put(`http://localhost:8005/api/users/update-profile`, {
                ...formData,
                profilePic
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (res.data.success) {
                toast.success(res.data.message || "Profile updated successfully");
                dispatch(setUser(res.data.user));
            }
        } catch (error) {
            console.error("Update failed:", error);
            toast.error(error.response?.data?.message || "Something went wrong while updating profile");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (newImage) => {
        setProfilePic(newImage);
    };

    if (!user) {
        return (
            <div className="pt-28 min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500 font-medium">Please login to view your profile.</p>
            </div>
        );
    }

    return (
        <div className='pt-28 pb-20 min-h-screen bg-gray-50'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Tabs defaultValue="profile" className='w-full'>
                    <div className="flex justify-center mb-10">
                        <TabsList className="bg-white border border-gray-100 p-1 rounded-xl shadow-sm">
                            <TabsTrigger 
                                value="profile" 
                                className="px-8 py-2.5 rounded-lg data-[state=active]:bg-pink-50 data-[state=active]:text-pink-600 transition-all font-semibold"
                            >
                                Profile
                            </TabsTrigger>
                            <TabsTrigger 
                                value="orders" 
                                className="px-8 py-2.5 rounded-lg data-[state=active]:bg-pink-50 data-[state=active]:text-pink-600 transition-all font-semibold"
                            >
                                Orders
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="profile" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                        <div className='flex flex-col md:flex-row gap-8 lg:gap-16 items-start justify-center'>
                            
                            {/* Left Side: Avatar */}
                            <div className="w-full md:w-1/3 flex justify-center sticky top-32">
                                <AvatarSection user={user} onImageChange={handleImageChange} />
                            </div>

                            {/* Right Side: Form */}
                            <div className="w-full md:w-2/3 max-w-2xl">
                                <ProfileForm 
                                    user={user} 
                                    onSubmit={handleProfileUpdate} 
                                    isLoading={isLoading} 
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="orders" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">My Orders</h3>
                            <p className="text-gray-500 max-w-xs mx-auto">You haven't placed any orders yet. Start shopping to see your orders here!</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Profile;