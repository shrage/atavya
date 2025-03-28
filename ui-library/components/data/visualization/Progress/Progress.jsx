import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Progress component
 * Visual indicator showing the completion status of a task or operation
 * 
 * @component
 * @example
 * ```jsx
 * <Progress value={60} />
 * ```
 */
const Progress = ({
  // Progress state
  value,
  min = 0,
  max = 100,
  
  // Display options
  variant = 'bar',
  size = 'md',
  showValue = false,
  valueFormat = 'percentage', // 'percentage', 'value', 'fraction', 'custom'
  formatValue,
  label,
  indeterminate = false,
  striped = false,
  animated = false,
  steps,
  completedSteps,
  
  // Color and styling
  color = 'primary',
  trackColor = 'gray',
  valueColor,
  thickness,
  rounded = true,
  className,
  trackClassName,
  valueClassName,
  labelClassName,
}) => {
  // Calculate percentage based on value, min, and max
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  
  // Format the displayed value
  const getFormattedValue = () => {
    if (indeterminate) return '';
    
    if (formatValue) {
      return formatValue(value, min, max);
    }
    
    switch (valueFormat) {
      case 'percentage':
        return `${Math.round(percentage)}%`;
      case 'value':
        return `${value}`;
      case 'fraction':
        return `${value}/${max}`;
      default:
        return `${Math.round(percentage)}%`;
    }
  };
  
  // Get color classes based on the color prop
  const getColorClasses = (colorType) => {
    const colorMap = {
      primary: {
        track: 'bg-blue-100',
        value: 'bg-blue-500',
        text: 'text-blue-700',
      },
      secondary: {
        track: 'bg-gray-100',
        value: 'bg-gray-500',
        text: 'text-gray-700',
      },
      success: {
        track: 'bg-green-100',
        value: 'bg-green-500',
        text: 'text-green-700',
      },
      danger: {
        track: 'bg-red-100',
        value: 'bg-red-500',
        text: 'text-red-700',
      },
      warning: {
        track: 'bg-yellow-100',
        value: 'bg-yellow-500',
        text: 'text-yellow-700',
      },
      info: {
        track: 'bg-blue-100',
        value: 'bg-blue-500',
        text: 'text-blue-700',
      },
      light: {
        track: 'bg-gray-100',
        value: 'bg-gray-300',
        text: 'text-gray-700',
      },
      dark: {
        track: 'bg-gray-200',
        value: 'bg-gray-800',
        text: 'text-gray-900',
      },
    };
    
    // Handle custom track color
    if (colorType === 'track' && trackColor && trackColor !== 'gray') {
      return colorMap[trackColor]?.track || 'bg-gray-100';
    }
    
    // Handle custom value color
    if (colorType === 'value' && valueColor) {
      return colorMap[valueColor]?.value || 'bg-blue-500';
    }
    
    return colorMap[color]?.[colorType] || colorMap.primary[colorType];
  };
  
  // Get size-based classes
  const getSizeClasses = () => {
    const sizeMap = {
      xs: {
        bar: 'h-1',
        circle: 'w-16 h-16',
        text: 'text-xs',
      },
      sm: {
        bar: 'h-2',
        circle: 'w-20 h-20',
        text: 'text-sm',
      },
      md: {
        bar: 'h-3',
        circle: 'w-24 h-24',
        text: 'text-base',
      },
      lg: {
        bar: 'h-4',
        circle: 'w-32 h-32',
        text: 'text-lg',
      },
      xl: {
        bar: 'h-5',
        circle: 'w-40 h-40',
        text: 'text-xl',
      },
    };
    
    return {
      container: sizeMap[size]?.[variant === 'circle' ? 'circle' : 'bar'] || sizeMap.md[variant === 'circle' ? 'circle' : 'bar'],
      text: sizeMap[size]?.text || sizeMap.md.text,
    };
  };
  
  // Common classes
  const sizeClasses = getSizeClasses();
  
  // Additional classes for animated or striped progress bars
  const getAnimationClasses = () => {
    if (indeterminate) {
      return 'animate-indeterminate';
    }
    
    if (animated && striped) {
      return 'bg-stripes animate-progress-stripes';
    }
    
    if (striped) {
      return 'bg-stripes';
    }
    
    return '';
  };
  
  // Render linear progress bar
  const renderBar = () => {
    return (
      <div
        className={twMerge(
          'w-full relative',
          sizeClasses.container,
          rounded ? 'rounded-full' : '',
          getColorClasses('track'),
          trackClassName
        )}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={getFormattedValue()}
        aria-label={label || 'Progress'}
      >
        <div
          className={twMerge(
            'absolute left-0 top-0 h-full transition-all duration-300',
            rounded ? 'rounded-full' : '',
            getColorClasses('value'),
            getAnimationClasses(),
            valueClassName
          )}
          style={{
            width: indeterminate ? '50%' : `${percentage}%`,
          }}
        />
        
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={twMerge(
                'text-xs font-medium',
                sizeClasses.text,
                getColorClasses('text')
              )}
            >
              {getFormattedValue()}
            </span>
          </div>
        )}
      </div>
    );
  };
  
  // Render circular progress
  const renderCircle = () => {
    const strokeWidth = thickness || 4;
    const size = 100; // SVG viewBox size
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = indeterminate
      ? 0
      : circumference - (percentage / 100) * circumference;
    
    return (
      <div
        className={twMerge(
          'relative inline-flex items-center justify-center',
          sizeClasses.container
        )}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={getFormattedValue()}
        aria-label={label || 'Progress'}
      >
        <svg
          className={twMerge(
            'w-full h-full',
            indeterminate ? 'animate-spin-slow' : ''
          )}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle */}
          <circle
            className={twMerge(getColorClasses('track'), trackClassName)}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            stroke="currentColor"
          />
          
          {/* Foreground circle */}
          <circle
            className={twMerge(
              getColorClasses('value'),
              indeterminate ? 'opacity-75' : '',
              valueClassName
            )}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        
        {/* Value label in center */}
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={twMerge(
                'font-medium',
                sizeClasses.text,
                getColorClasses('text')
              )}
            >
              {getFormattedValue()}
            </span>
          </div>
        )}
      </div>
    );
  };
  
  // Render steps progress
  const renderSteps = () => {
    const totalSteps = steps || 5;
    const completed = completedSteps || Math.floor((percentage / 100) * totalSteps);
    
    return (
      <div
        className="flex w-full justify-between items-center"
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={getFormattedValue()}
        aria-label={label || 'Progress'}
      >
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isCompleted = index < completed;
          const isCurrent = index === completed && !indeterminate;
          
          return (
            <div key={index} className="flex flex-col items-center">
              {/* Step connector */}
              {index > 0 && (
                <div
                  className={twMerge(
                    'h-1 w-full -mx-3 mb-3',
                    isCompleted
                      ? getColorClasses('value')
                      : getColorClasses('track'),
                    trackClassName
                  )}
                />
              )}
              
              {/* Step indicator */}
              <div
                className={twMerge(
                  'rounded-full transition-all duration-200',
                  isCompleted
                    ? `w-4 h-4 ${getColorClasses('value')}`
                    : isCurrent
                    ? `w-4 h-4 border-2 ${getColorClasses('value')} border-current`
                    : `w-3 h-3 ${getColorClasses('track')}`,
                  valueClassName
                )}
              />
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render progress based on variant
  const renderProgress = () => {
    switch (variant) {
      case 'circle':
        return renderCircle();
      case 'steps':
        return renderSteps();
      case 'bar':
      default:
        return renderBar();
    }
  };
  
  return (
    <div
      className={twMerge(
        'flex flex-col',
        className
      )}
    >
      {label && (
        <label
          className={twMerge(
            'mb-1 text-sm font-medium',
            getColorClasses('text'),
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      
      {renderProgress()}
    </div>
  );
};

Progress.propTypes = {
  /** Current value of the progress */
  value: PropTypes.number,
  
  /** Minimum value */
  min: PropTypes.number,
  
  /** Maximum value */
  max: PropTypes.number,
  
  /** Visual style of the progress component */
  variant: PropTypes.oneOf(['bar', 'circle', 'steps']),
  
  /** Size of the progress component */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  
  /** Whether to show the current value */
  showValue: PropTypes.bool,
  
  /** Format of the displayed value */
  valueFormat: PropTypes.oneOf(['percentage', 'value', 'fraction', 'custom']),
  
  /** Custom formatter for the value */
  formatValue: PropTypes.func,
  
  /** Label text to display above the progress */
  label: PropTypes.node,
  
  /** Whether the progress is in an indeterminate state */
  indeterminate: PropTypes.bool,
  
  /** Whether to apply a striped pattern */
  striped: PropTypes.bool,
  
  /** Whether to animate the stripes */
  animated: PropTypes.bool,
  
  /** Number of steps for the 'steps' variant */
  steps: PropTypes.number,
  
  /** Number of completed steps for the 'steps' variant */
  completedSteps: PropTypes.number,
  
  /** Color theme for the progress */
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ]),
  
  /** Color for the progress track */
  trackColor: PropTypes.string,
  
  /** Color for the progress value */
  valueColor: PropTypes.string,
  
  /** Thickness of the progress bar or circle */
  thickness: PropTypes.number,
  
  /** Whether to round the corners */
  rounded: PropTypes.bool,
  
  /** Additional CSS classes for the container */
  className: PropTypes.string,
  
  /** CSS classes for the track */
  trackClassName: PropTypes.string,
  
  /** CSS classes for the value */
  valueClassName: PropTypes.string,
  
  /** CSS classes for the label */
  labelClassName: PropTypes.string,
};

export default Progress;
