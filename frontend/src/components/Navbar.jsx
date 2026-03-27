import { ShoppingCart, LogOut, User, Search, Menu } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import logo from '../assets/logo.jpeg'

const Navbar = () => {
    const { user } = useSelector(state => state.user);
    const { items: cartItems } = useSelector(state => state.cart);
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8005/api/users/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            
            if (res.data.success) {
                toast.success(res.data.message);
                localStorage.removeItem("accessToken");
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    const categories = [
        { name: 'iPhone', path: '/products?category=iPhone' },
        { name: 'Mac', path: '/products?category=Mac' },
        { name: 'iPad', path: '/products?category=iPad' },
        { name: 'Watch', path: '/products?category=Watch' },
        { name: 'AirPods', path: '/products?category=AirPods' },
        { name: 'Accessories', path: '/products?category=Accessories' },
    ];

    return (
        <header className='bg-black/95 backdrop-blur-md sticky top-0 w-full z-50 border-b border-zinc-800/50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center py-3 px-6'>
                {/* Logo Section */}
                <div>
                    <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
                        <img src={logo} alt="INBOX" className="h-16 w-auto mix-blend-screen rounded-full overflow-hidden" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className='hidden lg:flex gap-8 items-center'>
                    <ul className='flex items-center gap-8 font-semibold text-zinc-400 text-sm uppercase tracking-widest'>
                        {categories.map((cat) => (
                            <Link 
                                key={cat.name} 
                                to={cat.path} 
                                className="hover:text-white transition-colors relative group"
                            >
                                <li>{cat.name}</li>
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </ul>
                </nav>
                
                {/* Icons & Actions */}
                <div className='flex items-center gap-3'>
                    <button className='p-2 text-zinc-400 hover:text-white transition-colors lg:block hidden'>
                        <Search size={22} />
                    </button>

                    <Link to="/cart" className='relative p-2 text-zinc-400 hover:text-white transition-colors group'>
                         <ShoppingCart size={22} className='group-hover:scale-110 transition-transform' />
                         {cartItems.length > 0 && (
                            <span className='absolute top-0 right-0 bg-primary text-black text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(249,115,22,0.4)]'>
                                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                         )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4 ml-2">
                             <Link title="Profile" to="/profile" className='text-zinc-400 hover:text-white transition-colors flex items-center gap-2'>
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                                    <User size={18} />
                                </div>
                                <span className="text-xs font-bold hidden xl:block uppercase tracking-wider">{user.firstname}</span>
                            </Link>
                            {user?.role === 'admin' && (
                                <Link to="/admin/add-product" className="hidden xl:block">
                                    <Button variant="outline" className="h-9 border-zinc-700 hover:bg-zinc-800 text-xs font-bold uppercase tracking-widest text-primary border-primary/20">
                                        Add Product
                                    </Button>
                                </Link>
                            )}
                            <button 
                                onClick={logoutHandler}
                                className='p-2 text-zinc-500 hover:text-red-500 transition-colors'
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="ml-2">
                            <Button className='bg-white text-black hover:bg-zinc-200 h-9 px-6 rounded-full font-bold text-xs uppercase tracking-widest transition-all'>
                                Sign In
                            </Button>
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="lg:hidden p-2 text-zinc-400"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="lg:hidden bg-zinc-950 border-t border-zinc-800 p-6 animate-in slide-in-from-top duration-300">
                    <ul className="flex flex-col gap-4 text-lg font-bold text-zinc-300">
                        {categories.map((cat) => (
                            <Link key={cat.name} to={cat.path} onClick={() => setIsMenuOpen(false)}>
                                <li className="hover:text-primary">{cat.name}</li>
                            </Link>
                        ))}
                        <hr className="border-zinc-800 my-2" />
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)}><li>Contact Us</li></Link>
                    </ul>
                </div>
            )}
        </header>
    )
}

export default Navbar