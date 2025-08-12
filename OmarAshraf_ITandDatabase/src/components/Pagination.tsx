import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalProducts: number;
  productsPerPage: number;
}

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalProducts, 
  productsPerPage 
}: PaginationProps) => {
  // Calculate the range of products being shown
  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(currentPage * productsPerPage, totalProducts);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 space-y-4">
      {/* Products Info */}
      <div className="text-center text-sm text-gray-600">
        Showing <span className="font-medium">{startProduct}</span> to{' '}
        <span className="font-medium">{endProduct}</span> of{' '}
        <span className="font-medium">{totalProducts}</span> products
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <div key={`ellipsis-${index}`} className="px-2 py-2">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              );
            }

            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Mobile Page Info */}
      <div className="sm:hidden text-center text-xs text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;