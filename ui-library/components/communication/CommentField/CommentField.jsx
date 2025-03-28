import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import RichTextEditor from '../../core/form-controls/RichTextEditor/RichTextEditor';

/**
 * CommentField component
 * A specialized rich text editor for adding comments in discussion threads
 * 
 * This component uses the core RichTextEditor component as part of the
 * Rich Text Standardization effort (WU-009).
 * 
 * @component
 * @example
 * ```jsx
 * <CommentField
 *   onSubmit={(comment) => handleAddComment(comment)}
 *   placeholder="Add a comment..."
 * />
 * ```
 */
const CommentField = ({
  // Value
  value = '',
  defaultValue = '',
  onChange,
  
  // Actions
  onSubmit,
  onCancel,
  onAttachFiles,
  
  // Display options
  placeholder = 'Add a comment...',
  minHeight = '60px',
  maxHeight = '200px',
  className,
  showSubmitButton = true,
  showCancelButton = false,
  showAttachButton = true,
  submitButtonText = 'Submit',
  cancelButtonText = 'Cancel',
  
  // Feature flags
  features = {
    blocks: false, // Simplified UI by default
    slashCommands: false, // Less common in comments
    links: true,
    unfurls: false,
    fileAttachments: true,
    mentions: true,
    markdown: true,
    tables: false, // Tables less common in comments
    embeds: false,
    collaboration: false,
  },
  
  // Toolbar options
  toolbar = true, // Show basic toolbar for comments
  toolbarOptions = {
    basic: true,
    formatting: false,
    lists: true,
    links: true,
    media: true,
    tables: false,
  },
  
  // State
  disabled = false,
  readOnly = false,
  
  // Other props
  ...props
}) => {
  // State for controlled/uncontrolled editor
  const [localValue, setLocalValue] = useState(defaultValue);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined;
  const editorValue = isControlled ? value : localValue;
  
  // Handle content changes
  const handleContentChange = (html) => {
    if (!isControlled) {
      setLocalValue(html);
    }
    
    if (onChange) {
      onChange(html);
    }
  };
  
  // Handle submit comment
  const handleSubmit = () => {
    if (onSubmit && editorValue.trim()) {
      onSubmit(editorValue);
      
      // Clear the editor after submitting
      if (!isControlled) {
        setLocalValue('');
      }
    }
  };
  
  // Handle cancel
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    
    // Clear the editor
    if (!isControlled) {
      setLocalValue('');
    }
  };
  
  // Handle file attachment
  const handleAttach = () => {
    if (onAttachFiles) {
      onAttachFiles();
    }
  };
  
  return (
    <div className={twMerge(
      'border border-border-medium rounded-md overflow-hidden',
      className
    )}>
      <RichTextEditor
        value={value}
        defaultValue={defaultValue}
        onChange={handleContentChange}
        placeholder={placeholder}
        minHeight={minHeight}
        maxHeight={maxHeight}
        toolbar={toolbar}
        toolbarOptions={toolbarOptions}
        disabled={disabled}
        readOnly={readOnly}
        features={features}
        {...props}
      />
      
      <div className="flex items-center justify-between p-2 border-t border-border-light bg-background-offwhite">
        {/* Attach button */}
        {showAttachButton && (
          <button
            type="button"
            className={twMerge(
              'p-2 rounded-full text-text-secondary hover:bg-background-hover transition-colors',
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            )}
            onClick={handleAttach}
            disabled={disabled || readOnly}
            aria-label="Attach files"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        
        {/* Spacer */}
        <div className="flex-1"></div>
        
        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          {/* Cancel button */}
          {showCancelButton && (
            <button
              type="button"
              className={twMerge(
                'px-4 py-1.5 rounded-md border border-border-medium hover:bg-background-hover transition-colors',
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              )}
              onClick={handleCancel}
              disabled={disabled || readOnly}
            >
              {cancelButtonText}
            </button>
          )}
          
          {/* Submit button */}
          {showSubmitButton && (
            <button
              type="button"
              className={twMerge(
                'px-4 py-1.5 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors',
                (!editorValue.trim() || disabled) ? 'opacity-50 cursor-not-allowed' : ''
              )}
              onClick={handleSubmit}
              disabled={!editorValue.trim() || disabled || readOnly}
            >
              {submitButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CommentField.propTypes = {
  /** Current HTML value (controlled) */
  value: PropTypes.string,
  /** Default HTML value (uncontrolled) */
  defaultValue: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  
  /** Handler for submitting comments */
  onSubmit: PropTypes.func,
  /** Handler for canceling comment */
  onCancel: PropTypes.func,
  /** Handler for attaching files */
  onAttachFiles: PropTypes.func,
  
  /** Placeholder text when field is empty */
  placeholder: PropTypes.string,
  /** Minimum height of the editor */
  minHeight: PropTypes.string,
  /** Maximum height of the editor */
  maxHeight: PropTypes.string,
  /** Additional CSS class for the wrapper */
  className: PropTypes.string,
  /** Whether to show the submit button */
  showSubmitButton: PropTypes.bool,
  /** Whether to show the cancel button */
  showCancelButton: PropTypes.bool,
  /** Whether to show the attach button */
  showAttachButton: PropTypes.bool,
  /** Text for the submit button */
  submitButtonText: PropTypes.string,
  /** Text for the cancel button */
  cancelButtonText: PropTypes.string,
  
  /** Feature flags */
  features: PropTypes.shape({
    /** Enable block-based editing */
    blocks: PropTypes.bool,
    /** Enable slash commands */
    slashCommands: PropTypes.bool,
    /** Enable links with previews */
    links: PropTypes.bool,
    /** Enable link unfurls */
    unfurls: PropTypes.bool,
    /** Enable file attachments */
    fileAttachments: PropTypes.bool,
    /** Enable mentions */
    mentions: PropTypes.bool,
    /** Enable markdown shortcuts */
    markdown: PropTypes.bool,
    /** Enable tables */
    tables: PropTypes.bool,
    /** Enable embeds */
    embeds: PropTypes.bool,
    /** Enable collaborative editing */
    collaboration: PropTypes.bool,
  }),
  
  /** Show toolbar */
  toolbar: PropTypes.bool,
  /** Toolbar options configuration */
  toolbarOptions: PropTypes.shape({
    /** Show basic formatting options (bold, italic, underline) */
    basic: PropTypes.bool,
    /** Show text formatting options (headings) */
    formatting: PropTypes.bool,
    /** Show list options (bullet, numbered) */
    lists: PropTypes.bool,
    /** Show link options */
    links: PropTypes.bool,
    /** Show media options (images) */
    media: PropTypes.bool,
    /** Show table options */
    tables: PropTypes.bool,
  }),
  
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Whether the field is read-only */
  readOnly: PropTypes.bool,
};

export default CommentField;
