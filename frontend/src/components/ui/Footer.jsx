import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { RiVisaLine, RiMastercardLine } from 'react-icons/ri'
import { SiAmericanexpress } from 'react-icons/si'
import InstagramGrid from './InstagramGrid'
import { ShieldCheck, Globe, Cpu, Headphones, Truck, Zap, Lock } from 'lucide-react'
import logo from '../../assets/logo.jpeg'

const Footer = () => {
    return (
        <footer className='bg-[#fbfbfd] py-20 px-4 md:px-10'>
            
            {/* THE LUXURY FOOTER FRAME - Boxed Premium Design */}
            <div className='max-w-[1400px] mx-auto bg-white rounded-[60px] border-2 border-zinc-100 shadow-[0_40px_100px_rgba(0,0,0,0.05)] relative overflow-hidden p-12 md:p-20'>
                
                {/* Decorative Mesh Glows - Contained in Frame */}
                <div className="absolute -bottom-40 -left-60 w-[800px] h-[800px] bg-blue-600/5 blur-[180px] pointer-events-none rounded-full" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] pointer-events-none rounded-full" />

                <div className='relative z-10'>
                    
                    {/* Brand Value Pillars Section - High Contrast */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 pb-16 border-b border-zinc-100">
                        {[
                            { icon: <Truck className="text-blue-600" size={28} />, title: 'Expedited Hub', desc: 'Authorized hardware deployment across Sri Lanka nodes.', color: 'from-blue-600/10' },
                            { icon: <Lock className="text-zinc-900" size={28} />, title: 'Secure Vault', desc: 'Transactional integrity with multi-layer encryption.', color: 'from-zinc-100' },
                            { icon: <Zap className="text-blue-600" size={28} />, title: 'KOKO Direct', desc: 'Optimized procurement via premium split-pay protocols.', color: 'from-indigo-600/10' },
                            { icon: <Headphones className="text-blue-500" size={28} />, title: 'Command Center', desc: 'Direct comms for 24/7 ecosystem assistance.', color: 'from-blue-500/10' }
                        ].map((pill, i) => (
                            <div key={i} className="flex gap-6 items-start group hover:translate-x-2 transition-transform duration-500">
                                <div className={`w-16 h-16 bg-gradient-to-br ${pill.color} to-transparent rounded-2xl flex-shrink-0 flex items-center justify-center border border-zinc-100 group-hover:bg-white group-hover:shadow-xl group-hover:border-blue-500/20 transition-all`}>
                                    {pill.icon}
                                </div>
                                <div className="space-y-1 mt-1">
                                    <h4 className="text-[11px] font-black text-black uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors lowercase italic">{pill.title}</h4>
                                    <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">{pill.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20'>
                        
                        {/* Brand Section */}
                        <div className='space-y-12'>
                            <Link to='/' className='inline-block group'>
                                <div className="flex items-center hover:scale-110 transition-transform duration-500">
                                    <img 
                                        src={logo} 
                                        alt="INBOX" 
                                        className="h-20 w-20 object-contain rounded-full border-[6px] border-blue-600 p-0.5 bg-white shadow-xl shadow-blue-500/20" 
                                    />
                                </div>
                            </Link>
                            <p className='text-[10px] leading-relaxed max-w-xs font-black uppercase tracking-[0.3em] text-black'>
                                THE ELITE HARDWARE DEPLOYMENT NODE FOR SRI LANKA. PRECISION PROCUREMENT. EXCLUSIVE DISTRIBUTION.
                            </p>
                            
                            <div className="space-y-6">
                                <h4 className="text-black font-black text-[9px] uppercase tracking-[0.5em] italic opacity-40">Social Hubs</h4>
                                <div className='flex space-x-3'>
                                    {[
                                        { icon: <FaFacebook size={18} />, color: 'hover:bg-[#1877F2]', link: 'https://www.facebook.com/share/1AxNSHy7iC/?mibextid=wwXIfr' },
                                        { icon: <FaInstagram size={18} />, color: 'hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#D62976] hover:to-[#962fbf]', link: '#' },
                                        { icon: <FaTiktok size={18} />, color: 'hover:bg-black', link: 'https://www.tiktok.com/@inboxpvtltd?_r=1&_t=ZS-9525fD7IIuz' },
                                        { icon: <FaWhatsapp size={18} />, color: 'hover:bg-[#25D366]', link: 'https://wa.me/94778067914' }
                                    ].map((social, i) => (
                                        <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className={`p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-black hover:text-white ${social.color} hover:shadow-2xl transition-all duration-500`}>
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Shop Categories - Hard Black Text */}
                        <div>
                            <h3 className='text-black font-black text-[10px] uppercase tracking-[0.4em] mb-12 italic border-l-4 border-blue-600 pl-4'>Inventory</h3>
                            <ul className='space-y-6 text-[10px] font-black uppercase tracking-[0.3em]'>
                                {['iPhone', 'Mac', 'iPad', 'Watch', 'AirPods', 'Accessories'].map((cat) => (
                                    <li key={cat}>
                                        <Link to={`/products?category=${cat}`} className="text-black hover:text-blue-600 transition-colors flex items-center gap-3 group">
                                            <div className="w-1.5 h-1.5 bg-zinc-200 group-hover:bg-blue-600 transition-colors" />
                                            {cat}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Useful Links - Hard Black Text */}
                        <div>
                            <h3 className='text-black font-black text-[10px] uppercase tracking-[0.4em] mb-12 italic border-l-4 border-black pl-4'>Utilities</h3>
                            <ul className='space-y-6 text-[10px] font-black uppercase tracking-[0.3em]'>
                                {[{ name: 'Shop All', path: '/products' },
                                    { name: 'Profile Grid', path: '/profile' },
                                    { name: 'Procurement Logs', path: '/orders' },
                                    { name: 'Buffer (Wishlist)', path: '/wishlist' },
                                    { name: 'Direct Comms', path: '/contact' },
                                    { name: 'Return Logistics', path: '/returns' }
                                ].map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path} className="text-black hover:text-blue-600 transition-colors flex items-center gap-3 group">
                                            <div className="w-1.5 h-1.5 bg-zinc-200 group-hover:bg-blue-600 transition-colors" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Visual Feed */}
                        <div className='space-y-10'>
                            <h3 className='text-black font-black text-[10px] uppercase tracking-[0.4em] italic border-l-4 border-blue-600 pl-4'>Visual Stream</h3>
                            <div className="p-3 bg-zinc-50 rounded-3xl border border-zinc-100 shadow-xl overflow-hidden relative">
                                <InstagramGrid />
                            </div>
                            <div className="bg-gradient-to-br from-zinc-50 to-white p-6 rounded-[32px] border border-zinc-100 flex items-center justify-between shadow-sm group">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest">Protocol Status</span>
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Operational</span>
                                </div>
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-zinc-100 group-hover:scale-110 transition-transform">
                                    <Cpu size={20} className="animate-spin-slow" />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Section - Sharp Contrast */}
                    <div className='mt-20 pt-16 border-t border-zinc-100 flex flex-col lg:flex-row justify-between items-center gap-12 text-center lg:text-left'>
                        <div className="flex flex-col items-center lg:items-start gap-4">
                             <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-black text-white text-[8px] font-black rounded-lg uppercase tracking-widest">OFFICIAL NODE</span>
                                <p className='text-[9px] font-black uppercase tracking-[0.5em] text-black'>&copy; {new Date().getFullYear()} INBOX.LK CO.</p>
                             </div>
                             <div className="flex items-center gap-4 text-zinc-300">
                                 <ShieldCheck size={14} className="text-blue-600" />
                                 <span className="text-[7px] font-black uppercase tracking-[0.5em] text-black italic">AES-256 ENCRYPTED TRANSACTIONAL ARCHITECTURE ACTIVE</span>
                             </div>
                        </div>
                        
                        <div className='flex items-center gap-10 text-3xl text-black hover:text-blue-600 transition-all duration-700'>
                            <RiVisaLine className="hover:text-blue-600 transition-colors cursor-pointer" />
                            <RiMastercardLine className="hover:text-red-500 transition-colors cursor-pointer" />
                            <SiAmericanexpress className="text-2xl hover:text-blue-600 transition-colors cursor-pointer" />
                            <div className="px-3 py-1 bg-zinc-50 rounded-lg border border-zinc-100 group hover:border-blue-500/20 transition-all">
                                 <span className="text-[10px] font-black not-italic tracking-widest text-black group-hover:text-blue-600 transition-colors">KOKO</span>
                            </div>
                            <div className="px-3 py-1 bg-zinc-50 rounded-lg border border-zinc-100 group hover:border-indigo-600/20 transition-all">
                                 <span className="text-[10px] font-black not-italic tracking-widest text-black group-hover:text-indigo-600 transition-colors">MINTPAY</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer