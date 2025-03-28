import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * PhoneField component
 * 
 * A specialized input field for phone numbers with built-in validation and formatting.
 * 
 * @component
 * @example
 * ```jsx
 * <PhoneField
 *   label="Phone Number"
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
const PhoneField = ({
  id,
  name,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  label,
  placeholder = 'Enter phone number',
  helperText,
  errorText,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isInvalid = false,
  validateOnBlur = true,
  validateOnChange = false,
  format = 'national', // 'national', 'international', 'e164', 'none'
  countryCode = '+1',
  showCountryCode = false,
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
  const [formattedValue, setFormattedValue] = useState('');
  const [validationError, setValidationError] = useState('');
  
  // Phone validation regex
  // This is a basic regex for phone validation
  // For production, consider using a more comprehensive validation library
  const phoneRegex = {
    // US phone number format (XXX) XXX-XXXX or XXX-XXX-XXXX
    national: /^(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/,
    // International format with optional country code
    international: /^\+?[\d\s-]{8,15}$/,
    // E.164 format (e.g., +12345678901)
    e164: /^\+\d{10,15}$/,
    // Any format (minimum 7 digits)
    any: /^[\d\s-()+]{7,20}$/
  };
  
  // Format phone number based on the selected format
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    // Return original value if no digits
    if (!digitsOnly) return phoneNumber;
    
    // Format based on the selected format
    switch (format) {
      case 'national':
        // Format as (XXX) XXX-XXXX for 10 digits
        if (digitsOnly.length === 10) {
          return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
        }
        // If not 10 digits, just add spaces after every 3 digits
        return digitsOnly.replace(/(\d{3})(?=\d)/g, '$1 ');
        
      case 'international':
        // Format with country code if provided
        if (showCountryCode && countryCode) {
          return `${countryCode} ${digitsOnly.replace(/(\d{3})(?=\d)/g, '$1 ')}`;
        }
        // Otherwise just add spaces after every 3 digits
        return digitsOnly.replace(/(\d{3})(?=\d)/g, '$1 ');
        
      case 'e164':
        // Format as +XXXXXXXXXXX
        if (showCountryCode && countryCode) {
          return `${countryCode}${digitsOnly}`;
        }
        return `+${digitsOnly}`;
        
      case 'none':
      default:
        return phoneNumber;
    }
  };
  
  // Validate the phone number
  const validatePhone = (phoneValue = localValue) => {
    if (!phoneValue) {
      setValidationError('');
      return true;
    }
    
    // Get the appropriate regex based on format
    const regex = format === 'none' ? phoneRegex.any : phoneRegex[format] || phoneRegex.any;
    
    // Test the phone number against the regex
    const isValid = regex.test(phoneValue);
    
    if (!isValid) {
      setValidationError('Please enter a valid phone number');
      return false;
    }
    
    setValidationError('');
    return true;
  };
  
  // Update local value when controlled value changes
  useEffect(() => {
    if (isControlled) {
      setLocalValue(value);
      setFormattedValue(formatPhoneNumber(value));
      
      if (validateOnChange) {
        validatePhone(value);
      }
    }
  }, [isControlled, value, format, countryCode, showCountryCode]);
  
  // Handle input change
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Update local state
    if (!isControlled) {
      setLocalValue(newValue);
    }
    
    // Format the value for display
    const formatted = formatPhoneNumber(newValue);
    setFormattedValue(formatted);
    
    // Validate if needed
    if (validateOnChange) {
      validatePhone(newValue);
    }
    
    // Call onChange with the raw value (not formatted)
    if (onChange) {
      // For e164 format, we might want to pass the formatted value
      if (format === 'e164') {
        onChange(formatted);
      } else {
        onChange(newValue);
      }
    }
  };
  
  // Handle blur event
  const handleBlur = (e) => {
    if (validateOnBlur) {
      validatePhone();
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
  const fieldId = id || `phone-field-${Math.random().toString(36).substr(2, 9)}`;
  
  // Determine if the field has an error
  const hasError = isInvalid || !!errorText || !!validationError;
  const displayedErrorText = errorText || validationError;
  
  // Display value (formatted or raw)
  const displayValue = format !== 'none' ? formattedValue : localValue;
  
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
        {/* Country code prefix (if shown) */}
        {showCountryCode && format === 'international' && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-text-secondary">{countryCode}</span>
          </div>
        )}
        
        <input
          id={fieldId}
          name={name}
          type="tel"
          value={displayValue}
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
            showCountryCode && format === 'international' && 'pl-12',
            isDisabled && 'bg-gray-100 text-text-disabled cursor-not-allowed',
            isReadOnly && 'bg-gray-50 cursor-default',
            hasError && 'border-status-error focus:ring-status-error focus:border-status-error',
            inputClassName
          )}
          {...props}
        />
        
        {/* Phone icon */}
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
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
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

PhoneField.propTypes = {
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
  /** Phone number format */
  format: PropTypes.oneOf(['national', 'international', 'e164', 'none']),
  /** Country code (e.g., +1 for US) */
  countryCode: PropTypes.string,
  /** Whether to show the country code */
  showCountryCode: PropTypes.bool,
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

export default PhoneField;
