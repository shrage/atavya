import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import RichTextEditor from '../../form-controls/RichTextEditor/RichTextEditor';

/**
 * InlineEditableText component
 * A component that displays text that can be edited inline
 * 
 * This component uses the core RichTextEditor component as part of the
 * Rich Text Standardization effort (WU-009).
 * 
 * @component
 * @example
 * ```jsx
 * <InlineEditableText
 *   value="<p>Click to edit this text</p>"
 *   onChange={handleTextChange}
 * />
 * ```
 */
const InlineEditableText = ({
  // Value
  value = '',
  defaultValue = '',
  onChange,
  
  // Display options
  placeholder = 'Click to edit...',
  className,
  viewClassName,
  editClassName,
  
  // Typography
  as = 'div',
  size = 'md',
  
  // Edit mode options
  clickToEdit = true,
  doubleClickToEdit = false,
  showEditButton = false,
  editButtonPosition = 'right', // 'right', 'left'
  editIcon = null,
  saveOnBlur = true,
  saveOnEnter = true,
  cancelOnEscape = true,
  
  // Feature flags for RichTextEditor
  features = {
    blocks: false, // Simplified UI by default
    slashCommands: false,
    links: true,
    unfurls: false,
    fileAttachments: false,
    mentions: false,
    markdown: true,
    tables: false,
    embeds: false,
    collaboration: false,
  },
  
  // Toolbar options
  toolbar = false, // Hide toolbar by default for cleaner UI
  toolbarOptions = {
    basic: true,
    formatting: false,
    lists: false,
    links: false,
    media: false,
    tables: false,
  },
  
  // State
  disabled = false,
  readOnly = false,
  
  // Callbacks
  onEdit = null,
  onSave = null,
  onCancel = null,
  
  // Other props
  ...props
}) => {
  // State for controlled/uncontrolled component
  const [localValue, setLocalValue] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState('');
  
  // Refs
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined;
  const displayValue = isControlled ? value : localValue;
  
  // Size classes
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };
  
  // Default edit icon
  const defaultEditIcon = (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
  );
  
  // Enter edit mode
  const startEditing = () => {
    if (disabled || readOnly) return;
    
    setIsEditing(true);
    setEditedValue(displayValue);
    
    if (onEdit) {
      onEdit();
    }
  };
  
  // Save changes
  const saveChanges = () => {
    setIsEditing(false);
    
    if (!isControlled) {
      setLocalValue(editedValue);
    }
    
    if (onChange) {
      onChange(editedValue);
    }
    
    if (onSave) {
      onSave(editedValue);
    }
  };
  
  // Cancel editing
  const cancelEditing = () => {
    setIsEditing(false);
    
    if (onCancel) {
      onCancel();
    }
  };
  
  // Handle editor content changes
  const handleContentChange = (html) => {
    setEditedValue(html);
  };
  
  // Handle key events
  const handleKeyDown = (e) => {
    if (saveOnEnter && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveChanges();
    }
    
    if (cancelOnEscape && e.key === 'Escape') {
      e.preventDefault();
      cancelEditing();
    }
  };
  
  // Handle click outside to save
  useEffect(() => {
    if (!isEditing || !saveOnBlur) return;
    
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        saveChanges();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, saveOnBlur, editedValue]);
  
  // Focus the editor when entering edit mode
  useEffect(() => {
    if (isEditing && editorRef.current) {
      // Focus the editor
      setTimeout(() => {
        const editorElement = editorRef.current.querySelector('[role="textbox"]');
        if (editorElement) {
          editorElement.focus();
        }
      }, 0);
    }
  }, [isEditing]);
  
  // Render the component based on mode
  const ViewComponent = as;
  
  // Determine click handlers
  const viewClickHandlers = {};
  if (clickToEdit) {
    viewClickHandlers.onClick = startEditing;
  }
  if (doubleClickToEdit) {
    viewClickHandlers.onDoubleClick = startEditing;
  }
  
  return (
    <div
      ref={containerRef}
      className={twMerge(
        'relative group',
        disabled ? 'opacity-60 cursor-not-allowed' : '',
        className
      )}
      {...props}
    >
      {/* View mode */}
      {!isEditing && (
        <div className="relative">
          <ViewComponent
            className={twMerge(
              'inline-block min-w-[1em] min-h-[1em]',
              sizeClasses[size],
              !displayValue && 'text-text-secondary italic',
              !disabled && !readOnly && 'cursor-pointer hover:bg-background-hover/20',
              viewClassName
            )}
            {...viewClickHandlers}
            dangerouslySetInnerHTML={{ __html: displayValue || placeholder }}
          />
          
          {/* Edit button */}
          {showEditButton && !disabled && !readOnly && (
            <button
              type="button"
              className={twMerge(
                'absolute top-1/2 -translate-y-1/2 p-1 rounded-full bg-background-offwhite text-text-secondary opacity-0 group-hover:opacity-100 hover:bg-background-hover transition-all',
                editButtonPosition === 'left' ? '-left-6' : '-right-6'
              )}
              onClick={startEditing}
              aria-label="Edit"
            >
              {editIcon || defaultEditIcon}
            </button>
          )}
        </div>
      )}
      
      {/* Edit mode */}
      {isEditing && (
        <div
          ref={editorRef}
          className={twMerge(
            'border border-primary rounded',
            editClassName
          )}
        >
          <RichTextEditor
            value={editedValue}
            onChange={handleContentChange}
            placeholder={placeholder}
            toolbar={toolbar}
            toolbarOptions={toolbarOptions}
            features={features}
            onKeyDown={handleKeyDown}
          />
          
          {/* Action buttons */}
          <div className="flex justify-end p-1 border-t border-border-light bg-background-offwhite">
            <button
              type="button"
              className="px-2 py-1 text-xs rounded hover:bg-background-hover mr-1"
              onClick={cancelEditing}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-2 py-1 text-xs rounded bg-primary text-white hover:bg-primary-dark"
              onClick={saveChanges}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

InlineEditableText.propTypes = {
  /** Current HTML value (controlled) */
  value: PropTypes.string,
  /** Default HTML value (uncontrolled) */
  defaultValue: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  
  /** Placeholder text when empty */
  placeholder: PropTypes.string,
  /** Additional CSS class for the wrapper */
  className: PropTypes.string,
  /** Additional CSS class for the view mode */
  viewClassName: PropTypes.string,
  /** Additional CSS class for the edit mode */
  editClassName: PropTypes.string,
  
  /** HTML element to render in view mode */
  as: PropTypes.string,
  /** Text size */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  
  /** Whether to enter edit mode on click */
  clickToEdit: PropTypes.bool,
  /** Whether to enter edit mode on double click */
  doubleClickToEdit: PropTypes.bool,
  /** Whether to show an edit button */
  showEditButton: PropTypes.bool,
  /** Position of the edit button */
  editButtonPosition: PropTypes.oneOf(['left', 'right']),
  /** Custom edit icon */
  editIcon: PropTypes.node,
  /** Whether to save on blur */
  saveOnBlur: PropTypes.bool,
  /** Whether to save on Enter key */
  saveOnEnter: PropTypes.bool,
  /** Whether to cancel on Escape key */
  cancelOnEscape: PropTypes.bool,
  
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
  
  /** Whether the component is disabled */
  disabled: PropTypes.bool,
  /** Whether the component is read-only */
  readOnly: PropTypes.bool,
  
  /** Callback when entering edit mode */
  onEdit: PropTypes.func,
  /** Callback when saving changes */
  onSave: PropTypes.func,
  /** Callback when canceling edit */
  onCancel: PropTypes.func,
};

export default InlineEditableText;
