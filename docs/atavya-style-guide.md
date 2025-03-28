# Atavya Design System Style Guide

## Brand Identity

The Atavya design system combines the distinctive brand color scheme with a clean, minimal approach inspired by document-based interfaces. This system prioritizes clarity, functionality, and reduced visual complexity while maintaining a strong brand presence.

## Color Palette

### Primary Colors

- **Brand Purple** - `#7E57C2`
  - Use for primary actions, logo, and key interactive elements
  - Avoid using for large backgrounds or overwhelming areas

- **Background** - `#FFFFFF` (white) or `#F9F9FA` (off-white)
  - Main content areas and containers
  - Replaces previous gradient backgrounds

- **Text Primary** - `#2C2C2D`
  - Main content text

- **Text Secondary** - `#6B6B6C`
  - Supporting text, labels, and placeholders

### Status Colors (Muted)

- **Research** - `#7B83EB` (muted purple-blue)
- **Campaign Launch** - `#4CAF78` (muted green)
- **Copywriting** - `#E29A4D` (muted orange)
- **Live** - `#E57373` (muted red)
- **Management** - `#D4A156` (muted gold)
- **Request** - `#8C8C8C` (gray)

### Neutral Colors

- **Border Light** - `#EAEAEA`
  - Subtle borders for containers and dividers
- **Border Medium** - `#D8D8D8`
  - More prominent borders
- **Hover State** - `#F2F2F5`
  - Hover and selected states for interactive elements

## Typography

### Font Family

- **System Font Stack**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`
  - Consistent use across all elements for better system performance

### Font Sizes

- **XS**: 12px - Supporting text, labels, metadata
- **S**: 14px - Secondary text, menu items, buttons
- **M**: 16px - Body text, input fields, most interface elements
- **L**: 18px - Subtitles, emphasized content
- **XL**: 20px - Main headings, important sections
- **XXL**: 24px - Page titles, primary headings

### Font Weights

- **Regular**: 400 - Body text, secondary elements
- **Medium**: 500 - Section titles, emphasized content
- **Bold**: 600 - Main headings, important actions

## Spacing System

Based on a 4px grid system:

- **2XS**: 4px - Minimal spacing between related elements
- **XS**: 8px - Compact UI elements, icon padding
- **S**: 12px - Standard padding within components
- **M**: 16px - Spacing between components
- **L**: 24px - Section spacing
- **XL**: 32px - Major section divisions
- **2XL**: 48px - Page-level spacing

## UI Components

### Cards & Containers

- **Background**: White (`#FFFFFF`)
- **Border**: 1px solid Border Light (`#EAEAEA`)
- **Corner Radius**: 6px
- **Padding**: 16px (M)
- No shadows by default, minimal hover states
- Nested cards should use border-only approach

### Buttons

#### Primary Button
- Background: Brand Purple (`#7E57C2`)
- Text: White (`#FFFFFF`)
- Padding: 8px 16px (XS horizontally, M vertically)
- Border Radius: 4px
- Hover: Slightly darker (`#6A48A8`)

#### Secondary Button
- Background: White (`#FFFFFF`)
- Text: Brand Purple (`#7E57C2`)
- Border: 1px solid Brand Purple (`#7E57C2`)
- Same padding and radius as Primary
- Hover: Very light purple background (`#F5F0FF`)

#### Tertiary Button
- Background: Transparent
- Text: Text Secondary (`#6B6B6C`)
- No border
- Hover: Hover State (`#F2F2F5`)

### Input Fields

- Background: White (`#FFFFFF`)
- Border: 1px solid Border Medium (`#D8D8D8`)
- Border Radius: 4px
- Padding: 8px 12px (XS horizontally, S vertically)
- Focus: 1px solid Brand Purple (`#7E57C2`)
- Text: Text Primary (`#2C2C2D`)
- Placeholder: Text Secondary (`#6B6B6C`)

### Status Tags

- Border Radius: 4px (pill-shaped for longer tags)
- Padding: 4px 8px (2XS horizontally, XS vertically)
- Font Size: 12px (XS)
- Font Weight: 500 (Medium)
- Background: 15% opacity of respective status color
- Text: 100% opacity of respective status color
- No border (flat design)

### Navigation

- **Sidebar**:
  - Background: White (`#FFFFFF`)
  - Dividers: 1px solid Border Light (`#EAEAEA`)
  - Selected Item: Light purple background (`#F5F0FF`)
  - Hover: Hover State (`#F2F2F5`)

- **Tab Navigation**:
  - Border-bottom approach instead of filled backgrounds
  - Active tab: 2px solid Brand Purple (`#7E57C2`)
  - Inactive tab: No border, Text Secondary (`#6B6B6C`)

### Icons

- Line weight: 1.5px consistent across all icons
- Size: 20px for standard UI, 16px for compact areas
- Color: Text Secondary (`#6B6B6C`) by default
- Active/Interactive: Brand Purple (`#7E57C2`)

## Layout Principles

### Grid System

- 12-column grid for desktop layouts
- Consistent gutters of 24px (L)
- Responsive breakpoints:
  - Desktop: 1200px+
  - Tablet: 768px-1199px
  - Mobile: <768px

### Content Containers

- Maximum content width: 1200px
- Main content area padding: 32px (XL) on desktop, scaling down on smaller screens
- Sidebar width: 240px (fixed)

### Visual Hierarchy

- Use typography scale instead of multiple visual treatments
- Single-pixel borders instead of shadows for separation
- White space as the primary dividing element between sections
- Subtle color coding for categorization

## Accessibility Guidelines

- All colors meet WCAG 2.1 AA contrast requirements
- Primary interactive elements have visible focus states
- Interactive element touch targets minimum 40px × 40px
- Text never below 12px for readability

## Animation & Transitions

- Minimal, purpose-driven animations only
- Standard transition: 150ms ease
- Avoid simultaneous animations that could distract users
- Focus on micro-interactions that provide feedback

---

This style guide creates a cleaner, more document-focused interface while maintaining Atavya's brand identity through strategic use of color. The removal of gradients and reduction of visual complexity creates a more timeless design that emphasizes content and functionality.
