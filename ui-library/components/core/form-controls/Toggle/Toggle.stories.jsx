import React, { useState } from 'react';
import { Toggle } from './index';

export default {
  title: 'Core/Form Controls/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Toggle switch component for binary on/off states.'
      }
    }
  },
  argTypes: {
    onChange: { action: 'changed' }
  }
};

// Basic Toggle
export const Default = (args) => <Toggle {...args} />;
Default.args = {
  label: 'Toggle switch',
  name: 'default-toggle'
};

// Checked Toggle
export const Checked = (args) => <Toggle {...args} />;
Checked.args = {
  label: 'Toggle switch (on)',
  name: 'checked-toggle',
  checked: true
};

// Toggle with helper text
export const WithHelperText = (args) => <Toggle {...args} />;
WithHelperText.args = {
  label: 'Toggle with helper text',
  name: 'helper-toggle',
  helperText: 'Additional information about this toggle'
};

// Disabled Toggle
export const Disabled = () => (
  <div className="space-y-4">
    <Toggle 
      label="Disabled toggle (off)" 
      name="disabled-toggle-off" 
      disabled 
    />
    <Toggle 
      label="Disabled toggle (on)" 
      name="disabled-toggle-on" 
      disabled 
      checked 
    />
  </div>
);

// Toggle with error
export const WithError = (args) => <Toggle {...args} />;
WithError.args = {
  label: 'Toggle with error',
  name: 'error-toggle',
  error: 'This field has an error',
  helperText: 'Please select a valid option'
};

// Required Toggle
export const Required = (args) => <Toggle {...args} />;
Required.args = {
  label: 'Required toggle',
  name: 'required-toggle',
  required: true
};

// Toggle sizes
export const Sizes = () => (
  <div className="space-y-6">
    <Toggle 
      label="Small toggle" 
      name="small-toggle" 
      size="sm" 
    />
    <Toggle 
      label="Medium toggle (default)" 
      name="medium-toggle" 
      size="md" 
    />
    <Toggle 
      label="Large toggle" 
      name="large-toggle" 
      size="lg" 
    />
  </div>
);

// Controlled Toggle
export const Controlled = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="space-y-4">
      <Toggle 
        label={`Toggle is ${checked ? 'ON' : 'OFF'}`}
        name="controlled-toggle"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <div className="text-sm text-text-secondary">
        Click the toggle to change its state
      </div>
    </div>
  );
};

// Form example with multiple toggles
export const FormExample = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    analytics: false
  });
  
  const handleChange = (name) => (e) => {
    setSettings({
      ...settings,
      [name]: e.target.checked
    });
  };
  
  return (
    <div className="max-w-md p-6 border border-border-light rounded-lg">
      <h2 className="text-lg font-medium text-text-primary mb-6">Application Settings</h2>
      
      <div className="space-y-5">
        <Toggle 
          label="Enable notifications"
          name="notifications"
          checked={settings.notifications}
          onChange={handleChange('notifications')}
          helperText="Receive alerts about important updates"
        />
        
        <Toggle 
          label="Dark mode"
          name="darkMode"
          checked={settings.darkMode}
          onChange={handleChange('darkMode')}
          helperText="Use dark theme throughout the application"
        />
        
        <Toggle 
          label="Auto-save"
          name="autoSave"
          checked={settings.autoSave}
          onChange={handleChange('autoSave')}
          helperText="Automatically save changes as you work"
        />
        
        <Toggle 
          label="Usage analytics"
          name="analytics"
          checked={settings.analytics}
          onChange={handleChange('analytics')}
          helperText="Help us improve by sending anonymous usage data"
        />
      </div>
      
      <div className="mt-8 pt-4 border-t border-border-light">
        <button 
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};
