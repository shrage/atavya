import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Modal component
 * Displays content in a modal/dialog overlay
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <Modal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   title="Create New Task"
 * >
 *   <p>Modal content goes here</p>
 * </Modal>
 * ```
 */
const Modal = ({
  // State
  isOpen,
  onClose,
  
  // Content
  title,
  children,
  footer,
  
  // Configuration
  size = 'medium',
  closeOnEsc = true,
  closeOnOverlayClick = true,
  showCloseButton = true,
  centered = true,
  scrollable = true,
  
  // Customization
  className,
  overlayClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  closeButtonClassName,
  
  // Animation
  animationDuration = 200,
  
  // Accessibility
  ariaLabelledBy,
  ariaDescribedBy,
}) => {
  // Refs
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);
  
  // Determine size class
  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg',
    xlarge: 'max-w-xl',
    xxlarge: 'max-w-2xl',
    xxxlarge: 'max-w-3xl',
    full: 'max-w-full mx-2',
  };
  
  // Ensure accessibility on mount/unmount
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element so we can restore it when the modal closes
      previousActiveElement.current = document.activeElement;
      
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Focus on the modal when it opens
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Restore body scroll and focus when modal closes
      return () => {
        document.body.style.overflow = '';
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen]);
  
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && closeOnEsc) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);
  
  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Handle close button click
  const handleCloseClick = () => {
    onClose();
  };
  
  // If not open, don't render anything
  if (!isOpen) {
    return null;
  }
  
  return (
    <div
      className={twMerge(
        "fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black bg-opacity-50 transition-opacity",
        centered && "items-center",
        `duration-${animationDuration}`,
        overlayClassName
      )}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby={ariaLabelledBy || 'modal-title'}
      aria-describedby={ariaDescribedBy}
    >
      <div
        ref={modalRef}
        className={twMerge(
          "relative bg-white rounded-lg shadow-xl transform transition-transform p-0",
          sizeClasses[size],
          scrollable ? "max-h-[90vh] flex flex-col" : "",
          `duration-${animationDuration}`,
          className
        )}
        tabIndex={-1}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className={twMerge(
              "flex justify-between items-center p-4 border-b border-border-light",
              headerClassName
            )}
          >
            {title && (
              <h3
                id={ariaLabelledBy || 'modal-title'}
                className="text-lg font-semibold text-text-primary"
              >
                {title}
              </h3>
            )}
            
            {showCloseButton && (
              <button
                type="button"
                className={twMerge(
                  "text-text-secondary bg-transparent hover:bg-background-hover hover:text-text-primary rounded-lg p-1.5 inline-flex items-center",
                  closeButtonClassName
                )}
                onClick={handleCloseClick}
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Body */}
        <div
          className={twMerge(
            "p-4",
            scrollable ? "overflow-y-auto" : "",
            bodyClassName
          )}
        >
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div
            className={twMerge(
              "p-4 border-t border-border-light",
              footerClassName
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  /** Whether the modal is visible */
  isOpen: PropTypes.bool.isRequired,
  
  /** Called when the modal is closed */
  onClose: PropTypes.func.isRequired,
  
  /** Modal title */
  title: PropTypes.node,
  
  /** Modal content */
  children: PropTypes.node,
  
  /** Modal footer content */
  footer: PropTypes.node,
  
  /** Modal size */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge', 'full']),
  
  /** Whether to close the modal when ESC key is pressed */
  closeOnEsc: PropTypes.bool,
  
  /** Whether to close the modal when clicking the overlay */
  closeOnOverlayClick: PropTypes.bool,
  
  /** Whether to show the close button */
  showCloseButton: PropTypes.bool,
  
  /** Whether to center the modal vertically */
  centered: PropTypes.bool,
  
  /** Whether the modal body is scrollable */
  scrollable: PropTypes.bool,
  
  /** Additional CSS classes for the modal */
  className: PropTypes.string,
  
  /** CSS classes for the overlay */
  overlayClassName: PropTypes.string,
  
  /** CSS classes for the header */
  headerClassName: PropTypes.string,
  
  /** CSS classes for the body */
  bodyClassName: PropTypes.string,
  
  /** CSS classes for the footer */
  footerClassName: PropTypes.string,
  
  /** CSS classes for the close button */
  closeButtonClassName: PropTypes.string,
  
  /** Animation duration in milliseconds */
  animationDuration: PropTypes.number,
  
  /** ID of the element that labels the modal */
  ariaLabelledBy: PropTypes.string,
  
  /** ID of the element that describes the modal */
  ariaDescribedBy: PropTypes.string,
};

export default Modal;
