import React from 'react';
import ThreadItem from './ThreadItem';

export default {
  title: "Communication/ThreadItem",
  component: ThreadItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    messages: { control: 'object' },
    participants: { control: 'object' },
    unreadCount: { control: 'number' },
    isExpanded: { control: 'boolean' },
    onToggleExpand: { action: 'toggled' },
  },
};

const Template = (args) => <ThreadItem {...args} />;

// Sample data
const participants = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 3,
    name: 'Mark Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
];

const messages = [
  {
    id: 1,
    sender: participants[0],
    content: 'Hey team, I wanted to discuss the project timeline. Can we meet tomorrow?',
    timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
  },
  {
    id: 2,
    sender: participants[1],
    content: 'Sure, I\'m available after 2pm. Does that work for everyone?',
    timestamp: new Date(Date.now() - 86400000 * 1), // 1 day ago
  },
  {
    id: 3,
    sender: participants[2],
    content: 'Works for me. I\'ll set up a meeting and send out an invite.',
    timestamp: new Date(Date.now() - 36000000), // 10 hours ago
  },
];

export const Default = Template.bind({});
Default.args = {
  title: "Communication/ThreadItem",
  messages,
  participants,
  unreadCount: 0,
  isExpanded: false,
};

export const WithUnreadMessages = Template.bind({});
WithUnreadMessages.args = {
  ...Default.args,
  unreadCount: 2,
};

export const Expanded = Template.bind({});
Expanded.args = {
  ...Default.args,
  isExpanded: true,
};

export const ManyParticipants = Template.bind({});
ManyParticipants.args = {
  ...Default.args,
  participants: [
    ...participants,
    {
      id: 4,
      name: 'Sarah Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    },
    {
      id: 5,
      name: 'Robert Brown',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
  ],
};

export const LongThread = Template.bind({});
LongThread.args = {
  ...Default.args,
  messages: [
    ...messages,
    {
      id: 4,
      sender: participants[0],
      content: 'I\'ve prepared some slides for our discussion. I\'ll share them before the meeting.',
      timestamp: new Date(Date.now() - 18000000), // 5 hours ago
    },
    {
      id: 5,
      sender: participants[1],
      content: 'Great, looking forward to it!',
      timestamp: new Date(), // Now
    },
  ],
  isExpanded: true,
};

