import React, { useState } from 'react';
import { toast } from 'sonner';
import { ShoppingCart, Trash2, Pencil, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { deleteProductById } from '../lib/api';

const ProductCard = ({ product, onDelete }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const isAdmin = user?.role === 'admin';
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

  return (
    <div className="bg-white rounded-2xl transition-all duration-500 overflow-hidden border border-zinc-100 flex flex-col group h-full relative hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1">
      
      {/* Admin Actions */}
      {isAdmin && (
        <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/admin/edit-product/${product._id}`}
            className="w-10 h-10 bg-white/90 backdrop-blur-md border border-zinc-200 rounded-xl flex items-center justify-center text-zinc-600 hover:text-black hover:border-black transition-all shadow-xl"
          >
            <Pencil size={16} />
          </Link>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowConfirm(true); }}
            disabled={deleting}
            className="w-10 h-10 bg-red-600 border border-red-700 rounded-xl flex items-center justify-center text-white hover:bg-red-700 transition-all shadow-xl disabled:opacity-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {/* Image Container */}
      <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden bg-zinc-50/50">
        <img
          src={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"}
          alt={product.name}
          className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
        />
        {/* Brand Badge */}
        <div className="absolute bottom-4 left-4 bg-black/5 backdrop-blur-md px-3 py-1 rounded-full border border-black/5">
            <span className="text-[10px] font-black text-black uppercase tracking-widest">{product.brand || 'Premium'}</span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="fill-primary text-primary" />
            ))}
            <span className="text-[10px] text-zinc-400 font-bold ml-1">(4.9)</span>
        </div>

        <Link to={`/product/${product._id}`}>
          <h3 className="font-bold text-zinc-900 text-base mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-4 flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-black">
                LKR {product.price.toLocaleString('en-LK')}
            </span>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">As low as</span>
                <span className="text-[10px] font-black text-primary border border-primary/20 bg-primary/5 px-1.5 py-0.5 rounded uppercase">KOKO</span>
            </div>
          </div>

          <button
            onClick={(e) => { e.preventDefault(); handleAddToCart(); }}
            className="w-full bg-black text-white py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-zinc-800 active:scale-[0.98] transition-all shadow-xl shadow-black/5"
          >
            <ShoppingCart size={16} strokeWidth={2.5} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Confirm Delete Overlay */}
      {showConfirm && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white p-8 rounded-3xl w-full max-w-xs text-center shadow-2xl">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 size={24} />
                </div>
                <h4 className="text-xl font-black text-zinc-900 mb-2">Delete Item?</h4>
                <p className="text-sm text-zinc-500 mb-8 font-medium">This cannot be undone.</p>
                <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleDelete}
                      disabled={deleting}
                      className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-all"
                    >
                      {deleting ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                    <button 
                      onClick={() => setShowConfirm(false)}
                      className="w-full bg-zinc-100 text-zinc-600 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all"
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
