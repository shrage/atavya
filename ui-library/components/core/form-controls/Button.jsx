import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Button component following the Atavya design system
 * 
 * A versatile button component with various styles, sizes, and states.
 * This component consolidates functionality from previous Button implementations
 * to provide a consistent interface following the Atavya design system.
 * 
 * @component
 * @example
 * ```jsx
 * <Button variant="primary" size="md" onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 */
const Button = forwardRef(({
  // Content
  children,
  label,
  icon,
  iconPosition = 'start',
  
  // Button type and behavior
  type = 'button',
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  download,
  
  // State
  disabled = false,
  loading = false,
  active = false,
  
  // Display
  fullWidth = false,
  rounded = 'md',
  outlined = false,
  flat = false,
  
  // Extras
  loadingText,
  loadingIcon,
  className,
  
  // Events
  onClick,
  
  // Other props
  ...rest
}, ref) => {
  // Base styles for all buttons
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none';
  
  // Size styles
  const sizeStyles = {
    xs: 'text-xs px-2 py-1',
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-2.5',
    xl: 'text-xl px-6 py-3',
  };
  
  // Rounded corner styles
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-md',
    full: 'rounded-full',
  };
  
  // Determine variant styles based on flat/outlined props
  let variantStyles = {};
  
  if (flat) {
    // Flat style (no background, just text color)
    variantStyles = {
      primary: 'text-primary hover:text-primary-hover focus:ring-2 focus:ring-primary focus:ring-opacity-50',
      secondary: 'text-text-secondary hover:text-text-primary focus:ring-2 focus:ring-border-medium focus:ring-opacity-50',
      success: 'text-status-campaign hover:text-status-campaign focus:ring-2 focus:ring-status-campaign focus:ring-opacity-50',
      danger: 'text-status-live hover:text-status-live focus:ring-2 focus:ring-status-live focus:ring-opacity-50',
      warning: 'text-status-copywriting hover:text-status-copywriting focus:ring-2 focus:ring-status-copywriting focus:ring-opacity-50',
      info: 'text-status-research hover:text-status-research focus:ring-2 focus:ring-status-research focus:ring-opacity-50',
    };
  } else if (outlined) {
    // Outlined style (border, transparent background)
    variantStyles = {
      primary: 'border border-primary text-primary hover:bg-primary-light focus:ring-2 focus:ring-primary focus:ring-opacity-50',
      secondary: 'border border-border-medium text-text-secondary hover:bg-background-hover focus:ring-2 focus:ring-border-medium focus:ring-opacity-50',
      success: 'border border-status-campaign text-status-campaign hover:bg-status-campaign/10 focus:ring-2 focus:ring-status-campaign focus:ring-opacity-50',
      danger: 'border border-status-live text-status-live hover:bg-status-live/10 focus:ring-2 focus:ring-status-live focus:ring-opacity-50',
      warning: 'border border-status-copywriting text-status-copywriting hover:bg-status-copywriting/10 focus:ring-2 focus:ring-status-copywriting focus:ring-opacity-50',
      info: 'border border-status-research text-status-research hover:bg-status-research/10 focus:ring-2 focus:ring-status-research focus:ring-opacity-50',
    };
  } else {
    // Filled style (colored background)
    variantStyles = {
      primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-opacity-50',
      secondary: 'bg-background-hover text-text-secondary hover:bg-border-light focus:ring-2 focus:ring-border-medium focus:ring-opacity-50',
      success: 'bg-status-campaign text-white hover:bg-status-campaign/80 focus:ring-2 focus:ring-status-campaign focus:ring-opacity-50',
      danger: 'bg-status-live text-white hover:bg-status-live/80 focus:ring-2 focus:ring-status-live focus:ring-opacity-50',
      warning: 'bg-status-copywriting text-white hover:bg-status-copywriting/80 focus:ring-2 focus:ring-status-copywriting focus:ring-opacity-50',
      info: 'bg-status-research text-white hover:bg-status-research/80 focus:ring-2 focus:ring-status-research focus:ring-opacity-50',
      tertiary: 'bg-transparent text-text-secondary hover:bg-background-hover focus:ring-2 focus:ring-border-medium focus:ring-opacity-50',
    };
  }
  
  // State styles
  const stateStyles = {
    disabled: 'opacity-60 cursor-not-allowed pointer-events-none',
    loading: 'cursor-wait',
    active: 'shadow-inner',
  };
  
  // Default loading spinner icon if not provided
  const defaultLoadingIcon = (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
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
  );
  
  // Handle click event
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };
  
  // Combine all classes
  const buttonClasses = twMerge(
    baseStyles,
    sizeStyles[size] || sizeStyles.md,
    roundedStyles[rounded] || roundedStyles.md,
    variantStyles[variant] || variantStyles.primary,
    disabled && stateStyles.disabled,
    loading && stateStyles.loading,
    active && stateStyles.active,
    fullWidth && 'w-full',
    className
  );
  
  // Render content with icon and loading state
  const renderContent = () => {
    if (loading) {
      return (
        <>
          {loadingIcon || defaultLoadingIcon}
          {loadingText || children}
        </>
      );
    }
    
    if (icon && iconPosition === 'start') {
      return (
        <>
          <span className="mr-2 flex-shrink-0">{icon}</span>
          <span>{children || label}</span>
        </>
      );
    }
    
    if (icon && iconPosition === 'end') {
      return (
        <>
          <span>{children || label}</span>
          <span className="ml-2 flex-shrink-0">{icon}</span>
        </>
      );
    }
    
    return children || label;
  };
  
  // Render as link if href is provided
  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={buttonClasses}
        onClick={handleClick}
        {...rest}
      >
        {renderContent()}
      </a>
    );
  }
  
  // Render as button
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={buttonClasses}
      onClick={handleClick}
      {...rest}
    >
      {renderContent()}
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  /** Content of the button */
  children: PropTypes.node,
  /** Text label for the button (alternative to children) */
  label: PropTypes.string,
  /** Icon to display in the button */
  icon: PropTypes.node,
  /** Position of the icon */
  iconPosition: PropTypes.oneOf(['start', 'end']),
  /** Button type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Visual style variant */
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info']),
  /** Size variant */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** URL to navigate to when clicked (renders as <a> tag) */
  href: PropTypes.string,
  /** Target attribute for link buttons */
  target: PropTypes.string,
  /** Rel attribute for link buttons */
  rel: PropTypes.string,
  /** Download attribute for link buttons */
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Whether the button is in loading state */
  loading: PropTypes.bool,
  /** Whether the button is in active state */
  active: PropTypes.bool,
  /** Whether the button should take up full width of container */
  fullWidth: PropTypes.bool,
  /** Border radius style */
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'full']),
  /** Whether to use outlined style (border with transparent background) */
  outlined: PropTypes.bool,
  /** Whether to use flat style (no background, just text color) */
  flat: PropTypes.bool,
  /** Text to display when in loading state */
  loadingText: PropTypes.string,
  /** Custom loading indicator */
  loadingIcon: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Click handler */
  onClick: PropTypes.func,
};

export default Button;
