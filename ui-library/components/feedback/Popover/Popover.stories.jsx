import React, { useState } from 'react';
import Popover from './Popover';

export default {
  title: "Feedback/Popover",
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// Basic template for Popover stories
const Template = (args) => (
  <div className="p-20">
    <Popover {...args} />
  </div>
);

// Default Popover example
export const Default = Template.bind({});
Default.args = {
  trigger: <button className="px-4 py-2 bg-primary text-white rounded">Click me</button>,
  children: (
    <div className="p-4 w-64">
      <h3 className="text-sm font-medium text-text-primary mb-2">Popover Title</h3>
      <p className="text-xs text-text-secondary">
        This is a simple popover with some content. It can be used to display additional information.
      </p>
    </div>
  ),
};

// Different placements for the Popover
export const Placements = () => (
  <div className="grid grid-cols-3 gap-10 p-20">
    {[
      'top', 'top-start', 'top-end',
      'bottom', 'bottom-start', 'bottom-end',
      'left', 'left-start', 'left-end',
      'right', 'right-start', 'right-end'
    ].map((placement) => (
      <div key={placement} className="flex flex-col items-center">
        <span className="text-xs text-text-secondary mb-2">{placement}</span>
        <Popover
          trigger={<button className="px-3 py-1 bg-primary text-white text-xs rounded">{placement}</button>}
          placement={placement}
          children={
            <div className="p-3 w-36">
              <p className="text-xs text-text-primary">Popover on {placement}</p>
            </div>
          }
        />
      </div>
    ))}
  </div>
);

// Hover triggered Popover
export const HoverTrigger = Template.bind({});
HoverTrigger.args = {
  trigger: <button className="px-4 py-2 bg-status-success text-white rounded">Hover me</button>,
  triggerType: 'hover',
  children: (
    <div className="p-4 w-64">
      <h3 className="text-sm font-medium text-text-primary mb-2">Hover Tooltip</h3>
      <p className="text-xs text-text-secondary">
        This popover appears on hover instead of click.
      </p>
    </div>
  ),
};

// Controlled Popover
export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="p-10">
      <p className="mb-4">
        <button 
          className="px-2 py-1 bg-background-light rounded text-xs mr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close Popover' : 'Open Popover'}
        </button>
        <span className="text-xs text-text-secondary">
          External control: {isOpen ? 'Open' : 'Closed'}
        </span>
      </p>
      
      <Popover
        trigger={<button className="px-4 py-2 bg-primary text-white rounded">Controlled Popover</button>}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        children={
          <div className="p-4 w-64">
            <h3 className="text-sm font-medium text-text-primary mb-2">Controlled Popover</h3>
            <p className="text-xs text-text-secondary mb-2">
              This popover is controlled externally.
            </p>
            <button 
              className="px-2 py-1 bg-status-danger text-white rounded text-xs"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        }
      />
    </div>
  );
};

// Without arrow
export const WithoutArrow = Template.bind({});
WithoutArrow.args = {
  trigger: <button className="px-4 py-2 bg-status-warning text-white rounded">No Arrow</button>,
  hasArrow: false,
  children: (
    <div className="p-4 w-64">
      <h3 className="text-sm font-medium text-text-primary mb-2">No Arrow Popover</h3>
      <p className="text-xs text-text-secondary">
        This popover doesn't have an arrow pointing to the trigger element.
      </p>
    </div>
  ),
};

// Disabled Popover
export const Disabled = Template.bind({});
Disabled.args = {
  trigger: <button className="px-4 py-2 bg-background-disabled text-text-disabled rounded">Disabled</button>,
  disabled: true,
  children: (
    <div className="p-4 w-64">
      <p className="text-xs text-text-secondary">This content won't be shown.</p>
    </div>
  ),
};

// Form in Popover
export const WithForm = Template.bind({});
WithForm.args = {
  trigger: <button className="px-4 py-2 bg-primary text-white rounded">Open Form</button>,
  width: '300px',
  children: (
    <div className="p-4">
      <h3 className="text-sm font-medium text-text-primary mb-3">Contact Form</h3>
      <form className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-text-primary mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border-medium rounded-md text-xs text-text-primary"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-primary mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-border-medium rounded-md text-xs text-text-primary"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-primary mb-1">Message</label>
          <textarea
            className="w-full px-3 py-2 border border-border-medium rounded-md text-xs text-text-primary"
            rows="3"
            placeholder="Your message"
          ></textarea>
        </div>
        <div className="pt-2">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded-md text-xs hover:bg-primary-dark"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  ),
};

// Interactive demo with custom styling
export const InteractiveExampleWithCustomStyling = () => {
  return (
    <div className="flex items-center justify-center p-10">
      <Popover
        trigger={
          <button className="px-5 py-2.5 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-all duration-200">
            User Profile
          </button>
        }
        placement="bottom-start"
        contentClassName="p-0 overflow-hidden w-72"
        hasArrow={false}
      >
        <div>
          <div className="bg-primary p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-medium text-xl">
                JD
              </div>
              <div>
                <h3 className="text-white font-medium">John Doe</h3>
                <p className="text-white/80 text-xs">Product Manager</p>
              </div>
            </div>
          </div>
          
          <div className="p-3">
            <div className="space-y-2">
              <a href="#" className="flex items-center space-x-2 p-2 hover:bg-background-light rounded-md transition-colors text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-text-primary">View Profile</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-2 hover:bg-background-light rounded-md transition-colors text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-text-primary">Account Settings</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-2 hover:bg-background-light rounded-md transition-colors text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-status-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-text-primary">Sign Out</span>
              </a>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

// Real-world examples
export const NotificationPopover = () => {
  return (
    <div className="flex items-center justify-center p-10">
      <Popover
        trigger={
          <button className="relative p-2 rounded-full bg-background-light hover:bg-background-skeleton text-text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-status-danger flex items-center justify-center text-white text-xs">3</span>
          </button>
        }
        placement="bottom-end"
        contentClassName="p-0 overflow-hidden w-80"
      >
        <div>
          <div className="bg-background-light p-3 border-b border-border-light">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-text-primary">Notifications</h3>
              <button className="text-primary text-xs hover:text-primary-dark">Mark all as read</button>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            <div className="p-3 border-b border-border-light hover:bg-background-light">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-status-success/10 flex items-center justify-center text-status-success">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-text-primary">Your report is ready to download</p>
                  <p className="text-xs text-text-secondary mt-1">5 minutes ago</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border-b border-border-light hover:bg-background-light">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-status-warning/10 flex items-center justify-center text-status-warning">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-text-primary">Your subscription will expire soon</p>
                  <p className="text-xs text-text-secondary mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 hover:bg-background-light">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-text-primary">New comment on your post</p>
                  <p className="text-xs text-text-secondary mt-1">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-2 bg-background-light border-t border-border-light">
            <button className="w-full py-2 text-center text-primary text-sm hover:text-primary-dark">
              View all notifications
            </button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export const UserMenuPopover = () => {
  return (
    <div className="flex items-center justify-center p-10">
      <Popover
        trigger={
          <button className="flex items-center space-x-2 px-3 py-2 border border-border-light rounded-md hover:bg-background-light">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              SA
            </div>
            <span className="text-text-primary">Sarah Adams</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        }
        placement="bottom-end"
        contentClassName="p-0 overflow-hidden w-56"
      >
        <div>
          <div className="p-3 border-b border-border-light">
            <div className="flex flex-col">
              <span className="font-medium text-text-primary">Sarah Adams</span>
              <span className="text-xs text-text-secondary">sarah.adams@example.com</span>
            </div>
          </div>
          
          <div className="py-1">
            <a href="#" className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-background-light">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-background-light">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-background-light">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help
            </a>
          </div>
          
          <div className="py-1 border-t border-border-light">
            <a href="#" className="flex items-center px-4 py-2 text-sm text-status-danger hover:bg-background-light">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-status-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </a>
          </div>
        </div>
      </Popover>
    </div>
  );
};
