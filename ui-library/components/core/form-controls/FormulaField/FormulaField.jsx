import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import CustomField from '../../../view/CustomField/CustomField';

/**
 * FormulaField component
 * A field for displaying calculated values based on formulas
 * 
 * @component
 * @example
 * ```jsx
 * <FormulaField
 *   label="Total Price"
 *   formula={(values) => values.quantity * values.price}
 *   dependencies={{ quantity: 5, price: 10 }}
 *   formatResult={(value) => `$${value.toFixed(2)}`}
 * />
 * ```
 */
const FormulaField = ({
  // Field metadata
  id,
  label,
  description,
  required = false,
  
  // Formula configuration
  formula,
  dependencies = {},
  formatResult,
  showFormula = false,
  formulaDisplay,
  
  // Validation
  error,
  
  // Display options
  labelPosition = 'top',
  hideLabel = false,
  fullWidth = true,
  size = 'md',
  className,
  contentClassName,
  
  // State
  disabled = false,
  
  // Other props
  ...props
}) => {
  // State for calculated value
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState(null);
  
  // Calculate the formula result whenever dependencies change
  useEffect(() => {
    if (!formula) return;
    
    setIsCalculating(true);
    setCalculationError(null);
    
    try {
      // Use setTimeout to prevent UI blocking for complex calculations
      const timeoutId = setTimeout(() => {
        const result = formula(dependencies);
        setCalculatedValue(result);
        setIsCalculating(false);
      }, 0);
      
      return () => clearTimeout(timeoutId);
    } catch (err) {
      console.error('Formula calculation error:', err);
      setCalculationError('Error calculating formula');
      setIsCalculating(false);
    }
  }, [formula, dependencies]);
  
  // Format the calculated value if a formatter is provided
  const displayValue = React.useMemo(() => {
    if (calculationError) return null;
    if (isCalculating) return null;
    if (calculatedValue === null || calculatedValue === undefined) return null;
    
    try {
      return formatResult ? formatResult(calculatedValue) : String(calculatedValue);
    } catch (err) {
      console.error('Format result error:', err);
      return String(calculatedValue);
    }
  }, [calculatedValue, formatResult, isCalculating, calculationError]);
  
  // Determine the formula display text
  const formulaText = React.useMemo(() => {
    if (formulaDisplay) return formulaDisplay;
    if (typeof formula === 'function' && formula.toString) {
      const fnString = formula.toString();
      // Extract the formula part from the function string
      const match = fnString.match(/=>\s*{?\s*return\s*([^;]+);?\s*}?/) || 
                    fnString.match(/=>\s*([^;{]+)/);
      return match ? match[1].trim() : fnString;
    }
    return 'Custom formula';
  }, [formula, formulaDisplay]);
  
  // Map size to component sizes
  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-1.5 px-3',
    lg: 'text-base py-2 px-4'
  };
  
  return (
    <CustomField
      id={id}
      label={label}
      description={description}
      required={required}
      error={error || calculationError}
      labelPosition={labelPosition}
      hideLabel={hideLabel}
      fullWidth={fullWidth}
      className={className}
      contentClassName={contentClassName}
    >
      <div className="w-full">
        {/* Result Display */}
        <div
          className={twMerge(
            'w-full border border-border-medium rounded-md bg-background-offwhite',
            sizeClasses[size] || sizeClasses.md,
            error || calculationError ? 'border-status-live' : '',
            'flex items-center justify-between'
          )}
        >
          {isCalculating ? (
            <div className="flex items-center text-text-secondary">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calculating...
            </div>
          ) : displayValue !== null ? (
            <div className="font-medium">{displayValue}</div>
          ) : (
            <div className="text-text-secondary italic">No value</div>
          )}
          
          {/* Info icon */}
          {showFormula && (
            <div className="relative group">
              <svg 
                className="w-4 h-4 text-text-secondary cursor-help" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" 
                  clipRule="evenodd" 
                />
              </svg>
              
              {/* Tooltip with formula */}
              <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-white border border-border-light rounded-md shadow-lg p-2 z-10 w-max max-w-xs">
                <div className="text-xs">
                  <div className="font-medium mb-1">Formula:</div>
                  <div className="font-mono bg-background-offwhite p-1 rounded text-text-secondary">
                    {formulaText}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Formula display below field */}
        {showFormula && !props.inlineDisplay && (
          <div className="mt-1 text-xs text-text-secondary flex items-center">
            <span className="font-medium mr-1">Formula:</span>
            <code className="font-mono bg-background-offwhite px-1 py-0.5 rounded">
              {formulaText}
            </code>
          </div>
        )}
      </div>
    </CustomField>
  );
};

FormulaField.propTypes = {
  /** Unique ID for the field */
  id: PropTypes.string,
  /** Field label */
  label: PropTypes.node,
  /** Additional description text */
  description: PropTypes.node,
  /** Whether the field is required */
  required: PropTypes.bool,
  
  /** Formula function that calculates the value */
  formula: PropTypes.func.isRequired,
  /** Dependencies object with values used in the formula */
  dependencies: PropTypes.object,
  /** Function to format the calculated result */
  formatResult: PropTypes.func,
  /** Whether to show the formula */
  showFormula: PropTypes.bool,
  /** Custom formula display text */
  formulaDisplay: PropTypes.string,
  
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
  /** Additional CSS class for the content */
  contentClassName: PropTypes.string,
  
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  
  /** Whether to display the formula inline */
  inlineDisplay: PropTypes.bool,
};

export default FormulaField;
