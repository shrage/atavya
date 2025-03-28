import React from 'react';
import PropTypes from 'prop-types';

/**
 * BreadcrumbPath component
 * Displays a breadcrumb navigation trail with clickable items
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const BreadcrumbPath = ({
  items = [],
  separator = '/',
  maxVisible = 0, // 0 means show all
  onItemClick,
  className = ''
}) => {
  // If maxVisible is set, determine which items to show
  const visibleItems = maxVisible > 0 && items.length > maxVisible
    ? [
        ...items.slice(0, Math.max(1, Math.floor(maxVisible / 2))),
        { id: 'ellipsis', label: '...', isEllipsis: true },
        ...items.slice(items.length - Math.floor(maxVisible / 2))
      ]
    : items;

  return (
    <nav className={`flex items-center text-sm ${className}`}>
      <ol className="flex items-center flex-wrap">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          
          return (
            <React.Fragment key={item.id}>
              <li>
                {item.isEllipsis ? (
                  <span className="text-text-secondary mx-1">{item.label}</span>
                ) : (
                  <button
                    className={`
                      px-1 py-0.5 rounded hover:bg-background-hover transition-colors duration-150
                      ${isLast ? 'font-medium text-text-primary' : 'text-text-secondary hover:text-text-hover'}
                      ${item.color ? `text-${item.color}` : ''}
                      ${item.disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                      ${item.className || ''}
                    `}
                    onClick={() => {
                      if (!item.disabled && onItemClick) {
                        onItemClick(item);
                      }
                    }}
                    disabled={item.disabled}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.icon && (
                      <span className="mr-1 inline-flex items-center">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </button>
                )}
              </li>
              
              {!isLast && (
                <li className="mx-1 text-text-disabled select-none">
                  {separator}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

BreadcrumbPath.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      color: PropTypes.string,
      disabled: PropTypes.bool,
      className: PropTypes.string,
      isEllipsis: PropTypes.bool,
    })
  ).isRequired,
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  maxVisible: PropTypes.number,
  onItemClick: PropTypes.func,
  className: PropTypes.string,
};

export default BreadcrumbPath;
