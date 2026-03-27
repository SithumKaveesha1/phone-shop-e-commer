import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp, FaTiktok } from 'react-icons/fa'
import { RiVisaLine, RiMastercardLine } from 'react-icons/ri'
import { SiAmericanexpress } from 'react-icons/si'
import logo from '../../assets/logo.png'

const Footer = () => {
    return (
        <footer className='bg-black text-zinc-400 py-16 border-t border-zinc-800/50'>
            <div className='max-w-7xl mx-auto px-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
                    
                    {/* Brand Section */}
                    <div className='space-y-6'>
                        <Link to='/' className='inline-block group'>
                            <img src={logo} alt="INBOX" className="h-14 w-auto invert brightness-0 group-hover:opacity-80 transition-opacity" />
                        </Link>
                        <p className='text-sm leading-relaxed max-w-xs'>
                            Elevate your digital life with premium technology. We provide the latest authentic Apple products and premium accessories with unmatched service.
                        </p>
                        <div className='flex space-x-4 mt-6'>
                            <FaFacebook className='text-xl cursor-pointer hover:text-white transition-colors' />
                            <FaInstagram className='text-xl cursor-pointer hover:text-white transition-colors' />
                            <FaTiktok className='text-xl cursor-pointer hover:text-white transition-colors' />
                            <FaWhatsapp className='text-xl cursor-pointer hover:text-white transition-colors' />
                        </div>
                    </div>

                    {/* Shop Categories */}
                    <div>
                        <h3 className='text-white font-bold text-lg mb-6 uppercase tracking-widest text-sm'>Shop</h3>
                        <ul className='space-y-4 text-sm font-medium'>
                            <li><Link to="/products?category=iPhone" className="hover:text-white transition-colors">iPhone</Link></li>
                            <li><Link to="/products?category=Mac" className="hover:text-white transition-colors">Mac</Link></li>
                            <li><Link to="/products?category=iPad" className="hover:text-white transition-colors">iPad</Link></li>
                            <li><Link to="/products?category=Watch" className="hover:text-white transition-colors">Watch</Link></li>
                            <li><Link to="/products?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className='text-white font-bold text-lg mb-6 uppercase tracking-widest text-sm'>Support</h3>
                        <ul className='space-y-4 text-sm font-medium'>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Warranty Info</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className='space-y-6'>
                        <h3 className='text-white font-bold text-lg uppercase tracking-widest text-sm'>Stay Connected</h3>
                        <p className='text-sm'>Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className='flex flex-col gap-3'>
                            <input 
                                type="email" 
                                placeholder='Email Address' 
                                className='w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-white focus:outline-none focus:border-primary transition-colors text-sm'
                            />
                            <button type='submit' className='bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all text-xs uppercase tracking-widest'>
                                Subscribe
                            </button>
                        </form>
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