import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight, ShoppingCart, Star, ShieldCheck, Truck, Play, Info } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8005/api/products/${id}`);
                if (res.data.success) {
                    const p = res.data.product;
                    setProduct(p);
                    // Set active image from images array or single image field
                    if (p.images && p.images.length > 0) {
                        setActiveImage(p.images[0].url);
                    } else {
                        setActiveImage(p.image);
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
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-32 flex justify-center">
                <div className="animate-pulse flex flex-col md:flex-row gap-12 max-w-7xl w-full px-6">
                    <div className="w-full md:w-1/2 h-[500px] bg-gray-200 rounded-3xl"></div>
                    <div className="flex-1 space-y-6">
                        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-24 bg-gray-200 rounded w-full"></div>
                        <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
                <Link to="/products" className="text-pink-600 hover:underline mt-4 inline-block">Back to Products</Link>
            </div>
        );
    }

    const galleryItems = product.images && product.images.length > 0 
        ? product.images 
        : [{ url: product.image, _id: 'default' }];

    return (
        <div className="min-h-screen bg-gray-50/50 pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-pink-600 font-bold mb-8 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-pink-50">
                        <ChevronLeft size={20} />
                    </div>
                    Back to Store
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-[3rem] p-8 lg:p-12 shadow-2xl shadow-gray-200/50 border border-white">
                    {/* Left: Interactive Image Gallery */}
                    <div className="lg:col-span-6 space-y-6">
                        {/* Main Viewer */}
                        <div className="relative aspect-[4/5] sm:aspect-square bg-white rounded-[2.5rem] overflow-hidden group border border-gray-100 shadow-sm flex items-center justify-center p-8">
                            <img 
                                src={activeImage} 
                                alt={product.name} 
                                className="max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Play Icon Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border-2 border-white/50 shadow-2xl">
                                    <Play className="text-white fill-white ml-1" size={40} />
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Carousel with Arrows */}
                        <div className="relative group/carousel px-2">
                             <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide py-2 scroll-smooth" id="gallery-carousel">
                                {galleryItems.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(item.url)}
                                        className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-white p-2 ${
                                            activeImage === item.url 
                                                ? 'border-[#f97316] shadow-lg shadow-orange-100 scale-105' 
                                                : 'border-transparent hover:border-gray-200'
                                        }`}
                                    >
                                        <img 
                                            src={item.url} 
                                            className="w-full h-full object-contain"
                                        />
                                    </button>
                                ))}
                             </div>
                             
                             {/* Navigation Arrows */}
                             <button 
                                onClick={() => document.getElementById('gallery-carousel').scrollBy({ left: -200, behavior: 'smooth' })}
                                className="absolute left-[-15px] top-[40%] -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#f97316] opacity-0 group-hover/carousel:opacity-100 transition-all z-20"
                             >
                                <ChevronLeft size={24} />
                             </button>
                             <button 
                                onClick={() => document.getElementById('gallery-carousel').scrollBy({ left: 200, behavior: 'smooth' })}
                                className="absolute right-[-15px] top-[40%] -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#f97316] opacity-0 group-hover/carousel:opacity-100 transition-all z-20"
                             >
                                <ChevronRight size={24} />
                             </button>
                        </div>
                    </div>

                    {/* Right: Product Info Section */}
                    <div className="lg:col-span-6 flex flex-col h-full">
                        <div className="mb-2">
                             <span className="bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {product.brand}
                             </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                            {product.name}
                        </h1>
                        
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex bg-yellow-50 px-2 py-1 rounded-lg">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill={i < 4 ? "#fbbf24" : "none"} stroke="#fbbf24" strokeWidth={1} />
                                ))}
                            </div>
                            <span className="text-gray-400 text-sm font-medium">4.8 (120+ reviews)</span>
                        </div>

                        <div className="bg-pink-50 p-6 rounded-3xl border border-pink-100 mb-8 inline-block self-start">
                            <span className="text-pink-600 text-sm font-bold block mb-1">Current Price</span>
                            <span className="text-4xl font-black text-gray-900">
                                LKR {product.price.toLocaleString()}
                            </span>
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
                            {product.description || "Experience next-level performance and elegant design with the all-new " + product.name + ". Engineered for those who demand excellence in every detail."}
                        </p>

                        {/* Features / Icons */}
                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-2xl">
                                <ShieldCheck className="text-pink-600" size={24} />
                                <span className="text-sm font-semibold tracking-tight">1 Year Warranty</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-2xl">
                                <Truck className="text-pink-600" size={24} />
                                <span className="text-sm font-semibold tracking-tight">Free Delivery</span>
                            </div>
                        </div>

                        {/* Action Area */}
                        <div className="mt-auto flex flex-col sm:flex-row gap-4">
                            <Button 
                                onClick={handleAddToCart}
                                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white h-16 rounded-2xl text-lg font-bold shadow-lg shadow-pink-200 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                            >
                                <ShoppingCart size={22} />
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
