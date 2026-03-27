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
        <div className="min-h-screen bg-[#f8f9fa] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-white rounded-full transition-colors text-gray-600"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Your Shopping Cart</h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 flex flex-col items-center justify-center text-center mt-4">
                        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-8 animate-pulse">
                            <ShoppingCart size={48} className="text-pink-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Currently Empty</h2>
                        <p className="text-gray-500 mb-10 max-w-sm text-lg">
                            Explore our latest electronics and find something great!
                        </p>
                        <button
                            onClick={() => navigate('/products')}
                            className="bg-pink-600 text-white font-semibold py-4 px-10 rounded-xl hover:bg-pink-700 transition-all shadow-lg hover:shadow-pink-500/40 active:scale-95"
                        >
                            Start Shopping Now
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-6 hover:shadow-md transition-shadow group">
                                    {/* Item Image */}
                                    <div className="w-24 h-24 bg-gray-50 rounded-xl p-2 flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>

                                    {/* Item Info */}
                                    <div className="flex-grow min-w-0">
                                        <h3 className="font-bold text-gray-800 truncate text-lg">{item.name}</h3>
                                        <p className="text-pink-600 font-bold mt-1">LKR {item.price.toLocaleString('en-LK')}</p>
                                        
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3 mt-4">
                                            <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-gray-50">
                                                <button 
                                                    onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                                                    className="p-1 hover:bg-white rounded transition-colors text-gray-500"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                                <button 
                                                    onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                                                    className="p-1 hover:bg-white rounded transition-colors text-gray-500"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Actions */}
                                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                                        <button 
                                            onClick={() => dispatch(removeFromCart(item._id))}
                                            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-lg"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                        <p className="font-black text-gray-900">
                                            LKR {(item.price * item.quantity).toLocaleString('en-LK')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>LKR {totalAmount.toLocaleString('en-LK')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 font-bold text-lg pt-4 border-t border-gray-100">
                                        <span>Total</span>
                                        <span className="text-pink-600">LKR {totalAmount.toLocaleString('en-LK')}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => navigate('/checkout/shipping')}
                                    className="w-full bg-pink-600 text-white font-bold py-4 rounded-xl hover:bg-pink-700 transition-all shadow-lg hover:shadow-pink-500/30 active:scale-[0.98]"
                                >
                                    Proceed to Checkout
                                </button>
                                
                                <p className="text-center text-xs text-gray-400 mt-6">
                                    Secure checkout powered by EKART Payments
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
