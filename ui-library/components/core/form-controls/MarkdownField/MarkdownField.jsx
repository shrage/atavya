import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import CustomField from '../../../view/CustomField/CustomField';
import RichTextEditor from '../RichTextEditor/RichTextEditor';

// Import these libraries in your actual project
// For demo purposes, we'll use placeholder functions
const markdownToHtml = (markdown) => {
  // This would use a library like marked or showdown
  // Simple placeholder implementation for demo
  if (!markdown) return '';
  
  let html = markdown
    // Headers
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    // Lists
    .replace(/^\* (.*$)/gm, '<ul><li>$1</li></ul>')
    .replace(/^- (.*$)/gm, '<ul><li>$1</li></ul>')
    .replace(/^\d\. (.*$)/gm, '<ol><li>$1</li></ol>')
    // Paragraphs
    .replace(/^(?!<h|<ul|<ol|<p)(.*$)/gm, '<p>$1</p>');
  
  // Fix nested lists
  html = html
    .replace(/<\/ul>\s*<ul>/g, '')
    .replace(/<\/ol>\s*<ol>/g, '');
  
  return html;
};

const htmlToMarkdown = (html) => {
  // This would use a library like turndown
  // Simple placeholder implementation for demo
  if (!html) return '';
  
  // Create a temporary element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Extract text and preserve some basic formatting
  let markdown = html
    // Headers
    .replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n')
    .replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n')
    .replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n')
    // Bold
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .replace(/<b>(.*?)<\/b>/g, '**$1**')
    // Italic
    .replace(/<em>(.*?)<\/em>/g, '*$1*')
    .replace(/<i>(.*?)<\/i>/g, '*$1*')
    // Links
    .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)')
    // Lists
    .replace(/<ul>(.*?)<\/ul>/gs, (match, p1) => {
      return p1.replace(/<li>(.*?)<\/li>/g, '* $1\n');
    })
    .replace(/<ol>(.*?)<\/ol>/gs, (match, p1) => {
      let index = 1;
      return p1.replace(/<li>(.*?)<\/li>/g, () => {
        return `${index++}. $1\n`;
      });
    })
    // Paragraphs
    .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
    // Clean up extra newlines
    .replace(/\n\n\n+/g, '\n\n');
  
  return markdown.trim();
};

/**
 * MarkdownField component
 * A field for editing markdown content with a rich text interface
 * 
 * This component uses the core RichTextEditor component as part of the
 * Rich Text Standardization effort (WU-009).
 * 
 * @component
 * @example
 * ```jsx
 * <MarkdownField
 *   label="Description"
 *   value={markdownContent}
 *   onChange={handleMarkdownChange}
 *   placeholder="Enter markdown content..."
 * />
 * ```
 */
const MarkdownField = ({
  // Field metadata
  id,
  label,
  description,
  placeholder = 'Enter markdown content...',
  required = false,
  
  // Value
  value = '',
  defaultValue = '',
  onChange,
  
  // Validation
  error,
  maxLength,
  
  // Display options
  labelPosition = 'top',
  hideLabel = false,
  fullWidth = true,
  minHeight = '150px',
  maxHeight = '400px',
  className,
  editorClassName,
  
  // Preview options
  showPreview = false,
  previewPosition = 'bottom', // 'bottom', 'right'
  
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
    embeds: false,
    collaboration: false,
  },
  
  // Toolbar options
  toolbar = true,
  toolbarOptions = {
    basic: true,
    formatting: true,
    lists: true,
    links: true,
    media: false,
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
  const [htmlContent, setHtmlContent] = useState('');
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(showPreview);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined;
  const markdownValue = isControlled ? value : localValue;
  
  // Convert markdown to HTML on initial render and when markdown changes
  useEffect(() => {
    const html = markdownToHtml(markdownValue);
    setHtmlContent(html);
  }, [markdownValue]);
  
  // Handle HTML content changes
  const handleHtmlChange = (html) => {
    // Convert HTML back to markdown
    const markdown = htmlToMarkdown(html);
    
    if (!isControlled) {
      setLocalValue(markdown);
    }
    
    if (onChange) {
      onChange(markdown, {
        html,
        markdown,
      });
    }
  };
  
  // Toggle preview mode
  const togglePreview = () => {
    setShowMarkdownPreview(!showMarkdownPreview);
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
      <div className="w-full">
        {/* Preview toggle */}
        <div className="flex justify-end mb-2">
          <button
            type="button"
            className={twMerge(
              'px-3 py-1 text-sm rounded-md transition-colors',
              showMarkdownPreview ? 'bg-primary text-white' : 'bg-background-offwhite text-text-secondary hover:bg-background-hover',
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            )}
            onClick={togglePreview}
            disabled={disabled}
          >
            {showMarkdownPreview ? 'Edit Mode' : 'Preview'}
          </button>
        </div>
        
        {/* Editor/Preview container */}
        <div className={twMerge(
          'border border-border-medium rounded-md overflow-hidden',
          previewPosition === 'right' && showMarkdownPreview ? 'flex' : ''
        )}>
          {/* Editor */}
          {(!showMarkdownPreview || previewPosition === 'right') && (
            <div className={twMerge(
              previewPosition === 'right' && showMarkdownPreview ? 'w-1/2' : 'w-full'
            )}>
              <RichTextEditor
                value={htmlContent}
                onChange={handleHtmlChange}
                placeholder={placeholder}
                minHeight={minHeight}
                maxHeight={maxHeight}
                className={editorClassName}
                toolbar={toolbar}
                toolbarOptions={toolbarOptions}
                disabled={disabled}
                readOnly={readOnly}
                features={features}
                {...props}
              />
            </div>
          )}
          
          {/* Preview */}
          {showMarkdownPreview && (
            <div className={twMerge(
              'bg-white p-3 overflow-auto',
              previewPosition === 'right' ? 'w-1/2 border-l border-border-light' : 'w-full',
              `min-h-[${minHeight}] max-h-[${maxHeight}]`
            )}>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
          )}
        </div>
        
        {/* Raw markdown (for debugging) */}
        {props.showRawMarkdown && (
          <div className="mt-2 p-2 bg-background-offwhite rounded-md">
            <div className="text-xs font-mono overflow-auto max-h-32 whitespace-pre-wrap">
              {markdownValue}
            </div>
          </div>
        )}
      </div>
    </CustomField>
  );
};

MarkdownField.propTypes = {
  /** Unique ID for the field */
  id: PropTypes.string,
  /** Field label */
  label: PropTypes.string,
  /** Field description */
  description: PropTypes.string,
  /** Placeholder text when field is empty */
  placeholder: PropTypes.string,
  /** Whether the field is required */
  required: PropTypes.bool,
  
  /** Current markdown value (controlled) */
  value: PropTypes.string,
  /** Default markdown value (uncontrolled) */
  defaultValue: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  
  /** Validation error message */
  error: PropTypes.string,
  /** Maximum character length */
  maxLength: PropTypes.number,
  
  /** Position of the label */
  labelPosition: PropTypes.oneOf(['top', 'left', 'right']),
  /** Whether to hide the label */
  hideLabel: PropTypes.bool,
  /** Whether the field should take up the full width of its container */
  fullWidth: PropTypes.bool,
  /** Minimum height of the editor */
  minHeight: PropTypes.string,
  /** Maximum height of the editor */
  maxHeight: PropTypes.string,
  /** Additional CSS class for the wrapper */
  className: PropTypes.string,
  /** Additional CSS class for the editor */
  editorClassName: PropTypes.string,
  
  /** Whether to show the preview by default */
  showPreview: PropTypes.bool,
  /** Position of the preview */
  previewPosition: PropTypes.oneOf(['bottom', 'right']),
  
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
  
  /** For debugging: show raw markdown */
  showRawMarkdown: PropTypes.bool,
};

export default MarkdownField;
