import { ShoppingCart, LogOut, User, Search, Menu, Zap, Plus } from 'lucide-react'
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

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${searchQuery}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    }

    return (
        <header className='bg-black/80 backdrop-blur-[60px] sticky top-0 w-full z-[100] border-b border-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.8)]'>
            {/* Holographic Top Accent */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-600 to-transparent shadow-[0_0_20px_rgba(37,99,235,1)] animate-pulse" />
            
            <div className='max-w-[1500px] mx-auto flex justify-between items-center py-6 px-4 md:px-12 relative'>
                
                {/* Logo Section - Augmented Design */}
                <div className="flex-1">
                    <Link to="/" className="inline-flex items-center group relative">
                        <div className="absolute inset-0 bg-blue-600/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <img 
                            src={logo} 
                            alt="INBOX" 
                            className="h-14 w-14 object-contain rounded-full border-[3px] border-blue-600 p-0.5 bg-white shadow-[0_10px_30px_rgba(0,0,100,0.5)] group-hover:rotate-12 transition-transform duration-700 relative z-10"
                        />
                        <div className="ml-4 flex flex-col items-start relative z-10">
                            <span className="text-[12px] font-black text-white uppercase tracking-[0.5em] leading-none mb-1 group-hover:text-blue-500 transition-colors">INBOX.LK</span>
                            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.4em] leading-none">Apple Store Co.</span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation - Minimalist High-End */}
                <nav className='hidden lg:contents'>
                    <ul className='flex items-center gap-12 font-black text-white/40 text-[9px] uppercase tracking-[0.6em] transition-all duration-700'>
                        {categories.map((cat) => (
                            <Link 
                                key={cat.name} 
                                to={cat.path} 
                                className="hover:text-white transition-all duration-500 relative group"
                            >
                                <li className="relative z-10 group-hover:scale-110 transition-transform">{cat.name}</li>
                                <div className="absolute inset-x-[-10px] -bottom-3 h-[1px] bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </Link>
                        ))}
                    </ul>
                </nav>
                
                {/* Icons & Actions Section */}
                <div className='flex-1 flex items-center justify-end gap-6 md:gap-8'>
                    {/* Futuristic Expanding Search */}
                    <div className="relative flex items-center">
                        <form 
                            onSubmit={handleSearch}
                            className={`flex items-center bg-white/5 border border-white/10 rounded-full transition-all duration-700 overflow-hidden ${isSearchOpen ? 'w-[200px] md:w-[350px] px-6' : 'w-0 border-transparent opacity-0'}`}
                        >
                            <input 
                                type="text"
                                placeholder="Sync Hardware..."
                                className="bg-transparent border-none outline-none text-white text-[10px] font-black uppercase tracking-[0.3em] w-full h-12 placeholder:text-zinc-700"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="text-blue-500 hover:scale-125 transition-transform">
                                <Search size={16} />
                            </button>
                        </form>
                        
                        <button 
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className={`p-3 rounded-full transition-all duration-500 ${isSearchOpen ? 'bg-blue-600 text-white translate-x-4' : 'text-white/30 hover:text-blue-500 hover:bg-white/5'}`}
                        >
                            {isSearchOpen ? <Zap size={18} className="animate-pulse" /> : <Search size={22} strokeWidth={2.5} />}
                        </button>
                    </div>

                    <Link to="/cart" className='relative p-3 text-white/30 hover:text-blue-500 transition-all group overflow-visible'>
                         <ShoppingCart size={22} strokeWidth={2.5} className='group-hover:scale-110 transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' />
                         {cartItems.length > 0 && (
                            <span className='absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-[0_5px_20px_rgba(59,130,246,0.8)] animate-in zoom-in-50 duration-500 border border-black'>
                                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                         )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-6 md:gap-8 ml-4 pl-8 border-l border-white/5">
                             <Link title="Profile" to="/profile" className='text-white/60 hover:text-blue-500 transition-all flex items-center gap-4 group'>
                                <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                                    <User size={18} className="text-white" />
                                </div>
                                <div className="hidden xl:flex flex-col items-start leading-none gap-1">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">{user.firstname}</span>
                                    <span className="text-[6px] font-black text-zinc-600 uppercase tracking-widest">{user?.role} node</span>
                                </div>
                            </Link>

                            {user?.role === 'admin' && (
                                <Link 
                                    to="/admin/add-product" 
                                    className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-white/40 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-600/5 transition-all shadow-2xl"
                                    title="Initialize Hardware"
                                >
                                    <Plus size={20} strokeWidth={3} />
                                </Link>
                            )}
                            
                            <button 
                                onClick={logoutHandler}
                                className='p-3 text-red-400/70 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all duration-500 active:scale-90'
                                title="Log Out"
                            >
                                <LogOut size={20} strokeWidth={2.5} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="ml-4">
                            <Button className='bg-blue-600 text-white hover:bg-white hover:text-blue-600 h-14 px-10 rounded-2xl font-black text-[9px] uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(59,130,246,0.3)] border border-transparent hover:border-blue-500'>
                                Access Node
                            </Button>
                        </Link>
                    )}

                    {/* Mobile Menu Interaction */}
                    <button 
                        className="lg:hidden p-4 bg-white/5 rounded-2xl text-white/50 border border-white/10 hover:bg-blue-600 hover:text-white transition-all shadow-2xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <LogOut className="rotate-90" size={20} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer - Augmented Interior */}
            {isMenuOpen && (
                <div className="lg:hidden bg-zinc-950 border-t border-white/5 p-12 animate-in slide-in-from-top-12 duration-1000 fixed inset-x-0 h-screen mt-[-1px]">
                    <div className="absolute inset-0 bg-blue-600/5 blur-[150px] pointer-events-none" />
                    <ul className="flex flex-col gap-10 text-[14px] font-black uppercase tracking-[0.6em] text-white/30 relative z-10">
                        {categories.map((cat, idx) => (
                            <Link 
                                key={cat.name} 
                                to={cat.path} 
                                onClick={() => setIsMenuOpen(false)} 
                                className="hover:text-blue-500 group flex items-center justify-between border-b border-white/5 pb-8 transition-all animate-in fade-in slide-in-from-left-8"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <li>{cat.name}</li>
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-blue-500">
                                    <Zap size={18} className="text-blue-500" />
                                </div>
                            </Link>
                        ))}

                        {/* Mobile Auth Actions */}
                        {user ? (
                            <button 
                                onClick={() => { setIsMenuOpen(false); logoutHandler(); }} 
                                className="w-full text-left hover:text-red-500 text-red-500/70 group flex items-center justify-between border-b border-white/5 pb-8 transition-all animate-in fade-in slide-in-from-left-8 mt-4"
                                style={{ animationDelay: `${categories.length * 0.1}s` }}
                            >
                                <li>LOG OUT</li>
                                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center transition-all border border-red-500/20 group-hover:bg-red-500 group-hover:border-red-500 shadow-sm">
                                    <LogOut size={18} className="text-red-500 group-hover:text-white" />
                                </div>
                            </button>
                        ) : (
                            <Link 
                                to="/login" 
                                onClick={() => setIsMenuOpen(false)} 
                                className="w-full text-left hover:text-blue-500 text-white/50 group flex items-center justify-between border-b border-white/5 pb-8 transition-all animate-in fade-in slide-in-from-left-8 mt-4"
                                style={{ animationDelay: `${categories.length * 0.1}s` }}
                            >
                                <li>LOGIN (ACCESS NODE)</li>
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-all border border-blue-500/20 group-hover:bg-blue-600 group-hover:border-blue-500 shadow-sm">
                                    <User size={18} className="text-blue-500 group-hover:text-white" />
                                </div>
                            </Link>
                        )}
                        <li className="mt-12 text-[10px] text-zinc-700 tracking-[0.8em] font-black text-center">SYNKED ECOSYSTEM V1.0</li>
                    </ul>
                </div>
            )}
        </header>
    )
}

export default Navbar