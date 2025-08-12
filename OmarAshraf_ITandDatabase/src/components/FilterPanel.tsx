import type { Dispatch, SetStateAction } from 'react';
import { DollarSign, SlidersHorizontal } from 'lucide-react';

// Prop types for FilterPanel
interface FilterPanelProps {
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
}

const FilterPanel = ({ priceRange, setPriceRange }: FilterPanelProps) => {
  const handleMinChange = (value: string) => {
    const numValue = Math.max(0, Number(value) || 0);
    setPriceRange([numValue, Math.max(numValue, priceRange[1])]);
  };

  const handleMaxChange = (value: string) => {
    const numValue = Number(value) || 1000;
    setPriceRange([Math.min(priceRange[0], numValue), numValue]);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4 lg:mb-6">
        <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-lg text-gray-800">Filters</h3>
      </div>

      {/* Price Range Section */}
      <div className="space-y-3 lg:space-y-4">
        <h4 className="font-medium text-gray-700 text-sm uppercase tracking-wide">Price Range</h4>
        
        {/* Price Range Inputs */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-3 lg:space-y-0">
          <div className="relative">
            <label className="block text-xs text-gray-500 mb-1">Min Price</label>
            <DollarSign className="absolute left-3 top-9 transform -translate-y-1/2 w-4 h-4 text-gray-400 mt-0.5" />
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handleMinChange(e.target.value)}
              min="0"
              placeholder="0"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <label className="block text-xs text-gray-500 mb-1">Max Price</label>
            <DollarSign className="absolute left-3 top-9 transform -translate-y-1/2 w-4 h-4 text-gray-400 mt-0.5" />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handleMaxChange(e.target.value)}
              min={priceRange[0]}
              placeholder="1000"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div className="pt-2">
          <p className="text-xs text-gray-500 mb-2">Quick filters</p>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:space-y-2 lg:gap-0">
            <button
              onClick={() => setPriceRange([0, 25])}
              className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-left"
            >
              Under $25
            </button>
            <button
              onClick={() => setPriceRange([25, 100])}
              className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-left"
            >
              $25 - $100
            </button>
            <button
              onClick={() => setPriceRange([100, 500])}
              className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-left"
            >
              $100 - $500
            </button>
            <button
              onClick={() => setPriceRange([0, 1000])}
              className="w-full px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors text-left"
            >
              Show All
            </button>
          </div>
        </div>

        {/* Current Range Display */}
        <div className="pt-3 lg:pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">Current range</p>
          <p className="font-medium text-gray-800">
            ${priceRange[0]} - ${priceRange[1]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;