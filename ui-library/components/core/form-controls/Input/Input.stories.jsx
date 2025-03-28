import React from 'react';
import Input from './Input';

export default {
  title: "Core/Form Controls/Input",
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile input component following the Atavya design system, supporting various states and sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Type of the input field',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the input',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input should take full width',
    },
  },
};

export const All = () => (
  <div className="flex flex-col gap-6 w-[320px]">
    <Input
      label="Default Input"
      placeholder="Enter text"
    />
    <Input
      label="Required Input"
      placeholder="Required field"
      required
    />
    <Input
      label="With Helper Text"
      placeholder="Enter text"
      helperText="This is a helper text"
    />
    <Input
      label="With Error"
      placeholder="Enter text"
      error="This field is required"
    />
    <Input
      label="Disabled Input"
      placeholder="Disabled"
      disabled
    />
    <Input
      label="Password Input"
      type="password"
      placeholder="Enter password"
    />
    <Input
      label="Small Input"
      size="sm"
      placeholder="Small size"
    />
    <Input
      label="Large Input"
      size="lg"
      placeholder="Large size"
    />
  </div>
);

export const Default = {
  args: {
    label: 'Label',
    placeholder: 'Enter text',
  },
};

export const WithHelperText = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    helperText: 'We\'ll never share your email with anyone else.',
  },
};

export const WithError = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: 'This username is already taken',
  },
};

export const Required = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

export const Password = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
};

export const Small = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
  },
};

export const Large = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
  },
};

// Real-world examples
export const FormExamples = () => (
  <div className="space-y-8 w-[400px]">
    <div className="p-6 border border-border-light rounded-md bg-background-light">
      <h3 className="text-text-primary text-lg font-medium mb-4">Login Form</h3>
      <div className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
        />
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary border-border-medium rounded focus:ring-primary"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="text-primary hover:text-primary-dark">
              Forgot password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Sign in
        </button>
      </div>
    </div>

    <div className="p-6 border border-border-light rounded-md bg-background-light">
      <h3 className="text-text-primary text-lg font-medium mb-4">Registration Form</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="John"
            required
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            required
          />
        </div>
        <Input
          label="Email"
          type="email"
          placeholder="john.doe@example.com"
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          required
          helperText="Password must be at least 8 characters"
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          required
        />
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Create Account
        </button>
      </div>
    </div>
  </div>
);
