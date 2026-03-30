import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, MapPin, CreditCard, Banknote, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { CheckoutStepper } from './Shipping';
import { clearCart } from '../redux/cartSlice';
import { toast } from 'sonner';

const OrderReview = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: cartItems } = useSelector(state => state.cart);
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress') || '{}');
    const paymentMethod = localStorage.getItem('paymentMethod') || 'card';

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handlePlaceOrder = () => {
        dispatch(clearCart());
        toast.success("Transaction Complete. Hardware Allocated.");
        navigate('/checkout/success');
        localStorage.removeItem('shippingAddress');
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-28 min-h-screen bg-[#f5f5f7] flex items-center justify-center relative overflow-hidden">
                <div className="relative z-10 text-center">
                    <h2 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-8">Your Cart is Empty</h2>
                    <Button 
                        onClick={() => navigate('/products')}
                        className="bg-blue-600 text-white font-black py-4 px-10 rounded-2xl hover:bg-blue-700 transition-all uppercase tracking-widest text-xs shadow-md"
                    >
                        Browse Products
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-20 min-h-screen bg-[#f5f5f7] flex flex-col items-center px-4 relative overflow-hidden">
            <div className="w-full max-w-6xl relative z-10">
                <CheckoutStepper currentStep={2} />

                <div className="grid grid-cols-1 lg:grid-cols-11 gap-12 mt-8">
                    {/* Left Column: Review Items and Shipping */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Shipping Info Card */}
                        <div className="bg-white rounded-[40px] p-10 border border-zinc-200 shadow-sm group">
                            <div className="flex items-center gap-5 mb-10">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 transition-colors">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-zinc-900 tracking-tighter">Shipping Details</h3>
                                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Delivery destination confirmed</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div>
                                    <p className="font-bold text-zinc-400 uppercase tracking-widest text-[9px] mb-3">Recipient</p>
                                    <p className="text-zinc-900 font-black text-lg tracking-tighter">{shippingAddress.firstname} {shippingAddress.lastname}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-400 uppercase tracking-widest text-[9px] mb-3">Contact Number</p>
                                    <p className="text-zinc-900 font-black text-lg tracking-tighter">{shippingAddress.phoneNo}</p>
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                    <p className="font-bold text-zinc-400 uppercase tracking-widest text-[9px] mb-3">Delivery Address</p>
                                    <p className="text-zinc-900 font-black text-lg tracking-tighter leading-tight max-w-md">
                                        {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.zipCode}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Card */}
                        <div className="bg-white rounded-[40px] p-10 border border-zinc-200 shadow-sm group">
                            <div className="flex items-center gap-5 mb-10">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100 transition-colors">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-zinc-900 tracking-tighter">Payment Method</h3>
                                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Selected payment option</p>
                                </div>
                            </div>
                            <div className="bg-zinc-50 p-6 rounded-3xl flex items-center justify-between border border-zinc-200 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-zinc-900 border border-zinc-200 shadow-sm">
                                        {paymentMethod === 'card' ? <CreditCard size={20} /> : <Banknote size={20} />}
                                    </div>
                                    <span className="font-black text-zinc-900 tracking-widest text-sm">
                                        {paymentMethod === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery'}
                                    </span>
                                </div>
                                <Button 
                                    variant="link" 
                                    onClick={() => navigate('/checkout/payment')}
                                    className="text-blue-600 font-black text-xs uppercase tracking-widest hover:text-blue-800 transition-colors"
                                >
                                    Change
                                </Button>
                            </div>
                        </div>

                        {/* Order Items List */}
                        <div className="bg-white rounded-[40px] p-10 border border-zinc-200 shadow-sm group">
                            <div className="flex items-center gap-5 mb-10">
                                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 border border-purple-100 transition-colors">
                                    <ShoppingBag size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-zinc-900 tracking-tighter">Order Items</h3>
                                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Review your products</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-zinc-50 border border-zinc-200 rounded-[32px] transition-all relative overflow-hidden">
                                        <div className="w-24 h-24 bg-white rounded-2xl p-4 flex-shrink-0 border border-zinc-100 shadow-sm transition-colors">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-grow text-center sm:text-left">
                                            <h4 className="font-black text-zinc-900 text-lg tracking-tighter leading-none mb-1">{item.name}</h4>
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Qty: <span className="text-zinc-900">{item.quantity}</span></p>
                                        </div>
                                        <p className="font-black text-zinc-900 text-xl tracking-tighter">
                                            LKR {(item.price * item.quantity).toLocaleString('en-LK')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Checkout Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-[40px] p-10 border border-zinc-200 sticky top-32 shadow-xl relative overflow-hidden group">
                            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-zinc-100">
                                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                                    <CheckCircle2 size={22} />
                                </div>
                                <h3 className="text-xl font-black text-zinc-900 tracking-tighter">Order Summary</h3>
                            </div>

                            <div className="space-y-6 mb-12">
                                <div className="flex justify-between text-[11px] font-black text-zinc-500 uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <span className="text-zinc-900">LKR {totalAmount.toLocaleString('en-LK')}</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-black text-zinc-500 uppercase tracking-widest">
                                    <span>Shipping</span>
                                    <span className="text-emerald-600">Free</span>
                                </div>
                                <div className="pt-8 border-t border-zinc-100 flex flex-col gap-2">
                                    <span className="text-zinc-500 font-black text-[10px] uppercase tracking-widest">Total Amount</span>
                                    <span className="text-4xl font-black text-blue-600 tracking-tighter">LKR {totalAmount.toLocaleString('en-LK')}</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Button 
                                    onClick={handlePlaceOrder}
                                    className="w-full h-20 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-3xl shadow-lg flex flex-col items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <span className="uppercase tracking-[0.2em] text-[10px] mb-1 font-black opacity-80">Final Step</span>
                                    <div className="flex items-center gap-3">
                                        <span className="uppercase tracking-widest text-sm font-black">Place Order</span>
                                        <ArrowRight size={20} />
                                    </div>
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    onClick={() => navigate('/checkout/payment')}
                                    className="w-full text-zinc-500 font-black uppercase tracking-widest hover:text-zinc-900 hover:bg-zinc-100 rounded-2xl h-14 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ChevronLeft size={18} />
                                    Back to Payment
                                </Button>
                            </div>

                            <div className="mt-10 p-5 bg-zinc-50 rounded-3xl flex items-center gap-4 border border-zinc-200">
                                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500/50"></span>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Secure SSL Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;
