import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

// Context for managing toasts
const ToastContext = createContext({
  addToast: () => {},
  removeToast: () => {},
  toasts: [],
});

/**
 * Toast item component
 * Individual toast notification
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
export const ToastItem = ({
  id,
  title,
  message,
  type = 'info',
  icon,
  autoClose = true,
  autoCloseDelay = 5000,
  showProgress = true,
  onClose,
  className,
}) => {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(false);
  
  // Fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle auto-close
  useEffect(() => {
    if (autoClose) {
      const startTime = Date.now();
      const endTime = startTime + autoCloseDelay;
      
      const progressInterval = setInterval(() => {
        const now = Date.now();
        const remaining = endTime - now;
        const calculatedProgress = (remaining / autoCloseDelay) * 100;
        
        if (calculatedProgress <= 0) {
          clearInterval(progressInterval);
          setProgress(0);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              onClose(id);
            }, 300);
          }, 50);
        } else {
          setProgress(calculatedProgress);
        }
      }, 10);
      
      return () => clearInterval(progressInterval);
    }
  }, [autoClose, autoCloseDelay, id, onClose]);
  
  // Handle manual close
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose(id);
    }, 300);
  }, [id, onClose]);
  
  // Handle type icon
  const getTypeIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };
  
  // Type-based appearance
  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-status-live bg-opacity-10 border-status-live border-opacity-20 text-status-live';
      case 'error':
        return 'bg-status-copywriting bg-opacity-10 border-status-copywriting border-opacity-20 text-status-copywriting';
      case 'warning':
        return 'bg-status-campaign bg-opacity-10 border-status-campaign border-opacity-20 text-status-campaign';
      case 'info':
      default:
        return 'bg-info bg-opacity-10 border-info border-opacity-20 text-info';
    }
  };
  
  // Icon color based on type
  const getIconTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'text-status-live';
      case 'error':
        return 'text-status-copywriting';
      case 'warning':
        return 'text-status-campaign';
      case 'info':
      default:
        return 'text-info';
    }
  };
  
  // Progress bar color based on type
  const getProgressTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-status-live';
      case 'error':
        return 'bg-status-copywriting';
      case 'warning':
        return 'bg-status-campaign';
      case 'info':
      default:
        return 'bg-info';
    }
  };
  
  return (
    <div
      className={twMerge(
        'relative overflow-hidden border rounded-md shadow-lg transition-all duration-300 transform',
        getTypeClasses(),
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
        'max-w-md w-full',
        className
      )}
    >
      <div className="flex p-4">
        {/* Icon */}
        <div className={twMerge('flex-shrink-0', getIconTypeClasses())}>
          {getTypeIcon()}
        </div>
        
        {/* Content */}
        <div className="ml-3 mr-8 flex-1">
          {title && (
            <div className="font-medium">{title}</div>
          )}
          {message && (
            <div className={title ? 'mt-1 text-sm opacity-90' : ''}>
              {message}
            </div>
          )}
        </div>
        
        {/* Close button */}
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex text-text-secondary hover:text-text-primary focus:outline-none"
          onClick={handleClose}
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Progress bar */}
      {autoClose && showProgress && (
        <div
          className="h-1 transition-all ease-linear"
          style={{ width: `${progress}%` }}
          role="progressbar" 
          aria-valuemin="0" 
          aria-valuemax="100"
          aria-valuenow={progress}
        >
          <div className={twMerge('h-full', getProgressTypeClasses())} />
        </div>
      )}
    </div>
  );
};

ToastItem.propTypes = {
  /** Unique ID of the toast */
  id: PropTypes.string.isRequired,
  
  /** Title of the toast (optional) */
  title: PropTypes.node,
  
  /** Main message content of the toast */
  message: PropTypes.node,
  
  /** Type of the toast, affects styling */
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  
  /** Custom icon to display instead of the default type-based icon */
  icon: PropTypes.node,
  
  /** Whether to automatically close the toast after a delay */
  autoClose: PropTypes.bool,
  
  /** Time in milliseconds before auto-closing the toast */
  autoCloseDelay: PropTypes.number,
  
  /** Whether to show the progress bar */
  showProgress: PropTypes.bool,
  
  /** Called when the toast is closed */
  onClose: PropTypes.func.isRequired,
  
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Toast container component
 * Displays and manages toast notifications
 */
export const ToastContainer = ({
  position = 'top-right',
  className,
  toastClassName,
  containerClassName,
  limit,
  children,
}) => {
  const { toasts } = useContext(ToastContext);
  
  // Get position-based classes
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0';
      case 'top-center':
        return 'top-0 left-1/2 transform -translate-x-1/2';
      case 'top-right':
        return 'top-0 right-0';
      case 'bottom-left':
        return 'bottom-0 left-0';
      case 'bottom-center':
        return 'bottom-0 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-0 right-0';
      default:
        return 'top-0 right-0';
    }
  };
  
  // Limit the number of visible toasts if specified
  const visibleToasts = limit ? toasts.slice(0, limit) : toasts;
  
  // Get layout direction based on position
  const getLayoutClasses = () => {
    return position.includes('bottom') ? 'flex-col-reverse' : 'flex-col';
  };
  
  return (
    <div
      className={twMerge(
        'fixed z-50 p-4 max-h-screen overflow-hidden pointer-events-none',
        getPositionClasses(),
        className
      )}
      role="log"
      aria-live="polite"
    >
      <div
        className={twMerge(
          'flex gap-3 transition-all',
          getLayoutClasses(),
          containerClassName
        )}
      >
        {visibleToasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto w-full max-w-sm"
          >
            <ToastItem
              {...toast}
              className={twMerge(toastClassName, toast.className)}
            />
          </div>
        ))}
        {children}
      </div>
    </div>
  );
};

ToastContainer.propTypes = {
  /** Position of the toast container on the screen */
  position: PropTypes.oneOf([
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ]),
  
  /** Additional CSS classes for the container */
  className: PropTypes.string,
  
  /** CSS classes applied to all toast items */
  toastClassName: PropTypes.string,
  
  /** CSS classes for the inner container */
  containerClassName: PropTypes.string,
  
  /** Maximum number of toasts to display at once */
  limit: PropTypes.number,
  
  /** Additional content to render in the container */
  children: PropTypes.node,
};

/**
 * ToastProvider component
 * Provides the context for toast management
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  // Add a new toast
  const addToast = useCallback((toast) => {
    const id = toast.id || `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        ...toast,
        id,
      },
    ]);
    
    return id;
  }, []);
  
  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);
  
  const contextValue = {
    toasts,
    addToast,
    removeToast,
  };
  
  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  /** Child components */
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook for using the toast system
 * @returns {Object} Toast utility functions
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  // Convenience methods for different toast types
  const toast = {
    show: (options) => context.addToast({ type: 'info', ...options }),
    info: (options) => context.addToast({ type: 'info', ...options }),
    success: (options) => context.addToast({ type: 'success', ...options }),
    warning: (options) => context.addToast({ type: 'warning', ...options }),
    error: (options) => context.addToast({ type: 'error', ...options }),
    remove: (id) => context.removeToast(id),
    removeAll: () => context.toasts.forEach((toast) => context.removeToast(toast.id)),
  };
  
  return toast;
};

/**
 * Toast component
 * Used for creating and displaying toast notifications
 */
const Toast = {
  Provider: ToastProvider,
  Container: ToastContainer,
  Item: ToastItem,
  useToast,
};

export default Toast;
