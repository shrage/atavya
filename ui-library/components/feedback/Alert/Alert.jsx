import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Alert component
 * Displays important messages or feedback to users
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <Alert variant="success">Operation completed successfully!</Alert>
 * ```
 */
const Alert = ({
  // Content
  children,
  title,
  
  // Display options
  variant = 'info',
  icon,
  showIcon = true,
  closable = false,
  bordered = false,
  elevated = false,
  
  // Behavior
  autoClose = false,
  autoCloseDelay = 5000,
  onClose,
  
  // Animation
  animated = true,
  
  // Styling
  className,
  titleClassName,
  contentClassName,
  iconClassName,
  closeButtonClassName,
}) => {
  const [visible, setVisible] = useState(true);
  
  // Handle auto-close behavior
  useEffect(() => {
    if (autoClose && visible) {
      const timer = setTimeout(() => {
        closeAlert();
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, visible]);
  
  // Handle alert closing
  const closeAlert = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };
  
  // Get variant-specific styling
  const getVariantClasses = () => {
    const variantStyles = {
      info: {
        base: 'bg-status-info bg-opacity-10 text-status-info',
        icon: 'text-status-info',
        border: 'border-status-info border-opacity-20',
      },
      success: {
        base: 'bg-status-success bg-opacity-10 text-status-success',
        icon: 'text-status-success',
        border: 'border-status-success border-opacity-20',
      },
      warning: {
        base: 'bg-status-warning bg-opacity-10 text-status-warning',
        icon: 'text-status-warning',
        border: 'border-status-warning border-opacity-20',
      },
      danger: {
        base: 'bg-status-live bg-opacity-10 text-status-live',
        icon: 'text-status-live',
        border: 'border-status-live border-opacity-20',
      },
      light: {
        base: 'bg-background-offwhite text-text-primary',
        icon: 'text-text-secondary',
        border: 'border-border-light',
      },
      dark: {
        base: 'bg-text-primary text-white',
        icon: 'text-white text-opacity-80',
        border: 'border-border-dark',
      },
    };
    
    return variantStyles[variant] || variantStyles.info;
  };
  
  // Get default icon based on variant
  const getDefaultIcon = () => {
    switch (variant) {
      case 'info':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'danger':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };
  
  // Combine all classes
  const alertClasses = twMerge(
    'relative rounded-lg p-4',
    getVariantClasses().base,
    bordered && `border ${getVariantClasses().border}`,
    elevated && 'shadow-md',
    animated && 'transition-all duration-300 ease-in-out',
    !visible && 'opacity-0 translate-y-2 pointer-events-none',
    className
  );
  
  const iconWrapperClasses = twMerge(
    'flex-shrink-0',
    getVariantClasses().icon,
    iconClassName
  );
  
  const closeButtonClasses = twMerge(
    'absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none',
    closeButtonClassName
  );
  
  // Don't render if not visible
  if (!visible && !animated) {
    return null;
  }
  
  // Determine the alert's icon to display
  const alertIcon = icon || getDefaultIcon();
  
  return (
    <div
      className={alertClasses}
      role="alert"
    >
      <div className="flex">
        {/* Icon */}
        {showIcon && (
          <div className={iconWrapperClasses}>
            {alertIcon}
          </div>
        )}
        
        {/* Content */}
        <div className={twMerge('ml-3', !showIcon && 'ml-0', contentClassName)}>
          {/* Title */}
          {title && (
            <h3 className={twMerge('text-sm font-medium', titleClassName)}>
              {title}
            </h3>
          )}
          
          {/* Body */}
          <div className={twMerge('text-sm', title && 'mt-2')}>
            {children}
          </div>
        </div>
      </div>
      
      {/* Close button */}
      {closable && (
        <button
          type="button"
          className={closeButtonClasses}
          onClick={closeAlert}
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  /** Alert content */
  children: PropTypes.node.isRequired,
  
  /** Optional title for the alert */
  title: PropTypes.node,
  
  /** Visual style variant */
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'danger', 'light', 'dark']),
  
  /** Custom icon to display */
  icon: PropTypes.node,
  
  /** Whether to show an icon */
  showIcon: PropTypes.bool,
  
  /** Whether the alert can be closed */
  closable: PropTypes.bool,
  
  /** Whether to show a border around the alert */
  bordered: PropTypes.bool,
  
  /** Whether to add elevation (shadow) to the alert */
  elevated: PropTypes.bool,
  
  /** Whether the alert should close automatically */
  autoClose: PropTypes.bool,
  
  /** Delay in milliseconds before auto-closing (if enabled) */
  autoCloseDelay: PropTypes.number,
  
  /** Function called when the alert is closed */
  onClose: PropTypes.func,
  
  /** Whether to animate the alert's appearance/disappearance */
  animated: PropTypes.bool,
  
  /** Additional CSS classes for the alert container */
  className: PropTypes.string,
  
  /** CSS classes for the title */
  titleClassName: PropTypes.string,
  
  /** CSS classes for the content */
  contentClassName: PropTypes.string,
  
  /** CSS classes for the icon */
  iconClassName: PropTypes.string,
  
  /** CSS classes for the close button */
  closeButtonClassName: PropTypes.string,
};

export default Alert;
