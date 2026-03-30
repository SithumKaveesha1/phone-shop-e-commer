import { Headphones, Shield, Truck, CreditCard, RotateCcw } from 'lucide-react'
import React from 'react'

const Features = () => {
    const features = [
        {
            icon: <Truck size={28} strokeWidth={2.5} />,
            title: "Global Logistics",
            desc: "Island-wide expedited dispatch nodes."
        },
        {
            icon: <Shield size={28} strokeWidth={2.5} />,
            title: "Genuine Protocol",
            desc: "100% Authorized Apple Intelligence."
        },
        {
            icon: <CreditCard size={28} strokeWidth={2.5} />,
            title: "Split Procurement",
            desc: "Active Koko & Mintpay installments."
        },
        {
            icon: <Headphones size={28} strokeWidth={2.5} />,
            title: "Expert Command",
            desc: "Dedicated ecosystem assistance."
        }
    ];

    return (
        <section className='py-24 bg-[#f5f5f7] border-y border-zinc-100'>
            <div className='max-w-7xl mx-auto px-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
                    {features.map((f, i) => (
                        <div key={i} className='flex flex-col items-center text-center space-y-6 group'>
                            <div className='h-20 w-20 bg-white rounded-3xl flex items-center justify-center text-blue-600 border border-zinc-100 transition-all duration-700 group-hover:scale-110 group-hover:border-blue-500/20 group-hover:shadow-2xl group-hover:-translate-y-2 relative'>
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent rounded-3xl" />
                                {f.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className='text-zinc-900 font-extrabold uppercase tracking-[0.2em] text-[11px]'>{f.title}</h3>
                                <p className='text-zinc-400 text-xs font-medium leading-relaxed max-w-[180px]'>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features