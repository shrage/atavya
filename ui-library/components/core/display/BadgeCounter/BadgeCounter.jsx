import React from 'react';
import PropTypes from 'prop-types';

/**
 * BadgeCounter component for displaying numerical indicators
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const BadgeCounter = ({
  count,
  max = 99,
  color = 'primary',
  size = 'md',
  className = '',
  showZero = false,
  showEmpty = false,
  outline = false,
  onClick,
  overlayPosition,
}) => {
  // If count is 0 and we shouldn't show it, return null
  if (count === 0 && !showZero && !showEmpty) return null;
  
  // Format count to handle maximum value display
  const formattedCount = count > max ? `${max}+` : count.toString();
  
  // Show empty state if configured
  const displayText = count === 0 && showEmpty ? '' : formattedCount;
  
  // Color styles
  const colorStyles = {
    primary: outline 
      ? 'bg-white text-primary border border-primary' 
      : 'bg-primary text-white',
    secondary: outline 
      ? 'bg-white text-secondary border border-secondary' 
      : 'bg-secondary text-white',
    success: outline 
      ? 'bg-white text-status-live border border-status-live' 
      : 'bg-status-live text-white',
    danger: outline 
      ? 'bg-white text-status-copywriting border border-status-copywriting' 
      : 'bg-status-copywriting text-white',
    warning: outline 
      ? 'bg-white text-status-campaign border border-status-campaign' 
      : 'bg-status-campaign text-white',
    info: outline 
      ? 'bg-white text-info border border-info' 
      : 'bg-info text-white',
    gray: outline 
      ? 'bg-white text-text-secondary border border-text-secondary' 
      : 'bg-text-secondary text-white',
  };
  
  // Size styles 
  const sizeStyles = {
    xs: 'min-w-[16px] h-4 text-[10px] px-1',
    sm: 'min-w-[20px] h-5 text-xs px-1',
    md: 'min-w-[24px] h-6 text-xs px-1.5',
    lg: 'min-w-[28px] h-7 text-sm px-2',
  };
  
  // Overlay position styles
  const positionStyles = overlayPosition ? {
    'top-right': 'absolute -top-2 -right-2',
    'top-left': 'absolute -top-2 -left-2',
    'bottom-right': 'absolute -bottom-2 -right-2',
    'bottom-left': 'absolute -bottom-2 -left-2',
  }[overlayPosition] : '';
  
  // Click handler styling
  const clickableStyles = onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : '';
  
  return (
    <span
      className={`
        ${sizeStyles[size] || sizeStyles.md}
        ${colorStyles[color] || colorStyles.primary}
        ${positionStyles}
        ${clickableStyles}
        ${className}
        inline-flex items-center justify-center rounded-full font-medium
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {displayText}
    </span>
  );
};

BadgeCounter.propTypes = {
  /** The number to display in the badge */
  count: PropTypes.number.isRequired,
  /** Maximum value to display before showing "max+" */
  max: PropTypes.number,
  /** Color variant */
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'gray']),
  /** Size variant */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  /** Additional classes */
  className: PropTypes.string,
  /** Whether to show the badge when count is 0 */
  showZero: PropTypes.bool,
  /** Whether to show an empty badge (with no number) when count is 0 */
  showEmpty: PropTypes.bool,
  /** Whether to use outlined style */
  outline: PropTypes.bool,
  /** Optional click handler */
  onClick: PropTypes.func,
  /** Position if used as an overlay badge */
  overlayPosition: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
};

export default BadgeCounter;
