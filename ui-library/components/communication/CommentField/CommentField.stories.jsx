import React, { useState } from 'react';
import CommentField from './CommentField';

export default {
  title: 'Communication/CommentField',
  component: CommentField,
  parameters: {
    docs: {
      description: {
        component: 'A specialized rich text editor for adding comments in discussion threads. This component uses the core RichTextEditor as part of the Rich Text Standardization effort (WU-009).',
      },
    },
  },
};

// Basic example
export const Basic = () => (
  <CommentField
    placeholder="Add a comment..."
    onSubmit={(comment) => console.log('Comment submitted:', comment)}
  />
);

// Controlled component example
export const Controlled = () => {
  const [comment, setComment] = useState('<p>Draft comment...</p>');
  
  return (
    <div className="space-y-4">
      <CommentField
        value={comment}
        onChange={(html) => setComment(html)}
        onSubmit={(comment) => {
          console.log('Comment submitted:', comment);
          setComment('');
        }}
      />
      
      <div className="p-3 bg-gray-100 rounded">
        <p className="text-sm font-medium mb-2">Current Comment Value:</p>
        <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-32">
          {comment}
        </pre>
      </div>
    </div>
  );
};

// With cancel button
export const WithCancelButton = () => (
  <CommentField
    placeholder="Add a comment..."
    showCancelButton={true}
    onSubmit={(comment) => console.log('Comment submitted:', comment)}
    onCancel={() => console.log('Comment canceled')}
  />
);

// With mentions
export const WithMentions = () => (
  <div className="space-y-4">
    <p className="text-sm text-gray-500">Type '@' to mention someone</p>
    <CommentField
      placeholder="Type '@' to mention someone..."
      features={{
        blocks: false,
        slashCommands: false,
        links: true,
        unfurls: false,
        fileAttachments: true,
        mentions: true,
        markdown: true,
        tables: false,
        embeds: false,
        collaboration: false,
      }}
      onSubmit={(comment) => console.log('Comment submitted:', comment)}
    />
  </div>
);

// Without toolbar
export const WithoutToolbar = () => (
  <CommentField
    placeholder="Add a comment (no toolbar)..."
    toolbar={false}
    onSubmit={(comment) => console.log('Comment submitted:', comment)}
  />
);

// Custom button text
export const CustomButtonText = () => (
  <CommentField
    placeholder="Add a comment..."
    submitButtonText="Post Comment"
    cancelButtonText="Discard"
    showCancelButton={true}
    onSubmit={(comment) => console.log('Comment submitted:', comment)}
    onCancel={() => console.log('Comment canceled')}
  />
);

// Comment thread simulation
export const CommentThreadSimulation = () => {
  const [comments, setComments] = useState([
    { id: 1, author: 'John Doe', content: '<p>This is a great feature! I especially like how it integrates with the rest of the platform.</p>', timestamp: '2 hours ago' },
    { id: 2, author: 'Jane Smith', content: '<p>I agree with John. The <strong>implementation</strong> is very clean.</p>', timestamp: '1 hour ago' },
  ]);
  const [newComment, setNewComment] = useState('');
  
  const handleSubmit = (content) => {
    const newCommentObj = {
      id: comments.length + 1,
      author: 'You',
      content,
      timestamp: 'Just now',
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };
  
  return (
    <div className="border rounded-lg overflow-hidden max-w-2xl">
      {/* Thread header */}
      <div className="bg-background-offwhite p-3 border-b border-border-light">
        <h3 className="font-medium">Discussion: New Dashboard Design</h3>
      </div>
      
      {/* Comments */}
      <div className="p-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border border-border-light rounded-lg p-3 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                  {comment.author.charAt(0)}
                </div>
                <span className="font-medium">{comment.author}</span>
              </div>
              <span className="text-xs text-text-secondary">{comment.timestamp}</span>
            </div>
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: comment.content }} />
          </div>
        ))}
      </div>
      
      {/* Comment field */}
      <div className="p-3 border-t border-border-light">
        <CommentField
          value={newComment}
          onChange={setNewComment}
          onSubmit={handleSubmit}
          placeholder="Add your comment..."
          features={{
            blocks: false,
            slashCommands: false,
            links: true,
            unfurls: false,
            fileAttachments: true,
            mentions: true,
            markdown: true,
            tables: false,
            embeds: false,
            collaboration: false,
          }}
        />
      </div>
    </div>
  );
};

// Disabled state
export const Disabled = () => (
  <CommentField
    placeholder="This field is disabled"
    disabled
  />
);

// Read-only state
export const ReadOnly = () => (
  <CommentField
    defaultValue="<p>This comment cannot be edited because the field is read-only.</p>"
    readOnly
  />
);

// Custom styling
export const CustomStyling = () => (
  <CommentField
    placeholder="Add a comment..."
    className="border-2 border-primary rounded-lg"
    onSubmit={(comment) => console.log('Comment submitted:', comment)}
  />
);

// With file attachment
export const WithFileAttachment = () => {
  const handleAttachFiles = () => {
    alert('File attachment dialog would open here');
  };
  
  return (
    <CommentField
      placeholder="Add a comment or attach files..."
      onAttachFiles={handleAttachFiles}
      onSubmit={(comment) => console.log('Comment submitted:', comment)}
    />
  );
};
