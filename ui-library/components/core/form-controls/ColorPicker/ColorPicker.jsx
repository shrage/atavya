import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * ColorPicker component
 * 
 * A component for selecting colors with support for predefined palettes.
 * Uses Tailwind theme colors for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <ColorPicker
 *   value="#3B82F6"
 *   onChange={handleColorChange}
 *   label="Select a color"
 * />
 * ```
 */
const ColorPicker = ({
  id,
  name,
  value,
  defaultValue = '#3B82F6',
  disabled = false,
  required = false,
  label,
  error,
  helperText,
  showHexValue = true,
  palette = [],
  onChange,
  className,
  ...props
}) => {
  const colorPickerId = id || `color-picker-${Math.random().toString(36).substr(2, 9)}`;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Default palette if none provided
  const defaultPalette = [
    // Primary colors
    '#EF4444', // Red
    '#F97316', // Orange
    '#F59E0B', // Amber
    '#EAB308', // Yellow
    '#84CC16', // Lime
    '#22C55E', // Green
    '#10B981', // Emerald
    '#14B8A6', // Teal
    '#06B6D4', // Cyan
    '#0EA5E9', // Light Blue
    '#3B82F6', // Blue
    '#6366F1', // Indigo
    '#8B5CF6', // Violet
    '#A855F7', // Purple
    '#D946EF', // Fuchsia
    '#EC4899', // Pink
    
    // Grayscale
    '#000000', // Black
    '#374151', // Gray 700
    '#6B7280', // Gray 500
    '#9CA3AF', // Gray 400
    '#D1D5DB', // Gray 300
    '#F3F4F6', // Gray 100
    '#FFFFFF', // White
  ];
  
  const colorOptions = palette.length > 0 ? palette : defaultPalette;
  
  // State for controlled/uncontrolled component
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    isControlled ? value : defaultValue
  );
  const actualValue = isControlled ? value : internalValue;
  
  // Update internal value when controlled value changes
  useEffect(() => {
    if (isControlled) {
      setInternalValue(value);
    }
  }, [isControlled, value]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleColorChange = (color) => {
    if (disabled) return;
    
    if (!isControlled) {
      setInternalValue(color);
    }
    
    if (onChange) {
      onChange({
        target: {
          name,
          value: color,
          type: 'color'
        }
      });
    }
    
    setIsOpen(false);
  };
  
  const handleCustomColorChange = (e) => {
    const color = e.target.value;
    
    if (!isControlled) {
      setInternalValue(color);
    }
    
    if (onChange) {
      onChange({
        target: {
          name,
          value: color,
          type: 'color'
        }
      });
    }
  };
  
  return (
    <div className={twMerge('w-full', className)}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={colorPickerId}
          className={twMerge(
            'block text-sm font-medium mb-1',
            disabled ? 'text-text-tertiary' : 'text-text-primary',
            error && 'text-status-live'
          )}
        >
          {label}
          {required && <span className="ml-1 text-status-live">*</span>}
        </label>
      )}
      
      {/* Color picker control */}
      <div className="relative" ref={dropdownRef}>
        <div 
          className={twMerge(
            'flex items-center border rounded-md p-2 cursor-pointer',
            error 
              ? 'border-status-live focus-within:ring-status-live focus-within:border-status-live' 
              : 'border-border-medium focus-within:ring-primary focus-within:border-primary',
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-border-dark',
            'focus-within:ring-2 focus-within:ring-offset-2'
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div 
            className="h-6 w-6 rounded-sm border border-border-light mr-2 flex-shrink-0"
            style={{ backgroundColor: actualValue }}
            aria-hidden="true"
          />
          
          {showHexValue && (
            <span className={twMerge(
              'text-sm',
              disabled ? 'text-text-tertiary' : 'text-text-primary'
            )}>
              {actualValue}
            </span>
          )}
          
          <div className="ml-auto">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={twMerge(
                "h-5 w-5 text-text-secondary transition-transform duration-200",
                isOpen && "transform rotate-180"
              )} 
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
        </div>
        
        {/* Color palette dropdown */}
        {isOpen && !disabled && (
          <div 
            className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-border-light p-2"
          >
            <div className="grid grid-cols-6 gap-1 mb-2">
              {colorOptions.map((color, index) => (
                <button
                  key={`${color}-${index}`}
                  type="button"
                  className={twMerge(
                    'h-6 w-6 rounded-sm border hover:scale-110 transition-transform',
                    color === actualValue ? 'border-text-primary ring-2 ring-primary' : 'border-border-light'
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
            
            {/* Custom color input */}
            <div className="pt-2 border-t border-border-light">
              <div className="flex items-center">
                <input
                  id={colorPickerId}
                  name={name}
                  type="color"
                  value={actualValue}
                  onChange={handleCustomColorChange}
                  className="h-8 w-8 rounded-sm border border-border-light cursor-pointer"
                  required={required}
                  disabled={disabled}
                  {...props}
                />
                <span className="ml-2 text-sm text-text-secondary">
                  Custom color
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Helper text or error message */}
      {helperText && (
        <p 
          className={twMerge(
            'mt-1 text-sm',
            error ? 'text-status-live' : 'text-text-secondary'
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

ColorPicker.propTypes = {
  /** Unique ID for the color picker */
  id: PropTypes.string,
  /** Name attribute for the color picker */
  name: PropTypes.string,
  /** Current color value (controlled component) */
  value: PropTypes.string,
  /** Default color value (uncontrolled component) */
  defaultValue: PropTypes.string,
  /** Whether the color picker is disabled */
  disabled: PropTypes.bool,
  /** Whether the color picker is required */
  required: PropTypes.bool,
  /** Label for the color picker */
  label: PropTypes.node,
  /** Error message */
  error: PropTypes.string,
  /** Helper text to display below the color picker */
  helperText: PropTypes.node,
  /** Whether to show the hex value */
  showHexValue: PropTypes.bool,
  /** Custom color palette */
  palette: PropTypes.arrayOf(PropTypes.string),
  /** Change handler */
  onChange: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default ColorPicker;
