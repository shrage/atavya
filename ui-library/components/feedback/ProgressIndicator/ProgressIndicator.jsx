import React from 'react';
import PropTypes from 'prop-types';

/**
 * ProgressIndicator component for displaying progress in various formats
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const ProgressIndicator = ({
  value = 0,
  max = 100,
  variant = 'linear',
  size = 'md',
  color = 'primary',
  label,
  showPercentage = false,
  thickness,
  className = '',
  animated = false,
  indeterminate = false,
  labelPosition = 'right',
}) => {
  // Calculate percentage
  const percentage = Math.round((value / max) * 100);
  
  // Generate color classes for the progress bar
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-status-live',
    danger: 'bg-status-copywriting',
    warning: 'bg-status-campaign',
    info: 'bg-info',
    gray: 'bg-text-secondary',
  };
  
  // Generate track color classes
  const trackColorClasses = {
    primary: 'bg-primary-light',
    secondary: 'bg-secondary-light',
    success: 'bg-status-live bg-opacity-20',
    danger: 'bg-status-copywriting bg-opacity-20',
    warning: 'bg-status-campaign bg-opacity-20',
    info: 'bg-info bg-opacity-20',
    gray: 'bg-background-hover',
  };
  
  // Size classes for linear variant
  const linearSizeClasses = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  };
  
  // Sizes for circular variant (viewBox will be consistent)
  const circularSizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };
  
  // Default thicknesses for circular variant
  const defaultThickness = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
  };
  
  // Label position classes
  const labelPositionClasses = {
    right: 'flex-row items-center',
    top: 'flex-col',
    bottom: 'flex-col-reverse',
    left: 'flex-row-reverse items-center',
  };
  
  // Use provided thickness or default based on size
  const strokeWidth = thickness || defaultThickness[size] || 4;
  
  // Animation classes
  const animationClass = animated && !indeterminate ? 'transition-all duration-500 ease-in-out' : '';
  
  // Indeterminate animation classes
  const indeterminateClass = indeterminate ? 'animate-pulse' : '';
  
  // Render linear progress bar
  if (variant === 'linear') {
    return (
      <div className={`flex ${labelPositionClasses[labelPosition] || 'flex-row items-center'} gap-2 ${className}`}>
        {/* Label */}
        {label && (
          <div className="text-sm font-medium text-text-primary">{label}</div>
        )}
        
        <div className="relative flex-grow">
          {/* Track */}
          <div 
            className={`w-full rounded-full overflow-hidden ${linearSizeClasses[size] || linearSizeClasses.md} ${trackColorClasses[color] || trackColorClasses.primary}`}
          >
            {/* Progress */}
            {!indeterminate ? (
              <div 
                className={`rounded-full ${linearSizeClasses[size] || linearSizeClasses.md} ${colorClasses[color] || colorClasses.primary} ${animationClass}`}
                style={{ width: `${percentage}%` }}
              ></div>
            ) : (
              <div 
                className={`rounded-full ${linearSizeClasses[size] || linearSizeClasses.md} ${colorClasses[color] || colorClasses.primary} animate-indeterminate`}
                style={{ width: '30%' }}
              ></div>
            )}
          </div>
        </div>
        
        {/* Percentage */}
        {showPercentage && !indeterminate && (
          <div className="text-sm font-medium text-text-primary min-w-[2.5rem] text-right">
            {percentage}%
          </div>
        )}
      </div>
    );
  }
  
  // Render circular progress
  if (variant === 'circular') {
    const radius = 50 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = indeterminate 
      ? 0 
      : circumference - (percentage / 100) * circumference;
    
    return (
      <div className={`flex ${labelPositionClasses[labelPosition] || 'flex-row items-center'} gap-2 ${className}`}>
        {/* SVG for circular progress */}
        <div className={`relative ${circularSizes[size] || circularSizes.md}`}>
          <svg 
            className={`${indeterminateClass}`}
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              className={`${trackColorClasses[color] || trackColorClasses.primary}`}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
            />
            
            {/* Progress circle */}
            <circle
              className={`${colorClasses[color] || colorClasses.primary} ${animationClass} ${indeterminate ? 'animate-spin-slow' : ''}`}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          
          {/* Percentage in the middle for circular variant */}
          {showPercentage && !indeterminate && size !== 'xs' && (
            <div className="absolute inset-0 flex items-center justify-center text-text-primary font-medium">
              <span className={size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : size === 'xl' ? 'text-xl' : 'text-sm'}>
                {percentage}%
              </span>
            </div>
          )}
        </div>
        
        {/* Label */}
        {label && (
          <div className="text-sm font-medium text-text-primary">{label}</div>
        )}
      </div>
    );
  }
  
  return null;
};

ProgressIndicator.propTypes = {
  /** Current value */
  value: PropTypes.number,
  /** Maximum value */
  max: PropTypes.number,
  /** Visual style variant */
  variant: PropTypes.oneOf(['linear', 'circular']),
  /** Size of the progress indicator */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Color theme */
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'gray']),
  /** Optional label */
  label: PropTypes.node,
  /** Whether to show percentage */
  showPercentage: PropTypes.bool,
  /** Stroke thickness (for circular variant) */
  thickness: PropTypes.number,
  /** Additional classes */
  className: PropTypes.string,
  /** Whether to animate progress changes */
  animated: PropTypes.bool,
  /** Whether the progress is indeterminate */
  indeterminate: PropTypes.bool,
  /** Position of the label relative to the progress bar */
  labelPosition: PropTypes.oneOf(['right', 'top', 'bottom', 'left']),
};

export default ProgressIndicator;
