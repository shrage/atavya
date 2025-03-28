import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { createPortal } from 'react-dom';

/**
 * Popover component
 * 
 * A component that displays floating content when a trigger element is clicked or hovered.
 * Supports different placements, triggers, and can contain rich content.
 * 
 * @component
 * @example
 * ```jsx
 * <Popover
 *   trigger={<button>Click me</button>}
 *   content={<div>Popover content</div>}
 * />
 * ```
 */
const Popover = ({
  children,
  trigger,
  content,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  placement = 'bottom',
  offset = 8,
  triggerType = 'click',
  closeOnClickOutside = true,
  closeOnEsc = true,
  hasArrow = true,
  isLazy = true,
  className,
  contentClassName,
  arrowClassName,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const arrowRef = useRef(null);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined;
  const openState = isControlled ? controlledIsOpen : isOpen;
  
  // Handle open state changes
  const handleOpen = () => {
    if (!isControlled) {
      setIsOpen(true);
    }
    
    if (onOpen) {
      onOpen();
    }
  };
  
  const handleClose = () => {
    if (!isControlled) {
      setIsOpen(false);
    }
    
    if (onClose) {
      onClose();
    }
  };
  
  const toggleOpen = () => {
    if (openState) {
      handleClose();
    } else {
      handleOpen();
    }
  };
  
  // Calculate position based on trigger element and placement
  const updatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    
    let top = 0;
    let left = 0;
    let arrowTop = 0;
    let arrowLeft = 0;
    
    // Calculate position based on placement
    switch (placement) {
      case 'top':
        top = triggerRect.top - popoverRect.height - offset + scrollY;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2 + scrollX;
        arrowTop = popoverRect.height;
        arrowLeft = popoverRect.width / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + offset + scrollY;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2 + scrollX;
        arrowTop = -8;
        arrowLeft = popoverRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2 + scrollY;
        left = triggerRect.left - popoverRect.width - offset + scrollX;
        arrowTop = popoverRect.height / 2;
        arrowLeft = popoverRect.width;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2 + scrollY;
        left = triggerRect.right + offset + scrollX;
        arrowTop = popoverRect.height / 2;
        arrowLeft = -8;
        break;
      default:
        top = triggerRect.bottom + offset + scrollY;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2 + scrollX;
        arrowTop = -8;
        arrowLeft = popoverRect.width / 2;
    }
    
    // Adjust position to keep popover within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Adjust horizontal position
    if (left < 0) {
      arrowLeft += left;
      left = 10;
    } else if (left + popoverRect.width > viewportWidth) {
      const diff = left + popoverRect.width - viewportWidth;
      arrowLeft += diff;
      left -= diff + 10;
    }
    
    // Adjust vertical position
    if (top < 0) {
      arrowTop += top;
      top = 10;
    } else if (top + popoverRect.height > viewportHeight + scrollY) {
      const diff = top + popoverRect.height - (viewportHeight + scrollY);
      arrowTop += diff;
      top -= diff + 10;
    }
    
    setPosition({ top, left });
    setArrowPosition({ top: arrowTop, left: arrowLeft });
  };
  
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openState &&
        closeOnClickOutside &&
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        handleClose();
      }
    };
    
    if (openState && closeOnClickOutside) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openState, closeOnClickOutside]);
  
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && openState && closeOnEsc) {
        handleClose();
      }
    };
    
    if (openState && closeOnEsc) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openState, closeOnEsc]);
  
  // Update position when popover opens or window resizes
  useEffect(() => {
    if (openState) {
      setMounted(true);
      // Use setTimeout to ensure the popover is rendered before calculating position
      setTimeout(updatePosition, 0);
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
    }
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [openState]);
  
  // Handle hover events for hover trigger
  const handleMouseEnter = () => {
    if (triggerType === 'hover') {
      handleOpen();
    }
  };
  
  const handleMouseLeave = () => {
    if (triggerType === 'hover') {
      handleClose();
    }
  };
  
  // Handle click for click trigger
  const handleClick = () => {
    if (triggerType === 'click') {
      toggleOpen();
    }
  };
  
  // Clone trigger element with additional props
  const triggerElement = React.cloneElement(trigger, {
    ref: triggerRef,
    onClick: (e) => {
      handleClick();
      if (trigger.props.onClick) {
        trigger.props.onClick(e);
      }
    },
    onMouseEnter: (e) => {
      handleMouseEnter();
      if (trigger.props.onMouseEnter) {
        trigger.props.onMouseEnter(e);
      }
    },
    onMouseLeave: (e) => {
      handleMouseLeave();
      if (trigger.props.onMouseLeave) {
        trigger.props.onMouseLeave(e);
      }
    },
  });
  
  // Get arrow rotation based on placement
  const getArrowRotation = () => {
    switch (placement) {
      case 'top': return 'rotate-180';
      case 'left': return '-rotate-90';
      case 'right': return 'rotate-90';
      default: return '';
    }
  };
  
  // Don't render popover content if lazy and not open
  if (isLazy && !openState && !mounted) {
    return triggerElement;
  }
  
  return (
    <>
      {triggerElement}
      
      {createPortal(
        <div
          ref={popoverRef}
          className={twMerge(
            'fixed z-50 bg-white rounded-md shadow-lg border border-border-light transition-opacity duration-200',
            openState ? 'opacity-100 visible' : 'opacity-0 invisible',
            className
          )}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          onMouseEnter={triggerType === 'hover' ? handleMouseEnter : undefined}
          onMouseLeave={triggerType === 'hover' ? handleMouseLeave : undefined}
          {...props}
        >
          <div className={twMerge('p-3', contentClassName)}>
            {typeof content === 'function' ? content({ onClose: handleClose }) : content}
          </div>
          
          {hasArrow && (
            <div
              ref={arrowRef}
              className={twMerge(
                'absolute w-3 h-3 bg-white border-t border-l border-border-light transform rotate-45',
                getArrowRotation(),
                arrowClassName
              )}
              style={{
                top: `${arrowPosition.top}px`,
                left: `${arrowPosition.left}px`,
                marginLeft: '-6px',
                marginTop: '-6px',
              }}
            />
          )}
        </div>,
        document.body
      )}
    </>
  );
};

Popover.propTypes = {
  /** Child elements */
  children: PropTypes.node,
  /** Element that triggers the popover */
  trigger: PropTypes.element.isRequired,
  /** Content to display in the popover */
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /** Whether the popover is open (controlled) */
  isOpen: PropTypes.bool,
  /** Callback when popover opens */
  onOpen: PropTypes.func,
  /** Callback when popover closes */
  onClose: PropTypes.func,
  /** Placement of the popover relative to the trigger */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Distance between popover and trigger in pixels */
  offset: PropTypes.number,
  /** How the popover is triggered */
  triggerType: PropTypes.oneOf(['click', 'hover']),
  /** Whether to close the popover when clicking outside */
  closeOnClickOutside: PropTypes.bool,
  /** Whether to close the popover when pressing ESC */
  closeOnEsc: PropTypes.bool,
  /** Whether to show an arrow pointing to the trigger */
  hasArrow: PropTypes.bool,
  /** Whether to only mount the popover content when it's open */
  isLazy: PropTypes.bool,
  /** Additional CSS classes for the popover container */
  className: PropTypes.string,
  /** Additional CSS classes for the content area */
  contentClassName: PropTypes.string,
  /** Additional CSS classes for the arrow */
  arrowClassName: PropTypes.string,
};

export default Popover;
