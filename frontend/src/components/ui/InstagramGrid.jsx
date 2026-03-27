import React from 'react';

const posts = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
  'https://images.unsplash.com/photo-1556656793-062ff27769cf?w=400&q=80',
  'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?w=400&q=80',
  'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80',
];

const InstagramGrid = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {posts.map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden group relative cursor-pointer shadow-lg">
                    <img src={img} alt="Instagram post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <span className="text-white text-xs font-bold uppercase tracking-widest">Follow @INBOX</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default InstagramGrid;
