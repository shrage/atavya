import React from 'react';
import { Divider } from './index';

export default {
  title: 'Core/Display/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Divider component for visually separating content.'
      }
    }
  }
};

// Basic horizontal divider
export const Default = () => (
  <div className="w-80 p-4 bg-white">
    <div className="text-text-primary mb-4">Content above</div>
    <Divider />
    <div className="text-text-primary mt-4">Content below</div>
  </div>
);

// Vertical divider
export const Vertical = () => (
  <div className="h-40 flex items-center p-4 bg-white">
    <div className="text-text-primary">Left content</div>
    <Divider orientation="vertical" spacing="md" className="h-20 mx-4" />
    <div className="text-text-primary">Right content</div>
  </div>
);

// Divider with label
export const WithLabel = () => (
  <div className="w-80 p-4 bg-white">
    <div className="text-text-primary mb-4">Content above</div>
    <Divider label="Section" />
    <div className="text-text-primary mt-4">Content below</div>
  </div>
);

// Divider with different label positions
export const LabelPositions = () => (
  <div className="w-80 p-4 space-y-8 bg-white">
    <Divider label="Start" labelPosition="start" />
    <Divider label="Center" labelPosition="center" />
    <Divider label="End" labelPosition="end" />
  </div>
);

// Divider variants
export const Variants = () => (
  <div className="w-80 p-4 space-y-8 bg-white">
    <div>
      <div className="text-sm text-text-secondary mb-2">Solid (default)</div>
      <Divider variant="solid" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-2">Dashed</div>
      <Divider variant="dashed" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-2">Dotted</div>
      <Divider variant="dotted" />
    </div>
  </div>
);

// Divider thickness
export const Thickness = () => (
  <div className="w-80 p-4 space-y-8 bg-white">
    <div>
      <div className="text-sm text-text-secondary mb-2">Thin (default)</div>
      <Divider thickness="thin" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-2">Medium</div>
      <Divider thickness="medium" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-2">Thick</div>
      <Divider thickness="thick" />
    </div>
  </div>
);

// Divider colors
export const Colors = () => (
  <div className="w-80 p-4 space-y-8 bg-white">
    <div>
      <div className="text-sm text-text-secondary mb-2">Border Light (default)</div>
      <Divider color="border-light" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-2">Border Medium</div>
      <Divider color="border-medium" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-2">Border Dark</div>
      <Divider color="border-dark" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-2">Primary</div>
      <Divider color="primary" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-2">Secondary</div>
      <Divider color="secondary" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-2">Success</div>
      <Divider color="success" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-2">Warning</div>
      <Divider color="warning" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-2">Danger</div>
      <Divider color="danger" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-2">Info</div>
      <Divider color="info" />
    </div>
  </div>
);

// Divider spacing
export const Spacing = () => (
  <div className="w-80 p-4 bg-white">
    <div>
      <div className="text-sm text-text-secondary">None</div>
      <Divider spacing="none" />
      <div className="text-sm text-text-secondary">Extra Small (xs)</div>
      <Divider spacing="xs" />
      <div className="text-sm text-text-secondary">Small (sm)</div>
      <Divider spacing="sm" />
      <div className="text-sm text-text-secondary">Medium (md - default)</div>
      <Divider spacing="md" />
      <div className="text-sm text-text-secondary">Large (lg)</div>
      <Divider spacing="lg" />
      <div className="text-sm text-text-secondary">Extra Large (xl)</div>
      <Divider spacing="xl" />
    </div>
  </div>
);

// Divider in a card
export const InCard = () => (
  <div className="w-80 p-0 border border-border-light rounded-lg overflow-hidden bg-white">
    <div className="p-4">
      <h3 className="text-lg font-medium text-text-primary">Card Title</h3>
      <p className="text-sm text-text-secondary mt-1">Card description goes here.</p>
    </div>
    
    <Divider spacing="none" />
    
    <div className="p-4">
      <p className="text-sm text-text-primary">Main content area with important information.</p>
    </div>
    
    <Divider label="Details" />
    
    <div className="p-4">
      <ul className="text-sm text-text-secondary space-y-2">
        <li>Detail item 1</li>
        <li>Detail item 2</li>
        <li>Detail item 3</li>
      </ul>
    </div>
    
    <Divider spacing="none" />
    
    <div className="p-4 bg-gray-50">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Action
        </button>
      </div>
    </div>
  </div>
);

// Divider with custom styling
export const CustomStyling = () => (
  <div className="w-80 p-4 space-y-8 bg-white">
    <Divider 
      label="Custom" 
      thickness="thick" 
      color="primary" 
      variant="dashed" 
    />
    
    <Divider 
      className="opacity-50"
      label="With Opacity" 
      thickness="medium" 
      color="secondary" 
    />
    
    <Divider 
      orientation="vertical" 
      thickness="thick" 
      color="danger" 
      className="h-20 mx-auto" 
    />
  </div>
);
