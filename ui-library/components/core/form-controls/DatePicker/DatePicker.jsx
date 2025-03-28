import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { format, isValid, parse } from 'date-fns';

/**
 * DatePicker component
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <DatePicker
 *   value={date}
 *   onChange={handleDateChange}
 *   placeholder="Select a date"
 * />
 * ```
 */
const DatePicker = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  placeholder = 'Select a date',
  format: dateFormat = 'yyyy-MM-dd',
  error,
  className,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(() => {
    if (value instanceof Date && isValid(value)) {
      return format(value, dateFormat);
    }
    return '';
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const inputId = id || `datepicker-${Math.random().toString(36).substr(2, 9)}`;
  
  // Update input value when value prop changes
  React.useEffect(() => {
    if (value instanceof Date && isValid(value)) {
      setInputValue(format(value, dateFormat));
    } else if (value === null || value === undefined) {
      setInputValue('');
    }
  }, [value, dateFormat]);
  
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Try to parse the date
    if (newValue.trim() !== '') {
      try {
        const parsedDate = parse(newValue, dateFormat, new Date());
        if (isValid(parsedDate)) {
          onChange && onChange(parsedDate);
        }
      } catch (error) {
        // Invalid date format, don't update the value
      }
    } else {
      // Empty input, set value to null
      onChange && onChange(null);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };
  
  return (
    <div className={twMerge('relative', className)}>
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={onBlur}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          className={twMerge(
            'w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
            error
              ? 'border-status-live text-status-live focus:border-status-live focus:ring-status-live'
              : 'border-border-light text-text-primary focus:border-primary focus:ring-primary',
            disabled && 'bg-background-skeleton cursor-not-allowed opacity-75'
          )}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className={twMerge(
              'h-5 w-5',
              error ? 'text-status-live' : 'text-text-secondary',
              disabled && 'opacity-50'
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      
      {/* Calendar dropdown would go here in a full implementation */}
      {/* For simplicity, we're just using a text input with date parsing */}
    </div>
  );
};

DatePicker.propTypes = {
  /** Unique ID for the input */
  id: PropTypes.string,
  /** Name attribute for the input */
  name: PropTypes.string,
  /** Selected date value */
  value: PropTypes.instanceOf(Date),
  /** Change handler */
  onChange: PropTypes.func,
  /** Blur handler */
  onBlur: PropTypes.func,
  /** Whether the input is disabled */
  disabled: PropTypes.bool,
  /** Whether the input is required */
  required: PropTypes.bool,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Date format string (using date-fns format) */
  format: PropTypes.string,
  /** Error message */
  error: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default DatePicker;
