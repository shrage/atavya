import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Checkbox component
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <Checkbox
 *   checked={isChecked}
 *   onChange={handleChange}
 *   label="Accept terms and conditions"
 * />
 * ```
 */
const Checkbox = ({
  id,
  name,
  checked = false,
  disabled = false,
  required = false,
  label,
  error,
  helperText,
  onChange,
  className,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={twMerge('flex items-start', className)}>
      <div className="flex items-center h-5">
        <input
          id={checkboxId}
          name={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          required={required}
          onChange={onChange}
          className={twMerge(
            'h-4 w-4 rounded focus:ring-2 focus:ring-offset-2',
            error
              ? 'border-status-live text-status-live focus:ring-status-live'
              : 'border-border-medium text-primary focus:ring-primary',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          {...props}
        />
      </div>
      {label && (
        <div className="ml-3 text-sm">
          <label 
            htmlFor={checkboxId} 
            className={twMerge(
              'font-medium',
              disabled ? 'text-text-tertiary' : 'text-text-primary',
              error && 'text-status-live'
            )}
          >
            {label}
            {required && <span className="ml-1 text-status-live">*</span>}
          </label>
          {helperText && (
            <p className={twMerge(
              'mt-1 text-sm',
              error ? 'text-status-live' : 'text-text-secondary'
            )}>
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  /** Unique ID for the checkbox */
  id: PropTypes.string,
  /** Name attribute for the checkbox */
  name: PropTypes.string,
  /** Whether the checkbox is checked */
  checked: PropTypes.bool,
  /** Whether the checkbox is disabled */
  disabled: PropTypes.bool,
  /** Whether the checkbox is required */
  required: PropTypes.bool,
  /** Label for the checkbox */
  label: PropTypes.node,
  /** Error message */
  error: PropTypes.string,
  /** Helper text to display below the checkbox */
  helperText: PropTypes.node,
  /** Change handler */
  onChange: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Checkbox;
