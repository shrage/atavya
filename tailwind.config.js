/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./.storybook/**/*.{js,jsx,ts,tsx}",
    "./ui-library/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: '#7E57C2', // Brand Purple
          hover: '#6A48A8', // Slightly darker for hover states
          light: '#F5F0FF', // Very light purple for backgrounds
        },
        // Text Colors
        text: {
          primary: '#2C2C2D',
          secondary: '#6B6B6C',
        },
        // Background Colors
        background: {
          DEFAULT: '#FFFFFF',
          offwhite: '#F9F9FA',
          hover: '#F2F2F5',
        },
        // Border Colors
        border: {
          light: '#EAEAEA',
          medium: '#D8D8D8',
        },
        // Status Colors (Muted)
        status: {
          research: '#7B83EB', // muted purple-blue
          campaign: '#4CAF78', // muted green
          copywriting: '#E29A4D', // muted orange
          live: '#E57373', // muted red
          management: '#D4A156', // muted gold
          request: '#8C8C8C', // gray
        },
      },
      fontFamily: {
        sans: [
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"Segoe UI"', 
          'Roboto', 
          'Oxygen', 
          'Ubuntu', 
          'Cantarell', 
          '"Open Sans"', 
          '"Helvetica Neue"', 
          'sans-serif'
        ],
      },
      fontSize: {
        'xs': '12px', // XS: Supporting text, labels, metadata
        'sm': '14px', // S: Secondary text, menu items, buttons
        'base': '16px', // M: Body text, input fields
        'lg': '18px', // L: Subtitles, emphasized content
        'xl': '20px', // XL: Main headings, important sections
        '2xl': '24px', // XXL: Page titles, primary headings
      },
      fontWeight: {
        normal: 400, // Regular: Body text, secondary elements
        medium: 500, // Medium: Section titles, emphasized content
        semibold: 600, // Bold: Main headings, important actions
      },
      spacing: {
        '2xs': '4px',  // 2XS: Minimal spacing
        'xs': '8px',   // XS: Compact UI elements
        's': '12px',   // S: Standard padding
        'm': '16px',   // M: Spacing between components
        'l': '24px',   // L: Section spacing
        'xl': '32px',  // XL: Major section divisions
        '2xl': '48px', // 2XL: Page-level spacing
      },
      borderRadius: {
        DEFAULT: '4px',
        'md': '6px', // For cards & containers
        'pill': '9999px', // For pill-shaped tags
      },
      transitionDuration: {
        DEFAULT: '150ms', // Standard transition
      },
      animation: {
        'indeterminate': 'indeterminate 1.5s infinite ease-in-out',
        'spin-slow': 'spin 3s linear infinite',
        'skeleton-wave': 'skeleton-wave 1.8s ease-in-out 0.5s infinite',
      },
      keyframes: {
        indeterminate: {
          '0%': { left: '-40%' },
          '100%': { left: '100%' },
        },
        'skeleton-wave': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.skeleton-wave': {
          backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0) 0, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0) 100%)',
          backgroundSize: '200% 100%',
          backgroundRepeat: 'no-repeat',
        },
      });
    }
  ],
}
