import React from 'react';
import ActionButtonBar from './ActionButtonBar';

export default {
  title: "Feedback/ActionButtonBar",
  component: ActionButtonBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const Template = (args) => <ActionButtonBar {...args} />;

// Icons for the stories
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
    <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
  </svg>
);

// Common action set with various actions
const basicActions = [
  {
    id: 'edit',
    label: 'Edit',
    icon: <EditIcon />,
    onClick: () => console.log('Edit clicked'),
  },
  {
    id: 'copy',
    label: 'Copy',
    icon: <CopyIcon />,
    onClick: () => console.log('Copy clicked'),
  },
  {
    id: 'share',
    label: 'Share',
    icon: <ShareIcon />,
    onClick: () => console.log('Share clicked'),
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <DeleteIcon />,
    variant: 'danger',
    onClick: () => console.log('Delete clicked'),
  },
];

export const Default = Template.bind({});
Default.args = {
  actions: basicActions,
};

export const WithDividers = Template.bind({});
WithDividers.args = {
  actions: basicActions,
  dividers: true,
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  actions: basicActions.map(action => ({
    ...action,
    label: undefined,
  })),
};

export const Small = Template.bind({});
Small.args = {
  actions: basicActions,
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  actions: basicActions,
  size: 'lg',
};

export const GhostVariant = Template.bind({});
GhostVariant.args = {
  actions: basicActions,
  variant: 'ghost',
};

export const MinimalVariant = Template.bind({});
MinimalVariant.args = {
  actions: basicActions,
  variant: 'minimal',
};

export const PrimaryVariant = Template.bind({});
PrimaryVariant.args = {
  actions: basicActions,
  variant: 'primary',
};

export const MixedVariants = Template.bind({});
MixedVariants.args = {
  actions: [
    {
      id: 'edit',
      label: 'Edit',
      icon: <EditIcon />,
      variant: 'default',
      onClick: () => console.log('Edit clicked'),
    },
    {
      id: 'copy',
      label: 'Copy',
      icon: <CopyIcon />,
      variant: 'ghost',
      onClick: () => console.log('Copy clicked'),
    },
    {
      id: 'share',
      label: 'Share',
      icon: <ShareIcon />,
      variant: 'primary',
      onClick: () => console.log('Share clicked'),
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <DeleteIcon />,
      variant: 'danger',
      onClick: () => console.log('Delete clicked'),
    },
  ],
};

export const VerticalOrientation = Template.bind({});
VerticalOrientation.args = {
  actions: basicActions,
  orientation: 'vertical',
};

export const WithDisabledButton = Template.bind({});
WithDisabledButton.args = {
  actions: [
    ...basicActions.slice(0, 2),
    {
      ...basicActions[2],
      disabled: true,
    },
    basicActions[3],
  ],
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  actions: basicActions,
  fullWidth: true,
};

