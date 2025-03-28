# Work Unit Loading Protocol

## Overview

This protocol defines the standard process for loading and analyzing work units within the AI Documentation Framework, with special emphasis on properly identifying and handling hierarchical relationships between work units.

## Purpose

To ensure that all conversations properly recognize and account for the full context of work units, including:
- Parent-child relationships between work units
- Dependencies between work units
- Current status of all related work units
- The complete picture of what is being worked on

## Protocol Steps

### 1. Check the Work Unit Registry

When starting a new conversation or when asked about current work:

1. **Always check the work unit registry first**:
   ```
   .ai/work_units/registry.md
   ```

2. **Identify all active work units** and their hierarchical relationships
   
3. **Note parent-child relationships** to understand the full context of work

### 2. Load All Relevant Work Units

When a work unit is mentioned or loaded:

1. **Load the specified work unit** to understand its current status and details

2. **Check for parent or child relationships** in:
   - The work unit's "Parent Work Unit" section
   - The work unit's "Related Work Units" section
   - The work unit registry

3. **Load all directly related work units** (parents and children) to ensure complete context

### 3. Report Hierarchical Relationships

When reporting on current work:

1. **Always include both parent and child work units** in the response
   
2. **Clearly indicate the hierarchical relationship** between work units
   
3. **Provide status information for all related work units**

4. **Use a consistent format** for presenting hierarchical relationships:
   ```
   Currently working on:
   - WU-008: Custom Field Components (Parent, 78% complete)
     └── WU-009: Rich Text Standardization (Child, 0% complete)
   ```

### 4. Update Work Unit Status

When updating work unit status:

1. **Update the specific work unit file** with new progress information
   
2. **Update the work unit registry** to reflect the new status
   
3. **Check if parent/child work units need updates** to maintain consistency

## Implementation Guidelines

### Registry Format

The work unit registry should follow this format:

```markdown
# Work Unit Registry

## Active Work Units

### WU-XXX: Work Unit Title
- **Status**: [Status]
- **Completion**: [Percentage]% ([Completed]/[Total] items)
- **Child Units**: 
  - [WU-YYY: Child Work Unit Title](#wu-yyy-child-work-unit-title)

### WU-YYY: Child Work Unit Title
- **Status**: [Status]
- **Completion**: [Percentage]% ([Completed]/[Total] items)
- **Parent Unit**: [WU-XXX: Work Unit Title](#wu-xxx-work-unit-title)
```

### Work Unit References

Each work unit should include appropriate references:

1. **Parent work units** should include a "Related Work Units" section:
   ```markdown
   ## Related Work Units
   - **[WU-YYY: Child Work Unit](./WU-YYY_child_work_unit.md)**: Description of relationship
   ```

2. **Child work units** should include a "Parent Work Unit" section:
   ```markdown
   ## Parent Work Unit
   - **[WU-XXX: Parent Work Unit](./WU-XXX_parent_work_unit.md)**: Description of relationship
   ```

## Compliance Requirements

All AI assistants working within the framework must:

1. **Check the registry** at the start of each conversation
   
2. **Load all related work units** when discussing a specific work unit
   
3. **Always include hierarchical relationships** when reporting on current work
   
4. **Update both individual work units and the registry** when progress is made

## Example Implementation

When asked "What are we currently working on?":

1. Check `.ai/work_units/registry.md`
   
2. Identify WU-008 and its child WU-009
   
3. Load both work unit files to get detailed status
   
4. Respond with:
   ```
   Currently working on:
   
   1. WU-008: Custom Field Components (Parent, 78% complete)
      - Implementing UI components for the Atavya platform
      - Recently completed: NumberField, EmailField, PhoneField
      - Next up: FormulaField
   
   2. WU-009: Rich Text Standardization (Child of WU-008, 0% complete)
      - Standardizing rich text editing across components
      - Not yet started
      - Will update 6 components to use the core RichTextEditor
   ```

This protocol ensures that no hierarchical work unit relationships are missed in any conversation.
