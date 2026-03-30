import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Sparkles, Twitter, Instagram, Facebook, ShieldCheck, Globe } from 'lucide-react';
import MultiLangChatbot from '../components/MultiLangChatbot';
import { Button } from '../components/ui/button';

const ContactCard = ({ icon, title, value, subValue, color }) => (
    <div className="glass-card p-10 rounded-[40px] border border-white/5 shadow-2xl hover:border-white/20 transition-all group relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-6 border border-white/5 ${color}`}>
            {icon}
        </div>
        <h3 className="text-zinc-600 font-black uppercase tracking-[0.2em] text-[10px] mb-3 opacity-60">{title}</h3>
        <p className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{value}</p>
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{subValue}</p>
    </div>
);

const Contact = () => {
    return (
        <div className="pt-28 pb-32 min-h-screen bg-black relative overflow-hidden">
            {/* Background Glows */}
            <div className="mesh-glow bg-blue-600/10 w-[800px] h-[800px] absolute -top-40 -left-60 opacity-30 blur-[180px] animate-pulse" />
            <div className="mesh-glow bg-purple-600/10 w-[600px] h-[600px] absolute bottom-0 right-0 opacity-20 blur-[150px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-card border border-white/10 text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-in fade-in zoom-in duration-1000">
                        <MessageSquare size={14} className="animate-pulse" />
                        Communication Hub
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-none uppercase">
                        Quantum <span className="text-gradient-purple italic">Support</span> Matrix
                    </h1>
                    <p className="text-zinc-500 text-sm font-black uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed opacity-80">
                        Access our distributed intelligence network or establish a direct link with our human operations team for hardware procurement assistance.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
                    
                    {/* Left: Contact Info */}
                    <div className="lg:col-span-5 space-y-8 flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                            <ContactCard 
                                icon={<Mail className="w-8 h-8" />}
                                title="Digital Link (Email)"
                                value="support@inbox.com"
                                subValue="Buffered responses within 24h"
                                color="text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                            />
                            <ContactCard 
                                icon={<Phone className="w-8 h-8" />}
                                title="Direct Line (Audio)"
                                value="+94 71 234 5678"
                                subValue="Operative Mon - Fri, 9am - 6pm"
                                color="text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                            />
                            <ContactCard 
                                icon={<MapPin className="w-8 h-8" />}
                                title="Physical Node (Visit)"
                                value="Colombo Hub"
                                subValue="123 Tech Avenue, Level 4"
                                color="text-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                            />
                        </div>

                        {/* Social Connect */}
                        <div className="glass-card p-10 rounded-[40px] border border-white/5 shadow-2xl flex-grow relative overflow-hidden group">
                           <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:opacity-100 opacity-30 transition-opacity" />
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-8 italic">Global Nodes</h3>
                            <div className="flex gap-5">
                                {[
                                    { icon: <Facebook size={20} />, label: 'Facebook', color: 'hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/20' },
                                    { icon: <Twitter size={20} />, label: 'Twitter', color: 'hover:text-sky-500 hover:bg-sky-500/10 hover:border-sky-500/20' },
                                    { icon: <Instagram size={20} />, label: 'Instagram', color: 'hover:text-purple-500 hover:bg-purple-500/10 hover:border-purple-500/20' }
                                ].map((social, i) => (
                                    <button 
                                        key={i}
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-zinc-600 border border-white/5 bg-white/5 transition-all duration-500 ${social.color}`}
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-12 pt-10 border-t border-white/5 flex items-center gap-4">
                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] leading-none">Security Ops Center Online</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Embedded Chatbot */}
                    <div className="lg:col-span-7 h-[700px] lg:h-auto min-h-[600px]">
                        <div className="h-full rounded-[48px] overflow-hidden shadow-2xl border border-white/5 relative glass-card group">
                            <div className="absolute top-8 right-8 z-10 hidden md:flex gap-3">
                                <div className="bg-blue-600/10 backdrop-blur-3xl px-5 py-2 rounded-full border border-blue-500/20 flex items-center gap-3 shadow-2xl group-hover:bg-blue-600/20 transition-all duration-700">
                                    <Globe size={14} className="text-blue-500 animate-spin-slow" />
                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Universal Intellect System</span>
                                </div>
                                <div className="bg-purple-600/10 backdrop-blur-3xl px-5 py-2 rounded-full border border-purple-500/20 flex items-center gap-3 shadow-2xl">
                                    <Sparkles size={14} className="text-purple-500" />
                                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.2em]">Live</span>
                                </div>
                            </div>
                            
                            {/* Decorative Corner Glow */}
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />
                            
                            <MultiLangChatbot embed={true} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
