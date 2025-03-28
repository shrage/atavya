import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import CustomField from './CustomField';
import Checkbox from '../../core/form-controls/Checkbox/Checkbox';

/**
 * CheckboxField component
 * Checkbox input field with Notion-inspired design
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * Leverages the Checkbox component from core/form-controls for consistent styling.
 * 
 * @component
 * @example
 * ```jsx
 * <CheckboxField
 *   label="Agree to terms"
 *   checked={agreed}
 *   onChange={handleAgreedChange}
 *   required
 * />
 * ```
 */
const CheckboxField = ({
  // Field metadata
  id,
  label,
  description,
  required = false,
  
  // Value
  checked = false,
  defaultChecked,
  onChange,
  
  // Validation
  error,
  
  // Display options
  labelPosition = 'right',
  hideLabel = false,
  size = 'medium',
  className,
  checkboxClassName,
  
  // State
  disabled = false,
  readOnly = false,
  
  // Inline editing
  inlineEdit = false,
  
  // Other props
  ...props
}) => {
  // State for controlled/uncontrolled checkbox
  const [localChecked, setLocalChecked] = useState(defaultChecked !== undefined ? defaultChecked : false);
  const [isEditing, setIsEditing] = useState(!inlineEdit);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : localChecked;
  
  // Handle checkbox change
  const handleChange = (newChecked) => {
    if (!isControlled) {
      setLocalChecked(newChecked);
    }
    
    if (onChange) {
      onChange(newChecked);
    }
    
    if (inlineEdit) {
      setIsEditing(false);
    }
  };
  
  // Toggle inline editing
  const handleInlineEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  // Map size to Checkbox component size
  const checkboxSize = {
    small: 'sm',
    medium: 'md',
    large: 'lg'
  }[size] || 'md';
  
  // If labelPosition is 'top' or 'inline', use CustomField for layout
  if (labelPosition === 'top' || labelPosition === 'side') {
    return (
      <CustomField
        id={id}
        label={label}
        description={description}
        required={required}
        error={error}
        labelPosition={labelPosition}
        hideLabel={hideLabel}
        fullWidth={false}
        className={className}
        inlineEdit={inlineEdit}
        onInlineEditToggle={handleInlineEditToggle}
      >
        {isEditing ? (
          <div className="py-1">
            <Checkbox
              id={id}
              checked={isChecked}
              onChange={handleChange}
              disabled={disabled}
              size={checkboxSize}
              error={!!error}
              className={checkboxClassName}
              label={hideLabel ? '' : 'Yes'}
              {...props}
            />
          </div>
        ) : (
          <div 
            className={twMerge(
              'p-2 rounded cursor-pointer min-h-[36px] flex items-center',
              'hover:bg-background-hover'
            )}
            onClick={() => inlineEdit && setIsEditing(true)}
          >
            {isChecked ? (
              <svg className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-text-secondary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        )}
      </CustomField>
    );
  }
  
  // For right/left label position, use a simpler layout
  return (
    <div className={twMerge(
      'mb-4',
      className
    )}>
      <div className={`flex items-center ${labelPosition === 'left' ? 'flex-row-reverse justify-end' : ''}`}>
        {isEditing ? (
          <Checkbox
            id={id}
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            size={checkboxSize}
            error={!!error}
            className={checkboxClassName}
            {...props}
          />
        ) : (
          <div 
            className={twMerge(
              'cursor-pointer',
              'hover:bg-background-hover rounded p-1'
            )}
            onClick={() => inlineEdit && setIsEditing(true)}
          >
            {isChecked ? (
              <svg className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-text-secondary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        )}
        
        {!hideLabel && (
          <label 
            htmlFor={id}
            className={twMerge(
              'select-none',
              labelPosition === 'left' ? 'mr-2' : 'ml-2',
              disabled ? 'text-text-disabled cursor-not-allowed' : 'text-text-primary cursor-pointer',
              error ? 'text-error' : ''
            )}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
      </div>
      
      {description && (
        <div className={`text-sm text-text-secondary mt-1 ${labelPosition === 'left' ? 'text-right' : ''}`}>
          {description}
        </div>
      )}
      
      {error && (
        <div className={`text-sm text-error mt-1 ${labelPosition === 'left' ? 'text-right' : ''}`}>
          {error}
        </div>
      )}
    </div>
  );
};

CheckboxField.propTypes = {
  /** Unique ID for the field */
  id: PropTypes.string,
  /** Field label */
  label: PropTypes.node,
  /** Additional description text */
  description: PropTypes.node,
  /** Whether the field is required */
  required: PropTypes.bool,
  
  /** Current checked state (controlled) */
  checked: PropTypes.bool,
  /** Default checked state (uncontrolled) */
  defaultChecked: PropTypes.bool,
  /** Change handler */
  onChange: PropTypes.func,
  
  /** Error message */
  error: PropTypes.node,
  
  /** Label position relative to checkbox */
  labelPosition: PropTypes.oneOf(['top', 'right', 'left', 'side']),
  /** Whether to hide the label */
  hideLabel: PropTypes.bool,
  /** Checkbox size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Additional CSS class for the wrapper */
  className: PropTypes.string,
  /** Additional CSS class for the checkbox */
  checkboxClassName: PropTypes.string,
  
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Whether the field is read-only */
  readOnly: PropTypes.bool,
  
  /** Whether to enable inline editing */
  inlineEdit: PropTypes.bool,
};

export default CheckboxField;
