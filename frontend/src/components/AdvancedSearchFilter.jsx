import React, { useState } from 'react';
import { PiMagnifyingGlass, PiSliders, PiFunnel, PiX } from 'react-icons/pi';

const AdvancedSearchFilter = ({ 
  filters, 
  onFilterChange, 
  searchFields = [],
  sortOptions = [] 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
      {/* Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <PiMagnifyingGlass className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="جستجو در بین قالب‌ها..."
            className="w-full bg-white border border-gray-200 rounded-2xl pl-4 pr-12 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:shadow-lg transition-all duration-300"
          >
            <PiSliders className="text-xl" />
            فیلترها
          </button>
          
          <select
            className="bg-white border border-gray-200 rounded-2xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.sort}
            onChange={(e) => onFilterChange('sort', e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {isFilterOpen && (
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchFields.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters[field.name] || ''}
                    onChange={(e) => onFilterChange(field.name, e.target.value)}
                  >
                    <option value="">همه</option>
                    {field.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'range' ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={field.min}
                      max={field.max}
                      value={filters[field.name] || field.min}
                      onChange={(e) => onFilterChange(field.name, e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-sm font-bold text-gray-600">
                      {filters[field.name] || field.min}
                    </span>
                  </div>
                ) : (
                  <input
                    type="text"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters[field.name] || ''}
                    onChange={(e) => onFilterChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
          
          {/* Clear Filters */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                onFilterChange('clear', '');
                setIsFilterOpen(false);
              }}
              className="text-red-500 hover:text-red-700 flex items-center gap-2 font-bold"
            >
              <PiX />
              پاک کردن فیلترها
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchFilter;