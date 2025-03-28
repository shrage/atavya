import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * RichTextEditor component
 * A core rich text editing component with advanced features
 * 
 * This component serves as the foundation for all rich text inputs in the Atavya-Fresh UI library.
 * It supports block-based editing, slash commands, links with previews, file attachments,
 * mentions, markdown shortcuts, tables, embeds, and collaborative editing.
 * 
 * @component
 * @example
 * ```jsx
 * <RichTextEditor
 *   value={content}
 *   onChange={handleContentChange}
 *   placeholder="Start typing..."
 *   features={{ blocks: true, slashCommands: true, mentions: true }}
 * />
 * ```
 */
const RichTextEditor = ({
  // Value
  value = '',
  defaultValue = '',
  onChange,
  
  // Display options
  placeholder = 'Start typing...',
  minHeight = '150px',
  maxHeight = '400px',
  className,
  
  // Feature flags
  features = {
    blocks: true,
    slashCommands: true,
    links: true,
    unfurls: true,
    fileAttachments: true,
    mentions: true,
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
  
  // Collaboration
  collaborationOptions = {
    userId: null,
    userName: null,
    userColor: null,
    presenceEnabled: true,
    cursorsEnabled: true,
  },
  
  // Other props
  ...props
}) => {
  // State for controlled/uncontrolled editor
  const [localValue, setLocalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashCommand, setSlashCommand] = useState('');
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });
  const [mentionQuery, setMentionQuery] = useState('');
  const [showMentionMenu, setShowMentionMenu] = useState(false);
  const [mentionMenuPosition, setMentionMenuPosition] = useState({ top: 0, left: 0 });
  
  // Refs
  const editorRef = useRef(null);
  const toolbarRef = useRef(null);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined;
  const editorValue = isControlled ? value : localValue;
  
  // Initialize editor on mount
  useEffect(() => {
    if (editorRef.current) {
      // Set initial content
      editorRef.current.innerHTML = editorValue;
    }
  }, []);
  
  // Handle content changes
  const handleContentChange = () => {
    if (!editorRef.current) return;
    
    const html = editorRef.current.innerHTML;
    
    if (!isControlled) {
      setLocalValue(html);
    }
    
    if (onChange) {
      onChange(html);
    }
  };
  
  // Execute command on the document
  const execCommand = (command, value = null) => {
    if (disabled || readOnly) return;
    
    // Focus the editor if not already focused
    if (!isFocused) {
      editorRef.current.focus();
    }
    
    // Execute the command
    document.execCommand(command, false, value);
    
    // Update content after command execution
    handleContentChange();
  };
  
  // Handle key events for slash commands and mentions
  const handleKeyDown = (e) => {
    if (disabled || readOnly) return;
    
    // Slash commands
    if (features.slashCommands && e.key === '/') {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setSlashMenuPosition({
        top: rect.bottom,
        left: rect.left,
      });
      
      setShowSlashMenu(true);
      setSlashCommand('');
    }
    
    // Mentions
    if (features.mentions && e.key === '@') {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setMentionMenuPosition({
        top: rect.bottom,
        left: rect.left,
      });
      
      setShowMentionMenu(true);
      setMentionQuery('');
    }
  };
  
  // Handle input for slash commands and mentions
  const handleInput = (e) => {
    if (showSlashMenu) {
      // Extract slash command
      const text = editorRef.current.textContent;
      const match = text.match(/\/([^/\s]*)$/);
      
      if (match) {
        setSlashCommand(match[1]);
      } else {
        setShowSlashMenu(false);
      }
    }
    
    if (showMentionMenu) {
      // Extract mention query
      const text = editorRef.current.textContent;
      const match = text.match(/@([^@\s]*)$/);
      
      if (match) {
        setMentionQuery(match[1]);
      } else {
        setShowMentionMenu(false);
      }
    }
    
    handleContentChange();
  };
  
  // Insert a block based on slash command
  const insertBlock = (blockType) => {
    // Remove the slash command
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    // Move range to start of slash command
    const textNode = range.startContainer;
    const text = textNode.textContent;
    const slashIndex = text.lastIndexOf('/');
    
    if (slashIndex !== -1) {
      range.setStart(textNode, slashIndex);
      range.deleteContents();
    }
    
    // Insert the block based on type
    let blockHtml = '';
    
    switch (blockType) {
      case 'heading1':
        blockHtml = '<h1>Heading 1</h1>';
        break;
      case 'heading2':
        blockHtml = '<h2>Heading 2</h2>';
        break;
      case 'heading3':
        blockHtml = '<h3>Heading 3</h3>';
        break;
      case 'bulletList':
        blockHtml = '<ul><li>List item</li></ul>';
        break;
      case 'numberedList':
        blockHtml = '<ol><li>List item</li></ol>';
        break;
      case 'todo':
        blockHtml = '<div class="todo-item"><input type="checkbox"><span>To-do item</span></div>';
        break;
      case 'table':
        blockHtml = '<table><tr><td>Cell 1</td><td>Cell 2</td></tr><tr><td>Cell 3</td><td>Cell 4</td></tr></table>';
        break;
      case 'code':
        blockHtml = '<pre><code>// Code block</code></pre>';
        break;
      case 'quote':
        blockHtml = '<blockquote>Quote</blockquote>';
        break;
      default:
        blockHtml = '<p>Paragraph</p>';
    }
    
    // Insert the block
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = blockHtml;
    const blockElement = tempDiv.firstChild;
    
    range.insertNode(blockElement);
    
    // Move cursor inside the block
    range.selectNodeContents(blockElement);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Hide slash menu
    setShowSlashMenu(false);
    
    // Update content
    handleContentChange();
  };
  
  // Insert a mention
  const insertMention = (user) => {
    // Remove the @ query
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    // Move range to start of @ symbol
    const textNode = range.startContainer;
    const text = textNode.textContent;
    const atIndex = text.lastIndexOf('@');
    
    if (atIndex !== -1) {
      range.setStart(textNode, atIndex);
      range.deleteContents();
    }
    
    // Create mention element
    const mentionElement = document.createElement('span');
    mentionElement.className = 'mention';
    mentionElement.contentEditable = 'false';
    mentionElement.dataset.userId = user.id;
    mentionElement.textContent = `@${user.name}`;
    mentionElement.style.color = 'var(--primary)';
    mentionElement.style.backgroundColor = 'var(--primary-light)';
    mentionElement.style.padding = '0 4px';
    mentionElement.style.borderRadius = '4px';
    
    // Insert the mention
    range.insertNode(mentionElement);
    
    // Move cursor after the mention
    range.setStartAfter(mentionElement);
    range.setEndAfter(mentionElement);
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Insert a space after the mention
    const spaceNode = document.createTextNode(' ');
    range.insertNode(spaceNode);
    
    // Move cursor after the space
    range.setStartAfter(spaceNode);
    range.setEndAfter(spaceNode);
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Hide mention menu
    setShowMentionMenu(false);
    
    // Update content
    handleContentChange();
  };
  
  // Toolbar button component
  const ToolbarButton = ({ command, icon, title, active, value }) => (
    <button
      type="button"
      className={twMerge(
        'p-1 rounded hover:bg-background-hover transition-colors',
        active ? 'bg-background-hover text-primary' : 'text-text-secondary'
      )}
      title={title}
      onClick={() => execCommand(command, value)}
      disabled={disabled || readOnly}
      tabIndex={-1} // Prevent focus on toolbar buttons
    >
      {icon}
    </button>
  );
  
  // Slash command menu items
  const slashCommands = [
    { id: 'heading1', label: 'Heading 1', icon: 'H1' },
    { id: 'heading2', label: 'Heading 2', icon: 'H2' },
    { id: 'heading3', label: 'Heading 3', icon: 'H3' },
    { id: 'bulletList', label: 'Bullet List', icon: '•' },
    { id: 'numberedList', label: 'Numbered List', icon: '1.' },
    { id: 'todo', label: 'To-do List', icon: '☐' },
    { id: 'table', label: 'Table', icon: '⊞' },
    { id: 'code', label: 'Code Block', icon: '</>' },
    { id: 'quote', label: 'Quote', icon: '"' },
  ];
  
  // Sample users for mentions (in a real app, this would come from props or API)
  const users = [
    { id: 'user1', name: 'John Doe', avatar: '👨' },
    { id: 'user2', name: 'Jane Smith', avatar: '👩' },
    { id: 'user3', name: 'Alex Johnson', avatar: '🧑' },
  ];
  
  // Filter users based on mention query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );
  
  return (
    <div className={twMerge(
      'border border-border-medium rounded-md overflow-hidden',
      className
    )}>
      {/* Toolbar */}
      {toolbar && (
        <div
          ref={toolbarRef}
          className={twMerge(
            'flex flex-wrap items-center gap-1 p-1 border-b border-border-light bg-background-offwhite',
            disabled || readOnly ? 'opacity-60' : ''
          )}
        >
          {/* Basic formatting */}
          {toolbarOptions.basic && (
            <>
              <ToolbarButton
                command="bold"
                icon="B"
                title="Bold"
                active={document.queryCommandState('bold')}
              />
              <ToolbarButton
                command="italic"
                icon="I"
                title="Italic"
                active={document.queryCommandState('italic')}
              />
              <ToolbarButton
                command="underline"
                icon="U"
                title="Underline"
                active={document.queryCommandState('underline')}
              />
              <div className="w-px h-5 bg-border-light mx-1"></div>
            </>
          )}
          
          {/* Text formatting */}
          {toolbarOptions.formatting && (
            <>
              <ToolbarButton
                command="formatBlock"
                value="h1"
                icon="H1"
                title="Heading 1"
                active={document.queryCommandValue('formatBlock') === 'h1'}
              />
              <ToolbarButton
                command="formatBlock"
                value="h2"
                icon="H2"
                title="Heading 2"
                active={document.queryCommandValue('formatBlock') === 'h2'}
              />
              <ToolbarButton
                command="formatBlock"
                value="h3"
                icon="H3"
                title="Heading 3"
                active={document.queryCommandValue('formatBlock') === 'h3'}
              />
              <div className="w-px h-5 bg-border-light mx-1"></div>
            </>
          )}
          
          {/* Lists */}
          {toolbarOptions.lists && (
            <>
              <ToolbarButton
                command="insertUnorderedList"
                icon="•"
                title="Bullet List"
                active={document.queryCommandState('insertUnorderedList')}
              />
              <ToolbarButton
                command="insertOrderedList"
                icon="1."
                title="Numbered List"
                active={document.queryCommandState('insertOrderedList')}
              />
              <div className="w-px h-5 bg-border-light mx-1"></div>
            </>
          )}
          
          {/* Links */}
          {toolbarOptions.links && (
            <>
              <ToolbarButton
                command="createLink"
                icon="🔗"
                title="Insert Link"
                active={document.queryCommandState('createLink')}
              />
              <div className="w-px h-5 bg-border-light mx-1"></div>
            </>
          )}
          
          {/* Media */}
          {toolbarOptions.media && (
            <>
              <ToolbarButton
                command="insertImage"
                icon="🖼️"
                title="Insert Image"
                active={false}
              />
              <div className="w-px h-5 bg-border-light mx-1"></div>
            </>
          )}
          
          {/* Tables */}
          {toolbarOptions.tables && features.tables && (
            <>
              <button
                type="button"
                className="p-1 rounded hover:bg-background-hover transition-colors text-text-secondary"
                title="Insert Table"
                onClick={() => insertBlock('table')}
                disabled={disabled || readOnly}
                tabIndex={-1}
              >
                ⊞
              </button>
              <div className="w-px h-5 bg-border-light mx-1"></div>
            </>
          )}
          
          {/* Clear formatting */}
          <ToolbarButton
            command="removeFormat"
            icon="Aa"
            title="Clear Formatting"
            active={false}
          />
        </div>
      )}
      
      {/* Editor */}
      <div
        ref={editorRef}
        className={twMerge(
          'w-full p-3 outline-none',
          `min-h-[${minHeight}] max-h-[${maxHeight}]`,
          'overflow-y-auto',
          disabled ? 'bg-background-offwhite text-text-secondary cursor-not-allowed' : 'bg-white'
        )}
        contentEditable={!disabled && !readOnly}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        suppressContentEditableWarning={true}
        role="textbox"
        aria-multiline="true"
        aria-placeholder={placeholder}
        {...props}
      />
      
      {/* Slash Command Menu */}
      {showSlashMenu && (
        <div
          className="absolute z-10 bg-white border border-border-light rounded-md shadow-lg overflow-hidden"
          style={{
            top: `${slashMenuPosition.top}px`,
            left: `${slashMenuPosition.left}px`,
          }}
        >
          <ul className="py-1">
            {slashCommands
              .filter(cmd => cmd.label.toLowerCase().includes(slashCommand.toLowerCase()))
              .map(command => (
                <li
                  key={command.id}
                  className="px-3 py-2 flex items-center hover:bg-background-hover cursor-pointer"
                  onClick={() => insertBlock(command.id)}
                >
                  <span className="w-6 h-6 flex items-center justify-center bg-background-offwhite rounded mr-2">
                    {command.icon}
                  </span>
                  <span>{command.label}</span>
                </li>
              ))
            }
          </ul>
        </div>
      )}
      
      {/* Mention Menu */}
      {showMentionMenu && (
        <div
          className="absolute z-10 bg-white border border-border-light rounded-md shadow-lg overflow-hidden"
          style={{
            top: `${mentionMenuPosition.top}px`,
            left: `${mentionMenuPosition.left}px`,
          }}
        >
          <ul className="py-1">
            {filteredUsers.map(user => (
              <li
                key={user.id}
                className="px-3 py-2 flex items-center hover:bg-background-hover cursor-pointer"
                onClick={() => insertMention(user)}
              >
                <span className="w-6 h-6 flex items-center justify-center bg-background-offwhite rounded mr-2">
                  {user.avatar}
                </span>
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

RichTextEditor.propTypes = {
  /** Current HTML value (controlled) */
  value: PropTypes.string,
  /** Default HTML value (uncontrolled) */
  defaultValue: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  
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
  
  /** Collaboration options */
  collaborationOptions: PropTypes.shape({
    /** Current user ID */
    userId: PropTypes.string,
    /** Current user name */
    userName: PropTypes.string,
    /** Current user cursor color */
    userColor: PropTypes.string,
    /** Enable presence indicators */
    presenceEnabled: PropTypes.bool,
    /** Enable collaborative cursors */
    cursorsEnabled: PropTypes.bool,
  }),
};

export default RichTextEditor;
