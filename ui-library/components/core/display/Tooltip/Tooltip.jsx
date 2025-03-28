import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Tooltip component
 * Displays additional information when hovering over or focusing on an element.
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <Tooltip content="This is a helpful tip">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 */
const Tooltip = ({
  // Content
  children,
  content,
  
  // Positioning
  position = 'top',
  offset = 8,
  
  // Behavior
  trigger = 'hover',
  delay = 300,
  hideDelay = 100,
  
  // Display
  maxWidth = 250,
  
  // Styling
  variant = 'dark',
  arrow = true,
  className,
  contentClassName,
  arrowClassName,
  
  // Additional
  portalToBody = true,
  closeOnEscape = true,
  openOnMount = false,
  
  // Controlled props
  isOpen,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = useState(openOnMount);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });
  
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  
  // Use controlled state if provided, otherwise use internal state
  const open = isOpen !== undefined ? isOpen : internalOpen;
  
  // Calculate the position of the tooltip based on the trigger element
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    
    let top = 0;
    let left = 0;
    let arrowTop = 0;
    let arrowLeft = 0;
    
    const arrowSize = 8; // Size of the arrow
    
    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - offset + scrollY;
        left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2) + scrollX;
        arrowTop = tooltipRect.height - 2;
        arrowLeft = tooltipRect.width / 2 - arrowSize;
        break;
      case 'bottom':
        top = triggerRect.bottom + offset + scrollY;
        left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2) + scrollX;
        arrowTop = -arrowSize + 2;
        arrowLeft = tooltipRect.width / 2 - arrowSize;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2) + scrollY;
        left = triggerRect.left - tooltipRect.width - offset + scrollX;
        arrowTop = tooltipRect.height / 2 - arrowSize;
        arrowLeft = tooltipRect.width - 2;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2) + scrollY;
        left = triggerRect.right + offset + scrollX;
        arrowTop = tooltipRect.height / 2 - arrowSize;
        arrowLeft = -arrowSize + 2;
        break;
    }
    
    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Adjust for horizontal overflow
    if (left < 0) {
      arrowLeft += left;
      left = 0;
    } else if (left + tooltipRect.width > viewportWidth) {
      const overflow = left + tooltipRect.width - viewportWidth;
      arrowLeft += overflow;
      left -= overflow;
    }
    
    // Adjust for vertical overflow
    if (top < 0) {
      arrowTop += top;
      top = 0;
    } else if (top + tooltipRect.height > viewportHeight) {
      const overflow = top + tooltipRect.height - viewportHeight;
      arrowTop += overflow;
      top -= overflow;
    }
    
    setTooltipPosition({ top, left });
    setArrowPosition({ top: arrowTop, left: arrowLeft });
  };
  
  // Handle opening/closing the tooltip
  const handleOpen = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    if (timeoutRef.current) return;
    
    timeoutRef.current = setTimeout(() => {
      if (isOpen === undefined) {
        setInternalOpen(true);
      }
      if (onOpenChange) {
        onOpenChange(true);
      }
      timeoutRef.current = null;
    }, delay);
  };
  
  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (hideTimeoutRef.current) return;
    
    hideTimeoutRef.current = setTimeout(() => {
      if (isOpen === undefined) {
        setInternalOpen(false);
      }
      if (onOpenChange) {
        onOpenChange(false);
      }
      hideTimeoutRef.current = null;
    }, hideDelay);
  };
  
  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);
  
  // Calculate position whenever the tooltip is shown
  useEffect(() => {
    if (open) {
      calculatePosition();
      
      // Recalculate on window resize or scroll
      const handleResize = () => calculatePosition();
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize);
      };
    }
  }, [open, position, offset]);
  
  // Handle escape key press
  useEffect(() => {
    if (closeOnEscape && open) {
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [closeOnEscape, open]);
  
  // Determine event handlers based on trigger
  const triggerProps = {};
  
  if (trigger === 'hover' || trigger === 'all') {
    triggerProps.onMouseEnter = handleOpen;
    triggerProps.onMouseLeave = handleClose;
  }
  
  if (trigger === 'focus' || trigger === 'all') {
    triggerProps.onFocus = handleOpen;
    triggerProps.onBlur = handleClose;
  }
  
  if (trigger === 'click' || trigger === 'all') {
    triggerProps.onClick = (e) => {
      e.stopPropagation();
      if (open) {
        handleClose();
      } else {
        handleOpen();
      }
    };
  }
  
  // Get variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'dark':
        return 'bg-text-primary text-white';
      case 'light':
        return 'bg-white text-text-primary border border-border-light shadow-md';
      case 'info':
        return 'bg-status-info text-white';
      case 'success':
        return 'bg-status-success text-white';
      case 'warning':
        return 'bg-status-warning text-white';
      case 'error':
        return 'bg-status-live text-white';
      default:
        return 'bg-text-primary text-white';
    }
  };
  
  // Get arrow variant classes
  const getArrowVariantClasses = () => {
    switch (variant) {
      case 'dark':
        return 'border-text-primary';
      case 'light':
        return 'border-border-light';
      case 'info':
        return 'border-status-info';
      case 'success':
        return 'border-status-success';
      case 'warning':
        return 'border-status-warning';
      case 'error':
        return 'border-status-live';
      default:
        return 'border-text-primary';
    }
  };
  
  // Get arrow rotation based on position
  const getArrowRotation = () => {
    switch (position) {
      case 'top': return 'rotate-45';
      case 'bottom': return 'rotate-[225deg]';
      case 'left': return 'rotate-[135deg]';
      case 'right': return 'rotate-[-45deg]';
      default: return 'rotate-45';
    }
  };
  
  // Wrap children to add ref and event handlers
  const wrappedChildren = React.cloneElement(
    React.Children.only(children),
    {
      ref: triggerRef,
      ...triggerProps,
    }
  );
  
  return (
    <>
      {wrappedChildren}
      
      {open && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={twMerge(
            'absolute z-50 px-3 py-2 text-sm rounded shadow-lg',
            getVariantClasses(),
            className
          )}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            maxWidth: maxWidth ? `${maxWidth}px` : 'none',
          }}
        >
          <div className={twMerge('relative', contentClassName)}>
            {content}
          </div>
          
          {arrow && (
            <div
              className={twMerge(
                'absolute w-4 h-4 transform',
                getArrowRotation(),
                arrowClassName
              )}
              style={{
                top: `${arrowPosition.top}px`,
                left: `${arrowPosition.left}px`,
              }}
            >
              <div
                className={twMerge(
                  'w-2 h-2 transform rotate-45',
                  getVariantClasses(),
                  variant === 'light' ? 'border-t border-l' : '',
                  getArrowVariantClasses()
                )}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

Tooltip.propTypes = {
  /** The element that triggers the tooltip */
  children: PropTypes.element.isRequired,
  
  /** Content to display in the tooltip */
  content: PropTypes.node.isRequired,
  
  /** Position of the tooltip relative to the trigger */
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  
  /** Distance between the tooltip and the trigger (in pixels) */
  offset: PropTypes.number,
  
  /** What user interaction triggers the tooltip */
  trigger: PropTypes.oneOf(['hover', 'click', 'focus', 'all']),
  
  /** Delay before showing the tooltip (in milliseconds) */
  delay: PropTypes.number,
  
  /** Delay before hiding the tooltip (in milliseconds) */
  hideDelay: PropTypes.number,
  
  /** Maximum width of the tooltip (in pixels) */
  maxWidth: PropTypes.number,
  
  /** Style variant of the tooltip */
  variant: PropTypes.oneOf(['dark', 'light', 'info', 'success', 'warning', 'error']),
  
  /** Whether to show the arrow pointing to the trigger */
  arrow: PropTypes.bool,
  
  /** Additional CSS classes for the tooltip container */
  className: PropTypes.string,
  
  /** CSS classes for the tooltip content */
  contentClassName: PropTypes.string,
  
  /** CSS classes for the arrow */
  arrowClassName: PropTypes.string,
  
  /** Whether to portal the tooltip to the document body */
  portalToBody: PropTypes.bool,
  
  /** Whether to close the tooltip when pressing Escape */
  closeOnEscape: PropTypes.bool,
  
  /** Whether the tooltip should be open on mount */
  openOnMount: PropTypes.bool,
  
  /** Controlled open state */
  isOpen: PropTypes.bool,
  
  /** Called when the open state changes */
  onOpenChange: PropTypes.func,
};

export default Tooltip;
