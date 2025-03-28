import React from 'react';
import { Stack } from './index';
import { Divider } from '../../core/display/Divider';

export default {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Stack component for arranging elements in a vertical or horizontal stack with consistent spacing.'
      }
    }
  }
};

// Helper component for stack examples
const StackItem = ({ children, className, ...props }) => (
  <div 
    className={`bg-primary/10 border border-primary/30 p-4 rounded flex items-center justify-center text-sm font-medium text-primary ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);

// Basic vertical stack
export const VerticalStack = () => (
  <Stack spacing={4}>
    <StackItem>Item 1</StackItem>
    <StackItem>Item 2</StackItem>
    <StackItem>Item 3</StackItem>
  </Stack>
);

// Horizontal stack
export const HorizontalStack = () => (
  <Stack direction="horizontal" spacing={4}>
    <StackItem>Item 1</StackItem>
    <StackItem>Item 2</StackItem>
    <StackItem>Item 3</StackItem>
  </Stack>
);

// Different spacing options
export const Spacing = () => (
  <div className="space-y-12">
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Spacing: 0</h3>
      <Stack spacing={0}>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </Stack>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Spacing: 2</h3>
      <Stack spacing={2}>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </Stack>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Spacing: 8</h3>
      <Stack spacing={8}>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </Stack>
    </div>
  </div>
);

// Alignment options for vertical stack
export const VerticalAlignment = () => (
  <div className="space-y-12">
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Align: start</h3>
      <Stack align="start" className="bg-gray-100 p-4 h-40">
        <StackItem className="w-1/3">Item 1</StackItem>
        <StackItem className="w-1/2">Item 2</StackItem>
        <StackItem className="w-2/3">Item 3</StackItem>
      </Stack>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Align: center</h3>
      <Stack align="center" className="bg-gray-100 p-4 h-40">
        <StackItem className="w-1/3">Item 1</StackItem>
        <StackItem className="w-1/2">Item 2</StackItem>
        <StackItem className="w-2/3">Item 3</StackItem>
      </Stack>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Align: end</h3>
      <Stack align="end" className="bg-gray-100 p-4 h-40">
        <StackItem className="w-1/3">Item 1</StackItem>
        <StackItem className="w-1/2">Item 2</StackItem>
        <StackItem className="w-2/3">Item 3</StackItem>
      </Stack>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Align: stretch (default)</h3>
      <Stack align="stretch" className="bg-gray-100 p-4 h-40">
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </Stack>
    </div>
  </div>
);

// Alignment options for horizontal stack
export const HorizontalAlignment = () => (
  <div className="space-y-12">
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Align: start</h3>
      <Stack direction="horizontal" align="start" className="bg-gray-100 p-4 h-40">
        <StackItem className="h-8">Item 1</StackItem>
        <StackItem className="h-16">Item 2</StackItem>
        <StackItem className="h-24">Item 3</StackItem>
      </Stack>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Align: center</h3>
      <Stack direction="horizontal" align="center" className="bg-gray-100 p-4 h-40">
        <StackItem className="h-8">Item 1</StackItem>
        <StackItem className="h-16">Item 2</StackItem>
        <StackItem className="h-24">Item 3</StackItem>
      </Stack>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Align: end</h3>
      <Stack direction="horizontal" align="end" className="bg-gray-100 p-4 h-40">
        <StackItem className="h-8">Item 1</StackItem>
        <StackItem className="h-16">Item 2</StackItem>
        <StackItem className="h-24">Item 3</StackItem>
      </Stack>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Align: stretch (default)</h3>
      <Stack direction="horizontal" align="stretch" className="bg-gray-100 p-4 h-40">
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </Stack>
    </div>
  </div>
);

// Justify options
export const JustifyContent = () => (
  <div className="space-y-12">
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Justify: start (default)</h3>
      <Stack direction="horizontal" justify="start" className="bg-gray-100 p-4">
        <StackItem className="w-20">Item 1</StackItem>
        <StackItem className="w-20">Item 2</StackItem>
        <StackItem className="w-20">Item 3</StackItem>
      </Stack>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Justify: center</h3>
      <Stack direction="horizontal" justify="center" className="bg-gray-100 p-4">
        <StackItem className="w-20">Item 1</StackItem>
        <StackItem className="w-20">Item 2</StackItem>
        <StackItem className="w-20">Item 3</StackItem>
      </Stack>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Justify: end</h3>
      <Stack direction="horizontal" justify="end" className="bg-gray-100 p-4">
        <StackItem className="w-20">Item 1</StackItem>
        <StackItem className="w-20">Item 2</StackItem>
        <StackItem className="w-20">Item 3</StackItem>
      </Stack>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Justify: between</h3>
      <Stack direction="horizontal" justify="between" className="bg-gray-100 p-4">
        <StackItem className="w-20">Item 1</StackItem>
        <StackItem className="w-20">Item 2</StackItem>
        <StackItem className="w-20">Item 3</StackItem>
      </Stack>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Justify: around</h3>
      <Stack direction="horizontal" justify="around" className="bg-gray-100 p-4">
        <StackItem className="w-20">Item 1</StackItem>
        <StackItem className="w-20">Item 2</StackItem>
        <StackItem className="w-20">Item 3</StackItem>
      </Stack>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Justify: evenly</h3>
      <Stack direction="horizontal" justify="evenly" className="bg-gray-100 p-4">
        <StackItem className="w-20">Item 1</StackItem>
        <StackItem className="w-20">Item 2</StackItem>
        <StackItem className="w-20">Item 3</StackItem>
      </Stack>
    </div>
  </div>
);

// Stack with dividers
export const WithDividers = () => (
  <div className="space-y-12">
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Vertical Stack with Dividers</h3>
      <Stack divider={<Divider />}>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </Stack>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Horizontal Stack with Dividers</h3>
      <Stack direction="horizontal" divider={<Divider orientation="vertical" className="h-10" />}>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </Stack>
    </div>
  </div>
);

// Responsive stack
export const ResponsiveStack = () => (
  <Stack direction="horizontal" responsive={true} spacing={4}>
    <StackItem>
      <div className="text-center">
        <div>Item 1</div>
        <div className="text-xs text-text-secondary mt-2">Stacks vertically on small screens</div>
      </div>
    </StackItem>
    <StackItem>
      <div className="text-center">
        <div>Item 2</div>
        <div className="text-xs text-text-secondary mt-2">Stacks horizontally on larger screens</div>
      </div>
    </StackItem>
    <StackItem>
      <div className="text-center">
        <div>Item 3</div>
        <div className="text-xs text-text-secondary mt-2">Resize the window to see the change</div>
      </div>
    </StackItem>
  </Stack>
);

// Wrapping stack
export const WrappingStack = () => (
  <Stack direction="horizontal" wrap={true} spacing={4} className="max-w-md">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <StackItem key={i} className="w-24 h-24">
        Item {i}
      </StackItem>
    ))}
  </Stack>
);

// Real-world example: Form layout
export const FormLayout = () => (
  <div className="max-w-md p-6 border border-border-light rounded-lg bg-white">
    <Stack spacing={6}>
      <h2 className="text-lg font-medium text-text-primary">Contact Information</h2>
      
      <Stack spacing={4}>
        <Stack spacing={1}>
          <label className="text-sm font-medium text-text-primary">Full Name</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter your full name"
          />
        </Stack>
        
        <Stack direction="horizontal" responsive={true} spacing={4}>
          <Stack spacing={1} className="flex-1">
            <label className="text-sm font-medium text-text-primary">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter your email"
            />
          </Stack>
          
          <Stack spacing={1} className="flex-1">
            <label className="text-sm font-medium text-text-primary">Phone</label>
            <input 
              type="tel" 
              className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter your phone number"
            />
          </Stack>
        </Stack>
        
        <Stack spacing={1}>
          <label className="text-sm font-medium text-text-primary">Message</label>
          <textarea 
            className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter your message"
            rows={4}
          />
        </Stack>
      </Stack>
      
      <Stack direction="horizontal" justify="end" spacing={2}>
        <button 
          className="px-4 py-2 border border-border-medium text-text-primary rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button 
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Submit
        </button>
      </Stack>
    </Stack>
  </div>
);

// Real-world example: Card layout
export const CardLayout = () => (
  <div className="max-w-md p-0 border border-border-light rounded-lg overflow-hidden bg-white">
    <Stack spacing={0}>
      <img 
        src="https://via.placeholder.com/600x300" 
        alt="Card header" 
        className="w-full h-40 object-cover"
      />
      
      <Stack spacing={4} className="p-4">
        <Stack spacing={1}>
          <h3 className="text-lg font-medium text-text-primary">Card Title</h3>
          <p className="text-sm text-text-secondary">Card description goes here with more details about the content.</p>
        </Stack>
        
        <Stack direction="horizontal" spacing={2}>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Tag 1
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
            Tag 2
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-status-success/10 text-status-success">
            Tag 3
          </span>
        </Stack>
      </Stack>
      
      <Divider />
      
      <Stack direction="horizontal" justify="end" className="p-4">
        <Stack direction="horizontal" spacing={2}>
          <button 
            className="px-4 py-2 border border-border-medium text-text-primary rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Action
          </button>
        </Stack>
      </Stack>
    </Stack>
  </div>
);
