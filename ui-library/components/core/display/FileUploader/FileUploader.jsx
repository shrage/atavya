import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '../../form-controls/Button';

/**
 * FileUploader component for handling file uploads with drag and drop functionality
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * Leverages the Button component for actions to maintain UI consistency.
 */
const FileUploader = ({
  accept = '*/*',
  multiple = false,
  maxSize = 10485760, // 10MB default
  maxFiles = 10,
  disabled = false,
  onChange,
  onError,
  value = [],
  preview = true,
  previewSize = 'md',
  previewType = 'grid',
  showFileSize = true,
  uploadIcon,
  uploadText = 'Drag and drop files here, or click to browse',
  uploadSubText = 'Supports all file types up to 10MB',
  buttonText = 'Browse Files',
  variant = 'bordered',
  className = '',
}) => {
  // Internal state for drag status
  const [isDragging, setIsDragging] = useState(false);
  const [internalFiles, setInternalFiles] = useState(value || []);
  
  // Refs
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  
  // Helper to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };
  
  // Handle file validation
  const validateFiles = (files) => {
    const validFiles = [];
    const errors = [];
    
    // Convert FileList to array
    const fileArray = Array.from(files);
    
    // Check max files
    if (!multiple && fileArray.length > 1) {
      errors.push({ type: 'multiple', message: 'Only one file can be uploaded' });
      fileArray.splice(1); // Keep only the first file
    }
    
    // Check if adding these files would exceed maxFiles
    if (multiple && internalFiles.length + fileArray.length > maxFiles) {
      errors.push({ 
        type: 'maxFiles', 
        message: `Cannot upload more than ${maxFiles} files` 
      });
      fileArray.splice(0, maxFiles - internalFiles.length);
    }
    
    // Process each file
    fileArray.forEach(file => {
      // Check file size
      if (file.size > maxSize) {
        errors.push({ 
          type: 'size', 
          file, 
          message: `File ${file.name} exceeds maximum size of ${formatFileSize(maxSize)}` 
        });
        return;
      }
      
      // Check file type if accept is specified
      if (accept !== '*/*') {
        const acceptTypes = accept.split(',').map(type => type.trim());
        const fileType = file.type;
        const fileExtension = `.${file.name.split('.').pop()}`;
        
        // Check if the file type or extension is in the accepted list
        const isAccepted = acceptTypes.some(type => {
          if (type.startsWith('.')) {
            // Extension check
            return type.toLowerCase() === fileExtension.toLowerCase();
          } else if (type.includes('/*')) {
            // Mime group check (e.g., 'image/*')
            const mimeGroup = type.split('/')[0];
            return fileType.startsWith(`${mimeGroup}/`);
          } else {
            // Exact mime type check
            return type === fileType;
          }
        });
        
        if (!isAccepted) {
          errors.push({ 
            type: 'type', 
            file, 
            message: `File ${file.name} is not an accepted file type` 
          });
          return;
        }
      }
      
      // Generate preview URL for images
      if (preview && file.type.startsWith('image/')) {
        file.preview = URL.createObjectURL(file);
      }
      
      // Add file to valid files
      validFiles.push(file);
    });
    
    return { validFiles, errors };
  };
  
  // Handle file selection
  const handleFiles = useCallback((files) => {
    if (disabled) return;
    
    const { validFiles, errors } = validateFiles(files);
    
    // Update internal state
    if (validFiles.length > 0) {
      const newFiles = multiple 
        ? [...internalFiles, ...validFiles]
        : [...validFiles];
      
      setInternalFiles(newFiles);
      
      // Call onChange with all files
      if (onChange) {
        onChange(newFiles);
      }
    }
    
    // Report errors
    if (errors.length > 0 && onError) {
      onError(errors);
    }
  }, [disabled, multiple, maxSize, accept, onChange, onError, internalFiles, maxFiles]);
  
  // Handle file input change
  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files?.length) {
      handleFiles(files);
    }
    
    // Reset the input value so the same file can be uploaded again if removed
    e.target.value = '';
  };
  
  // Handle click on drop zone
  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    // Handle dragging state
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave' || e.type === 'drop') {
      setIsDragging(false);
    }
  }, [disabled]);
  
  // Handle drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    setIsDragging(false);
    
    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  }, [disabled, handleFiles]);
  
  // Handle file removal
  const handleRemoveFile = (index) => {
    if (disabled) return;
    
    const newFiles = [...internalFiles];
    
    // Revoke object URL if it exists
    if (newFiles[index].preview) {
      URL.revokeObjectURL(newFiles[index].preview);
    }
    
    newFiles.splice(index, 1);
    setInternalFiles(newFiles);
    
    if (onChange) {
      onChange(newFiles);
    }
  };
  
  // Clean up object URLs on unmount
  React.useEffect(() => {
    return () => {
      internalFiles.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [internalFiles]);
  
  // Variant styles
  const variantStyles = {
    bordered: `
      border-2 border-dashed rounded-lg
      ${isDragging ? 'border-primary bg-primary-light dark:bg-primary/20' : 'border-border-medium dark:border-gray-700'}
    `,
    minimal: `
      ${isDragging ? 'bg-primary-light dark:bg-primary/20' : 'bg-background-hover dark:bg-gray-800/50'}
      rounded-lg
    `,
    solid: `
      border border-border-light dark:border-gray-700 rounded-lg
      ${isDragging ? 'bg-primary-light dark:bg-primary/20' : 'bg-white dark:bg-gray-800'}
      shadow-sm
    `,
  };
  
  // Size classes for previews
  const previewSizeClasses = {
    sm: {
      container: 'h-12 w-12',
      icon: 'w-4 h-4',
      fontSize: 'text-xs',
    },
    md: {
      container: 'h-16 w-16',
      icon: 'w-5 h-5',
      fontSize: 'text-sm',
    },
    lg: {
      container: 'h-20 w-20',
      icon: 'w-6 h-6',
      fontSize: 'text-base',
    },
  };
  
  const currentPreviewSize = previewSizeClasses[previewSize] || previewSizeClasses.md;
  
  // Default upload icon
  const defaultUploadIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );
  
  // Get generic file icon based on file type
  const getFileIcon = (file) => {
    const fileType = file.type.split('/')[0];
    
    switch (fileType) {
      case 'image':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${currentPreviewSize.icon} text-blue-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${currentPreviewSize.icon} text-purple-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'audio':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${currentPreviewSize.icon} text-green-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      case 'application':
        if (file.type.includes('pdf')) {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" className={`${currentPreviewSize.icon} text-red-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          );
        } else {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" className={`${currentPreviewSize.icon} text-text-secondary`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          );
        }
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${currentPreviewSize.icon} text-text-secondary`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
        );
    }
  };
  
  // Generate file previews
  const renderPreviews = () => {
    if (!preview || internalFiles.length === 0) return null;
    
    // Grid or list layout
    const layoutClass = previewType === 'grid' 
      ? 'grid grid-cols-2 md:grid-cols-4 gap-4'
      : 'space-y-2';
    
    return (
      <div className={`mt-4 ${layoutClass}`}>
        {internalFiles.map((file, index) => (
          <div 
            key={`${file.name}-${index}`}
            className={`
              ${previewType === 'grid' ? '' : 'flex items-center space-x-3'}
              relative group
            `}
          >
            {/* File preview */}
            <div 
              className={`
                ${previewType === 'grid' ? '' : 'flex-shrink-0'}
                ${currentPreviewSize.container}
                bg-background-offwhite dark:bg-gray-800
                border border-border-light dark:border-gray-700
                rounded-lg overflow-hidden
                flex items-center justify-center
              `}
            >
              {file.preview ? (
                <img 
                  src={file.preview} 
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                getFileIcon(file)
              )}
            </div>
            
            {/* File info */}
            <div className={`${previewType === 'grid' ? 'mt-1' : 'flex-grow min-w-0'}`}>
              <p className={`truncate ${currentPreviewSize.fontSize}`}>
                {file.name}
              </p>
              {showFileSize && (
                <p className={`text-text-secondary dark:text-gray-400 ${currentPreviewSize.fontSize === 'text-xs' ? 'text-xs' : 'text-xs'}`}>
                  {formatFileSize(file.size)}
                </p>
              )}
            </div>
            
            {/* Remove button */}
            <button
              type="button"
              onClick={() => handleRemoveFile(index)}
              className={`
                ${previewType === 'grid' ? 'absolute top-0 right-0 -mt-2 -mr-2' : 'flex-shrink-0'}
                w-5 h-5
                bg-background-offwhite dark:bg-gray-800
                text-text-secondary hover:text-status-live
                rounded-full
                flex items-center justify-center
                focus:outline-none
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              `}
              disabled={disabled}
              aria-label="Remove file"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className={className}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        disabled={disabled}
        className="hidden"
        aria-hidden="true"
      />
      
      {/* Drop zone */}
      <div
        ref={dropZoneRef}
        className={`
          ${variantStyles[variant] || variantStyles.bordered}
          p-6
          transition-colors duration-200
          ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        aria-disabled={disabled}
      >
        <div className="text-center">
          {/* Upload icon */}
          <div className="mx-auto">
            {uploadIcon || defaultUploadIcon}
          </div>
          
          {/* Upload text */}
          <p className="mt-2 text-sm font-medium text-text-primary dark:text-gray-300">
            {uploadText}
          </p>
          
          {/* Upload subtext */}
          {uploadSubText && (
            <p className="mt-1 text-xs text-text-secondary dark:text-gray-400">
              {uploadSubText}
            </p>
          )}
          
          {/* Browse button */}
          {buttonText && (
            <Button
              variant="primary"
              size="sm"
              disabled={disabled}
              className="mt-3"
              onClick={null} // The parent div already has the click handler
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
      
      {/* File previews */}
      {renderPreviews()}
    </div>
  );
};

FileUploader.propTypes = {
  /** Accepted file types */
  accept: PropTypes.string,
  /** Whether multiple files can be uploaded */
  multiple: PropTypes.bool,
  /** Maximum file size in bytes */
  maxSize: PropTypes.number,
  /** Maximum number of files (for multiple) */
  maxFiles: PropTypes.number,
  /** Whether the uploader is disabled */
  disabled: PropTypes.bool,
  /** Callback when files change */
  onChange: PropTypes.func,
  /** Callback when validation errors occur */
  onError: PropTypes.func,
  /** Controlled value for files */
  value: PropTypes.array,
  /** Whether to show file previews */
  preview: PropTypes.bool,
  /** Size of preview thumbnails */
  previewSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Layout for previews */
  previewType: PropTypes.oneOf(['grid', 'list']),
  /** Whether to show file size in preview */
  showFileSize: PropTypes.bool,
  /** Custom upload icon */
  uploadIcon: PropTypes.node,
  /** Main upload text */
  uploadText: PropTypes.string,
  /** Secondary upload text */
  uploadSubText: PropTypes.string,
  /** Button text */
  buttonText: PropTypes.string,
  /** Visual variant */
  variant: PropTypes.oneOf(['bordered', 'minimal', 'solid']),
  /** Additional classes */
  className: PropTypes.string,
};

export default FileUploader;
