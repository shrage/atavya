import React, { useState } from 'react';
import MessageComposer from './MessageComposer';

export default {
  title: 'Communication/MessageComposer',
  component: MessageComposer,
  parameters: {
    docs: {
      description: {
        component: 'A specialized rich text editor for composing messages in chat interfaces. This component uses the core RichTextEditor as part of the Rich Text Standardization effort (WU-009).',
      },
    },
  },
};

// Basic example
export const Basic = () => (
  <MessageComposer
    placeholder="Type a message..."
    onSend={(message) => console.log('Message sent:', message)}
  />
);

// Controlled component example
export const Controlled = () => {
  const [message, setMessage] = useState('<p>Draft message...</p>');
  
  return (
    <div className="space-y-4">
      <MessageComposer
        value={message}
        onChange={(html) => setMessage(html)}
        onSend={(message) => {
          console.log('Message sent:', message);
          setMessage('');
        }}
      />
      
      <div className="p-3 bg-gray-100 rounded">
        <p className="text-sm font-medium mb-2">Current Message Value:</p>
        <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-32">
          {message}
        </pre>
      </div>
    </div>
  );
};

// With toolbar
export const WithToolbar = () => (
  <MessageComposer
    placeholder="Type a message with formatting options..."
    toolbar={true}
    onSend={(message) => console.log('Message sent:', message)}
  />
);

// With slash commands
export const WithSlashCommands = () => (
  <div className="space-y-4">
    <p className="text-sm text-gray-500">Type '/' to see available commands</p>
    <MessageComposer
      placeholder="Type '/' for commands..."
      features={{
        blocks: false,
        slashCommands: true,
        links: true,
        unfurls: true,
        fileAttachments: true,
        mentions: false,
        markdown: true,
        tables: false,
        embeds: false,
        collaboration: false,
      }}
      onSend={(message) => console.log('Message sent:', message)}
    />
  </div>
);

// With mentions
export const WithMentions = () => (
  <div className="space-y-4">
    <p className="text-sm text-gray-500">Type '@' to mention someone</p>
    <MessageComposer
      placeholder="Type '@' to mention someone..."
      features={{
        blocks: false,
        slashCommands: false,
        links: true,
        unfurls: false,
        fileAttachments: false,
        mentions: true,
        markdown: true,
        tables: false,
        embeds: false,
        collaboration: false,
      }}
      onSend={(message) => console.log('Message sent:', message)}
    />
  </div>
);

// Chat interface simulation
export const ChatInterfaceSimulation = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John', content: '<p>Hi there! How can I help you today?</p>', timestamp: '10:30 AM' },
    { id: 2, sender: 'You', content: '<p>I have a question about the <strong>Atavya</strong> platform.</p>', timestamp: '10:32 AM' },
    { id: 3, sender: 'John', content: '<p>Sure, what would you like to know?</p>', timestamp: '10:33 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSend = (content) => {
    const newMsg = {
      id: messages.length + 1,
      sender: 'You',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
  
  return (
    <div className="border rounded-lg overflow-hidden max-w-2xl">
      {/* Chat header */}
      <div className="bg-primary text-white p-3 flex items-center">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">J</div>
        <div>
          <h3 className="font-medium">John Doe</h3>
          <p className="text-xs opacity-80">Online</p>
        </div>
      </div>
      
      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background-offwhite">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] ${msg.sender === 'You' ? 'bg-primary text-white' : 'bg-white'} rounded-lg p-3 shadow-sm`}>
              {msg.sender !== 'You' && <p className="font-medium text-sm text-primary-dark">{msg.sender}</p>}
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.content }} />
              <p className="text-xs opacity-70 text-right mt-1">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message composer */}
      <div className="border-t border-border-light p-3">
        <MessageComposer
          value={newMessage}
          onChange={setNewMessage}
          onSend={handleSend}
          placeholder="Type a message..."
          features={{
            blocks: false,
            slashCommands: true,
            links: true,
            unfurls: true,
            fileAttachments: true,
            mentions: true,
            markdown: true,
            tables: false,
            embeds: true,
            collaboration: false,
          }}
        />
      </div>
    </div>
  );
};

// Disabled state
export const Disabled = () => (
  <MessageComposer
    placeholder="This composer is disabled"
    disabled
  />
);

// Read-only state
export const ReadOnly = () => (
  <MessageComposer
    defaultValue="<p>This message cannot be edited because the composer is read-only.</p>"
    readOnly
  />
);

// Custom styling
export const CustomStyling = () => (
  <MessageComposer
    placeholder="Type a message..."
    className="border-2 border-primary rounded-lg"
    onSend={(message) => console.log('Message sent:', message)}
  />
);

// With file attachment
export const WithFileAttachment = () => {
  const handleAttachFiles = () => {
    alert('File attachment dialog would open here');
  };
  
  return (
    <MessageComposer
      placeholder="Type a message or attach files..."
      onAttachFiles={handleAttachFiles}
      onSend={(message) => console.log('Message sent:', message)}
    />
  );
};
