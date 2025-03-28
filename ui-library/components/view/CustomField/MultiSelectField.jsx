import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import CustomField from './CustomField';
import MultiSelect from '../../core/form-controls/MultiSelect/MultiSelect';

/**
 * MultiSelectField component
 * Multi-selection dropdown field with Notion-inspired design
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * Leverages the MultiSelect component from core/form-controls for consistent styling.
 * 
 * @component
 * @example
 * ```jsx
 * <MultiSelectField
 *   label="Tags"
 *   value={tags}
 *   onChange={handleTagsChange}
 *   options={[
 *     { value: 'urgent', label: 'Urgent', color: 'red' },
 *     { value: 'pending', label: 'Pending', color: 'yellow' },
 *     { value: 'completed', label: 'Completed', color: 'green' },
 *   ]}
 *   required
 * />
 * ```
 */
const MultiSelectField = ({
  // Field metadata
  id,
  label,
  description,
  placeholder = 'Select options',
  required = false,
  
  // Options
  options = [],
  
  // Value
  value = [],
  defaultValue = [],
  onChange,
  
  // Validation
  error,
  
  // Display options
  labelPosition = 'top',
  hideLabel = false,
  fullWidth = true,
  size = 'medium',
  className,
  selectClassName,
  
  // State
  disabled = false,
  readOnly = false,
  
  // Inline editing
  inlineEdit = false,
  
  // Other props
  ...props
}) => {
  // State for controlled/uncontrolled select
  const [localValue, setLocalValue] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(!inlineEdit);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined;
  const selectedValues = isControlled ? value : localValue;
  
  // Find the selected option objects
  const selectedOptions = options.filter(option => 
    selectedValues.includes(option.value)
  );
  
  // Handle option selection
  const handleSelect = (newValues) => {
    if (!isControlled) {
      setLocalValue(newValues);
    }
    
    if (onChange) {
      onChange(newValues);
    }
    
    if (inlineEdit) {
      setIsEditing(false);
    }
  };
  
  // Toggle inline editing
  const handleInlineEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  // Map size to MultiSelect component size
  const multiSelectSize = {
    small: 'sm',
    medium: 'md',
    large: 'lg'
  }[size] || 'md';
  
  return (
    <CustomField
      id={id}
      label={label}
      description={description}
      required={required}
      error={error}
      labelPosition={labelPosition}
      hideLabel={hideLabel}
      fullWidth={fullWidth}
      className={className}
      inlineEdit={inlineEdit}
      onInlineEditToggle={handleInlineEditToggle}
    >
      {isEditing ? (
        <MultiSelect
          id={id}
          value={selectedValues}
          onChange={handleSelect}
          options={options}
          placeholder={placeholder}
          disabled={disabled}
          size={multiSelectSize}
          error={!!error}
          className={selectClassName}
          {...props}
        />
      ) : (
        <div 
          className={twMerge(
            'p-2 rounded cursor-pointer min-h-[36px] flex flex-wrap items-center gap-1',
            selectedOptions.length === 0 && 'text-text-secondary italic',
            'hover:bg-background-hover'
          )}
          onClick={() => inlineEdit && setIsEditing(true)}
        >
          {selectedOptions.length > 0 ? (
            selectedOptions.map(option => (
              <span 
                key={option.value} 
                className={twMerge(
                  'px-2 py-1 rounded-full text-xs font-medium',
                  option.color ? `bg-${option.color}-100 text-${option.color}-800` : 'bg-primary-light text-primary-dark'
                )}
              >
                {option.label}
              </span>
            ))
          ) : (
            placeholder || 'Click to select options'
          )}
        </div>
      )}
    </CustomField>
  );
};

MultiSelectField.propTypes = {
  /** Unique ID for the field */
  id: PropTypes.string,
  /** Field label */
  label: PropTypes.node,
  /** Additional description text */
  description: PropTypes.node,
  /** Placeholder text when no options are selected */
  placeholder: PropTypes.string,
  /** Whether the field is required */
  required: PropTypes.bool,
  
  /** Array of options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string,
      icon: PropTypes.node,
      disabled: PropTypes.bool,
    })
  ),
  
  /** Current values (controlled) */
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  /** Default values (uncontrolled) */
  defaultValue: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  /** Change handler */
  onChange: PropTypes.func,
  
  /** Error message */
  error: PropTypes.node,
  
  /** Label position relative to input */
  labelPosition: PropTypes.oneOf(['top', 'side']),
  /** Whether to hide the label */
  hideLabel: PropTypes.bool,
  /** Whether the field takes up full width */
  fullWidth: PropTypes.bool,
  /** Field size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Additional CSS class for the wrapper */
  className: PropTypes.string,
  /** Additional CSS class for the select */
  selectClassName: PropTypes.string,
  
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Whether the field is read-only */
  readOnly: PropTypes.bool,
  
  /** Whether to enable inline editing */
  inlineEdit: PropTypes.bool,
};

export default MultiSelectField;
