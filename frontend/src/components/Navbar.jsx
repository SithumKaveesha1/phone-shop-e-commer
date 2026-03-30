import { ShoppingCart, LogOut, User, Search, Menu, Zap } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { Button } from './ui/button'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
import logo from '../assets/logo.jpeg'

const Navbar = () => {
    const { user } = useSelector(state => state.user);
    const { items: cartItems } = useSelector(state => state.cart);
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const currentToken = localStorage.getItem("accessToken");
            await axios.post(`http://localhost:8005/api/users/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${currentToken}`
                }
            })
            
            toast.success("Logged out successfully");
        } catch (error) {
            console.error("Logout server-side failed:", error);
        } finally {
            localStorage.removeItem("accessToken");
            dispatch(setUser(null));
            navigate("/login");
        }
    }

    const categories = [
        { name: 'Home', path: '/' },
        { name: 'iPhone', path: '/products?category=iPhone' },
        { name: 'Mac', path: '/products?category=Mac' },
        { name: 'iPad', path: '/products?category=iPad' },
        { name: 'Watch', path: '/products?category=Watch' },
        { name: 'AirPods', path: '/products?category=AirPods' },
        { name: 'Accessories', path: '/products?category=Accessories' },
    ];

    return (
        <header className='bg-black/95 backdrop-blur-3xl sticky top-0 w-full z-50 border-b border-white/10 shadow-2xl'>
            {/* Top Accent Gradient Bar */}
            <div className="h-[3px] w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-[0_4px_20px_rgba(37,99,235,0.4)]" />
            
            <div className='max-w-[1400px] mx-auto flex justify-between items-center py-5 px-8'>
                {/* Logo Section - Ringed Logo Pops on Black */}
                <div>
                    <Link to="/" className="flex items-center hover:scale-110 transition-transform duration-500">
                        <img 
                            src={logo} 
                            alt="INBOX APPLE STORE" 
                            className="h-16 w-16 object-contain rounded-full border-[4px] border-blue-600 p-0.5 bg-white shadow-2xl shadow-blue-500/40"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation - High-Contrast White/Silver Links */}
                <nav className='hidden lg:flex gap-10 items-center'>
                    <ul className='flex items-center gap-10 font-black text-white/50 text-[10px] uppercase tracking-[0.4em]'>
                        {categories.map((cat) => (
                            <Link 
                                key={cat.name} 
                                to={cat.path} 
                                className="hover:text-blue-500 transition-all duration-300 relative group"
                            >
                                <li className="relative z-10 group-hover:tracking-[0.5em] transition-all">{cat.name}</li>
                                <div className="absolute inset-x-0 -bottom-2 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        ))}
                    </ul>
                </nav>
                
                {/* Icons & Actions - Glow on Dark */}
                <div className='flex items-center gap-6'>
                    <button className='p-2 text-white/30 hover:text-blue-500 transition-all active:scale-90 lg:block hidden'>
                        <Search size={22} strokeWidth={2.5} />
                    </button>

                    <Link to="/cart" className='relative p-2 text-white/30 hover:text-blue-500 transition-all group'>
                         <ShoppingCart size={22} strokeWidth={2.5} className='group-hover:scale-110 transition-transform' />
                         {cartItems.length > 0 && (
                            <span className='absolute -top-1 -right-1 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg shadow-blue-500/50 animate-in zoom-in duration-300'>
                                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                         )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-6 ml-4 pl-6 border-l border-white/10">
                             <Link title="Profile" to="/profile" className='text-white/60 hover:text-blue-500 transition-all flex items-center gap-3 group'>
                                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
                                    <User size={18} className="text-white" />
                                </div>
                                <span className="text-[10px] font-black hidden xl:block uppercase tracking-[0.2em]">{user.firstname}</span>
                            </Link>
                            {user?.role === 'admin' && (
                                <Link to="/admin/add-product" className="hidden xl:block">
                                    <Button className="h-10 bg-blue-600 hover:bg-white hover:text-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl px-6 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20">
                                        Launch Hub
                                    </Button>
                                </Link>
                            )}
                            <button 
                                onClick={logoutHandler}
                                className='p-2 text-white/20 hover:text-red-500 transition-all active:scale-90'
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="ml-4">
                            <Button className='bg-blue-600 text-white hover:bg-white hover:text-blue-600 h-11 px-8 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/20'>
                                Auth Access
                            </Button>
                        </Link>
                    )}

                    {/* Mobile Menu Toggle - Styled for Dark Mode */}
                    <button 
                        className="lg:hidden p-3 bg-white/5 rounded-xl text-white/60 border border-white/10"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer - Futuristic Dark Layer */}
            {isMenuOpen && (
                <div className="lg:hidden bg-zinc-950 border-t border-white/5 p-8 animate-in slide-in-from-top duration-700">
                    <ul className="flex flex-col gap-6 text-[12px] font-black uppercase tracking-[0.4em] text-white/40">
                        {categories.map((cat) => (
                            <Link key={cat.name} to={cat.path} onClick={() => setIsMenuOpen(false)} className="hover:text-blue-500 py-3 border-b border-white/5 transition-colors flex items-center justify-between group">
                                <li>{cat.name}</li>
                                <Zap size={14} className="opacity-0 group-hover:opacity-100 transition-all text-blue-500" />
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    )
}

export default Navbar