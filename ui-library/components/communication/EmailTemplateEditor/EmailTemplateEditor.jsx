import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import RichTextEditor from '../../core/form-controls/RichTextEditor/RichTextEditor';

/**
 * EmailTemplateEditor component
 * A specialized rich text editor for creating and editing email templates
 * 
 * This component uses the core RichTextEditor component as part of the
 * Rich Text Standardization effort (WU-009).
 * 
 * @component
 * @example
 * ```jsx
 * <EmailTemplateEditor
 *   value={template}
 *   onChange={handleTemplateChange}
 *   variables={['firstName', 'lastName', 'companyName']}
 * />
 * ```
 */
const EmailTemplateEditor = ({
  // Value
  value = '',
  defaultValue = '',
  onChange,
  
  // Email template specific
  variables = [],
  previewMode = false,
  previewData = {},
  
  // Display options
  placeholder = 'Create your email template...',
  minHeight = '300px',
  maxHeight = '600px',
  className,
  
  // Feature flags
  features = {
    blocks: true,
    slashCommands: true,
    links: true,
    unfurls: false,
    fileAttachments: false,
    mentions: false,
    markdown: true,
    tables: true,
    embeds: true,
    collaboration: false,
  },
  
  // Toolbar options
  toolbar = true,
  toolbarOptions = {
    basic: true,
    formatting: true,
    lists: true,
    links: true,
    media: true,
    tables: true,
  },
  
  // State
  disabled = false,
  readOnly = false,
  
  // Other props
  ...props
}) => {
  // State for controlled/uncontrolled editor
  const [localValue, setLocalValue] = useState(defaultValue);
  const [showVariableMenu, setShowVariableMenu] = useState(false);
  const [variableMenuPosition, setVariableMenuPosition] = useState({ top: 0, left: 0 });
  
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
  
  // Insert variable into template
  const insertVariable = (variable) => {
    // Create a custom element for the variable
    const variableHtml = `<span class="variable" data-variable="${variable}" style="background-color: var(--primary-light); color: var(--primary); padding: 0 4px; border-radius: 4px; font-weight: 500;">{{${variable}}}</span>`;
    
    // Execute command to insert HTML
    document.execCommand('insertHTML', false, variableHtml);
    
    // Hide variable menu
    setShowVariableMenu(false);
    
    // Update content
    if (!isControlled) {
      // We need to get the updated HTML from the editor
      setTimeout(() => {
        const editorElement = document.querySelector('[role="textbox"]');
        if (editorElement) {
          setLocalValue(editorElement.innerHTML);
          
          if (onChange) {
            onChange(editorElement.innerHTML);
          }
        }
      }, 0);
    }
  };
  
  // Toggle variable menu
  const handleShowVariableMenu = (e) => {
    if (disabled || readOnly) return;
    
    // Get position for the menu
    const rect = e.currentTarget.getBoundingClientRect();
    
    setVariableMenuPosition({
      top: rect.bottom,
      left: rect.left,
    });
    
    setShowVariableMenu(!showVariableMenu);
  };
  
  // Get preview content with variables replaced
  const getPreviewContent = () => {
    if (!previewMode) return editorValue;
    
    let previewContent = editorValue;
    
    // Replace variables with their values
    variables.forEach(variable => {
      const value = previewData[variable] || `[${variable}]`;
      const regex = new RegExp(`{{${variable}}}`, 'g');
      previewContent = previewContent.replace(regex, value);
    });
    
    return previewContent;
  };
  
  // Custom toolbar for email templates
  const customToolbar = (
    <div className="flex items-center p-1 border-b border-border-light bg-background-offwhite">
      {/* Variable button */}
      <button
        type="button"
        className={twMerge(
          'px-2 py-1 rounded text-sm flex items-center hover:bg-background-hover transition-colors',
          disabled || readOnly ? 'opacity-50 cursor-not-allowed' : '',
          showVariableMenu ? 'bg-background-hover text-primary' : 'text-text-secondary'
        )}
        onClick={handleShowVariableMenu}
        disabled={disabled || readOnly}
      >
        <span className="mr-1">Variables</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Spacer */}
      <div className="w-px h-5 bg-border-light mx-2"></div>
      
      {/* Preview toggle */}
      <button
        type="button"
        className={twMerge(
          'px-2 py-1 rounded text-sm flex items-center hover:bg-background-hover transition-colors',
          disabled || readOnly ? 'opacity-50 cursor-not-allowed' : '',
          previewMode ? 'bg-background-hover text-primary' : 'text-text-secondary'
        )}
        onClick={() => props.onTogglePreview && props.onTogglePreview()}
        disabled={disabled || readOnly}
      >
        {previewMode ? 'Edit Mode' : 'Preview'}
      </button>
    </div>
  );
  
  return (
    <div className={twMerge(
      'border border-border-medium rounded-md overflow-hidden',
      className
    )}>
      {/* Custom toolbar */}
      {customToolbar}
      
      {/* Rich text editor */}
      {previewMode ? (
        <div
          className={twMerge(
            'w-full p-3 outline-none',
            `min-h-[${minHeight}] max-h-[${maxHeight}]`,
            'overflow-y-auto bg-white'
          )}
          dangerouslySetInnerHTML={{ __html: getPreviewContent() }}
        />
      ) : (
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
      )}
      
      {/* Variable menu */}
      {showVariableMenu && (
        <div
          className="absolute z-10 bg-white border border-border-light rounded-md shadow-lg overflow-hidden"
          style={{
            top: `${variableMenuPosition.top}px`,
            left: `${variableMenuPosition.left}px`,
          }}
        >
          <div className="p-2 bg-background-offwhite border-b border-border-light">
            <h3 className="text-sm font-medium">Template Variables</h3>
          </div>
          <ul className="py-1 max-h-60 overflow-y-auto">
            {variables.length > 0 ? (
              variables.map(variable => (
                <li
                  key={variable}
                  className="px-3 py-2 hover:bg-background-hover cursor-pointer"
                  onClick={() => insertVariable(variable)}
                >
                  <span className="bg-primary-light text-primary px-1 rounded text-sm">
                    {`{{${variable}}}`}
                  </span>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-text-secondary">
                No variables available
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

EmailTemplateEditor.propTypes = {
  /** Current HTML value (controlled) */
  value: PropTypes.string,
  /** Default HTML value (uncontrolled) */
  defaultValue: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  
  /** Available template variables */
  variables: PropTypes.arrayOf(PropTypes.string),
  /** Whether to show preview mode */
  previewMode: PropTypes.bool,
  /** Data for previewing variables */
  previewData: PropTypes.object,
  /** Handler for toggling preview mode */
  onTogglePreview: PropTypes.func,
  
  /** Placeholder text when editor is empty */
  placeholder: PropTypes.string,
  /** Minimum height of the editor */
  minHeight: PropTypes.string,
  /** Maximum height of the editor */
  maxHeight: PropTypes.string,
  /** Additional CSS class for the wrapper */
  className: PropTypes.string,
  
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
  
  /** Whether the editor is disabled */
  disabled: PropTypes.bool,
  /** Whether the editor is read-only */
  readOnly: PropTypes.bool,
};

export default EmailTemplateEditor;
