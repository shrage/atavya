import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * StatusBadge component for displaying status indicators following the Atavya design system
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const StatusBadge = ({
  label,
  status = 'default',
  size = 'md',
  icon,
  className = '',
  rounded = 'md',
  onClick,
}) => {
  // Map status to a set of TailwindCSS classes based on Atavya style guide
  const statusClasses = {
    default: 'bg-gray-100 text-gray-800',
    research: 'bg-status-research/15 text-status-research',
    campaign: 'bg-status-campaign/15 text-status-campaign',
    copywriting: 'bg-status-copywriting/15 text-status-copywriting',
    live: 'bg-status-live/15 text-status-live',
    management: 'bg-status-management/15 text-status-management',
    request: 'bg-status-request/15 text-status-request',
  };

  // Map size to sizing classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-3 py-0.5',
    lg: 'text-sm px-4 py-1',
  };

  // Map rounded styles
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-md',
    full: 'rounded-full',
  };

  // Determine if the badge should be interactive
  const interactiveClasses = onClick 
    ? 'cursor-pointer hover:bg-opacity-25 transition-colors duration-150' 
    : '';

  const badgeClasses = twMerge(
    'inline-flex items-center justify-center font-medium',
    sizeClasses[size] || sizeClasses.md,
    roundedClasses[rounded] || roundedClasses.md,
    statusClasses[status] || statusClasses.default,
    interactiveClasses,
    className
  );

  return (
    <span
      className={badgeClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && (
        <span className="mr-1 flex-shrink-0">{icon}</span>
      )}
      {label}
    </span>
  );
};

StatusBadge.propTypes = {
  /** Text to display in the badge */
  label: PropTypes.string.isRequired,
  /** Predefined status affecting color scheme */
  status: PropTypes.oneOf([
    'default', 'research', 'campaign', 'copywriting', 
    'live', 'management', 'request'
  ]),
  /** Size variant */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Optional icon to display before the label */
  icon: PropTypes.node,
  /** Additional classes to apply */
  className: PropTypes.string,
  /** Border radius style */
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'full']),
  /** Optional click handler for interactive badges */
  onClick: PropTypes.func,
};

export default StatusBadge;
