import React from 'react';
import BadgeCounter from './BadgeCounter';

export default {
  title: "Core/Display/BadgeCounter",
  component: BadgeCounter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

const Template = (args) => <BadgeCounter {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: 5,
};

export const MaxReached = Template.bind({});
MaxReached.args = {
  count: 100,
  max: 99,
};

export const CustomMax = Template.bind({});
CustomMax.args = {
  count: 50,
  max: 10,
};

export const Danger = Template.bind({});
Danger.args = {
  count: 3,
  color: 'danger',
};

export const Success = Template.bind({});
Success.args = {
  count: 12,
  color: 'success',
};

export const Warning = Template.bind({});
Warning.args = {
  count: 7,
  color: 'warning',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  count: 9,
  size: 'sm',
};

export const ExtraSmallSize = Template.bind({});
ExtraSmallSize.args = {
  count: 4,
  size: 'xs',
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  count: 15,
  size: 'lg',
};

export const ZeroCount = Template.bind({});
ZeroCount.args = {
  count: 0,
  showZero: true,
};

export const EmptyBadge = Template.bind({});
EmptyBadge.args = {
  count: 0,
  showEmpty: true,
};

export const Outlined = Template.bind({});
Outlined.args = {
  count: 8,
  outline: true,
};

export const Clickable = Template.bind({});
Clickable.args = {
  count: 6,
  onClick: () => alert('Badge clicked!'),
};

// Example of how a BadgeCounter would be used as an overlay
export const AsOverlay = () => (
  <div className="relative inline-block">
    <button className="bg-background-light border border-border-medium rounded-md p-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </button>
    <BadgeCounter count={7} color="danger" overlayPosition="top-right" />
  </div>
);

// Shows multiple badge variants together
export const ComparisonGrid = () => (
  <div className="grid grid-cols-4 gap-4">
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-sm font-medium text-text-primary">Colors</h3>
      <BadgeCounter count={5} color="primary" />
      <BadgeCounter count={5} color="secondary" />
      <BadgeCounter count={5} color="success" />
      <BadgeCounter count={5} color="danger" />
      <BadgeCounter count={5} color="warning" />
      <BadgeCounter count={5} color="info" />
      <BadgeCounter count={5} color="gray" />
    </div>
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-sm font-medium text-text-primary">Sizes</h3>
      <BadgeCounter count={5} size="xs" />
      <BadgeCounter count={5} size="sm" />
      <BadgeCounter count={5} size="md" />
      <BadgeCounter count={5} size="lg" />
    </div>
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-sm font-medium text-text-primary">Outline</h3>
      <BadgeCounter count={5} color="primary" outline />
      <BadgeCounter count={5} color="secondary" outline />
      <BadgeCounter count={5} color="success" outline />
      <BadgeCounter count={5} color="danger" outline />
    </div>
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-sm font-medium text-text-primary">Special</h3>
      <BadgeCounter count={100} />
      <BadgeCounter count={0} showZero />
      <BadgeCounter count={0} showEmpty />
    </div>
  </div>
);

// Real-world examples
export const RealWorldExamples = () => (
  <div className="space-y-6 max-w-md">
    <div className="p-4 border border-border-light rounded-md bg-background-light">
      <h3 className="text-text-primary font-medium mb-3">Navigation Menu</h3>
      <div className="flex space-x-6">
        <div className="relative">
          <button className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-text-secondary text-xs mt-1">Home</span>
          </button>
        </div>
        
        <div className="relative">
          <button className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-text-secondary text-xs mt-1">Messages</span>
          </button>
          <BadgeCounter count={12} color="primary" overlayPosition="top-right" />
        </div>
        
        <div className="relative">
          <button className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="text-text-secondary text-xs mt-1">Notifications</span>
          </button>
          <BadgeCounter count={3} color="danger" overlayPosition="top-right" />
        </div>
        
        <div className="relative">
          <button className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-text-secondary text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>

    <div className="p-4 border border-border-light rounded-md bg-background-light">
      <h3 className="text-text-primary font-medium mb-3">Email Inbox</h3>
      <div className="space-y-2">
        {[
          { folder: 'Inbox', count: 24, color: 'primary' },
          { folder: 'Spam', count: 7, color: 'warning' },
          { folder: 'Drafts', count: 3, color: 'secondary' },
          { folder: 'Sent', count: 0, showEmpty: true, color: 'gray' },
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 hover:bg-background-skeleton rounded">
            <span className="text-text-primary">{item.folder}</span>
            <BadgeCounter 
              count={item.count} 
              color={item.color} 
              showEmpty={item.showEmpty} 
              size="sm" 
            />
          </div>
        ))}
      </div>
    </div>

    <div className="p-4 border border-border-light rounded-md bg-background-light">
      <h3 className="text-text-primary font-medium mb-3">E-commerce Cart</h3>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button className="relative p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <BadgeCounter count={4} color="primary" overlayPosition="top-right" size="sm" />
          </button>
          <span className="ml-2 text-text-primary">Shopping Cart</span>
        </div>
        <button className="px-3 py-1 bg-primary text-white rounded-md text-sm hover:bg-primary-dark">
          Checkout
        </button>
      </div>
    </div>
  </div>
);
