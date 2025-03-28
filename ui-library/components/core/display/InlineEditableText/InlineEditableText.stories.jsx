import React, { useState } from 'react';
import InlineEditableText from './InlineEditableText';

export default {
  title: 'Display/InlineEditableText',
  component: InlineEditableText,
  parameters: {
    docs: {
      description: {
        component: 'A component that displays text that can be edited inline. This component uses the core RichTextEditor as part of the Rich Text Standardization effort (WU-009).',
      },
    },
  },
};

// Basic example
export const Basic = () => (
  <InlineEditableText
    defaultValue="<p>Click to edit this text</p>"
  />
);

// Controlled component example
export const Controlled = () => {
  const [text, setText] = useState('<p>This is <strong>controlled</strong> editable text.</p>');
  
  return (
    <div className="space-y-4">
      <InlineEditableText
        value={text}
        onChange={(html) => setText(html)}
      />
      
      <div className="p-3 bg-gray-100 rounded">
        <p className="text-sm font-medium mb-2">Current HTML Value:</p>
        <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-32">
          {text}
        </pre>
      </div>
    </div>
  );
};

// Different sizes
export const Sizes = () => (
  <div className="space-y-4">
    <div>
      <span className="text-sm font-medium mr-2">XS:</span>
      <InlineEditableText
        size="xs"
        defaultValue="<p>Extra small text</p>"
      />
    </div>
    
    <div>
      <span className="text-sm font-medium mr-2">SM:</span>
      <InlineEditableText
        size="sm"
        defaultValue="<p>Small text</p>"
      />
    </div>
    
    <div>
      <span className="text-sm font-medium mr-2">MD (default):</span>
      <InlineEditableText
        size="md"
        defaultValue="<p>Medium text</p>"
      />
    </div>
    
    <div>
      <span className="text-sm font-medium mr-2">LG:</span>
      <InlineEditableText
        size="lg"
        defaultValue="<p>Large text</p>"
      />
    </div>
    
    <div>
      <span className="text-sm font-medium mr-2">XL:</span>
      <InlineEditableText
        size="xl"
        defaultValue="<p>Extra large text</p>"
      />
    </div>
    
    <div>
      <span className="text-sm font-medium mr-2">2XL:</span>
      <InlineEditableText
        size="2xl"
        defaultValue="<p>2X large text</p>"
      />
    </div>
  </div>
);

// Different HTML elements
export const DifferentElements = () => (
  <div className="space-y-4">
    <div>
      <span className="text-sm font-medium mr-2">As div (default):</span>
      <InlineEditableText
        as="div"
        defaultValue="<p>This is a div</p>"
      />
    </div>
    
    <div>
      <span className="text-sm font-medium mr-2">As span:</span>
      <InlineEditableText
        as="span"
        defaultValue="<p>This is a span</p>"
      />
    </div>
    
    <div>
      <span className="text-sm font-medium mr-2">As h1:</span>
      <InlineEditableText
        as="h1"
        size="2xl"
        defaultValue="<p>This is a heading</p>"
      />
    </div>
    
    <div>
      <span className="text-sm font-medium mr-2">As p:</span>
      <InlineEditableText
        as="p"
        defaultValue="<p>This is a paragraph</p>"
      />
    </div>
  </div>
);

// Edit trigger options
export const EditTriggers = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-medium mb-2">Click to Edit (default)</h3>
      <InlineEditableText
        clickToEdit={true}
        defaultValue="<p>Click to edit this text</p>"
      />
    </div>
    
    <div>
      <h3 className="text-sm font-medium mb-2">Double Click to Edit</h3>
      <InlineEditableText
        clickToEdit={false}
        doubleClickToEdit={true}
        defaultValue="<p>Double click to edit this text</p>"
      />
    </div>
    
    <div>
      <h3 className="text-sm font-medium mb-2">Show Edit Button on Hover</h3>
      <InlineEditableText
        showEditButton={true}
        defaultValue="<p>Hover to see edit button</p>"
      />
    </div>
    
    <div>
      <h3 className="text-sm font-medium mb-2">Edit Button on Left</h3>
      <InlineEditableText
        showEditButton={true}
        editButtonPosition="left"
        defaultValue="<p>Edit button is on the left</p>"
      />
    </div>
  </div>
);

// With toolbar
export const WithToolbar = () => (
  <InlineEditableText
    defaultValue="<p>This editor has a <strong>toolbar</strong> when editing</p>"
    toolbar={true}
    toolbarOptions={{
      basic: true,
      formatting: false,
      lists: false,
      links: true,
      media: false,
      tables: false,
    }}
  />
);

// Rich formatting
export const RichFormatting = () => (
  <InlineEditableText
    defaultValue="<p>This text supports <strong>bold</strong>, <em>italic</em>, and <a href='#'>links</a>.</p>"
    toolbar={true}
    toolbarOptions={{
      basic: true,
      formatting: false,
      lists: false,
      links: true,
      media: false,
      tables: false,
    }}
    features={{
      blocks: false,
      slashCommands: false,
      links: true,
      unfurls: false,
      fileAttachments: false,
      mentions: false,
      markdown: true,
      tables: false,
      embeds: false,
      collaboration: false,
    }}
  />
);

// With placeholder
export const WithPlaceholder = () => (
  <InlineEditableText
    placeholder="Click to add content..."
  />
);

// Disabled state
export const Disabled = () => (
  <InlineEditableText
    defaultValue="<p>This text cannot be edited because it is disabled</p>"
    disabled
  />
);

// Read-only state
export const ReadOnly = () => (
  <InlineEditableText
    defaultValue="<p>This text cannot be edited because it is read-only</p>"
    readOnly
  />
);

// Custom styling
export const CustomStyling = () => (
  <InlineEditableText
    defaultValue="<p>This text has custom styling</p>"
    viewClassName="text-primary font-medium"
    editClassName="border-2 border-primary"
  />
);

// In a card context
export const InCardContext = () => (
  <div className="max-w-md p-4 border rounded-md shadow-sm">
    <InlineEditableText
      as="h2"
      size="xl"
      className="mb-2"
      defaultValue="<p>Card Title</p>"
    />
    
    <InlineEditableText
      as="p"
      size="md"
      className="text-text-secondary mb-4"
      defaultValue="<p>This is the card description. Click to edit any text in this card.</p>"
    />
    
    <div className="flex justify-between items-center">
      <InlineEditableText
        size="sm"
        defaultValue="<p>John Doe</p>"
      />
      
      <InlineEditableText
        size="sm"
        className="text-text-secondary"
        defaultValue="<p>March 27, 2025</p>"
      />
    </div>
  </div>
);

// With event callbacks
export const WithEventCallbacks = () => {
  const [events, setEvents] = useState([]);
  
  const addEvent = (event) => {
    setEvents(prev => [...prev, `${new Date().toLocaleTimeString()}: ${event}`]);
  };
  
  return (
    <div className="space-y-4">
      <InlineEditableText
        defaultValue="<p>Edit this text to see events</p>"
        onEdit={() => addEvent('Edit started')}
        onSave={(value) => addEvent(`Saved: ${value.substring(0, 20)}...`)}
        onCancel={() => addEvent('Edit canceled')}
      />
      
      <div className="p-3 bg-gray-100 rounded">
        <p className="text-sm font-medium mb-2">Events:</p>
        <div className="text-xs bg-white p-2 rounded overflow-auto max-h-32">
          {events.length > 0 ? (
            <ul className="list-disc pl-5">
              {events.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          ) : (
            <p className="text-text-secondary">No events yet</p>
          )}
        </div>
      </div>
    </div>
  );
};
