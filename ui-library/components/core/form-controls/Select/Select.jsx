import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Select component following the Atavya design system
 * 
 * A versatile select component that supports various states, sizes, and options.
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <Select
 *   label="Country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *   ]}
 *   onChange={(e) => console.log(e.target.value)}
 * />
 * ```
 */
const Select = React.forwardRef(({
  label,
  options = [],
  error,
  helperText,
  className,
  fullWidth = false,
  size = 'md',
  disabled = false,
  required = false,
  placeholder,
  ...props
}, ref) => {
  const baseStyles = 'block w-full rounded-md border border-border-medium bg-white text-text-primary shadow-sm focus:ring-2 focus:ring-inset transition-colors duration-150';
  
  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-1.5 text-base',
    lg: 'px-4 py-2 text-lg',
  };

  const stateStyles = {
    normal: 'focus:border-primary focus:ring-primary',
    error: 'border-status-live focus:border-status-live focus:ring-status-live',
    disabled: 'bg-background-offwhite text-text-secondary cursor-not-allowed',
  };

  const containerStyles = twMerge(
    'flex flex-col',
    fullWidth ? 'w-full' : 'w-auto',
    className
  );

  const selectStyles = twMerge(
    baseStyles,
    sizeStyles[size],
    error ? stateStyles.error : stateStyles.normal,
    disabled && stateStyles.disabled
  );

  const labelStyles = twMerge(
    'block text-sm font-medium leading-6 text-text-primary mb-2',
    error && 'text-status-live',
    disabled && 'text-text-secondary'
  );

  const helperTextStyles = twMerge(
    'mt-1 text-xs',
    error ? 'text-status-live' : 'text-text-secondary'
  );

  return (
    <div className={containerStyles}>
      {label && (
        <label className={labelStyles}>
          {label}
          {required && <span className="text-status-live ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        disabled={disabled}
        required={required}
        className={selectStyles}
        {...props}
      >
        {placeholder && (
          <option value="" disabled selected hidden>{placeholder}</option>
        )}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {(helperText || error) && (
        <p className={helperTextStyles}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  /** Select label */
  label: PropTypes.string,
  /** Array of options with value and label properties */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  /** Error message to display */
  error: PropTypes.string,
  /** Helper text to display below the select */
  helperText: PropTypes.string,
  /** Additional classes to apply to the container */
  className: PropTypes.string,
  /** Whether the select should take the full width of its container */
  fullWidth: PropTypes.bool,
  /** Select size variant */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Whether the select is disabled */
  disabled: PropTypes.bool,
  /** Whether the select is required */
  required: PropTypes.bool,
  /** Placeholder text */
  placeholder: PropTypes.string,
};

export default Select;
