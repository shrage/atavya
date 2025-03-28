import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Toggle component
 * 
 * A switch control that toggles between on and off states.
 * Uses Tailwind theme colors for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <Toggle
 *   checked={isEnabled}
 *   onChange={handleChange}
 *   label="Enable notifications"
 * />
 * ```
 */
const Toggle = ({
  id,
  name,
  checked = false,
  disabled = false,
  required = false,
  label,
  error,
  helperText,
  onChange,
  size = 'md',
  className,
  ...props
}) => {
  const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;
  
  // Size variants
  const sizeClasses = {
    sm: {
      container: 'h-5 w-9',
      circle: 'h-3 w-3',
      translate: 'translate-x-4',
      label: 'text-xs'
    },
    md: {
      container: 'h-6 w-11',
      circle: 'h-4 w-4',
      translate: 'translate-x-5',
      label: 'text-sm'
    },
    lg: {
      container: 'h-7 w-14',
      circle: 'h-5 w-5',
      translate: 'translate-x-7',
      label: 'text-base'
    }
  };
  
  const selectedSize = sizeClasses[size] || sizeClasses.md;
  
  return (
    <div className={twMerge('flex items-start', className)}>
      <div className="flex items-center">
        <button
          type="button"
          id={toggleId}
          role="switch"
          aria-checked={checked}
          aria-labelledby={`${toggleId}-label`}
          aria-describedby={helperText ? `${toggleId}-description` : undefined}
          aria-required={required}
          disabled={disabled}
          onClick={(e) => {
            if (!disabled && onChange) {
              // Create a synthetic event similar to a checkbox input
              const syntheticEvent = {
                target: {
                  name,
                  checked: !checked,
                  type: 'checkbox'
                },
                preventDefault: e.preventDefault,
                stopPropagation: e.stopPropagation
              };
              onChange(syntheticEvent);
            }
          }}
          className={twMerge(
            'relative inline-flex flex-shrink-0 border-2 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
            selectedSize.container,
            checked 
              ? 'bg-primary border-primary focus:ring-primary' 
              : 'bg-gray-200 border-gray-200 focus:ring-gray-400',
            error && 'border-status-live focus:ring-status-live',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          {...props}
        >
          <span 
            className={twMerge(
              'pointer-events-none relative inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
              selectedSize.circle,
              checked ? selectedSize.translate : 'translate-x-0'
            )} 
          />
        </button>
      </div>
      
      {label && (
        <div className="ml-3">
          <label 
            id={`${toggleId}-label`}
            htmlFor={toggleId} 
            className={twMerge(
              'font-medium',
              selectedSize.label,
              disabled ? 'text-text-tertiary' : 'text-text-primary',
              error && 'text-status-live'
            )}
          >
            {label}
            {required && <span className="ml-1 text-status-live">*</span>}
          </label>
          {helperText && (
            <p 
              id={`${toggleId}-description`}
              className={twMerge(
                'mt-1 text-sm',
                error ? 'text-status-live' : 'text-text-secondary'
              )}
            >
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

Toggle.propTypes = {
  /** Unique ID for the toggle */
  id: PropTypes.string,
  /** Name attribute for the toggle */
  name: PropTypes.string,
  /** Whether the toggle is checked/on */
  checked: PropTypes.bool,
  /** Whether the toggle is disabled */
  disabled: PropTypes.bool,
  /** Whether the toggle is required */
  required: PropTypes.bool,
  /** Label for the toggle */
  label: PropTypes.node,
  /** Error message */
  error: PropTypes.string,
  /** Helper text to display below the toggle */
  helperText: PropTypes.node,
  /** Change handler */
  onChange: PropTypes.func,
  /** Size of the toggle */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Toggle;
