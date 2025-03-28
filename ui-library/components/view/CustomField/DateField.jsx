import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import CustomField from './CustomField';
import DatePicker from '../../core/form-controls/DatePicker/DatePicker';

/**
 * DateField component
 * Date input field with Notion-inspired design
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * Leverages the DatePicker component from core/form-controls for consistent styling.
 * 
 * @component
 * @example
 * ```jsx
 * <DateField
 *   label="Due Date"
 *   value={dueDate}
 *   onChange={handleDueDateChange}
 *   required
 * />
 * ```
 */
const DateField = ({
  // Field metadata
  id,
  label,
  description,
  placeholder = 'Select a date',
  required = false,
  
  // Value
  value = '',
  defaultValue = '',
  onChange,
  
  // Validation
  error,
  min,
  max,
  
  // Display options
  labelPosition = 'top',
  hideLabel = false,
  fullWidth = true,
  size = 'medium',
  dateFormat = 'yyyy-MM-dd',
  className,
  inputClassName,
  
  // State
  disabled = false,
  readOnly = false,
  
  // Inline editing
  inlineEdit = false,
  
  // Other props
  ...props
}) => {
  // State for controlled/uncontrolled input
  const [localValue, setLocalValue] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(!inlineEdit);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined;
  const dateValue = isControlled ? value : localValue;
  
  // Handle date changes
  const handleChange = (newValue) => {
    if (!isControlled) {
      setLocalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
    
    if (inlineEdit) {
      setIsEditing(false);
    }
  };
  
  // Toggle inline editing
  const handleInlineEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  // Map size to DatePicker component size
  const datePickerSize = {
    small: 'sm',
    medium: 'md',
    large: 'lg'
  }[size] || 'md';
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      // Simple formatting based on dateFormat
      // For a real implementation, use a date library like date-fns
      if (dateFormat === 'yyyy-MM-dd') {
        return date.toISOString().split('T')[0];
      } else if (dateFormat === 'MM/dd/yyyy') {
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
      } else {
        return date.toLocaleDateString();
      }
    } catch (e) {
      return '';
    }
  };
  
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
        <DatePicker
          id={id}
          value={dateValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          min={min}
          max={max}
          size={datePickerSize}
          error={!!error}
          dateFormat={dateFormat}
          className={inputClassName}
          {...props}
        />
      ) : (
        <div 
          className={twMerge(
            'p-2 rounded cursor-pointer min-h-[36px] flex items-center',
            !dateValue && 'text-text-secondary italic',
            'hover:bg-background-hover'
          )}
          onClick={() => inlineEdit && setIsEditing(true)}
        >
          {dateValue ? formatDate(dateValue) : (placeholder || 'Click to select date')}
        </div>
      )}
    </CustomField>
  );
};

DateField.propTypes = {
  /** Unique ID for the field */
  id: PropTypes.string,
  /** Field label */
  label: PropTypes.node,
  /** Additional description text */
  description: PropTypes.node,
  /** Placeholder text when no date is selected */
  placeholder: PropTypes.string,
  /** Whether the field is required */
  required: PropTypes.bool,
  
  /** Current value (controlled) */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  /** Default value (uncontrolled) */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  /** Change handler */
  onChange: PropTypes.func,
  
  /** Error message */
  error: PropTypes.node,
  /** Minimum date */
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  /** Maximum date */
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  
  /** Label position relative to input */
  labelPosition: PropTypes.oneOf(['top', 'side']),
  /** Whether to hide the label */
  hideLabel: PropTypes.bool,
  /** Whether the field takes up full width */
  fullWidth: PropTypes.bool,
  /** Field size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Date format */
  dateFormat: PropTypes.string,
  /** Additional CSS class for the wrapper */
  className: PropTypes.string,
  /** Additional CSS class for the input */
  inputClassName: PropTypes.string,
  
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Whether the field is read-only */
  readOnly: PropTypes.bool,
  
  /** Whether to enable inline editing */
  inlineEdit: PropTypes.bool,
};

export default DateField;
