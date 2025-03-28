import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../core/form-controls/Button';

/**
 * ActionButtonBar component for displaying a group of related action buttons
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * Leverages the Button component for actions to maintain UI consistency.
 */
const ActionButtonBar = ({
  actions = [],
  size = 'md',
  variant = 'default',
  spacing = 'md',
  dividers = false,
  orientation = 'horizontal',
  fullWidth = false,
  className = '',
  buttonClassName = '',
}) => {
  // Spacing between buttons
  const spacingClasses = {
    xs: orientation === 'horizontal' ? 'space-x-1' : 'space-y-1',
    sm: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
    md: orientation === 'horizontal' ? 'space-x-3' : 'space-y-3',
    lg: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4',
  };
  
  // Orientation classes
  const orientationClasses = {
    horizontal: 'flex flex-row items-center',
    vertical: 'flex flex-col items-stretch',
  };
  
  // Handle full width for horizontal orientation
  const widthClasses = fullWidth && orientation === 'horizontal' 
    ? 'w-full justify-between' 
    : '';
  
  return (
    <div 
      className={`
        ${orientationClasses[orientation] || orientationClasses.horizontal}
        ${spacingClasses[spacing] || spacingClasses.md}
        ${widthClasses}
        ${className}
      `}
    >
      {actions.map((action, index) => {
        // Skip rendering null or undefined actions
        if (!action) return null;
        
        // Determine if we should show a divider
        const showDivider = dividers && index > 0 && index < actions.length;
        
        // Map the action variant to Button variant
        const buttonVariant = action.variant || variant;
        
        return (
          <React.Fragment key={action.id || index}>
            {/* Optional divider */}
            {showDivider && orientation === 'horizontal' && (
              <div className="h-4 border-l border-border-light"></div>
            )}
            {showDivider && orientation === 'vertical' && (
              <div className="w-full border-t border-border-light"></div>
            )}
            
            <Button
              variant={buttonVariant === 'default' ? 'secondary' : buttonVariant}
              size={size}
              onClick={action.onClick}
              disabled={action.disabled}
              className={`
                ${fullWidth && orientation === 'horizontal' ? 'flex-1' : ''}
                ${buttonClassName}
                ${action.className || ''}
              `}
              title={action.tooltip || action.label}
              leftIcon={action.icon}
            >
              {action.label}
            </Button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

ActionButtonBar.propTypes = {
  /** Array of action objects */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      icon: PropTypes.node,
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      variant: PropTypes.oneOf(['default', 'ghost', 'minimal', 'primary', 'secondary', 'tertiary', 'danger']),
      tooltip: PropTypes.string,
      className: PropTypes.string,
    })
  ),
  /** Size of the buttons */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  /** Default styling variant for all buttons */
  variant: PropTypes.oneOf(['default', 'ghost', 'minimal', 'primary', 'secondary', 'tertiary', 'danger']),
  /** Spacing between buttons */
  spacing: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  /** Whether to show dividers between buttons */
  dividers: PropTypes.bool,
  /** Layout orientation */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Whether buttons should take up full width */
  fullWidth: PropTypes.bool,
  /** Additional CSS classes for the container */
  className: PropTypes.string,
  /** Additional CSS classes for all buttons */
  buttonClassName: PropTypes.string,
};

export default ActionButtonBar;
