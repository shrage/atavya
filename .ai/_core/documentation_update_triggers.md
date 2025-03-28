# Documentation Update Triggers

## Overview

This document defines the triggers that initiate documentation updates in the Centralized Knowledge Documentation System. These triggers ensure that documentation is updated at appropriate times during the development process.

## Trigger Types

### 1. Work Unit Completion

**Description**: When a work unit is marked as completed, its knowledge contributions should be integrated into the centralized documentation.

**Detection Pattern**:
- Work unit status changes to "Completed"
- Checkpoint 4 is marked as "Confirmed"
- Work unit completion percentage reaches 100%

**Actions**:
1. Extract knowledge contributions from the work unit
2. Identify target documentation files
3. Create documentation contributions
4. Update documentation files

**Example**:
```
Work Unit WU-008 (Custom Field Components) has been completed.
Knowledge contributions identified:
- Technical documentation for UI component library
- User documentation for form controls
- Feature documentation for custom fields
```

### 2. Significant Milestone Completion

**Description**: When a significant milestone or component is completed, even if the parent work unit is not fully complete, its knowledge should be documented.

**Detection Pattern**:
- Work unit checklist item marked as completed
- Work unit section marked as completed
- Explicit mention of milestone completion in conversation

**Actions**:
1. Extract knowledge contributions from the milestone
2. Identify target documentation files
3. Create documentation contributions
4. Update documentation files

**Example**:
```
Milestone "Rich Text Editor Component" in WU-008 has been completed.
Knowledge contributions identified:
- Technical documentation for rich text editing
- User documentation for text formatting
```

### 3. Checkpoint 4 Confirmation

**Description**: As part of the final implementation review checkpoint, all implementation details should be properly documented.

**Detection Pattern**:
- Checkpoint 4 is marked as "Confirmed"
- Implementation review is completed
- Final implementation details are discussed

**Actions**:
1. Review work unit for knowledge contributions
2. Identify target documentation files
3. Create documentation contributions
4. Update documentation files

**Example**:
```
Checkpoint 4 for WU-009 (Rich Text Standardization) has been confirmed.
Knowledge contributions identified:
- Technical documentation for rich text standardization
- Architecture documentation for component relationships
```

### 4. Explicit Documentation Enhancement Identification

**Description**: When a work unit explicitly identifies information that should enhance general documentation.

**Detection Pattern**:
- "Documentation Enhancements" section in work unit is populated
- Explicit mention of documentation needs in conversation
- Documentation contribution is created

**Actions**:
1. Extract identified documentation enhancements
2. Identify target documentation files
3. Create documentation contributions
4. Update documentation files

**Example**:
```
Documentation enhancement identified in WU-010:
- Update architecture documentation with new component registry pattern
- Add technical documentation for component resolution logic
```

## Conversation Monitoring Patterns

The following conversation patterns should trigger documentation update suggestions:

### Pattern 1: Knowledge Sharing

**Detection**: User shares important knowledge about a domain or component

**Example**:
```
User: "The component registry uses a priority-based resolution system where organization-specific components take precedence over industry-specific ones."
```

**Response**:
```
That's valuable information about the component registry architecture. I'll make sure this is documented in the architecture documentation for the UI Component Registry system.
```

### Pattern 2: Implementation Details

**Detection**: User explains implementation details that aren't documented

**Example**:
```
User: "We implemented the rich text editor using a custom wrapper around TinyMCE with specific plugins for our formatting needs."
```

**Response**:
```
I'll document these implementation details in the technical documentation for the Rich Text Editor component, including the TinyMCE integration and custom plugins.
```

### Pattern 3: Design Decisions

**Detection**: User explains design decisions or rationale

**Example**:
```
User: "We decided to use a layered approach for the architecture to support industry customization while maintaining a consistent core platform."
```

**Response**:
```
I'll add this design decision and rationale to the architecture documentation to ensure the layered approach is properly documented.
```

## Integration with Workflow Patterns

Documentation update triggers are integrated with workflow patterns at each checkpoint:

### Checkpoint 1: Requirements & Architecture Understanding
- Identify domains that will be affected
- Plan potential documentation contributions

### Checkpoint 2: Design Approach
- Refine documentation contribution plans based on design decisions
- Document architectural decisions

### Checkpoint 3: Implementation Plan
- Finalize documentation contribution plans
- Document implementation approach

### Checkpoint 4: Implementation Review
- Execute documentation updates
- Verify documentation accuracy and completeness
