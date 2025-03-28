import React from 'react';
import CheckboxField from './CheckboxField';

export default {
  title: "View/CheckboxField",
  component: CheckboxField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    id: 'default-checkbox',
    label: 'I agree to terms and conditions',
  },
};

export const Checked = {
  args: {
    id: 'checked-checkbox',
    label: 'Receive email notifications',
    checked: true,
  },
};

export const Required = {
  args: {
    id: 'required-checkbox',
    label: 'Accept privacy policy',
    required: true,
  },
};

export const WithError = {
  args: {
    id: 'checkbox-with-error',
    label: 'I am over 18 years old',
    error: 'You must confirm you are over 18 to continue',
  },
};

export const WithDescription = {
  args: {
    id: 'checkbox-with-description',
    label: 'Subscribe to newsletter',
    description: 'We will send you weekly updates about our products and services',
  },
};

export const Disabled = {
  args: {
    id: 'disabled-checkbox',
    label: 'Feature unavailable',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked = {
  args: {
    id: 'disabled-checked-checkbox',
    label: 'Feature enabled by default',
    checked: true,
    disabled: true,
  },
};

export const LabelPositions = () => (
  <div className="space-y-4 w-80">
    <CheckboxField
      id="right-label"
      label="Label on Right (Default)"
      labelPosition="right"
    />
    <CheckboxField
      id="left-label"
      label="Label on Left"
      labelPosition="left"
    />
    <CheckboxField
      id="top-label"
      label="Label on Top"
      labelPosition="top"
    />
    <CheckboxField
      id="inline-label"
      label="Inline Label"
      labelPosition="inline"
      description="This layout resembles Notion's inline checkbox style"
    />
  </div>
);

export const Sizes = () => (
  <div className="space-y-4 w-80">
    <CheckboxField
      id="small-checkbox"
      label="Small Size"
      size="small"
    />
    <CheckboxField
      id="medium-checkbox"
      label="Medium Size (Default)"
      size="medium"
    />
    <CheckboxField
      id="large-checkbox"
      label="Large Size"
      size="large"
    />
  </div>
);

export const InlineEdit = {
  args: {
    id: 'inline-edit-checkbox',
    label: 'Completed',
    checked: true,
    inlineEdit: true,
    labelPosition: 'top',
  },
};

// Real-world examples
export const PrivacySettings = () => (
  <div className="w-full max-w-md p-6 bg-background-light rounded-lg border border-border-light">
    <h2 className="text-xl font-semibold mb-4 text-text-primary">Privacy Settings</h2>
    <p className="mb-6 text-text-secondary">Customize how we collect and use your data</p>
    
    <div className="space-y-5">
      <CheckboxField
        id="essential-cookies"
        label="Essential Cookies"
        description="Required for the website to function properly"
        checked={true}
        disabled={true}
      />
      
      <CheckboxField
        id="analytics-cookies"
        label="Analytics Cookies"
        description="Help us improve our website by collecting anonymous usage data"
        checked={true}
      />
      
      <CheckboxField
        id="marketing-cookies"
        label="Marketing Cookies"
        description="Allow us to provide personalized advertisements on other websites"
        checked={false}
      />
      
      <CheckboxField
        id="third-party-cookies"
        label="Third-Party Cookies"
        description="Enable features from our partners like social media integrations"
        checked={false}
        error="Some features may not work without third-party cookies"
      />
      
      <div className="pt-4 border-t border-border-light">
        <CheckboxField
          id="privacy-policy"
          label="I have read and agree to the Privacy Policy"
          required={true}
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button className="px-4 py-2 border border-border-light rounded text-text-secondary hover:bg-background-light">
          Reset Preferences
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Save Preferences
        </button>
      </div>
    </div>
  </div>
);

export const TaskList = () => (
  <div className="w-full max-w-md p-6 bg-background-light rounded-lg border border-border-light">
    <h2 className="text-xl font-semibold mb-4 text-text-primary">Project Tasks</h2>
    
    <div className="space-y-3">
      <div className="p-3 bg-white rounded border border-border-light">
        <CheckboxField
          id="task-1"
          label="Create wireframes"
          checked={true}
          labelPosition="inline"
          inlineEdit={true}
        />
        <p className="ml-6 mt-1 text-sm text-text-secondary">Due: Yesterday</p>
      </div>
      
      <div className="p-3 bg-white rounded border border-border-light">
        <CheckboxField
          id="task-2"
          label="Review design system"
          checked={true}
          labelPosition="inline"
          inlineEdit={true}
        />
        <p className="ml-6 mt-1 text-sm text-text-secondary">Due: Yesterday</p>
      </div>
      
      <div className="p-3 bg-white rounded border border-border-light">
        <CheckboxField
          id="task-3"
          label="Implement UI components"
          checked={false}
          labelPosition="inline"
          inlineEdit={true}
        />
        <div className="ml-6 mt-1 flex items-center">
          <span className="text-sm text-status-error font-medium">Due Today</span>
          <span className="ml-2 px-2 py-0.5 text-xs bg-status-error/10 text-status-error rounded-full">High Priority</span>
        </div>
      </div>
      
      <div className="p-3 bg-white rounded border border-border-light">
        <CheckboxField
          id="task-4"
          label="Write documentation"
          checked={false}
          labelPosition="inline"
          inlineEdit={true}
        />
        <div className="ml-6 mt-1 flex items-center">
          <span className="text-sm text-text-secondary">Due: Tomorrow</span>
          <span className="ml-2 px-2 py-0.5 text-xs bg-status-warning/10 text-status-warning rounded-full">Medium Priority</span>
        </div>
      </div>
      
      <div className="p-3 bg-white rounded border border-border-light">
        <CheckboxField
          id="task-5"
          label="Conduct user testing"
          checked={false}
          labelPosition="inline"
          inlineEdit={true}
        />
        <div className="ml-6 mt-1 flex items-center">
          <span className="text-sm text-text-secondary">Due: Next Week</span>
          <span className="ml-2 px-2 py-0.5 text-xs bg-status-success/10 text-status-success rounded-full">Low Priority</span>
        </div>
      </div>
    </div>
    
    <div className="mt-6 flex justify-between items-center">
      <div className="text-text-secondary text-sm">
        <span className="font-medium text-primary">2 of 5</span> tasks completed
      </div>
      <button className="px-3 py-1.5 bg-primary/10 text-primary rounded hover:bg-primary/20">
        + Add Task
      </button>
    </div>
  </div>
);

export const SubscriptionOptions = () => (
  <div className="w-full max-w-md p-6 bg-background-light rounded-lg border border-border-light">
    <h2 className="text-xl font-semibold mb-4 text-text-primary">Subscription Options</h2>
    
    <div className="space-y-6">
      <div className="p-4 bg-white rounded border border-primary">
        <div className="flex items-start">
          <CheckboxField
            id="premium-plan"
            label="Premium Plan"
            checked={true}
            size="large"
          />
          <span className="ml-2 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">Recommended</span>
        </div>
        <div className="ml-6 mt-2">
          <p className="text-text-secondary">All features included, priority support</p>
          <p className="text-lg font-semibold text-text-primary mt-1">$19.99/month</p>
        </div>
      </div>
      
      <div className="p-4 bg-white rounded border border-border-light">
        <CheckboxField
          id="basic-plan"
          label="Basic Plan"
          checked={false}
          size="large"
        />
        <div className="ml-6 mt-2">
          <p className="text-text-secondary">Core features only, standard support</p>
          <p className="text-lg font-semibold text-text-primary mt-1">$9.99/month</p>
        </div>
      </div>
      
      <div className="p-4 bg-white rounded border border-border-light">
        <CheckboxField
          id="free-plan"
          label="Free Plan"
          checked={false}
          size="large"
        />
        <div className="ml-6 mt-2">
          <p className="text-text-secondary">Limited features, community support</p>
          <p className="text-lg font-semibold text-text-primary mt-1">$0/month</p>
        </div>
      </div>
      
      <div className="pt-4 border-t border-border-light">
        <CheckboxField
          id="annual-billing"
          label="Annual billing (save 20%)"
          description="You'll be charged annually instead of monthly"
        />
      </div>
      
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Continue
        </button>
      </div>
    </div>
  </div>
);
