import React, { useState } from 'react';
import { Label } from './ui/label';
import { Camera } from 'lucide-react';

const AvatarSection = ({ user, onImageChange }) => {
    const [preview, setPreview] = useState(user?.profilePic || "/profile.png");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onImageChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='flex flex-col items-center mb-12 md:mb-0 group'>
            <div className="relative">
                {/* Glow Ring */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full blur-2xl group-hover:opacity-100 opacity-0 transition-opacity duration-700" />
                
                <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-[60px] overflow-hidden border-2 border-zinc-200 shadow-sm transition-transform duration-700 group-hover:scale-105">
                    <img 
                        src={preview} 
                        alt="profile" 
                        className='w-full h-full object-cover brightness-110' 
                    />
                    
                    {/* Hover Overlay */}
                    <Label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Camera size={32} className="text-white mb-2" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Update Node</span>
                        <input 
                            type="file" 
                            accept='image/*' 
                            className='hidden' 
                            onChange={handleFileChange}
                        />
                    </Label>
                </div>
            </div>

            <div className="mt-8 text-center">
                <h3 className="text-2xl font-black text-zinc-900 tracking-tighter uppercase">{user?.firstname} {user?.lastname}</h3>
                <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1 italic">Active Operator</p>
            </div>
            
            <Label className='mt-8 cursor-pointer bg-white border border-zinc-200 text-zinc-500 px-8 py-3 rounded-2xl hover:bg-zinc-50 hover:text-zinc-900 transition-all shadow-sm font-black uppercase tracking-widest text-[11px]'>
                Change Interface
                <input 
                    type="file" 
                    accept='image/*' 
                    className='hidden' 
                    onChange={handleFileChange}
                />
            </Label>
        </div>
    );
};

export default AvatarSection;
