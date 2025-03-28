import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * ProgressBar component
 * 
 * A component for visualizing progress.
 * Uses Tailwind theme colors for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <ProgressBar value={75} />
 * <ProgressBar value={50} showValue />
 * <ProgressBar isIndeterminate />
 * ```
 */
const ProgressBar = ({
  value = 0,
  min = 0,
  max = 100,
  size = 'md',
  color = 'primary',
  showValue = false,
  valuePosition = 'right',
  isIndeterminate = false,
  label,
  className,
  ...props
}) => {
  // Calculate percentage
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  
  // Size variants
  const sizeClasses = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4'
  };
  
  // Color variants
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-status-success',
    warning: 'bg-status-warning',
    danger: 'bg-status-live',
    info: 'bg-status-info'
  };
  
  // Value position classes
  const valuePositionClasses = {
    left: 'justify-start',
    right: 'justify-end',
    top: 'flex-col-reverse',
    bottom: 'flex-col'
  };
  
  // Indeterminate animation
  const indeterminateClasses = isIndeterminate 
    ? 'animate-progress-indeterminate bg-gradient-to-r from-transparent via-primary to-transparent' 
    : '';
  
  // Format value display
  const displayValue = `${Math.round(percentage)}%`;
  
  return (
    <div className={twMerge('w-full', className)} {...props}>
      {/* Label */}
      {label && (
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-text-primary">
            {label}
          </label>
          {showValue && (valuePosition === 'top') && (
            <span className="text-sm font-medium text-text-secondary">
              {displayValue}
            </span>
          )}
        </div>
      )}
      
      {/* Progress bar with value */}
      <div className={twMerge(
        'flex items-center gap-2',
        valuePositionClasses[valuePosition]
      )}>
        {showValue && (valuePosition === 'left') && (
          <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
            {displayValue}
          </span>
        )}
        
        <div className={twMerge(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          sizeClasses[size]
        )}>
          <div 
            className={twMerge(
              'h-full rounded-full transition-all duration-300 ease-in-out',
              colorClasses[color],
              indeterminateClasses
            )}
            style={{ 
              width: isIndeterminate ? '100%' : `${percentage}%` 
            }}
            role="progressbar"
            aria-valuenow={isIndeterminate ? undefined : value}
            aria-valuemin={min}
            aria-valuemax={max}
          />
        </div>
        
        {showValue && (valuePosition === 'right') && (
          <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
            {displayValue}
          </span>
        )}
      </div>
      
      {/* Bottom value display */}
      {showValue && (valuePosition === 'bottom') && (
        <span className="text-sm font-medium text-text-secondary mt-1">
          {displayValue}
        </span>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  /** Current value */
  value: PropTypes.number,
  /** Minimum value */
  min: PropTypes.number,
  /** Maximum value */
  max: PropTypes.number,
  /** Size of the progress bar */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Color of the progress bar */
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'info']),
  /** Whether to show the percentage value */
  showValue: PropTypes.bool,
  /** Position of the value display */
  valuePosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  /** Whether the progress is indeterminate */
  isIndeterminate: PropTypes.bool,
  /** Label for the progress bar */
  label: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default ProgressBar;
