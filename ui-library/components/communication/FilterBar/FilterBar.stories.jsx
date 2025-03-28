import React from 'react';
import FilterBar from './FilterBar';

export default {
  title: "Communication/FilterBar",
  component: FilterBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' }
  },
};

const Template = (args) => <FilterBar {...args} />;

const messageIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.672 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.23 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.672-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
  </svg>
);

const notificationIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z" clipRule="evenodd" />
  </svg>
);

const snoozedIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
  </svg>
);

const archiveIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2z" />
    <path fillRule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zm5.22 1.72a.75.75 0 011.06 0L10 10.94l1.72-1.72a.75.75 0 111.06 1.06L11.06 12l1.72 1.72a.75.75 0 11-1.06 1.06L10 13.06l-1.72 1.72a.75.75 0 01-1.06-1.06L8.94 12l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

export const Default = Template.bind({});
Default.args = {
  filters: [
    { id: 'messages', label: 'Messages', icon: messageIcon, count: 12 },
    { id: 'notifications', label: 'Notifications', icon: notificationIcon, count: 5 },
    { id: 'snoozed', label: 'Snoozed', icon: snoozedIcon },
    { id: 'archive', label: 'Archive', icon: archiveIcon },
  ],
};

export const WithActiveFilter = Template.bind({});
WithActiveFilter.args = {
  ...Default.args,
  activeFilterId: 'messages',
};

export const MultipleSelection = Template.bind({});
MultipleSelection.args = {
  ...Default.args,
  allowMultiple: true,
  activeFilterId: ['messages', 'notifications'],
};

export const NoIcons = Template.bind({});
NoIcons.args = {
  filters: [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread', count: 7 },
    { id: 'flagged', label: 'Flagged', count: 3 },
    { id: 'mentions', label: 'Mentions', count: 2 },
  ],
};

export const ManyFilters = Template.bind({});
ManyFilters.args = {
  filters: [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread', count: 8 },
    { id: 'important', label: 'Important', count: 3 },
    { id: 'drafts', label: 'Drafts', count: 2 },
    { id: 'sent', label: 'Sent' },
    { id: 'spam', label: 'Spam', count: 12 },
    { id: 'trash', label: 'Trash' },
    { id: 'starred', label: 'Starred', count: 5 },
  ],
};

