import React from 'react';
import MessageItem from './MessageItem';

export default {
  title: "Communication/MessageItem",
  component: MessageItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    sender: { control: 'text' },
    senderAvatar: { control: 'text' },
    content: { control: 'text' },
    timestamp: { control: 'date' },
    isRead: { control: 'boolean' },
    recipients: { control: 'array' },
    attachments: { control: 'object' },
    isExpandable: { control: 'boolean' },
  },
};

const Template = (args) => <MessageItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  sender: 'Jane Doe',
  content: 'Hey team, just wanted to check in on the project status. Do we have any updates for the client meeting tomorrow?',
  timestamp: new Date(),
  isRead: true,
  recipients: ['Marketing Team'],
  attachments: [],
  isExpandable: false,
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  ...Default.args,
  senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
};

export const Unread = Template.bind({});
Unread.args = {
  ...Default.args,
  isRead: false,
};

export const LongMessage = Template.bind({});
LongMessage.args = {
  ...Default.args,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nisl eu nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nisl eu nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nisl eu nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nisl eu nisl.',
  isExpandable: true,
};

export const WithAttachments = Template.bind({});
WithAttachments.args = {
  ...Default.args,
  attachments: [
    { name: 'project-proposal.pdf', url: '#', type: 'pdf' },
    { name: 'meeting-notes.docx', url: '#', type: 'docx' },
  ],
};

export const MultipleRecipients = Template.bind({});
MultipleRecipients.args = {
  ...Default.args,
  recipients: ['John Smith', 'Sarah Johnson', 'Marketing Team', 'Development Team'],
};

