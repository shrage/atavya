import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import CustomField from '../../../view/CustomField/CustomField';
import StatusBadge from '../../display/StatusBadge/StatusBadge';

/**
 * StatusPickerField component
 * A field for selecting status values with visual indicators
 * 
 * @component
 * @example
 * ```jsx
 * <StatusPickerField
 *   label="Task Status"
 *   value="live"
 *   onChange={handleStatusChange}
 *   options={[
 *     { value: 'research', label: 'Research' },
 *     { value: 'campaign', label: 'Campaign' },
 *     { value: 'live', label: 'Live' },
 *   ]}
 *   required
 * />
 * ```
 */
const StatusPickerField = ({
  // Field metadata
  id,
  label,
  description,
  required = false,
  
  // Options
  options = [],
  
  // Value
  value = '',
  defaultValue = '',
  onChange,
  
  // Validation
  error,
  
  // Display options
  labelPosition = 'top',
  hideLabel = false,
  fullWidth = true,
  size = 'md',
  className,
  
  // Restrictions
  allowedTransitions,
  showDescription = false,
  
  // State
  disabled = false,
  readOnly = false,
  
  // Inline editing
  inlineEdit = false,
  
  // Other props
  ...props
}) => {
  // State for controlled/uncontrolled component
  const [localValue, setLocalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(!inlineEdit);
  
  // Refs for dropdown positioning and click outside detection
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : localValue;
  
  // Find the selected option object
  const selectedOption = options.find(option => option.value === currentValue);
  
  // Filter options based on allowed transitions if specified
  const availableOptions = allowedTransitions && currentValue
    ? options.filter(option => 
        option.value === currentValue || 
        allowedTransitions[currentValue]?.includes(option.value)
      )
    : options;
  
  // Handle status selection
  const handleSelect = (newValue) => {
    if (!isControlled) {
      setLocalValue(newValue);
    }
    
    if (onChange) {
      const selectedOption = options.find(option => option.value === newValue);
      onChange(newValue, selectedOption);
    }
    
    setIsOpen(false);
    
    if (inlineEdit) {
      setIsEditing(false);
    }
  };
  
  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled && !readOnly) {
      setIsOpen(!isOpen);
    }
  };
  
  // Toggle inline editing
  const handleInlineEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Map size to component sizes
  const componentSize = {
    sm: 'sm',
    md: 'md',
    lg: 'lg'
  }[size] || 'md';
  
  return (
    <CustomField
      id={id}
      label={label}
      description={description}
      required={required}
      error={error}
      labelPosition={labelPosition}
      hideLabel={hideLabel}
      fullWidth={fullWidth}
      className={className}
      inlineEdit={inlineEdit}
      onInlineEditToggle={handleInlineEditToggle}
    >
      {isEditing ? (
        <div className="relative">
          {/* Status Picker Trigger */}
          <div
            ref={triggerRef}
            className={twMerge(
              'flex items-center justify-between w-full px-3 py-2 border rounded-md cursor-pointer transition-colors duration-150',
              isOpen ? 'border-primary ring-2 ring-primary/20' : 'border-border-medium',
              error ? 'border-status-live' : '',
              disabled ? 'bg-background-offwhite text-text-secondary cursor-not-allowed' : 'bg-white',
              'hover:bg-background-hover'
            )}
            onClick={toggleDropdown}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDropdown();
              }
            }}
            role="button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={`${id}-label`}
          >
            {selectedOption ? (
              <StatusBadge 
                label={selectedOption.label}
                status={selectedOption.value}
                size={componentSize}
              />
            ) : (
              <span className="text-text-secondary italic">Select a status</span>
            )}
            
            {/* Dropdown arrow */}
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          
          {/* Dropdown Menu */}
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute z-10 w-full mt-1 bg-white border border-border-light rounded-md shadow-lg max-h-60 overflow-auto"
              role="listbox"
            >
              <ul className="py-1">
                {availableOptions.map((option) => {
                  const isSelected = option.value === currentValue;
                  const isDisabled = option.disabled;
                  
                  return (
                    <li
                      key={option.value}
                      className={twMerge(
                        'px-3 py-2 cursor-pointer',
                        isSelected ? 'bg-primary/10' : 'hover:bg-background-hover',
                        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                      )}
                      onClick={() => !isDisabled && handleSelect(option.value)}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={isDisabled}
                    >
                      <div className="flex items-center justify-between">
                        <StatusBadge 
                          label={option.label}
                          status={option.value}
                          size={componentSize}
                        />
                        
                        {isSelected && (
                          <svg className="w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      
                      {/* Status description */}
                      {showDescription && option.description && (
                        <p className="mt-1 text-xs text-text-secondary">
                          {option.description}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div 
          className={twMerge(
            'p-2 rounded cursor-pointer min-h-[36px]',
            !selectedOption && 'text-text-secondary italic',
            'hover:bg-background-hover'
          )}
          onClick={() => inlineEdit && setIsEditing(true)}
        >
          {selectedOption ? (
            <StatusBadge 
              label={selectedOption.label}
              status={selectedOption.value}
              size={componentSize}
            />
          ) : (
            'Select a status'
          )}
        </div>
      )}
    </CustomField>
  );
};

StatusPickerField.propTypes = {
  /** Unique ID for the field */
  id: PropTypes.string,
  /** Field label */
  label: PropTypes.node,
  /** Additional description text */
  description: PropTypes.node,
  /** Whether the field is required */
  required: PropTypes.bool,
  
  /** Array of status options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  
  /** Current value (controlled) */
  value: PropTypes.string,
  /** Default value (uncontrolled) */
  defaultValue: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  
  /** Error message */
  error: PropTypes.node,
  
  /** Label position relative to input */
  labelPosition: PropTypes.oneOf(['top', 'inline']),
  /** Whether to hide the label */
  hideLabel: PropTypes.bool,
  /** Whether the field takes up full width */
  fullWidth: PropTypes.bool,
  /** Field size */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Additional CSS class for the wrapper */
  className: PropTypes.string,
  
  /** Map of allowed status transitions */
  allowedTransitions: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.string)
  ),
  /** Whether to show status descriptions */
  showDescription: PropTypes.bool,
  
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Whether the field is read-only */
  readOnly: PropTypes.bool,
  
  /** Whether to enable inline editing */
  inlineEdit: PropTypes.bool,
};

export default StatusPickerField;
