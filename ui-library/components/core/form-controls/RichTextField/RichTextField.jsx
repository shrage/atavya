import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import CustomField from '../../../view/CustomField/CustomField';
import RichTextEditor from '../RichTextEditor/RichTextEditor';

/**
 * RichTextField component
 * A field for rich text editing with formatting options
 * 
 * This component has been updated to use the core RichTextEditor component
 * as part of the Rich Text Standardization effort (WU-009).
 * 
 * @component
 * @example
 * ```jsx
 * <RichTextField
 *   label="Description"
 *   value={description}
 *   onChange={handleDescriptionChange}
 *   placeholder="Enter a detailed description..."
 * />
 * ```
 */
const RichTextField = ({
  // Field metadata
  id,
  label,
  description,
  placeholder = 'Enter text...',
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
  
  // Toolbar options
  toolbarOptions = {
    basic: true,
    formatting: true,
    lists: true,
    links: true,
    media: false,
  },
  
  // State
  disabled = false,
  readOnly = false,
  
  // Feature flags - new prop to control RichTextEditor features
  features = {
    blocks: true,
    slashCommands: true,
    links: true,
    unfurls: false,
    fileAttachments: false,
    mentions: false,
    markdown: true,
    tables: false,
    embeds: false,
    collaboration: false,
  },
  
  // Other props
  ...props
}) => {
  // Handle content changes and extract character count
  const handleContentChange = (html, editorInfo) => {
    if (onChange) {
      // Extract text content for character count
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const text = tempDiv.textContent || '';
      const count = text.length;
      
      // Check if maxLength is exceeded
      if (maxLength && count > maxLength) {
        // Don't update if maxLength is exceeded
        // The RichTextEditor will handle truncation internally
        return;
      }
      
      // Call the original onChange with the same format as before
      onChange(html, {
        text,
        charCount: count,
        html,
      });
    }
  };
  
  // Map toolbarOptions to RichTextEditor format
  const mappedToolbarOptions = {
    basic: toolbarOptions.basic,
    formatting: toolbarOptions.formatting,
    lists: toolbarOptions.lists,
    links: toolbarOptions.links,
    media: toolbarOptions.media,
    tables: features.tables,
  };
  
  // Calculate character count for display
  const calculateCharCount = () => {
    if (!maxLength) return null;
    
    // For controlled component
    if (value) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = value;
      const text = tempDiv.textContent || '';
      return `${text.length}/${maxLength}`;
    }
    
    // For uncontrolled component
    if (defaultValue) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = defaultValue;
      const text = tempDiv.textContent || '';
      return `${text.length}/${maxLength}`;
    }
    
    return `0/${maxLength}`;
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
      helperText={maxLength ? calculateCharCount() : null}
    >
      <RichTextEditor
        value={value}
        defaultValue={defaultValue}
        onChange={handleContentChange}
        placeholder={placeholder}
        minHeight={minHeight}
        maxHeight={maxHeight}
        className={editorClassName}
        toolbar={true}
        toolbarOptions={mappedToolbarOptions}
        disabled={disabled}
        readOnly={readOnly}
        features={features}
        {...props}
      />
    </CustomField>
  );
};

RichTextField.propTypes = {
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
  
  /** Current HTML value (controlled) */
  value: PropTypes.string,
  /** Default HTML value (uncontrolled) */
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
  }),
  
  /** Feature flags for the rich text editor */
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
  
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Whether the field is read-only */
  readOnly: PropTypes.bool,
};

export default RichTextField;
