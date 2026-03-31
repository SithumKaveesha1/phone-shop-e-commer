import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, MapPin, CreditCard, Banknote, ChevronLeft, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { CheckoutStepper } from './Shipping';
import { clearCart } from '../redux/cartSlice';
import { toast } from 'sonner';

const OrderReview = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: cartItems } = useSelector(state => state.cart);
    const shippingAddress = typeof window !== 'undefined' 
        ? JSON.parse(localStorage.getItem('shippingAddress') || '{}') 
        : {};
    const paymentMethod = typeof window !== 'undefined' 
        ? localStorage.getItem('paymentMethod') || 'card' 
        : 'card';

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const [cardDetails, setCardDetails] = React.useState({
        bank: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    
    const [saveCard, setSaveCard] = React.useState(false);

    React.useEffect(() => {
        const saved = localStorage.getItem('savedCard');
        if (saved) {
            setCardDetails(JSON.parse(saved));
            setSaveCard(true);
        }
    }, []);

    const isCardValid = () => {
        if (paymentMethod !== 'card') return true;
        const { bank, cardNumber, expiry, cvv } = cardDetails;
        return (
            bank !== '' && 
            cardNumber.replace(/\s/g, '').length === 16 && 
            expiry.length === 5 && 
            cvv.length === 3
        );
    };

    const banks = [
        "Commercial Bank",
        "Sampath Bank",
        "Hatton National Bank (HNB)",
        "Bank of Ceylon (BOC)",
        "People's Bank",
        "Seylan Bank",
        "Nations Trust Bank (NTB)",
        "DFCC Bank",
        "Pan Asia Bank",
        "Union Bank"
    ];

    const handlePlaceOrder = () => {
        if (!isCardValid()) {
            toast.error("Please complete all card details correctly.");
            return;
        }

        if (paymentMethod === 'koko') {
            toast.promise(
                new Promise((resolve) => setTimeout(resolve, 2000)),
                {
                    loading: 'Establishing Koko Ecosystem connection...',
                    success: 'Redirecting to Koko Ecosystem...',
                    error: 'Connection failed.',
                }
            );
            
            setTimeout(() => {
                dispatch(clearCart());
                navigate('/checkout/success');
                localStorage.removeItem('shippingAddress');
            }, 3000);
            return;
        }

        if (saveCard && paymentMethod === 'card') {
            localStorage.setItem('savedCard', JSON.stringify(cardDetails));
        } else if (!saveCard) {
            localStorage.removeItem('savedCard');
        }

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
                            <div className="bg-zinc-50 p-6 rounded-3xl flex items-center justify-between border border-zinc-200 transition-all mb-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-zinc-900 border border-zinc-200 shadow-sm">
                                        {paymentMethod === 'card' ? <CreditCard size={20} /> : paymentMethod === 'koko' ? <Zap size={20} className="text-emerald-500" /> : <Banknote size={20} />}
                                    </div>
                                    <span className="font-black text-zinc-900 tracking-widest text-sm uppercase">
                                        {paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod === 'koko' ? 'Koko Pay (3 Installments)' : 'Cash on Delivery'}
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

                            {paymentMethod === 'koko' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-top-6 duration-700">
                                    <div className="p-10 bg-emerald-50 rounded-[40px] border border-emerald-100 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-200/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                                        
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                            <div>
                                                <h4 className="text-xl font-black text-emerald-900 tracking-tighter mb-2 italic">SPLIT INTO 3. NO INTEREST.</h4>
                                                <p className="text-emerald-700/60 text-[10px] font-black uppercase tracking-widest">Instant Approval via Koko Ecosystem</p>
                                            </div>
                                            <div className="bg-white px-8 py-4 rounded-3xl border border-emerald-100 shadow-sm">
                                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block mb-1">Today's Payment</span>
                                                <span className="text-2xl font-black text-emerald-900 tracking-tighter italic">LKR {(totalAmount / 3).toLocaleString('en-LK', {maximumFractionDigits: 0})}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 relative z-10">
                                            {[1, 2, 3].map((step) => (
                                                <div key={step} className="p-6 bg-white/60 backdrop-blur-md rounded-[32px] border border-white flex flex-col items-center text-center">
                                                    <div className={`w-8 h-8 rounded-full mb-4 flex items-center justify-center font-black text-[10px] ${step === 1 ? 'bg-emerald-600 text-white shadow-lg' : 'bg-emerald-100 text-emerald-600'}`}>
                                                        {step === 1 ? 'V1' : `V${step}`}
                                                    </div>
                                                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Month {step}</span>
                                                    <span className="text-sm font-black text-emerald-900 tracking-tighter">LKR {(totalAmount / 3).toLocaleString('en-LK', {maximumFractionDigits: 0})}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'card' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Select Bank</label>
                                            <select 
                                                value={cardDetails.bank}
                                                onChange={(e) => setCardDetails({...cardDetails, bank: e.target.value})}
                                                className="w-full h-16 bg-white border border-zinc-200 rounded-2xl px-6 font-black text-sm tracking-tight outline-none focus:border-blue-600 transition-all appearance-none cursor-pointer shadow-sm text-zinc-900"
                                            >
                                                <option value="" disabled>Select your bank</option>
                                                {banks.map(bank => (
                                                    <option key={bank} value={bank}>{bank}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Card Number</label>
                                            <input 
                                                type="text" 
                                                placeholder="0000 0000 0000 0000"
                                                maxLength="19"
                                                value={cardDetails.cardNumber}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                                                    setCardDetails({...cardDetails, cardNumber: value});
                                                }}
                                                className="w-full h-16 bg-white border border-zinc-200 rounded-2xl px-6 font-black text-sm tracking-widest outline-none focus:border-blue-600 transition-all shadow-sm placeholder:text-zinc-300 text-zinc-900"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Expiry Date</label>
                                            <input 
                                                type="text" 
                                                placeholder="MM/YY"
                                                maxLength="5"
                                                value={cardDetails.expiry}
                                                onChange={(e) => {
                                                    let value = e.target.value.replace(/\D/g, '');
                                                    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
                                                    setCardDetails({...cardDetails, expiry: value});
                                                }}
                                                className="w-full h-16 bg-white border border-zinc-200 rounded-2xl px-6 font-black text-sm tracking-widest outline-none focus:border-blue-600 transition-all shadow-sm placeholder:text-zinc-300 text-zinc-900"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">CVVCODE</label>
                                            <input 
                                                type="password" 
                                                placeholder="***"
                                                maxLength="3"
                                                value={cardDetails.cvv}
                                                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '')})}
                                                className="w-full h-16 bg-white border border-zinc-200 rounded-2xl px-6 font-black text-sm tracking-widest outline-none focus:border-blue-600 transition-all shadow-sm placeholder:text-zinc-300 text-zinc-900"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between p-8 bg-zinc-50 rounded-[32px] border border-zinc-200 group transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 border border-zinc-100 shadow-sm transition-transform group-hover:scale-110">
                                                <ShieldCheck size={22} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-zinc-900 tracking-tight uppercase">Persistent Hardware Key</h4>
                                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Store card locally for future allocations</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setSaveCard(!saveCard)}
                                            className={`w-14 h-8 rounded-full p-1.5 transition-all duration-500 relative ${saveCard ? 'bg-blue-600' : 'bg-zinc-300'}`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-500 ${saveCard ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </button>
                                    </div>

                                    <div className={`p-6 rounded-2xl border flex items-center gap-4 transition-all duration-700 ${isCardValid() ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-500'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${isCardValid() ? 'border-emerald-200 bg-white' : 'border-red-200 bg-white'}`}>
                                            {isCardValid() ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest">
                                            {isCardValid() ? 'Card Verified & Encrypted' : 'Please complete card details'}
                                        </span>
                                    </div>
                                </div>
                            )}
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
                                    disabled={!isCardValid()}
                                    className={`w-full h-20 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-3xl shadow-lg flex flex-col items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
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
