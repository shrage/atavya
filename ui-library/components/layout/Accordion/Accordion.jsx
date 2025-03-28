import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Accordion component for expandable/collapsible content sections
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const Accordion = ({
  items = [],
  defaultExpandedItems = [],
  allowMultiple = false,
  variant = 'default',
  size = 'md',
  dividers = true,
  className = '',
  headerClassName = '',
  contentClassName = '',
  iconPosition = 'right',
  onChange,
}) => {
  // Keep track of expanded item indices
  const [expandedItems, setExpandedItems] = useState(defaultExpandedItems);
  
  // Toggle the expanded state of an item
  const toggleItem = useCallback((index) => {
    setExpandedItems((prevExpandedItems) => {
      // Check if the item is already expanded
      const isExpanded = prevExpandedItems.includes(index);
      
      let newExpandedItems;
      
      if (isExpanded) {
        // Remove the item from expanded items
        newExpandedItems = prevExpandedItems.filter(i => i !== index);
      } else {
        if (allowMultiple) {
          // Add the item to expanded items
          newExpandedItems = [...prevExpandedItems, index];
        } else {
          // Replace the expanded items with just this one
          newExpandedItems = [index];
        }
      }
      
      // Call onChange if provided
      if (onChange) {
        onChange(newExpandedItems);
      }
      
      return newExpandedItems;
    });
  }, [allowMultiple, onChange]);
  
  // Size classes
  const sizeClasses = {
    sm: {
      header: 'py-2 px-3 text-sm',
      content: 'p-3 text-sm',
      icon: 'w-4 h-4',
    },
    md: {
      header: 'py-3 px-4 text-base',
      content: 'p-4 text-sm',
      icon: 'w-5 h-5',
    },
    lg: {
      header: 'py-4 px-5 text-lg',
      content: 'p-5 text-base',
      icon: 'w-6 h-6',
    },
  };
  
  // Variant classes
  const variantClasses = {
    default: {
      container: 'bg-white border border-border-light rounded-lg overflow-hidden',
      header: 'bg-white hover:bg-background-hover focus:bg-background-hover',
      headerActive: 'bg-background-hover',
      content: 'bg-white',
    },
    ghost: {
      container: 'overflow-hidden',
      header: 'bg-transparent hover:bg-background-hover focus:bg-background-hover rounded-md',
      headerActive: 'bg-background-hover',
      content: 'bg-transparent',
    },
    boxed: {
      container: 'bg-white rounded-lg overflow-hidden divide-y divide-border-light',
      header: 'bg-background-offwhite hover:bg-background-hover focus:bg-background-hover',
      headerActive: 'bg-background-hover',
      content: 'bg-white',
    },
    subtle: {
      container: 'overflow-hidden',
      header: 'bg-transparent border-b border-border-light hover:bg-background-hover focus:bg-background-hover',
      headerActive: 'bg-background-hover',
      content: 'bg-transparent',
    },
  };
  
  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentVariant = variantClasses[variant] || variantClasses.default;
  
  // Check if dividers should be shown
  const showDividers = dividers && variant !== 'boxed'; // boxed already has dividers
  
  return (
    <div className={`${currentVariant.container} ${className}`}>
      {items.map((item, index) => {
        const isExpanded = expandedItems.includes(index);
        const isDisabled = !!item.disabled;
        
        return (
          <div 
            key={item.id || index}
            className={`
              ${showDividers && index > 0 ? 'border-t border-border-light' : ''}
              ${item.className || ''}
            `}
          >
            {/* Header */}
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && toggleItem(index)}
              className={`
                w-full flex items-center justify-between
                ${currentSize.header}
                ${isExpanded ? currentVariant.headerActive : currentVariant.header}
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40
                transition-colors
                ${headerClassName}
                ${item.headerClassName || ''}
              `}
              aria-expanded={isExpanded}
            >
              <div className={`flex items-center gap-2 ${iconPosition === 'left' ? 'flex-row-reverse justify-end' : ''}`}>
                {/* Left or custom icon */}
                {item.icon && iconPosition === 'left' && (
                  <span className="flex-shrink-0">{item.icon}</span>
                )}
                
                {/* Title */}
                <span className="font-medium">
                  {item.title}
                </span>
                
                {/* Right icon */}
                {iconPosition === 'right' && (
                  <span className={`flex-shrink-0 ml-auto ${currentSize.icon}`}>
                    {item.icon || (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                )}
              </div>
            </button>
            
            {/* Content */}
            {isExpanded && (
              <div 
                className={`
                  ${currentVariant.content}
                  ${currentSize.content}
                  ${contentClassName}
                  ${item.contentClassName || ''}
                `}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

Accordion.propTypes = {
  /** Array of accordion items */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired,
      icon: PropTypes.node,
      disabled: PropTypes.bool,
      className: PropTypes.string,
      headerClassName: PropTypes.string,
      contentClassName: PropTypes.string,
    })
  ).isRequired,
  /** Indices of items that should be expanded by default */
  defaultExpandedItems: PropTypes.arrayOf(PropTypes.number),
  /** Whether multiple items can be expanded at once */
  allowMultiple: PropTypes.bool,
  /** Visual style variant */
  variant: PropTypes.oneOf(['default', 'ghost', 'boxed', 'subtle']),
  /** Size preset */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Whether to show dividers between items */
  dividers: PropTypes.bool,
  /** Additional CSS classes for the container */
  className: PropTypes.string,
  /** CSS classes for all headers */
  headerClassName: PropTypes.string,
  /** CSS classes for all content sections */
  contentClassName: PropTypes.string,
  /** Position of the expand/collapse icon */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  /** Called when expanded items change */
  onChange: PropTypes.func,
};

export default Accordion;
