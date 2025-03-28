import React from 'react';
import PropTypes from 'prop-types';

/**
 * Avatar component for displaying user or entity avatars
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const Avatar = ({
  src,
  name,
  size = 'md',
  variant = 'circle',
  status,
  statusPosition = 'bottom-right',
  badge,
  badgePosition = 'top-right',
  className = '',
  onClick,
  showBorder = false,
  borderColor = 'white',
}) => {
  // Size classes mapping
  const sizeClasses = {
    xs: {
      container: 'w-6 h-6',
      font: 'text-[10px]',
      status: 'w-1.5 h-1.5',
    },
    sm: {
      container: 'w-8 h-8',
      font: 'text-xs',
      status: 'w-2 h-2',
    },
    md: {
      container: 'w-10 h-10',
      font: 'text-sm',
      status: 'w-2.5 h-2.5',
    },
    lg: {
      container: 'w-12 h-12',
      font: 'text-base',
      status: 'w-3 h-3',
    },
    xl: {
      container: 'w-16 h-16',
      font: 'text-lg',
      status: 'w-3.5 h-3.5',
    },
    '2xl': {
      container: 'w-20 h-20',
      font: 'text-xl',
      status: 'w-4 h-4',
    },
  };
  
  // Status indicator colors
  const statusClasses = {
    online: 'bg-status-live',
    away: 'bg-status-campaign',
    busy: 'bg-status-copywriting',
    offline: 'bg-text-disabled',
  };
  
  // Status position classes
  const statusPositionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
  };
  
  // Badge position classes
  const badgePositionClasses = {
    'top-right': '-top-1 -right-1',
    'top-left': '-top-1 -left-1',
    'bottom-right': '-bottom-1 -right-1',
    'bottom-left': '-bottom-1 -left-1',
  };
  
  // Shape variant
  const variantClasses = {
    circle: 'rounded-full',
    square: 'rounded-md',
    rounded: 'rounded-lg',
  };
  
  // Get the correct size classes
  const currentSize = sizeClasses[size] || sizeClasses.md;
  
  // Get shape class
  const variantClass = variantClasses[variant] || variantClasses.circle;
  
  // Handle border
  const borderClass = showBorder 
    ? `ring-2 ring-${borderColor} dark:ring-${borderColor === 'white' ? 'surface-dark' : borderColor}` 
    : '';
  
  // Interactive state
  const interactiveClass = onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : '';
  
  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return '';
    
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };
  
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Avatar */}
      <div 
        className={`
          ${currentSize.container}
          ${variantClass}
          ${borderClass}
          ${interactiveClass}
          overflow-hidden
          flex items-center justify-center
          bg-background-offwhite dark:bg-surface-dark
          text-text-primary dark:text-text-primary-dark
        `}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {src ? (
          <img 
            src={src} 
            alt={name || 'Avatar'} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className={`font-medium ${currentSize.font}`}>
            {name ? getInitials(name) : '?'}
          </span>
        )}
      </div>
      
      {/* Status indicator */}
      {status && (
        <span 
          className={`
            absolute ${statusPositionClasses[statusPosition] || statusPositionClasses['bottom-right']}
            ${currentSize.status}
            ${statusClasses[status] || statusClasses.offline}
            ${variantClass}
            ring-1 ring-white dark:ring-surface-dark
          `}
        ></span>
      )}
      
      {/* Badge */}
      {badge && (
        <div 
          className={`
            absolute ${badgePositionClasses[badgePosition] || badgePositionClasses['top-right']}
            flex items-center justify-center
            ${typeof badge === 'string' ? 'bg-primary text-white text-xs rounded-full min-w-[1.25rem] h-5 px-1' : ''}
          `}
        >
          {badge}
        </div>
      )}
    </div>
  );
};

Avatar.propTypes = {
  /** Image source URL */
  src: PropTypes.string,
  /** User's name (used for initials) */
  name: PropTypes.string,
  /** Avatar size */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  /** Avatar shape variant */
  variant: PropTypes.oneOf(['circle', 'square', 'rounded']),
  /** User status */
  status: PropTypes.oneOf(['online', 'away', 'busy', 'offline']),
  /** Position of the status indicator */
  statusPosition: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
  /** Badge content (string or node) */
  badge: PropTypes.node,
  /** Position of the badge */
  badgePosition: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Click handler */
  onClick: PropTypes.func,
  /** Whether to show a border around the avatar */
  showBorder: PropTypes.bool,
  /** Border color */
  borderColor: PropTypes.string,
};

export default Avatar;
