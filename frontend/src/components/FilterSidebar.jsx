import React from 'react';
import { Search, SlidersHorizontal, PackageCheck, RotateCcw } from 'lucide-react';

const FilterSidebar = ({ filters, setFilters, onReset }) => {
  const categories = ['iPhone', 'Mac', 'iPad', 'Watch', 'AirPods', 'Accessories'];
  
  const colors = [
    { name: 'Black', hex: '#1d1d1f', count: 6 },
    { name: 'Blue', hex: '#637599', count: 4 },
    { name: 'Pink', hex: '#d597a8', count: 4 },
    { name: 'Silver', hex: '#e3e3e3', count: 2 },
    { name: 'White', hex: '#f5f5f7', count: 5 },
    { name: 'Black Titanium', hex: '#3c3c3d', count: 4 }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  return (
    <div className="space-y-12 relative animate-in fade-in duration-700">
      
      {/* Search Section */}
      <div className="space-y-6">
        <h3 className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.2em] flex items-center gap-3">
          <Search size={14} className="text-blue-600" />
          Find Device
        </h3>
        <div className="relative group">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="e.g. iPhone 16 Pro"
            className="w-full h-14 pl-6 pr-14 bg-white rounded-2xl border border-zinc-200 text-zinc-900 focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 transition-all text-xs font-bold outline-none placeholder:text-zinc-400 shadow-sm"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-blue-600 transition-colors">
            <Search size={20} />
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div className="space-y-6">
        <h3 className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.2em] px-1">Availability</h3>
        <div className="space-y-5">
          {['On sale', 'In stock'].map((status) => (
            <label key={status} className="flex items-center gap-4 group cursor-pointer relative">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer appearance-none w-6 h-6 border border-zinc-200 rounded-lg bg-white checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer shadow-sm"
                />
                <PackageCheck size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-900 transition-all">{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div className="space-y-8">
        <h3 className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.2em] px-1">Budget</h3>
        <div className="space-y-8">
          <div className="relative px-2">
            <div className="h-1.5 bg-zinc-200 rounded-full w-full relative overflow-hidden">
                <div className="absolute h-full bg-blue-600 rounded-full " style={{ width: '80%' }}></div>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-5 h-5 bg-white border border-zinc-200 rounded-full cursor-pointer hover:scale-125 transition-transform shadow-md z-10"></div>
            <div className="absolute top-1/2 -translate-y-1/2 left-[80%] w-5 h-5 bg-white border border-zinc-200 rounded-full cursor-pointer hover:scale-125 transition-transform shadow-md z-10"></div>
          </div>
          <div className="flex flex-col gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                Range: <span className="text-zinc-900 font-black">LKR {filters.minPrice.toLocaleString()} — {filters.maxPrice.toLocaleString()}</span>
              </p>
              <button className="h-12 bg-white border border-zinc-200 text-zinc-900 font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95">Filter Budget</button>
          </div>
        </div>
      </div>

      {/* Color Section */}
      <div className="space-y-6">
        <h3 className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.2em] px-1">Aesthetics</h3>
        <div className="grid grid-cols-1 gap-4">
          {colors.map((color) => (
            <div key={color.name} className="flex items-center justify-between group cursor-pointer p-4 rounded-2xl hover:bg-white transition-all border border-transparent hover:border-zinc-100 hover:shadow-sm">
              <div className="flex items-center gap-4">
                <div 
                  className="w-5 h-5 rounded-full border border-zinc-200 shadow-sm transition-transform group-hover:scale-110" 
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-900 transition-colors">{color.name}</span>
              </div>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all">{color.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Section */}
      <div className="pt-8 border-t border-zinc-100">
        <button
          onClick={onReset}
          className="w-full h-14 bg-zinc-50 text-zinc-500 font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:text-white hover:bg-zinc-900 group transition-all flex items-center justify-center gap-4 border border-zinc-100 active:scale-95 shadow-sm"
        >
          <RotateCcw size={16} className="group-hover:-rotate-90 transition-transform duration-700 text-blue-600 group-hover:text-white" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
