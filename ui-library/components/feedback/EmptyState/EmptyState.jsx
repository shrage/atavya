import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../core/form-controls/Button';

/**
 * EmptyState component for displaying visually pleasing empty states
 * with customizable illustrations, messages, and actions
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * Leverages the Button component for actions to maintain UI consistency.
 */
const EmptyState = ({
  title,
  description,
  icon,
  illustration,
  action,
  secondaryAction,
  size = 'md',
  variant = 'default',
  className = '',
}) => {
  // Size classes
  const sizeClasses = {
    sm: {
      container: 'p-4',
      illustration: 'w-16 h-16',
      icon: 'w-8 h-8',
      title: 'text-sm',
      description: 'text-xs',
    },
    md: {
      container: 'p-6',
      illustration: 'w-24 h-24',
      icon: 'w-12 h-12',
      title: 'text-base',
      description: 'text-sm',
    },
    lg: {
      container: 'p-8',
      illustration: 'w-32 h-32',
      icon: 'w-16 h-16',
      title: 'text-lg',
      description: 'text-base',
    },
  };

  // Variant classes
  const variantClasses = {
    default: 'bg-white border-border-light text-text-primary',
    subtle: 'bg-background-offwhite border-border-light text-text-primary',
    notice: 'bg-status-info bg-opacity-10 border-status-info border-opacity-20 text-status-info',
    warning: 'bg-status-warning bg-opacity-10 border-status-warning border-opacity-20 text-status-warning',
    success: 'bg-status-success bg-opacity-10 border-status-success border-opacity-20 text-status-success',
    danger: 'bg-status-live bg-opacity-10 border-status-live border-opacity-20 text-status-live',
  };

  // Current size and variant
  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentVariant = variantClasses[variant] || variantClasses.default;

  // Default icon if none provided
  const defaultIcon = (
    <svg 
      className={`${currentSize.icon} text-text-secondary`} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
      />
    </svg>
  );

  // Render primary action button
  const renderAction = () => {
    if (!action) return null;
    
    if (React.isValidElement(action)) {
      return action;
    }
    
    if (typeof action === 'object') {
      const { label, onClick, variant: actionVariant = 'primary', ...rest } = action;
      
      return (
        <Button
          variant={actionVariant}
          onClick={onClick}
          {...rest}
        >
          {label}
        </Button>
      );
    }
    
    return null;
  };
  
  // Render secondary action button
  const renderSecondaryAction = () => {
    if (!secondaryAction) return null;
    
    if (React.isValidElement(secondaryAction)) {
      return secondaryAction;
    }
    
    if (typeof secondaryAction === 'object') {
      const { label, onClick, variant: actionVariant = 'secondary', ...rest } = secondaryAction;
      
      return (
        <Button
          variant={actionVariant}
          onClick={onClick}
          {...rest}
        >
          {label}
        </Button>
      );
    }
    
    return null;
  };

  return (
    <div 
      className={`
        border rounded-lg text-center
        ${currentSize.container}
        ${currentVariant}
        ${className}
      `}
    >
      {/* Illustration or icon */}
      {illustration ? (
        <div className="mx-auto mb-4">
          {typeof illustration === 'string' ? (
            <img 
              src={illustration} 
              alt={title || 'Empty state illustration'} 
              className={currentSize.illustration}
            />
          ) : (
            illustration
          )}
        </div>
      ) : icon ? (
        <div className="mx-auto mb-4 text-text-secondary">
          {icon}
        </div>
      ) : (
        <div className="mx-auto mb-4 text-text-secondary">
          {defaultIcon}
        </div>
      )}
      
      {/* Title */}
      {title && (
        <h3 className={`font-medium ${currentSize.title}`}>
          {title}
        </h3>
      )}
      
      {/* Description */}
      {description && (
        <p className={`mt-1 text-text-secondary ${currentSize.description}`}>
          {description}
        </p>
      )}
      
      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="mt-4 space-x-2">
          {renderAction()}
          {renderSecondaryAction()}
        </div>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  /** Main headline */
  title: PropTypes.node,
  /** Supporting text */
  description: PropTypes.node,
  /** Custom icon element */
  icon: PropTypes.node,
  /** Illustration (string URL or element) */
  illustration: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Primary action (button element or object with props) */
  action: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func,
      variant: PropTypes.string,
    }),
  ]),
  /** Secondary action (button element or object with props) */
  secondaryAction: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func,
      variant: PropTypes.string,
    }),
  ]),
  /** Size of the empty state */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Visual style variant */
  variant: PropTypes.oneOf(['default', 'subtle', 'notice', 'warning', 'success', 'danger']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default EmptyState;
