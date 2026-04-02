import React, { useState } from 'react';
import { toast } from 'sonner';
import { ShoppingCart, Trash2, Pencil, Search, ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { deleteProductById } from '../lib/api';

const ProductCard = ({ product, onDelete, viewMode = 'grid' }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const isAdmin = user?.role === 'admin' && user?.email === 'sithumkaveesha1212@gmail.com';
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProductById(product._id);
      toast.success(`${product.name} removed successfully!`);
      if (onDelete) onDelete(product._id);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete product';
      toast.error(`Delete failed: ${errorMessage}`);
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const colors = product.colors && product.colors.length > 0 
    ? product.colors 
    : ['#18181b', '#d4d4d8', '#3b82f6', '#fb7185', '#facc15']; // Default fallback colors

  const isSoldOut = product.stock === 0; 

  const handleColorChange = (index) => {
    setActiveIndex(index);
  };

  const currentImage = (product.images && product.images[activeIndex]) 
    ? product.images[activeIndex].url 
    : product.image;

  return (
    <div className={`bg-white transition-all duration-700 overflow-hidden border border-zinc-100 flex group relative hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 ${viewMode === 'list' ? 'flex-row rounded-[32px] h-[260px]' : 'flex-col rounded-[40px] h-full'}`}>
      
      {/* Sold Out Badge */}
      {isSoldOut && (
        <div className="absolute top-6 left-6 z-20 bg-blue-600 text-white px-3 py-1 rounded-full shadow-lg">
            <span className="text-[8px] font-black uppercase tracking-[0.2em]">SOLD OUT</span>
        </div>
      )}

      {/* Admin Actions Overlay */}
      {isAdmin && (
        <div className="absolute top-6 right-6 z-30 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all">
          <Link
            to={`/admin/edit-product/${product._id}`}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-zinc-400 hover:text-blue-600 hover:scale-110 transition-all border border-zinc-100 shadow-xl"
            title="Edit Product"
          >
            <Pencil size={18} strokeWidth={3} />
          </Link>
          <button
            onClick={(e) => { e.preventDefault(); setShowConfirm(true); }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-zinc-400 hover:text-red-500 hover:scale-110 transition-all border border-zinc-100 shadow-xl"
            title="Delete Product"
          >
            <Trash2 size={18} strokeWidth={3} />
          </button>
        </div>
      )}

      {/* Image Container */}
      <Link to={`/product/${product._id}`} className={`block relative overflow-hidden bg-zinc-50/50 transition-colors duration-700 ${viewMode === 'list' ? 'w-1/3 min-w-[240px] border-r border-zinc-100 h-full flex-shrink-0' : 'aspect-square'}`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <img
          src={currentImage || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"}
          alt={product.name}
          className={`w-full h-full object-contain p-10 relative z-10 transition-all duration-1000 group-hover:scale-105 drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)] ${isSoldOut ? 'opacity-40 grayscale' : ''}`}
          onError={(e) => { 
            const category = product.category?.toLowerCase() || '';
            const fallbacks = {
              iphone: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80',
              mac: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
              ipad: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
              watch: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80',
              airpods: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'
            };
            e.target.src = fallbacks[category] || 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=600&q=80';
          }}
        />
        
        {/* Color variants switcher positioned on the right like in screenshot */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 z-20 bg-white/60 backdrop-blur-xl p-1.5 rounded-full border border-white/80 opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
            {colors.slice(0, 4).map((color, i) => (
                <button 
                  key={i} 
                  onClick={(e) => { e.preventDefault(); handleColorChange(i); }}
                  className={`w-3 h-3 rounded-full transition-all ${activeIndex === i ? 'ring-2 ring-blue-500 ring-offset-2 scale-110' : 'hover:scale-110'}`}
                  style={{ backgroundColor: color }}
                />
            ))}
        </div>
      </Link>

      {/* Content */}
      <div className={`p-8 flex flex-col flex-grow relative ${viewMode === 'list' ? 'items-start text-left justify-center pb-8' : 'items-center text-center pb-10'}`}>
        <div className="flex gap-1.5 mb-6">
            {colors.map((color, i) => (
                <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full border border-zinc-100 shadow-sm ${activeIndex === i ? 'bg-blue-600 scale-125' : 'bg-zinc-200'}`}
                    style={{ backgroundColor: activeIndex === i ? undefined : color }}
                />
            ))}
        </div>

        <Link to={`/product/${product._id}`} className="mb-3">
          <h3 className={`font-black text-zinc-900 leading-tight group-hover:text-blue-600 transition-all tracking-tight line-clamp-2 ${viewMode === 'list' ? 'text-2xl h-auto mb-1' : 'text-base h-10'}`}>
            {product.name}
          </h3>
          {viewMode === 'list' && (
              <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mt-2 bg-zinc-50 px-3 py-1 w-fit rounded-lg">{product.category}</p>
          )}
        </Link>
        
        <div className={`mt-auto flex ${viewMode === 'list' ? 'flex-row items-center gap-6 mt-6' : 'flex-col items-center gap-3'}`}>
          <span className={`${viewMode === 'list' ? 'text-3xl' : 'text-xl'} font-black text-blue-600 tracking-tighter`}>
              LKR {product.price.toLocaleString('en-LK')}
          </span>
          
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-50 border border-zinc-100">
              <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">or</span>
              <div className="flex items-center gap-1.5 text-[10px] font-black text-zinc-500 tracking-tight">
                  <span>3 X LKR {(product.price / 3).toLocaleString('en-LK', {maximumFractionDigits: 0})} with</span>
                  <span className="text-blue-500 italic uppercase">Koko</span>
              </div>
          </div>
        </div>

        {/* Floating Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className={`absolute bg-zinc-900 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-90 shadow-2xl z-30 ${viewMode === 'list' ? 'w-16 h-16 right-8 top-1/2 -translate-y-1/2' : 'w-14 h-14 -bottom-6 left-1/2 -translate-x-1/2 group-hover:-bottom-4'}`}
        >
          <ShoppingCart size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* Confirm Delete Overlay */}
      {showConfirm && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-xl flex items-center justify-center p-8 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-[40px] w-full border border-zinc-100 text-center shadow-2xl">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
                    <Trash2 size={28} strokeWidth={2.5} />
                </div>
                <h4 className="text-xl font-black text-zinc-900 mb-2 tracking-tighter">Remove product?</h4>
                <p className="text-[10px] text-zinc-500 mb-8 font-bold uppercase tracking-widest leading-relaxed">This item will be permanently removed.</p>
                <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleDelete}
                      disabled={deleting}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-lg shadow-red-500/20 transition-all active:scale-95"
                    >
                      {deleting ? 'Removing...' : 'Confirm Remove'}
                    </button>
                    <button 
                      onClick={() => setShowConfirm(false)}
                      className="w-full bg-zinc-100 text-zinc-500 py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all"
                    >
                      Cancel
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
