import React, { useState } from 'react';
import { Slider } from './index';

export default {
  title: 'Core/Form Controls/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Slider component for selecting a value from a range.'
      }
    }
  },
  argTypes: {
    onChange: { action: 'changed' }
  }
};

// Basic Slider
export const Default = (args) => <Slider {...args} />;
Default.args = {
  label: 'Basic slider',
  name: 'default-slider',
  min: 0,
  max: 100,
  defaultValue: 50
};

// Slider with min/max labels
export const WithMinMaxLabels = (args) => <Slider {...args} />;
WithMinMaxLabels.args = {
  label: 'Slider with min/max labels',
  name: 'minmax-slider',
  min: 0,
  max: 100,
  defaultValue: 30,
  showMinMaxLabels: true
};

// Slider with custom min/max labels
export const WithCustomLabels = (args) => <Slider {...args} />;
WithCustomLabels.args = {
  label: 'Volume',
  name: 'volume-slider',
  min: 0,
  max: 100,
  defaultValue: 75,
  showMinMaxLabels: true,
  minLabel: 'Mute',
  maxLabel: 'Max',
  valueSuffix: '%'
};

// Slider with step
export const WithStep = (args) => <Slider {...args} />;
WithStep.args = {
  label: 'Slider with step of 10',
  name: 'step-slider',
  min: 0,
  max: 100,
  step: 10,
  defaultValue: 50,
  showMinMaxLabels: true
};

// Slider with helper text
export const WithHelperText = (args) => <Slider {...args} />;
WithHelperText.args = {
  label: 'Slider with helper text',
  name: 'helper-slider',
  min: 1,
  max: 5,
  defaultValue: 3,
  helperText: 'Select your satisfaction level from 1 to 5',
  showMinMaxLabels: true,
  minLabel: 'Not satisfied',
  maxLabel: 'Very satisfied'
};

// Disabled Slider
export const Disabled = (args) => <Slider {...args} />;
Disabled.args = {
  label: 'Disabled slider',
  name: 'disabled-slider',
  min: 0,
  max: 100,
  defaultValue: 40,
  disabled: true
};

// Slider with error
export const WithError = (args) => <Slider {...args} />;
WithError.args = {
  label: 'Slider with error',
  name: 'error-slider',
  min: 0,
  max: 100,
  defaultValue: 10,
  error: 'Value is too low',
  helperText: 'Please select a value of at least 20',
  showMinMaxLabels: true
};

// Slider with value prefix/suffix
export const WithValueFormatting = () => (
  <div className="space-y-8 w-80">
    <Slider
      label="Price range"
      name="price-slider"
      min={10}
      max={200}
      defaultValue={75}
      valuePrefix="$"
    />
    
    <Slider
      label="Temperature"
      name="temp-slider"
      min={0}
      max={100}
      defaultValue={22}
      valueSuffix="°C"
    />
    
    <Slider
      label="Discount"
      name="discount-slider"
      min={0}
      max={50}
      defaultValue={15}
      valueSuffix="%"
      showMinMaxLabels={true}
    />
  </div>
);

// Controlled Slider
export const Controlled = () => {
  const [value, setValue] = useState(50);
  
  return (
    <div className="space-y-4 w-80">
      <Slider
        label="Controlled slider"
        name="controlled-slider"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        showMinMaxLabels={true}
      />
      
      <div className="flex justify-between">
        <button 
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setValue(Math.max(0, value - 10))}
        >
          -10
        </button>
        <button 
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setValue(Math.min(100, value + 10))}
        >
          +10
        </button>
      </div>
    </div>
  );
};

// Form example with multiple sliders
export const FormExample = () => {
  const [settings, setSettings] = useState({
    brightness: 80,
    contrast: 50,
    saturation: 60,
    sharpness: 40
  });
  
  const handleChange = (name) => (e) => {
    setSettings({
      ...settings,
      [name]: e.target.value
    });
  };
  
  return (
    <div className="max-w-md p-6 border border-border-light rounded-lg">
      <h2 className="text-lg font-medium text-text-primary mb-6">Image Adjustments</h2>
      
      <div className="space-y-6">
        <Slider
          label="Brightness"
          name="brightness"
          min={0}
          max={100}
          value={settings.brightness}
          onChange={handleChange('brightness')}
          valueSuffix="%"
          showMinMaxLabels={true}
        />
        
        <Slider
          label="Contrast"
          name="contrast"
          min={0}
          max={100}
          value={settings.contrast}
          onChange={handleChange('contrast')}
          valueSuffix="%"
          showMinMaxLabels={true}
        />
        
        <Slider
          label="Saturation"
          name="saturation"
          min={0}
          max={100}
          value={settings.saturation}
          onChange={handleChange('saturation')}
          valueSuffix="%"
          showMinMaxLabels={true}
        />
        
        <Slider
          label="Sharpness"
          name="sharpness"
          min={0}
          max={100}
          value={settings.sharpness}
          onChange={handleChange('sharpness')}
          valueSuffix="%"
          showMinMaxLabels={true}
        />
      </div>
      
      <div className="mt-8 pt-4 border-t border-border-light flex justify-between">
        <button 
          className="px-4 py-2 bg-gray-200 text-text-primary rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          onClick={() => setSettings({
            brightness: 50,
            contrast: 50,
            saturation: 50,
            sharpness: 50
          })}
        >
          Reset to Default
        </button>
        
        <button 
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
};
