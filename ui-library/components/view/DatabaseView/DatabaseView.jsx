import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * DatabaseView component
 * A Notion-style database view with columns and rows
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <DatabaseView
 *   columns={[
 *     { id: 'name', label: 'Name', type: 'text' },
 *     { id: 'status', label: 'Status', type: 'select' },
 *     { id: 'dueDate', label: 'Due Date', type: 'date' },
 *   ]}
 *   data={[
 *     { id: 1, name: 'Complete project', status: 'In Progress', dueDate: '2025-04-01' },
 *     { id: 2, name: 'Review feedback', status: 'Not Started', dueDate: '2025-04-02' },
 *   ]}
 *   onRowClick={(row) => console.log('Row clicked:', row)}
 * />
 * ```
 */
const DatabaseView = ({
  // Data
  columns = [],
  data = [],
  
  // Configuration
  selectable = true,
  sortable = true,
  filterable = true,
  resizableColumns = true,
  
  // State
  selectedRowIds = [],
  sortConfig = { key: null, direction: 'asc' },
  
  // Callbacks
  onRowClick,
  onSelectionChange,
  onSortChange,
  
  // Display
  className,
  rowClassName,
  headerClassName,
  cellClassName,
  
  // Customization
  renderCell,
}) => {
  // State for internal management
  const [internalSelectedRowIds, setInternalSelectedRowIds] = useState(selectedRowIds || []);
  const [internalSortConfig, setInternalSortConfig] = useState(sortConfig || { key: null, direction: 'asc' });
  const [columnWidths, setColumnWidths] = useState({});
  const [resizingColumn, setResizingColumn] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  
  // References
  const tableRef = useRef(null);
  
  // Effects
  useEffect(() => {
    setInternalSelectedRowIds(selectedRowIds || []);
  }, [selectedRowIds]);
  
  useEffect(() => {
    setInternalSortConfig(sortConfig || { key: null, direction: 'asc' });
  }, [sortConfig]);
  
  // Initialize column widths if not set
  useEffect(() => {
    const initialWidths = {};
    columns.forEach(column => {
      if (!columnWidths[column.id]) {
        initialWidths[column.id] = column.width || 200; // Default width
      }
    });
    
    if (Object.keys(initialWidths).length > 0) {
      setColumnWidths(prev => ({
        ...prev,
        ...initialWidths
      }));
    }
  }, [columns]);
  
  // Handle column resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (resizingColumn) {
        const width = Math.max(100, startWidth + (e.clientX - startX));
        setColumnWidths(prev => ({
          ...prev,
          [resizingColumn]: width,
        }));
      }
    };
    
    const handleMouseUp = () => {
      setResizingColumn(null);
    };
    
    if (resizingColumn) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingColumn, startX, startWidth]);
  
  // Handle row selection
  const handleCheckboxClick = (rowId, e) => {
    e.stopPropagation();
    
    let newSelectedIds;
    if (internalSelectedRowIds.includes(rowId)) {
      newSelectedIds = internalSelectedRowIds.filter(id => id !== rowId);
    } else {
      newSelectedIds = [...internalSelectedRowIds, rowId];
    }
    
    setInternalSelectedRowIds(newSelectedIds);
    
    if (onSelectionChange) {
      onSelectionChange(newSelectedIds);
    }
  };
  
  // Handle row click
  const handleRowClick = (row, e) => {
    if (onRowClick) {
      onRowClick(row, e);
    }
  };
  
  // Handle column resize
  const handleResizeStart = (columnId, e) => {
    setResizingColumn(columnId);
    setStartX(e.clientX);
    setStartWidth(columnWidths[columnId] || 200);
  };
  
  // Toggle sort
  const toggleSort = (columnId) => {
    let direction = 'asc';
    
    if (internalSortConfig.key === columnId) {
      direction = internalSortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    const newSortConfig = { key: columnId, direction };
    setInternalSortConfig(newSortConfig);
    
    if (onSortChange) {
      onSortChange(newSortConfig);
    }
  };
  
  // Sort data
  const sortedData = useMemo(() => {
    if (!internalSortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[internalSortConfig.key];
      const bValue = b[internalSortConfig.key];
      
      if (aValue < bValue) {
        return internalSortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return internalSortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, internalSortConfig]);
  
  // Render table header
  const renderHeader = () => {
    return (
      <div className={twMerge(
        "flex border-b border-border-light bg-background-skeleton px-1 sticky top-0 z-10",
        headerClassName
      )}>
        {/* Selection checkbox header */}
        {selectable && (
          <div className="w-10 flex-shrink-0 p-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border-light text-primary"
              checked={internalSelectedRowIds.length === data.length && data.length > 0}
              onChange={(e) => {
                const newSelectedIds = e.target.checked ? data.map(row => row.id) : [];
                setInternalSelectedRowIds(newSelectedIds);
                
                if (onSelectionChange) {
                  onSelectionChange(newSelectedIds);
                }
              }}
            />
          </div>
        )}
        
        {/* Column headers */}
        {columns.map((column, index) => (
          <div
            key={column.id}
            className="relative flex items-center p-2 font-medium text-text-primary"
            style={{
              width: columnWidths[column.id] || 200,
              minWidth: columnWidths[column.id] || 200,
              cursor: sortable ? 'pointer' : 'default',
            }}
            onClick={sortable ? () => toggleSort(column.id) : undefined}
          >
            <div className="flex items-center space-x-1">
              <span>{column.label}</span>
              
              {/* Sort indicator */}
              {internalSortConfig.key === column.id && (
                <span className="ml-1">
                  {internalSortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </div>
            
            {/* Column resize handle */}
            {resizableColumns && (
              <div
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize group"
                onMouseDown={(e) => handleResizeStart(column.id, e)}
              >
                <div className="invisible absolute right-0 h-full w-1 bg-primary group-hover:visible" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  // Render table rows
  const renderRows = () => {
    if (sortedData.length === 0) {
      return (
        <div className="px-1 py-4 text-center text-text-secondary italic">
          No data to display
        </div>
      );
    }
    
    return sortedData.map((row) => (
      <div
        key={row.id}
        className={twMerge(
          "flex border-b border-border-light px-1 hover:bg-background-hover",
          internalSelectedRowIds.includes(row.id) ? "bg-primary-light bg-opacity-10" : "",
          rowClassName
        )}
        onClick={(e) => handleRowClick(row, e)}
      >
        {/* Selection checkbox */}
        {selectable && (
          <div className="w-10 flex-shrink-0 p-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border-light text-primary"
              checked={internalSelectedRowIds.includes(row.id)}
              onChange={(e) => handleCheckboxClick(row.id, e)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        
        {/* Row cells */}
        {columns.map((column) => (
          <div
            key={`${row.id}-${column.id}`}
            className={twMerge(
              "p-2 truncate",
              cellClassName
            )}
            style={{
              width: columnWidths[column.id] || 200,
              minWidth: columnWidths[column.id] || 200,
            }}
          >
            {renderCell ? (
              renderCell(row, column)
            ) : (
              <span>{row[column.id]}</span>
            )}
          </div>
        ))}
      </div>
    ));
  };
  
  // Render toolbar
  const renderToolbar = () => {
    if (!filterable) return null;
    
    return (
      <div className="flex items-center justify-between border-b border-border-light p-2">
        <div className="flex items-center space-x-2">
          {/* Filter button */}
          <button className="rounded px-2 py-1 text-sm text-text-primary hover:bg-background-hover">
            Filter
          </button>
          
          {/* View options */}
          <button className="rounded px-2 py-1 text-sm text-text-primary hover:bg-background-hover">
            View
          </button>
        </div>
        
        {/* Selected count */}
        {selectable && internalSelectedRowIds.length > 0 && (
          <div className="text-sm text-text-secondary">
            {internalSelectedRowIds.length} selected
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div 
      className={twMerge(
        "border border-border-light rounded-md overflow-hidden bg-background-offwhite",
        className
      )}
      ref={tableRef}
    >
      {/* Toolbar */}
      {renderToolbar()}
      
      {/* Table header */}
      {renderHeader()}
      
      {/* Table body */}
      <div className="overflow-y-auto">
        {renderRows()}
      </div>
    </div>
  );
};

DatabaseView.propTypes = {
  /** Columns configuration */
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    width: PropTypes.number,
  })).isRequired,
  
  /** Data rows */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  
  /** Whether rows are selectable */
  selectable: PropTypes.bool,
  
  /** Whether columns are sortable */
  sortable: PropTypes.bool,
  
  /** Whether filtering is enabled */
  filterable: PropTypes.bool,
  
  /** Whether columns can be resized */
  resizableColumns: PropTypes.bool,
  
  /** IDs of selected rows */
  selectedRowIds: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  
  /** Current sort configuration */
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc']),
  }),
  
  /** Called when a row is clicked */
  onRowClick: PropTypes.func,
  
  /** Called when selection changes */
  onSelectionChange: PropTypes.func,
  
  /** Called when sort changes */
  onSortChange: PropTypes.func,
  
  /** Additional CSS classes for the container */
  className: PropTypes.string,
  
  /** Additional CSS classes for rows */
  rowClassName: PropTypes.string,
  
  /** Additional CSS classes for the header */
  headerClassName: PropTypes.string,
  
  /** Additional CSS classes for cells */
  cellClassName: PropTypes.string,
  
  /** Custom cell renderer */
  renderCell: PropTypes.func,
};

export default DatabaseView;
