import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { 
    name: 'iPhone', 
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-1-202409?wid=600&hei=600&fmt=p-jpg&qlt=95&.v=1723146433543', 
    path: '/products?category=iPhone' 
  },
  { 
    name: 'AirPods', 
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=600&hei=600&fmt=jpeg&qlt=95&.v=1694014871985', 
    path: '/products?category=AirPods' 
  },
  { 
    name: 'iPad', 
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-model-select-gallery-1-202405?wid=600&hei=600&fmt=p-jpg&qlt=95&.v=1713302525141', 
    path: '/products?category=iPad' 
  },
  { 
    name: 'Watch', 
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=500', 
    path: '/products?category=Watch' 
  },
  { 
    name: 'Mac', 
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-card-40-macbookpro-14-16-202310?wid=600&hei=600&fmt=p-jpg&qlt=95&.v=1697230410752', 
    path: '/products?category=Mac' 
  },
  { 
    name: 'Accessories', 
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWNF3?wid=600&hei=600&fmt=jpeg&qlt=95&.v=1723226955000', 
    path: '/products?category=Accessories' 
  },
  { 
    name: 'More', 
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-single-select-202104?wid=600&hei=600&fmt=jpeg&qlt=95&.v=1617761671000', 
    path: '/products' 
  },
];

const CategoryGrid = () => {
  return (
    <section id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-12">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-10">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              to={cat.path}
              className="flex flex-col items-center group"
            >
              <div className="h-28 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="h-full w-auto object-contain" 
                />
              </div>
              <span className="text-sm font-medium text-gray-600 group-hover:text-black transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
