import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import CustomField from '../../../view/CustomField/CustomField';

/**
 * FileAttachmentField component
 * A field for uploading and managing file attachments
 * 
 * @component
 * @example
 * ```jsx
 * <FileAttachmentField
 *   label="Attachments"
 *   onChange={handleFileChange}
 *   maxFiles={5}
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   accept=".pdf,.docx,.jpg,.png"
 * />
 * ```
 */
const FileAttachmentField = ({
  // Field metadata
  id,
  label,
  description,
  required = false,
  
  // Files
  files = [],
  onChange,
  
  // Restrictions
  accept,
  maxFiles = 10,
  maxSize,
  multiple = true,
  
  // Validation
  error,
  
  // Display options
  labelPosition = 'top',
  hideLabel = false,
  fullWidth = true,
  showPreview = true,
  previewSize = 'md',
  className,
  dropzoneClassName,
  
  // Upload options
  uploadText = 'Drag files here or click to browse',
  uploadIcon,
  
  // State
  disabled = false,
  readOnly = false,
  
  // Other props
  ...props
}) => {
  // State for drag-and-drop
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  
  // Refs
  const fileInputRef = useRef(null);
  
  // Handle file selection
  const handleFileSelect = (event) => {
    if (disabled || readOnly) return;
    
    const selectedFiles = Array.from(event.target.files);
    processFiles(selectedFiles);
    
    // Reset the file input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Process selected files
  const processFiles = (selectedFiles) => {
    // Check if adding these files would exceed the maxFiles limit
    if (maxFiles && files.length + selectedFiles.length > maxFiles) {
      const remainingSlots = Math.max(0, maxFiles - files.length);
      selectedFiles = selectedFiles.slice(0, remainingSlots);
      
      // Show error or notification about exceeding limit
      console.warn(`Maximum of ${maxFiles} files allowed. Only the first ${remainingSlots} files were added.`);
    }
    
    // Filter files by size if maxSize is specified
    if (maxSize) {
      selectedFiles = selectedFiles.filter(file => {
        const isValidSize = file.size <= maxSize;
        if (!isValidSize) {
          console.warn(`File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`);
        }
        return isValidSize;
      });
    }
    
    // Add new files to the existing files
    const newFiles = [...files, ...selectedFiles];
    
    // Call onChange with the new files
    if (onChange) {
      onChange(newFiles);
    }
  };
  
  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled || readOnly) return;
    
    setDragCounter(prevCount => prevCount + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragCounter(prevCount => prevCount - 1);
    if (dragCounter - 1 === 0) {
      setIsDragging(false);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled || readOnly) return;
    
    setIsDragging(false);
    setDragCounter(0);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      processFiles(droppedFiles);
      e.dataTransfer.clearData();
    }
  };
  
  // Handle file removal
  const handleRemoveFile = (index) => {
    if (disabled || readOnly) return;
    
    const newFiles = [...files];
    newFiles.splice(index, 1);
    
    if (onChange) {
      onChange(newFiles);
    }
  };
  
  // Open file browser
  const openFileBrowser = () => {
    if (disabled || readOnly) return;
    
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Format bytes to human-readable size
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  
  // Get file icon based on file type
  const getFileIcon = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    
    // Map of file extensions to icons
    const iconMap = {
      // Images
      jpg: (
        <svg className="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 5a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2H4zm0 2h16v8l-3.5-3.5a1 1 0 00-1.4 0l-3.1 3.1-1.5-1.5a1 1 0 00-1.4 0L6 16V7z" />
        </svg>
      ),
      jpeg: (
        <svg className="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 5a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2H4zm0 2h16v8l-3.5-3.5a1 1 0 00-1.4 0l-3.1 3.1-1.5-1.5a1 1 0 00-1.4 0L6 16V7z" />
        </svg>
      ),
      png: (
        <svg className="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 5a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2H4zm0 2h16v8l-3.5-3.5a1 1 0 00-1.4 0l-3.1 3.1-1.5-1.5a1 1 0 00-1.4 0L6 16V7z" />
        </svg>
      ),
      gif: (
        <svg className="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 5a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2H4zm0 2h16v8l-3.5-3.5a1 1 0 00-1.4 0l-3.1 3.1-1.5-1.5a1 1 0 00-1.4 0L6 16V7z" />
        </svg>
      ),
      
      // Documents
      pdf: (
        <svg className="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1v5h5v10H6V4h7z" />
          <path d="M10.5 11h-1v5h1v-5zm2 0h-1v5h1v-5zm-4 1.5v1h5v-1h-5z" />
        </svg>
      ),
      doc: (
        <svg className="w-6 h-6 text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1v5h5v10H6V4h7z" />
          <path d="M8 12h8v1H8v-1zm0 2h8v1H8v-1zm0 2h5v1H8v-1z" />
        </svg>
      ),
      docx: (
        <svg className="w-6 h-6 text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1v5h5v10H6V4h7z" />
          <path d="M8 12h8v1H8v-1zm0 2h8v1H8v-1zm0 2h5v1H8v-1z" />
        </svg>
      ),
      xls: (
        <svg className="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1v5h5v10H6V4h7z" />
          <path d="M8 12h3v1H8v-1zm4 0h4v1h-4v-1zm-4 2h3v1H8v-1zm4 0h4v1h-4v-1zm-4 2h3v1H8v-1zm4 0h4v1h-4v-1z" />
        </svg>
      ),
      xlsx: (
        <svg className="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1v5h5v10H6V4h7z" />
          <path d="M8 12h3v1H8v-1zm4 0h4v1h-4v-1zm-4 2h3v1H8v-1zm4 0h4v1h-4v-1zm-4 2h3v1H8v-1zm4 0h4v1h-4v-1z" />
        </svg>
      ),
      
      // Other
      zip: (
        <svg className="w-6 h-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1v5h5v10H6V4h7z" />
          <path d="M10 6h2v2h-2V6zm0 3h2v2h-2V9zm0 3h2v2h-2v-2z" />
        </svg>
      ),
    };
    
    // Return the icon for the file extension, or a default icon
    return iconMap[extension] || (
      <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1v5h5v10H6V4h7z" />
      </svg>
    );
  };
  
  // Generate image preview if file is an image
  const getImagePreview = (file) => {
    if (!file || !file.type.startsWith('image/')) return null;
    
    return URL.createObjectURL(file);
  };
  
  // Preview size classes
  const previewSizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  };
  
  return (
    <CustomField
      id={id}
      label={label}
      description={description}
      required={required}
      error={error}
      labelPosition={labelPosition}
      hideLabel={hideLabel}
      fullWidth={fullWidth}
      className={className}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || readOnly}
        {...props}
      />
      
      {/* Dropzone */}
      <div
        className={twMerge(
          'border-2 border-dashed rounded-md p-4 transition-colors',
          isDragging ? 'border-primary bg-primary/5' : 'border-border-medium',
          disabled ? 'bg-background-offwhite cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-background-hover',
          error ? 'border-status-live' : '',
          dropzoneClassName
        )}
        onClick={openFileBrowser}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled || readOnly ? -1 : 0}
        aria-disabled={disabled || readOnly}
      >
        <div className="flex flex-col items-center justify-center py-4">
          {/* Upload icon */}
          {uploadIcon || (
            <svg className="w-10 h-10 text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          )}
          
          {/* Upload text */}
          <p className="text-sm text-text-secondary">{uploadText}</p>
          
          {/* File restrictions */}
          {(accept || maxSize) && (
            <div className="mt-2 text-xs text-text-secondary">
              {accept && <p>Accepted file types: {accept.replace(/\./g, ' ')}</p>}
              {maxSize && <p>Maximum file size: {formatBytes(maxSize)}</p>}
              {maxFiles && <p>Maximum files: {maxFiles}</p>}
            </div>
          )}
        </div>
      </div>
      
      {/* File list */}
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, index) => (
            <li 
              key={`${file.name}-${index}`}
              className="flex items-center p-2 border rounded-md bg-background-offwhite"
            >
              {/* Preview or icon */}
              {showPreview && file.type.startsWith('image/') ? (
                <div className={twMerge('rounded overflow-hidden mr-3', previewSizeClasses[previewSize] || previewSizeClasses.md)}>
                  <img 
                    src={getImagePreview(file)} 
                    alt={file.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="mr-3">
                  {getFileIcon(file)}
                </div>
              )}
              
              {/* File info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-text-secondary">{formatBytes(file.size)}</p>
              </div>
              
              {/* Remove button */}
              {!disabled && !readOnly && (
                <button
                  type="button"
                  className="ml-2 p-1 text-text-secondary hover:text-status-live rounded-full hover:bg-background-hover"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                  aria-label={`Remove ${file.name}`}
                >
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </CustomField>
  );
};

FileAttachmentField.propTypes = {
  /** Unique ID for the field */
  id: PropTypes.string,
  /** Field label */
  label: PropTypes.node,
  /** Additional description text */
  description: PropTypes.node,
  /** Whether the field is required */
  required: PropTypes.bool,
  
  /** Array of selected files */
  files: PropTypes.arrayOf(PropTypes.instanceOf(File)),
  /** Change handler */
  onChange: PropTypes.func,
  
  /** Accepted file types */
  accept: PropTypes.string,
  /** Maximum number of files allowed */
  maxFiles: PropTypes.number,
  /** Maximum file size in bytes */
  maxSize: PropTypes.number,
  /** Whether multiple files can be selected */
  multiple: PropTypes.bool,
  
  /** Error message */
  error: PropTypes.node,
  
  /** Label position relative to input */
  labelPosition: PropTypes.oneOf(['top', 'inline']),
  /** Whether to hide the label */
  hideLabel: PropTypes.bool,
  /** Whether the field takes up full width */
  fullWidth: PropTypes.bool,
  /** Whether to show image previews */
  showPreview: PropTypes.bool,
  /** Size of preview thumbnails */
  previewSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Additional CSS class for the wrapper */
  className: PropTypes.string,
  /** Additional CSS class for the dropzone */
  dropzoneClassName: PropTypes.string,
  
  /** Text to display in the upload area */
  uploadText: PropTypes.string,
  /** Custom upload icon */
  uploadIcon: PropTypes.node,
  
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Whether the field is read-only */
  readOnly: PropTypes.bool,
};

export default FileAttachmentField;
