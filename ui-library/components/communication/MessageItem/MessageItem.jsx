import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

/**
 * MessageItem component
 * Displays a message with sender information, content, and actions
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const MessageItem = ({
  sender,
  senderAvatar,
  content,
  timestamp,
  isRead = true,
  recipients = [],
  attachments = [],
  isExpandable = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const toggleExpand = () => {
    if (isExpandable) {
      setIsExpanded(!isExpanded);
    }
  };
  
  const formattedTime = timestamp ? formatDistanceToNow(new Date(timestamp), { addSuffix: true }) : '';
  
  const truncatedContent = isExpandable && !isExpanded && content.length > 150 
    ? `${content.substring(0, 150)}...` 
    : content;
  
  return (
    <div 
      className={`p-4 border-b border-border-light transition-colors duration-200 ${isRead ? 'bg-white' : 'bg-primary-light'} ${isHovered ? 'bg-background-hover' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        {/* Sender Avatar */}
        <div className="flex-shrink-0">
          {senderAvatar ? (
            <img 
              src={senderAvatar} 
              alt={sender} 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
              {sender.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Message Content */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-medium text-text-primary">{sender}</h4>
            <span className="text-xs text-text-secondary">{formattedTime}</span>
          </div>
          
          {recipients.length > 0 && (
            <div className="text-xs text-text-secondary mb-1">
              To: {recipients.join(', ')}
            </div>
          )}
          
          <div 
            className={`text-sm text-text-primary ${isExpandable ? 'cursor-pointer' : ''}`}
            onClick={toggleExpand}
          >
            {truncatedContent}
            {isExpandable && !isExpanded && content.length > 150 && (
              <span className="text-primary text-xs ml-1">Read more</span>
            )}
          </div>
          
          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {attachments.map((attachment, index) => (
                <div 
                  key={index}
                  className="px-2 py-1 bg-background-hover rounded-md text-xs flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span>{attachment.name}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Actions */}
          <div className={`mt-2 flex gap-2 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
            <button className="text-text-secondary hover:text-text-primary text-xs px-2 py-1 rounded hover:bg-background-hover">
              Reply
            </button>
            <button className="text-text-secondary hover:text-text-primary text-xs px-2 py-1 rounded hover:bg-background-hover">
              Forward
            </button>
            <button className="text-text-secondary hover:text-text-primary text-xs px-2 py-1 rounded hover:bg-background-hover">
              React
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

MessageItem.propTypes = {
  /** Sender name */
  sender: PropTypes.string.isRequired,
  /** Sender avatar URL */
  senderAvatar: PropTypes.string,
  /** Message content */
  content: PropTypes.string.isRequired,
  /** Message timestamp */
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  /** Whether the message has been read */
  isRead: PropTypes.bool,
  /** List of recipient names */
  recipients: PropTypes.arrayOf(PropTypes.string),
  /** List of attachments */
  attachments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  /** Whether the message can be expanded if it's long */
  isExpandable: PropTypes.bool,
};

export default MessageItem;
