import React, { useState } from 'react';
import DatePicker from './DatePicker';

export default {
  title: 'Core/Form Controls/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'date' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    placeholder: { control: 'text' },
    format: { control: 'text' },
    error: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

// Basic DatePicker
export const Basic = {
  args: {
    placeholder: 'Select a date',
  },
};

// Controlled DatePicker
export const Controlled = () => {
  const [date, setDate] = useState(new Date());
  
  return (
    <DatePicker
      value={date}
      onChange={setDate}
      placeholder="Select a date"
    />
  );
};

// With Default Value
export const WithDefaultValue = {
  args: {
    value: new Date(),
    placeholder: 'Select a date',
  },
};

// Custom Format
export const CustomFormat = {
  args: {
    value: new Date(),
    format: 'MM/dd/yyyy',
    placeholder: 'MM/DD/YYYY',
  },
};

// Required DatePicker
export const Required = {
  args: {
    required: true,
    placeholder: 'Required date',
  },
};

// Disabled DatePicker
export const Disabled = {
  args: {
    value: new Date(),
    disabled: true,
    placeholder: 'Disabled date picker',
  },
};

// With Error
export const WithError = {
  args: {
    error: 'Please select a valid date',
    placeholder: 'Select a date',
  },
};

// Form Integration
export const FormIntegration = () => {
  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: null,
  });
  
  const handleChange = (field) => (value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted with dates:\nStart: ${formData.startDate}\nEnd: ${formData.endDate}`);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-64">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <DatePicker
          value={formData.startDate}
          onChange={handleChange('startDate')}
          placeholder="Select start date"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <DatePicker
          value={formData.endDate}
          onChange={handleChange('endDate')}
          placeholder="Select end date"
        />
      </div>
      
      <button
        type="submit"
        className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
      >
        Submit
      </button>
    </form>
  );
};
