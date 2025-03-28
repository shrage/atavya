import React from 'react';
import PropTypes from 'prop-types';

/**
 * MenuItem component for use with Menu following the Atavya design system
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const MenuItem = ({
  children,
  icon,
  rightIcon,
  onClick,
  disabled = false,
  selected = false,
  destructive = false,
  className = '',
  ...rest
}) => {
  // Define style classes based on state
  const baseClasses = `
    flex items-center w-full px-4 py-2 text-sm
    focus:outline-none focus:bg-background-hover dark:focus:bg-surface-hover-dark
    transition-colors duration-150
  `;
  
  const stateClasses = {
    default: 'text-text-primary dark:text-text-primary-dark hover:bg-background-hover dark:hover:bg-surface-hover-dark',
    selected: 'bg-primary-light dark:bg-primary-dark/30 text-primary dark:text-primary-light',
    disabled: 'text-text-disabled dark:text-text-disabled-dark cursor-not-allowed',
    destructive: 'text-status-live dark:text-status-live-dark hover:bg-status-live/10 dark:hover:bg-status-live-dark/30',
  };
  
  // Determine which state class to use
  let stateClass = stateClasses.default;
  if (disabled) {
    stateClass = stateClasses.disabled;
  } else if (destructive) {
    stateClass = stateClasses.destructive;
  } else if (selected) {
    stateClass = stateClasses.selected;
  }
  
  // Handle click
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };
  
  return (
    <button
      type="button"
      className={`${baseClasses} ${stateClass} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      role="menuitem"
      {...rest}
    >
      {/* Left icon */}
      {icon && (
        <span className="inline-flex mr-2 text-text-secondary dark:text-text-secondary-dark">
          {icon}
        </span>
      )}
      
      {/* Content */}
      <span className="flex-grow text-left">{children}</span>
      
      {/* Right icon */}
      {rightIcon && (
        <span className="inline-flex ml-2 text-text-secondary dark:text-text-secondary-dark">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

// Set display name for Menu component to identify
MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {
  /** Menu item content */
  children: PropTypes.node.isRequired,
  /** Icon displayed before text */
  icon: PropTypes.node,
  /** Icon displayed after text */
  rightIcon: PropTypes.node,
  /** Click handler */
  onClick: PropTypes.func,
  /** Whether the item is disabled */
  disabled: PropTypes.bool,
  /** Whether the item is selected */
  selected: PropTypes.bool,
  /** Whether the action is destructive (red styling) */
  destructive: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default MenuItem;
