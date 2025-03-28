import React from 'react';
import MultiUserAvatarGroup from './MultiUserAvatarGroup';

export default {
  title: "Communication/MultiUserAvatarGroup",
  component: MultiUserAvatarGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'group clicked' },
    onUserClick: { action: 'user clicked' },
  },
};

const Template = (args) => <MultiUserAvatarGroup {...args} />;

// Sample users with avatars
const users = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'online',
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    status: 'away',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    status: 'busy',
  },
  {
    id: 4,
    name: 'Emily Davis',
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
  },
  {
    id: 5,
    name: 'Michael Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    status: 'online',
  },
  {
    id: 6,
    name: 'Olivia Brown',
  },
];

export const Default = Template.bind({});
Default.args = {
  users: users.slice(0, 3),
};

export const WithMoreUsers = Template.bind({});
WithMoreUsers.args = {
  users,
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  users,
  size: 'sm',
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  users: users.slice(0, 4),
  size: 'lg',
};

export const WithNoOverlap = Template.bind({});
WithNoOverlap.args = {
  users: users.slice(0, 4),
  overlap: 0,
};

export const HighOverlap = Template.bind({});
HighOverlap.args = {
  users,
  overlap: 0.6,
};

export const ShowMoreUsers = Template.bind({});
ShowMoreUsers.args = {
  users,
  maxVisible: 5,
};

export const HideExtraCount = Template.bind({});
HideExtraCount.args = {
  users,
  showExtraCount: false,
};

export const WithoutAvatars = Template.bind({});
WithoutAvatars.args = {
  users: [
    { id: 1, name: 'John Doe', status: 'online' },
    { id: 2, name: 'Jane Smith', status: 'away' },
    { id: 3, name: 'Robert Johnson', status: 'busy' },
    { id: 4, name: 'Emily Davis' },
    { id: 5, name: 'Michael Wilson' },
  ],
};

export const WithoutNames = Template.bind({});
WithoutNames.args = {
  users: [
    { id: 1, avatar: 'https://randomuser.me/api/portraits/men/32.jpg', status: 'online' },
    { id: 2, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
    { id: 4 },
    { id: 5 },
  ],
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  users,
  size: 'xs',
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  users: users.slice(0, 3),
  size: 'xl',
};

export const Clickable = Template.bind({});
Clickable.args = {
  users: users.slice(0, 4),
  onUserClick: (user) => console.log('Clicked on user:', user),
};

