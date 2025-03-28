import React, { useState } from 'react';
import { RadioButton, RadioGroup } from './index';

export default {
  title: 'Core/Form Controls/Radio',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Radio buttons allow users to select one option from a set.'
      }
    }
  },
  argTypes: {
    onChange: { action: 'changed' }
  }
};

// Individual RadioButton stories
export const Default = (args) => <RadioButton {...args} />;
Default.args = {
  label: 'Radio option',
  value: 'option1',
  name: 'default-radio'
};

export const Checked = (args) => <RadioButton {...args} />;
Checked.args = {
  label: 'Selected option',
  value: 'option1',
  name: 'checked-radio',
  checked: true
};

export const WithHelperText = (args) => <RadioButton {...args} />;
WithHelperText.args = {
  label: 'Radio with helper text',
  value: 'option1',
  name: 'helper-radio',
  helperText: 'Additional information about this option'
};

export const Disabled = (args) => (
  <div className="space-y-3">
    <RadioButton 
      label="Disabled option" 
      value="option1" 
      name="disabled-radio" 
      disabled 
    />
    <RadioButton 
      label="Disabled selected option" 
      value="option2" 
      name="disabled-radio" 
      disabled 
      checked 
    />
  </div>
);

export const WithError = (args) => <RadioButton {...args} />;
WithError.args = {
  label: 'Radio with error',
  value: 'option1',
  name: 'error-radio',
  error: 'This field has an error',
  helperText: 'Please select a valid option'
};

export const Required = (args) => <RadioButton {...args} />;
Required.args = {
  label: 'Required option',
  value: 'option1',
  name: 'required-radio',
  required: true
};

// RadioGroup stories
export const BasicGroup = () => {
  const [value, setValue] = useState('option1');
  
  return (
    <RadioGroup
      name="basic-group"
      label="Select an option"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <RadioButton value="option1" label="Option 1" />
      <RadioButton value="option2" label="Option 2" />
      <RadioButton value="option3" label="Option 3" />
    </RadioGroup>
  );
};

export const HorizontalGroup = () => {
  const [value, setValue] = useState('option2');
  
  return (
    <RadioGroup
      name="horizontal-group"
      label="Horizontal layout"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      orientation="horizontal"
    >
      <RadioButton value="option1" label="Option 1" />
      <RadioButton value="option2" label="Option 2" />
      <RadioButton value="option3" label="Option 3" />
    </RadioGroup>
  );
};

export const GroupWithHelperText = () => {
  const [value, setValue] = useState('');
  
  return (
    <RadioGroup
      name="helper-group"
      label="With helper text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      helperText="Please select one of the options above"
    >
      <RadioButton value="option1" label="Option 1" />
      <RadioButton value="option2" label="Option 2" />
      <RadioButton value="option3" label="Option 3" />
    </RadioGroup>
  );
};

export const GroupWithError = () => {
  const [value, setValue] = useState('');
  
  return (
    <RadioGroup
      name="error-group"
      label="With error state"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      error="Please select an option"
      helperText="This field is required"
    >
      <RadioButton value="option1" label="Option 1" />
      <RadioButton value="option2" label="Option 2" />
      <RadioButton value="option3" label="Option 3" />
    </RadioGroup>
  );
};

export const DisabledGroup = () => (
  <RadioGroup
    name="disabled-group"
    label="Disabled group"
    value="option1"
    disabled
  >
    <RadioButton value="option1" label="Option 1" />
    <RadioButton value="option2" label="Option 2" />
    <RadioButton value="option3" label="Option 3" />
  </RadioGroup>
);

export const MixedDisabledOptions = () => {
  const [value, setValue] = useState('option1');
  
  return (
    <RadioGroup
      name="mixed-disabled-group"
      label="Mixed disabled options"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <RadioButton value="option1" label="Option 1" />
      <RadioButton value="option2" label="Option 2 (disabled)" disabled />
      <RadioButton value="option3" label="Option 3" />
    </RadioGroup>
  );
};

export const FormExample = () => {
  const [formData, setFormData] = useState({
    subscription: 'monthly',
    notifications: 'all'
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div className="space-y-6 max-w-md p-6 border border-border-light rounded-lg">
      <h2 className="text-lg font-medium text-text-primary">Subscription Preferences</h2>
      
      <RadioGroup
        name="subscription"
        label="Subscription plan"
        value={formData.subscription}
        onChange={handleChange}
        required
      >
        <RadioButton 
          value="monthly" 
          label="Monthly" 
          helperText="$9.99 per month, cancel anytime" 
        />
        <RadioButton 
          value="yearly" 
          label="Yearly" 
          helperText="$99.99 per year (save 17%)" 
        />
        <RadioButton 
          value="lifetime" 
          label="Lifetime" 
          helperText="$299.99 one-time payment" 
        />
      </RadioGroup>
      
      <RadioGroup
        name="notifications"
        label="Notification preferences"
        value={formData.notifications}
        onChange={handleChange}
      >
        <RadioButton 
          value="all" 
          label="All notifications" 
          helperText="Receive all updates and alerts" 
        />
        <RadioButton 
          value="important" 
          label="Important only" 
          helperText="Only receive critical updates" 
        />
        <RadioButton 
          value="none" 
          label="None" 
          helperText="Don't send me any notifications" 
        />
      </RadioGroup>
      
      <div className="pt-4">
        <button 
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};
