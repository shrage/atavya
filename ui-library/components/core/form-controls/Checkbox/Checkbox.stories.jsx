import React, { useState } from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Core/Form Controls/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

// Basic Checkbox
export const Basic = {
  args: {
    label: 'Basic Checkbox',
  },
};

// Controlled Checkbox
export const Controlled = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <Checkbox
      label="Controlled Checkbox"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

// Checked Checkbox
export const Checked = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
  },
};

// Required Checkbox
export const Required = {
  args: {
    label: 'Required Checkbox',
    required: true,
  },
};

// Disabled Checkbox
export const Disabled = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
  },
};

// With Helper Text
export const WithHelperText = {
  args: {
    label: 'Checkbox with Helper Text',
    helperText: 'This is some helpful information about this checkbox.',
  },
};

// With Error
export const WithError = {
  args: {
    label: 'Checkbox with Error',
    error: 'This field is required',
    helperText: 'Please check this box to continue.',
  },
};

// Multiple Checkboxes
export const MultipleCheckboxes = () => {
  const [values, setValues] = useState({
    option1: false,
    option2: true,
    option3: false,
  });
  
  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.checked,
    });
  };
  
  return (
    <div className="space-y-4">
      <Checkbox
        label="Option 1"
        checked={values.option1}
        onChange={handleChange('option1')}
      />
      <Checkbox
        label="Option 2"
        checked={values.option2}
        onChange={handleChange('option2')}
      />
      <Checkbox
        label="Option 3"
        checked={values.option3}
        onChange={handleChange('option3')}
      />
    </div>
  );
};
