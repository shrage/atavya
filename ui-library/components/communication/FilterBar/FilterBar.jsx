import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FilterBar = ({
  filters = [],
  activeFilterId = null,
  allowMultiple = false,
  onChange,
  className = '',
}) => {
  const [activeFilters, setActiveFilters] = useState(
    activeFilterId ? (Array.isArray(activeFilterId) ? activeFilterId : [activeFilterId]) : []
  );

  const handleFilterClick = (filterId) => {
    let newActiveFilters;
    
    if (allowMultiple) {
      // Toggle the filter in multiple selection mode
      newActiveFilters = activeFilters.includes(filterId)
        ? activeFilters.filter(id => id !== filterId)
        : [...activeFilters, filterId];
    } else {
      // In single selection mode, select the clicked filter or deselect if already active
      newActiveFilters = activeFilters.includes(filterId) ? [] : [filterId];
    }
    
    setActiveFilters(newActiveFilters);
    
    if (onChange) {
      onChange(allowMultiple ? newActiveFilters : newActiveFilters[0] || null);
    }
  };

  const handleClearAll = () => {
    setActiveFilters([]);
    if (onChange) {
      onChange(allowMultiple ? [] : null);
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex flex-wrap gap-2 flex-grow">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200
              flex items-center gap-1
              ${activeFilters.includes(filter.id) 
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
            onClick={() => handleFilterClick(filter.id)}
          >
            {filter.icon && (
              <span className="w-4 h-4">{filter.icon}</span>
            )}
            {filter.label}
            {filter.count !== undefined && (
              <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                activeFilters.includes(filter.id) ? 'bg-blue-200' : 'bg-gray-200'
              }`}>
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>
      
      {activeFilters.length > 0 && (
        <button
          className="text-sm text-gray-500 hover:text-gray-700"
          onClick={handleClearAll}
        >
          Clear all
        </button>
      )}
    </div>
  );
};

FilterBar.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      count: PropTypes.number,
    })
  ).isRequired,
  activeFilterId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
  allowMultiple: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default FilterBar;
