import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Package, DollarSign, Image as ImageIcon, Tag, Briefcase, Save, ArrowLeft, Info, Loader2, Upload, Plus } from 'lucide-react';
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
        category: 'Mobile',
        brand: ''
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const navigate = useNavigate();

    // Fetch product details
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
                        category: p.category,
                        brand: p.brand
                    });
                    
                    // Set existing images as previews
                    if (p.images && p.images.length > 0) {
                        setPreviewUrls(p.images.map(img => img.url));
                    } else if (p.image) {
                        setPreviewUrls([p.image]);
                    }
                }
            } catch (error) {
                toast.error("Failed to fetch product details");
                navigate('/products');
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchProduct();
    }, [id, navigate]);

    // Redirect non-admin users
    useEffect(() => {
        if (user !== undefined && user?.role !== 'admin') {
            toast.error('Access denied. Admin only.');
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
            toast.warning("Maximum 5 images allowed per product");
            return;
        }

        const newFiles = [...imageFiles, ...chosenFiles];
        const newPreviews = chosenFiles.map(file => URL.createObjectURL(file));
        
        setImageFiles(newFiles);
        setPreviewUrls([...previewUrls, ...newPreviews]);
    };

    const removeImage = (index) => {
        // If it's a new file, remove from imageFiles too
        // This is complex because previewUrls contains both old (strings) and new (blob urls)
        // For simplicity, we'll reset image selection if they want to edit existing ones
        // OR just allow them to clear and re-upload.
        // Let's implement a simple version: clear all and re-upload if they want to change.
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
        
        // Append all new images if selected
        if (imageFiles.length > 0) {
            imageFiles.forEach(file => {
                data.append('images', file);
            });
        }

        console.log('[DEBUG-FRONTEND-EDIT] Submitting to:', `http://localhost:8005/api/products/${id}`);
        for (let [key, value] of data.entries()) {
            console.log(`[DATA] ${key}:`, value);
        }

        try {
            const res = await updateProductById(id, data);

            if (res.success) {
                toast.success("Product updated successfully!");
                navigate('/products');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to update product");
        } finally {
            setLoading(false);
        }
    };


    if (fetching) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50/50 pt-20">
                <Loader2 className="w-12 h-12 text-pink-600 animate-spin" />
                <p className="text-gray-500 font-medium animate-pulse">Loading product details...</p>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-20 min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-500 hover:text-pink-600 font-bold text-sm transition-colors mb-2 group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Inventory
                        </button>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Edit <span className="text-pink-600">Product</span></h1>
                        <p className="text-gray-500 text-sm font-medium">Update the details and assets for this item</p>
                    </div>
                    <div className="hidden sm:flex w-16 h-16 bg-white border-2 border-pink-100 rounded-3xl items-center justify-center text-pink-600 shadow-xl shadow-pink-50/50">
                        <Package size={32} strokeWidth={2.5} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Form Section */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
                            <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-10">
                                
                                {/* Basic Info */}
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
                                                <Info size={20} />
                                            </div>
                                            <h3 className="text-lg font-black text-gray-800 tracking-tight">Essential Details</h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-8">
                                        <div className="space-y-3">
                                            <Label htmlFor="name" className="text-sm font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 px-1">
                                                Product Title
                                            </Label>
                                            <Input 
                                                id="name"
                                                placeholder="e.g. iPhone 15 Pro Max"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="h-14 rounded-2xl border-gray-100 bg-gray-50/30 focus:bg-white focus:ring-pink-500 focus:border-pink-500 transition-all text-base placeholder:text-gray-300 font-medium"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="description" className="text-sm font-black text-gray-700 uppercase tracking-wider px-1">
                                                Description
                                            </Label>
                                            <textarea 
                                                id="description"
                                                placeholder="Craft a compelling story for this product..."
                                                value={formData.description}
                                                onChange={handleChange}
                                                className="w-full min-h-[160px] p-5 rounded-2xl border border-gray-100 bg-gray-50/30 focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all text-base text-gray-700 placeholder:text-gray-300 font-medium leading-relaxed"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label htmlFor="price" className="text-sm font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 px-1">
                                                Price (LKR)
                                            </Label>
                                            <div className="relative">
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-500 font-black">LKR</div>
                                                <Input 
                                                    id="price"
                                                    type="number"
                                                    placeholder="0.00"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    required
                                                    className="h-14 pl-16 rounded-2xl border-gray-100 bg-gray-50/30 focus:bg-white transition-all text-base font-bold"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="brand" className="text-sm font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 px-1">
                                                Brand Label
                                            </Label>
                                            <Input 
                                                id="brand"
                                                placeholder="e.g. Apple, Samsung"
                                                value={formData.brand}
                                                onChange={handleChange}
                                                required
                                                className="h-14 rounded-2xl border-gray-100 bg-gray-50/30 focus:bg-white transition-all text-base font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="category" className="text-sm font-black text-gray-700 uppercase tracking-wider px-1">Product Category</Label>
                                        <select 
                                            id="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full h-14 px-5 rounded-2xl border border-gray-100 bg-gray-50/30 focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all text-base font-bold text-gray-700 appearance-none cursor-pointer"
                                        >
                                            <option value="Mobile">Mobile</option>
                                            <option value="Headphone">Headphone</option>
                                            <option value="Laptop">Laptop</option>
                                            <option value="TV">TV</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                                    <Button 
                                        type="submit" 
                                        disabled={loading}
                                        className="flex-1 h-16 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl text-lg font-black shadow-2xl shadow-pink-200/50 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-3">
                                                <Loader2 className="animate-spin" size={24} />
                                                Processing Changes...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-3 font-black">
                                                <Save size={24} />
                                                Save Changes
                                            </span>
                                        )}
                                    </Button>
                                    <Button 
                                        type="button"
                                        variant="outline"
                                        onClick={() => navigate(-1)}
                                        className="h-16 px-10 border-2 border-gray-100 text-gray-400 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-200 rounded-2xl font-black transition-all"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Image Preview Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/30">
                            <Label className="text-sm font-black text-gray-700 uppercase tracking-widest block mb-6 px-1 flex items-center gap-2">
                                <Upload size={16} className="text-pink-600" />
                                Product Gallery ({previewUrls.length}/5)
                            </Label>
                            
                            <div className="space-y-4">
                                {/* Main Highlight Preview */}
                                <div className="relative group overflow-hidden rounded-[32px] border-2 border-dashed border-gray-100 bg-gray-50/30 hover:bg-white hover:border-pink-200 transition-all duration-500 flex flex-col items-center justify-center aspect-square">
                                    {previewUrls.length > 0 ? (
                                        <img 
                                            src={previewUrls[0]} 
                                            alt="Primary Preview" 
                                            className="w-full h-full object-contain rounded-2xl mix-blend-multiply p-4"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-4 text-gray-300 group-hover:text-pink-300 transition-colors">
                                            <ImageIcon size={64} strokeWidth={1} />
                                            <p className="text-sm font-bold">No images selected</p>
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

                                {/* Thumbnails & Reset */}
                                <div className="grid grid-cols-4 gap-3">
                                    {previewUrls.map((url, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 group/thumb">
                                            <img src={url} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    {previewUrls.length < 5 && (
                                        <label htmlFor="file-upload" className="aspect-square rounded-xl border-2 border-dashed border-gray-100 flex items-center justify-center text-gray-300 hover:border-pink-200 hover:text-pink-300 cursor-pointer transition-all">
                                            <Plus size={20} />
                                        </label>
                                    )}
                                </div>
                                {previewUrls.length > 0 && (
                                    <button 
                                        type="button"
                                        onClick={removeImage}
                                        className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                                    >
                                        Clear Gallery to Re-upload
                                    </button>
                                )}
                            </div>
                            
                            <div className="bg-pink-50/50 rounded-2xl p-4 border border-pink-100/30 mt-6">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0">
                                        <Info size={14} />
                                    </div>
                                    <p className="text-[11px] font-medium text-pink-800 leading-relaxed">
                                        Changing images will replace the entire gallery. You can upload up to 5 new shots.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Status Widget */}
                        <div className="bg-gray-900 rounded-[32px] p-8 text-white shadow-2xl shadow-gray-400/20 flex flex-col items-center text-center overflow-hidden relative">
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-pink-600/10 rounded-full blur-3xl" />
                            <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center mb-4 relative z-10">
                                <Save size={20} className="text-white" />
                            </div>
                            <h4 className="font-black text-lg mb-1 relative z-10">Inventory Sync</h4>
                            <p className="text-gray-400 text-xs font-medium px-4 relative z-10">All changes are instantly distributed across all storefront nodes.</p>
                            <div className="mt-6 pt-6 border-t border-white/5 w-full flex justify-around relative z-10">
                                <div className="text-center">
                                    <p className="text-pink-500 font-black text-xl leading-none mb-1">LIVE</p>
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Status</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-white font-black text-xl leading-none mb-1">99.9%</p>
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Uptime</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
