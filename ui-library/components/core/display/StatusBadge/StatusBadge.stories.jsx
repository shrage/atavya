import React from 'react';
import StatusBadge from './StatusBadge';

export default {
  title: "Core/Display/StatusBadge",
  component: StatusBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile status badge component following the Atavya design system, used to display status indicators with consistent styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    icon: { control: false },
  },
};

const Template = (args) => <StatusBadge {...args} />;

// Sample icons
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
);

const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Default',
  status: 'default',
};

export const Research = Template.bind({});
Research.args = {
  label: 'Research',
  status: 'research',
};

export const Campaign = Template.bind({});
Campaign.args = {
  label: 'Campaign',
  status: 'campaign',
};

export const Copywriting = Template.bind({});
Copywriting.args = {
  label: 'Copywriting',
  status: 'copywriting',
};

export const Live = Template.bind({});
Live.args = {
  label: 'Live',
  status: 'live',
};

export const Management = Template.bind({});
Management.args = {
  label: 'Management',
  status: 'management',
};

export const Request = Template.bind({});
Request.args = {
  label: 'Request',
  status: 'request',
};

// Different sizes
export const Sizes = () => (
  <div className="flex flex-col space-y-2 items-start">
    <StatusBadge label="Small" size="sm" status="research" />
    <StatusBadge label="Medium (Default)" size="md" status="campaign" />
    <StatusBadge label="Large" size="lg" status="live" />
  </div>
);

// Different rounded styles
export const RoundedStyles = () => (
  <div className="flex flex-col space-y-2 items-start">
    <StatusBadge label="None" rounded="none" status="research" />
    <StatusBadge label="Small" rounded="sm" status="campaign" />
    <StatusBadge label="Medium (Default)" rounded="md" status="copywriting" />
    <StatusBadge label="Large" rounded="lg" status="live" />
    <StatusBadge label="Full" rounded="full" status="management" />
  </div>
);

// With icons
export const WithIcons = () => (
  <div className="flex flex-col space-y-2 items-start">
    <StatusBadge 
      label="Success" 
      status="live" 
      icon={<CheckIcon />} 
    />
    <StatusBadge 
      label="Warning" 
      status="campaign" 
      icon={<WarningIcon />} 
    />
  </div>
);

// Interactive badges
export const Interactive = () => (
  <div className="flex flex-col space-y-2 items-start">
    <StatusBadge 
      label="Click me" 
      status="research" 
      onClick={() => alert('Research badge clicked!')} 
    />
    <StatusBadge 
      label="With icon" 
      status="campaign" 
      icon={<WarningIcon />}
      onClick={() => alert('Campaign badge with icon clicked!')} 
    />
  </div>
);

// All statuses in a grid
export const AllStatuses = () => (
  <div className="grid grid-cols-2 gap-2">
    <StatusBadge label="Default" status="default" />
    <StatusBadge label="Research" status="research" />
    <StatusBadge label="Campaign" status="campaign" />
    <StatusBadge label="Copywriting" status="copywriting" />
    <StatusBadge label="Live" status="live" />
    <StatusBadge label="Management" status="management" />
    <StatusBadge label="Request" status="request" />
  </div>
);

// Real-world examples
export const RealWorldExamples = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-text-secondary text-sm mb-2">Project Status Indicators</h3>
      <div className="flex flex-wrap gap-2">
        <StatusBadge label="Research" status="research" />
        <StatusBadge label="Planning" status="management" />
        <StatusBadge label="In Progress" status="campaign" />
        <StatusBadge label="Review" status="copywriting" />
        <StatusBadge label="Complete" status="live" />
      </div>
    </div>
    
    <div>
      <h3 className="text-text-secondary text-sm mb-2">Task Priority</h3>
      <div className="flex flex-wrap gap-2">
        <StatusBadge label="Low" status="default" />
        <StatusBadge label="Medium" status="campaign" />
        <StatusBadge label="High" status="request" />
        <StatusBadge label="Critical" status="live" />
      </div>
    </div>
    
    <div>
      <h3 className="text-text-secondary text-sm mb-2">Interactive Filters</h3>
      <div className="flex flex-wrap gap-2">
        <StatusBadge 
          label="Marketing" 
          status="campaign" 
          onClick={() => alert('Filter by Marketing')} 
        />
        <StatusBadge 
          label="Design" 
          status="research" 
          onClick={() => alert('Filter by Design')} 
        />
        <StatusBadge 
          label="Development" 
          status="management" 
          onClick={() => alert('Filter by Development')} 
        />
        <StatusBadge 
          label="Content" 
          status="copywriting" 
          onClick={() => alert('Filter by Content')} 
        />
      </div>
    </div>
  </div>
);
