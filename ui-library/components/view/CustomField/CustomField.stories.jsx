import React from 'react';
import CustomField from './CustomField';

export default {
  title: "View/CustomField",
  component: CustomField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    id: 'default-field',
    label: 'Field Label',
    children: <input type="text" className="w-full p-2 border border-border-light rounded text-text-primary" placeholder="Enter value" />,
  },
};

export const WithDescription = {
  args: {
    id: 'field-with-description',
    label: 'Field Label',
    description: 'This is a helpful description',
    children: <input type="text" className="w-full p-2 border border-border-light rounded text-text-primary" placeholder="Enter value" />,
  },
};

export const Required = {
  args: {
    id: 'required-field',
    label: 'Required Field',
    required: true,
    children: <input type="text" className="w-full p-2 border border-border-light rounded text-text-primary" placeholder="This field is required" />,
  },
};

export const WithError = {
  args: {
    id: 'field-with-error',
    label: 'Email',
    required: true,
    error: 'Invalid email address',
    children: <input type="email" className="w-full p-2 border rounded border-status-error text-text-primary" value="invalid-email" readOnly />,
  },
};

export const InlineLabel = {
  args: {
    id: 'inline-label-field',
    label: 'Inline Label',
    labelPosition: 'inline',
    children: <input type="text" className="w-full p-2 border border-border-light rounded text-text-primary" placeholder="Enter value" />,
  },
};

export const WithInlineEdit = {
  args: {
    id: 'inline-edit-field',
    label: 'Inline Edit',
    inlineEdit: true,
    onInlineEditToggle: () => alert('Toggle inline edit mode'),
    children: <div className="p-2 border border-border-light rounded text-text-primary">This is editable content</div>,
  },
};

// Real-world examples
export const ProfileFormFields = () => {
  return (
    <div className="w-full max-w-md p-4 bg-background-light rounded-lg border border-border-light">
      <h2 className="text-xl font-semibold mb-4 text-text-primary">Profile Information</h2>
      
      <div className="space-y-4">
        <CustomField
          id="profile-name"
          label="Full Name"
          required
          description="Your name as it will appear on your profile"
        >
          <input 
            type="text" 
            className="w-full p-2 border border-border-medium rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
            placeholder="John Doe"
            defaultValue="Alex Johnson" 
          />
        </CustomField>
        
        <CustomField
          id="profile-title"
          label="Job Title"
        >
          <input 
            type="text" 
            className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
            placeholder="Software Engineer"
            defaultValue="Senior UX Designer" 
          />
        </CustomField>
        
        <CustomField
          id="profile-department"
          label="Department"
          labelPosition="inline"
        >
          <select className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary">
            <option value="design">Design</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="product">Product</option>
          </select>
        </CustomField>
        
        <CustomField
          id="profile-bio"
          label="Bio"
          description="Brief description for your profile (max 200 characters)"
        >
          <textarea 
            className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
            rows="3"
            placeholder="Tell us about yourself"
            defaultValue="UX designer with 5+ years of experience in creating user-centered digital products. Passionate about accessibility and inclusive design."
          />
        </CustomField>
        
        <CustomField
          id="profile-notifications"
          label="Email Notifications"
          labelPosition="inline"
        >
          <div className="flex items-center">
            <input 
              type="checkbox" 
              className="h-4 w-4 text-primary border-border-medium rounded focus:ring-primary" 
              defaultChecked
            />
            <span className="ml-2 text-text-secondary">Receive email notifications</span>
          </div>
        </CustomField>
        
        <div className="flex justify-end space-x-2 mt-6">
          <button className="px-4 py-2 border border-border-light rounded text-text-secondary hover:bg-background-light">
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProductSpecifications = () => {
  return (
    <div className="w-full max-w-md p-4 bg-background-light rounded-lg border border-border-light">
      <h2 className="text-xl font-semibold mb-4 text-text-primary">Product Specifications</h2>
      
      <div className="space-y-4">
        <CustomField
          id="product-dimensions"
          label="Dimensions"
          labelPosition="inline"
          inlineEdit
          onInlineEditToggle={() => console.log('Toggle dimensions edit')}
        >
          <div className="p-2 border border-border-light rounded text-text-primary bg-white">
            12.5" × 8.5" × 0.6" (31.7 × 21.5 × 1.5 cm)
          </div>
        </CustomField>
        
        <CustomField
          id="product-weight"
          label="Weight"
          labelPosition="inline"
          inlineEdit
          onInlineEditToggle={() => console.log('Toggle weight edit')}
        >
          <div className="p-2 border border-border-light rounded text-text-primary bg-white">
            2.8 pounds (1.27 kg)
          </div>
        </CustomField>
        
        <CustomField
          id="product-materials"
          label="Materials"
          labelPosition="inline"
          inlineEdit
          onInlineEditToggle={() => console.log('Toggle materials edit')}
        >
          <div className="p-2 border border-border-light rounded text-text-primary bg-white">
            Aluminum, Glass
          </div>
        </CustomField>
        
        <CustomField
          id="product-colors"
          label="Available Colors"
          labelPosition="inline"
        >
          <div className="flex space-x-2 p-2">
            <span className="h-6 w-6 rounded-full bg-primary border border-border-light" title="Blue"></span>
            <span className="h-6 w-6 rounded-full bg-status-error border border-border-light" title="Red"></span>
            <span className="h-6 w-6 rounded-full bg-status-success border border-border-light" title="Green"></span>
            <span className="h-6 w-6 rounded-full bg-status-warning border border-border-light" title="Yellow"></span>
            <span className="h-6 w-6 rounded-full bg-gray-800 border border-border-light" title="Black"></span>
          </div>
        </CustomField>
        
        <CustomField
          id="product-warranty"
          label="Warranty"
          labelPosition="inline"
          error="Warranty information needs to be updated"
        >
          <div className="p-2 border border-status-error rounded text-text-primary bg-white">
            1 year limited warranty
          </div>
        </CustomField>
        
        <div className="flex justify-end space-x-2 mt-6">
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
            Update Specifications
          </button>
        </div>
      </div>
    </div>
  );
};
