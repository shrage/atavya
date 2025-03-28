import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * BaseListItem component
 * Standardized item component for use in BaseList
 * Provides consistent styling and behavior for list items
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <BaseListItem
 *   item={userData}
 *   selected={isSelected}
 *   onSelect={handleSelect}
 *   onClick={handleClick}
 * >
 *   <div className="flex justify-between">
 *     <div>{userData.name}</div>
 *     <div>{userData.email}</div>
 *   </div>
 * </BaseListItem>
 * ```
 */
const BaseListItem = ({
  // Data
  item,
  itemKey,
  
  // State
  selected = false,
  expanded = false,
  selectable = true,
  expandable = false,
  
  // Display options
  showCheckbox = true,
  showDragHandle = false,
  className,
  
  // Content
  children,
  
  // Actions
  onSelect,
  onExpand,
  onClick,
  
  // Drag and drop
  draggable = false,
  dragging = false,
  onDragStart,
  onDragEnd,
  
  // Rendering overrides
  renderBefore,
  renderAfter,
  renderExpanded,
}) => {
  const handleClick = (e) => {
    // Stop propagation to prevent triggering parent list item clicks
    e.stopPropagation();
    
    // If selectable, toggle selection
    if (selectable && onSelect) {
      onSelect(item, !selected);
    }
    
    // Call the onClick handler if provided
    if (onClick) {
      onClick(item, e);
    }
  };
  
  const handleExpandToggle = (e) => {
    e.stopPropagation();
    if (expandable && onExpand) {
      onExpand(item, !expanded);
    }
  };
  
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    if (selectable && onSelect) {
      onSelect(item, e.target.checked);
    }
  };
  
  const handleDragStart = (e) => {
    if (draggable && onDragStart) {
      onDragStart(e, item);
    }
  };
  
  const handleDragEnd = (e) => {
    if (draggable && onDragEnd) {
      onDragEnd(e, item);
    }
  };
  
  return (
    <div 
      className={twMerge(
        'border-b border-border-light last:border-0',
        draggable && 'cursor-move',
        dragging && 'opacity-50',
        className
      )}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      data-item-key={itemKey}
    >
      <div 
        className={twMerge(
          'p-3 flex items-center',
          selectable && !draggable && 'cursor-pointer',
          selected && 'bg-primary-light bg-opacity-20'
        )}
        onClick={handleClick}
      >
        {/* Drag Handle */}
        {showDragHandle && draggable && (
          <div 
            className="mr-2 text-text-tertiary hover:text-text-secondary cursor-move flex-shrink-0"
            onMouseDown={(e) => {
              // Prevent text selection while dragging
              e.preventDefault();
            }}
          >
            ⋮⋮
          </div>
        )}
        
        {/* Expand Toggle */}
        {expandable && (
          <div 
            className="mr-2 text-text-secondary hover:text-text-primary cursor-pointer flex-shrink-0"
            onClick={handleExpandToggle}
          >
            {expanded ? '▼' : '►'}
          </div>
        )}
        
        {/* Checkbox */}
        {selectable && showCheckbox && (
          <div className="mr-3 flex-shrink-0">
            <input 
              type="checkbox" 
              checked={selected} 
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-border-light text-primary focus:ring-primary-light"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        )}
        
        {/* Before Content */}
        {renderBefore && (
          <div className="mr-3 flex-shrink-0">
            {renderBefore(item, { selected, expanded })}
          </div>
        )}
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
        
        {/* After Content */}
        {renderAfter && (
          <div className="ml-3 flex-shrink-0">
            {renderAfter(item, { selected, expanded })}
          </div>
        )}
      </div>
      
      {/* Expanded Content */}
      {expanded && expandable && (
        <div className="border-t border-border-light bg-background-skeleton">
          {renderExpanded 
            ? renderExpanded(item)
            : (
              <div className="p-3">
                <pre className="text-xs overflow-x-auto">
                  {JSON.stringify(item, null, 2)}
                </pre>
              </div>
            )
          }
        </div>
      )}
    </div>
  );
};

BaseListItem.propTypes = {
  /** Item data */
  item: PropTypes.object.isRequired,
  /** Unique key for the item */
  itemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Whether the item is selected */
  selected: PropTypes.bool,
  /** Whether the item is expanded */
  expanded: PropTypes.bool,
  /** Whether the item is selectable */
  selectable: PropTypes.bool,
  /** Whether the item is expandable */
  expandable: PropTypes.bool,
  /** Whether to show checkbox */
  showCheckbox: PropTypes.bool,
  /** Whether to show drag handle */
  showDragHandle: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Item content */
  children: PropTypes.node,
  /** Selection change handler */
  onSelect: PropTypes.func,
  /** Expand toggle handler */
  onExpand: PropTypes.func,
  /** Click handler */
  onClick: PropTypes.func,
  /** Whether the item is draggable */
  draggable: PropTypes.bool,
  /** Whether the item is currently being dragged */
  dragging: PropTypes.bool,
  /** Drag start handler */
  onDragStart: PropTypes.func,
  /** Drag end handler */
  onDragEnd: PropTypes.func,
  /** Render function for content before the main content */
  renderBefore: PropTypes.func,
  /** Render function for content after the main content */
  renderAfter: PropTypes.func,
  /** Render function for expanded content */
  renderExpanded: PropTypes.func,
};

export default BaseListItem;
