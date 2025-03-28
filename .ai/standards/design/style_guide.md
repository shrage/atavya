# Atavya Design System Style Guide

## Metadata
- **Type**: Design Standard
- **Status**: Active
- **Last Updated**: 2025-03-28
- **Related Work Units**: [WU-008: UI Component Library](../../work_units/WU-008_ui_component_library.md)
- **Related User Stories**: Multiple component user stories

## Overview

This document defines the design principles, color palette, typography, and component styling guidelines for the Atavya platform. It serves as the foundation for the UI Component Library implementation and ensures visual consistency across the application.

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

### Accent Colors

- **Accent Blue** - `#42A5F5`
  - Secondary actions, links, and highlights
  - Use sparingly for emphasis

- **Accent Green** - `#66BB6A`
  - Success states, completion indicators
  - Use for positive feedback

- **Accent Red** - `#EF5350`
  - Error states, destructive actions
  - Use for warnings and critical information

- **Accent Yellow** - `#FFCA28`
  - Warning states, attention indicators
  - Use for non-critical alerts

### Neutral Colors

- **Gray 100** - `#F5F5F5`
  - Subtle backgrounds, dividers
  - Use for hover states

- **Gray 200** - `#EEEEEE`
  - Borders, dividers
  - Use for separating content

- **Gray 300** - `#E0E0E0`
  - Disabled states
  - Secondary borders

- **Gray 400** - `#BDBDBD`
  - Disabled text
  - Tertiary content

- **Gray 500** - `#9E9E9E`
  - Placeholder text
  - Non-essential information

## Typography

### Font Family

- **Primary Font**: Inter
  - Clean, modern sans-serif typeface
  - Excellent readability at all sizes
  - Available weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

### Font Sizes

- **Heading 1**: 24px / 32px line height
  - Use for main page titles
  - Weight: 600 (SemiBold)

- **Heading 2**: 20px / 28px line height
  - Use for section headings
  - Weight: 600 (SemiBold)

- **Heading 3**: 16px / 24px line height
  - Use for subsection headings
  - Weight: 600 (SemiBold)

- **Body Large**: 16px / 24px line height
  - Use for primary content
  - Weight: 400 (Regular)

- **Body**: 14px / 20px line height
  - Use for most content
  - Weight: 400 (Regular)

- **Body Small**: 12px / 16px line height
  - Use for secondary information, captions
  - Weight: 400 (Regular)

- **Label**: 14px / 20px line height
  - Use for form labels, buttons
  - Weight: 500 (Medium)

- **Caption**: 12px / 16px line height
  - Use for supplementary information
  - Weight: 400 (Regular)

### Text Colors

- **Primary Text**: `#2C2C2D` (dark gray)
  - Use for main content

- **Secondary Text**: `#6B6B6C` (medium gray)
  - Use for supporting content

- **Tertiary Text**: `#9E9E9E` (light gray)
  - Use for hints, placeholders

- **Disabled Text**: `#BDBDBD` (very light gray)
  - Use for disabled elements

- **Inverse Text**: `#FFFFFF` (white)
  - Use on dark backgrounds

## Spacing System

The spacing system uses a 4px base unit to ensure consistent spacing throughout the interface.

- **4px** - Minimal spacing between related elements (xs)
- **8px** - Default spacing between elements (sm)
- **12px** - Medium spacing between related sections (md)
- **16px** - Standard spacing between sections (lg)
- **24px** - Large spacing between major sections (xl)
- **32px** - Extra large spacing for page sections (xxl)
- **48px** - Maximum spacing for major page divisions (xxxl)

## Border Radius

- **0px** - No radius, square corners
- **2px** - Subtle radius for small elements
- **4px** - Default radius for most components
- **8px** - Medium radius for cards, modals
- **16px** - Large radius for floating elements
- **Full** - Circular elements (50%)

## Shadows

Shadows are used sparingly to indicate elevation and focus.

- **Shadow 0**: None
  - Flat elements, no elevation

- **Shadow 1**: `0 1px 2px rgba(0, 0, 0, 0.05)`
  - Subtle elevation for cards, buttons

- **Shadow 2**: `0 2px 4px rgba(0, 0, 0, 0.1)`
  - Medium elevation for dropdowns, popovers

- **Shadow 3**: `0 4px 8px rgba(0, 0, 0, 0.1)`
  - High elevation for modals, dialogs

- **Shadow 4**: `0 8px 16px rgba(0, 0, 0, 0.1)`
  - Maximum elevation for critical elements

## Component Styling Guidelines

### Buttons

- Use the appropriate variant based on importance
- Maintain consistent padding (horizontal padding should be 1.5x vertical padding)
- Include hover, active, and focus states
- Disabled buttons should use Gray 300 background and Gray 400 text

### Forms

- Labels should be placed above inputs
- Required fields should be indicated with an asterisk
- Error messages should appear below the input
- Use consistent input heights across the interface

### Cards

- Use Shadow 1 for default cards
- Maintain consistent padding (16px)
- Headers should use Heading 3 typography
- Card actions should be aligned to the bottom right

### Tables

- Use alternating row colors for better readability
- Header cells should use Label typography
- Align text based on content type (left for text, right for numbers)
- Include hover states for interactive rows

### Icons

- Use 20px icons for most interface elements
- Ensure icons have consistent stroke width
- Icon color should match the text color it accompanies
- Use filled icons for selected/active states

## Design Principles

### Clarity

- Prioritize content over decoration
- Use visual hierarchy to guide users
- Maintain consistent patterns across the interface
- Reduce visual noise and clutter

### Efficiency

- Minimize the number of clicks required to complete tasks
- Use progressive disclosure for complex interfaces
- Provide clear feedback for user actions
- Optimize for common use cases

### Consistency

- Use the same patterns for similar interactions
- Maintain consistent spacing and alignment
- Apply color consistently according to the defined palette
- Use the same terminology throughout the interface

### Accessibility

- Ensure sufficient color contrast (WCAG AA compliance)
- Support keyboard navigation for all interactive elements
- Provide text alternatives for non-text content
- Design for screen readers and assistive technologies

## Implementation Notes

This style guide is implemented in the UI Component Library (WU-008) and serves as the foundation for all UI components. All components should adhere to these guidelines to ensure a consistent user experience across the Atavya platform.

## Last Updated

2025-03-28: Converted from original style guide document to AI framework format
