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
            <div className="pt-28 min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
                <div className="mesh-glow bg-blue-600/10 w-[600px] h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[150px]" />
                <div className="relative z-10 text-center">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-8">System Buffer Empty</h2>
                    <Button 
                        onClick={() => navigate('/products')}
                        className="bg-blue-600 text-white font-black py-4 px-10 rounded-2xl hover:bg-blue-500 transition-all uppercase tracking-widest text-xs"
                    >
                        Initialize Interface
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-20 min-h-screen bg-black flex flex-col items-center px-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="mesh-glow bg-blue-600/10 w-[800px] h-[800px] -top-40 -left-60 opacity-30 blur-[180px] animate-pulse" />
            <div className="mesh-glow bg-purple-600/10 w-[600px] h-[600px] bottom-0 right-0 opacity-20 blur-[150px]" />

            <div className="w-full max-w-6xl relative z-10">
                <CheckoutStepper currentStep={2} />

                <div className="grid grid-cols-1 lg:grid-cols-11 gap-12">
                    {/* Left Column: Review Items and Shipping */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Shipping Info Card */}
                        <div className="glass-card rounded-[40px] p-10 border border-white/5 shadow-2xl group">
                            <div className="flex items-center gap-5 mb-10">
                                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Delivery Coordinates</h3>
                                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Operational destination locked</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div>
                                    <p className="font-black text-zinc-600 uppercase tracking-widest text-[9px] mb-3 opacity-50">Authorized Recipient</p>
                                    <p className="text-white font-black text-lg tracking-tighter uppercase">{shippingAddress.firstname} {shippingAddress.lastname}</p>
                                </div>
                                <div>
                                    <p className="font-black text-zinc-600 uppercase tracking-widest text-[9px] mb-3 opacity-50">Secure Communication Link</p>
                                    <p className="text-white font-black text-lg tracking-tighter">{shippingAddress.phoneNo}</p>
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                    <p className="font-black text-zinc-600 uppercase tracking-widest text-[9px] mb-3 opacity-50">Physical Address Data</p>
                                    <p className="text-white font-black text-lg tracking-tighter leading-tight uppercase max-w-md">
                                        {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.zipCode}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Card */}
                        <div className="glass-card rounded-[40px] p-10 border border-white/5 shadow-2xl group">
                            <div className="flex items-center gap-5 mb-10">
                                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Transfer Protocol</h3>
                                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Verified payment module</p>
                                </div>
                            </div>
                            <div className="bg-white/5 p-6 rounded-3xl flex items-center justify-between border border-white/5 group-hover:border-blue-500/20 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-blue-500 border border-white/5 shadow-inner">
                                        {paymentMethod === 'card' ? <CreditCard size={20} /> : <Banknote size={20} />}
                                    </div>
                                    <span className="font-black text-white uppercase tracking-widest text-sm">
                                        {paymentMethod === 'card' ? 'Quantum Digital Ledger' : 'Physical Hardware Exchange'}
                                    </span>
                                </div>
                                <Button 
                                    variant="link" 
                                    onClick={() => navigate('/checkout/payment')}
                                    className="text-blue-500 font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
                                >
                                    Re-Select
                                </Button>
                            </div>
                        </div>

                        {/* Order Items List */}
                        <div className="glass-card rounded-[40px] p-10 border border-white/5 shadow-2xl group">
                            <div className="flex items-center gap-5 mb-10">
                                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                                    <ShoppingBag size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Unit Allocation</h3>
                                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Buffered hardware inventory</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 p-6 glass-card border border-white/5 rounded-[32px] hover:border-white/10 transition-all relative overflow-hidden group/item">
                                        <div className="absolute inset-y-0 left-0 w-[2px] bg-blue-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                        <div className="w-24 h-24 bg-white/5 rounded-2xl p-4 flex-shrink-0 border border-white/5 group-hover/item:bg-white/10 transition-colors">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain brightness-110" />
                                        </div>
                                        <div className="flex-grow text-center sm:text-left">
                                            <h4 className="font-black text-white text-lg uppercase tracking-tighter leading-none mb-1">{item.name}</h4>
                                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">Quantity: <span className="text-blue-500">{item.quantity} Units</span></p>
                                        </div>
                                        <p className="font-black text-white text-xl tracking-tighter">
                                            LKR {(item.price * item.quantity).toLocaleString('en-LK')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Checkout Summary */}
                    <div className="lg:col-span-4">
                        <div className="glass-card rounded-[40px] p-10 border border-white/5 sticky top-32 shadow-2xl relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-all duration-1000" />
                            
                            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-white/5">
                                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-[0_10px_30px_rgba(37,99,235,0.3)]">
                                    <CreditCard size={22} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Verification</h3>
                            </div>

                            <div className="space-y-6 mb-12">
                                <div className="flex justify-between text-[11px] font-black text-zinc-500 uppercase tracking-widest">
                                    <span>Base Allocation</span>
                                    <span className="text-white">LKR {totalAmount.toLocaleString('en-LK')}</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-black text-zinc-500 uppercase tracking-widest">
                                    <span>Logistics Fee</span>
                                    <span className="text-blue-500">Complimentary</span>
                                </div>
                                <div className="pt-8 border-t border-white/5 flex flex-col gap-2">
                                    <span className="text-zinc-600 font-black text-[10px] uppercase tracking-widest">Aggregate Total</span>
                                    <span className="text-4xl font-black text-gradient-blue tracking-tighter">LKR {totalAmount.toLocaleString('en-LK')}</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Button 
                                    onClick={handlePlaceOrder}
                                    className="w-full h-20 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-black rounded-3xl shadow-2xl shadow-blue-500/20 flex flex-col items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98] group/btn"
                                >
                                    <span className="uppercase tracking-[0.2em] text-[10px] mb-1 font-black opacity-80">Authorize System Purchase</span>
                                    <div className="flex items-center gap-3">
                                        <span className="uppercase tracking-widest text-xs font-black">Commit Order</span>
                                        <CheckCircle2 size={20} className="group-hover/btn:scale-125 transition-transform" />
                                    </div>
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    onClick={() => navigate('/checkout/payment')}
                                    className="w-full text-zinc-500 font-black uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-3"
                                >
                                    <ChevronLeft size={18} />
                                    Adjust Protocols
                                </Button>
                            </div>

                            <div className="mt-10 p-5 bg-white/5 rounded-3xl flex items-center gap-4 border border-white/5">
                                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping opacity-75"></span>
                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Quantum Security Active • SSL LOCKED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;
