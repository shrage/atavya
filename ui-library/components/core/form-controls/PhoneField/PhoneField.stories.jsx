import React, { useState } from 'react';
import { PhoneField } from './index';

export default {
  title: 'Form Controls/PhoneField',
  component: PhoneField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'PhoneField component for phone number input with validation and formatting.'
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
    format: {
      control: { type: 'select', options: ['national', 'international', 'e164', 'none'] },
      description: 'Phone number format'
    },
    countryCode: {
      control: 'text',
      description: 'Country code (e.g., +1 for US)'
    },
    showCountryCode: {
      control: 'boolean',
      description: 'Whether to show the country code'
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
    }
  }
};

// Basic phone field
export const Basic = () => (
  <PhoneField
    label="Phone Number"
    placeholder="Enter your phone number"
  />
);

// Different formats
export const Formats = () => (
  <div className="space-y-4">
    <PhoneField
      label="National Format (XXX) XXX-XXXX"
      placeholder="Enter your phone number"
      format="national"
      helperText="US phone number format"
    />
    
    <PhoneField
      label="International Format"
      placeholder="Enter your phone number"
      format="international"
      countryCode="+1"
      showCountryCode
      helperText="International phone number format with country code"
    />
    
    <PhoneField
      label="E.164 Format"
      placeholder="Enter your phone number"
      format="e164"
      helperText="E.164 format (e.g., +12345678901)"
    />
    
    <PhoneField
      label="No Formatting"
      placeholder="Enter your phone number"
      format="none"
      helperText="Raw input without formatting"
    />
  </div>
);

// With validation
export const WithValidation = () => (
  <div className="space-y-4">
    <PhoneField
      label="Phone (validate on blur)"
      placeholder="Enter your phone number"
      validateOnBlur
      helperText="Phone will be validated when you click outside the field"
    />
    
    <PhoneField
      label="Phone (validate on change)"
      placeholder="Enter your phone number"
      validateOnChange
      helperText="Phone will be validated as you type"
    />
  </div>
);

// Different country codes
export const CountryCodes = () => (
  <div className="space-y-4">
    <PhoneField
      label="United States (+1)"
      placeholder="Enter your phone number"
      format="international"
      countryCode="+1"
      showCountryCode
    />
    
    <PhoneField
      label="United Kingdom (+44)"
      placeholder="Enter your phone number"
      format="international"
      countryCode="+44"
      showCountryCode
    />
    
    <PhoneField
      label="Australia (+61)"
      placeholder="Enter your phone number"
      format="international"
      countryCode="+61"
      showCountryCode
    />
    
    <PhoneField
      label="India (+91)"
      placeholder="Enter your phone number"
      format="international"
      countryCode="+91"
      showCountryCode
    />
  </div>
);

// Different sizes
export const Sizes = () => (
  <div className="space-y-4">
    <PhoneField
      label="Small"
      defaultValue="1234567890"
      format="national"
      size="sm"
    />
    <PhoneField
      label="Medium (default)"
      defaultValue="1234567890"
      format="national"
      size="md"
    />
    <PhoneField
      label="Large"
      defaultValue="1234567890"
      format="national"
      size="lg"
    />
  </div>
);

// States
export const States = () => (
  <div className="space-y-4">
    <PhoneField
      label="Default"
      defaultValue="1234567890"
      format="national"
    />
    <PhoneField
      label="Disabled"
      defaultValue="1234567890"
      format="national"
      isDisabled
    />
    <PhoneField
      label="Read-only"
      defaultValue="1234567890"
      format="national"
      isReadOnly
    />
    <PhoneField
      label="Invalid"
      defaultValue="123"
      format="national"
      isInvalid
      errorText="Please enter a valid phone number"
    />
    <PhoneField
      label="Required"
      format="national"
      isRequired
    />
  </div>
);

// Controlled example
export const Controlled = () => {
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(true);
  
  const validatePhone = (value) => {
    // Simple validation for 10 digits
    const digitsOnly = value.replace(/\D/g, '');
    return digitsOnly.length === 10;
  };
  
  const handleChange = (value) => {
    setPhone(value);
    setIsValid(validatePhone(value));
  };
  
  return (
    <div className="space-y-4">
      <PhoneField
        label="Controlled PhoneField"
        value={phone}
        onChange={handleChange}
        format="national"
        isInvalid={!isValid}
        errorText={!isValid ? 'Please enter a valid 10-digit phone number' : ''}
      />
      
      <div className="p-3 bg-gray-100 rounded-md">
        <p className="text-sm text-text-secondary">Current value: {phone}</p>
        <p className="text-sm text-text-secondary mt-1">
          Status: {isValid ? (
            <span className="text-status-success">Valid</span>
          ) : (
            <span className="text-status-error">Invalid</span>
          )}
        </p>
        <div className="mt-2 flex space-x-2">
          <button
            onClick={() => handleChange('1234567890')}
            className="px-3 py-1 bg-primary text-white text-sm rounded-md"
          >
            Set Valid Phone
          </button>
          <button
            onClick={() => handleChange('123')}
            className="px-3 py-1 bg-primary text-white text-sm rounded-md"
          >
            Set Invalid Phone
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
    <h3 className="text-lg font-medium text-text-primary mb-4">Contact Information</h3>
    
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
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Email Address <span className="text-status-error">*</span>
        </label>
        <input 
          type="email" 
          className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Enter email address"
        />
      </div>
      
      <PhoneField
        label="Phone Number"
        placeholder="Enter your phone number"
        format="national"
        isRequired
        validateOnBlur
      />
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Address
        </label>
        <textarea 
          className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Enter your address"
          rows={3}
        />
      </div>
      
      <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
        Save Contact
      </button>
    </div>
  </div>
);

export const DeliveryForm = () => (
  <div className="max-w-md p-6 border border-border-light rounded-lg bg-white">
    <div className="flex items-center space-x-3 mb-4">
      <span className="material-icons text-primary text-2xl">local_shipping</span>
      <h3 className="text-lg font-medium text-text-primary">Delivery Information</h3>
    </div>
    
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
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Delivery Address <span className="text-status-error">*</span>
        </label>
        <input 
          type="text" 
          className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Street address"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            City <span className="text-status-error">*</span>
          </label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="City"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Postal Code <span className="text-status-error">*</span>
          </label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Postal code"
          />
        </div>
      </div>
      
      <PhoneField
        label="Contact Phone"
        placeholder="Enter your phone number"
        format="national"
        isRequired
        validateOnBlur
        helperText="We'll only call you if there's an issue with your delivery"
      />
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Delivery Instructions
        </label>
        <textarea 
          className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Special instructions for delivery"
          rows={2}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 border border-border-medium text-text-primary rounded-md hover:bg-gray-50">
          Back
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
          Continue to Payment
        </button>
      </div>
    </div>
  </div>
);

export const InternationalContact = () => (
  <div className="max-w-md p-6 border border-border-light rounded-lg bg-white">
    <h3 className="text-lg font-medium text-text-primary mb-4">International Contact</h3>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Full Name <span className="text-status-error">*</span>
        </label>
        <input 
          type="text" 
          className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Enter full name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Country <span className="text-status-error">*</span>
        </label>
        <select 
          className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="">Select country</option>
          <option value="us">United States (+1)</option>
          <option value="uk">United Kingdom (+44)</option>
          <option value="ca">Canada (+1)</option>
          <option value="au">Australia (+61)</option>
          <option value="in">India (+91)</option>
          <option value="fr">France (+33)</option>
          <option value="de">Germany (+49)</option>
          <option value="jp">Japan (+81)</option>
        </select>
      </div>
      
      <PhoneField
        label="International Phone"
        placeholder="Enter your phone number"
        format="international"
        countryCode="+1"
        showCountryCode
        isRequired
        validateOnBlur
        helperText="Include country code"
      />
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Email Address <span className="text-status-error">*</span>
        </label>
        <input 
          type="email" 
          className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Enter email address"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Preferred Contact Method
        </label>
        <div className="space-y-2 mt-1">
          <div className="flex items-center">
            <input 
              type="radio" 
              id="contact-email" 
              name="contact-method"
              className="h-4 w-4 text-primary focus:ring-primary border-border-medium"
            />
            <label htmlFor="contact-email" className="ml-2 block text-sm text-text-primary">
              Email
            </label>
          </div>
          <div className="flex items-center">
            <input 
              type="radio" 
              id="contact-phone" 
              name="contact-method"
              className="h-4 w-4 text-primary focus:ring-primary border-border-medium"
            />
            <label htmlFor="contact-phone" className="ml-2 block text-sm text-text-primary">
              Phone
            </label>
          </div>
          <div className="flex items-center">
            <input 
              type="radio" 
              id="contact-either" 
              name="contact-method"
              className="h-4 w-4 text-primary focus:ring-primary border-border-medium"
              defaultChecked
            />
            <label htmlFor="contact-either" className="ml-2 block text-sm text-text-primary">
              Either
            </label>
          </div>
        </div>
      </div>
      
      <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
        Submit
      </button>
    </div>
  </div>
);
