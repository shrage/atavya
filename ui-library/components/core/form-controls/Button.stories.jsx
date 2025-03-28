import React from 'react';
import Button from './Button';
import { colors } from '../../../theme';

export default {
  title: 'Core/Form Controls/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component following the Atavya design system, supporting multiple variants, sizes, states, and features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the button',
    },
    rounded: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'The border radius style',
    },
    outlined: {
      control: 'boolean',
      description: 'Whether to use outlined style (border with transparent background)',
    },
    flat: {
      control: 'boolean',
      description: 'Whether to use flat style (no background, just text color)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take up full width of container',
    },
    onClick: { 
      action: 'clicked',
      description: 'Function called when the button is clicked',
    },
  },
};

// All button variants
export const All = () => (
  <div className="flex flex-col gap-6">
    <div>
      <h3 className="text-lg font-medium mb-2">Variants</h3>
      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="info">Info</Button>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-medium mb-2">Sizes</h3>
      <div className="flex flex-wrap items-center gap-4">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-medium mb-2">States</h3>
      <div className="flex flex-wrap gap-4">
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <Button loading loadingText="Loading...">Loading with Text</Button>
        <Button active>Active</Button>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-medium mb-2">Styles</h3>
      <div className="flex flex-wrap gap-4">
        <Button outlined>Outlined</Button>
        <Button flat>Flat</Button>
        <Button fullWidth>Full Width</Button>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-medium mb-2">Rounded</h3>
      <div className="flex flex-wrap gap-4">
        <Button rounded="none">None</Button>
        <Button rounded="sm">Small</Button>
        <Button rounded="md">Medium</Button>
        <Button rounded="lg">Large</Button>
        <Button rounded="full">Full</Button>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-medium mb-2">With Icons</h3>
      <div className="flex flex-wrap gap-4">
        <Button 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          }
        >
          Icon Start
        </Button>
        <Button 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          }
          iconPosition="end"
        >
          Icon End
        </Button>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-medium mb-2">As Link</h3>
      <div className="flex flex-wrap gap-4">
        <Button href="#" target="_blank">Link Button</Button>
        <Button 
          href="#" 
          variant="secondary"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          }
        >
          External Link
        </Button>
      </div>
    </div>
  </div>
);

// Individual stories for each variant
export const Primary = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Tertiary = {
  args: {
    children: 'Tertiary Button',
    variant: 'tertiary',
  },
};

export const Success = {
  args: {
    children: 'Success Button',
    variant: 'success',
  },
};

export const Danger = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
};

export const Warning = {
  args: {
    children: 'Warning Button',
    variant: 'warning',
  },
};

export const Info = {
  args: {
    children: 'Info Button',
    variant: 'info',
  },
};

export const WithIcon = {
  args: {
    children: 'Button with Icon',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
      </svg>
    ),
  },
};

export const Loading = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
};

export const Disabled = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const AsLink = {
  args: {
    children: 'Link Button',
    href: '#',
  },
};
