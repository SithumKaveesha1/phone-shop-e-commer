import React, { useState, useMemo, useEffect } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Plus, SlidersHorizontal, PackageSearch } from 'lucide-react';
import { Link } from 'react-router-dom';


const Products = () => {
  const { user } = useSelector(state => state.user);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    brand: 'All',
    minPrice: 0,
    maxPrice: 2000000,
  });

  const [sortOrder, setSortOrder] = useState('relevant');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8005/api/products');
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleReset = () => {
    setFilters({
      search: '',
      category: 'All',
      brand: 'All',
      minPrice: 0,
      maxPrice: 2000000,
    });
    setSortOrder('relevant');
  };

  const handleProductDelete = (deletedId) => {
    setProducts(prev => prev.filter(p => p._id !== deletedId));
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    console.log("Filtering with:", filters);
    const filtered = products.filter((product) => {
      const matchSearch = product.name?.toLowerCase().includes(filters.search.toLowerCase()) || false;
      const matchCategory = filters.category === 'All' || product.category?.toLowerCase() === filters.category?.toLowerCase();
      const matchBrand = filters.brand === 'All' || product.brand?.toLowerCase() === filters.brand?.toLowerCase();
      const matchPrice = Number(product.price) >= Number(filters.minPrice) && Number(product.price) <= Number(filters.maxPrice);
      
      const isMatch = matchSearch && matchCategory && matchBrand && matchPrice;
      return isMatch;
    });
    return filtered.sort((a, b) => {
        if (sortOrder === 'lowToHigh') return a.price - b.price;
        if (sortOrder === 'highToLow') return b.price - a.price;
        return 0;
    });
  }, [filters, sortOrder, products]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <FilterSidebar filters={filters} setFilters={setFilters} onReset={handleReset} />
        </aside>

        {/* Main Content Areas */}
        <main className="flex-1">
          {/* Top Header / Sorting */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-gray-200/40 border border-white mb-8 flex flex-col lg:flex-row justify-between items-center gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none flex items-baseline gap-2 border-b-4 border-pink-500 pb-2">
    Product <span className="text-pink-600 drop-shadow-[0_10px_10px_rgba(219,39,119,0.2)]">Catalog</span>
</h1>
              <span className="text-pink-600 px-3 py-1 bg-pink-50 rounded-full text-sm font-bold border border-pink-100">{filteredProducts.length} Items</span>
              {/* Add Product Button for Admins */}
              {user?.role === 'admin' && (
                <Link 
                  to="/admin/add-product"
                  className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-2xl hover:bg-pink-600 transition-all shadow-lg active:scale-95 group font-bold text-sm"
                >
                  <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                  Add New Product
                </Link>
              )}
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                <SlidersHorizontal size={14} className="text-gray-400" />
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Sort by</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-700 cursor-pointer outline-none min-w-[120px]"
                >
                  <option value="relevant">Relevant</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>


          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-80"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} onDelete={handleProductDelete} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="text-gray-400 mb-4">
                 <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term to find what you're looking for.</p>
              <button 
                onClick={handleReset}
                className="mt-6 px-6 py-2 bg-pink-100 text-pink-700 font-medium rounded-md hover:bg-pink-200 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
