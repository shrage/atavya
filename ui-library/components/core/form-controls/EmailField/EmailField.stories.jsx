import React, { useState } from 'react';
import { EmailField } from './index';

export default {
  title: 'Form Controls/EmailField',
  component: EmailField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'EmailField component for email address input with validation.'
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Current value (controlled)'
    },
    onChange: {
      action: 'changed',
      description: 'Change handler'
    },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
      description: 'Size variant'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the field is disabled'
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Whether the field is read-only'
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the field is invalid'
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the field is required'
    },
    validateOnBlur: {
      control: 'boolean',
      description: 'Whether to validate on blur'
    },
    validateOnChange: {
      control: 'boolean',
      description: 'Whether to validate on change'
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Whether to allow multiple email addresses'
    }
  }
};

// Basic email field
export const Basic = () => (
  <EmailField
    label="Email Address"
    placeholder="Enter your email address"
  />
);

// With validation
export const WithValidation = () => (
  <div className="space-y-4">
    <EmailField
      label="Email (validate on blur)"
      placeholder="Enter your email address"
      validateOnBlur
      helperText="Email will be validated when you click outside the field"
    />
    
    <EmailField
      label="Email (validate on change)"
      placeholder="Enter your email address"
      validateOnChange
      helperText="Email will be validated as you type"
    />
  </div>
);

// Multiple emails
export const MultipleEmails = () => (
  <EmailField
    label="Recipients"
    placeholder="Enter email addresses (separated by commas)"
    allowMultiple
    validateOnBlur
    helperText="You can enter multiple email addresses separated by commas or semicolons"
  />
);

// Different sizes
export const Sizes = () => (
  <div className="space-y-4">
    <EmailField
      label="Small"
      defaultValue="example@example.com"
      size="sm"
    />
    <EmailField
      label="Medium (default)"
      defaultValue="example@example.com"
      size="md"
    />
    <EmailField
      label="Large"
      defaultValue="example@example.com"
      size="lg"
    />
  </div>
);

// States
export const States = () => (
  <div className="space-y-4">
    <EmailField
      label="Default"
      defaultValue="example@example.com"
    />
    <EmailField
      label="Disabled"
      defaultValue="example@example.com"
      isDisabled
    />
    <EmailField
      label="Read-only"
      defaultValue="example@example.com"
      isReadOnly
    />
    <EmailField
      label="Invalid"
      defaultValue="example@example"
      isInvalid
      errorText="Please enter a valid email address"
    />
    <EmailField
      label="Required"
      isRequired
    />
  </div>
);

// Controlled example
export const Controlled = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  
  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return value === '' || emailRegex.test(value);
  };
  
  const handleChange = (value) => {
    setEmail(value);
    setIsValid(validateEmail(value));
  };
  
  return (
    <div className="space-y-4">
      <EmailField
        label="Controlled EmailField"
        value={email}
        onChange={handleChange}
        isInvalid={!isValid}
        errorText={!isValid ? 'Please enter a valid email address' : ''}
        validateOnChange
      />
      
      <div className="p-3 bg-gray-100 rounded-md">
        <p className="text-sm text-text-secondary">Current value: {email}</p>
        <p className="text-sm text-text-secondary mt-1">
          Status: {isValid ? (
            <span className="text-status-success">Valid</span>
          ) : (
            <span className="text-status-error">Invalid</span>
          )}
        </p>
        <div className="mt-2 flex space-x-2">
          <button
            onClick={() => handleChange('example@example.com')}
            className="px-3 py-1 bg-primary text-white text-sm rounded-md"
          >
            Set Valid Email
          </button>
          <button
            onClick={() => handleChange('invalid-email')}
            className="px-3 py-1 bg-primary text-white text-sm rounded-md"
          >
            Set Invalid Email
          </button>
          <button
            onClick={() => handleChange('')}
            className="px-3 py-1 border border-border-medium text-text-primary text-sm rounded-md"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

// Real-world examples
export const ContactForm = () => (
  <div className="max-w-md p-6 border border-border-light rounded-lg bg-white">
    <h3 className="text-lg font-medium text-text-primary mb-4">Contact Us</h3>
    
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            First Name <span className="text-status-error">*</span>
          </label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Last Name <span className="text-status-error">*</span>
          </label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter last name"
          />
        </div>
      </div>
      
      <EmailField
        label="Email Address"
        placeholder="Enter your email address"
        isRequired
        validateOnBlur
      />
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Message <span className="text-status-error">*</span>
        </label>
        <textarea 
          className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Enter your message"
          rows={4}
        />
      </div>
      
      <div className="flex items-center">
        <input 
          type="checkbox" 
          id="subscribe" 
          className="h-4 w-4 text-primary focus:ring-primary border-border-medium rounded"
        />
        <label htmlFor="subscribe" className="ml-2 block text-sm text-text-primary">
          Subscribe to our newsletter
        </label>
      </div>
      
      <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
        Submit
      </button>
    </div>
  </div>
);

export const NewsletterSignup = () => (
  <div className="max-w-md p-6 border border-border-light rounded-lg bg-white">
    <div className="flex items-center space-x-3 mb-4">
      <span className="material-icons text-primary text-2xl">mail_outline</span>
      <h3 className="text-lg font-medium text-text-primary">Subscribe to Our Newsletter</h3>
    </div>
    
    <p className="text-sm text-text-secondary mb-4">
      Stay up to date with the latest news, updates, and offers from our team.
    </p>
    
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            First Name
          </label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Last Name
          </label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter last name"
          />
        </div>
      </div>
      
      <EmailField
        label="Email Address"
        placeholder="Enter your email address"
        isRequired
        validateOnBlur
        helperText="We'll never share your email with anyone else."
      />
      
      <div className="space-y-2">
        <div className="text-sm font-medium text-text-primary mb-1">
          Interests
        </div>
        <div className="flex flex-wrap gap-2">
          {['Product Updates', 'Industry News', 'Events', 'Tips & Tutorials'].map((interest) => (
            <div key={interest} className="flex items-center">
              <input 
                type="checkbox" 
                id={`interest-${interest.toLowerCase().replace(/\s+/g, '-')}`}
                className="h-4 w-4 text-primary focus:ring-primary border-border-medium rounded"
              />
              <label 
                htmlFor={`interest-${interest.toLowerCase().replace(/\s+/g, '-')}`} 
                className="ml-2 block text-sm text-text-primary"
              >
                {interest}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center">
        <input 
          type="checkbox" 
          id="privacy-policy" 
          className="h-4 w-4 text-primary focus:ring-primary border-border-medium rounded"
        />
        <label htmlFor="privacy-policy" className="ml-2 block text-sm text-text-primary">
          I agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </label>
      </div>
      
      <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
        Subscribe
      </button>
    </div>
  </div>
);

export const InviteUsers = () => (
  <div className="max-w-md p-6 border border-border-light rounded-lg bg-white">
    <h3 className="text-lg font-medium text-text-primary mb-4">Invite Team Members</h3>
    
    <div className="space-y-4">
      <EmailField
        label="Email Addresses"
        placeholder="Enter email addresses separated by commas"
        allowMultiple
        validateOnBlur
        helperText="You can invite multiple users by separating email addresses with commas."
        isRequired
      />
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Role
        </label>
        <select 
          className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="member">Team Member</option>
          <option value="admin">Administrator</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Personal Message
        </label>
        <textarea 
          className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Add a personal message to your invitation"
          rows={3}
          defaultValue="I'd like to invite you to join our team on Atavya Fresh. Looking forward to collaborating with you!"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 border border-border-medium text-text-primary rounded-md hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
          Send Invitations
        </button>
      </div>
    </div>
  </div>
);
