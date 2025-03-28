import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import RichTextEditor from '../../core/form-controls/RichTextEditor/RichTextEditor';

/**
 * MessageComposer component
 * A specialized rich text editor for composing messages in chat interfaces
 * 
 * This component uses the core RichTextEditor component as part of the
 * Rich Text Standardization effort (WU-009).
 * 
 * @component
 * @example
 * ```jsx
 * <MessageComposer
 *   onSend={(message) => handleSendMessage(message)}
 *   placeholder="Type a message..."
 * />
 * ```
 */
const MessageComposer = ({
  // Value
  value = '',
  defaultValue = '',
  onChange,
  
  // Actions
  onSend,
  onAttachFiles,
  
  // Display options
  placeholder = 'Type a message...',
  minHeight = '60px',
  maxHeight = '200px',
  className,
  showSendButton = true,
  showAttachButton = true,
  
  // Feature flags
  features = {
    blocks: false, // Simplified UI by default
    slashCommands: true,
    links: true,
    unfurls: true,
    fileAttachments: true,
    mentions: true,
    markdown: true,
    tables: false, // Tables less common in messages
    embeds: true,
    collaboration: false,
  },
  
  // Toolbar options
  toolbar = false, // Hide toolbar by default for cleaner UI
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
  
  // Handle send message
  const handleSend = () => {
    if (onSend && editorValue.trim()) {
      onSend(editorValue);
      
      // Clear the editor after sending
      if (!isControlled) {
        setLocalValue('');
      }
    }
  };
  
  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
        onKeyDown={handleKeyDown}
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
        
        {/* Send button */}
        {showSendButton && (
          <button
            type="button"
            className={twMerge(
              'px-4 py-1.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors',
              (!editorValue.trim() || disabled) ? 'opacity-50 cursor-not-allowed' : ''
            )}
            onClick={handleSend}
            disabled={!editorValue.trim() || disabled || readOnly}
            aria-label="Send message"
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
};

MessageComposer.propTypes = {
  /** Current HTML value (controlled) */
  value: PropTypes.string,
  /** Default HTML value (uncontrolled) */
  defaultValue: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  
  /** Handler for sending messages */
  onSend: PropTypes.func,
  /** Handler for attaching files */
  onAttachFiles: PropTypes.func,
  
  /** Placeholder text when composer is empty */
  placeholder: PropTypes.string,
  /** Minimum height of the editor */
  minHeight: PropTypes.string,
  /** Maximum height of the editor */
  maxHeight: PropTypes.string,
  /** Additional CSS class for the wrapper */
  className: PropTypes.string,
  /** Whether to show the send button */
  showSendButton: PropTypes.bool,
  /** Whether to show the attach button */
  showAttachButton: PropTypes.bool,
  
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
  
  /** Whether the composer is disabled */
  disabled: PropTypes.bool,
  /** Whether the composer is read-only */
  readOnly: PropTypes.bool,
};

export default MessageComposer;
