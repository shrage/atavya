import React, { useState } from 'react';
import MarkdownField from './MarkdownField';

export default {
  title: 'Form Controls/MarkdownField',
  component: MarkdownField,
  parameters: {
    docs: {
      description: {
        component: 'A field for editing markdown content with a rich text interface. This component uses the core RichTextEditor as part of the Rich Text Standardization effort (WU-009).',
      },
    },
  },
};

// Basic example
export const Basic = () => (
  <MarkdownField
    label="Markdown Content"
    placeholder="Enter markdown content..."
  />
);

// Controlled component example
export const Controlled = () => {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **bold** and this is *italic*.\n\n* List item 1\n* List item 2\n* List item 3');
  
  return (
    <div className="space-y-4">
      <MarkdownField
        label="Markdown Content"
        value={markdown}
        onChange={(value) => setMarkdown(value)}
      />
      
      <div className="p-3 bg-gray-100 rounded">
        <p className="text-sm font-medium mb-2">Current Markdown Value:</p>
        <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-32 whitespace-pre-wrap">
          {markdown}
        </pre>
      </div>
    </div>
  );
};

// With preview
export const WithPreview = () => (
  <MarkdownField
    label="Markdown Content"
    defaultValue="# Hello World\n\nThis is **bold** and this is *italic*.\n\n* List item 1\n* List item 2\n* List item 3\n\n## Links\n\n[Example Link](https://example.com)"
    showPreview={true}
  />
);

// Side-by-side preview
export const SideBySidePreview = () => (
  <MarkdownField
    label="Markdown Content"
    defaultValue="# Hello World\n\nThis is **bold** and this is *italic*.\n\n* List item 1\n* List item 2\n* List item 3\n\n## Links\n\n[Example Link](https://example.com)"
    showPreview={true}
    previewPosition="right"
  />
);

// With raw markdown display
export const WithRawMarkdown = () => (
  <MarkdownField
    label="Markdown Content"
    defaultValue="# Hello World\n\nThis is **bold** and this is *italic*.\n\n* List item 1\n* List item 2\n* List item 3"
    showRawMarkdown={true}
  />
);

// Different toolbar configurations
export const ToolbarConfigurations = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-medium mb-2">Basic Formatting Only</h3>
      <MarkdownField
        label="Basic Formatting"
        toolbarOptions={{
          basic: true,
          formatting: false,
          lists: false,
          links: false,
          media: false,
          tables: false,
        }}
        defaultValue="# Basic Formatting\n\nThis editor only has **basic** formatting options."
      />
    </div>
    
    <div>
      <h3 className="text-sm font-medium mb-2">Full Toolbar</h3>
      <MarkdownField
        label="All Options"
        toolbarOptions={{
          basic: true,
          formatting: true,
          lists: true,
          links: true,
          media: true,
          tables: true,
        }}
        defaultValue="# Full Toolbar\n\nThis editor has all formatting options.\n\n## Tables\n\n| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |"
      />
    </div>
  </div>
);

// Different sizes
export const Sizes = () => (
  <div className="space-y-6">
    <MarkdownField
      label="Small Height"
      minHeight="100px"
      maxHeight="200px"
      defaultValue="# Small Height\n\nThis editor has a smaller height."
    />
    
    <MarkdownField
      label="Default Height"
      defaultValue="# Default Height\n\nThis editor has the default height."
    />
    
    <MarkdownField
      label="Large Height"
      minHeight="200px"
      maxHeight="400px"
      defaultValue="# Large Height\n\nThis editor has a larger height."
    />
  </div>
);

// With validation error
export const WithError = () => (
  <MarkdownField
    label="Markdown Content"
    error="Markdown content is required"
    required
  />
);

// Disabled state
export const Disabled = () => (
  <MarkdownField
    label="Markdown Content"
    defaultValue="# Disabled\n\nThis content cannot be edited because the field is disabled."
    disabled
  />
);

// Read-only state
export const ReadOnly = () => (
  <MarkdownField
    label="Markdown Content"
    defaultValue="# Read Only\n\nThis content cannot be edited because the field is read-only."
    readOnly
  />
);

// Complex markdown example
export const ComplexMarkdown = () => (
  <MarkdownField
    label="Documentation"
    defaultValue={`# Markdown Documentation

## Headers

# H1
## H2
### H3

## Emphasis

*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
  * Item 2a
  * Item 2b

### Ordered

1. Item 1
2. Item 2
3. Item 3
   1. Item 3a
   2. Item 3b

## Links

[Atavya](https://example.com)

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax.
> It is designed so that it can be converted to HTML and many other formats.

## Tables

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

## Code

\`\`\`javascript
function example() {
  console.log("Hello, world!");
}
\`\`\`

Inline \`code\` has \`back-ticks around\` it.
`}
    showPreview={true}
    previewPosition="right"
  />
);

// In a form context
export const InFormContext = () => {
  const [formData, setFormData] = useState({
    title: 'Documentation',
    content: '# Getting Started\n\nThis is a **markdown** guide for getting started with our product.\n\n## Installation\n\n1. Download the package\n2. Run the installer\n3. Configure your settings',
  });
  
  const handleContentChange = (markdown) => {
    setFormData({
      ...formData,
      content: markdown,
    });
  };
  
  return (
    <div className="p-4 border rounded max-w-2xl">
      <h2 className="text-lg font-medium mb-4">Create Documentation</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
          <input
            id="title"
            type="text"
            className="w-full px-3 py-2 border border-border-medium rounded-md"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        
        <MarkdownField
          label="Content"
          value={formData.content}
          onChange={handleContentChange}
          showPreview={true}
        />
        
        <div className="flex justify-end space-x-2 pt-2">
          <button className="px-4 py-2 border border-border-medium rounded-md">Cancel</button>
          <button className="px-4 py-2 bg-primary text-white rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
};
