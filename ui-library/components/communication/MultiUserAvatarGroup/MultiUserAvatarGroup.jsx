import React from 'react';
import PropTypes from 'prop-types';

/**
 * MultiUserAvatarGroup component for displaying a compact group of user avatars
 */
const MultiUserAvatarGroup = ({
  users = [],
  maxVisible = 3,
  size = 'md',
  overlap = 0.4,
  showExtraCount = true,
  avatarClassName = '',
  className = '',
  onClick,
  onUserClick,
}) => {
  // Determine visible users and count of hidden users
  const visibleUsers = users.slice(0, maxVisible);
  const hiddenCount = Math.max(0, users.length - maxVisible);
  
  // Size mappings
  const sizeMap = {
    xs: {
      size: 'w-6 h-6',
      text: 'text-[10px]',
      extraCount: 'text-[8px]',
    },
    sm: {
      size: 'w-8 h-8',
      text: 'text-xs',
      extraCount: 'text-[10px]',
    },
    md: {
      size: 'w-10 h-10',
      text: 'text-sm',
      extraCount: 'text-xs',
    },
    lg: {
      size: 'w-12 h-12',
      text: 'text-base',
      extraCount: 'text-sm',
    },
    xl: {
      size: 'w-16 h-16',
      text: 'text-lg',
      extraCount: 'text-base',
    },
  };
  
  const currentSize = sizeMap[size] || sizeMap.md;
  
  // Calculate negative margin for overlap
  const overlapValue = overlap * -1;
  const overlapStyle = {
    marginLeft: `${overlapValue}rem`,
  };
  
  return (
    <div 
      className={`flex items-center ${className}`}
      onClick={onClick}
    >
      {visibleUsers.map((user, index) => (
        <div 
          key={user.id}
          className={`
            relative flex-shrink-0 inline-block
            ring-2 ring-white dark:ring-gray-800
            ${index !== 0 ? '' : ''}
          `}
          style={index !== 0 ? overlapStyle : {}}
          onClick={onUserClick ? (e) => {
            e.stopPropagation();
            onUserClick(user);
          } : undefined}
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || `User ${index + 1}`}
              className={`
                ${currentSize.size}
                rounded-full object-cover
                ${user.status ? 'border-2' : ''}
                ${user.status === 'online' ? 'border-green-500' : ''}
                ${user.status === 'away' ? 'border-yellow-500' : ''}
                ${user.status === 'busy' ? 'border-red-500' : ''}
                ${onUserClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}
                ${avatarClassName}
              `}
            />
          ) : (
            <div
              className={`
                ${currentSize.size}
                rounded-full bg-gray-300 dark:bg-gray-600
                flex items-center justify-center
                text-gray-700 dark:text-gray-300 font-medium
                ${currentSize.text}
                ${user.status ? 'border-2' : ''}
                ${user.status === 'online' ? 'border-green-500' : ''}
                ${user.status === 'away' ? 'border-yellow-500' : ''}
                ${user.status === 'busy' ? 'border-red-500' : ''}
                ${onUserClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}
                ${avatarClassName}
              `}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : `U${index + 1}`}
            </div>
          )}
          
          {user.status && (
            <span 
              className={`
                absolute bottom-0 right-0
                w-2.5 h-2.5 rounded-full
                ${user.status === 'online' ? 'bg-green-500' : ''}
                ${user.status === 'away' ? 'bg-yellow-500' : ''}
                ${user.status === 'busy' ? 'bg-red-500' : ''}
                ring-2 ring-white dark:ring-gray-800
              `}
            ></span>
          )}
        </div>
      ))}
      
      {/* Show count of hidden users */}
      {hiddenCount > 0 && showExtraCount && (
        <div
          className={`
            ${currentSize.size}
            flex-shrink-0 inline-flex items-center justify-center
            rounded-full bg-gray-200 dark:bg-gray-700
            text-gray-600 dark:text-gray-300 font-medium
            ${currentSize.extraCount}
            ring-2 ring-white dark:ring-gray-800
          `}
          style={overlapStyle}
        >
          +{hiddenCount}
        </div>
      )}
    </div>
  );
};

MultiUserAvatarGroup.propTypes = {
  /** Array of user objects to display */
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      avatar: PropTypes.string,
      status: PropTypes.oneOf(['online', 'away', 'busy', '']),
    })
  ).isRequired,
  /** Maximum number of avatars to show before using the +X indicator */
  maxVisible: PropTypes.number,
  /** Size of the avatars */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Amount of overlap between avatars (0-1) */
  overlap: PropTypes.number,
  /** Whether to show the count of additional users */
  showExtraCount: PropTypes.bool,
  /** Additional classes for the avatars */
  avatarClassName: PropTypes.string,
  /** Additional classes for the container */
  className: PropTypes.string,
  /** Click handler for the entire group */
  onClick: PropTypes.func,
  /** Click handler for individual users */
  onUserClick: PropTypes.func,
};

export default MultiUserAvatarGroup;
