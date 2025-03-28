import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import CustomField from './CustomField';
import Input from '../../core/form-controls/Input/Input';

/**
 * TextField component
 * Text input field with Notion-inspired design
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * Leverages the Input component from core/form-controls for consistent styling.
 * 
 * @component
 * @example
 * ```jsx
 * <TextField
 *   label="First Name"
 *   value={firstName}
 *   onChange={handleFirstNameChange}
 *   placeholder="Enter your first name"
 *   required
 * />
 * ```
 */
const TextField = ({
  // Field metadata
  id,
  label,
  description,
  placeholder = '',
  required = false,
  
  // Value
  value = '',
  defaultValue = '',
  onChange,
  
  // Validation
  error,
  maxLength,
  minLength,
  pattern,
  
  // Display options
  labelPosition = 'top',
  hideLabel = false,
  fullWidth = true,
  size = 'medium',
  variant = 'outlined',
  className,
  inputClassName,
  
  // State
  disabled = false,
  readOnly = false,
  autoFocus = false,
  
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
  const inputValue = isControlled ? value : localValue;
  
  // Handle input changes
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setLocalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue, e);
    }
  };
  
  // Toggle inline editing
  const handleInlineEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  // Map size to Input component size
  const inputSize = {
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
        <Input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          size={inputSize}
          error={!!error}
          className={inputClassName}
          {...props}
          onBlur={(e) => {
            if (inlineEdit) {
              setIsEditing(false);
            }
            props.onBlur?.(e);
          }}
        />
      ) : (
        <div 
          className={twMerge(
            'p-2 rounded cursor-text min-h-[36px]',
            !inputValue && 'text-text-secondary italic',
            'hover:bg-background-hover'
          )}
          onClick={() => inlineEdit && setIsEditing(true)}
        >
          {inputValue || placeholder || 'Click to edit'}
        </div>
      )}
      
      {maxLength && (
        <div className="text-xs text-text-secondary absolute right-2 bottom-1">
          {inputValue.length}/{maxLength}
        </div>
      )}
    </CustomField>
  );
};

TextField.propTypes = {
  /** Unique ID for the field */
  id: PropTypes.string,
  /** Field label */
  label: PropTypes.node,
  /** Additional description text */
  description: PropTypes.node,
  /** Placeholder text when empty */
  placeholder: PropTypes.string,
  /** Whether the field is required */
  required: PropTypes.bool,
  
  /** Current value (controlled) */
  value: PropTypes.string,
  /** Default value (uncontrolled) */
  defaultValue: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  
  /** Error message */
  error: PropTypes.node,
  /** Maximum length */
  maxLength: PropTypes.number,
  /** Minimum length */
  minLength: PropTypes.number,
  /** Validation pattern */
  pattern: PropTypes.string,
  
  /** Label position relative to input */
  labelPosition: PropTypes.oneOf(['top', 'side']),
  /** Whether to hide the label */
  hideLabel: PropTypes.bool,
  /** Whether the field takes up full width */
  fullWidth: PropTypes.bool,
  /** Field size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Visual style variant */
  variant: PropTypes.oneOf(['outlined', 'filled', 'plain']),
  /** Additional CSS class for the wrapper */
  className: PropTypes.string,
  /** Additional CSS class for the input */
  inputClassName: PropTypes.string,
  
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Whether the field is read-only */
  readOnly: PropTypes.bool,
  /** Whether the field should auto-focus */
  autoFocus: PropTypes.bool,
  
  /** Whether to enable inline editing */
  inlineEdit: PropTypes.bool,
};

export default TextField;
