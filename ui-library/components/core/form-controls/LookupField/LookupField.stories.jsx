import React, { useState, useEffect } from 'react';
import { LookupField } from './index';

export default {
  title: 'Form Controls/LookupField',
  component: LookupField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'LookupField component for searching and selecting items from a list of options.'
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
    onSearch: {
      action: 'searched',
      description: 'Search handler for async options'
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
    isLoading: {
      control: 'boolean',
      description: 'Whether options are loading'
    }
  }
};

// Sample data
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
  { value: 'au', label: 'Australia' },
];

const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Viewer' },
  { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', role: 'Admin' },
  { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'Editor' },
  { id: 6, name: 'Diana Miller', email: 'diana.miller@example.com', role: 'Viewer' },
  { id: 7, name: 'Edward Davis', email: 'edward.davis@example.com', role: 'Admin' },
  { id: 8, name: 'Fiona Wilson', email: 'fiona.wilson@example.com', role: 'Editor' },
  { id: 9, name: 'George Martin', email: 'george.martin@example.com', role: 'Viewer' },
  { id: 10, name: 'Helen Garcia', email: 'helen.garcia@example.com', role: 'Admin' },
];

// Basic lookup field
export const Basic = () => (
  <LookupField
    label="Country"
    placeholder="Select a country"
    options={countries}
  />
);

// With default value
export const WithDefaultValue = () => (
  <LookupField
    label="Country"
    placeholder="Select a country"
    options={countries}
    defaultValue="fr"
  />
);

// Controlled example
export const Controlled = () => {
  const [value, setValue] = useState('uk');
  
  return (
    <div className="space-y-4">
      <LookupField
        label="Controlled LookupField"
        placeholder="Select a country"
        options={countries}
        value={value}
        onChange={setValue}
      />
      
      <div className="p-3 bg-gray-100 rounded-md">
        <p className="text-sm text-text-secondary">Selected value: {value}</p>
        <div className="mt-2 flex space-x-2">
          <button
            onClick={() => setValue('us')}
            className="px-3 py-1 bg-primary text-white text-sm rounded-md"
          >
            Set to US
          </button>
          <button
            onClick={() => setValue('ca')}
            className="px-3 py-1 bg-primary text-white text-sm rounded-md"
          >
            Set to Canada
          </button>
          <button
            onClick={() => setValue(null)}
            className="px-3 py-1 border border-border-medium text-text-primary text-sm rounded-md"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom option rendering
export const CustomOptionRendering = () => (
  <LookupField
    label="User"
    placeholder="Select a user"
    options={users}
    getOptionLabel={(user) => user.name}
    getOptionValue={(user) => user.id}
    renderOption={(user) => (
      <div className="flex flex-col">
        <div className="font-medium">{user.name}</div>
        <div className="text-xs text-text-secondary">{user.email}</div>
      </div>
    )}
  />
);

// Async loading
export const AsyncLoading = () => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulate async search
  const handleSearch = (query) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = countries.filter(country => 
        country.label.toLowerCase().includes(query.toLowerCase())
      );
      setOptions(filtered);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <LookupField
      label="Country (Async)"
      placeholder="Search for a country"
      options={options}
      onSearch={handleSearch}
      isLoading={isLoading}
      minSearchLength={1}
      helperText="Type to search for countries"
    />
  );
};

// Different sizes
export const Sizes = () => (
  <div className="space-y-4">
    <LookupField
      label="Small"
      placeholder="Select a country"
      options={countries}
      size="sm"
    />
    <LookupField
      label="Medium (default)"
      placeholder="Select a country"
      options={countries}
      size="md"
    />
    <LookupField
      label="Large"
      placeholder="Select a country"
      options={countries}
      size="lg"
    />
  </div>
);

// States
export const States = () => (
  <div className="space-y-4">
    <LookupField
      label="Default"
      placeholder="Select a country"
      options={countries}
    />
    <LookupField
      label="Disabled"
      placeholder="Select a country"
      options={countries}
      isDisabled
    />
    <LookupField
      label="Read-only"
      placeholder="Select a country"
      options={countries}
      defaultValue="fr"
      isReadOnly
    />
    <LookupField
      label="Invalid"
      placeholder="Select a country"
      options={countries}
      isInvalid
      errorText="Please select a valid country"
    />
    <LookupField
      label="Required"
      placeholder="Select a country"
      options={countries}
      isRequired
    />
    <LookupField
      label="Loading"
      placeholder="Select a country"
      options={countries}
      isLoading
    />
  </div>
);

// Real-world examples
export const UserSelector = () => {
  // Custom rendering for user options
  const renderUserOption = (user) => (
    <div className="flex items-center">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3">
        {user.name.charAt(0)}
      </div>
      <div>
        <div className="font-medium">{user.name}</div>
        <div className="text-xs text-text-secondary">{user.email}</div>
      </div>
    </div>
  );
  
  return (
    <div className="max-w-md p-6 border border-border-light rounded-lg bg-white">
      <h3 className="text-lg font-medium text-text-primary mb-4">Assign Task</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Task Title <span className="text-status-error">*</span>
          </label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter task title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Description
          </label>
          <textarea 
            className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter task description"
            rows={3}
          />
        </div>
        
        <LookupField
          label="Assignee"
          placeholder="Search for a user"
          options={users}
          getOptionLabel={(user) => user.name}
          getOptionValue={(user) => user.id}
          renderOption={renderUserOption}
          isRequired
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Due Date
            </label>
            <input 
              type="date" 
              className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Priority
            </label>
            <select 
              className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border border-border-medium text-text-primary rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export const LocationSelector = () => {
  const [cities, setCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  // Sample city data by country
  const citiesByCountry = {
    us: [
      { value: 'nyc', label: 'New York City' },
      { value: 'la', label: 'Los Angeles' },
      { value: 'chi', label: 'Chicago' },
      { value: 'hou', label: 'Houston' },
      { value: 'phi', label: 'Philadelphia' },
    ],
    ca: [
      { value: 'tor', label: 'Toronto' },
      { value: 'van', label: 'Vancouver' },
      { value: 'mon', label: 'Montreal' },
      { value: 'cal', label: 'Calgary' },
      { value: 'ott', label: 'Ottawa' },
    ],
    uk: [
      { value: 'lon', label: 'London' },
      { value: 'man', label: 'Manchester' },
      { value: 'bir', label: 'Birmingham' },
      { value: 'gla', label: 'Glasgow' },
      { value: 'liv', label: 'Liverpool' },
    ],
  };
  
  // Load cities when country changes
  const handleCountryChange = (countryValue) => {
    setSelectedCountry(countryValue);
    setIsLoadingCities(true);
    
    // Simulate API call
    setTimeout(() => {
      setCities(citiesByCountry[countryValue] || []);
      setIsLoadingCities(false);
    }, 800);
  };
  
  return (
    <div className="max-w-md p-6 border border-border-light rounded-lg bg-white">
      <h3 className="text-lg font-medium text-text-primary mb-4">Location Preferences</h3>
      
      <div className="space-y-4">
        <LookupField
          label="Country"
          placeholder="Select a country"
          options={countries.filter(c => ['us', 'ca', 'uk'].includes(c.value))}
          onChange={handleCountryChange}
          helperText="Select a country to see available cities"
          isRequired
        />
        
        <LookupField
          label="City"
          placeholder={selectedCountry ? "Select a city" : "Select a country first"}
          options={cities}
          isDisabled={!selectedCountry}
          isLoading={isLoadingCities}
          helperText={!selectedCountry ? "Please select a country first" : ""}
        />
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Postal/Zip Code
          </label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter postal/zip code"
            disabled={!selectedCountry}
          />
        </div>
        
        <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export const ProductCategorySelector = () => {
  // Sample categories and subcategories
  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing & Apparel' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'beauty', label: 'Beauty & Personal Care' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'toys', label: 'Toys & Games' },
    { value: 'books', label: 'Books & Media' },
    { value: 'food', label: 'Food & Beverages' },
  ];
  
  const subcategories = {
    electronics: [
      { value: 'phones', label: 'Smartphones & Accessories' },
      { value: 'computers', label: 'Computers & Tablets' },
      { value: 'audio', label: 'Audio & Headphones' },
      { value: 'tv', label: 'TVs & Home Theater' },
      { value: 'cameras', label: 'Cameras & Photography' },
    ],
    clothing: [
      { value: 'mens', label: 'Men\'s Clothing' },
      { value: 'womens', label: 'Women\'s Clothing' },
      { value: 'kids', label: 'Kids\' Clothing' },
      { value: 'shoes', label: 'Shoes & Footwear' },
      { value: 'accessories', label: 'Accessories' },
    ],
    home: [
      { value: 'furniture', label: 'Furniture' },
      { value: 'kitchen', label: 'Kitchen & Dining' },
      { value: 'bedding', label: 'Bedding & Bath' },
      { value: 'decor', label: 'Home Decor' },
      { value: 'garden', label: 'Garden & Outdoor' },
    ],
  };
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  
  // Update subcategories when category changes
  const handleCategoryChange = (categoryValue) => {
    setSelectedCategory(categoryValue);
    setAvailableSubcategories(subcategories[categoryValue] || []);
  };
  
  // Custom rendering for categories with icons
  const renderCategoryOption = (category) => {
    // Icons mapping
    const icons = {
      electronics: 'devices',
      clothing: 'checkroom',
      home: 'home',
      beauty: 'spa',
      sports: 'sports_soccer',
      toys: 'toys',
      books: 'menu_book',
      food: 'restaurant',
    };
    
    return (
      <div className="flex items-center">
        <span className="material-icons text-text-secondary mr-2">
          {icons[category.value] || 'category'}
        </span>
        <span>{category.label}</span>
      </div>
    );
  };
  
  return (
    <div className="max-w-md p-6 border border-border-light rounded-lg bg-white">
      <h3 className="text-lg font-medium text-text-primary mb-4">Add Product</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Product Name <span className="text-status-error">*</span>
          </label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter product name"
          />
        </div>
        
        <LookupField
          label="Category"
          placeholder="Select a category"
          options={categories}
          renderOption={renderCategoryOption}
          onChange={handleCategoryChange}
          isRequired
        />
        
        <LookupField
          label="Subcategory"
          placeholder={selectedCategory ? "Select a subcategory" : "Select a category first"}
          options={availableSubcategories}
          isDisabled={!selectedCategory}
          helperText={!selectedCategory ? "Please select a category first" : ""}
        />
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Price <span className="text-status-error">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-text-secondary">$</span>
            </div>
            <input 
              type="number" 
              className="w-full pl-7 px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Description
          </label>
          <textarea 
            className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter product description"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border border-border-medium text-text-primary rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};
