import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * BreadcrumbItem component
 * Individual item in a breadcrumb trail
 */
export const BreadcrumbItem = ({
  label,
  href,
  icon,
  isCurrent,
  onClick,
  className,
  children,
}) => {
  return null; // Rendering is handled by the parent Breadcrumb component
};

BreadcrumbItem.propTypes = {
  /** Text to display for this breadcrumb item */
  label: PropTypes.node.isRequired,
  
  /** URL for this breadcrumb item, omit for the current page */
  href: PropTypes.string,
  
  /** Optional icon to display with the breadcrumb item */
  icon: PropTypes.node,
  
  /** Whether this is the current page (last item) */
  isCurrent: PropTypes.bool,
  
  /** Click handler for the breadcrumb item */
  onClick: PropTypes.func,
  
  /** Additional CSS classes */
  className: PropTypes.string,
  
  /** Child elements (not typically used with breadcrumbs) */
  children: PropTypes.node,
};

/**
 * Breadcrumb component
 * Displays a breadcrumb navigation trail, showing the current page's location in the site hierarchy
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <Breadcrumb>
 *   <BreadcrumbItem label="Home" href="/" />
 *   <BreadcrumbItem label="Products" href="/products" />
 *   <BreadcrumbItem label="Product Details" isCurrent />
 * </Breadcrumb>
 * ```
 */
const Breadcrumb = ({
  // Content
  children,
  items,
  
  // Behavior
  maxItems,
  collapseFrom = 'center',
  
  // Display
  separator = '/',
  showHomeIcon = true,
  showIcons = true,
  homeHref = '/',
  homeLabel = 'Home',
  homeIcon,
  
  // Styling
  className,
  itemClassName,
  currentItemClassName,
  separatorClassName,
  collapsedItemClassName,
}) => {
  // If both children and items are provided, prefer children
  const hasChildren = React.Children.count(children) > 0;
  
  // Convert array-based items to BreadcrumbItem children if no children were provided
  const breadcrumbItems = hasChildren
    ? React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === BreadcrumbItem
      )
    : (items || []).map((item, index) => ({
        ...item,
        isCurrent: index === (items || []).length - 1,
      }));
    
  // Default home icon
  const defaultHomeIcon = (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  );
  
  // Helper to prepend home item if not already included
  const getItemsWithHome = () => {
    // Don't add home if there are no items
    if (breadcrumbItems.length === 0) return [];
    
    // Check if the first item is already a home item
    const firstItem = breadcrumbItems[0];
    const isFirstItemHome = firstItem.props 
      ? (firstItem.props.href === homeHref || firstItem.props.label === homeLabel)
      : (firstItem.href === homeHref || firstItem.label === homeLabel);
    
    // If no home item, prepend it
    if (showHomeIcon && !isFirstItemHome) {
      const homeItem = {
        label: homeLabel,
        href: homeHref,
        icon: homeIcon || defaultHomeIcon,
        isCurrent: false,
      };
      
      return [homeItem, ...breadcrumbItems];
    }
    
    return breadcrumbItems;
  };
  
  // Get the final list of items with home prepended if needed
  const finalItems = getItemsWithHome();
  
  // Apply truncation if maxItems is specified
  const truncateItems = () => {
    if (!maxItems || finalItems.length <= maxItems) {
      return finalItems;
    }
    
    // We need to keep first and last items, and decide which to collapse
    const collapsedIndicator = {
      label: '...',
      isCollapsed: true,
    };
    
    if (collapseFrom === 'start') {
      // Keep the last maxItems items, collapse the beginning
      const visibleItems = finalItems.slice(-maxItems + 1);
      return [collapsedIndicator, ...visibleItems];
    } else if (collapseFrom === 'end') {
      // Keep the first maxItems items, collapse the end
      const visibleItems = finalItems.slice(0, maxItems - 1);
      return [...visibleItems, collapsedIndicator, finalItems[finalItems.length - 1]];
    } else {
      // Collapse the middle, keep first and last items
      const halfToKeep = Math.floor((maxItems - 1) / 2);
      const itemsAtStart = finalItems.slice(0, halfToKeep);
      const itemsAtEnd = finalItems.slice(finalItems.length - (maxItems - halfToKeep - 1));
      
      return [...itemsAtStart, collapsedIndicator, ...itemsAtEnd];
    }
  };
  
  // Get the final list of items after truncation
  const visibleItems = truncateItems();
  
  // Render a breadcrumb item
  const renderItem = (item, index, isLast) => {
    // Handle collapsed indicator
    if (item.isCollapsed) {
      return (
        <div
          key="collapsed"
          className={twMerge(
            'text-text-secondary mx-2',
            collapsedItemClassName
          )}
          aria-hidden="true"
        >
          {item.label}
        </div>
      );
    }
    
    // Create base props for any breadcrumb item
    const baseProps = {
      className: twMerge(
        'text-sm font-medium',
        isLast ? 'text-text-primary' : 'text-text-secondary hover:text-text-hover',
        isLast ? currentItemClassName : itemClassName,
        item.className
      ),
      'aria-current': isLast ? 'page' : undefined,
    };
    
    // Handle item content with proper icon
    const itemContent = (
      <>
        {showIcons && item.icon && (
          <span className="mr-1">{item.icon}</span>
        )}
        <span>{item.label}</span>
      </>
    );
    
    // Determine whether to render as a link or span
    const shouldBeLink = !isLast && item.href;
    
    return (
      <React.Fragment key={index}>
        {shouldBeLink ? (
          <a
            href={item.href}
            onClick={item.onClick}
            {...baseProps}
          >
            {itemContent}
          </a>
        ) : (
          <span
            onClick={isLast ? undefined : item.onClick}
            {...baseProps}
          >
            {itemContent}
          </span>
        )}
        
        {!isLast && (
          <span
            className={twMerge(
              'mx-2 text-text-disabled select-none',
              separatorClassName
            )}
            aria-hidden="true"
          >
            {separator}
          </span>
        )}
      </React.Fragment>
    );
  };
  
  return (
    <nav
      className={twMerge(
        'flex items-center text-sm',
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {visibleItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center"
          >
            {renderItem(
              // If the item is a React element from children, get its props
              React.isValidElement(item) ? item.props : item,
              index,
              index === visibleItems.length - 1
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  /** BreadcrumbItem components as children */
  children: PropTypes.node,
  
  /** Array of breadcrumb items as alternative to children */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      href: PropTypes.string,
      icon: PropTypes.node,
      onClick: PropTypes.func,
      className: PropTypes.string,
    })
  ),
  
  /** Maximum number of items to display before truncating */
  maxItems: PropTypes.number,
  
  /** Where to collapse items when truncating */
  collapseFrom: PropTypes.oneOf(['start', 'center', 'end']),
  
  /** Character or element to use as separator between items */
  separator: PropTypes.node,
  
  /** Whether to show a home icon as the first item */
  showHomeIcon: PropTypes.bool,
  
  /** Whether to show icons for items that have them */
  showIcons: PropTypes.bool,
  
  /** URL for the home link */
  homeHref: PropTypes.string,
  
  /** Label for the home link */
  homeLabel: PropTypes.string,
  
  /** Custom icon for the home item */
  homeIcon: PropTypes.node,
  
  /** Additional CSS classes for the container */
  className: PropTypes.string,
  
  /** CSS classes for all breadcrumb items */
  itemClassName: PropTypes.string,
  
  /** CSS classes for the current (last) breadcrumb item */
  currentItemClassName: PropTypes.string,
  
  /** CSS classes for separators */
  separatorClassName: PropTypes.string,
  
  /** CSS classes for the collapsed indicator */
  collapsedItemClassName: PropTypes.string,
};

export default Breadcrumb;
