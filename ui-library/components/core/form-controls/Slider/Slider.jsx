import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Slider component
 * 
 * A range input component that allows users to select a value from a range.
 * Uses Tailwind theme colors for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <Slider
 *   min={0}
 *   max={100}
 *   value={50}
 *   onChange={handleChange}
 *   label="Volume"
 * />
 * ```
 */
const Slider = ({
  id,
  name,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  disabled = false,
  required = false,
  label,
  error,
  helperText,
  showValue = true,
  valuePrefix = '',
  valueSuffix = '',
  showMinMaxLabels = false,
  minLabel,
  maxLabel,
  onChange,
  className,
  ...props
}) => {
  const sliderId = id || `slider-${Math.random().toString(36).substr(2, 9)}`;
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    isControlled ? value : (defaultValue !== undefined ? defaultValue : min)
  );
  const actualValue = isControlled ? value : internalValue;
  
  // Update internal value when controlled value changes
  useEffect(() => {
    if (isControlled) {
      setInternalValue(value);
    }
  }, [isControlled, value]);
  
  // Calculate percentage for styling
  const percentage = ((actualValue - min) / (max - min)) * 100;
  
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange({
        target: {
          name,
          value: newValue,
          type: 'range'
        }
      });
    }
  };
  
  // Format displayed value
  const formattedValue = `${valuePrefix}${actualValue}${valueSuffix}`;
  
  return (
    <div className={twMerge('w-full', className)}>
      {/* Label and value display */}
      {(label || (showValue && actualValue !== undefined)) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <label 
              htmlFor={sliderId}
              className={twMerge(
                'block text-sm font-medium',
                disabled ? 'text-text-tertiary' : 'text-text-primary',
                error && 'text-status-live'
              )}
            >
              {label}
              {required && <span className="ml-1 text-status-live">*</span>}
            </label>
          )}
          {showValue && actualValue !== undefined && (
            <span 
              className={twMerge(
                'text-sm font-medium',
                disabled ? 'text-text-tertiary' : 'text-text-secondary'
              )}
            >
              {formattedValue}
            </span>
          )}
        </div>
      )}
      
      {/* Slider track and thumb */}
      <div className="relative">
        <input
          id={sliderId}
          name={name}
          type="range"
          min={min}
          max={max}
          step={step}
          value={actualValue}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          className={twMerge(
            'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            disabled && 'opacity-50 cursor-not-allowed',
            error && 'focus:ring-status-live'
          )}
          style={{
            // Custom styling for the track fill
            background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
          }}
          {...props}
        />
      </div>
      
      {/* Min/Max labels */}
      {showMinMaxLabels && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-text-secondary">
            {minLabel !== undefined ? minLabel : min}
          </span>
          <span className="text-xs text-text-secondary">
            {maxLabel !== undefined ? maxLabel : max}
          </span>
        </div>
      )}
      
      {/* Helper text or error message */}
      {helperText && (
        <p 
          className={twMerge(
            'mt-2 text-sm',
            error ? 'text-status-live' : 'text-text-secondary'
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

Slider.propTypes = {
  /** Unique ID for the slider */
  id: PropTypes.string,
  /** Name attribute for the slider */
  name: PropTypes.string,
  /** Minimum value */
  min: PropTypes.number,
  /** Maximum value */
  max: PropTypes.number,
  /** Step increment */
  step: PropTypes.number,
  /** Current value (controlled component) */
  value: PropTypes.number,
  /** Default value (uncontrolled component) */
  defaultValue: PropTypes.number,
  /** Whether the slider is disabled */
  disabled: PropTypes.bool,
  /** Whether the slider is required */
  required: PropTypes.bool,
  /** Label for the slider */
  label: PropTypes.node,
  /** Error message */
  error: PropTypes.string,
  /** Helper text to display below the slider */
  helperText: PropTypes.node,
  /** Whether to show the current value */
  showValue: PropTypes.bool,
  /** Prefix to display before the value */
  valuePrefix: PropTypes.string,
  /** Suffix to display after the value */
  valueSuffix: PropTypes.string,
  /** Whether to show min/max labels */
  showMinMaxLabels: PropTypes.bool,
  /** Custom label for minimum value */
  minLabel: PropTypes.node,
  /** Custom label for maximum value */
  maxLabel: PropTypes.node,
  /** Change handler */
  onChange: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Slider;
