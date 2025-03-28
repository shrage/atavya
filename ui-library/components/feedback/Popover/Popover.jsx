import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Popover component for displaying content in a floating container relative to a trigger element
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const Popover = ({
  trigger,
  children,
  placement = 'bottom',
  offset = 8,
  isOpen: controlledIsOpen,
  onOpenChange,
  triggerType = 'click',
  closeOnEsc = true,
  closeOnOutsideClick = true,
  width = 'auto',
  maxHeight,
  hasArrow = true,
  className = '',
  contentClassName = '',
  disabled = false,
}) => {
  // For uncontrolled usage
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  
  // Determine if controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
  
  // References
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  
  // Handle open state changes
  const setIsOpen = (nextIsOpen) => {
    if (!isControlled) {
      setUncontrolledIsOpen(nextIsOpen);
    }
    if (onOpenChange) {
      onOpenChange(nextIsOpen);
    }
  };
  
  // Toggle popover
  const togglePopover = (e) => {
    if (disabled) return;
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen(!isOpen);
  };
  
  // Open popover
  const openPopover = (e) => {
    if (disabled) return;
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen(true);
  };
  
  // Close popover
  const closePopover = () => {
    if (disabled) return;
    setIsOpen(false);
  };
  
  // Handle click outside to close popover
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpen &&
        closeOnOutsideClick &&
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        closePopover();
      }
    };
    
    const handleEsc = (e) => {
      if (isOpen && closeOnEsc && e.key === 'Escape') {
        closePopover();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, closeOnOutsideClick, closeOnEsc]);
  
  // Configure trigger events based on triggerType
  const getTriggerProps = () => {
    if (disabled) {
      return {};
    }
    
    switch (triggerType) {
      case 'click':
        return {
          onClick: togglePopover,
        };
      case 'hover':
        return {
          onMouseEnter: openPopover,
          onMouseLeave: closePopover,
        };
      default:
        return {
          onClick: togglePopover,
        };
    }
  };
  
  // Placement classes
  const placementClasses = {
    'top': 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    'top-start': 'bottom-full left-0 mb-2',
    'top-end': 'bottom-full right-0 mb-2',
    'bottom': 'top-full left-1/2 -translate-x-1/2 mt-2',
    'bottom-start': 'top-full left-0 mt-2',
    'bottom-end': 'top-full right-0 mt-2',
    'left': 'right-full top-1/2 -translate-y-1/2 mr-2',
    'left-start': 'right-full top-0 mr-2',
    'left-end': 'right-full bottom-0 mr-2',
    'right': 'left-full top-1/2 -translate-y-1/2 ml-2',
    'right-start': 'left-full top-0 ml-2',
    'right-end': 'left-full bottom-0 ml-2',
  };
  
  // Arrow placement classes
  const arrowClasses = {
    'top': 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-border-light dark:border-t-border-dark border-l-transparent border-r-transparent border-b-transparent',
    'top-start': 'bottom-[-6px] left-3 border-t-border-light dark:border-t-border-dark border-l-transparent border-r-transparent border-b-transparent',
    'top-end': 'bottom-[-6px] right-3 border-t-border-light dark:border-t-border-dark border-l-transparent border-r-transparent border-b-transparent',
    'bottom': 'top-[-6px] left-1/2 -translate-x-1/2 border-b-border-light dark:border-b-border-dark border-l-transparent border-r-transparent border-t-transparent',
    'bottom-start': 'top-[-6px] left-3 border-b-border-light dark:border-b-border-dark border-l-transparent border-r-transparent border-t-transparent',
    'bottom-end': 'top-[-6px] right-3 border-b-border-light dark:border-b-border-dark border-l-transparent border-r-transparent border-t-transparent',
    'left': 'right-[-6px] top-1/2 -translate-y-1/2 border-l-border-light dark:border-l-border-dark border-t-transparent border-b-transparent border-r-transparent',
    'left-start': 'right-[-6px] top-3 border-l-border-light dark:border-l-border-dark border-t-transparent border-b-transparent border-r-transparent',
    'left-end': 'right-[-6px] bottom-3 border-l-border-light dark:border-l-border-dark border-t-transparent border-b-transparent border-r-transparent',
    'right': 'left-[-6px] top-1/2 -translate-y-1/2 border-r-border-light dark:border-r-border-dark border-t-transparent border-b-transparent border-l-transparent',
    'right-start': 'left-[-6px] top-3 border-r-border-light dark:border-r-border-dark border-t-transparent border-b-transparent border-l-transparent',
    'right-end': 'left-[-6px] bottom-3 border-r-border-light dark:border-r-border-dark border-t-transparent border-b-transparent border-l-transparent',
  };
  
  // Render the wrapped trigger with appropriate event handlers
  const renderTrigger = () => {
    if (!trigger) return null;
    
    return (
      <div 
        ref={triggerRef}
        className={`inline-block ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
        {...getTriggerProps()}
      >
        {typeof trigger === 'function' 
          ? trigger({ isOpen }) 
          : trigger
        }
      </div>
    );
  };
  
  return (
    <div className={`relative inline-block ${className}`}>
      {renderTrigger()}
      
      {isOpen && !disabled && (
        <div
          ref={popoverRef}
          className={`
            absolute z-50
            ${placementClasses[placement] || placementClasses.bottom}
            bg-white dark:bg-surface-dark
            border border-border-light dark:border-border-dark
            rounded-md shadow-lg
            ${contentClassName}
          `}
          style={{
            width: width,
            maxHeight: maxHeight,
          }}
          role="dialog"
          aria-modal="true"
        >
          {/* Arrow */}
          {hasArrow && (
            <div
              className={`
                absolute w-3 h-3
                border-[6px] border-solid
                ${arrowClasses[placement] || arrowClasses.bottom}
              `}
            />
          )}
          
          {/* Content */}
          <div className="relative">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

Popover.propTypes = {
  /** Trigger element that the popover is attached to */
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /** Popover content */
  children: PropTypes.node,
  /** Popover placement relative to trigger */
  placement: PropTypes.oneOf([
    'top', 'top-start', 'top-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end',
    'right', 'right-start', 'right-end',
  ]),
  /** Distance between trigger and popover (in pixels) */
  offset: PropTypes.number,
  /** Controlled open state */
  isOpen: PropTypes.bool,
  /** Callback for open state changes */
  onOpenChange: PropTypes.func,
  /** How the popover is triggered */
  triggerType: PropTypes.oneOf(['click', 'hover']),
  /** Whether to close on Escape key */
  closeOnEsc: PropTypes.bool,
  /** Whether to close when clicking outside */
  closeOnOutsideClick: PropTypes.bool,
  /** Popover width */
  width: PropTypes.string,
  /** Popover maximum height with overflow */
  maxHeight: PropTypes.string,
  /** Whether to show an arrow pointing to the trigger */
  hasArrow: PropTypes.bool,
  /** Additional classes for container */
  className: PropTypes.string,
  /** Additional classes for popover content */
  contentClassName: PropTypes.string,
  /** Whether the popover is disabled */
  disabled: PropTypes.bool,
};

export default Popover;
