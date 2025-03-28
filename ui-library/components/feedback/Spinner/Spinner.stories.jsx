import React from 'react';
import Spinner from './Spinner';

export default {
  title: "Feedback/Spinner",
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const Template = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Loading...',
};

export const Sizes = () => (
  <div className="flex flex-col items-center space-y-4">
    <div className="flex items-end space-x-8">
      <div className="flex flex-col items-center">
        <span className="text-text-secondary text-xs mb-2">XS</span>
        <Spinner size="xs" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-text-secondary text-xs mb-2">SM</span>
        <Spinner size="sm" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-text-secondary text-xs mb-2">MD</span>
        <Spinner size="md" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-text-secondary text-xs mb-2">LG</span>
        <Spinner size="lg" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-text-secondary text-xs mb-2">XL</span>
        <Spinner size="xl" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-text-secondary text-xs mb-2">2XL</span>
        <Spinner size="2xl" />
      </div>
    </div>
    <div className="flex items-end space-x-8 mt-8">
      <div className="flex flex-col items-center">
        <span className="text-text-secondary text-xs mb-2">XS with label</span>
        <Spinner size="xs" label="Loading" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-text-secondary text-xs mb-2">SM with label</span>
        <Spinner size="sm" label="Loading" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-text-secondary text-xs mb-2">MD with label</span>
        <Spinner size="md" label="Loading" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-text-secondary text-xs mb-2">LG with label</span>
        <Spinner size="lg" label="Loading" />
      </div>
    </div>
  </div>
);

export const Colors = () => (
  <div className="grid grid-cols-2 gap-6">
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Primary</span>
      <Spinner color="primary" />
    </div>
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Secondary</span>
      <Spinner color="secondary" />
    </div>
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Success</span>
      <Spinner color="success" />
    </div>
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Danger</span>
      <Spinner color="danger" />
    </div>
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Warning</span>
      <Spinner color="warning" />
    </div>
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Info</span>
      <Spinner color="info" />
    </div>
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Light</span>
      <Spinner color="light" />
    </div>
    <div className="flex flex-col items-center bg-background-dark p-2 rounded">
      <span className="text-xs mb-2 text-white">White</span>
      <Spinner color="white" />
    </div>
  </div>
);

export const Thickness = () => (
  <div className="flex items-end space-x-8">
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Thin</span>
      <Spinner thickness="thin" size="lg" />
    </div>
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Regular</span>
      <Spinner thickness="regular" size="lg" />
    </div>
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Thick</span>
      <Spinner thickness="thick" size="lg" />
    </div>
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Extra Thick</span>
      <Spinner thickness="extraThick" size="lg" />
    </div>
  </div>
);

export const LabelPositions = () => (
  <div className="grid grid-cols-2 gap-6">
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Top</span>
      <Spinner label="Loading" labelPosition="top" />
    </div>
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Right</span>
      <Spinner label="Loading" labelPosition="right" />
    </div>
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Bottom</span>
      <Spinner label="Loading" labelPosition="bottom" />
    </div>
    <div className="flex flex-col items-center">
      <span className="text-text-secondary text-xs mb-2">Left</span>
      <Spinner label="Loading" labelPosition="left" />
    </div>
  </div>
);

export const WithOverlay = () => (
  <div className="w-64 h-40 bg-background-light border border-border-light rounded relative">
    <div className="p-4">
      <h3 className="text-lg font-medium text-text-primary">Card Title</h3>
      <p className="text-sm text-text-secondary">This content is behind the spinner overlay.</p>
    </div>
    <Spinner overlay label="Loading" />
  </div>
);

export const InButton = () => (
  <div className="space-y-4">
    <button className="px-4 py-2 bg-primary text-white rounded-md flex items-center justify-center space-x-2 w-32 hover:bg-primary-dark">
      <Spinner size="xs" color="white" />
      <span>Loading</span>
    </button>
    
    <button className="px-4 py-2 bg-primary text-white rounded-md flex items-center justify-center w-32 hover:bg-primary-dark">
      <Spinner size="xs" color="white" />
    </button>
    
    <button className="px-4 py-2 border border-border-light rounded-md flex items-center justify-center space-x-2 w-32 text-text-primary hover:bg-background-light">
      <Spinner size="xs" color="primary" />
      <span>Loading</span>
    </button>
  </div>
);

export const InCard = () => (
  <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-border-light">
    <div className="p-8 flex flex-col items-center justify-center">
      <Spinner size="lg" />
      <p className="mt-4 text-center text-text-secondary">Loading your data...</p>
    </div>
  </div>
);

// This won't actually be full page in Storybook, but shows the concept
export const FullPage = Template.bind({});
FullPage.args = {
  fullPage: true,
  size: 'xl',
  label: 'Loading application...',
};
