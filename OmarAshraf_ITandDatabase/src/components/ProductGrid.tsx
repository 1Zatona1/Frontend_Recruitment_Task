import { useContext } from 'react';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { CartContext } from '../CartContext';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductGridProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
}

const ProductGrid = ({ products, onViewDetails }: ProductGridProps) => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('ProductGrid must be used within a CartContext.Provider');
  }
  const { cartItems, setCartItems } = context;

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevent triggering view details when clicking add to cart
    setCartItems(prev => prev + 1);
  };

  const handleViewDetails = (product: Product) => {
    onViewDetails(product);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
          onClick={() => handleViewDetails(product)}
        >
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-50 p-3 sm:p-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Quick View Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails(product);
              }}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </button>
          </div>

          {/* Product Info */}
          <div className="p-3 sm:p-4">
            <div className="mb-2">
              <span className="inline-block px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full capitalize">
                {product.category}
              </span>
            </div>
            
            <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {product.title}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                <span className="text-xs sm:text-sm text-gray-600 ml-1">
                  {product.rating.rate} ({product.rating.count})
                </span>
              </div>
            </div>
            
            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between">
              <span className="text-lg sm:text-2xl font-bold text-indigo-600">
                ${product.price}
              </span>
              
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="flex items-center space-x-1 sm:space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors font-medium text-sm"
              >
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;