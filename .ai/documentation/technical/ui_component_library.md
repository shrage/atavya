# UI Component Library Documentation

## Overview
The Atavya-Fresh UI Component Library is a comprehensive collection of React components designed for building consistent, accessible, and visually appealing user interfaces. The library follows a clean, minimal, block-based design approach inspired by Notion's aesthetic.

## Current State
As of 2025-03-27, the UI component library is 79% complete (67/85 components implemented). The library includes core components, form controls, display components, layout components, feedback components, and navigation components.

## Components

### Core Components

#### Button
- **Status**: ✅ Completed
- **Contributed By**: [WU-008](../../work_units/WU-008_custom_field_components.md)
- **Last Updated**: 2025-03-27
- **Description**: Multi-purpose button component with Notion-inspired styling
- **Props**:
  - `variant`: 'primary' | 'secondary' | 'outline' | 'text'
  - `size`: 'sm' | 'md' | 'lg'
  - `leadingIcon`: React.ReactNode
  - `trailingIcon`: React.ReactNode
  - `isLoading`: boolean
  - `disabled`: boolean
- **Usage Example**:
  ```jsx
  <Button variant="primary" size="md" leadingIcon={<PlusIcon />}>
    Create New
  </Button>
  ```

#### Input
- **Status**: ✅ Completed
- **Contributed By**: [WU-008](../../work_units/WU-008_custom_field_components.md)
- **Last Updated**: 2025-03-27
- **Description**: Text input field with various states and sizes
- **Props**:
  - `type`: 'text' | 'password' | 'email' | etc.
  - `error`: string
  - `disabled`: boolean
  - `placeholder`: string
  - `leadingElement`: React.ReactNode
  - `trailingElement`: React.ReactNode
  - `maxLength`: number
  - `isLoading`: boolean
- **Usage Example**:
  ```jsx
  <Input 
    type="email" 
    placeholder="Enter your email" 
    leadingElement={<EmailIcon />} 
  />
  ```

#### RichTextEditor
- **Status**: ✅ Completed
- **Contributed By**: [WU-008](../../work_units/WU-008_custom_field_components.md), [WU-009](../../work_units/WU-009_rich_text_standardization.md)
- **Last Updated**: 2025-03-27
- **Description**: Core rich text editing component
- **Features**:
  - Block-based editing
  - Slash commands for quick actions
  - Links with previews and unfurls
  - File attachments
  - Mentions and tagging
  - Markdown shortcuts
  - Tables and embeds
  - Collaborative editing
  - Extensible plugin architecture
- **Props**:
  - `value`: string (HTML)
  - `onChange`: (html: string) => void
  - `features`: FeatureFlags
  - `toolbar`: boolean
  - `toolbarOptions`: ToolbarOptions
  - `placeholder`: string
  - `readOnly`: boolean
  - `disabled`: boolean
  - `collaborationOptions`: CollaborationOptions
- **Usage Example**:
  ```jsx
  <RichTextEditor
    value={content}
    onChange={setContent}
    features={{
      blocks: true,
      slashCommands: true,
      links: true,
      fileAttachments: true,
      mentions: true
    }}
  />
  ```

### Rich Text Components

#### RichTextField
- **Status**: ✅ Completed
- **Contributed By**: [WU-009](../../work_units/WU-009_rich_text_standardization.md)
- **Last Updated**: 2025-03-27
- **Description**: Form field for rich text input
- **Features**:
  - Integrates with form libraries
  - Validation support
  - Label and error handling
  - All RichTextEditor capabilities
- **Implementation Details**:
  - Uses the core RichTextEditor component
  - Adds form-specific wrapper and validation
  - Maintains backward compatibility with previous versions

#### MessageComposer
- **Status**: ✅ Completed
- **Contributed By**: [WU-009](../../work_units/WU-009_rich_text_standardization.md)
- **Last Updated**: 2025-03-27
- **Description**: Specialized component for composing messages
- **Features**:
  - Optimized for chat and messaging interfaces
  - Send button integration
  - File attachment support
  - Mentions and emoji support
  - Compact UI
- **Implementation Details**:
  - Uses the core RichTextEditor with messaging-specific configuration
  - Adds send functionality and attachment handling
  - Optimized for conversational context

#### CommentField
- **Status**: ✅ Completed
- **Contributed By**: [WU-009](../../work_units/WU-009_rich_text_standardization.md)
- **Last Updated**: 2025-03-27
- **Description**: Component for adding comments in discussion threads
- **Features**:
  - Optimized for comment contexts
  - Reply functionality
  - Mention support
  - Compact UI
- **Implementation Details**:
  - Uses the core RichTextEditor with comment-specific configuration
  - Adds reply functionality and threading support
  - Optimized for discussion context

#### EmailTemplateEditor
- **Status**: ✅ Completed
- **Contributed By**: [WU-009](../../work_units/WU-009_rich_text_standardization.md)
- **Last Updated**: 2025-03-27
- **Description**: Component for creating and editing email templates
- **Features**:
  - Template variable support
  - Email-specific blocks (header, footer, button)
  - Preview functionality
  - HTML email output
- **Implementation Details**:
  - Uses the core RichTextEditor with email-specific configuration
  - Adds template variable handling and specialized blocks
  - Includes preview functionality for email rendering

#### MarkdownField
- **Status**: ✅ Completed
- **Contributed By**: [WU-009](../../work_units/WU-009_rich_text_standardization.md)
- **Last Updated**: 2025-03-27
- **Description**: Component for editing markdown with rich text interface
- **Features**:
  - Bidirectional conversion between Markdown and HTML
  - Markdown preview
  - Syntax highlighting
  - Markdown-specific shortcuts
- **Implementation Details**:
  - Uses the core RichTextEditor with markdown-specific configuration
  - Adds conversion between HTML and Markdown formats
  - Includes preview functionality for rendered markdown

#### InlineEditableText
- **Status**: ✅ Completed
- **Contributed By**: [WU-009](../../work_units/WU-009_rich_text_standardization.md)
- **Last Updated**: 2025-03-27
- **Description**: Component for inline text editing
- **Features**:
  - Smooth transition between view and edit modes
  - Click or double-click to edit
  - Optional edit button
  - Size variants
  - Element type customization
- **Implementation Details**:
  - Uses a simplified version of the core RichTextEditor
  - Optimized for inline editing contexts
  - Maintains compact UI appropriate for inline editing

## Technical Requirements

### Accessibility
- All components must be fully accessible according to WCAG 2.1 AA standards
- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA attributes
- Sufficient color contrast

### Browser Compatibility
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Performance
- Components should be optimized for performance
- Lazy loading for complex components
- Virtualization for large lists
- Efficient rendering and re-rendering

### Theming
- Support for light and dark modes
- Customizable color schemes
- Consistent design tokens
- Component-level style customization

## Implementation Guidelines

### Component Structure
- Each component should be in its own directory
- Include component file, stories, tests, and index
- Follow the established naming conventions
- Use TypeScript for type safety

### State Management
- Use React hooks for internal state
- Accept controlled and uncontrolled modes
- Provide sensible defaults
- Handle edge cases gracefully

### Styling Approach
- Use Tailwind CSS for styling
- Follow the established design system
- Maintain consistency across components
- Support responsive design

### Testing Strategy
- Unit tests for component logic
- Visual regression tests for appearance
- Accessibility tests for compliance
- Integration tests for component interactions

## Related Documentation
- [UI Component Usage Guide](../user/ui_component_usage.md)
- [Rich Text Editing](./rich_text_editing.md)
- [Design System](../architecture/design_system.md)
