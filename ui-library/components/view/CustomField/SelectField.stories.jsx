import React from 'react';
import SelectField from './SelectField';

export default {
  title: "View/SelectField",
  component: SelectField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const departmentOptions = [
  { value: 'engineering', label: 'Engineering', icon: '👨‍💻' },
  { value: 'design', label: 'Design', icon: '🎨' },
  { value: 'product', label: 'Product', icon: '📊' },
  { value: 'marketing', label: 'Marketing', icon: '📣' },
  { value: 'sales', label: 'Sales', icon: '💰' },
  { value: 'support', label: 'Support', icon: '🙋‍♂️' },
];

export const Default = {
  args: {
    id: 'default-select',
    label: 'Department',
    placeholder: 'Select a department',
    options: departmentOptions,
  },
};

export const WithValue = {
  args: {
    id: 'select-with-value',
    label: 'Department',
    value: 'engineering',
    options: departmentOptions,
  },
};

export const Required = {
  args: {
    id: 'required-select',
    label: 'Department',
    placeholder: 'Select a department',
    options: departmentOptions,
    required: true,
  },
};

export const WithError = {
  args: {
    id: 'select-with-error',
    label: 'Department',
    placeholder: 'Select a department',
    options: departmentOptions,
    error: 'Please select a department',
  },
};

export const WithSearch = {
  args: {
    id: 'searchable-select',
    label: 'Department',
    placeholder: 'Search and select a department',
    options: departmentOptions,
    searchable: true,
  },
};

export const NoIcons = {
  args: {
    id: 'no-icons-select',
    label: 'Department',
    placeholder: 'Select a department',
    options: departmentOptions,
    showOptionIcons: false,
  },
};

export const Disabled = {
  args: {
    id: 'disabled-select',
    label: 'Department',
    value: 'engineering',
    options: departmentOptions,
    disabled: true,
  },
};

export const Variants = () => (
  <div className="space-y-4 w-80">
    <SelectField
      id="outlined-select"
      label="Outlined Variant (Default)"
      variant="outlined"
      placeholder="Select an option"
      options={departmentOptions}
    />
    <SelectField
      id="filled-select"
      label="Filled Variant"
      variant="filled"
      placeholder="Select an option"
      options={departmentOptions}
    />
    <SelectField
      id="plain-select"
      label="Plain Variant"
      variant="plain"
      placeholder="Select an option"
      options={departmentOptions}
    />
  </div>
);

export const Sizes = () => (
  <div className="space-y-4 w-80">
    <SelectField
      id="small-select"
      label="Small Size"
      size="small"
      placeholder="Select an option"
      options={departmentOptions}
    />
    <SelectField
      id="medium-select"
      label="Medium Size (Default)"
      size="medium"
      placeholder="Select an option"
      options={departmentOptions}
    />
    <SelectField
      id="large-select"
      label="Large Size"
      size="large"
      placeholder="Select an option"
      options={departmentOptions}
    />
  </div>
);

export const InlineEdit = {
  args: {
    id: 'inline-edit-select',
    label: 'Inline Editable Select',
    value: 'engineering',
    options: departmentOptions,
    inlineEdit: true,
  },
};

// Real-world examples
export const JobApplicationForm = () => {
  const positionOptions = [
    { value: 'frontend', label: 'Frontend Developer', icon: '💻' },
    { value: 'backend', label: 'Backend Developer', icon: '🖥️' },
    { value: 'fullstack', label: 'Full Stack Developer', icon: '🔄' },
    { value: 'design', label: 'UI/UX Designer', icon: '🎨' },
    { value: 'product', label: 'Product Manager', icon: '📊' },
    { value: 'qa', label: 'QA Engineer', icon: '🔍' },
  ];
  
  const experienceOptions = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior (6+ years)' },
    { value: 'lead', label: 'Team Lead/Manager' },
  ];
  
  const locationOptions = [
    { value: 'remote', label: 'Remote', icon: '🌐' },
    { value: 'sf', label: 'San Francisco, CA', icon: '🌉' },
    { value: 'nyc', label: 'New York, NY', icon: '🗽' },
    { value: 'austin', label: 'Austin, TX', icon: '🎸' },
    { value: 'seattle', label: 'Seattle, WA', icon: '☕' },
  ];
  
  return (
    <div className="w-full max-w-md p-6 bg-background-light rounded-lg border border-border-light">
      <h2 className="text-xl font-semibold mb-4 text-text-primary">Job Application</h2>
      <p className="mb-6 text-text-secondary">Please complete the form to apply for a position</p>
      
      <div className="space-y-5">
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-primary mb-1">First Name</label>
              <input 
                type="text" 
                className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
                placeholder="John"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-primary mb-1">Last Name</label>
              <input 
                type="text" 
                className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
              placeholder="john.doe@example.com"
            />
          </div>
          
          <SelectField
            id="job-position"
            label="Position"
            placeholder="Select a position"
            options={positionOptions}
            required
            searchable
            description="Select the position you're applying for"
          />
          
          <SelectField
            id="job-experience"
            label="Experience Level"
            placeholder="Select your experience level"
            options={experienceOptions}
            required
          />
          
          <SelectField
            id="job-location"
            label="Preferred Location"
            placeholder="Select preferred location"
            options={locationOptions}
            searchable
          />
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Portfolio URL</label>
            <input 
              type="url" 
              className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>
        
        <div className="pt-4 border-t border-border-light">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              className="h-4 w-4 text-primary border-border-medium rounded focus:ring-primary" 
            />
            <span className="ml-2 text-text-secondary text-sm">I agree to the privacy policy and terms of service</span>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button className="px-4 py-2 border border-border-light rounded text-text-secondary hover:bg-background-light">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProductFilterPanel = () => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics', icon: '📱' },
    { value: 'clothing', label: 'Clothing', icon: '👕' },
    { value: 'home', label: 'Home & Kitchen', icon: '🏠' },
    { value: 'books', label: 'Books', icon: '📚' },
    { value: 'sports', label: 'Sports & Outdoors', icon: '⚽' },
  ];
  
  const brandOptions = [
    { value: 'all', label: 'All Brands' },
    { value: 'apple', label: 'Apple' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'sony', label: 'Sony' },
    { value: 'lg', label: 'LG' },
    { value: 'microsoft', label: 'Microsoft' },
  ];
  
  const priceOptions = [
    { value: 'all', label: 'Any Price' },
    { value: 'under50', label: 'Under $50' },
    { value: '50to100', label: '$50 to $100' },
    { value: '100to200', label: '$100 to $200' },
    { value: '200to500', label: '$200 to $500' },
    { value: 'over500', label: 'Over $500' },
  ];
  
  const ratingOptions = [
    { value: 'any', label: 'Any Rating' },
    { value: '4plus', label: '4★ & Up' },
    { value: '3plus', label: '3★ & Up' },
    { value: '2plus', label: '2★ & Up' },
    { value: '1plus', label: '1★ & Up' },
  ];
  
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'priceLow', label: 'Price: Low to High' },
    { value: 'priceHigh', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'rating', label: 'Avg. Customer Review' },
  ];
  
  return (
    <div className="w-full max-w-md p-6 bg-background-light rounded-lg border border-border-light">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Filter Products</h2>
        <button className="text-sm text-primary hover:text-primary-dark">Reset All</button>
      </div>
      
      <div className="space-y-5">
        <SelectField
          id="product-category"
          label="Category"
          value="electronics"
          options={categoryOptions}
          searchable
        />
        
        <SelectField
          id="product-brand"
          label="Brand"
          placeholder="Select brand"
          options={brandOptions}
          searchable
        />
        
        <SelectField
          id="product-price"
          label="Price Range"
          value="100to200"
          options={priceOptions}
        />
        
        <SelectField
          id="product-rating"
          label="Rating"
          value="4plus"
          options={ratingOptions}
        />
        
        <div className="pt-5 border-t border-border-light">
          <SelectField
            id="product-sort"
            label="Sort By"
            value="relevance"
            options={sortOptions}
          />
        </div>
        
        <div className="pt-4 flex justify-between">
          <span className="text-text-secondary text-sm">42 products found</span>
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export const UserSettingsForm = () => {
  const themeOptions = [
    { value: 'system', label: 'System Default', icon: '🖥️' },
    { value: 'light', label: 'Light Mode', icon: '☀️' },
    { value: 'dark', label: 'Dark Mode', icon: '🌙' },
  ];
  
  const languageOptions = [
    { value: 'en', label: 'English (US)', icon: '🇺🇸' },
    { value: 'es', label: 'Español', icon: '🇪🇸' },
    { value: 'fr', label: 'Français', icon: '🇫🇷' },
    { value: 'de', label: 'Deutsch', icon: '🇩🇪' },
    { value: 'ja', label: '日本語', icon: '🇯🇵' },
    { value: 'zh', label: '中文', icon: '🇨🇳' },
  ];
  
  const timezoneOptions = [
    { value: 'utc', label: 'UTC (GMT+0)', icon: '🌐' },
    { value: 'est', label: 'Eastern Time (GMT-5)', icon: '🗽' },
    { value: 'cst', label: 'Central Time (GMT-6)', icon: '🏙️' },
    { value: 'mst', label: 'Mountain Time (GMT-7)', icon: '⛰️' },
    { value: 'pst', label: 'Pacific Time (GMT-8)', icon: '🌉' },
  ];
  
  const notificationOptions = [
    { value: 'all', label: 'All Notifications' },
    { value: 'important', label: 'Important Only' },
    { value: 'mentions', label: 'Mentions & Direct Messages' },
    { value: 'none', label: 'None' },
  ];
  
  return (
    <div className="w-full max-w-md p-6 bg-background-light rounded-lg border border-border-light">
      <h2 className="text-xl font-semibold mb-4 text-text-primary">User Settings</h2>
      
      <div className="space-y-5">
        <SelectField
          id="user-theme"
          label="Theme"
          value="system"
          options={themeOptions}
          description="Choose your preferred color theme"
        />
        
        <SelectField
          id="user-language"
          label="Language"
          value="en"
          options={languageOptions}
          searchable
        />
        
        <SelectField
          id="user-timezone"
          label="Timezone"
          value="pst"
          options={timezoneOptions}
          searchable
        />
        
        <SelectField
          id="user-notifications"
          label="Notification Level"
          value="important"
          options={notificationOptions}
        />
        
        <div className="pt-4 border-t border-border-light">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              className="h-4 w-4 text-primary border-border-medium rounded focus:ring-primary" 
              defaultChecked
            />
            <span className="ml-2 text-text-secondary text-sm">Enable desktop notifications</span>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end space-x-3">
          <button className="px-4 py-2 border border-border-light rounded text-text-secondary hover:bg-background-light">
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
