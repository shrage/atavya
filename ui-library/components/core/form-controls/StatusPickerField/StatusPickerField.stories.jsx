import React, { useState } from 'react';
import StatusPickerField from './StatusPickerField';

export default {
  title: 'Form Controls/StatusPickerField',
  component: StatusPickerField,
  parameters: {
    docs: {
      description: {
        component: 'A field component for selecting status values with visual indicators.',
      },
    },
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
};

// Common status options used across stories
const statusOptions = [
  { value: 'default', label: 'Default' },
  { value: 'research', label: 'Research', description: 'Initial research phase of the project' },
  { value: 'campaign', label: 'Campaign', description: 'Active marketing campaign' },
  { value: 'copywriting', label: 'Copywriting', description: 'Content creation and editing' },
  { value: 'live', label: 'Live', description: 'Project is live and active' },
  { value: 'management', label: 'Management', description: 'Under ongoing management' },
  { value: 'request', label: 'Request', description: 'Pending client request' },
];

// Basic example
export const Basic = () => (
  <StatusPickerField
    label="Project Status"
    options={statusOptions}
  />
);

// Controlled component example
export const Controlled = () => {
  const [status, setStatus] = useState('research');
  
  return (
    <div className="space-y-4">
      <StatusPickerField
        label="Project Status"
        value={status}
        onChange={(value) => setStatus(value)}
        options={statusOptions}
      />
      
      <div className="p-3 bg-gray-100 rounded">
        <p className="text-sm">Selected status: <strong>{status}</strong></p>
      </div>
    </div>
  );
};

// With descriptions
export const WithDescriptions = () => (
  <StatusPickerField
    label="Project Status"
    options={statusOptions}
    showDescription={true}
  />
);

// Different sizes
export const Sizes = () => (
  <div className="space-y-4">
    <StatusPickerField
      label="Small Size"
      options={statusOptions}
      size="sm"
    />
    
    <StatusPickerField
      label="Medium Size (Default)"
      options={statusOptions}
      size="md"
    />
    
    <StatusPickerField
      label="Large Size"
      options={statusOptions}
      size="lg"
    />
  </div>
);

// With validation error
export const WithError = () => (
  <StatusPickerField
    label="Project Status"
    options={statusOptions}
    error="Please select a valid status"
    required
  />
);

// Disabled state
export const Disabled = () => (
  <StatusPickerField
    label="Project Status"
    options={statusOptions}
    value="live"
    disabled
  />
);

// With allowed transitions
export const WithAllowedTransitions = () => {
  const [status, setStatus] = useState('research');
  
  // Define allowed transitions between statuses
  const allowedTransitions = {
    'research': ['campaign', 'copywriting'],
    'campaign': ['live', 'management'],
    'copywriting': ['campaign', 'live'],
    'live': ['management'],
    'management': ['request'],
    'request': ['research', 'management'],
  };
  
  return (
    <div className="space-y-4">
      <StatusPickerField
        label="Project Status (with workflow restrictions)"
        value={status}
        onChange={(value) => setStatus(value)}
        options={statusOptions}
        allowedTransitions={allowedTransitions}
        showDescription={true}
      />
      
      <div className="p-3 bg-gray-100 rounded">
        <p className="text-sm">Current status: <strong>{status}</strong></p>
        <p className="text-xs text-gray-500 mt-1">
          Only allowed transitions are shown in the dropdown
        </p>
      </div>
    </div>
  );
};

// Inline edit mode
export const InlineEdit = () => {
  const [status, setStatus] = useState('live');
  
  return (
    <StatusPickerField
      label="Project Status"
      value={status}
      onChange={(value) => setStatus(value)}
      options={statusOptions}
      inlineEdit={true}
    />
  );
};

// In a form context
export const InFormContext = () => {
  const [formData, setFormData] = useState({
    title: 'Marketing Campaign Q2',
    status: 'campaign',
    assignee: 'Sarah Johnson',
  });
  
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  
  return (
    <div className="p-4 border rounded max-w-md">
      <h2 className="text-lg font-medium mb-4">Project Details</h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="w-24 text-sm text-gray-500">Title:</span>
          <span>{formData.title}</span>
        </div>
        
        <div className="flex items-start">
          <span className="w-24 text-sm text-gray-500 pt-2">Status:</span>
          <div className="flex-1">
            <StatusPickerField
              hideLabel
              value={formData.status}
              onChange={(value) => handleChange('status', value)}
              options={statusOptions}
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="w-24 text-sm text-gray-500">Assignee:</span>
          <span>{formData.assignee}</span>
        </div>
      </div>
    </div>
  );
};

// With custom styling
export const CustomStyling = () => (
  <StatusPickerField
    label="Project Status"
    options={statusOptions}
    className="border-l-4 border-l-primary pl-3"
  />
);
