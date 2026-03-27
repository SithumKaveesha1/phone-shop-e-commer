import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { RiVisaLine, RiMastercardLine } from 'react-icons/ri'
import { SiAmericanexpress } from 'react-icons/si'
import logo from '../../assets/logo.jpeg'
import InstagramGrid from './InstagramGrid'

const Footer = () => {
    return (
        <footer className='bg-black text-zinc-400 py-24 border-t border-zinc-800/50'>
            <div className='max-w-7xl mx-auto px-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16'>
                    
                    {/* Brand Section */}
                    <div className='space-y-8'>
                        <Link to='/' className='inline-block group'>
                            <img src={logo} alt="INBOX" className="h-14 w-auto invert brightness-0 group-hover:opacity-80 transition-all" />
                        </Link>
                        <p className='text-sm leading-relaxed max-w-xs font-medium'>
                            INBOX.LK is the #1 Apple Products Reseller in Sri Lanka and we strive to bring the Apple products you love closer to you.
                        </p>
                        <div className="space-y-4 pt-4">
                            <h4 className="text-black font-black text-xs uppercase tracking-widest">Subscribe us</h4>
                            <div className='flex space-x-3'>
                                <a href="#" className='w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all'><FaFacebook /></a>
                                <a href="#" className='w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all'><FaInstagram /></a>
                                <a href="#" className='w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all'><FaTiktok /></a>
                                <a href="#" className='w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all'><FaWhatsapp /></a>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-zinc-800/50">
                             <p className="text-[10px] font-bold text-zinc-500 leading-relaxed uppercase tracking-widest">
                                INBOX Apple Store - Ambalangoda Branch<br/>
                                No 78/2 Gale Road, Ambalangoda.
                             </p>
                        </div>
                    </div>

                    {/* Shop Categories */}
                    <div>
                        <h3 className='text-white font-black text-xs uppercase tracking-[0.2em] mb-8'>Categories</h3>
                        <ul className='space-y-4 text-sm font-bold'>
                            <li><Link to="/products?category=iPhone" className="hover:text-white transition-colors">iPhone</Link></li>
                            <li><Link to="/products?category=Mac" className="hover:text-white transition-colors">Mac</Link></li>
                            <li><Link to="/products?category=iPad" className="hover:text-white transition-colors">iPad</Link></li>
                            <li><Link to="/products?category=Watch" className="hover:text-white transition-colors">Watch</Link></li>
                            <li><Link to="/products?category=AirPods" className="hover:text-white transition-colors">AirPods</Link></li>
                            <li><Link to="/products?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className='text-white font-black text-xs uppercase tracking-[0.2em] mb-8'>Useful Links</h3>
                        <ul className='space-y-4 text-sm font-bold'>
                            <li><Link to="/products" className="hover:text-white transition-colors">Shop All</Link></li>
                            <li><Link to="/profile" className="hover:text-white transition-colors">Profile</Link></li>
                            <li><Link to="/orders" className="hover:text-white transition-colors">Orders</Link></li>
                            <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Our contacts</Link></li>
                            <li><Link to="/returns" className="hover:text-white transition-colors">Delivery & Return</Link></li>
                        </ul>
                    </div>

                    {/* Instagram Grid */}
                    <div className='space-y-8'>
                        <h3 className='text-white font-black text-xs uppercase tracking-[0.2em]'>Follow Us</h3>
                        <InstagramGrid />
                    </div>

                </div>

                {/* Bottom Section */}
                <div className='mt-16 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-6'>
                    <p className='text-xs font-medium'>&copy; {new Date().getFullYear()} INBOX.LK. All rights reserved.</p>
                    
                    <div className='flex items-center gap-6 text-2xl text-zinc-500 opacity-50 italic'>
                        <RiVisaLine />
                        <RiMastercardLine />
                        <SiAmericanexpress className="text-xl" />
                        <span className="text-[10px] font-bold not-italic border border-zinc-700 px-2 py-1 rounded">KOKO</span>
                        <span className="text-[10px] font-bold not-italic border border-zinc-700 px-2 py-1 rounded">MINTPAY</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer