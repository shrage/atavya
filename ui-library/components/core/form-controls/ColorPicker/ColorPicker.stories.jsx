import React, { useState } from 'react';
import { ColorPicker } from './index';

export default {
  title: 'Core/Form Controls/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Color picker component for selecting colors with predefined palettes.'
      }
    }
  },
  argTypes: {
    onChange: { action: 'changed' }
  }
};

// Basic ColorPicker
export const Default = (args) => <ColorPicker {...args} />;
Default.args = {
  label: 'Select a color',
  name: 'default-color-picker',
  defaultValue: '#3B82F6'
};

// ColorPicker with custom default value
export const CustomDefaultColor = (args) => <ColorPicker {...args} />;
CustomDefaultColor.args = {
  label: 'Select a color',
  name: 'custom-default-color-picker',
  defaultValue: '#EF4444'
};

// ColorPicker without hex value display
export const WithoutHexValue = (args) => <ColorPicker {...args} />;
WithoutHexValue.args = {
  label: 'Select a color',
  name: 'no-hex-color-picker',
  defaultValue: '#22C55E',
  showHexValue: false
};

// ColorPicker with helper text
export const WithHelperText = (args) => <ColorPicker {...args} />;
WithHelperText.args = {
  label: 'Select a color',
  name: 'helper-color-picker',
  defaultValue: '#8B5CF6',
  helperText: 'Choose a color for your profile theme'
};

// Disabled ColorPicker
export const Disabled = (args) => <ColorPicker {...args} />;
Disabled.args = {
  label: 'Select a color (disabled)',
  name: 'disabled-color-picker',
  defaultValue: '#F97316',
  disabled: true
};

// ColorPicker with error
export const WithError = (args) => <ColorPicker {...args} />;
WithError.args = {
  label: 'Select a color',
  name: 'error-color-picker',
  defaultValue: '#000000',
  error: 'Dark colors are not recommended',
  helperText: 'Please select a brighter color for better visibility'
};

// ColorPicker with custom palette
export const CustomPalette = (args) => <ColorPicker {...args} />;
CustomPalette.args = {
  label: 'Brand colors',
  name: 'custom-palette-color-picker',
  defaultValue: '#1A73E8',
  palette: [
    // Google brand colors
    '#1A73E8', // Google Blue
    '#EA4335', // Google Red
    '#FBBC04', // Google Yellow
    '#34A853', // Google Green
    
    // Material design colors
    '#F44336', // Red 500
    '#E91E63', // Pink 500
    '#9C27B0', // Purple 500
    '#673AB7', // Deep Purple 500
    '#3F51B5', // Indigo 500
    '#2196F3', // Blue 500
    '#03A9F4', // Light Blue 500
    '#00BCD4', // Cyan 500
    '#009688', // Teal 500
    '#4CAF50', // Green 500
    '#8BC34A', // Light Green 500
    '#CDDC39', // Lime 500
    '#FFEB3B', // Yellow 500
    '#FFC107', // Amber 500
    '#FF9800', // Orange 500
    '#FF5722', // Deep Orange 500
    '#795548', // Brown 500
    '#9E9E9E', // Grey 500
    '#607D8B', // Blue Grey 500
  ]
};

// Required ColorPicker
export const Required = (args) => <ColorPicker {...args} />;
Required.args = {
  label: 'Select a color',
  name: 'required-color-picker',
  defaultValue: '#D946EF',
  required: true
};

// Controlled ColorPicker
export const Controlled = () => {
  const [color, setColor] = useState('#3B82F6');
  
  return (
    <div className="space-y-4">
      <ColorPicker
        label={`Selected color: ${color}`}
        name="controlled-color-picker"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      
      <div className="flex space-x-2">
        <button 
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setColor('#EF4444')}
        >
          Red
        </button>
        <button 
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setColor('#22C55E')}
        >
          Green
        </button>
        <button 
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setColor('#3B82F6')}
        >
          Blue
        </button>
      </div>
    </div>
  );
};

// Form example with multiple color pickers
export const FormExample = () => {
  const [colors, setColors] = useState({
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#F97316',
    text: '#111827',
    background: '#FFFFFF'
  });
  
  const handleChange = (name) => (e) => {
    setColors({
      ...colors,
      [name]: e.target.value
    });
  };
  
  return (
    <div className="max-w-md p-6 border border-border-light rounded-lg">
      <h2 className="text-lg font-medium text-text-primary mb-6">Theme Customization</h2>
      
      <div className="space-y-4">
        <ColorPicker
          label="Primary Color"
          name="primary"
          value={colors.primary}
          onChange={handleChange('primary')}
        />
        
        <ColorPicker
          label="Secondary Color"
          name="secondary"
          value={colors.secondary}
          onChange={handleChange('secondary')}
        />
        
        <ColorPicker
          label="Accent Color"
          name="accent"
          value={colors.accent}
          onChange={handleChange('accent')}
        />
        
        <ColorPicker
          label="Text Color"
          name="text"
          value={colors.text}
          onChange={handleChange('text')}
        />
        
        <ColorPicker
          label="Background Color"
          name="background"
          value={colors.background}
          onChange={handleChange('background')}
        />
      </div>
      
      {/* Preview */}
      <div className="mt-6 pt-4 border-t border-border-light">
        <h3 className="text-sm font-medium text-text-secondary mb-2">Preview:</h3>
        <div 
          className="p-4 rounded-lg border border-border-light"
          style={{ backgroundColor: colors.background }}
        >
          <h4 
            className="text-base font-medium mb-2" 
            style={{ color: colors.text }}
          >
            Sample Content
          </h4>
          <p 
            className="text-sm mb-4" 
            style={{ color: colors.text }}
          >
            This is a preview of your selected theme colors.
          </p>
          <div className="flex space-x-2">
            <button 
              className="px-3 py-1 rounded text-white"
              style={{ backgroundColor: colors.primary }}
            >
              Primary
            </button>
            <button 
              className="px-3 py-1 rounded text-white"
              style={{ backgroundColor: colors.secondary }}
            >
              Secondary
            </button>
            <button 
              className="px-3 py-1 rounded text-white"
              style={{ backgroundColor: colors.accent }}
            >
              Accent
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Save Theme
        </button>
      </div>
    </div>
  );
};
