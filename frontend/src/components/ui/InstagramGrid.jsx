import React from 'react';

const posts = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
  'https://images.unsplash.com/photo-1556656793-062ff27769cf?w=500&q=80', // HIGH-END HARDWARE DUMMY (Replacing Logo)
  'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?w=500&q=80',
  'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80',
];

const InstagramGrid = () => {
    return (
        <div className="grid grid-cols-2 gap-3 md:gap-4">
            {posts.map((img, i) => (
                <div 
                    key={i} 
                    className="aspect-square rounded-[24px] overflow-hidden group relative cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-black/5 bg-zinc-50"
                >
                    <img 
                        src={img} 
                        alt="Visual Hub Node" 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115" 
                        onError={(e) => { e.target.src = 'https://placehold.co/500x500?text=Instagram+Post'; }}
                    />
                    
                    {/* Interactive Glassmorphic Follow Overlay */}
                    <div className="absolute inset-0 bg-blue-600/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-4">
                         <span className="text-white text-[8px] font-black uppercase tracking-[0.4em] mb-2 opacity-60">Follow Us</span>
                         <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] text-center">@INBOX.LK</span>
                         <div className="mt-4 w-6 h-0.5 bg-white/40 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default InstagramGrid;
