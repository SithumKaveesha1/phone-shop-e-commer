import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Package, DollarSign, Image as ImageIcon, Tag, Briefcase, Plus, ArrowLeft, Info, Loader2, Upload, Rocket, ShieldCheck, Cpu } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { createProduct } from '../lib/api';

const AddProduct = () => {
    const { user } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'iPhone',
        brand: ''
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user !== undefined && user?.role !== 'admin') {
            toast.error('Access restricted to central administrative nodes.');
            navigate('/');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e) => {
        const chosenFiles = Array.from(e.target.files);
        if (imageFiles.length + chosenFiles.length > 5) {
            toast.warning("Buffer overflow: Maximum 5 assets allowed per unit.");
            return;
        }

        const newFiles = [...imageFiles, ...chosenFiles];
        const newPreviews = chosenFiles.map(file => URL.createObjectURL(file));
        
        setImageFiles(newFiles);
        setPreviewUrls([...previewUrls, ...newPreviews]);
    };

    const removeImage = (index) => {
        const updatedFiles = imageFiles.filter((_, i) => i !== index);
        const updatedPreviews = previewUrls.filter((_, i) => i !== index);
        setImageFiles(updatedFiles);
        setPreviewUrls(updatedPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (imageFiles.length === 0) {
            toast.warning("Hardware visual required for deployment.");
            return;
        }

        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('brand', formData.brand);
        
        imageFiles.forEach(file => {
            data.append('images', file);
        });

        try {
            const res = await createProduct(data);
            if (res.success) {
                toast.success("Hardware protocol synchronized. Unit deployed.");
                navigate('/products');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Deployment failure.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-28 pb-32 min-h-screen bg-black relative overflow-hidden">
             {/* Background Glows */}
             <div className="mesh-glow bg-blue-600/10 w-[800px] h-[800px] absolute -top-40 -left-60 opacity-30 blur-[180px] animate-pulse" />
             <div className="mesh-glow bg-purple-600/10 w-[600px] h-[600px] absolute bottom-0 right-0 opacity-20 blur-[150px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    <div className="space-y-4">
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-3 text-zinc-600 hover:text-white font-black text-[10px] transition-all mb-4 group uppercase tracking-[0.3em]"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Return to Inventory Grid
                        </button>
                        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none italic">Deploy <span className="text-gradient-blue">Hardware</span></h1>
                        <p className="text-zinc-600 text-[11px] font-black uppercase tracking-[0.2em] mt-1">Initialize new unit protocols for the global market</p>
                    </div>
                    
                    <div className="hidden lg:flex w-24 h-24 glass-card rounded-[40px] items-center justify-center text-blue-500 border border-white/5 shadow-2xl relative group">
                        <div className="absolute inset-0 bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Rocket size={40} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform duration-700" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Form Section */}
                    <div className="lg:col-span-8">
                        <div className="glass-card rounded-[48px] border border-white/5 shadow-2xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <form onSubmit={handleSubmit} className="p-10 md:p-14 space-y-12 relative z-10">
                                
                                {/* Basic Info */}
                                <div className="space-y-10">
                                    <div className="flex items-center justify-between pb-8 border-b border-white/5">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/10 shadow-inner">
                                                <Cpu size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Unit DNA</h3>
                                                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Core architectural identification</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-10">
                                        <div className="space-y-3">
                                            <Label htmlFor="name" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">
                                                Hardware Model Title
                                            </Label>
                                            <Input 
                                                id="name"
                                                placeholder="e.g. iPhone 16 Pro Max - White Titanium"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="h-16 rounded-[24px] border-white/5 bg-white/5 text-white focus:border-blue-500/50 transition-all text-base placeholder:text-zinc-800 font-black"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="description" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">
                                                Product Datasheet Reference
                                            </Label>
                                            <textarea 
                                                id="description"
                                                placeholder="Specify GPU clusters, neural engine performance, and thermal management capabilities..."
                                                value={formData.description}
                                                onChange={handleChange}
                                                className="w-full min-h-[220px] p-8 rounded-[32px] border border-white/5 bg-white/5 text-white focus:border-blue-500/50 outline-none transition-all text-base placeholder:text-zinc-800 font-black leading-relaxed"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-3">
                                            <Label htmlFor="price" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">
                                                Market Value (LKR)
                                            </Label>
                                            <div className="relative">
                                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-600 font-black text-xs uppercase tracking-widest">LKR</div>
                                                <Input 
                                                    id="price"
                                                    type="number"
                                                    placeholder="450,000"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    required
                                                    className="h-16 pl-20 rounded-[24px] border-white/5 bg-white/5 text-white focus:border-blue-500/50 transition-all text-lg font-black"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="brand" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">
                                                Manufacturing Node (Brand)
                                            </Label>
                                            <Input 
                                                id="brand"
                                                placeholder="e.g. Apple Inc."
                                                value={formData.brand}
                                                onChange={handleChange}
                                                required
                                                className="h-16 rounded-[24px] border-white/5 bg-white/5 text-white focus:border-blue-500/50 transition-all font-black"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="category" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Unit Category Allocation</Label>
                                        <div className="relative">
                                            <select 
                                                id="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="w-full h-16 px-8 rounded-[24px] border border-white/5 bg-white/5 text-white focus:border-blue-500/50 outline-none transition-all text-base font-black appearance-none cursor-pointer uppercase tracking-widest"
                                            >
                                                <option value="iPhone" className="bg-zinc-900">iPhone</option>
                                                <option value="Mac" className="bg-zinc-900">Mac</option>
                                                <option value="iPad" className="bg-zinc-900">iPad</option>
                                                <option value="Watch" className="bg-zinc-900">Watch</option>
                                                <option value="AirPods" className="bg-zinc-900">AirPods</option>
                                                <option value="Accessories" className="bg-zinc-900">Accessories</option>
                                            </select>
                                            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500">
                                                <Tag size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="pt-10 flex flex-col sm:flex-row gap-6">
                                    <Button 
                                        type="submit" 
                                        disabled={loading}
                                        className="flex-1 h-20 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white rounded-[28px] text-xl font-black shadow-[0_20px_40px_rgba(37,99,235,0.2)] transition-all active:scale-[0.98] disabled:opacity-70 uppercase tracking-widest text-xs"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-4">
                                                <Loader2 className="animate-spin" size={26} />
                                                Synchronizing...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-4">
                                                <Plus size={26} strokeWidth={3} />
                                                Deploy Hub Product
                                            </span>
                                        )}
                                    </Button>
                                    <Button 
                                        type="button"
                                        variant="ghost"
                                        onClick={() => navigate(-1)}
                                        className="h-20 px-12 text-zinc-600 hover:text-white transition-all font-black uppercase tracking-widest text-xs italic"
                                    >
                                        Abort Protocol
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Image Upload Sidebar */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="glass-card p-10 rounded-[48px] border border-white/5 shadow-2xl relative overflow-hidden group/sidebar">
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
                            
                            <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] block mb-10 px-1 flex items-center gap-4">
                                <Upload size={18} className="text-blue-500 animate-pulse" />
                                Visual Assets ({previewUrls.length}/5)
                            </Label>
                            
                            <div className="space-y-8">
                                {/* Main Highlight Preview */}
                                <div className="relative group overflow-hidden rounded-[32px] border-2 border-dashed border-white/5 bg-white/5 hover:border-blue-500/40 transition-all duration-700 flex flex-col items-center justify-center aspect-square shadow-inner">
                                    {previewUrls.length > 0 ? (
                                        <div className="relative w-full h-full p-8 animate-in zoom-in-95 duration-1000">
                                            <img 
                                                src={previewUrls[0]} 
                                                alt="Primary Preview" 
                                                className="w-full h-full object-contain brightness-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                            />
                                            <div className="absolute bottom-4 right-4 glass-card px-3 py-1 rounded-full border border-white/10">
                                                <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Main Node</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-6 text-zinc-800 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-700">
                                            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/5 shadow-2xl">
                                                <ImageIcon size={36} strokeWidth={1} />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">Upload Interface</p>
                                                <p className="text-[8px] opacity-40 font-black uppercase tracking-widest">Max 5 units</p>
                                            </div>
                                        </div>
                                    )}
                                    <input 
                                        id="file-upload"
                                        name="images"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <label htmlFor="file-upload" className="absolute inset-0 cursor-pointer z-10" />
                                </div>

                                {/* Thumbnails & Add Button */}
                                <div className="grid grid-cols-4 gap-4">
                                    {previewUrls.map((url, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 group/thumb hover:scale-105 transition-transform shadow-2xl">
                                            <img src={url} className="w-full h-full object-cover brightness-110" />
                                            <button 
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute inset-0 bg-red-600/90 flex items-center justify-center text-white opacity-0 group-hover/thumb:opacity-100 transition-all backdrop-blur-sm"
                                            >
                                                <Plus className="rotate-45" size={24} strokeWidth={3} />
                                            </button>
                                        </div>
                                    ))}
                                    {previewUrls.length < 5 && (
                                        <label htmlFor="file-upload" className="aspect-square rounded-2xl border-2 border-dashed border-white/5 bg-white/5 flex items-center justify-center text-zinc-800 hover:border-blue-500/50 hover:text-blue-500/50 cursor-pointer transition-all hover:scale-105 shadow-inner">
                                            <Plus size={24} />
                                        </label>
                                    )}
                                </div>
                            </div>
                            
                            <div className="bg-blue-600/5 rounded-[24px] p-6 border border-blue-500/10 mt-10">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0 animate-pulse">
                                        <Info size={16} />
                                    </div>
                                    <p className="text-[10px] font-black text-zinc-600 leading-relaxed uppercase tracking-[0.1em]">
                                        Unit visual assets are buffered locally before transmission.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Inventory Card */}
                        <div className="glass-card rounded-[40px] p-10 text-white shadow-2xl border border-white/5 flex flex-col items-center text-center overflow-hidden relative group">
                            <div className="absolute -right-8 -top-8 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-1000" />
                            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 relative z-10 shadow-inner border border-blue-500/20 group-hover:bg-blue-600 transition-colors duration-500">
                                <Package size={28} className="text-blue-500 group-hover:text-white" strokeWidth={1.5} />
                            </div>
                            <h4 className="font-black text-2xl mb-3 relative z-10 tracking-tighter uppercase italic">Global Manager</h4>
                            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] px-4 relative z-10 leading-relaxed">Infrastructure will propagate unit data to all active network nodes instantly.</p>
                            
                            <div className="mt-12 pt-10 border-t border-white/5 w-full flex justify-around relative z-10">
                                <div className="text-center group/stat cursor-pointer">
                                    <p className="text-blue-500 font-black text-3xl leading-none group-hover/stat:scale-125 transition-transform duration-500 italic">AUTO</p>
                                    <p className="text-[9px] text-zinc-700 font-black uppercase tracking-widest mt-3">Scaling</p>
                                </div>
                                <div className="text-center group/stat cursor-pointer">
                                    <p className="text-white font-black text-3xl leading-none group-hover/stat:scale-125 transition-transform duration-500 italic">SECURE</p>
                                    <p className="text-[9px] text-zinc-700 font-black uppercase tracking-widest mt-3">SSL-LOCKED</p>
                                </div>
                            </div>
                            
                            <div className="mt-10 pt-8 flex items-center justify-center gap-3 relative z-10">
                                <ShieldCheck size={16} className="text-zinc-800" />
                                <span className="text-[8px] font-black text-zinc-800 uppercase tracking-[0.4em]">Verified Admin Connection</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
