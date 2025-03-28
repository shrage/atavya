import React, { useState } from 'react';
import RichTextField from './RichTextField';

export default {
  title: 'Form Controls/RichTextField',
  component: RichTextField,
  parameters: {
    docs: {
      description: {
        component: 'A field component for rich text editing with advanced features including block-based editing, slash commands, mentions, and more. This component has been updated to use the core RichTextEditor as part of the Rich Text Standardization effort (WU-009).',
      },
    },
  },
};

// Basic example
export const Basic = () => (
  <RichTextField
    label="Description"
    placeholder="Enter a rich text description..."
  />
);

// Controlled component example
export const Controlled = () => {
  const [content, setContent] = useState('<p>This is some <strong>rich</strong> text content that can be <em>edited</em>.</p>');
  
  return (
    <div className="space-y-4">
      <RichTextField
        label="Description"
        value={content}
        onChange={(html) => setContent(html)}
      />
      
      <div className="p-3 bg-gray-100 rounded">
        <p className="text-sm font-medium mb-2">Current HTML Value:</p>
        <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-32">
          {content}
        </pre>
      </div>
    </div>
  );
};

// With character limit
export const WithCharacterLimit = () => (
  <RichTextField
    label="Short Description"
    placeholder="Enter a brief description (max 150 characters)..."
    maxLength={150}
  />
);

// Different toolbar configurations
export const ToolbarConfigurations = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-medium mb-2">Basic Formatting Only</h3>
      <RichTextField
        label="Basic Formatting"
        toolbarOptions={{
          basic: true,
          formatting: false,
          lists: false,
          links: false,
          media: false,
        }}
        defaultValue="<p>This editor only has basic formatting options.</p>"
      />
    </div>
    
    <div>
      <h3 className="text-sm font-medium mb-2">Text Formatting Only</h3>
      <RichTextField
        label="Text Formatting"
        toolbarOptions={{
          basic: false,
          formatting: true,
          lists: false,
          links: false,
          media: false,
        }}
        defaultValue="<p>This editor only has text formatting options.</p>"
      />
    </div>
    
    <div>
      <h3 className="text-sm font-medium mb-2">Lists Only</h3>
      <RichTextField
        label="Lists"
        toolbarOptions={{
          basic: false,
          formatting: false,
          lists: true,
          links: false,
          media: false,
        }}
        defaultValue="<p>This editor only has list formatting options.</p>"
      />
    </div>
    
    <div>
      <h3 className="text-sm font-medium mb-2">Links Only</h3>
      <RichTextField
        label="Links"
        toolbarOptions={{
          basic: false,
          formatting: false,
          lists: false,
          links: true,
          media: false,
        }}
        defaultValue="<p>This editor only has link formatting options.</p>"
      />
    </div>
    
    <div>
      <h3 className="text-sm font-medium mb-2">Full Toolbar</h3>
      <RichTextField
        label="All Options"
        toolbarOptions={{
          basic: true,
          formatting: true,
          lists: true,
          links: true,
          media: true,
        }}
        defaultValue="<p>This editor has all formatting options.</p>"
      />
    </div>
  </div>
);

// Different sizes
export const Sizes = () => (
  <div className="space-y-6">
    <RichTextField
      label="Small Height"
      minHeight="100px"
      maxHeight="200px"
      defaultValue="<p>This editor has a smaller height.</p>"
    />
    
    <RichTextField
      label="Default Height"
      defaultValue="<p>This editor has the default height.</p>"
    />
    
    <RichTextField
      label="Large Height"
      minHeight="200px"
      maxHeight="400px"
      defaultValue="<p>This editor has a larger height.</p>"
    />
  </div>
);

// With validation error
export const WithError = () => (
  <RichTextField
    label="Description"
    error="Description is required"
    required
  />
);

// Disabled state
export const Disabled = () => (
  <RichTextField
    label="Description"
    defaultValue="<p>This content cannot be edited because the field is disabled.</p>"
    disabled
  />
);

// Read-only state
export const ReadOnly = () => (
  <RichTextField
    label="Description"
    defaultValue="<p>This content cannot be edited because the field is read-only.</p>"
    readOnly
  />
);

// With initial content
export const WithInitialContent = () => (
  <RichTextField
    label="Article Content"
    defaultValue={`
      <h1>Getting Started with Atavya</h1>
      <p>Atavya is a powerful platform that helps you <strong>automate</strong> and <em>streamline</em> your business processes.</p>
      <h2>Key Features</h2>
      <ul>
        <li>Customizable workflows</li>
        <li>Integrated reporting</li>
        <li>Advanced analytics</li>
      </ul>
      <p>Learn more about how Atavya can transform your business.</p>
    `}
  />
);

// With custom styling
export const CustomStyling = () => (
  <RichTextField
    label="Custom Styled Editor"
    className="border-2 border-primary rounded-lg"
    editorClassName="bg-background-offwhite"
    defaultValue="<p>This editor has custom styling applied to it.</p>"
  />
);

// New: Slash Commands Demo
export const SlashCommands = () => (
  <div className="space-y-4">
    <p className="text-sm text-gray-500">Type '/' to see available commands for creating different block types</p>
    <RichTextField
      label="Slash Commands"
      placeholder="Type '/' to insert a block..."
      features={{
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
      }}
    />
  </div>
);

// New: Mentions Demo
export const Mentions = () => (
  <div className="space-y-4">
    <p className="text-sm text-gray-500">Type '@' to mention someone</p>
    <RichTextField
      label="Mentions"
      placeholder="Type '@' to mention someone..."
      features={{
        blocks: false,
        slashCommands: false,
        links: false,
        unfurls: false,
        fileAttachments: false,
        mentions: true,
        markdown: false,
        tables: false,
        embeds: false,
        collaboration: false,
      }}
    />
  </div>
);

// New: Tables Demo
export const Tables = () => (
  <div className="space-y-4">
    <p className="text-sm text-gray-500">Use the table button in the toolbar or type '/table' to insert a table</p>
    <RichTextField
      label="Tables"
      placeholder="Create a table using the toolbar or slash commands..."
      features={{
        blocks: true,
        slashCommands: true,
        links: false,
        unfurls: false,
        fileAttachments: false,
        mentions: false,
        markdown: false,
        tables: true,
        embeds: false,
        collaboration: false,
      }}
      toolbarOptions={{
        basic: true,
        formatting: true,
        lists: true,
        links: false,
        media: false,
      }}
    />
  </div>
);

// New: Feature Showcase
export const FeatureShowcase = () => (
  <div className="space-y-6">
    <h3 className="text-sm font-medium">Full-Featured Rich Text Field</h3>
    <p className="text-sm text-gray-500">This example showcases all the advanced features of the RichTextField:</p>
    <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
      <li>Type '/' to use slash commands for creating blocks</li>
      <li>Type '@' to mention users</li>
      <li>Use markdown shortcuts like **bold** or *italic*</li>
      <li>Create tables with the toolbar or slash commands</li>
    </ul>
    <RichTextField
      label="Full-Featured Editor"
      placeholder="Try out all the rich text features..."
      features={{
        blocks: true,
        slashCommands: true,
        links: true,
        unfurls: true,
        fileAttachments: false,
        mentions: true,
        markdown: true,
        tables: true,
        embeds: false,
        collaboration: false,
      }}
      toolbarOptions={{
        basic: true,
        formatting: true,
        lists: true,
        links: true,
        media: true,
      }}
    />
  </div>
);

// In a form context
export const InFormContext = () => {
  const [formData, setFormData] = useState({
    title: 'Product Announcement',
    description: '<p>This is a <strong>product announcement</strong> with some <em>formatted text</em>.</p>',
  });
  
  const handleDescriptionChange = (html) => {
    setFormData({
      ...formData,
      description: html,
    });
  };
  
  return (
    <div className="p-4 border rounded max-w-2xl">
      <h2 className="text-lg font-medium mb-4">Create Announcement</h2>
      
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
        
        <RichTextField
          label="Description"
          value={formData.description}
          onChange={handleDescriptionChange}
          features={{
            blocks: true,
            slashCommands: true,
            links: true,
            unfurls: false,
            fileAttachments: false,
            mentions: true,
            markdown: true,
            tables: false,
            embeds: false,
            collaboration: false,
          }}
        />
        
        <div className="flex justify-end space-x-2 pt-2">
          <button className="px-4 py-2 border border-border-medium rounded-md">Cancel</button>
          <button className="px-4 py-2 bg-primary text-white rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
};
