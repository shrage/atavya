import React, { useState } from 'react';
import Tooltip from './Tooltip';

export default {
  title: "Core/Display/Tooltip",
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-[400px] p-8">
        <Story />
      </div>
    ),
  ],
};

export const Default = () => (
  <Tooltip content="This is a tooltip">
    <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
      Hover me
    </button>
  </Tooltip>
);

export const Positions = () => (
  <div className="grid grid-cols-2 gap-8">
    <div className="flex justify-center">
      <Tooltip content="Tooltip on top" position="top">
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Top
        </button>
      </Tooltip>
    </div>
    <div className="flex justify-center">
      <Tooltip content="Tooltip on bottom" position="bottom">
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Bottom
        </button>
      </Tooltip>
    </div>
    <div className="flex justify-center">
      <Tooltip content="Tooltip on left" position="left">
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Left
        </button>
      </Tooltip>
    </div>
    <div className="flex justify-center">
      <Tooltip content="Tooltip on right" position="right">
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Right
        </button>
      </Tooltip>
    </div>
  </div>
);

export const Variants = () => (
  <div className="grid grid-cols-2 gap-8">
    <div className="flex justify-center">
      <Tooltip content="Default tooltip" variant="default">
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Default
        </button>
      </Tooltip>
    </div>
    <div className="flex justify-center">
      <Tooltip content="Light tooltip" variant="light">
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Light
        </button>
      </Tooltip>
    </div>
    <div className="flex justify-center">
      <Tooltip content="Dark tooltip" variant="dark">
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Dark
        </button>
      </Tooltip>
    </div>
    <div className="flex justify-center">
      <Tooltip content="Success message" variant="success">
        <button className="px-4 py-2 bg-status-success text-white rounded hover:bg-status-success-dark">
          Success
        </button>
      </Tooltip>
    </div>
    <div className="flex justify-center">
      <Tooltip content="Warning message" variant="warning">
        <button className="px-4 py-2 bg-status-warning text-white rounded hover:bg-status-warning-dark">
          Warning
        </button>
      </Tooltip>
    </div>
    <div className="flex justify-center">
      <Tooltip content="Error message" variant="danger">
        <button className="px-4 py-2 bg-status-danger text-white rounded hover:bg-status-danger-dark">
          Danger
        </button>
      </Tooltip>
    </div>
  </div>
);

export const TriggerTypes = () => (
  <div className="flex flex-col space-y-8 items-center">
    <div>
      <Tooltip content="Appears on hover" triggerType="hover">
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Hover Me
        </button>
      </Tooltip>
    </div>
    
    <div>
      <Tooltip content="Appears on click" triggerType="click">
        <button className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark">
          Click Me
        </button>
      </Tooltip>
    </div>
    
    <div>
      <Tooltip content="Appears on focus" triggerType="focus">
        <input 
          type="text" 
          placeholder="Focus me" 
          className="px-4 py-2 border border-border-light rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </Tooltip>
    </div>
  </div>
);

export const WithoutArrow = () => (
  <Tooltip content="Tooltip without arrow" showArrow={false}>
    <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
      No Arrow
    </button>
  </Tooltip>
);

export const CustomDelay = () => (
  <div className="flex flex-col space-y-8 items-center">
    <div>
      <Tooltip 
        content="Shows immediately" 
        showDelay={0}
        hideDelay={0}
      >
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          No Delay
        </button>
      </Tooltip>
    </div>
    
    <div>
      <Tooltip 
        content="Shows after 1 second" 
        showDelay={1000}
        hideDelay={500}
      >
        <button className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark">
          1s Show Delay, 0.5s Hide Delay
        </button>
      </Tooltip>
    </div>
  </div>
);

export const RichContent = () => (
  <Tooltip 
    content={
      <div className="space-y-2 p-1">
        <h3 className="font-bold text-text-primary">Rich Content</h3>
        <p className="text-text-secondary">Tooltips can contain rich HTML content</p>
        <ul className="list-disc list-inside text-text-secondary">
          <li>Multiple lines</li>
          <li>Formatting</li>
          <li>Even images or icons</li>
        </ul>
      </div>
    }
    maxWidth="300px"
  >
    <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
      Rich Content
    </button>
  </Tooltip>
);

export const ControlledTooltip = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="flex space-x-4 justify-center mb-4">
        <button 
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Show Tooltip
        </button>
        <button 
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 bg-status-danger text-white rounded hover:bg-status-danger-dark"
        >
          Hide Tooltip
        </button>
      </div>
      
      <div className="flex justify-center">
        <Tooltip 
          content="This tooltip is controlled programmatically"
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className="px-4 py-2 border border-border-light rounded bg-background-light">
            Controlled Tooltip Target
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export const CustomStyling = () => (
  <Tooltip 
    content="Custom styled tooltip"
    className="bg-primary/10 text-primary border border-primary rounded-xl shadow-lg"
    arrowClassName="fill-primary"
  >
    <button className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark">
      Custom Styling
    </button>
  </Tooltip>
);

export const InteractiveTooltip = () => (
  <Tooltip 
    content={
      <div className="space-y-3 p-1">
        <h3 className="font-bold text-text-primary">Interactive Tooltip</h3>
        <p className="text-text-secondary">This tooltip stays open when you hover over it</p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary-dark">
            Action 1
          </button>
          <button className="px-3 py-1 bg-secondary text-white text-sm rounded hover:bg-secondary-dark">
            Action 2
          </button>
        </div>
      </div>
    }
    interactive={true}
    maxWidth="300px"
  >
    <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
      Interactive Tooltip
    </button>
  </Tooltip>
);

export const TooltipWithDifferentElements = () => (
  <div className="grid grid-cols-2 gap-8">
    <div className="flex justify-center">
      <Tooltip content="Tooltip on text">
        <span className="text-text-primary underline cursor-help">
          Hover over this text
        </span>
      </Tooltip>
    </div>
    
    <div className="flex justify-center">
      <Tooltip content="Tooltip on icon">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-primary cursor-help" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </Tooltip>
    </div>
    
    <div className="flex justify-center">
      <Tooltip content="Tooltip on image">
        <img 
          src="https://via.placeholder.com/40" 
          alt="Avatar" 
          className="rounded-full cursor-help" 
        />
      </Tooltip>
    </div>
    
    <div className="flex justify-center">
      <Tooltip content="Tooltip on disabled button" strategy="fixed">
        <button 
          className="px-4 py-2 bg-background-skeleton text-text-tertiary rounded cursor-not-allowed" 
          disabled
        >
          Disabled Button
        </button>
      </Tooltip>
    </div>
  </div>
);
