import React from 'react';
import ReactionButton from './ReactionButton';

export default {
  title: "Communication/ReactionButton",
  component: ReactionButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onReact: { action: 'reacted' },
  },
};

const Template = (args) => <ReactionButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  reactions: [
    { id: 'like', emoji: '👍', label: 'Like' },
    { id: 'heart', emoji: '❤️', label: 'Love' },
    { id: 'laugh', emoji: '😄', label: 'Laugh' },
    { id: 'surprise', emoji: '😮', label: 'Surprise' },
    { id: 'sad', emoji: '😢', label: 'Sad' },
  ],
  selectedReactionId: null,
  reactionCounts: {
    like: 0,
    heart: 0,
    laugh: 0,
    surprise: 0,
    sad: 0,
  },
  showCounts: true,
};

export const WithSelectedReaction = Template.bind({});
WithSelectedReaction.args = {
  ...Default.args,
  selectedReactionId: 'like',
  reactionCounts: {
    like: 1,
    heart: 0,
    laugh: 0,
    surprise: 0,
    sad: 0,
  },
};

export const WithMultipleReactions = Template.bind({});
WithMultipleReactions.args = {
  ...Default.args,
  selectedReactionId: 'heart',
  reactionCounts: {
    like: 5,
    heart: 8,
    laugh: 2,
    surprise: 1,
    sad: 0,
  },
};

export const CustomEmojis = Template.bind({});
CustomEmojis.args = {
  reactions: [
    { id: 'clap', emoji: '👏', label: 'Clap' },
    { id: 'fire', emoji: '🔥', label: 'Fire' },
    { id: 'thinking', emoji: '🤔', label: 'Thinking' },
    { id: 'eyes', emoji: '👀', label: 'Eyes' },
    { id: 'rocket', emoji: '🚀', label: 'Rocket' },
  ],
  reactionCounts: {
    clap: 3,
    fire: 7,
    thinking: 2,
    eyes: 1,
    rocket: 4,
  },
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  ...Default.args,
  size: 'sm',
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  ...Default.args,
  size: 'lg',
};

export const WithoutCounts = Template.bind({});
WithoutCounts.args = {
  ...WithMultipleReactions.args,
  showCounts: false,
};

export const WithoutTooltips = Template.bind({});
WithoutTooltips.args = {
  ...Default.args,
  showTooltips: false,
};

