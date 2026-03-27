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
        // Logic to save order to backend could go here
        // For now, we clear the cart and go to success page
        dispatch(clearCart());
        toast.success("Order Placed Successfully!");
        navigate('/checkout/success');
        localStorage.removeItem('shippingAddress');
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-28 min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <Button onClick={() => navigate('/products')}>Go Shopping</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-20 min-h-screen bg-gray-50 flex flex-col items-center px-4">
            <div className="w-full max-w-5xl">
                <CheckoutStepper currentStep={2} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Review Items and Shipping */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Info Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
                                    <MapPin size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Shipping Details</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <p className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-1">Recipient</p>
                                    <p className="text-gray-900 font-medium">{shippingAddress.firstname} {shippingAddress.lastname}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-1">Phone</p>
                                    <p className="text-gray-900 font-medium">{shippingAddress.phoneNo}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-1">Address</p>
                                    <p className="text-gray-900 font-medium">{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.zipCode}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
                                    <CreditCard size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Payment Method</h3>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-pink-600 shadow-sm">
                                        {paymentMethod === 'card' ? <CreditCard size={16} /> : <Banknote size={16} />}
                                    </div>
                                    <span className="font-bold text-gray-800">
                                        {paymentMethod === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery'}
                                    </span>
                                </div>
                                <Button 
                                    variant="link" 
                                    onClick={() => navigate('/checkout/payment')}
                                    className="text-pink-600 font-bold text-xs"
                                >
                                    Change
                                </Button>
                            </div>
                        </div>

                        {/* Order Items List */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
                                    <ShoppingBag size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Order Items</h3>
                            </div>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
                                        <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                                            <p className="text-xs text-gray-400 font-medium">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-pink-600">
                                            LKR {(item.price * item.quantity).toLocaleString('en-LK')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Checkout Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-32">
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-50">
                                <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center text-white">
                                    <CreditCard size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Payment Summary</h3>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-gray-700">LKR {totalAmount.toLocaleString('en-LK')}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Shipping Fee</span>
                                    <span className="text-green-600 font-bold uppercase tracking-tighter">Free</span>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-gray-900 font-bold">Total Amount</span>
                                    <span className="text-2xl font-black text-pink-600">LKR {totalAmount.toLocaleString('en-LK')}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Button 
                                    onClick={handlePlaceOrder}
                                    className="w-full h-14 bg-pink-600 hover:bg-pink-700 text-white font-black rounded-2xl shadow-xl shadow-pink-100 flex items-center justify-center gap-3 transition-transform active:scale-95"
                                >
                                    Confirm & Place Order
                                    <CheckCircle2 size={24} />
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    onClick={() => navigate('/checkout/payment')}
                                    className="w-full text-gray-400 font-bold hover:text-pink-600 flex items-center justify-center gap-2"
                                >
                                    <ChevronLeft size={20} />
                                    Back to Payment
                                </Button>
                            </div>

                            <div className="mt-8 p-4 bg-gray-50 rounded-2xl flex items-center gap-3 border border-gray-100">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secure SSL Encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;
