import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Input component following Atavya design system
 * 
 * A versatile input component that supports various states, sizes, and types.
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   onChange={(e) => console.log(e.target.value)}
 * />
 * ```
 */
const Input = React.forwardRef(({
  label,
  error,
  helperText,
  className,
  fullWidth = false,
  size = 'md',
  type = 'text',
  disabled = false,
  required = false,
  ...props
}, ref) => {
  const baseStyles = 'block w-full rounded border border-border-medium bg-white text-text-primary placeholder:text-text-secondary transition-colors duration-150';
  
  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const stateStyles = {
    normal: 'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
    error: 'border-status-live focus:border-status-live focus:ring-status-live',
    disabled: 'bg-background-offwhite text-text-secondary cursor-not-allowed',
  };

  const containerStyles = twMerge(
    'flex flex-col',
    fullWidth ? 'w-full' : 'w-auto',
    className
  );

  const inputStyles = twMerge(
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
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        required={required}
        className={inputStyles}
        {...props}
      />
      {(helperText || error) && (
        <p className={helperTextStyles}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  /** Input label */
  label: PropTypes.string,
  /** Error message to display */
  error: PropTypes.string,
  /** Helper text to display below the input */
  helperText: PropTypes.string,
  /** Additional classes to apply to the container */
  className: PropTypes.string,
  /** Whether the input should take the full width of its container */
  fullWidth: PropTypes.bool,
  /** Input size variant */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Input type (text, email, password, etc.) */
  type: PropTypes.string,
  /** Whether the input is disabled */
  disabled: PropTypes.bool,
  /** Whether the input is required */
  required: PropTypes.bool,
};

export default Input;
