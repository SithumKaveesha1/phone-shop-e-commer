import React from 'react'
import Hero from '../components/ui/Hero'
import CategoryGrid from '../components/ui/CategoryGrid'
import TheLatest from '../components/ui/TheLatest'
import FeatureGrid from '../components/ui/FeatureGrid'
import DeviceShowcase from '../components/ui/DeviceShowcase'
import { Monitor, Cpu, Battery, Smartphone, Watch, Tablet } from 'lucide-react'

const Home = () => {
  return (
    <div className="bg-[#f5f5f7]">
      <Hero />
      <CategoryGrid />
      <TheLatest />
      <FeatureGrid />
      
      {/* Watch Showcase */}
      <DeviceShowcase 
        title="Apple Watch"
        desc="The ultimate device for a healthy life."
        category="Watch"
        image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1000&q=80"
        features={[
          { label: 'Case', value: 'Titanium or Aluminum', icon: <Watch size={20} /> },
          { label: 'Display', value: 'Always-On Retina', icon: <Monitor size={20} /> },
          { label: 'Health', value: 'ECG & Oxygen', icon: <Battery size={20} /> },
        ]}
      />

      {/* iPad Showcase */}
      <DeviceShowcase 
        title="Apple iPad"
        desc="Touch, draw, and type on one magical device."
        category="iPad"
        reverse
        image="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1000&q=80"
        features={[
          { label: 'Processor', value: 'Apple M2 Chip', icon: <Cpu size={20} /> },
          { label: 'Display', value: 'Liquid Retina XDR', icon: <Monitor size={20} /> },
          { label: 'Battery', value: 'All-day life', icon: <Battery size={20} /> },
        ]}
      />

      {/* Mac Showcase */}
      <DeviceShowcase 
        title="Mac"
        desc="If you can dream it, Mac can do it."
        category="Mac"
        image="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1000&q=80"
        features={[
          { label: 'Speed', value: 'M3 Pro & Max', icon: <Cpu size={20} /> },
          { label: 'Security', value: 'Touch ID', icon: <ShieldCheck size={20} /> },
          { label: 'Screen', value: 'ProMotion 120Hz', icon: <Monitor size={20} /> },
        ]}
      />
    </div>
  )
}

const ShieldCheck = ({ size }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;

export default Home