import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Divider component
 * 
 * A visual separator that can be used to divide content sections.
 * Uses Tailwind theme colors for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <Divider />
 * <Divider orientation="vertical" />
 * <Divider label="Section" />
 * ```
 */
const Divider = ({
  orientation = 'horizontal',
  variant = 'solid',
  color = 'border-light',
  thickness = 'thin',
  spacing = 'md',
  label,
  labelPosition = 'center',
  className,
  ...props
}) => {
  // Thickness variants
  const thicknessClasses = {
    thin: orientation === 'horizontal' ? 'border-t' : 'border-l',
    medium: orientation === 'horizontal' ? 'border-t-2' : 'border-l-2',
    thick: orientation === 'horizontal' ? 'border-t-4' : 'border-l-4'
  };
  
  // Color variants
  const colorClasses = {
    'border-light': 'border-border-light',
    'border-medium': 'border-border-medium',
    'border-dark': 'border-border-dark',
    'primary': 'border-primary',
    'secondary': 'border-secondary',
    'success': 'border-status-success',
    'warning': 'border-status-warning',
    'danger': 'border-status-live',
    'info': 'border-status-info'
  };
  
  // Spacing variants
  const spacingClasses = {
    none: orientation === 'horizontal' ? 'my-0' : 'mx-0',
    xs: orientation === 'horizontal' ? 'my-1' : 'mx-1',
    sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    xl: orientation === 'horizontal' ? 'my-8' : 'mx-8'
  };
  
  // Variant styles
  const variantClasses = {
    solid: '',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  };
  
  // Label position
  const labelPositionClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end'
  };
  
  // For horizontal divider with label
  if (orientation === 'horizontal' && label) {
    return (
      <div 
        className={twMerge(
          'flex items-center',
          spacingClasses[spacing],
          labelPositionClasses[labelPosition],
          className
        )}
        {...props}
      >
        <div 
          className={twMerge(
            'flex-grow',
            thicknessClasses[thickness],
            colorClasses[color],
            variantClasses[variant]
          )}
        />
        <span 
          className={twMerge(
            'px-3 text-sm font-medium text-text-secondary',
            labelPosition === 'start' ? 'pl-0' : '',
            labelPosition === 'end' ? 'pr-0' : ''
          )}
        >
          {label}
        </span>
        <div 
          className={twMerge(
            'flex-grow',
            thicknessClasses[thickness],
            colorClasses[color],
            variantClasses[variant]
          )}
        />
      </div>
    );
  }
  
  // For horizontal divider without label
  if (orientation === 'horizontal') {
    return (
      <hr 
        className={twMerge(
          thicknessClasses[thickness],
          colorClasses[color],
          spacingClasses[spacing],
          variantClasses[variant],
          'w-full border-0',
          className
        )}
        {...props}
      />
    );
  }
  
  // For vertical divider
  return (
    <div 
      className={twMerge(
        'inline-block h-full self-stretch',
        thicknessClasses[thickness],
        colorClasses[color],
        spacingClasses[spacing],
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
};

Divider.propTypes = {
  /** Orientation of the divider */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Visual style of the divider */
  variant: PropTypes.oneOf(['solid', 'dashed', 'dotted']),
  /** Color of the divider */
  color: PropTypes.oneOf([
    'border-light', 'border-medium', 'border-dark',
    'primary', 'secondary', 'success', 'warning', 'danger', 'info'
  ]),
  /** Thickness of the divider */
  thickness: PropTypes.oneOf(['thin', 'medium', 'thick']),
  /** Spacing around the divider */
  spacing: PropTypes.oneOf(['none', 'xs', 'sm', 'md', 'lg', 'xl']),
  /** Optional label for horizontal dividers */
  label: PropTypes.node,
  /** Position of the label */
  labelPosition: PropTypes.oneOf(['start', 'center', 'end']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Divider;
