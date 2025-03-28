import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * BaseList component - Foundation for all list views in the application
 * Provides core list functionality including sorting, filtering, grouping, and selection
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <BaseList
 *   data={items}
 *   columns={columns}
 *   defaultSortField="createdAt"
 *   defaultSortDirection="desc"
 *   onSelectionChange={handleSelectionChange}
 * />
 * ```
 */
const BaseList = ({
  // Data
  data = [],
  columns = [],
  keyField = 'id',
  
  // Display options
  loading = false,
  emptyMessage = 'No items found',
  className,
  
  // Selection
  selectable = true,
  multiSelect = true,
  defaultSelectedKeys = [],
  onSelectionChange,
  
  // Sorting
  defaultSortField = null,
  defaultSortDirection = 'asc',
  sortable = true,
  
  // Filtering
  filters = {},
  onFilterChange,
  
  // Grouping
  groupBy = null,
  defaultGroupsExpanded = true,
  
  // Pagination
  paginate = true,
  defaultPageSize = 25,
  defaultPage = 1,
  
  // Rendering overrides
  renderItem,
  renderGroupHeader,
  renderHeader,
  renderFooter,
  
  // Config panel
  showConfigPanel = false,
  onConfigPanelToggle,
  
  // Callbacks
  onItemClick,
  onSort,
  onPageChange,
  onPageSizeChange,
}) => {
  // State for internal list behavior
  const [selectedKeys, setSelectedKeys] = useState(defaultSelectedKeys || []);
  const [sortField, setSortField] = useState(defaultSortField);
  const [sortDirection, setSortDirection] = useState(defaultSortDirection);
  const [currentFilters, setCurrentFilters] = useState(filters || {});
  const [page, setPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [expandedGroups, setExpandedGroups] = useState({});

  // Initialize expanded groups
  useEffect(() => {
    if (groupBy && data.length > 0) {
      const groups = {};
      const uniqueGroups = [...new Set(data.map(item => item[groupBy] || 'Ungrouped'))];
      uniqueGroups.forEach(group => {
        groups[group] = defaultGroupsExpanded;
      });
      setExpandedGroups(groups);
    }
  }, [groupBy, data, defaultGroupsExpanded]);

  // Apply sorting to data
  const sortedData = useMemo(() => {
    if (!sortField) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      // Handle nulls
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
      
      // Handle dates
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === 'asc' 
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }
      
      // Try to parse dates
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        if (!isNaN(aDate) && !isNaN(bDate)) {
          return sortDirection === 'asc' 
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        }
      }
      
      // Default comparison
      return sortDirection === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [data, sortField, sortDirection]);

  // Apply filters to data
  const filteredData = useMemo(() => {
    if (Object.keys(currentFilters).length === 0) return sortedData;
    
    return sortedData.filter(item => {
      // Check each filter
      return Object.entries(currentFilters).every(([field, { operator, value }]) => {
        const itemValue = item[field];
        
        if (itemValue === undefined || itemValue === null) return false;
        
        switch (operator) {
          case 'equals':
            return itemValue === value;
          case 'contains':
            return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
          case 'startsWith':
            return String(itemValue).toLowerCase().startsWith(String(value).toLowerCase());
          case 'endsWith':
            return String(itemValue).toLowerCase().endsWith(String(value).toLowerCase());
          case 'greaterThan':
            return itemValue > value;
          case 'lessThan':
            return itemValue < value;
          default:
            return true;
        }
      });
    });
  }, [sortedData, currentFilters]);

  // Group data if needed
  const groupedData = useMemo(() => {
    if (!groupBy) return {};
    
    return filteredData.reduce((acc, item) => {
      const groupValue = item[groupBy] || 'Ungrouped';
      if (!acc[groupValue]) {
        acc[groupValue] = [];
      }
      acc[groupValue].push(item);
      return acc;
    }, {});
  }, [filteredData, groupBy]);

  // Apply pagination
  const paginatedData = useMemo(() => {
    if (!paginate) return filteredData;
    
    const startIndex = (page - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, paginate, page, pageSize]);

  // Handle item selection
  const handleItemSelect = useCallback((item) => {
    const itemKey = item[keyField];
    
    setSelectedKeys(prevSelected => {
      if (prevSelected.includes(itemKey)) {
        return prevSelected.filter(key => key !== itemKey);
      } else {
        return multiSelect 
          ? [...prevSelected, itemKey]
          : [itemKey];
      }
    });
  }, [keyField, multiSelect]);

  // Notify parent of selection changes
  useEffect(() => {
    onSelectionChange?.(selectedKeys);
  }, [selectedKeys, onSelectionChange]);

  // Handle sorting
  const handleSort = useCallback((field) => {
    if (!sortable) return;
    
    setSortDirection(prev => 
      field === sortField
        ? prev === 'asc' ? 'desc' : 'asc'
        : 'asc'
    );
    setSortField(field);
    
    onSort?.(field, sortDirection === 'asc' ? 'desc' : 'asc');
  }, [sortable, sortField, sortDirection, onSort]);

  // Handle filter changes
  const handleFilterChange = useCallback((field, operator, value) => {
    setCurrentFilters(prev => ({
      ...prev,
      [field]: { operator, value }
    }));
    
    onFilterChange?.(field, operator, value);
  }, [onFilterChange]);

  // Handle pagination
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    onPageChange?.(newPage);
  }, [onPageChange]);

  const handlePageSizeChange = useCallback((newSize) => {
    setPageSize(newSize);
    setPage(1); // Reset to first page when changing page size
    onPageSizeChange?.(newSize);
  }, [onPageSizeChange]);

  // Toggle group expansion
  const toggleGroupExpansion = useCallback((groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  }, []);

  // Render the list items based on whether we're grouping or not
  const renderListItems = () => {
    if (groupBy) {
      return Object.entries(groupedData).map(([groupName, items]) => (
        <div key={groupName} className="mb-4">
          <div 
            className="flex items-center bg-background-hover p-3 rounded-t-lg cursor-pointer"
            onClick={() => toggleGroupExpansion(groupName)}
          >
            <span className="mr-2">
              {expandedGroups[groupName] ? '▼' : '►'}
            </span>
            {renderGroupHeader 
              ? renderGroupHeader(groupName, items.length)
              : (
                <div className="flex justify-between w-full">
                  <span className="font-medium">{groupName}</span>
                  <span className="text-text-secondary">{items.length} items</span>
                </div>
              )
            }
          </div>
          
          {expandedGroups[groupName] && (
            <div className="border border-border-light rounded-b-lg">
              {items.length > 0 ? (
                items.map(item => (
                  <div 
                    key={item[keyField]} 
                    className={twMerge(
                      'p-4 border-b border-border-light last:border-b-0',
                      selectedKeys.includes(item[keyField]) && 'bg-primary-light bg-opacity-20',
                      selectable && 'cursor-pointer hover:bg-background-hover'
                    )}
                    onClick={() => {
                      if (selectable) handleItemSelect(item);
                      onItemClick?.(item);
                    }}
                  >
                    {renderItem ? renderItem(item) : renderDefaultItem(item)}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-text-secondary">{emptyMessage}</div>
              )}
            </div>
          )}
        </div>
      ));
    } else {
      // Non-grouped list
      return paginatedData.length > 0 ? (
        paginatedData.map(item => (
          <div 
            key={item[keyField]} 
            className={twMerge(
              'p-4 border-b border-border-light last:border-b-0',
              selectedKeys.includes(item[keyField]) && 'bg-primary-light bg-opacity-20',
              selectable && 'cursor-pointer hover:bg-background-hover'
            )}
            onClick={() => {
              if (selectable) handleItemSelect(item);
              onItemClick?.(item);
            }}
          >
            {renderItem ? renderItem(item) : renderDefaultItem(item)}
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-text-secondary">{emptyMessage}</div>
      );
    }
  };

  // Default item renderer
  const renderDefaultItem = (item) => {
    return (
      <div className="flex items-center">
        {selectable && (
          <input 
            type="checkbox" 
            checked={selectedKeys.includes(item[keyField])}
            onChange={() => {}} // Handled by parent div click
            className="mr-3" 
          />
        )}
        <div className="flex-1">
          {columns.map((column, index) => (
            <div key={column.key} className={index > 0 ? 'mt-1' : ''}>
              {column.header && <span className="text-text-secondary text-sm mr-2">{column.header}:</span>}
              <span>{item[column.key]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render header with sort controls
  const renderHeaderRow = () => {
    if (renderHeader) return renderHeader({
      columns,
      sortField,
      sortDirection,
      onSort: handleSort
    });

    return (
      <div className="flex items-center bg-background-skeleton p-3 border-b border-border-light">
        {selectable && (
          <div className="mr-3">
            <input 
              type="checkbox" 
              checked={data.length > 0 && selectedKeys.length === data.length}
              onChange={() => {
                if (selectedKeys.length === data.length) {
                  setSelectedKeys([]);
                } else {
                  setSelectedKeys(data.map(item => item[keyField]));
                }
              }}
            />
          </div>
        )}
        
        <div className="flex-1 grid grid-cols-12 gap-4">
          {columns.map(column => (
            <div 
              key={column.key} 
              className={twMerge(
                'col-span-4',
                column.width && `col-span-${column.width}`,
                sortable && 'cursor-pointer hover:bg-background-hover'
              )}
              onClick={() => sortable && handleSort(column.key)}
            >
              <div className="flex items-center">
                <span className="font-medium">{column.header}</span>
                {sortField === column.key && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render pagination controls
  const renderPagination = () => {
    if (!paginate) return null;
    
    const totalPages = Math.ceil(filteredData.length / pageSize);

    return (
      <div className="flex items-center justify-between p-3 bg-background-skeleton border-t border-border-light">
        <div className="flex items-center">
          <span className="text-sm text-text-primary mr-2">
            Rows per page:
          </span>
          <select 
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="border border-border-light rounded px-2 py-1 text-sm"
          >
            {[10, 25, 50, 100].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm text-text-primary mr-4">
            {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filteredData.length)} of {filteredData.length}
          </span>
          
          <button 
            className="p-1 rounded hover:bg-background-hover disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            <span className="text-lg">←</span>
          </button>
          
          <button 
            className="p-1 ml-2 rounded hover:bg-background-hover disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={twMerge('border border-border-light rounded-lg', className)}>
      {/* List Header */}
      {renderHeaderRow()}
      
      {/* Main Content */}
      <div className={twMerge(
        'divide-y divide-border-light',
        loading && 'opacity-50'
      )}>
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-2 text-text-secondary">Loading...</p>
          </div>
        ) : (
          renderListItems()
        )}
      </div>
      
      {/* Footer with Pagination */}
      {renderFooter 
        ? renderFooter({ 
            totalItems: filteredData.length, 
            selectedItems: selectedKeys.length 
          })
        : renderPagination()
      }
    </div>
  );
};

BaseList.propTypes = {
  /** List data items */
  data: PropTypes.array,
  /** Column definitions */
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    header: PropTypes.string,
    width: PropTypes.number,
    sortable: PropTypes.bool,
    render: PropTypes.func,
  })),
  /** Field to use as unique key */
  keyField: PropTypes.string,
  /** Loading state */
  loading: PropTypes.bool,
  /** Message to display when list is empty */
  emptyMessage: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Whether items can be selected */
  selectable: PropTypes.bool,
  /** Whether multiple items can be selected */
  multiSelect: PropTypes.bool,
  /** Initially selected item keys */
  defaultSelectedKeys: PropTypes.array,
  /** Called when selection changes */
  onSelectionChange: PropTypes.func,
  /** Default field to sort by */
  defaultSortField: PropTypes.string,
  /** Default sort direction */
  defaultSortDirection: PropTypes.oneOf(['asc', 'desc']),
  /** Whether sorting is enabled */
  sortable: PropTypes.bool,
  /** Initial filters */
  filters: PropTypes.object,
  /** Called when filters change */
  onFilterChange: PropTypes.func,
  /** Field to group items by */
  groupBy: PropTypes.string,
  /** Whether groups are expanded by default */
  defaultGroupsExpanded: PropTypes.bool,
  /** Whether pagination is enabled */
  paginate: PropTypes.bool,
  /** Default page size */
  defaultPageSize: PropTypes.number,
  /** Default page */
  defaultPage: PropTypes.number,
  /** Custom item renderer */
  renderItem: PropTypes.func,
  /** Custom group header renderer */
  renderGroupHeader: PropTypes.func,
  /** Custom header renderer */
  renderHeader: PropTypes.func,
  /** Custom footer renderer */
  renderFooter: PropTypes.func,
  /** Whether to show configuration panel */
  showConfigPanel: PropTypes.bool,
  /** Called when config panel toggle is clicked */
  onConfigPanelToggle: PropTypes.func,
  /** Called when an item is clicked */
  onItemClick: PropTypes.func,
  /** Called when sort changes */
  onSort: PropTypes.func,
  /** Called when page changes */
  onPageChange: PropTypes.func,
  /** Called when page size changes */
  onPageSizeChange: PropTypes.func,
};

export default BaseList;
