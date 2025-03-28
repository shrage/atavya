import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * ReactionButton component
 * Allows users to react to content with emoji reactions
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const ReactionButton = ({
  reactions = [
    { id: 'like', emoji: '👍', label: 'Like' },
    { id: 'heart', emoji: '❤️', label: 'Love' },
    { id: 'laugh', emoji: '😄', label: 'Laugh' },
    { id: 'surprise', emoji: '😮', label: 'Surprise' },
    { id: 'sad', emoji: '😢', label: 'Sad' },
  ],
  selectedReactionId = null,
  reactionCounts = {},
  onReact,
  size = 'md',
  showCounts = true,
  showTooltips = true,
  className = '',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(selectedReactionId);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  
  useEffect(() => {
    setSelectedId(selectedReactionId);
  }, [selectedReactionId]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleReact = (reactionId) => {
    // If clicking the already selected reaction, deselect it
    const newReactionId = selectedId === reactionId ? null : reactionId;
    setSelectedId(newReactionId);
    
    if (onReact) {
      onReact(newReactionId);
    }
    
    setIsMenuOpen(false);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Get the selected reaction if any
  const selectedReaction = reactions.find(r => r.id === selectedId);
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2',
  };
  
  const buttonSizeClass = sizeClasses[size] || sizeClasses.md;
  
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main reaction button */}
      <button
        ref={buttonRef}
        className={`
          ${buttonSizeClass}
          rounded-md border border-border-light
          ${selectedId 
            ? 'bg-background-hover text-text-primary' 
            : 'bg-white text-text-secondary hover:bg-background-offwhite'
          }
          transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
        `}
        onClick={toggleMenu}
      >
        <div className="flex items-center">
          {selectedReaction 
            ? (
              <>
                <span className="mr-1">{selectedReaction.emoji}</span>
                {showCounts && reactionCounts[selectedId] && reactionCounts[selectedId] > 0 && (
                  <span>{reactionCounts[selectedId]}</span>
                )}
              </>
            ) 
            : (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-1">React</span>
              </span>
            )
          }
        </div>
      </button>
      
      {/* Reaction selector menu */}
      {isMenuOpen && (
        <div 
          ref={menuRef} 
          className="absolute z-10 mt-1 p-2 bg-white rounded-lg shadow-lg border border-border-light flex space-x-1"
          style={{ minWidth: '250px' }}
        >
          {reactions.map((reaction) => {
            const count = reactionCounts[reaction.id] || 0;
            
            return (
              <button
                key={reaction.id}
                className={`
                  p-2 rounded-md transition-colors duration-150 text-xl
                  ${selectedId === reaction.id 
                    ? 'bg-background-hover' 
                    : 'hover:bg-background-offwhite'
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
                  relative
                `}
                onClick={() => handleReact(reaction.id)}
                title={showTooltips ? reaction.label : undefined}
              >
                <span>{reaction.emoji}</span>
                {showCounts && count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-background-hover text-xs rounded-full px-1 min-w-[20px] text-center">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

ReactionButton.propTypes = {
  /** Array of reaction options */
  reactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  /** Currently selected reaction ID */
  selectedReactionId: PropTypes.string,
  /** Object mapping reaction IDs to counts */
  reactionCounts: PropTypes.object,
  /** Callback when a reaction is selected/deselected */
  onReact: PropTypes.func,
  /** Size of the reaction button */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Whether to show reaction counts */
  showCounts: PropTypes.bool,
  /** Whether to show tooltips on hover */
  showTooltips: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default ReactionButton;
