import React from 'react';
import Select from './Select';

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'zh', label: 'Chinese' },
];

export default {
  title: "Core/Form Controls/Select",
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile select component following the Atavya design system, supporting various states and sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the select',
    },
    options: {
      control: 'object',
      description: 'Array of options with value and label',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select field',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the select',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the select should take full width',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
};

export const All = () => (
  <div className="flex flex-col gap-6 w-[320px]">
    <Select
      label="Default Select"
      options={countries}
      placeholder="Select a country"
    />
    <Select
      label="Required Select"
      options={countries}
      placeholder="Select a country"
      required
    />
    <Select
      label="With Helper Text"
      options={countries}
      placeholder="Select a country"
      helperText="Please select your country of residence"
    />
    <Select
      label="With Error"
      options={countries}
      placeholder="Select a country"
      error="Please select a country"
    />
    <Select
      label="Disabled Select"
      options={countries}
      placeholder="Select a country"
      disabled
    />
    <Select
      label="Small Select"
      options={countries}
      placeholder="Select a country"
      size="sm"
    />
    <Select
      label="Large Select"
      options={countries}
      placeholder="Select a country"
      size="lg"
    />
  </div>
);

export const Default = {
  args: {
    label: 'Country',
    options: countries,
    placeholder: 'Select a country',
  },
};

export const WithHelperText = {
  args: {
    label: 'Country',
    options: countries,
    placeholder: 'Select a country',
    helperText: 'Please select your country of residence',
  },
};

export const WithError = {
  args: {
    label: 'Country',
    options: countries,
    placeholder: 'Select a country',
    error: 'Please select a country',
  },
};

export const Required = {
  args: {
    label: 'Country',
    options: countries,
    placeholder: 'Select a country',
    required: true,
  },
};

export const Disabled = {
  args: {
    label: 'Country',
    options: countries,
    placeholder: 'Select a country',
    disabled: true,
  },
};

export const Small = {
  args: {
    label: 'Country',
    options: countries,
    placeholder: 'Select a country',
    size: 'sm',
  },
};

export const Large = {
  args: {
    label: 'Country',
    options: countries,
    placeholder: 'Select a country',
    size: 'lg',
  },
};

// Real-world examples
export const FormExamples = () => (
  <div className="space-y-8 w-[400px]">
    <div className="p-6 border border-border-light rounded-md bg-background-light">
      <h3 className="text-text-primary text-lg font-medium mb-4">User Preferences</h3>
      <div className="space-y-4">
        <Select
          label="Language"
          options={languages}
          placeholder="Select your preferred language"
          required
        />
        <Select
          label="Country"
          options={countries}
          placeholder="Select your country"
          required
        />
        <div className="flex items-center mt-2">
          <input
            id="notifications"
            type="checkbox"
            className="h-4 w-4 text-primary border-border-medium rounded focus:ring-primary"
          />
          <label htmlFor="notifications" className="ml-2 block text-sm text-text-secondary">
            Enable email notifications
          </label>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Save Preferences
        </button>
      </div>
    </div>

    <div className="p-6 border border-border-light rounded-md bg-background-light">
      <h3 className="text-text-primary text-lg font-medium mb-4">Product Filter</h3>
      <div className="space-y-4">
        <Select
          label="Category"
          options={[
            { value: 'all', label: 'All Categories' },
            { value: 'electronics', label: 'Electronics' },
            { value: 'clothing', label: 'Clothing' },
            { value: 'home', label: 'Home & Kitchen' },
            { value: 'books', label: 'Books' },
          ]}
          placeholder="Select category"
        />
        <Select
          label="Sort By"
          options={[
            { value: 'relevance', label: 'Relevance' },
            { value: 'price-asc', label: 'Price: Low to High' },
            { value: 'price-desc', label: 'Price: High to Low' },
            { value: 'rating', label: 'Customer Rating' },
            { value: 'newest', label: 'Newest Arrivals' },
          ]}
          placeholder="Sort by"
        />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Price Range"
            options={[
              { value: 'all', label: 'All Prices' },
              { value: 'under-25', label: 'Under $25' },
              { value: '25-50', label: '$25 to $50' },
              { value: '50-100', label: '$50 to $100' },
              { value: 'over-100', label: 'Over $100' },
            ]}
            placeholder="Select range"
            size="sm"
          />
          <Select
            label="Rating"
            options={[
              { value: 'any', label: 'Any Rating' },
              { value: '4-up', label: '4★ & Up' },
              { value: '3-up', label: '3★ & Up' },
              { value: '2-up', label: '2★ & Up' },
              { value: '1-up', label: '1★ & Up' },
            ]}
            placeholder="Select rating"
            size="sm"
          />
        </div>
        <button
          type="button"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>
);
