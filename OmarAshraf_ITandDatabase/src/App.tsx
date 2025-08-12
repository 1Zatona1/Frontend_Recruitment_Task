import { useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import FilterPanel from './components/FilterPanel';
import ProductDetailModal from './components/ProductDetailModal';
import Pagination from './components/Pagination';
import { SkeletonLoader } from './components/SkeletonLoader';
import { Error } from './components/Error';


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


function App() {
  const [cartItems, setCartItems] = useState<number>(3); // Dummy initial cart item count
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // State for filtering, now managed in the parent App component
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PRODUCTS_PER_PAGE = 8;

  // Get unique categories for the filter buttons
  const categories = ['all', ...new Set(allProducts.map(product => product.category))];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw {"message": "Failed to fetch products"};
        }
        const data: Product[] = await response.json();
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // This useEffect handles all filtering logic
  useEffect(() => {
    let currentFiltered = [...allProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      currentFiltered = currentFiltered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      currentFiltered = currentFiltered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    currentFiltered = currentFiltered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(currentFiltered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allProducts, selectedCategory, searchTerm, priceRange]);

  // This useEffect handles pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage, PRODUCTS_PER_PAGE]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <div className="bg-gray-100 min-h-screen">
        <Header 
          categories={categories} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        <main className="container mx-auto p-4">          
          {isLoading && <SkeletonLoader />}
          {error && <Error message={error} />}
          
          {!isLoading && !error && (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Sidebar - Filter Panel */}
              <aside className="lg:w-80 lg:flex-shrink-0">
                <div className="lg:sticky lg:top-24">
                  <FilterPanel 
                    priceRange={priceRange} 
                    setPriceRange={setPriceRange}
                  />
                </div>
              </aside>

              {/* Right Content - Product Grid */}
              <div className="flex-1 min-w-0">
                <ProductGrid 
                  products={paginatedProducts} 
                  onViewDetails={handleViewDetails}
                />
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalProducts={filteredProducts.length}
                    productsPerPage={PRODUCTS_PER_PAGE}
                  />
                )}
              </div>
            </div>
          )}
        </main>
        
        {/* Product Detail Modal */}
        <ProductDetailModal 
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </CartContext.Provider>
  );
}

export default App;