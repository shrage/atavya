import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * LookupField component
 * 
 * A form control for searching and selecting items from a list of options.
 * Supports asynchronous loading, filtering, and custom rendering of options.
 * 
 * @component
 * @example
 * ```jsx
 * <LookupField
 *   label="Select User"
 *   options={users}
 *   onChange={(value) => console.log(value)}
 *   getOptionLabel={(option) => option.name}
 * />
 * ```
 */
const LookupField = ({
  id,
  name,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  onSearch,
  label,
  placeholder = 'Search...',
  helperText,
  errorText,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isInvalid = false,
  isLoading = false,
  options = [],
  getOptionLabel = (option) => option?.label || option,
  getOptionValue = (option) => option?.value || option,
  renderOption,
  filterOption,
  noOptionsMessage = 'No options found',
  loadingMessage = 'Loading...',
  minSearchLength = 0,
  debounceMs = 300,
  size = 'md',
  className,
  inputClassName,
  labelClassName,
  errorClassName,
  helperClassName,
  menuClassName,
  ...props
}) => {
  // Initialize state with controlled or uncontrolled value
  const isControlled = value !== undefined;
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isTouched, setIsTouched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  
  // Find the option that matches the value
  const findOptionByValue = (optionValue) => {
    return options.find(option => getOptionValue(option) === optionValue);
  };
  
  // Initialize selected option based on value or defaultValue
  useEffect(() => {
    if (isControlled && value !== undefined) {
      const option = findOptionByValue(value);
      setSelectedOption(option || null);
      setInputValue(option ? getOptionLabel(option) : '');
    } else if (!isControlled && defaultValue !== undefined) {
      const option = findOptionByValue(defaultValue);
      setSelectedOption(option || null);
      setInputValue(option ? getOptionLabel(option) : '');
    }
  }, [isControlled, value, defaultValue, options]);
  
  // Filter options based on input
  const filterOptions = (input, opts) => {
    if (!input || input.length < minSearchLength) {
      return opts;
    }
    
    if (filterOption) {
      return opts.filter(option => filterOption(input, option));
    }
    
    const normalizedInput = input.toLowerCase();
    return opts.filter(option => {
      const label = getOptionLabel(option).toLowerCase();
      return label.includes(normalizedInput);
    });
  };
  
  // Handle input change with debounce for search
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // If there's a search function and the input is long enough, trigger search
    if (onSearch && newValue.length >= minSearchLength) {
      setIsSearching(true);
      
      searchTimeoutRef.current = setTimeout(() => {
        onSearch(newValue);
        setIsSearching(false);
      }, debounceMs);
    }
    
    // Filter options locally
    setFilteredOptions(filterOptions(newValue, options));
    setIsOpen(true);
    setHighlightedIndex(-1);
  };
  
  // Handle option selection
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setInputValue(getOptionLabel(option));
    setIsOpen(false);
    
    if (onChange) {
      onChange(getOptionValue(option));
    }
    
    // Focus the input after selection
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Handle input focus
  const handleFocus = (e) => {
    if (!isDisabled && !isReadOnly) {
      setIsOpen(true);
      setFilteredOptions(filterOptions(inputValue, options));
    }
    
    if (onFocus) {
      onFocus(e);
    }
  };
  
  // Handle input blur
  const handleBlur = (e) => {
    // Delay closing to allow click events on options
    setTimeout(() => {
      setIsOpen(false);
      setIsTouched(true);
      
      // If no option is selected but there's input, reset the input
      if (!selectedOption && inputValue) {
        setInputValue('');
      }
      
      // If an option is selected, ensure the input matches the label
      if (selectedOption && inputValue !== getOptionLabel(selectedOption)) {
        setInputValue(getOptionLabel(selectedOption));
      }
    }, 200);
    
    if (onBlur) {
      onBlur(e);
    }
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (isDisabled || isReadOnly) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFilteredOptions(filterOptions(inputValue, options));
        } else {
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
        
      case 'Enter':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSelectOption(filteredOptions[highlightedIndex]);
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
        
      case 'Tab':
        setIsOpen(false);
        break;
        
      default:
        break;
    }
  };
  
  // Handle clear selection
  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedOption(null);
    setInputValue('');
    
    if (onChange) {
      onChange(null);
    }
    
    // Focus the input after clearing
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Size variants
  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg'
  };
  
  // Generate a unique ID if none provided
  const fieldId = id || `lookup-field-${Math.random().toString(36).substr(2, 9)}`;
  
  // Determine if the field has an error
  const hasError = isInvalid || !!errorText;
  
  return (
    <div className={twMerge('w-full relative', className)}>
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
          ref={inputRef}
          id={fieldId}
          name={name}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          readOnly={isReadOnly}
          placeholder={placeholder}
          required={isRequired}
          aria-invalid={hasError}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={`${fieldId}-listbox`}
          aria-activedescendant={
            highlightedIndex >= 0 
              ? `${fieldId}-option-${highlightedIndex}` 
              : undefined
          }
          aria-describedby={`${fieldId}-error ${fieldId}-helper`}
          className={twMerge(
            'w-full px-3 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors',
            sizeClasses[size],
            isDisabled && 'bg-gray-100 text-text-disabled cursor-not-allowed',
            isReadOnly && 'bg-gray-50 cursor-default',
            hasError && 'border-status-error focus:ring-status-error focus:border-status-error',
            (selectedOption || (isLoading && isSearching)) && 'pr-10',
            inputClassName
          )}
          {...props}
        />
        
        {/* Clear button or loading indicator */}
        {(selectedOption || (isLoading && isSearching)) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {isLoading && isSearching ? (
              <svg 
                className="animate-spin h-5 w-5 text-text-secondary" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <button
                type="button"
                onClick={handleClear}
                className="text-text-secondary hover:text-text-primary focus:outline-none"
                aria-label="Clear selection"
                tabIndex={-1}
                disabled={isDisabled || isReadOnly}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Dropdown menu */}
      {isOpen && (
        <div 
          ref={menuRef}
          id={`${fieldId}-listbox`}
          role="listbox"
          className={twMerge(
            'absolute z-10 w-full mt-1 bg-white border border-border-light rounded-md shadow-lg max-h-60 overflow-auto',
            menuClassName
          )}
        >
          {isLoading && isSearching ? (
            <div className="p-3 text-center text-text-secondary">
              {loadingMessage}
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className="p-3 text-center text-text-secondary">
              {noOptionsMessage}
            </div>
          ) : (
            <ul className="py-1">
              {filteredOptions.map((option, index) => (
                <li
                  key={getOptionValue(option)}
                  id={`${fieldId}-option-${index}`}
                  role="option"
                  aria-selected={highlightedIndex === index}
                  className={twMerge(
                    'px-3 py-2 cursor-pointer',
                    highlightedIndex === index ? 'bg-primary/10 text-primary' : 'text-text-primary hover:bg-gray-100'
                  )}
                  onClick={() => handleSelectOption(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {renderOption ? renderOption(option) : getOptionLabel(option)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      
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

LookupField.propTypes = {
  /** Unique identifier for the field */
  id: PropTypes.string,
  /** Name attribute for the input */
  name: PropTypes.string,
  /** Current value (controlled) */
  value: PropTypes.any,
  /** Default value (uncontrolled) */
  defaultValue: PropTypes.any,
  /** Change handler */
  onChange: PropTypes.func,
  /** Blur handler */
  onBlur: PropTypes.func,
  /** Focus handler */
  onFocus: PropTypes.func,
  /** Search handler for async options */
  onSearch: PropTypes.func,
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
  /** Whether options are loading */
  isLoading: PropTypes.bool,
  /** Available options */
  options: PropTypes.array,
  /** Function to get the label from an option */
  getOptionLabel: PropTypes.func,
  /** Function to get the value from an option */
  getOptionValue: PropTypes.func,
  /** Custom render function for options */
  renderOption: PropTypes.func,
  /** Custom filter function for options */
  filterOption: PropTypes.func,
  /** Message to display when no options are available */
  noOptionsMessage: PropTypes.string,
  /** Message to display when options are loading */
  loadingMessage: PropTypes.string,
  /** Minimum input length to trigger search */
  minSearchLength: PropTypes.number,
  /** Debounce delay for search in milliseconds */
  debounceMs: PropTypes.number,
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
  /** Additional CSS classes for the dropdown menu */
  menuClassName: PropTypes.string,
};

export default LookupField;
