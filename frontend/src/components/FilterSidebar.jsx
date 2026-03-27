import React from 'react';
import { Search, Tag, Briefcase, IndianRupee, RotateCcw } from 'lucide-react';

const FilterSidebar = ({ filters, setFilters, onReset }) => {
  const categories = ['All', 'Mobile', 'Headphone', 'Laptop', 'TV'];
  const brands = ['All', 'Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'OnePlus', 'boAt'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full md:w-64 bg-white/70 backdrop-blur-xl p-6 rounded-[32px] shadow-xl shadow-gray-200/50 h-fit sticky top-24 border border-white/50 space-y-8 animate-in fade-in slide-in-from-left-4 duration-1000">
      {/* Search Section */}
      <div className="space-y-3 px-1">
        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <Search size={12} className="text-pink-600" />
          Find Product
        </label>
        <div className="relative group">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Type keywords..."
            className="w-full h-11 pl-4 pr-10 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all text-sm font-medium outline-none placeholder:text-gray-300"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-pink-500 transition-colors pointer-events-none">
            <Search size={16} />
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="px-1">
        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
          <Tag size={12} className="text-pink-600" />
          Collections
        </label>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center group cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={filters.category === cat}
                  onChange={handleChange}
                  className="peer appearance-none w-5 h-5 border-2 border-gray-100 rounded-full checked:border-pink-500 transition-all cursor-pointer"
                />
                <div className="absolute w-2.5 h-2.5 bg-pink-500 rounded-full scale-0 peer-checked:scale-100 transition-transform duration-300" />
              </div>
              <span className={`ml-3 text-sm transition-all duration-300 ${filters.category === cat ? 'text-gray-900 font-bold' : 'text-gray-500 font-medium group-hover:text-pink-500'}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Section */}
      <div className="px-1">
        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
          <Briefcase size={12} className="text-pink-600" />
          Brand Lineup
        </label>
        <select
          name="brand"
          value={filters.brand}
          onChange={handleChange}
          className="w-full h-11 px-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all text-sm font-bold text-gray-700 appearance-none cursor-pointer"
        >
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Price Scaling Section */}
      <div className="px-1">
        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
          <IndianRupee size={12} className="text-pink-600" />
          Budget Range
        </label>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-50 p-2 rounded-xl border border-gray-100 text-center">
              <p className="text-[9px] font-black text-gray-300 uppercase leading-none mb-1">Min</p>
              <p className="text-xs font-bold text-gray-800 leading-none">{filters.minPrice.toLocaleString()}</p>
            </div>
            <div className="w-2 h-[2px] bg-gray-100" />
            <div className="flex-1 bg-gray-50 p-2 rounded-xl border border-gray-100 text-center">
              <p className="text-[9px] font-black text-gray-300 uppercase leading-none mb-1">Max</p>
              <p className="text-xs font-bold text-gray-800 leading-none">{filters.maxPrice.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="relative pt-1">
            <input
              type="range"
              name="maxPrice"
              min="0"
              max="2000000"
              step="50000"
              value={filters.maxPrice}
              onChange={handleChange}
              className="w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-pink-600 outline-none hover:bg-gray-200 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Reset Section */}
      <div className="pt-4 pointer-events-none">
        <button
          onClick={onReset}
          className="pointer-events-auto w-full h-12 bg-pink-50 text-pink-600 font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-pink-600 hover:text-white transition-all shadow-sm active:scale-[0.98] group flex items-center justify-center gap-2"
        >
          <RotateCcw size={14} className="group-hover:-rotate-45 transition-transform" />
          Clear Workspace
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;

