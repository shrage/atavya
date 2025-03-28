import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { createPortal } from 'react-dom';

/**
 * Drawer component
 * 
 * A slide-in panel that can be used for navigation, forms, or additional content.
 * Can slide in from different directions and be modal or non-modal.
 * 
 * @component
 * @example
 * ```jsx
 * <Drawer isOpen={isOpen} onClose={onClose} placement="right">
 *   <div className="p-4">Drawer content</div>
 * </Drawer>
 * ```
 */
const Drawer = ({
  children,
  isOpen,
  onClose,
  placement = 'right',
  size = 'md',
  isModal = true,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  header,
  footer,
  className,
  overlayClassName,
  contentClassName,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const drawerRef = useRef(null);
  
  // Size variants
  const sizeClasses = {
    xs: placement === 'left' || placement === 'right' ? 'w-64' : 'h-64',
    sm: placement === 'left' || placement === 'right' ? 'w-80' : 'h-80',
    md: placement === 'left' || placement === 'right' ? 'w-96' : 'h-96',
    lg: placement === 'left' || placement === 'right' ? 'w-[32rem]' : 'h-[32rem]',
    xl: placement === 'left' || placement === 'right' ? 'w-[40rem]' : 'h-[40rem]',
    full: placement === 'left' || placement === 'right' ? 'w-full' : 'h-full',
  };
  
  // Placement classes
  const getPlacementClasses = () => {
    switch (placement) {
      case 'left':
        return 'inset-y-0 left-0';
      case 'right':
        return 'inset-y-0 right-0';
      case 'top':
        return 'inset-x-0 top-0';
      case 'bottom':
        return 'inset-x-0 bottom-0';
      default:
        return 'inset-y-0 right-0';
    }
  };
  
  // Animation classes
  const getAnimationClasses = () => {
    if (isClosing) {
      switch (placement) {
        case 'left':
          return '-translate-x-full';
        case 'right':
          return 'translate-x-full';
        case 'top':
          return '-translate-y-full';
        case 'bottom':
          return 'translate-y-full';
        default:
          return 'translate-x-full';
      }
    }
    
    return 'translate-x-0 translate-y-0';
  };
  
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && closeOnEsc && isOpen) {
        handleClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeOnEsc]);
  
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target) &&
        closeOnOverlayClick &&
        isOpen
      ) {
        handleClose();
      }
    };
    
    if (isOpen && isModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeOnOverlayClick, isModal]);
  
  // Handle body scroll lock
  useEffect(() => {
    if (isOpen && isModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isModal]);
  
  // Handle mounting
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setIsClosing(false);
    }
  }, [isOpen]);
  
  // Handle smooth closing
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setMounted(false);
    }, 300); // Match the transition duration
  };
  
  // Don't render anything if not mounted and not open
  if (!mounted && !isOpen) {
    return null;
  }
  
  // Create portal for the drawer
  return createPortal(
    <div
      className={twMerge(
        'fixed inset-0 z-50',
        !isOpen && !mounted && 'hidden',
        isModal ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      aria-hidden={!isOpen}
      {...props}
    >
      {/* Overlay */}
      {isModal && (
        <div
          className={twMerge(
            'absolute inset-0 bg-black/50 transition-opacity duration-300',
            isOpen && !isClosing ? 'opacity-100' : 'opacity-0',
            overlayClassName
          )}
          onClick={closeOnOverlayClick ? handleClose : undefined}
        />
      )}
      
      {/* Drawer */}
      <div
        ref={drawerRef}
        className={twMerge(
          'fixed bg-white shadow-xl transition-transform duration-300 ease-in-out flex flex-col',
          getPlacementClasses(),
          sizeClasses[size],
          getAnimationClasses(),
          isModal ? 'pointer-events-auto' : 'pointer-events-auto shadow-lg',
          className
        )}
      >
        {/* Header */}
        {header && (
          <div className="px-4 py-3 border-b border-border-light flex items-center justify-between">
            <div className="font-medium text-text-primary">{header}</div>
            <button
              className="text-text-secondary hover:text-text-primary rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={handleClose}
              aria-label="Close drawer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className={twMerge('flex-1 overflow-y-auto', contentClassName)}>
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="px-4 py-3 border-t border-border-light">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

Drawer.propTypes = {
  /** Drawer content */
  children: PropTypes.node,
  /** Whether the drawer is open */
  isOpen: PropTypes.bool.isRequired,
  /** Function to close the drawer */
  onClose: PropTypes.func.isRequired,
  /** Drawer placement */
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  /** Drawer size */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'full']),
  /** Whether the drawer is modal (has overlay) */
  isModal: PropTypes.bool,
  /** Whether to close on ESC key press */
  closeOnEsc: PropTypes.bool,
  /** Whether to close on overlay click */
  closeOnOverlayClick: PropTypes.bool,
  /** Optional header content */
  header: PropTypes.node,
  /** Optional footer content */
  footer: PropTypes.node,
  /** Additional CSS classes for the drawer container */
  className: PropTypes.string,
  /** Additional CSS classes for the overlay */
  overlayClassName: PropTypes.string,
  /** Additional CSS classes for the content area */
  contentClassName: PropTypes.string,
};

export default Drawer;
