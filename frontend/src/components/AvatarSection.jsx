import React, { useState } from 'react';
import { Label } from './ui/label';

const AvatarSection = ({ user, onImageChange }) => {
    const [preview, setPreview] = useState(user?.profilePic || "/profile.png");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onImageChange(reader.result); // Passing base64 to parent
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='flex flex-col items-center mb-8 md:mb-0'>
            <div className="relative">
                <img 
                    src={preview} 
                    alt="profile" 
                    className='w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-pink-100 shadow-md' 
                />
            </div>
            <Label className='mt-6 cursor-pointer bg-pink-600 text-white px-6 py-2.5 rounded-full hover:bg-pink-700 transition-colors shadow-sm font-medium'>
                Change Picture
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
