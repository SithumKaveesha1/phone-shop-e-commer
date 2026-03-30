import React from "react";
import { Loader2, ShieldCheck, Fingerprint } from "lucide-react";

const Verify = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black relative overflow-hidden">
            {/* Background Glows */}
            <div className="mesh-glow bg-blue-600/10 w-[600px] h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[150px] animate-pulse" />
            
            <div className="relative z-10 glass-card p-20 rounded-[48px] border border-white/5 flex flex-col items-center text-center shadow-2xl">
                <div className="w-24 h-24 bg-blue-600/10 rounded-[32px] flex items-center justify-center mb-10 border border-blue-500/10 relative group">
                    <div className="absolute inset-0 bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Fingerprint size={48} className="text-blue-500 animate-pulse" />
                </div>
                
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 italic">Acquiring Identity</h1>
                <p className="text-zinc-600 font-black uppercase tracking-[0.3em] text-[10px] mb-12 italic">Synchronizing with global secure nodes...</p>
                
                <div className="flex items-center gap-4 px-8 py-3 bg-white/5 rounded-full border border-white/5">
                    <Loader2 className="animate-spin text-blue-500" size={20} />
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Protocol Active</span>
                </div>
            </div>
            
            <div className="absolute bottom-12 flex items-center gap-3 opacity-30">
                <ShieldCheck size={16} className="text-blue-600" />
                <span className="text-[8px] font-black text-white uppercase tracking-[0.4em]">AES-256 Multi-Layer Encrypted Connection</span>
            </div>
        </div>
    );
};

export default Verify;
