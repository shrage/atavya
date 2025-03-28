import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * EmailField component
 * 
 * A specialized input field for email addresses with built-in validation.
 * 
 * @component
 * @example
 * ```jsx
 * <EmailField
 *   label="Email Address"
 *   onChange={(value) => console.log(value)}
 *   isRequired
 * />
 * ```
 */
const EmailField = ({
  id,
  name,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  label,
  placeholder = 'Enter email address',
  helperText,
  errorText,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isInvalid = false,
  validateOnBlur = true,
  validateOnChange = false,
  allowMultiple = false,
  size = 'md',
  className,
  inputClassName,
  labelClassName,
  errorClassName,
  helperClassName,
  ...props
}) => {
  // Initialize state with controlled or uncontrolled value
  const isControlled = value !== undefined;
  const [localValue, setLocalValue] = useState(
    isControlled ? value : defaultValue || ''
  );
  const [validationError, setValidationError] = useState('');
  
  // Email validation regex
  // This is a basic regex for email validation
  // For production, consider using a more comprehensive validation library
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Validate a single email address
  const validateEmail = (email) => {
    if (!email) return true; // Empty is valid (unless required, which is handled separately)
    return emailRegex.test(email.trim());
  };
  
  // Validate multiple email addresses (comma or semicolon separated)
  const validateMultipleEmails = (emailsString) => {
    if (!emailsString) return true;
    
    const separator = emailsString.includes(';') ? ';' : ',';
    const emails = emailsString.split(separator).map(e => e.trim());
    
    return emails.every(email => !email || validateEmail(email));
  };
  
  // Validate the current value
  const validateValue = (valueToValidate = localValue) => {
    if (!valueToValidate) {
      setValidationError('');
      return true;
    }
    
    const isValid = allowMultiple 
      ? validateMultipleEmails(valueToValidate)
      : validateEmail(valueToValidate);
    
    if (!isValid) {
      const errorMessage = allowMultiple
        ? 'Please enter valid email addresses (separated by commas or semicolons)'
        : 'Please enter a valid email address';
      
      setValidationError(errorMessage);
      return false;
    }
    
    setValidationError('');
    return true;
  };
  
  // Update local value when controlled value changes
  useEffect(() => {
    if (isControlled) {
      setLocalValue(value);
      if (validateOnChange) {
        validateValue(value);
      }
    }
  }, [isControlled, value]);
  
  // Handle input change
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setLocalValue(newValue);
    }
    
    if (validateOnChange) {
      validateValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
  };
  
  // Handle blur event
  const handleBlur = (e) => {
    if (validateOnBlur) {
      validateValue();
    }
    
    if (onBlur) {
      onBlur(e);
    }
  };
  
  // Size variants
  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg'
  };
  
  // Generate a unique ID if none provided
  const fieldId = id || `email-field-${Math.random().toString(36).substr(2, 9)}`;
  
  // Determine if the field has an error
  const hasError = isInvalid || !!errorText || !!validationError;
  const displayedErrorText = errorText || validationError;
  
  return (
    <div className={twMerge('w-full', className)}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={fieldId}
          className={twMerge(
            'block text-sm font-medium text-text-primary mb-1',
            isDisabled && 'text-text-disabled',
            labelClassName
          )}
        >
          {label}
          {isRequired && <span className="text-status-error ml-1">*</span>}
        </label>
      )}
      
      {/* Input */}
      <div className="relative">
        <input
          id={fieldId}
          name={name}
          type="email"
          multiple={allowMultiple}
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={onFocus}
          disabled={isDisabled}
          readOnly={isReadOnly}
          placeholder={placeholder}
          required={isRequired}
          aria-invalid={hasError}
          aria-describedby={`${fieldId}-error ${fieldId}-helper`}
          className={twMerge(
            'w-full px-3 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors',
            sizeClasses[size],
            isDisabled && 'bg-gray-100 text-text-disabled cursor-not-allowed',
            isReadOnly && 'bg-gray-50 cursor-default',
            hasError && 'border-status-error focus:ring-status-error focus:border-status-error',
            inputClassName
          )}
          {...props}
        />
        
        {/* Email icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={twMerge(
              'h-5 w-5',
              hasError ? 'text-status-error' : 'text-text-secondary',
              isDisabled && 'text-text-disabled'
            )} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </div>
      </div>
      
      {/* Error text */}
      {displayedErrorText && (
        <p 
          id={`${fieldId}-error`}
          className={twMerge(
            'mt-1 text-sm text-status-error',
            errorClassName
          )}
        >
          {displayedErrorText}
        </p>
      )}
      
      {/* Helper text */}
      {helperText && !displayedErrorText && (
        <p 
          id={`${fieldId}-helper`}
          className={twMerge(
            'mt-1 text-sm text-text-secondary',
            helperClassName
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

EmailField.propTypes = {
  /** Unique identifier for the field */
  id: PropTypes.string,
  /** Name attribute for the input */
  name: PropTypes.string,
  /** Current value (controlled) */
  value: PropTypes.string,
  /** Default value (uncontrolled) */
  defaultValue: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  /** Blur handler */
  onBlur: PropTypes.func,
  /** Focus handler */
  onFocus: PropTypes.func,
  /** Field label */
  label: PropTypes.node,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Helper text displayed below the input */
  helperText: PropTypes.node,
  /** Error text displayed below the input */
  errorText: PropTypes.node,
  /** Whether the field is required */
  isRequired: PropTypes.bool,
  /** Whether the field is disabled */
  isDisabled: PropTypes.bool,
  /** Whether the field is read-only */
  isReadOnly: PropTypes.bool,
  /** Whether the field is invalid */
  isInvalid: PropTypes.bool,
  /** Whether to validate on blur */
  validateOnBlur: PropTypes.bool,
  /** Whether to validate on change */
  validateOnChange: PropTypes.bool,
  /** Whether to allow multiple email addresses */
  allowMultiple: PropTypes.bool,
  /** Size variant */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Additional CSS classes for the container */
  className: PropTypes.string,
  /** Additional CSS classes for the input */
  inputClassName: PropTypes.string,
  /** Additional CSS classes for the label */
  labelClassName: PropTypes.string,
  /** Additional CSS classes for the error text */
  errorClassName: PropTypes.string,
  /** Additional CSS classes for the helper text */
  helperClassName: PropTypes.string,
};

export default EmailField;
