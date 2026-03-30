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
import { ShoppingBag, LayoutDashboard, History, Settings } from 'lucide-react';

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
                toast.success("Synchronized Configuration.");
                dispatch(setUser(res.data.user));
            }
        } catch (error) {
            console.error("Update failed:", error);
            toast.error(error.response?.data?.message || "Sync Protocol Failure.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (newImage) => {
        setProfilePic(newImage);
    };

    if (!user) {
        return (
            <div className="pt-28 min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
                <div className="mesh-glow bg-blue-600/10 w-[600px] h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[150px]" />
                <div className="relative z-10 text-center">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-8">Authorization Required</h2>
                    <p className="text-zinc-500 font-black uppercase tracking-widest text-xs mb-10">Access restricted to authorized operators.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='pt-28 pb-32 min-h-screen bg-black relative overflow-hidden'>
             {/* Background Glows */}
             <div className="mesh-glow bg-blue-600/10 w-[800px] h-[800px] absolute -top-40 -left-60 opacity-30 blur-[180px] animate-pulse" />
             <div className="mesh-glow bg-indigo-600/10 w-[600px] h-[600px] absolute bottom-0 right-0 opacity-20 blur-[150px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    <div>
                        <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">Internal Workspace</h1>
                        <p className="text-blue-500 text-xs font-black uppercase tracking-[0.4em] mt-3 italic">Authorized Personnel Only</p>
                    </div>
                    
                    <div className="glass-card p-1 rounded-2xl border border-white/5 flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-pulse">
                            <LayoutDashboard size={20} />
                        </div>
                        <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 pr-6">System Online</span>
                    </div>
                </div>

                <Tabs defaultValue="profile" className='w-full'>
                    <div className="flex justify-center mb-16">
                        <TabsList className="glass-card border border-white/5 p-1 rounded-2xl bg-white/5">
                            <TabsTrigger 
                                value="profile" 
                                className="px-10 py-3.5 rounded-xl text-zinc-500 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all transform duration-500 font-black uppercase tracking-widest text-[11px] flex items-center gap-3"
                            >
                                <Settings size={16} />
                                Profile Buffer
                            </TabsTrigger>
                            <TabsTrigger 
                                value="orders" 
                                className="px-10 py-3.5 rounded-xl text-zinc-500 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all transform duration-500 font-black uppercase tracking-widest text-[11px] flex items-center gap-3"
                            >
                                <History size={16} />
                                Order Logs
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="profile" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                        <div className='flex flex-col lg:flex-row gap-16 items-start justify-center animate-in fade-in zoom-in-95 duration-700'>
                            
                            {/* Left Side: Avatar */}
                            <div className="w-full lg:w-1/3 flex justify-center sticky top-32">
                                <AvatarSection user={user} onImageChange={handleImageChange} />
                            </div>

                            {/* Right Side: Form */}
                            <div className="w-full lg:w-2/3 max-w-2xl">
                                <ProfileForm 
                                    user={user} 
                                    onSubmit={handleProfileUpdate} 
                                    isLoading={isLoading} 
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="orders" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                        <div className="glass-card p-20 rounded-[40px] border border-white/5 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 shadow-2xl relative overflow-hidden group">
                           <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-24 h-24 bg-blue-500/10 rounded-[32px] flex items-center justify-center mx-auto mb-10 border border-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                                <ShoppingBag size={40} className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter italic">Log Archive Null</h3>
                            <p className="text-zinc-600 max-w-xs mx-auto text-[11px] font-black uppercase tracking-[0.2em] leading-relaxed">System has not detected any historical acquisition logs. Start procurement to populate this buffer!</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Profile;