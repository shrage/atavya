# Atavya-Fresh Project Context

## Project Overview
Atavya-Fresh is a UI component library project focused on creating reusable React components with Storybook integration for the Atavya platform. The project aims to provide a comprehensive set of UI components following the Atavya design system, which emphasizes a Notion-style design approach: clean, minimal, block-based, and highly flexible.

## Project Purpose
The Atavya platform is a flexible, industry-adaptable automation and efficiency platform with customizable modules for various business sectors, built on a common entity framework with dashboard-first architecture. The UI component library serves as the foundation for building consistent user interfaces across all aspects of the platform.

## Project Type
- **Primary Type**: UI Component Library
- **Framework**: React
- **Documentation**: Storybook
- **Styling**: Tailwind CSS
- **Design Approach**: Notion-style (clean, minimal, block-based, flexible)

## Project Structure
- **ui-library/**: Main component library directory
  - **components/**: UI components organized by category
    - **common/**: Common utility components
    - **communication/**: Communication-related components
    - **core/**: Core UI elements and form controls
    - **data/**: Data visualization components
    - **feedback/**: User feedback components (Modal, Popover, ProgressIndicator)
    - **framework/**: Framework-specific components
    - **industries/**: Industry-specific components
    - **industry-specific/**: Alternative industry components
    - **layout/**: Layout components (Accordion)
    - **navigation/**: Navigation components
    - **view/**: View-related components and custom fields
  - **docs/**: Component documentation
  - **templates/**: Component templates
- **docs/**: Project documentation
  - **architecture/**: Architecture documentation
  - **data-models/**: Data model documentation
  - **images/**: Documentation images
- **ui-mockups/**: UI design mockups
- **.ai/**: AI Documentation Framework
  - **conversations/**: Conversation logs with timestamp format (yyyy-MM-dd_HHmmss)
  - **work_units/**: Work tracking and progress documentation
  - **insights/**: Project insights and analysis
  - **templates/**: Documentation templates

## Technology Stack
- React 18.2.0
- Storybook 7.6.20
- Tailwind CSS 3.4.1
- date-fns 4.1.0
- FullCalendar (core, interaction, react, timegrid)
- tailwind-merge for class composition

## Component Categories and Requirements

### Core Form Controls
Base components for user input that follow the Atavya design system:
- Button (variants: primary, secondary, tertiary, success, danger, warning, info)
- Input (text input with validation)
- Select (dropdown selection)
- Checkbox (toggle component)
- DatePicker (calendar-based date selection)
- RadioButton (exclusive selection)
- Toggle (on/off switch)
- Slider (range selection)
- ColorPicker (color selection)

### Custom Field Components
Field components that extend core controls with additional functionality:
- TextField (text input field)
- SelectField (dropdown selection field)
- MultiSelectField (multiple selection field)
- DateField (date selection field)
- CheckboxField (boolean field)
- NumberField (numeric input field)
- PhoneField (phone number field with formatting)
- EmailField (email address field with validation)
- ColorPickerField (color selection field)
- LookupField (entity relationship field)
- StatusPickerField (status selection field)
- FormulaField (calculated value field)
- RichTextField (formatted text field)
- FileAttachmentField (file upload field)

### Layout Components
Components for structuring page layouts:
- Accordion (collapsible content sections)
- Card (content container with options)
- Grid (layout grid system)
- Divider (visual separator)
- AppShell (application layout framework)

### Feedback Components
Components for providing feedback to users:
- Alert (status and notification messages)
- Modal (dialog overlay)
- Popover (contextual overlay)
- ProgressIndicator (progress visualization)
- Toast (temporary notifications)
- Tooltip (contextual help)
- SkeletonLoader (loading state placeholder)
- Spinner (loading indicator)

### Navigation Components
Components for user navigation:
- Menu (dropdown/context menu)
- Breadcrumbs (navigation path indicator)
- Tabs (content section navigation)
- Pagination (page navigation controls)
- Stepper (multi-step process indicator)

### Data Components
Components for displaying and managing data:
- Table (data grid component)
- List (vertical data list)
- Timeline (chronological data display)
- Calendar (date-based data visualization)
- FileUploader (file upload and management)

## Design System Guidelines
1. **Use Tailwind theme colors** instead of hardcoded values
   - Use `bg-primary` instead of `bg-[#7E57C2]`
   - Use `text-text-primary` instead of `text-[#2C2C2D]`

2. **Leverage existing building blocks** instead of creating custom implementations
   - Use Button component instead of creating custom buttons
   - Compose complex components from simpler ones

3. **Maintain consistent prop naming** across components
   - Use `variant` for style variations
   - Use `size` for size variations
   - Use `disabled` for disabled state

4. **Accessibility Requirements**
   - All components must meet WCAG 2.1 AA standards
   - Proper ARIA attributes must be implemented
   - Keyboard navigation must be supported
   - Color contrast must meet accessibility standards

## Current Status
The project is actively developing UI components with a focus on:
1. Form controls (Button, Input, Checkbox, DatePicker)
2. Layout components (Accordion)
3. Feedback components (Modal, Popover, ProgressIndicator)
4. Display components (Avatar)

Current progress:
- 66 of 85 planned components have been implemented (~78% complete)
- Work is organized in hierarchical work units:
  - WU-008: Custom Field Components (parent work unit) - 78% complete
  - WU-009: Rich Text Standardization (child work unit) - 0% complete
- A work unit registry is maintained at `.ai/work_units/registry.md` to track all work units and their relationships

## AI Assistance Focus
- Component implementation and refinement
- Documentation improvement
- Ensuring consistency across the component library
- Accessibility compliance
- Testing and quality assurance

## Framework Configuration
- Conversation tracking uses timestamp format (yyyy-MM-dd_HHmmss) to allow for multiple conversations per day
- Work units are tracked with unique IDs (WU-XXX) and status updates
- Component documentation follows standardized templates
- Project insights are continuously updated based on new discoveries
