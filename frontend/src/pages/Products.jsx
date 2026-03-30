import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Plus, LayoutGrid, Layout, Search, PackageSearch } from 'lucide-react';

const Products = () => {
  const { user } = useSelector(state => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'All';
  const urlSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: urlSearch,
    category: urlCategory,
    brand: 'All',
    minPrice: 0,
    maxPrice: 2000000,
  });

  const [sortOrder, setSortOrder] = useState('relevant');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: searchParams.get('category') || 'All',
      search: searchParams.get('search') || ''
    }));
  }, [searchParams]);

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
    setCurrentPage(1);
  };

  const handleProductDelete = (deletedId) => {
    setProducts(prev => prev.filter(p => p._id !== deletedId));
  };

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchSearch = product.name?.toLowerCase().includes(filters.search.toLowerCase()) || false;
      const matchCategory = filters.category === 'All' || product.category?.toLowerCase() === filters.category?.toLowerCase();
      const matchBrand = filters.brand === 'All' || product.brand?.toLowerCase() === filters.brand?.toLowerCase();
      const matchPrice = Number(product.price) >= Number(filters.minPrice) && Number(product.price) <= Number(filters.maxPrice);
      return matchSearch && matchCategory && matchBrand && matchPrice;
    });
    
    return filtered.sort((a, b) => {
      if (sortOrder === 'lowToHigh') return a.price - b.price;
      if (sortOrder === 'highToLow') return b.price - a.price;
      return 0;
    });
  }, [filters, sortOrder, products]);

  // Reset to first page when filtering or changing items per page
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOrder, itemsPerPage]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-24 pb-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-black text-zinc-400 mb-10 uppercase tracking-[0.3em] bg-white w-fit px-6 py-2 rounded-full border border-zinc-100 shadow-sm">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span className="text-zinc-200">/</span>
          <span className="text-zinc-900">{filters.category}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mx-4" />
          <span className="text-zinc-500 normal-case tracking-normal font-bold">
            {filteredProducts.length} devices found
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-[300px] flex-shrink-0">
             <FilterSidebar filters={filters} setFilters={setFilters} onReset={handleReset} />
          </aside>

          {/* Main Area */}
          <section className="flex-1">
            
            {/* Top Bar Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-10">
                <div className="space-y-1">
                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 mb-2">{filters.category}</h1>
                  <p className="text-xs font-black text-zinc-400 uppercase tracking-[0.4em] ml-1">Premium Selection</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-8 bg-white p-3 rounded-3xl border border-zinc-100 shadow-sm group">
                    <div className="flex items-center gap-5 px-4 h-10 border-r border-zinc-100">
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Show:</span>
                        <div className="flex gap-4">
                            {[9, 12, 18, 24].map(n => (
                                <button 
                                    key={n} 
                                    onClick={() => setItemsPerPage(n)}
                                    className={`text-xs font-black transition-all ${itemsPerPage === n ? 'text-blue-600 scale-110' : 'text-zinc-400 hover:text-zinc-900'}`}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 h-10 border-r border-zinc-100 pr-8 pl-4">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-zinc-50 border border-zinc-100 text-blue-600 shadow-inner' : 'text-zinc-300 hover:text-blue-600 border border-transparent'}`}
                        >
                          <LayoutGrid size={18} />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-zinc-50 border border-zinc-100 text-blue-600 shadow-inner' : 'text-zinc-300 hover:text-blue-600 border border-transparent'}`}
                        >
                          <Layout size={18} />
                        </button>
                    </div>

                    <div className="relative pr-6">
                        <select 
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="bg-transparent border-none text-[10px] font-black text-zinc-700 uppercase tracking-[0.2em] outline-none cursor-pointer appearance-none min-w-[180px]"
                        >
                            <option value="relevant">Sort by popularity</option>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Action */}
            {user?.role === 'admin' && user?.email === 'sithumkaveesha1212@gmail.com' && (
              <div className="mb-12">
                <Link 
                  to="/admin/add-product"
                  className="inline-flex items-center gap-4 bg-zinc-900 hover:bg-black text-white px-8 py-4.5 rounded-[24px] transition-all shadow-xl active:scale-95 group font-black text-xs uppercase tracking-[0.2em]"
                >
                  <Plus size={22} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
                  Launch New Product
                </Link>
              </div>
            )}

            {/* Grid */}
            {loading ? (
              <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10" : "flex flex-col gap-6"}>
                {[...Array(itemsPerPage)].map((_, i) => (
                  <div key={i} className={`bg-white animate-pulse rounded-[48px] border border-zinc-100 ${viewMode === 'list' ? 'h-64' : 'aspect-[4/5]'}`}></div>
                ))}
              </div>
            ) : currentProducts.length > 0 ? (
              <>
                <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10" : "flex flex-col gap-6"}>
                  {currentProducts.map((product) => (
                    <ProductCard key={product._id} product={product} onDelete={handleProductDelete} viewMode={viewMode} />
                  ))}
                </div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-16 flex justify-between items-center bg-white p-4 rounded-[24px] border border-zinc-100 shadow-sm">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-6 py-3 bg-zinc-50 border border-zinc-100 rounded-[16px] text-[10px] font-black text-zinc-600 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-[0.2em] transition-all active:scale-95"
                        >
                            Previous Frame
                        </button>
                        <div className="flex items-center gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-full text-xs font-black transition-all border ${currentPage === i + 1 ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' : 'bg-transparent text-zinc-500 border-transparent hover:bg-zinc-50 hover:border-zinc-200'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-6 py-3 bg-zinc-50 border border-zinc-100 rounded-[16px] text-[10px] font-black text-zinc-600 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-[0.2em] transition-all active:scale-95"
                        >
                            Next Frame
                        </button>
                    </div>
                )}
              </>
            ) : (
              <div className="bg-white p-24 rounded-[60px] border border-zinc-100 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden group">
                <div className="w-32 h-32 bg-zinc-50 rounded-full flex items-center justify-center mb-10 text-zinc-300 border border-zinc-100 shadow-inner">
                   <PackageSearch size={64} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-black text-zinc-900 mb-4 tracking-tight">No units found</h3>
                <p className="text-zinc-500 max-w-sm mx-auto mb-12 text-base font-medium leading-relaxed">Try adjusting your filters or search parameters.</p>
                <button 
                  onClick={handleReset}
                  className="px-12 py-5 bg-zinc-900 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-blue-600 transition-all shadow-xl active:scale-95"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Products;
