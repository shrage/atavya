/**
 * Atavya Design System Theme
 * 
 * This file provides a centralized collection of theme-related utility classes
 * to ensure consistency across all components.
 * 
 * IMPORTANT: These colors are also defined in tailwind.config.js
 * When using these colors in components, prefer using Tailwind's theme classes directly:
 * - Use 'bg-primary' instead of hardcoding colors
 * - Use 'text-text-primary' instead of hardcoding text colors
 * 
 * Only use these color constants when you need to reference them programmatically
 * or when using dynamic styles that can't be handled by Tailwind directly.
 */

// Color palette based on the Atavya style guide
const colors = {
  // Brand Colors
  primary: '#7E57C2',
  primaryHover: '#6A48A8',
  primaryLight: '#F5F0FF',
  
  // Text Colors
  textPrimary: '#2C2C2D',
  textSecondary: '#6B6B6C',
  
  // Background Colors
  background: '#FFFFFF',
  backgroundOffwhite: '#F9F9FA',
  backgroundHover: '#F2F2F5',
  
  // Border Colors
  borderLight: '#EAEAEA',
  borderMedium: '#D8D8D8',
  
  // Status Colors
  statusResearch: '#7B83EB',
  statusCampaign: '#4CAF78',
  statusCopywriting: '#E29A4D',
  statusLive: '#E57373',
  statusManagement: '#D4A156',
  statusRequest: '#8C8C8C',
};

// Component-specific theme classes
const theme = {
  // Button variants - use these as a reference, but prefer Tailwind classes in components
  button: {
    base: 'inline-flex items-center justify-center font-medium transition-colors duration-150 rounded focus:outline-none',
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-opacity-50',
    secondary: 'bg-white text-primary border border-primary hover:bg-primary-light focus:ring-2 focus:ring-primary focus:ring-opacity-50',
    tertiary: 'bg-transparent text-text-secondary hover:bg-background-hover focus:ring-2 focus:ring-border-medium focus:ring-opacity-50',
    disabled: 'opacity-50 cursor-not-allowed',
  },
  
  // Input variants
  input: {
    base: 'block w-full rounded border border-border-medium bg-white text-text-primary placeholder:text-text-secondary transition-colors duration-150',
    focus: 'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
    disabled: 'opacity-50 cursor-not-allowed bg-background-offwhite',
    error: 'border-status-live focus:border-status-live focus:ring-status-live',
  },
  
  // Menu variants
  menu: {
    base: 'bg-white border border-border-light shadow-lg rounded-md overflow-hidden',
    item: {
      base: 'flex items-center px-4 py-2 text-sm cursor-pointer',
      default: 'text-text-primary hover:bg-background-hover',
      selected: 'bg-primary-light text-primary',
      disabled: 'text-text-secondary opacity-50 cursor-not-allowed',
      destructive: 'text-status-live hover:bg-status-live/10',
    },
    divider: 'border-t border-border-light my-1',
  },
};

export { colors, theme };
