import React, { useState } from 'react';
import RichTextEditor from './RichTextEditor';

export default {
  title: 'Form Controls/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    docs: {
      description: {
        component: 'A core rich text editing component with advanced features including block-based editing, slash commands, links with previews, file attachments, mentions, markdown shortcuts, tables, embeds, and collaborative editing.',
      },
    },
  },
};

// Basic example
export const Basic = () => (
  <RichTextEditor
    placeholder="Start typing or use '/' for commands..."
  />
);

// Controlled component example
export const Controlled = () => {
  const [content, setContent] = useState('<p>This is some <strong>rich</strong> text content that can be <em>edited</em>.</p>');
  
  return (
    <div className="space-y-4">
      <RichTextEditor
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

// With specific features enabled
export const FeatureFlags = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-medium mb-2">Block-Based Editing</h3>
      <RichTextEditor
        features={{
          blocks: true,
          slashCommands: true,
          links: false,
          unfurls: false,
          fileAttachments: false,
          mentions: false,
          markdown: false,
          tables: false,
          embeds: false,
          collaboration: false,
        }}
        defaultValue="<p>Try using the slash command by typing '/' to create different blocks.</p>"
      />
    </div>
    
    <div>
      <h3 className="text-sm font-medium mb-2">Mentions</h3>
      <RichTextEditor
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
        defaultValue="<p>Try mentioning someone by typing '@'.</p>"
      />
    </div>
    
    <div>
      <h3 className="text-sm font-medium mb-2">Tables</h3>
      <RichTextEditor
        features={{
          blocks: false,
          slashCommands: false,
          links: false,
          unfurls: false,
          fileAttachments: false,
          mentions: false,
          markdown: false,
          tables: true,
          embeds: false,
          collaboration: false,
        }}
        defaultValue="<p>Use the table button in the toolbar to insert a table.</p>"
      />
    </div>
  </div>
);

// Slash commands demo
export const SlashCommands = () => (
  <div className="space-y-4">
    <p className="text-sm text-gray-500">Type '/' to see available commands</p>
    <RichTextEditor
      features={{
        blocks: true,
        slashCommands: true,
        links: true,
        unfurls: false,
        fileAttachments: false,
        mentions: false,
        markdown: false,
        tables: true,
        embeds: false,
        collaboration: false,
      }}
      placeholder="Type '/' to insert a block..."
    />
  </div>
);

// Mentions demo
export const Mentions = () => (
  <div className="space-y-4">
    <p className="text-sm text-gray-500">Type '@' to mention someone</p>
    <RichTextEditor
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
      placeholder="Type '@' to mention someone..."
    />
  </div>
);

// Different toolbar configurations
export const ToolbarConfigurations = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-medium mb-2">Basic Formatting Only</h3>
      <RichTextEditor
        toolbarOptions={{
          basic: true,
          formatting: false,
          lists: false,
          links: false,
          media: false,
          tables: false,
        }}
        defaultValue="<p>This editor only has basic formatting options.</p>"
      />
    </div>
    
    <div>
      <h3 className="text-sm font-medium mb-2">Full Toolbar</h3>
      <RichTextEditor
        toolbarOptions={{
          basic: true,
          formatting: true,
          lists: true,
          links: true,
          media: true,
          tables: true,
        }}
        defaultValue="<p>This editor has all formatting options.</p>"
      />
    </div>
    
    <div>
      <h3 className="text-sm font-medium mb-2">No Toolbar</h3>
      <RichTextEditor
        toolbar={false}
        defaultValue="<p>This editor has no toolbar.</p>"
      />
    </div>
  </div>
);

// Different sizes
export const Sizes = () => (
  <div className="space-y-6">
    <RichTextEditor
      minHeight="100px"
      maxHeight="200px"
      defaultValue="<p>This editor has a smaller height.</p>"
    />
    
    <RichTextEditor
      minHeight="150px"
      maxHeight="400px"
      defaultValue="<p>This editor has the default height.</p>"
    />
    
    <RichTextEditor
      minHeight="200px"
      maxHeight="600px"
      defaultValue="<p>This editor has a larger height.</p>"
    />
  </div>
);

// Disabled state
export const Disabled = () => (
  <RichTextEditor
    defaultValue="<p>This content cannot be edited because the editor is disabled.</p>"
    disabled
  />
);

// Read-only state
export const ReadOnly = () => (
  <RichTextEditor
    defaultValue="<p>This content cannot be edited because the editor is read-only.</p>"
    readOnly
  />
);

// With initial content
export const WithInitialContent = () => (
  <RichTextEditor
    defaultValue={`
      <h1>Getting Started with Atavya</h1>
      <p>Welcome to <strong>Atavya</strong>, a powerful platform for managing your business.</p>
      <h2>Key Features</h2>
      <ul>
        <li>Intuitive dashboard</li>
        <li>Comprehensive reporting</li>
        <li>Team collaboration tools</li>
      </ul>
      <p>Learn more about our features by <a href="#">visiting our documentation</a>.</p>
    `}
  />
);

// Collaborative editing simulation
export const CollaborativeEditing = () => {
  const [content, setContent] = useState('<p>This is a collaborative document. Multiple users can edit it simultaneously.</p>');
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">JD</div>
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">JS</div>
        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">AJ</div>
        <span className="text-sm text-gray-500">3 users currently editing</span>
      </div>
      
      <RichTextEditor
        value={content}
        onChange={(html) => setContent(html)}
        features={{
          blocks: true,
          slashCommands: true,
          links: true,
          unfurls: true,
          fileAttachments: true,
          mentions: true,
          markdown: true,
          tables: true,
          embeds: true,
          collaboration: true,
        }}
        collaborationOptions={{
          userId: 'user1',
          userName: 'John Doe',
          userColor: '#3b82f6',
          presenceEnabled: true,
          cursorsEnabled: true,
        }}
      />
      
      <div className="p-3 bg-gray-100 rounded">
        <p className="text-xs text-gray-500">
          Note: This is a simulation of collaborative editing. In a real implementation, 
          this would be connected to a real-time collaboration service.
        </p>
      </div>
    </div>
  );
};

// Integration with RichTextField
export const RichTextFieldIntegration = () => {
  const [content, setContent] = useState('<p>This demonstrates how RichTextEditor can be used within RichTextField.</p>');
  
  return (
    <div className="p-4 border rounded">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
      </div>
      
      <RichTextEditor
        value={content}
        onChange={(html) => setContent(html)}
        features={{
          blocks: true,
          slashCommands: true,
          links: true,
          unfurls: true,
          fileAttachments: true,
          mentions: true,
          markdown: true,
          tables: true,
          embeds: true,
        }}
      />
      
      <p className="mt-1 text-xs text-gray-500">
        Use formatting options to enhance your content
      </p>
    </div>
  );
};
