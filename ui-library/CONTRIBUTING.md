# Contributing to the Atavya UI Component Library

This guide outlines the process for contributing new components or improving existing ones in the Atavya UI Component Library.

## Component Development Workflow

### 1. Plan Your Component

Before writing any code:
- Check the [library document](./library.md) to see if the component is already defined
- If not, discuss with the team to determine requirements and specifications
- Add the component definition to the library document following the established format

### 2. Set Up Component Files

Create a new component using the provided templates:
- Create a directory in the appropriate category: `src/components/[category]/[ComponentName]/`
- Copy the templates from `library/templates/` and rename them for your component
- Implement the component according to the specifications in the library document

### 3. Development Guidelines

#### Code Standards
- Use functional components with hooks
- Follow the project's naming conventions
- Implement proper PropTypes for all props
- Use Tailwind CSS for styling
- Ensure components are responsive
- Follow accessibility best practices (WCAG 2.1)

#### Component Structure
Each component should have:
- A clear, focused purpose
- Comprehensive PropTypes documentation
- Default props where appropriate
- Clean, readable code with comments
- Proper handling of edge cases

#### Styling
- Use Tailwind CSS utility classes
- Follow the Notion-inspired design system
- Use the `cn()` utility for conditional class names
- Ensure dark mode compatibility
- Maintain consistent spacing and sizing

### 4. Testing Your Component

- Create comprehensive Storybook stories
- Include stories for all variants and states
- Test for accessibility using Storybook's a11y addon
- Test responsiveness across different viewport sizes
- Ensure keyboard navigation works correctly

### 5. Documentation

- Update the component's status in the library document to "✅ Completed"
- Update the Table of Contents counts
- Ensure Storybook documentation is comprehensive
- Include usage examples and best practices

### 6. Code Review

- Submit your component for peer review
- Address any feedback or issues
- Ensure all tests pass
- Verify documentation is complete

## Component Templates

Use the templates in the `library/templates/` directory as a starting point:
- `component-template.jsx` - Base component template
- `component-template.stories.jsx` - Storybook stories template

## Adding to Existing Components

When enhancing existing components:
- Maintain backward compatibility
- Document new props or behaviors
- Update Storybook stories to showcase new features
- Update the component's behavior description in the library document if needed

## Component Checklist

Before submitting your component, ensure:
- [ ] Component is defined in the library document
- [ ] Component implementation matches the defined behavior
- [ ] PropTypes are defined for all props
- [ ] Default props are set where appropriate
- [ ] Component is responsive
- [ ] Component is accessible
- [ ] Storybook stories cover all variants and states
- [ ] Documentation is complete
- [ ] Library document is updated with completed status
- [ ] Code follows project standards and conventions

Thank you for contributing to the Atavya UI Component Library!
