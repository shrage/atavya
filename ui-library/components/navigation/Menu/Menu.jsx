import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Menu component for dropdowns and context menus
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const Menu = ({
  trigger,
  children,
  placement = 'bottom-start',
  offset = 8,
  width = 'auto',
  minWidth = '180px',
  maxHeight,
  isOpen: controlledIsOpen,
  onOpenChange,
  trigger: triggerType = 'click',
  autoClose = true,
  closeOnEsc = true,
  closeOnOutsideClick = true,
  closeOnSelect = true,
  className = '',
  menuClassName = '',
}) => {
  // For uncontrolled usage
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  
  // Determine if controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
  
  // References
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  
  // Handle open state changes
  const setIsOpen = (nextIsOpen) => {
    if (!isControlled) {
      setUncontrolledIsOpen(nextIsOpen);
    }
    if (onOpenChange) {
      onOpenChange(nextIsOpen);
    }
  };
  
  // Toggle menu
  const toggleMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent event bubbling
    }
    setIsOpen(!isOpen);
  };
  
  // Open menu
  const openMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent event bubbling
    }
    setIsOpen(true);
  };
  
  // Close menu
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  // Handle click outside to close menu
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpen &&
        closeOnOutsideClick &&
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };
    
    const handleEsc = (e) => {
      if (isOpen && closeOnEsc && e.key === 'Escape') {
        closeMenu();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEsc);
      
      // Set focus to first focusable element in menu
      setTimeout(() => {
        if (menuRef.current) {
          const focusableElements = menuRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          }
        }
      }, 10);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, closeOnOutsideClick, closeOnEsc]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || !menuRef.current) return;
      
      const focusableElements = Array.from(
        menuRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        )
      );
      
      if (focusableElements.length === 0) return;
      
      const currentIndex = focusableElements.indexOf(document.activeElement);
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
          focusableElements[nextIndex].focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
          focusableElements[prevIndex].focus();
          break;
        case 'Home':
          e.preventDefault();
          focusableElements[0].focus();
          break;
        case 'End':
          e.preventDefault();
          focusableElements[focusableElements.length - 1].focus();
          break;
        default:
          break;
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);
  
  // Handle menu positioning
  const getMenuStyles = () => {
    const baseStyles = {
      width: width,
      minWidth: minWidth,
      maxHeight: maxHeight,
    };
    
    // Placement classes
    const placementClasses = {
      'top': 'bottom-full left-0 mb-2',
      'top-start': 'bottom-full left-0 mb-2',
      'top-end': 'bottom-full right-0 mb-2',
      'bottom': 'top-full left-0 mt-2',
      'bottom-start': 'top-full left-0 mt-2',
      'bottom-end': 'top-full right-0 mt-2',
      'left': 'right-full top-0 mr-2',
      'left-start': 'right-full top-0 mr-2',
      'left-end': 'right-full bottom-0 mr-2',
      'right': 'left-full top-0 ml-2',
      'right-start': 'left-full top-0 ml-2',
      'right-end': 'left-full bottom-0 ml-2',
    };
    
    return {
      ...baseStyles,
      className: `absolute z-50 ${placementClasses[placement] || placementClasses['bottom-start']}`,
    };
  };
  
  // Create menu item with click handling
  const MenuItemWrapper = ({ children, onClick, disabled }) => {
    const handleItemClick = (e) => {
      if (disabled) return;
      
      if (onClick) {
        onClick(e);
      }
      
      if (closeOnSelect && autoClose) {
        closeMenu();
      }
    };
    
    return React.cloneElement(children, {
      onClick: handleItemClick,
      disabled,
    });
  };
  
  MenuItemWrapper.propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  };
  
  // Wrap children with MenuItemWrapper if needed
  const menuItems = React.Children.map(children, child => {
    if (!React.isValidElement(child)) return child;
    
    // If child is a MenuItem, wrap it
    if (child.type?.displayName === 'MenuItem') {
      return (
        <MenuItemWrapper
          onClick={child.props.onClick}
          disabled={child.props.disabled}
        >
          {child}
        </MenuItemWrapper>
      );
    }
    
    // For other components (dividers, nested menus, etc.), pass as is
    return child;
  });
  
  // Configure trigger events based on triggerType
  const getTriggerProps = () => {
    switch (triggerType) {
      case 'click':
        return {
          onClick: toggleMenu,
        };
      case 'hover':
        return {
          onMouseEnter: openMenu,
          onMouseLeave: closeMenu,
        };
      case 'context':
        return {
          onContextMenu: openMenu,
        };
      default:
        return {
          onClick: toggleMenu,
        };
    }
  };
  
  // Render the wrapped trigger with appropriate event handlers
  const renderTrigger = () => {
    if (!trigger) return null;
    
    return (
      <div 
        ref={triggerRef}
        className="inline-block"
        {...getTriggerProps()}
      >
        {typeof trigger === 'function' 
          ? trigger({ isOpen }) 
          : trigger
        }
      </div>
    );
  };
  
  const menuStyles = getMenuStyles();
  
  return (
    <div className={`relative inline-block ${className}`}>
      {renderTrigger()}
      
      {isOpen && (
        <div
          ref={menuRef}
          className={`
            bg-white dark:bg-surface-dark
            border border-border-light dark:border-border-dark
            shadow-lg rounded-md overflow-hidden
            ${menuStyles.className}
            ${menuClassName}
          `}
          style={{
            width: menuStyles.width,
            minWidth: menuStyles.minWidth,
            maxHeight: menuStyles.maxHeight,
          }}
          role="menu"
          aria-orientation="vertical"
        >
          {menuItems}
        </div>
      )}
    </div>
  );
};

Menu.propTypes = {
  /** Trigger element to open the menu */
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /** Menu items */
  children: PropTypes.node,
  /** Menu position relative to trigger */
  placement: PropTypes.oneOf([
    'top', 'top-start', 'top-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end',
    'right', 'right-start', 'right-end',
  ]),
  /** Space between trigger and menu (in pixels) */
  offset: PropTypes.number,
  /** Menu width */
  width: PropTypes.string,
  /** Menu minimum width */
  minWidth: PropTypes.string,
  /** Menu maximum height with overflow */
  maxHeight: PropTypes.string,
  /** Controlled open state */
  isOpen: PropTypes.bool,
  /** Callback for open state changes */
  onOpenChange: PropTypes.func,
  /** How the menu is triggered */
  trigger: PropTypes.oneOf(['click', 'hover', 'context']),
  /** Whether to auto-close the menu on item selection */
  autoClose: PropTypes.bool,
  /** Whether to close on Escape key */
  closeOnEsc: PropTypes.bool,
  /** Whether to close when clicking outside */
  closeOnOutsideClick: PropTypes.bool,
  /** Whether to close when a menu item is selected */
  closeOnSelect: PropTypes.bool,
  /** Additional classes for container */
  className: PropTypes.string,
  /** Additional classes for menu */
  menuClassName: PropTypes.string,
};

export default Menu;
