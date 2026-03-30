import React from "react";
import { Mail, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

const VerifyEmail = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black relative overflow-hidden">
            {/* Background Glows */}
            <div className="mesh-glow bg-blue-600/10 w-[600px] h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[150px] animate-pulse" />
            <div className="mesh-glow bg-purple-600/10 w-[400px] h-[400px] absolute top-1/4 right-0 opacity-20 blur-[120px]" />
            
            <div className="relative z-10 glass-card p-16 md:p-20 rounded-[48px] border border-white/5 flex flex-col items-center text-center shadow-2xl group max-w-lg mx-auto">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-24 h-24 bg-blue-600/10 rounded-[32px] flex items-center justify-center mb-10 border border-blue-500/10 relative group shadow-inner">
                    <div className="absolute inset-0 bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Mail size={42} className="text-blue-500 group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 italic leading-tight">Link Sent to <span className="text-gradient-blue">Pulse</span></h1>
                <p className="text-zinc-600 font-black uppercase tracking-[0.2em] text-[11px] mb-12 max-w-xs mx-auto leading-relaxed">Identity verification link dispatched. Access your secure inbox to synchronize your account.</p>
                
                <div className="flex items-center gap-3 px-8 py-4 bg-white/5 rounded-[24px] border border-white/5 group-hover:bg-blue-600/10 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <CheckCircle2 className="text-blue-500" size={18} />
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-blue-400 transition-colors">Awaiting Direct Action</span>
                </div>
                
                <div className="mt-12 flex items-center gap-2 opacity-50">
                    <Sparkles size={12} className="text-purple-500" />
                    <button className="text-[10px] font-black text-white uppercase tracking-widest hover:text-blue-500 transition-colors">Resend Verification Token</button>
                    <Sparkles size={12} className="text-purple-500" />
                </div>
            </div>
            
            <div className="absolute bottom-12 flex items-center gap-3 opacity-30">
                <ShieldCheck size={16} className="text-blue-600" />
                <span className="text-[8px] font-black text-white uppercase tracking-[0.4em]">AES-256 Distributed Identity Matrix</span>
            </div>
        </div>
    );
};

export default VerifyEmail;
