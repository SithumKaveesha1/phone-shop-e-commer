import { Headphones, Shield, Truck, CreditCard } from 'lucide-react'
import React from 'react'

const Features = () => {
    const features = [
        {
            icon: <Truck size={24} />,
            title: "Free Shipping",
            desc: "On all orders over Rs. 50,000"
        },
        {
            icon: <Shield size={24} />,
            title: "Authorized Warranty",
            desc: "100% genuine Apple products"
        },
        {
            icon: <CreditCard size={24} />,
            title: "Flexible Payment",
            desc: "Koko & Mintpay installments"
        },
        {
            icon: <Headphones size={24} />,
            title: "Expert Support",
            desc: "Dedicated technical assistance"
        }
    ];

    return (
        <section className='py-20 bg-zinc-950 border-y border-zinc-900'>
            <div className='max-w-7xl mx-auto px-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
                    {features.map((f, i) => (
                        <div key={i} className='flex flex-col items-center text-center space-y-4 group'>
                            <div className='h-16 w-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-primary border border-zinc-800 transition-all group-hover:scale-110 group-hover:border-primary/50 shadow-2xl'>
                                {f.icon}
                            </div>
                            <div>
                                <h3 className='text-white font-black uppercase tracking-widest text-xs mb-1'>{f.title}</h3>
                                <p className='text-zinc-500 text-sm font-medium'>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features