import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Package, DollarSign, Image as ImageIcon, Tag, Briefcase, Save, ArrowLeft, Info, Loader2, Upload, Plus, ShieldCheck, Cpu, Smartphone, Laptop, Tablet, Watch, Headphones } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import axios from 'axios';
import { updateProductById } from '../lib/api';

const EditProduct = () => {
    const { id } = useParams();
    const { user } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'iPhone',
        brand: '',
        storage: 'none'
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8005/api/products/${id}`);
                if (res.data.success) {
                    const p = res.data.product;
                    setFormData({
                        name: p.name,
                        description: p.description || '',
                        price: p.price,
                        category: p.category || 'iPhone',
                        brand: p.brand,
                        storage: p.storage || 'none'
                    });
                    
                    if (p.images && p.images.length > 0) {
                        setPreviewUrls(p.images.map(img => img.url));
                    } else if (p.image) {
                        setPreviewUrls([p.image]);
                    }
                }
            } catch (error) {
                toast.error("Resource acquisition failure. Hub disconnected.");
                navigate('/products');
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchProduct();
    }, [id, navigate]);

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
        if (imageFiles.length + chosenFiles.length + previewUrls.length - imageFiles.length > 5) {
            toast.warning("Buffer overflow: Maximum 5 assets allowed per unit.");
            return;
        }

        const newFiles = [...imageFiles, ...chosenFiles];
        const newPreviews = chosenFiles.map(file => URL.createObjectURL(file));
        
        setImageFiles(newFiles);
        setPreviewUrls([...previewUrls, ...newPreviews]);
    };

    const removeImage = (idx) => {
        const urlToRemove = previewUrls[idx];
        
        // Check if this was a newly uploaded file (Blob URL)
        if (urlToRemove.startsWith('blob:')) {
            // Find index in imageFiles. We need to be careful as previews include existing images too.
            // Count how many blob URLs precede this one to find its index in imageFiles.
            const blobCount = previewUrls.slice(0, idx).filter(url => url.startsWith('blob:')).length;
            const newImageFiles = [...imageFiles];
            newImageFiles.splice(blobCount, 1);
            setImageFiles(newImageFiles);
        }
        
        const newPreviews = [...previewUrls];
        newPreviews.splice(idx, 1);
        setPreviewUrls(newPreviews);
    };

    const clearAllImages = () => {
        setImageFiles([]);
        setPreviewUrls([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('brand', formData.brand);
        data.append('storage', formData.storage || 'none');
        
        if (imageFiles.length > 0) {
            imageFiles.forEach(file => {
                data.append('images', file);
            });
        }

        try {
            const res = await updateProductById(id, data);
            if (res.success) {
                toast.success("Hardware protocol synchronized. Changes active.");
                navigate('/products');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Recalibration failure.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50 pt-20 relative overflow-hidden">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" strokeWidth={2} />
                <p className="text-gray-500 font-medium text-sm">Loading product data...</p>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <button 
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium mb-4"
                        >
                            <ArrowLeft size={16} />
                            Back to Products
                        </button>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-2">Edit Product</h1>
                        <p className="text-gray-500 text-sm">Update the details for this product catalog entry.</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <Button 
                            type="button"
                            variant="ghost" 
                            className="text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-xl"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2 h-auto font-medium shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save className="mr-2" size={18} />}
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </div>

                <form className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-20" onSubmit={handleSubmit}>
                    
                    <div className="xl:col-span-2 space-y-8">
                        {/* General Information Card */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900">
                                <Package className="text-gray-500" size={20} />
                                General Information
                            </h2>
                            
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-sm font-medium text-gray-500">Product Name</Label>
                                    <Input 
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. iPhone 16 Pro Max"
                                        className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-900 placeholder:text-gray-400"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="description" className="text-sm font-medium text-gray-500">Description</Label>
                                    <textarea 
                                        id="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Briefly describe the product features and specs..."
                                        className="w-full min-h-[160px] p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-900 placeholder:text-gray-400 outline-none resize-none text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Brand */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900">
                                <DollarSign className="text-gray-500" size={20} />
                                Pricing & Brand
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="price" className="text-sm font-medium text-gray-500">Base Price (LKR)</Label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rs.</div>
                                        <Input 
                                            id="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className="h-12 pl-12 bg-gray-50 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-900 placeholder:text-gray-400"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="brand" className="text-sm font-medium text-gray-500">Brand Name</Label>
                                    <Input 
                                        id="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        placeholder="e.g. Apple"
                                        className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-900 placeholder:text-gray-400"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="storage" className="text-sm font-medium text-gray-500">Storage Capacity</Label>
                                    <select 
                                        id="storage"
                                        value={formData.storage}
                                        onChange={handleChange}
                                        className="w-full h-12 px-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-900 outline-none"
                                    >
                                        <option value="none">None</option>
                                        <option value="64GB">64GB</option>
                                        <option value="128GB">128GB</option>
                                        <option value="256GB">256GB</option>
                                        <option value="512GB">512GB</option>
                                        <option value="1TB">1TB</option>
                                        <option value="2TB">2TB</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="xl:col-span-1 space-y-8">
                        {/* Media Card */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                                    <ImageIcon className="text-gray-500" size={20} />
                                    Product Media
                                </h2>
                                <span className="text-[10px] font-bold tracking-wider bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full uppercase">{previewUrls.length}/5</span>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-3">
                                    {previewUrls.map((url, idx) => (
                                        <div key={idx} className="aspect-square rounded-xl bg-gray-50 border border-gray-200 overflow-hidden relative group">
                                            <img src={url} alt="Uploaded" className="w-full h-full object-cover" />
                                            {idx === 0 && (
                                                <div className="absolute top-1 left-1 bg-blue-600 text-[8px] font-bold text-white px-1.5 py-0.5 rounded shadow z-10">Main</div>
                                            )}
                                            <button 
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]"
                                            >
                                                <div className="bg-red-500 p-1.5 rounded-full hover:bg-red-600 transition-colors">
                                                    <Plus size={14} className="rotate-45" />
                                                </div>
                                            </button>
                                        </div>
                                    ))}
                                    
                                    {previewUrls.length < 5 && (
                                        <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-all flex flex-col items-center justify-center cursor-pointer group">
                                            <input 
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            <Upload className="text-gray-400 group-hover:text-gray-600 transition-colors mb-1" size={18} />
                                            <span className="text-[10px] text-gray-500 group-hover:text-gray-700 font-medium">Upload</span>
                                        </label>
                                    )}
                                </div>
                                <div className="pt-2 border-t border-gray-100 mt-4 space-y-3">
                                    <p className="text-[11px] text-gray-500 leading-relaxed text-center">
                                        Max size: 5MB per image. PNG/JPG.
                                    </p>
                                    {previewUrls.length > 0 && (
                                        <button 
                                            type="button"
                                            onClick={removeImage}
                                            className="w-full py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-200"
                                        >
                                            Clear All Images
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Category Area */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900">
                                <Tag className="text-gray-500" size={20} />
                                Category
                            </h2>
                            
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: 'iPhone', icon: <Smartphone size={18} /> },
                                    { id: 'Mac', icon: <Laptop size={18} /> },
                                    { id: 'iPad', icon: <Tablet size={18} /> },
                                    { id: 'Watch', icon: <Watch size={18} /> },
                                    { id: 'AirPods', icon: <Headphones size={18} /> },
                                    { id: 'Accessories', icon: <Briefcase size={18} /> }
                                ].map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, category: cat.id }))}
                                        className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all duration-300 ${
                                            formData.category === cat.id 
                                            ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-sm' 
                                            : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-900 hover:bg-white'
                                        }`}
                                    >
                                        <div className={`${formData.category === cat.id ? 'scale-110 shadow-sm' : ''} transition-transform`}>
                                            {cat.icon}
                                        </div>
                                        <span className="text-[11px] font-medium tracking-wide">{cat.id}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
