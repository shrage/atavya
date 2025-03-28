# Atavya-Fresh AI Documentation

This directory contains AI-assisted documentation and work tracking for the Atavya-Fresh project, following the AI Documentation Framework.

## Framework Implementation

This project uses the AI Documentation Framework with the following adaptations:

1. **Hierarchical Work Units**: This project implements hierarchical work unit relationships, where parent work units can spawn child work units for more specialized tasks. See WU-008 and WU-009 for examples of this pattern.

2. **Component Registry**: The project uses a component registry system to track the implementation status of UI components across different categories.

## Directory Structure

- **work_units/**: Contains individual work unit tracking files
  - WU-008_custom_field_components.md: Implementation of UI component library
  - WU-009_rich_text_standardization.md: Standardization of rich text editing components

- **context/**: Project-specific context information
  - Contains information about the project structure, technologies, and domain

- **memory/**: AI memory storage for the project
  - Persistent knowledge about the project and work units

## Work Unit Hierarchy

Current work unit hierarchy in the project:

- WU-008: Custom Field Components
  - WU-009: Rich Text Standardization (Child unit focused on standardizing rich text editing)

## Usage Guidelines

1. When starting a new session, reference the appropriate work unit:
   ```
   "Let's continue working on Atavya-Fresh. Please review .ai/work_units/WU-008_custom_field_components.md"
   ```

2. For hierarchical work units, use the parent-child references to navigate between related units:
   ```
   "Let's work on the rich text standardization effort. Please review .ai/work_units/WU-009_rich_text_standardization.md"
   ```

3. Update work unit files at the end of each session to track progress.

## Framework Reference

This project follows the [AI Documentation Framework](https://github.com/example/ai-documentation-framework) for AI-assisted development. Refer to the framework documentation for detailed guidance on work unit management, memory protocols, and collaboration patterns.
