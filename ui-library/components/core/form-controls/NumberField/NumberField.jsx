import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * NumberField component
 * 
 * A form control for numerical input with increment/decrement buttons and validation.
 * Supports min/max values, step increments, and formatting options.
 * 
 * @component
 * @example
 * ```jsx
 * <NumberField
 *   label="Quantity"
 *   value={5}
 *   onChange={(value) => console.log(value)}
 *   min={0}
 *   max={10}
 * />
 * ```
 */
const NumberField = ({
  id,
  name,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  label,
  placeholder = 'Enter a number',
  helperText,
  errorText,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isInvalid = false,
  min,
  max,
  step = 1,
  precision = 0,
  allowMouseWheel = true,
  showControls = true,
  size = 'md',
  formatOptions,
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
  
  // Format number according to options
  const formatNumber = (num) => {
    if (num === '' || num === null || num === undefined) return '';
    
    let parsedNum = typeof num === 'string' ? parseFloat(num) : num;
    
    // Apply precision
    if (precision !== undefined) {
      parsedNum = parseFloat(parsedNum.toFixed(precision));
    }
    
    // Apply formatting options if provided
    if (formatOptions) {
      return new Intl.NumberFormat(formatOptions.locale || undefined, {
        style: formatOptions.style || 'decimal',
        currency: formatOptions.currency,
        minimumFractionDigits: formatOptions.minimumFractionDigits !== undefined 
          ? formatOptions.minimumFractionDigits 
          : precision,
        maximumFractionDigits: formatOptions.maximumFractionDigits !== undefined 
          ? formatOptions.maximumFractionDigits 
          : precision,
        ...formatOptions
      }).format(parsedNum);
    }
    
    return parsedNum.toString();
  };
  
  // Parse formatted number string back to number
  const parseNumber = (str) => {
    if (str === '' || str === null || str === undefined) return '';
    
    // Remove formatting characters
    const cleanedStr = str.toString().replace(/[^0-9.-]/g, '');
    const parsedNum = parseFloat(cleanedStr);
    
    return isNaN(parsedNum) ? '' : parsedNum;
  };
  
  // Update local value when controlled value changes
  useEffect(() => {
    if (isControlled) {
      setLocalValue(value);
    }
  }, [isControlled, value]);
  
  // Handle input change
  const handleChange = (e) => {
    const inputValue = e.target.value;
    
    // Allow empty input
    if (inputValue === '') {
      setLocalValue('');
      if (onChange) onChange('');
      return;
    }
    
    // Parse the input value
    const parsedValue = parseNumber(inputValue);
    
    // Only update if it's a valid number or empty
    if (parsedValue !== '' || inputValue === '') {
      setLocalValue(parsedValue);
      if (onChange) onChange(parsedValue);
    }
  };
  
  // Handle blur event
  const handleBlur = (e) => {
    // Apply constraints (min/max) on blur
    if (localValue !== '') {
      let constrainedValue = localValue;
      
      if (min !== undefined && constrainedValue < min) {
        constrainedValue = min;
      }
      
      if (max !== undefined && constrainedValue > max) {
        constrainedValue = max;
      }
      
      // Apply precision
      if (precision !== undefined) {
        constrainedValue = parseFloat(constrainedValue.toFixed(precision));
      }
      
      // Update if value changed due to constraints
      if (constrainedValue !== localValue) {
        setLocalValue(constrainedValue);
        if (onChange) onChange(constrainedValue);
      }
    }
    
    if (onBlur) onBlur(e);
  };
  
  // Handle increment/decrement
  const increment = () => {
    if (isDisabled || isReadOnly) return;
    
    const currentValue = localValue === '' ? 0 : parseNumber(localValue);
    let newValue = currentValue + step;
    
    // Apply constraints
    if (max !== undefined && newValue > max) {
      newValue = max;
    }
    
    // Apply precision
    if (precision !== undefined) {
      newValue = parseFloat(newValue.toFixed(precision));
    }
    
    setLocalValue(newValue);
    if (onChange) onChange(newValue);
  };
  
  const decrement = () => {
    if (isDisabled || isReadOnly) return;
    
    const currentValue = localValue === '' ? 0 : parseNumber(localValue);
    let newValue = currentValue - step;
    
    // Apply constraints
    if (min !== undefined && newValue < min) {
      newValue = min;
    }
    
    // Apply precision
    if (precision !== undefined) {
      newValue = parseFloat(newValue.toFixed(precision));
    }
    
    setLocalValue(newValue);
    if (onChange) onChange(newValue);
  };
  
  // Handle mouse wheel events
  const handleWheel = (e) => {
    if (!allowMouseWheel || isDisabled || isReadOnly) return;
    
    // Prevent page scrolling
    e.preventDefault();
    
    if (e.deltaY < 0) {
      increment();
    } else {
      decrement();
    }
  };
  
  // Size variants
  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg'
  };
  
  // Generate a unique ID if none provided
  const fieldId = id || `number-field-${Math.random().toString(36).substr(2, 9)}`;
  
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
      
      {/* Input with controls */}
      <div className="relative">
        <input
          id={fieldId}
          name={name}
          type="text"
          inputMode="decimal"
          value={formatNumber(localValue)}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={onFocus}
          onWheel={allowMouseWheel ? handleWheel : undefined}
          disabled={isDisabled}
          readOnly={isReadOnly}
          placeholder={placeholder}
          required={isRequired}
          aria-invalid={isInvalid || !!errorText}
          aria-describedby={`${fieldId}-error ${fieldId}-helper`}
          className={twMerge(
            'w-full px-3 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors',
            sizeClasses[size],
            isDisabled && 'bg-gray-100 text-text-disabled cursor-not-allowed',
            isReadOnly && 'bg-gray-50 cursor-default',
            (isInvalid || !!errorText) && 'border-status-error focus:ring-status-error focus:border-status-error',
            showControls && 'pr-10',
            inputClassName
          )}
          {...props}
        />
        
        {/* Increment/decrement controls */}
        {showControls && (
          <div className="absolute inset-y-0 right-0 flex flex-col border-l border-border-medium">
            <button
              type="button"
              tabIndex={-1}
              onClick={increment}
              disabled={isDisabled || isReadOnly || (max !== undefined && localValue >= max)}
              className={twMerge(
                'flex items-center justify-center w-8 h-1/2 text-text-secondary hover:text-text-primary focus:outline-none',
                isDisabled && 'text-text-disabled cursor-not-allowed',
                (max !== undefined && localValue >= max) && 'text-text-disabled cursor-not-allowed'
              )}
              aria-label="Increment"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              type="button"
              tabIndex={-1}
              onClick={decrement}
              disabled={isDisabled || isReadOnly || (min !== undefined && localValue <= min)}
              className={twMerge(
                'flex items-center justify-center w-8 h-1/2 text-text-secondary hover:text-text-primary focus:outline-none',
                isDisabled && 'text-text-disabled cursor-not-allowed',
                (min !== undefined && localValue <= min) && 'text-text-disabled cursor-not-allowed'
              )}
              aria-label="Decrement"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* Error text */}
      {errorText && (
        <p 
          id={`${fieldId}-error`}
          className={twMerge(
            'mt-1 text-sm text-status-error',
            errorClassName
          )}
        >
          {errorText}
        </p>
      )}
      
      {/* Helper text */}
      {helperText && !errorText && (
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

NumberField.propTypes = {
  /** Unique identifier for the field */
  id: PropTypes.string,
  /** Name attribute for the input */
  name: PropTypes.string,
  /** Current value (controlled) */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Default value (uncontrolled) */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  /** Minimum allowed value */
  min: PropTypes.number,
  /** Maximum allowed value */
  max: PropTypes.number,
  /** Step increment/decrement value */
  step: PropTypes.number,
  /** Number of decimal places */
  precision: PropTypes.number,
  /** Whether to allow mouse wheel to increment/decrement */
  allowMouseWheel: PropTypes.bool,
  /** Whether to show increment/decrement controls */
  showControls: PropTypes.bool,
  /** Size variant */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Number formatting options */
  formatOptions: PropTypes.shape({
    /** Locale for formatting (e.g., 'en-US') */
    locale: PropTypes.string,
    /** Formatting style ('decimal', 'currency', 'percent', etc.) */
    style: PropTypes.string,
    /** Currency code for currency formatting (e.g., 'USD') */
    currency: PropTypes.string,
    /** Minimum number of fraction digits */
    minimumFractionDigits: PropTypes.number,
    /** Maximum number of fraction digits */
    maximumFractionDigits: PropTypes.number
  }),
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

export default NumberField;
