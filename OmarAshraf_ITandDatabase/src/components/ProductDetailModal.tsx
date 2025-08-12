import { useContext } from 'react';
import { X, ShoppingCart, Star, Tag } from 'lucide-react';
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

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('ProductDetailModal must be used within a CartContext.Provider');
  }
  const { setCartItems } = context;

  const handleAddToCart = () => {
    setCartItems(prev => prev + 1);
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex flex-col lg:flex-row flex-1 min-h-0">
            {/* Product Image */}
            <div className="lg:w-1/2 bg-gray-50 p-8 flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Product Details - Scrollable */}
            <div className="lg:w-1/2 flex flex-col min-h-0">
              <div className="flex-1 p-8 overflow-y-auto">
                <div className="space-y-6">
                  {/* Category */}
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-600 capitalize">
                      {product.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                    {product.title}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating.rate)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      {product.rating.rate} ({product.rating.count} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="py-4">
                    <span className="text-4xl font-bold text-indigo-600">
                      ${product.price}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">Features</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                        High quality materials
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                        Fast shipping available
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                        Customer satisfaction guaranteed
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sticky Add to Cart Section */}
              <div className="border-t border-gray-200 p-6 bg-white">
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center space-x-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>Add to Cart</span>
                </button>
                
                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-500">
                    Free shipping on orders over $50
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;