import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: cartItems } = useSelector(state => state.cart);

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleQuantityChange = (id, currentQty, delta) => {
        const newQty = currentQty + delta;
        if (newQty > 0) {
            dispatch(updateQuantity({ id, quantity: newQty }));
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f7] pt-24 pb-20 relative overflow-hidden px-4">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex items-center gap-6 mb-12">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-3 bg-white rounded-2xl hover:bg-zinc-50 transition-all text-zinc-500 border border-zinc-200 shadow-sm active:scale-90"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Shopping Workspace</h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-[40px] border border-zinc-200 p-20 flex flex-col items-center justify-center text-center mt-4 shadow-xl">
                        <div className="w-32 h-32 bg-blue-500/5 rounded-[32px] flex items-center justify-center mb-10 border border-blue-500/10">
                            <ShoppingCart size={48} className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
                        </div>
                        <h2 className="text-3xl font-black text-zinc-900 mb-6 uppercase tracking-wider">Your bag is empty.</h2>
                        <p className="text-zinc-500 mb-12 max-w-sm text-lg font-medium leading-relaxed uppercase tracking-tighter">
                            Your bag is craving some performance hardware.
                        </p>
                        <button
                            onClick={() => navigate('/products')}
                            className="bg-blue-600 text-white font-black py-5 px-14 rounded-2xl hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/20 active:scale-95 uppercase tracking-widest text-xs"
                        >
                            Explore Interface
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-11 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-7 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item._id} className="bg-white rounded-[32px] border border-zinc-200 p-6 flex flex-col sm:flex-row items-center gap-8 hover:border-blue-500/30 hover:shadow-xl transition-all group relative overflow-hidden shadow-sm">
                                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    {/* Item Image */}
                                    <div className="w-32 h-32 bg-zinc-50 rounded-2xl p-4 flex-shrink-0 border border-zinc-100">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    </div>

                                    {/* Item Info */}
                                    <div className="flex-grow min-w-0 text-center sm:text-left">
                                        <h3 className="font-black text-zinc-900 truncate text-xl uppercase tracking-tighter mb-1 leading-tight">{item.name}</h3>
                                        <p className="text-blue-600 font-black text-sm uppercase tracking-widest mb-4">LKR {item.price.toLocaleString('en-LK')}</p>
                                        
                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-center sm:justify-start gap-4">
                                            <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl p-1">
                                                <button 
                                                    onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                                                    className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-zinc-400 hover:text-blue-600"
                                                >
                                                    <Minus size={18} />
                                                </button>
                                                <span className="w-10 text-center font-black text-lg text-zinc-900">{item.quantity}</span>
                                                <button 
                                                    onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                                                    className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-zinc-400 hover:text-blue-600"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Actions */}
                                    <div className="flex flex-col items-center sm:items-end gap-4 flex-shrink-0">
                                        <button 
                                            onClick={() => dispatch(removeFromCart(item._id))}
                                            className="p-3 text-zinc-400 hover:text-red-500 bg-zinc-50 border border-zinc-200 hover:bg-red-50 transition-all rounded-xl active:scale-90"
                                        >
                                            <Trash2 size={22} />
                                        </button>
                                        <p className="font-black text-zinc-900 text-lg tracking-tighter">
                                            LKR {(item.price * item.quantity).toLocaleString('en-LK')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-4">
                            <div className="bg-white rounded-[40px] border border-zinc-200 p-10 sticky top-28 shadow-xl">
                                <h2 className="text-xl font-black text-zinc-900 mb-8 border-b border-zinc-100 pb-6 uppercase tracking-[0.2em]">Summary</h2>
                                
                                <div className="space-y-6 mb-10">
                                    <div className="flex justify-between text-zinc-500 uppercase tracking-widest text-[11px] font-black">
                                        <span>Subtotal</span>
                                        <span className="text-zinc-900">LKR {totalAmount.toLocaleString('en-LK')}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-500 uppercase tracking-widest text-[11px] font-black">
                                        <span>Shipping</span>
                                        <span className="text-blue-600">Complimentary</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-900 font-black text-2xl pt-8 border-t border-zinc-100 tracking-tighter">
                                        <span>Total</span>
                                        <span className="text-blue-600">LKR {totalAmount.toLocaleString('en-LK')}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => navigate('/checkout/shipping')}
                                    className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 hover:scale-105 transition-all shadow-xl active:scale-[0.98] uppercase tracking-[0.2em] text-[11px]"
                                >
                                    Verify & Checkout
                                </button>
                                
                                <p className="text-center text-[10px] font-black text-zinc-400 mt-8 uppercase tracking-widest">
                                    Encrypted Checkout • INBOX Payments
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
