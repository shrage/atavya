import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * FileInput component
 * 
 * A component for selecting files from the file system.
 * Uses Tailwind theme colors for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <FileInput
 *   onChange={handleFileChange}
 *   label="Upload document"
 *   accept=".pdf,.docx"
 * />
 * ```
 */
const FileInput = ({
  id,
  name,
  accept,
  multiple = false,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB default
  disabled = false,
  required = false,
  label,
  error,
  helperText,
  buttonText = 'Choose file',
  placeholder = 'No file chosen',
  onChange,
  onError,
  className,
  ...props
}) => {
  const fileInputId = id || `file-input-${Math.random().toString(36).substr(2, 9)}`;
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  
  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const validateFiles = (fileList) => {
    // Check number of files
    if (multiple && fileList.length > maxFiles) {
      return `You can only upload up to ${maxFiles} files`;
    }
    
    // Check file size
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].size > maxSize) {
        return `File "${fileList[i].name}" exceeds the maximum size of ${formatFileSize(maxSize)}`;
      }
    }
    
    return '';
  };
  
  const handleChange = (e) => {
    const fileList = Array.from(e.target.files || []);
    
    // Validate files
    const validationError = validateFiles(fileList);
    setFileError(validationError);
    
    if (validationError) {
      if (onError) {
        onError(validationError);
      }
      return;
    }
    
    setFiles(fileList);
    
    if (onChange) {
      onChange({
        target: {
          name,
          files: fileList,
          value: fileList,
          type: 'file'
        }
      });
    }
  };
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const displayValue = () => {
    if (files.length === 0) {
      return placeholder;
    } else if (files.length === 1) {
      return files[0].name;
    } else {
      return `${files.length} files selected`;
    }
  };
  
  // Combine error from props and validation
  const combinedError = error || fileError;
  
  return (
    <div className={twMerge('w-full', className)}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={fileInputId}
          className={twMerge(
            'block text-sm font-medium mb-1',
            disabled ? 'text-text-tertiary' : 'text-text-primary',
            combinedError && 'text-status-live'
          )}
        >
          {label}
          {required && <span className="ml-1 text-status-live">*</span>}
        </label>
      )}
      
      {/* File input control */}
      <div className="flex">
        <input
          ref={fileInputRef}
          id={fileInputId}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          className="sr-only"
          {...props}
        />
        
        <button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          className={twMerge(
            'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-l-md shadow-sm',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            disabled 
              ? 'bg-gray-200 text-text-tertiary cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-primary-dark focus:ring-primary'
          )}
        >
          {buttonText}
        </button>
        
        <div
          className={twMerge(
            'flex-1 px-3 py-2 border border-l-0 rounded-r-md text-sm',
            combinedError 
              ? 'border-status-live text-status-live' 
              : 'border-border-medium text-text-secondary',
            disabled && 'bg-gray-50 text-text-tertiary'
          )}
        >
          {displayValue()}
        </div>
      </div>
      
      {/* File list for multiple files */}
      {multiple && files.length > 0 && (
        <ul className="mt-2 space-y-1">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="text-sm text-text-secondary flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1 text-text-tertiary" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              <span className="truncate max-w-xs">{file.name}</span>
              <span className="ml-1 text-text-tertiary">({formatFileSize(file.size)})</span>
            </li>
          ))}
        </ul>
      )}
      
      {/* Helper text or error message */}
      {(helperText || combinedError) && (
        <p 
          className={twMerge(
            'mt-1 text-sm',
            combinedError ? 'text-status-live' : 'text-text-secondary'
          )}
        >
          {combinedError || helperText}
        </p>
      )}
    </div>
  );
};

FileInput.propTypes = {
  /** Unique ID for the file input */
  id: PropTypes.string,
  /** Name attribute for the file input */
  name: PropTypes.string,
  /** File types to accept (e.g., ".jpg,.png") */
  accept: PropTypes.string,
  /** Whether to allow multiple file selection */
  multiple: PropTypes.bool,
  /** Maximum number of files allowed (when multiple is true) */
  maxFiles: PropTypes.number,
  /** Maximum file size in bytes */
  maxSize: PropTypes.number,
  /** Whether the file input is disabled */
  disabled: PropTypes.bool,
  /** Whether the file input is required */
  required: PropTypes.bool,
  /** Label for the file input */
  label: PropTypes.node,
  /** Error message */
  error: PropTypes.string,
  /** Helper text to display below the file input */
  helperText: PropTypes.node,
  /** Text for the button */
  buttonText: PropTypes.string,
  /** Placeholder text when no file is selected */
  placeholder: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  /** Error handler */
  onError: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default FileInput;
