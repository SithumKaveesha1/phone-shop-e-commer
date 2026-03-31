import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'sonner';
import { ChevronUp, ChevronDown, Maximize2, GitCompare, Info, Check } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedStorage, setSelectedStorage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8005/api/products/${id}`);
                if (res.data.success) {
                    const p = res.data.product;
                    setProduct(p);
                    if (p.images && p.images.length > 0) {
                        setActiveImage(p.images[0].url);
                        setActiveIndex(0);
                    } else {
                        setActiveImage(p.image);
                    }
                    
                    // Handled: Don't set default storage to show range initially
                    if (!["iPhone", "iPad", "Mac"].includes(p.category)) {
                        setSelectedStorage("Standard");
                    }
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                toast.error("Failed to load product details");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        dispatch(addToCart({ ...product, price: currentPrice, storage: selectedStorage, quantity }));
        toast.success(`${product.name} (${selectedStorage}) added to cart!`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] pt-32 flex justify-center">
                <div className="animate-pulse flex flex-col md:flex-row gap-12 max-w-7xl w-full px-6">
                    <div className="w-full md:w-1/2 h-[500px] bg-white rounded-[60px] border border-zinc-100 shadow-sm"></div>
                    <div className="flex-1 space-y-6 pt-10">
                        <div className="h-12 bg-zinc-200 rounded-2xl w-3/4"></div>
                        <div className="h-8 bg-zinc-200 rounded-2xl w-1/4"></div>
                        <div className="h-48 bg-white rounded-[32px] w-full border border-zinc-100 shadow-sm"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return null;

    const isMobile = ["iPhone", "iPad"].includes(product.category);
    const isMac = product.category === "Mac";
    
    let storageOptions = [];
    let customStorage = false;
    
    if (product.storage && product.storage.toLowerCase() !== 'none') {
        storageOptions = product.storage.split(',').map(s => s.trim());
        customStorage = true;
    } else if (!product.storage || product.storage.toLowerCase() !== 'none') {
        // Fallback for older seeded products that lack the storage field
        storageOptions = isMobile 
            ? ["128GB", "256GB", "512GB", "1TB"] 
            : isMac 
                ? ["256GB", "512GB", "1TB", "2TB"] 
                : ["Standard"];
    }

    const hasStorage = storageOptions.length > 0;

    const getPriceForStorage = (storage) => {
        let price = product.price;
        if (customStorage) {
            // For custom storage string, price stays base price unless customized
            return price;
        }
        // Fallback dynamic pricing for seeded variants
        if (isMobile) {
            if (storage === "256GB") price += 35000;
            if (storage === "512GB") price += 75000;
            if (storage === "1TB") price += 125000;
        } else if (isMac) {
            if (storage === "512GB") price += 65000;
            if (storage === "1TB") price += 145000;
            if (storage === "2TB") price += 285000;
        }
        return price;
    };

    const galleryItems = product.images && product.images.length > 0 
        ? product.images 
        : [{ url: product.image, _id: 'default' }];

    const productColors = product.colors && product.colors.length > 0 
        ? product.colors 
        : ['#1d1d1f', '#f5f5f7', '#dcd7f2', '#637599', '#c4c9a4'];

    const features = [
        "6.3\" Super Retina XDR display",
        "ProMotion • Always-On • Dynamic Island",
        "Aluminum design",
        "Action Button • Camera Control",
        "A19 chip",
        "5-core GPU • Ray tracing",
        "Up to 30h video playback",
        "12MP TrueDepth front camera",
        "Ultra-stable video • Dual Capture",
        "48MP Dual Fusion camera",
        "Main + Ultra Wide • 24MP/48MP photos",
        "Macro • Next-gen Portraits • 4K Dolby Vision"
    ];

    const minPrice = hasStorage ? getPriceForStorage(storageOptions[0]) : product.price;
    const maxPrice = hasStorage ? getPriceForStorage(storageOptions[storageOptions.length - 1]) : product.price;
    const currentPrice = selectedStorage ? getPriceForStorage(selectedStorage) : minPrice;

    return (
        <div className="min-h-screen bg-[#f5f5f7] pt-24 pb-20 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-[10px] font-black text-zinc-400 mb-12 uppercase tracking-[0.3em] bg-white w-fit px-6 py-2 rounded-full border border-zinc-100 shadow-sm">
                    <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <span className="text-zinc-200">/</span>
                    <Link to={`/products?category=${product.category}`} className="hover:text-blue-600 transition-colors">{product.category}</Link>
                    <span className="text-zinc-200">/</span>
                    <span className="text-zinc-900 font-black">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-11 gap-20">
                    
                    {/* Left: Gallery Column */}
                    <div className="lg:col-span-6 flex flex-col md:flex-row gap-8">
                        {/* Thumbnails Sidebar */}
                        <div className="flex flex-row md:flex-col gap-4 order-2 md:order-1 overflow-x-auto md:overflow-y-auto whitespace-nowrap scrollbar-hide md:max-h-[600px] pb-4 md:pb-0">
                            {galleryItems.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setActiveImage(item.url); setActiveIndex(idx); }}
                                    className={`relative w-24 h-24 flex-shrink-0 rounded-[24px] overflow-hidden border-2 transition-all p-3 bg-white ${
                                        activeIndex === idx ? 'border-blue-600 shadow-[0_10px_20px_rgba(37,99,235,0.15)] scale-105' : 'border-zinc-100 hover:border-zinc-300'
                                    }`}
                                >
                                    <img src={item.url} className="w-full h-full object-contain" alt="Thumb" />
                                </button>
                            ))}
                            <button className="flex items-center justify-center w-24 h-12 bg-white rounded-2xl text-zinc-400 mt-2 hidden md:flex border border-zinc-100 hover:text-zinc-900 transition-colors shadow-sm">
                                <ChevronDown size={24} />
                            </button>
                        </div>

                        {/* Main Image Viewer */}
                        <div className="flex-1 bg-white rounded-[60px] aspect-square flex items-center justify-center p-16 relative overflow-hidden order-1 md:order-2 group border border-zinc-100 shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.05)] transition-all duration-700">
                            <div className="absolute inset-0 bg-blue-50/50 rounded-full scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-1000" />
                            
                            <img src={activeImage} className="max-h-full object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                            
                            <button className="absolute bottom-12 left-12 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-500 hover:text-blue-600 shadow-xl transition-all hover:scale-110 border border-zinc-100 relative z-20 overflow-hidden">
                                <Maximize2 size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Right: Info Column */}
                    <div className="lg:col-span-5 flex flex-col space-y-12">
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl font-black text-zinc-900 tracking-tighter leading-none h-auto py-2">
                                {product.name}
                            </h1>
                            
                            <div className="flex flex-col gap-4">
                                <span className={`text-4xl font-black tracking-tighter ${selectedStorage ? 'text-blue-600' : 'text-zinc-900'}`}>
                                    {hasStorage && storageOptions.length > 1 && !selectedStorage ? (
                                        `LKR ${minPrice.toLocaleString('en-LK')} - ${maxPrice.toLocaleString('en-LK')}`
                                    ) : (
                                        `LKR ${currentPrice.toLocaleString('en-LK')}`
                                    )}
                                </span>
                                <div className="flex items-center gap-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-zinc-50 p-3 rounded-2xl w-fit border border-zinc-100">
                                    <span>or</span>
                                    <span>3 X LKR {(currentPrice / 3).toLocaleString('en-LK', {maximumFractionDigits: 0})} with</span>
                                    <span className="text-blue-500 italic px-1">KOKO</span>
                                    <Info size={14} className="cursor-pointer hover:text-blue-600 transition-colors text-zinc-400" />
                                </div>
                            </div>
                        </div>

                        {/* Storage Selection */}
                        {hasStorage && (
                            <div className="space-y-6">
                                <h4 className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.3em] font-bold ml-1">
                                    {isMobile || isMac ? "System Storage" : "Configuration"}
                                </h4>
                                <div className="flex flex-wrap gap-4">
                                    {storageOptions.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedStorage(size)}
                                            className={`px-8 py-4 rounded-[20px] border-2 text-xs font-black uppercase tracking-widest transition-all ${
                                                selectedStorage === size 
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.2)] scale-[1.02]' 
                                                : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-400'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Color Selection */}
                        <div className="space-y-6">
                            <h4 className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.3em] font-bold ml-1">Case Aesthetics</h4>
                            <div className="flex items-center gap-6">
                                {productColors.map((color, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setActiveIndex(idx);
                                            setActiveImage(product.images?.[idx]?.url || product.image);
                                        }}
                                        className={`w-12 h-12 rounded-full border-2 transition-all p-1 bg-white ${
                                            activeIndex === idx ? 'border-blue-600 scale-125 shadow-[0_10px_20px_rgba(37,99,235,0.2)]' : 'border-zinc-200 hover:border-zinc-400 hover:scale-110'
                                        }`}
                                    >
                                        <div className="w-full h-full rounded-full shadow-inner border border-zinc-100/50" style={{ backgroundColor: color }} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-6 pt-6">
                            <div className="flex gap-6 h-16">
                                <div className="flex items-center bg-white rounded-2xl overflow-hidden border border-zinc-200 px-2 shadow-sm">
                                    <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-14 h-full flex items-center justify-center text-zinc-400 hover:text-blue-600 hover:bg-zinc-50 transition-all text-2xl font-black">-</button>
                                    <span className="w-12 text-center font-black text-lg text-zinc-900">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q+1)} className="w-14 h-full flex items-center justify-center text-zinc-400 hover:text-blue-600 hover:bg-zinc-50 transition-all text-2xl font-black">+</button>
                                </div>
                                <button 
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-blue-600 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:scale-105 hover:bg-blue-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group"
                                >
                                    <span className="relative z-10 w-full text-center">Add To Interface</span>
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                            <button 
                                onClick={() => navigate('/cart')}
                                className="w-full bg-zinc-900 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl h-16 hover:bg-black transition-all shadow-2xl active:scale-95"
                            >
                                Checkout Workspace
                            </button>
                        </div>

                        {/* Bullet Specs */}
                        <div className="pt-10 space-y-6 border-t border-zinc-200">
                            <h4 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] font-bold ml-1">Technical Highlight</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {features.slice(0, 8).map((stat, i) => (
                                    <li key={i} className="flex gap-4 text-xs text-zinc-500 font-bold group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-1 shadow-sm transition-all group-hover:scale-150 group-hover:bg-blue-600" />
                                        <span className="group-hover:text-zinc-900 transition-colors uppercase tracking-tight leading-tight">{stat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
