import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * CustomField component
 * Base component for all custom field types
 * 
 * @component
 * @example
 * ```jsx
 * <CustomField
 *   label="First Name"
 *   required
 *   error="First name is required"
 * >
 *   <input type="text" className="w-full p-2 border rounded" />
 * </CustomField>
 * ```
 */
const CustomField = ({
  // Field metadata
  id,
  label,
  description,
  required = false,
  
  // Validation
  error,
  
  // Content
  children,
  
  // Display options
  labelPosition = 'top',
  hideLabel = false,
  fullWidth = true,
  className,
  labelClassName,
  contentClassName,
  
  // Inline editing mode
  inlineEdit = false,
  onInlineEditToggle,
  
  // Event handlers
  onClick,
}) => {
  const isInline = labelPosition === 'inline';
  
  return (
    <div 
      className={twMerge(
        'mb-4',
        fullWidth ? 'w-full' : '',
        error ? 'animate-shake' : '',
        isInline ? 'flex items-center' : '',
        className
      )}
      onClick={onClick}
    >
      {!hideLabel && label && (
        <label 
          htmlFor={id}
          className={twMerge(
            'block text-sm font-medium text-gray-700',
            required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : '',
            isInline ? 'mr-3 w-1/3 text-right' : 'mb-1',
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      
      <div className={twMerge(
        'relative',
        isInline ? 'flex-1' : '',
        contentClassName
      )}>
        {/* Field Content */}
        {children}
        
        {/* Description */}
        {description && !error && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
        
        {/* Error Message */}
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        
        {/* Inline Edit Toggle */}
        {inlineEdit && onInlineEditToggle && (
          <button 
            className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onInlineEditToggle();
            }}
          >
            ✎
          </button>
        )}
      </div>
    </div>
  );
};

CustomField.propTypes = {
  /** Unique ID for the field */
  id: PropTypes.string,
  /** Field label */
  label: PropTypes.string,
  /** Field description */
  description: PropTypes.string,
  /** Whether the field is required */
  required: PropTypes.bool,
  /** Field error message */
  error: PropTypes.string,
  /** Field content */
  children: PropTypes.node,
  /** Label position */
  labelPosition: PropTypes.oneOf(['top', 'inline']),
  /** Whether to hide the label */
  hideLabel: PropTypes.bool,
  /** Whether the field should take full width */
  fullWidth: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Label CSS classes */
  labelClassName: PropTypes.string,
  /** Content CSS classes */
  contentClassName: PropTypes.string,
  /** Whether in inline edit mode */
  inlineEdit: PropTypes.bool,
  /** Inline edit toggle handler */
  onInlineEditToggle: PropTypes.func,
  /** Click handler */
  onClick: PropTypes.func,
};

export default CustomField;
