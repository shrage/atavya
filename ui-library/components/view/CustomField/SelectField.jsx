import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import CustomField from './CustomField';
import Select from '../../core/form-controls/Select/Select';

/**
 * SelectField component
 * Dropdown select field with Notion-inspired design
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * Leverages the Select component from core/form-controls for consistent styling.
 * 
 * @component
 * @example
 * ```jsx
 * <SelectField
 *   label="Department"
 *   value={department}
 *   onChange={handleDepartmentChange}
 *   options={[
 *     { value: 'engineering', label: 'Engineering' },
 *     { value: 'marketing', label: 'Marketing' },
 *     { value: 'sales', label: 'Sales' },
 *   ]}
 *   required
 * />
 * ```
 */
const SelectField = ({
  // Field metadata
  id,
  label,
  description,
  placeholder = 'Select an option',
  required = false,
  
  // Options
  options = [],
  
  // Value
  value = '',
  defaultValue = '',
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
  const selectValue = isControlled ? value : localValue;
  
  // Find the selected option object
  const selectedOption = options.find(option => 
    option.value === selectValue
  );
  
  // Handle option selection
  const handleSelect = (newValue) => {
    if (!isControlled) {
      setLocalValue(newValue);
    }
    
    if (onChange) {
      const selectedOption = options.find(option => option.value === newValue);
      onChange(newValue, selectedOption);
    }
    
    if (inlineEdit) {
      setIsEditing(false);
    }
  };
  
  // Toggle inline editing
  const handleInlineEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  // Map size to Select component size
  const selectSize = {
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
        <Select
          id={id}
          value={selectValue}
          onChange={handleSelect}
          options={options}
          placeholder={placeholder}
          disabled={disabled}
          size={selectSize}
          error={!!error}
          className={selectClassName}
          {...props}
        />
      ) : (
        <div 
          className={twMerge(
            'p-2 rounded cursor-pointer min-h-[36px]',
            !selectedOption && 'text-text-secondary italic',
            'hover:bg-background-hover'
          )}
          onClick={() => inlineEdit && setIsEditing(true)}
        >
          {selectedOption?.label || placeholder || 'Click to select'}
        </div>
      )}
    </CustomField>
  );
};

SelectField.propTypes = {
  /** Unique ID for the field */
  id: PropTypes.string,
  /** Field label */
  label: PropTypes.node,
  /** Additional description text */
  description: PropTypes.node,
  /** Placeholder text when no option is selected */
  placeholder: PropTypes.string,
  /** Whether the field is required */
  required: PropTypes.bool,
  
  /** Array of options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      disabled: PropTypes.bool,
    })
  ),
  
  /** Current value (controlled) */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Default value (uncontrolled) */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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

export default SelectField;
