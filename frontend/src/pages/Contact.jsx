import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Sparkles, Twitter, Instagram, Facebook } from 'lucide-react';
import MultiLangChatbot from '../components/MultiLangChatbot';
import { Button } from '../components/ui/button';

const ContactCard = ({ icon, title, value, subValue, color }) => (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
            {icon}
        </div>
        <h3 className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-2">{title}</h3>
        <p className="text-xl font-black text-gray-900 mb-1">{value}</p>
        <p className="text-gray-500 text-sm font-medium">{subValue}</p>
    </div>
);

const Contact = () => {
    return (
        <div className="pt-28 pb-20 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-black uppercase tracking-widest mb-6 animate-in fade-in zoom-in duration-700">
                        <MessageSquare size={14} />
                        Get in Touch
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
                        We're Here to <span className="text-pink-600">Help You</span>
                    </h1>
                    <p className="text-gray-500 text-lg font-medium">
                        Have a question about an order or a product? Speak with our multi-language AI assistant or reach out to our team directly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                    
                    {/* Left: Contact Info */}
                    <div className="lg:col-span-5 space-y-6 flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                            <ContactCard 
                                icon={<Mail className="w-7 h-7" />}
                                title="Email Us"
                                value="support@ekart.com"
                                subValue="Responses within 24 hours"
                                color="bg-blue-50 text-blue-600"
                            />
                            <ContactCard 
                                icon={<Phone className="w-7 h-7" />}
                                title="Call Us"
                                value="+94 71 234 5678"
                                subValue="Mon - Fri, 9am - 6pm"
                                color="bg-green-50 text-green-600"
                            />
                            <ContactCard 
                                icon={<MapPin className="w-7 h-7" />}
                                title="Visit Us"
                                value="Colombo, Sri Lanka"
                                subValue="123 Tech Avenue, Level 4"
                                color="bg-purple-50 text-purple-600"
                            />
                        </div>

                        {/* Social Connect */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex-grow">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Connect with us</h3>
                            <div className="flex gap-4">
                                {[
                                    { icon: <Facebook />, label: 'Facebook', color: 'hover:text-blue-600 hover:bg-blue-50' },
                                    { icon: <Twitter />, label: 'Twitter', color: 'hover:text-sky-500 hover:bg-sky-50' },
                                    { icon: <Instagram />, label: 'Instagram', color: 'hover:text-pink-600 hover:bg-pink-50' }
                                ].map((social, i) => (
                                    <button 
                                        key={i}
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 border border-gray-100 transition-all ${social.color} hover:border-transparent`}
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-8 pt-8 border-t border-gray-50 flex items-center gap-4">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Support Team Online</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Embedded Chatbot */}
                    <div className="lg:col-span-7 h-[600px] lg:h-auto min-h-[500px]">
                        <div className="h-full rounded-3xl overflow-hidden shadow-2xl shadow-pink-100/50 border border-pink-100/50 relative">
                            <div className="absolute top-4 right-20 z-10 hidden md:block">
                                <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-pink-100 flex items-center gap-2 shadow-sm">
                                    <Sparkles size={12} className="text-pink-600" />
                                    <span className="text-[10px] font-black text-pink-600 uppercase tracking-widest">Multi-Language AI</span>
                                </div>
                            </div>
                            <MultiLangChatbot embed={true} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
