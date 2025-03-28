import React, { useState } from 'react';
import { Popover } from './index';

export default {
  title: 'Layout/Popover',
  component: Popover,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Popover component for displaying contextual floating content.'
      }
    }
  },
  argTypes: {
    placement: {
      control: { type: 'select', options: ['top', 'right', 'bottom', 'left'] },
      description: 'Placement of the popover relative to the trigger'
    },
    triggerType: {
      control: { type: 'select', options: ['click', 'hover'] },
      description: 'How the popover is triggered'
    },
    offset: {
      control: { type: 'number' },
      description: 'Distance between popover and trigger in pixels'
    },
    hasArrow: {
      control: 'boolean',
      description: 'Whether to show an arrow pointing to the trigger'
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: 'Whether to close the popover when clicking outside'
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Whether to close the popover when pressing ESC'
    }
  }
};

// Basic popover
export const Basic = () => (
  <div className="flex justify-center p-16">
    <Popover
      trigger={
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
          Click me
        </button>
      }
      content={
        <div className="p-2">
          <p className="text-text-primary">This is a basic popover.</p>
        </div>
      }
    />
  </div>
);

// Different placements
export const Placements = () => (
  <div className="flex flex-col items-center space-y-16 p-16">
    <div className="flex justify-center">
      <Popover
        placement="top"
        trigger={
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            Top
          </button>
        }
        content={
          <div className="p-2">
            <p className="text-text-primary">Popover on top</p>
          </div>
        }
      />
    </div>
    
    <div className="flex justify-between w-64">
      <Popover
        placement="left"
        trigger={
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            Left
          </button>
        }
        content={
          <div className="p-2">
            <p className="text-text-primary">Popover on left</p>
          </div>
        }
      />
      
      <Popover
        placement="right"
        trigger={
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            Right
          </button>
        }
        content={
          <div className="p-2">
            <p className="text-text-primary">Popover on right</p>
          </div>
        }
      />
    </div>
    
    <div className="flex justify-center">
      <Popover
        placement="bottom"
        trigger={
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            Bottom
          </button>
        }
        content={
          <div className="p-2">
            <p className="text-text-primary">Popover on bottom</p>
          </div>
        }
      />
    </div>
  </div>
);

// Hover trigger
export const HoverTrigger = () => (
  <div className="flex justify-center p-16">
    <Popover
      triggerType="hover"
      trigger={
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
          Hover me
        </button>
      }
      content={
        <div className="p-2">
          <p className="text-text-primary">This popover appears on hover.</p>
        </div>
      }
    />
  </div>
);

// Without arrow
export const WithoutArrow = () => (
  <div className="flex justify-center p-16">
    <Popover
      hasArrow={false}
      trigger={
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
          No Arrow
        </button>
      }
      content={
        <div className="p-2">
          <p className="text-text-primary">This popover has no arrow.</p>
        </div>
      }
    />
  </div>
);

// Rich content
export const RichContent = () => (
  <div className="flex justify-center p-16">
    <Popover
      trigger={
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
          Rich Content
        </button>
      }
      content={
        <div className="w-64 p-2">
          <h3 className="text-lg font-medium text-text-primary mb-2">Popover Title</h3>
          <p className="text-sm text-text-secondary mb-4">
            This popover contains rich content with multiple elements.
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-primary text-white text-sm rounded-md">
              Action
            </button>
            <button className="px-3 py-1 border border-border-medium text-text-primary text-sm rounded-md">
              Cancel
            </button>
          </div>
        </div>
      }
    />
  </div>
);

// Controlled popover
export const ControlledPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="flex flex-col items-center space-y-4 p-16">
      <div className="flex space-x-4">
        <button 
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Open Popover
        </button>
        <button 
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 border border-border-medium text-text-primary rounded-md hover:bg-gray-50"
        >
          Close Popover
        </button>
      </div>
      
      <div className="mt-8">
        <Popover
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          trigger={
            <button className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark">
              Controlled Popover
            </button>
          }
          content={
            <div className="p-2">
              <p className="text-text-primary mb-2">This is a controlled popover.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-primary text-white text-sm rounded-md"
              >
                Close
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
};

// Popover with function content
export const FunctionContent = () => (
  <div className="flex justify-center p-16">
    <Popover
      trigger={
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
          With Close Function
        </button>
      }
      content={({ onClose }) => (
        <div className="w-64 p-2">
          <h3 className="text-lg font-medium text-text-primary mb-2">Function Content</h3>
          <p className="text-sm text-text-secondary mb-4">
            This popover content is rendered with a function that provides the onClose callback.
          </p>
          <button 
            onClick={onClose}
            className="px-3 py-1 bg-primary text-white text-sm rounded-md"
          >
            Close Popover
          </button>
        </div>
      )}
    />
  </div>
);

// Nested popovers
export const NestedPopovers = () => (
  <div className="flex justify-center p-16">
    <Popover
      trigger={
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
          Open Parent
        </button>
      }
      content={
        <div className="w-64 p-2">
          <h3 className="text-lg font-medium text-text-primary mb-2">Parent Popover</h3>
          <p className="text-sm text-text-secondary mb-4">
            This popover contains another popover.
          </p>
          <Popover
            trigger={
              <button className="px-3 py-1 bg-secondary text-white text-sm rounded-md">
                Open Child
              </button>
            }
            content={
              <div className="p-2">
                <h3 className="text-lg font-medium text-text-primary mb-2">Child Popover</h3>
                <p className="text-sm text-text-secondary">
                  This is a nested popover.
                </p>
              </div>
            }
          />
        </div>
      }
    />
  </div>
);

// Real-world examples
export const UserProfilePopover = () => (
  <div className="flex justify-center p-16">
    <Popover
      trigger={
        <button className="flex items-center space-x-2 px-3 py-2 bg-white border border-border-medium rounded-md hover:bg-gray-50">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
            JD
          </div>
          <span className="text-text-primary">John Doe</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-secondary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      }
      content={
        <div className="w-64">
          <div className="p-4 border-b border-border-light">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-medium text-lg">
                JD
              </div>
              <div>
                <div className="font-medium text-text-primary">John Doe</div>
                <div className="text-sm text-text-secondary">john.doe@example.com</div>
              </div>
            </div>
          </div>
          
          <div className="py-2">
            <a href="#" className="flex items-center px-4 py-2 text-text-primary hover:bg-gray-100">
              <span className="material-icons text-text-secondary mr-3 text-xl">account_circle</span>
              Your Profile
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-text-primary hover:bg-gray-100">
              <span className="material-icons text-text-secondary mr-3 text-xl">settings</span>
              Settings
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-text-primary hover:bg-gray-100">
              <span className="material-icons text-text-secondary mr-3 text-xl">help_outline</span>
              Help & Support
            </a>
          </div>
          
          <div className="border-t border-border-light py-2">
            <a href="#" className="flex items-center px-4 py-2 text-status-error hover:bg-gray-100">
              <span className="material-icons text-status-error mr-3 text-xl">logout</span>
              Sign Out
            </a>
          </div>
        </div>
      }
    />
  </div>
);

export const NotificationsPopover = () => (
  <div className="flex justify-center p-16">
    <Popover
      placement="bottom"
      offset={12}
      trigger={
        <button className="relative p-2 text-text-secondary rounded-full hover:bg-gray-100">
          <span className="material-icons text-xl">notifications</span>
          <span className="absolute top-1 right-1 w-4 h-4 bg-status-error rounded-full flex items-center justify-center text-white text-xs">
            3
          </span>
        </button>
      }
      content={
        <div className="w-80">
          <div className="flex items-center justify-between p-3 border-b border-border-light">
            <h3 className="font-medium text-text-primary">Notifications</h3>
            <button className="text-sm text-primary hover:text-primary-dark">
              Mark all as read
            </button>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            <div className="p-3 border-b border-border-light bg-primary/5">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">
                    <span className="material-icons text-sm">person_add</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-text-primary">
                    <span className="font-medium">Sarah Johnson</span> mentioned you in a comment
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    "Hey @johndoe, can you review this design when you get a chance?"
                  </p>
                  <p className="text-xs text-text-secondary mt-2">
                    5 minutes ago
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border-b border-border-light bg-primary/5">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-status-success flex items-center justify-center text-white">
                    <span className="material-icons text-sm">task_alt</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-text-primary">
                    <span className="font-medium">Project Milestone</span> has been completed
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    The "UI Component Library" milestone has been marked as complete.
                  </p>
                  <p className="text-xs text-text-secondary mt-2">
                    1 hour ago
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border-b border-border-light bg-primary/5">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-status-warning flex items-center justify-center text-white">
                    <span className="material-icons text-sm">schedule</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-text-primary">
                    <span className="font-medium">Meeting Reminder</span>
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    Team standup meeting in 15 minutes.
                  </p>
                  <p className="text-xs text-text-secondary mt-2">
                    3 hours ago
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border-b border-border-light">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white">
                    <span className="material-icons text-sm">comment</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-text-primary">
                    <span className="font-medium">New Comment</span> on your post
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    Michael Brown commented on your post "New Design System".
                  </p>
                  <p className="text-xs text-text-secondary mt-2">
                    Yesterday
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white">
                    <span className="material-icons text-sm">star</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-text-primary">
                    <span className="font-medium">Project Update</span>
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    The project "Atavya Fresh" has been updated to version 2.0.
                  </p>
                  <p className="text-xs text-text-secondary mt-2">
                    2 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 border-t border-border-light text-center">
            <a href="#" className="text-sm text-primary hover:text-primary-dark">
              View all notifications
            </a>
          </div>
        </div>
      }
    />
  </div>
);

export const HelpPopover = () => (
  <div className="flex justify-center p-16">
    <Popover
      placement="left"
      trigger={
        <button className="w-6 h-6 rounded-full bg-gray-200 text-text-secondary flex items-center justify-center hover:bg-gray-300">
          ?
        </button>
      }
      content={
        <div className="w-64 p-3">
          <h3 className="text-sm font-medium text-text-primary mb-2">Help Information</h3>
          <p className="text-xs text-text-secondary mb-2">
            This field is used to set the primary color for your application theme. 
            The color should be in hex format (e.g. #FF5733).
          </p>
          <a href="#" className="text-xs text-primary hover:text-primary-dark">
            Learn more about color settings
          </a>
        </div>
      }
    />
  </div>
);
