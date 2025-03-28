import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * ColorPickerField component
 * 
 * A form control for selecting colors with support for different formats and predefined palettes.
 * 
 * @component
 * @example
 * ```jsx
 * <ColorPickerField
 *   label="Brand Color"
 *   onChange={(color) => console.log(color)}
 * />
 * ```
 */
const ColorPickerField = ({
  id,
  name,
  value,
  defaultValue = '#000000',
  onChange,
  onBlur,
  onFocus,
  label,
  helperText,
  errorText,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isInvalid = false,
  format = 'hex', // 'hex', 'rgb', 'rgba', 'hsl'
  showAlpha = false,
  palette = [],
  size = 'md',
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
    isControlled ? value : defaultValue
  );
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  
  const pickerRef = useRef(null);
  const colorBoxRef = useRef(null);
  
  // Default palette if none provided
  const defaultPalette = [
    '#000000', '#ffffff', '#f44336', '#e91e63', '#9c27b0', 
    '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', 
    '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', 
    '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b'
  ];
  
  // Use provided palette or default
  const colorPalette = palette.length > 0 ? palette : defaultPalette;
  
  // Update local value when controlled value changes
  useEffect(() => {
    if (isControlled) {
      setLocalValue(value);
    }
  }, [isControlled, value]);
  
  // Handle click outside to close picker
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        pickerRef.current && 
        !pickerRef.current.contains(e.target) &&
        colorBoxRef.current &&
        !colorBoxRef.current.contains(e.target)
      ) {
        setIsPickerOpen(false);
      }
    };
    
    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen]);
  
  // Convert color formats
  const convertColor = {
    // Convert hex to rgb
    hexToRgb: (hex) => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
      
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },
    
    // Convert rgb to hex
    rgbToHex: (r, g, b) => {
      return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    
    // Convert hex to rgba
    hexToRgba: (hex, alpha = 1) => {
      const rgb = convertColor.hexToRgb(hex);
      return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : '';
    },
    
    // Parse rgba string to object
    parseRgba: (rgba) => {
      const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
      if (match) {
        return {
          r: parseInt(match[1], 10),
          g: parseInt(match[2], 10),
          b: parseInt(match[3], 10),
          a: match[4] ? parseFloat(match[4]) : 1
        };
      }
      return null;
    },
    
    // Format color based on selected format
    formatColor: (color, format, alpha = 1) => {
      if (!color) return '';
      
      // If color is already in the right format, return it
      if (
        (format === 'hex' && color.startsWith('#')) ||
        (format === 'rgb' && color.startsWith('rgb(')) ||
        (format === 'rgba' && color.startsWith('rgba(')) ||
        (format === 'hsl' && color.startsWith('hsl('))
      ) {
        return color;
      }
      
      // Convert to the requested format
      if (color.startsWith('#')) {
        const rgb = convertColor.hexToRgb(color);
        if (!rgb) return color;
        
        switch (format) {
          case 'rgb':
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
          case 'rgba':
            return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
          case 'hex':
          default:
            return color;
        }
      } else if (color.startsWith('rgb')) {
        const rgba = convertColor.parseRgba(color);
        if (!rgba) return color;
        
        switch (format) {
          case 'hex':
            return convertColor.rgbToHex(rgba.r, rgba.g, rgba.b);
          case 'rgb':
            return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;
          case 'rgba':
            return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a || alpha})`;
          default:
            return color;
        }
      }
      
      return color;
    }
  };
  
  // Handle color change
  const handleColorChange = (newColor) => {
    // Format the color according to the selected format
    const formattedColor = convertColor.formatColor(newColor, format);
    
    if (!isControlled) {
      setLocalValue(formattedColor);
    }
    
    if (onChange) {
      onChange(formattedColor);
    }
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setLocalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
  };
  
  // Handle palette color selection
  const handlePaletteSelect = (color) => {
    handleColorChange(color);
    setIsPickerOpen(false);
  };
  
  // Toggle color picker
  const togglePicker = () => {
    if (!isDisabled && !isReadOnly) {
      setIsPickerOpen(!isPickerOpen);
    }
  };
  
  // Size variants
  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg'
  };
  
  // Generate a unique ID if none provided
  const fieldId = id || `color-field-${Math.random().toString(36).substr(2, 9)}`;
  
  // Determine if the field has an error
  const hasError = isInvalid || !!errorText;
  
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
      
      {/* Color input with preview */}
      <div className="relative">
        <div className="flex">
          {/* Color preview box */}
          <div 
            ref={colorBoxRef}
            className={twMerge(
              'flex-shrink-0 w-10 border border-r-0 border-border-medium rounded-l-md cursor-pointer',
              isDisabled && 'opacity-50 cursor-not-allowed',
              isReadOnly && 'cursor-default',
              hasError && 'border-status-error'
            )}
            style={{ backgroundColor: localValue || '#ffffff' }}
            onClick={togglePicker}
          />
          
          {/* Text input */}
          <input
            id={fieldId}
            name={name}
            type="text"
            value={localValue || ''}
            onChange={handleInputChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={isDisabled}
            readOnly={isReadOnly}
            aria-invalid={hasError}
            aria-describedby={`${fieldId}-error ${fieldId}-helper`}
            className={twMerge(
              'flex-grow px-3 border border-border-medium rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors',
              sizeClasses[size],
              isDisabled && 'bg-gray-100 text-text-disabled cursor-not-allowed',
              isReadOnly && 'bg-gray-50 cursor-default',
              hasError && 'border-status-error focus:ring-status-error focus:border-status-error',
              inputClassName
            )}
            {...props}
          />
        </div>
        
        {/* Color picker dropdown */}
        {isPickerOpen && (
          <div 
            ref={pickerRef}
            className="absolute z-10 mt-1 p-3 bg-white border border-border-light rounded-md shadow-lg"
          >
            {/* Color palette */}
            <div className="grid grid-cols-5 gap-2 mb-3">
              {colorPalette.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  className={twMerge(
                    'w-6 h-6 rounded-md border border-border-light focus:outline-none focus:ring-2 focus:ring-primary',
                    localValue === color && 'ring-2 ring-primary'
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => handlePaletteSelect(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
            
            {/* HTML5 color picker */}
            <div className="flex items-center">
              <label htmlFor={`${fieldId}-native-picker`} className="text-sm text-text-secondary mr-2">
                Custom:
              </label>
              <input
                id={`${fieldId}-native-picker`}
                type="color"
                value={localValue && localValue.startsWith('#') ? localValue : '#000000'}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-8 h-8 p-0 border-0 cursor-pointer"
              />
            </div>
            
            {/* Alpha slider (if enabled) */}
            {showAlpha && (
              <div className="mt-3">
                <label htmlFor={`${fieldId}-alpha`} className="block text-sm text-text-secondary mb-1">
                  Opacity:
                </label>
                <input
                  id={`${fieldId}-alpha`}
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  defaultValue="1"
                  className="w-full"
                  onChange={(e) => {
                    const alpha = parseFloat(e.target.value);
                    if (localValue && localValue.startsWith('#')) {
                      handleColorChange(convertColor.hexToRgba(localValue, alpha));
                    }
                  }}
                />
              </div>
            )}
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

ColorPickerField.propTypes = {
  /** Unique identifier for the field */
  id: PropTypes.string,
  /** Name attribute for the input */
  name: PropTypes.string,
  /** Current value (controlled) */
  value: PropTypes.string,
  /** Default value (uncontrolled) */
  defaultValue: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  /** Blur handler */
  onBlur: PropTypes.func,
  /** Focus handler */
  onFocus: PropTypes.func,
  /** Field label */
  label: PropTypes.node,
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
  /** Color format */
  format: PropTypes.oneOf(['hex', 'rgb', 'rgba', 'hsl']),
  /** Whether to show alpha/opacity control */
  showAlpha: PropTypes.bool,
  /** Predefined color palette */
  palette: PropTypes.arrayOf(PropTypes.string),
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
};

export default ColorPickerField;
