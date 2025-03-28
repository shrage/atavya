# Atavya UI Component Library

This directory contains the Atavya UI component library, a collection of reusable React components designed with a Notion-inspired aesthetic for building consistent user interfaces.

## Library Structure

```
ui-library/
├── README.md                    # This file - overview of the library
├── library.md                   # Comprehensive inventory of all components
├── CONTRIBUTING.md              # Guidelines for contributing to the library
├── component-index.md           # Quick reference index of all components
├── styles.css                   # Global styles for the component library
├── components/                  # The actual component implementations
│   ├── core/                    # Core components
│   │   ├── form-controls/       # Button, Input, Select, etc.
│   │   └── display/             # Avatar, StatusBadge, etc.
│   ├── layout/                  # Accordion, Card, AppShell
│   ├── navigation/              # Menu, Breadcrumbs, Tabs
│   ├── feedback/                # Alert, Toast, Modal, Spinner
│   ├── data/                    # Data-related components
│   │   ├── lists-tables/        # BaseList, DataTable
│   │   ├── configuration/       # Configuration components
│   │   └── visualization/       # Progress, Pagination
│   ├── communication/           # Communication components
│   ├── view/                    # View-related components
│   ├── industry-specific/       # Industry-specific components
│   ├── common/                  # Common utilities and shared code
│   └── framework/               # Framework-specific components
├── templates/                   # Templates for new components
│   ├── component-template.jsx
│   ├── component-template.stories.jsx
│   └── new-component-checklist.md
└── docs/                        # Additional documentation
```

## Getting Started

### Viewing Components in Storybook

To view the component library in Storybook:

```bash
npm run storybook
```

This will start Storybook on port 8080 (or another available port) where you can browse, interact with, and view documentation for all components.

### Using Components in Your Application

Import components directly from their location in the ui-library:

```jsx
import Button from '../ui-library/components/core/form-controls/Button';
import Avatar from '../ui-library/components/core/display/Avatar';
```

## Component Development

### Creating a New Component

1. Copy the template files from the `ui-library/templates` directory
2. Place your component in the appropriate category folder
3. Implement the component according to the specifications in `library.md`
4. Create a story file for Storybook documentation
5. Update the component's behavior checklist in `library.md` by adding `[x]` next to each implemented behavior
6. Update component counts in the Table of Contents in `library.md`

### Component Implementation Checklist

When implementing a component, refer to the behavior list in `library.md` and check off each implemented behavior by adding `[x]` at the beginning of the line:

```markdown
- **Behavior**:
  - [x] Implemented behavior 1
  - [x] Implemented behavior 2
  - [ ] Not yet implemented behavior 3
```

**IMPORTANT**: Only mark a behavior as implemented `[x]` if you have verified that the feature is actually working in the component code. You must examine the component implementation and verify each behavior before checking it off. Do not mark features that are planned but not yet implemented.

### Verification Process for Component Behaviors

Follow these steps to accurately verify component behaviors:

1. **Code Inspection**: Examine the component's source code to verify that each behavior is implemented
2. **Props Verification**: Check the component's PropTypes to confirm supported props
3. **Story Testing**: Run the component's stories in Storybook to verify functionality
4. **Edge Cases**: Test edge cases and different prop combinations

This verification process ensures that the component inventory accurately reflects the current state of implementation.

## Component Development Guidelines

### Using the Atavya Theme System

All components in the Atavya UI library must follow these theme guidelines:

1. **Use the Theme Colors**: Always use colors from the Atavya theme system instead of hardcoding color values.
   ```jsx
   // ❌ Don't do this
   <div className="bg-[#7E57C2] text-white">Button</div>
   
   // ✅ Do this instead (using Tailwind config theme colors)
   <div className="bg-primary text-white">Button</div>
   ```

2. **Implement Color Variables in Tailwind Config**: For proper theme support, add all colors to the Tailwind configuration:
   ```js
   // tailwind.config.js
   module.exports = {
     theme: {
       extend: {
         colors: {
           // Brand colors
           primary: '#7E57C2',
           'primary-dark': '#6A48A8',
           'primary-light': '#9575CD',
           
           // Text colors
           'text-primary': '#1F2937',
           'text-secondary': '#4B5563',
           'text-tertiary': '#9CA3AF',
           
           // Background colors
           'background-offwhite': '#FFFFFF',
           'background-hover': '#F9FAFB',
           'background-skeleton': '#F3F4F6',
           'background-dark': '#111827',
           
           // Border colors
           'border-light': '#E5E7EB',
           'border-medium': '#D1D5DB',
           'border-dark': '#9CA3AF',
           
           // Status colors
           'status-live': '#EF4444',
           'status-campaign': '#10B981',
           'status-draft': '#6B7280',
           'status-archived': '#9CA3AF',
           'status-scheduled': '#F59E0B',
           'status-paused': '#6B7280',
           'status-copywriting': '#EF4444',
         }
       }
     }
   }
   ```

3. **Use Semantic Color Names**: Use semantic color names that describe the purpose, not the visual appearance:
   ```jsx
   // ❌ Don't do this
   <div className="bg-purple-600 text-white">Button</div>
   
   // ✅ Do this instead
   <div className="bg-primary text-white">Button</div>
   ```

4. **Use Status Colors Consistently**: For status indicators, use the dedicated status colors:
   ```jsx
   // ❌ Don't do this
   <Badge className="bg-green-500">Live</Badge>
   
   // ✅ Do this instead
   <Badge className="bg-status-live">Live</Badge>
   ```

5. **Use CSS Variables for Dynamic Theming**: For components that need dynamic theming, use CSS variables:
   ```css
   /* In styles.css */
   :root {
     --color-primary: #7E57C2;
     --color-primary-hover: #6A48A8;
   }
   ```
   
   ```jsx
   // In your component
   <div className="bg-[var(--color-primary)] text-white">Button</div>
   ```

### Theme Usage

When developing components and stories for the Atavya UI library, always follow these theming guidelines:

1. **Use Tailwind Theme Colors**: Always use theme color variables instead of hardcoded color values:
   - ✅ `bg-primary`, `text-text-primary`, `border-border-light`
   - ❌ `bg-blue-500`, `text-gray-700`, `border-gray-200`

2. **Status Colors**: Use semantic status color variables for consistent status indicators:
   - ✅ `bg-status-success`, `text-status-danger`, `border-status-warning`
   - ❌ `bg-green-500`, `text-red-600`, `border-yellow-400`

3. **Opacity Variations**: Use theme colors with opacity modifiers for subtle variations:
   - ✅ `bg-primary/10`, `text-status-danger/80`
   - ❌ `bg-opacity-10 bg-blue-500`, `text-opacity-80 text-red-600`

4. **Story Examples**: All examples in story files must use theme color variables to ensure consistency and proper documentation.

5. **Component Props**: When creating components that accept color props, map these to theme colors internally:
   ```jsx
   // Good - maps variant prop to theme colors
   const variantClasses = {
     primary: 'bg-primary text-white',
     secondary: 'bg-secondary text-white',
     danger: 'bg-status-danger text-white'
   };
   ```

### Testing Theme Consistency

Before submitting a new component or story:

1. Check that all colors used are theme variables, not hardcoded values
2. Verify that the component looks correct in Storybook
3. Ensure all interactive states (hover, focus, etc.) use appropriate theme colors

### Component Composition

1. **Reuse Existing Building Blocks**: Before creating a new component, check if you can compose it from existing components:
   ```jsx
   // ❌ Don't create a new card action component
   const CardAction = ({ children }) => (
     <div className="p-4 border-t border-gray-200">
       {children}
     </div>
   );
   
   // ✅ Reuse the Button component
   <Card>
     <CardContent>Card content here</CardContent>
     <CardFooter>
       <Button variant="primary">Action</Button>
     </CardFooter>
   </Card>
   ```

2. **Component Hierarchy**: Follow this hierarchy when building components:
   - **Core Components**: Basic building blocks (Button, Input, etc.)
   - **Composite Components**: Combinations of core components (Form, SearchBar, etc.)
   - **Feature Components**: Business-specific components built from core and composite components

3. **Props Consistency**: Maintain consistent prop names across similar components:
   - Use `variant` for style variations
   - Use `size` for size variations
   - Use `disabled` for disabled state
   - Use `className` for custom class overrides

### Component Implementation Checklist

When creating a new component:

1. ✅ Check if it can be built using existing components
2. ✅ Use the Atavya theme colors instead of hardcoded values
3. ✅ Ensure it's responsive and accessible
4. ✅ Create comprehensive stories showing all variants and states
5. ✅ Document props and usage examples
6. ✅ Add tests for component functionality

### Theme Integration Examples

```jsx
// Button component using theme colors
const Button = ({ variant = 'primary', children, ...props }) => {
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    secondary: 'bg-gray-100 text-text-secondary hover:bg-gray-200',
    // ... other variants
  };

  return (
    <button 
      className={`px-4 py-2 rounded ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

## Understanding and Maintaining the library.md File

The `library.md` file serves as the master inventory of all UI components for the Atavya platform. It has a specific structure that must be maintained:

### Table of Contents

The Table of Contents section includes implementation counters that show how many components are implemented vs. the total planned:

```markdown
- [1. Core Components](#1-core-components) <span style="color:green">10</span>/<span style="color:red">19</span>
  - [1.1. Form Controls](#11-form-controls) <span style="color:green">3</span>/<span style="color:red">10</span>
```

These counters must be manually updated whenever:
- A new component is added to the inventory
- A component's status changes from incomplete to complete (✅)

### Component Status

Each component in the inventory has a status field:

```markdown
#### Button
- **Status**: ✅ Completed
```

Only mark a component as "✅ Completed" when:
1. All required behaviors are implemented (or a decision has been made that certain behaviors are not needed)
2. The component has proper documentation
3. The component has Storybook stories
4. The component passes all tests

### Behavior Checklist

Each component has a behavior checklist that details specific features:

```markdown
- **Behavior**:
  - [x] Supports multiple variants: primary, secondary, outline, text
  - [ ] Can show loading state
```

Follow these rules when updating behavior checklists:
1. Verify each behavior in the actual code before marking it as implemented
2. If a behavior is partially implemented, leave it unchecked and add a comment about what's missing
3. If a behavior is intentionally not implemented (design change), remove it from the list or add a note

### Updating Component Counts

When updating the Table of Contents counters:
1. Count all components marked with "✅ Completed" in each section
2. Update the green number in the format: `<span style="color:green">X</span>/<span style="color:red">Y</span>`
3. Ensure the total (red number) reflects the total number of components planned in that section

Keeping these counters accurate helps track progress and prioritize development efforts.

## Component Documentation

Each component includes:

1. **Component JSX file**: The actual implementation
2. **Story file**: Examples and documentation for Storybook
3. **README.md** (optional): Additional documentation specific to the component

All components should follow the established patterns and design guidelines outlined in the CONTRIBUTING.md file.

## Accessibility

All components are designed with accessibility in mind and follow WCAG 2.1 guidelines. Each component should:

1. Have appropriate ARIA attributes
2. Support keyboard navigation
3. Maintain sufficient color contrast
4. Include proper focus management

## Testing

Components can be tested through:

1. **Storybook**: Interactive testing through the UI
2. **Unit Tests**: For logic and rendering
3. **Integration Tests**: For component interactions
