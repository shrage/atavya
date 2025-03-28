import React from 'react';
import PropTypes from 'prop-types';

/**
 * Spinner component for indicating loading states
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const Spinner = ({
  size = 'md',
  color = 'primary',
  thickness = 'regular',
  overlay = false,
  fullPage = false,
  label,
  labelPosition = 'bottom',
  className = '',
}) => {
  // Size classes
  const sizeClasses = {
    xs: {
      spinner: 'w-3 h-3',
      label: 'text-xs',
      labelGap: 'gap-1',
    },
    sm: {
      spinner: 'w-4 h-4',
      label: 'text-xs',
      labelGap: 'gap-1.5',
    },
    md: {
      spinner: 'w-6 h-6',
      label: 'text-sm',
      labelGap: 'gap-2',
    },
    lg: {
      spinner: 'w-8 h-8',
      label: 'text-base',
      labelGap: 'gap-2',
    },
    xl: {
      spinner: 'w-12 h-12',
      label: 'text-lg',
      labelGap: 'gap-3',
    },
    '2xl': {
      spinner: 'w-16 h-16',
      label: 'text-xl',
      labelGap: 'gap-3',
    },
  };
  
  // Color classes
  const colorClasses = {
    primary: 'text-primary dark:text-primary-light',
    secondary: 'text-secondary dark:text-secondary-light',
    success: 'text-status-live dark:text-status-live',
    danger: 'text-status-copywriting dark:text-status-copywriting',
    warning: 'text-status-campaign dark:text-status-campaign',
    info: 'text-info dark:text-info',
    light: 'text-background-hover dark:text-background-skeleton',
    white: 'text-white',
  };
  
  // Thickness classes
  const thicknessClasses = {
    thin: 'border-[1.5px]',
    regular: 'border-2',
    thick: 'border-[3px]',
    extraThick: 'border-4',
  };
  
  // Label position classes
  const labelPositionClasses = {
    top: 'flex-col-reverse',
    right: 'flex-row',
    bottom: 'flex-col',
    left: 'flex-row-reverse',
  };
  
  // Get the appropriate size classes
  const currentSize = sizeClasses[size] || sizeClasses.md;
  
  // Get the appropriate color class
  const colorClass = colorClasses[color] || colorClasses.primary;
  
  // Get the appropriate thickness class
  const thicknessClass = thicknessClasses[thickness] || thicknessClasses.regular;
  
  // Build the spinner element
  const spinnerElement = (
    <div 
      className={`
        inline-block
        ${currentSize.spinner}
        rounded-full
        ${colorClass}
        ${thicknessClass}
        border-t-transparent
        border-solid
        animate-spin
      `}
      role="status"
      aria-label={label || "Loading"}
    />
  );
  
  // If no label, just return the spinner
  if (!label) {
    // If overlay/fullPage, wrap with appropriate container
    if (overlay || fullPage) {
      return (
        <div 
          className={`
            ${fullPage ? 'fixed inset-0 z-50' : overlay ? 'absolute inset-0 z-10' : ''}
            flex items-center justify-center
            ${fullPage || overlay ? 'bg-background-offwhite/80 dark:bg-background-dark/80' : ''}
            ${className}
          `}
        >
          {spinnerElement}
        </div>
      );
    }
    
    // Return simple spinner
    return (
      <div className={className}>
        {spinnerElement}
      </div>
    );
  }
  
  // If we have a label, create a container with label
  const spinnerWithLabel = (
    <div 
      className={`
        inline-flex items-center justify-center
        ${labelPositionClasses[labelPosition] || labelPositionClasses.bottom}
        ${currentSize.labelGap}
      `}
    >
      {spinnerElement}
      <span className={`${currentSize.label} text-inherit`}>
        {label}
      </span>
    </div>
  );
  
  // If overlay/fullPage, wrap with appropriate container
  if (overlay || fullPage) {
    return (
      <div 
        className={`
          ${fullPage ? 'fixed inset-0 z-50' : overlay ? 'absolute inset-0 z-10' : ''}
          flex items-center justify-center
          ${fullPage || overlay ? 'bg-background-offwhite/80 dark:bg-background-dark/80' : ''}
          ${colorClass}
          ${className}
        `}
      >
        {spinnerWithLabel}
      </div>
    );
  }
  
  // Return spinner with label
  return (
    <div className={`${colorClass} ${className}`}>
      {spinnerWithLabel}
    </div>
  );
};

Spinner.propTypes = {
  /** Size of the spinner */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  /** Color of the spinner */
  color: PropTypes.oneOf([
    'primary', 'secondary', 'success', 'danger', 
    'warning', 'info', 'light', 'white'
  ]),
  /** Border thickness */
  thickness: PropTypes.oneOf(['thin', 'regular', 'thick', 'extraThick']),
  /** Whether to show spinner with overlay */
  overlay: PropTypes.bool,
  /** Whether to show spinner fullscreen */
  fullPage: PropTypes.bool,
  /** Optional label text */
  label: PropTypes.string,
  /** Position of the label */
  labelPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Additional classes */
  className: PropTypes.string,
};

export default Spinner;
