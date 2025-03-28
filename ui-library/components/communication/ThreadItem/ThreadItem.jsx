import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

/**
 * ThreadItem component
 * Displays a message thread with expandable details
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const ThreadItem = ({
  title,
  messages = [],
  participants = [],
  unreadCount = 0,
  isExpanded: initialExpanded = false,
  onToggleExpand,
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [isHovered, setIsHovered] = useState(false);

  const toggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    if (onToggleExpand) {
      onToggleExpand(newExpandedState);
    }
  };

  // Get the latest message
  const latestMessage = messages.length > 0 ? messages[messages.length - 1] : null;
  
  // Format timestamp
  const formattedTime = latestMessage?.timestamp 
    ? formatDistanceToNow(new Date(latestMessage.timestamp), { addSuffix: true })
    : '';

  // Get unique participants for avatar display
  const uniqueParticipants = participants.filter((participant, index, self) => 
    index === self.findIndex((p) => p.id === participant.id)
  ).slice(0, 3); // Show at most 3 avatars
  
  return (
    <div className="border-b border-border-light">
      {/* Thread header */}
      <div 
        className={`p-4 cursor-pointer transition-colors duration-200 ${unreadCount > 0 ? 'bg-primary-light' : 'bg-white'} ${isHovered ? 'bg-background-hover' : ''}`}
        onClick={toggleExpand}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start">
          {/* Participant avatars */}
          <div className="flex-shrink-0 mr-3">
            <div className="flex -space-x-2">
              {uniqueParticipants.map((participant, index) => (
                <div key={participant.id} className="relative ring-2 ring-white" style={{ zIndex: 3 - index }}>
                  {participant.avatar ? (
                    <img 
                      src={participant.avatar} 
                      alt={participant.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                      {participant.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              ))}
              {participants.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-background-hover text-text-secondary flex items-center justify-center text-xs font-medium ring-2 ring-white" style={{ zIndex: 0 }}>
                  +{participants.length - 3}
                </div>
              )}
            </div>
          </div>
          
          {/* Thread content */}
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-medium text-text-primary">{title}</h4>
              <div className="flex items-center">
                {unreadCount > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
                <span className="text-xs text-text-secondary">{formattedTime}</span>
              </div>
            </div>
            
            {latestMessage && (
              <div className="flex items-start">
                <div className="text-xs font-medium text-text-primary mr-1">
                  {latestMessage.sender.name}:
                </div>
                <div className="text-xs text-text-secondary truncate">
                  {latestMessage.content.length > 85
                    ? `${latestMessage.content.substring(0, 85)}...`
                    : latestMessage.content
                  }
                </div>
              </div>
            )}
            
            {/* Thread actions */}
            <div className={`mt-2 flex gap-2 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
              <button className="text-text-secondary hover:text-text-primary text-xs px-2 py-1 rounded hover:bg-background-hover">
                Reply
              </button>
              <button className="text-text-secondary hover:text-text-primary text-xs px-2 py-1 rounded hover:bg-background-hover">
                Archive
              </button>
              <button className="text-text-secondary hover:text-text-primary text-xs px-2 py-1 rounded hover:bg-background-hover">
                Mute
              </button>
            </div>
          </div>
          
          {/* Expand indicator */}
          <div className="flex-shrink-0 ml-2">
            <svg 
              className={`w-4 h-4 text-text-secondary transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Expanded thread messages */}
      {isExpanded && (
        <div className="bg-background-offwhite px-4 py-3">
          {messages.map((message, index) => (
            <div 
              key={message.id} 
              className={`p-3 ${index !== messages.length - 1 ? 'mb-3' : ''} bg-white rounded-lg shadow-sm`}
            >
              <div className="flex items-start">
                {/* Sender avatar */}
                <div className="flex-shrink-0 mr-3">
                  {message.sender.avatar ? (
                    <img 
                      src={message.sender.avatar} 
                      alt={message.sender.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                      {message.sender.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                {/* Message content */}
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium text-text-primary">
                      {message.sender.name}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {message.timestamp ? new Date(message.timestamp).toLocaleString() : ''}
                    </div>
                  </div>
                  
                  <div className="text-sm text-text-primary">
                    {message.content}
                  </div>
                  
                  {/* Message attachments */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.attachments.map((attachment) => (
                        <div 
                          key={attachment.id} 
                          className="px-3 py-1 bg-background-hover text-text-secondary rounded-md text-xs flex items-center"
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          {attachment.name}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Message actions */}
                  <div className="mt-2 flex gap-2">
                    <button className="text-text-secondary hover:text-text-primary text-xs">
                      Reply
                    </button>
                    <button className="text-text-secondary hover:text-text-primary text-xs">
                      React
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ThreadItem.propTypes = {
  /** Thread title */
  title: PropTypes.string.isRequired,
  /** Array of messages in the thread */
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }).isRequired,
      timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
      attachments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          name: PropTypes.string.isRequired,
          url: PropTypes.string,
        })
      ),
    })
  ),
  /** Thread participants */
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ),
  /** Number of unread messages */
  unreadCount: PropTypes.number,
  /** Whether the thread is initially expanded */
  isExpanded: PropTypes.bool,
  /** Callback when thread is expanded/collapsed */
  onToggleExpand: PropTypes.func,
};

export default ThreadItem;
