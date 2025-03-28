# Enhancement Proposal: Universal Document Linking and Status Tracking

## Metadata
- **ID**: EP-005
- **Title**: Universal Document Linking and Status Tracking
- **Created**: 2025-03-28
- **Status**: Implemented
- **Author**: AI Assistant
- **Priority**: High

## Problem Statement

The AI Documentation Framework currently has significant limitations in how it presents document references during conversations:

1. **Document References Lack Direct Links**: When mentioning any document (work units, requirements, proposals, templates, etc.), they are presented as plain text without markdown links, requiring users to manually locate the files.

2. **Status Filtering Is Inadequate**: When asking "what are we working on?", the system may include completed work units alongside active ones, creating confusion about current priorities and active work.

3. **Inconsistent Reference Formatting**: Different document types are referenced inconsistently, making it difficult to navigate between related documents.

## Proposed Solution

Enhance the AI Documentation Framework to:

1. **Implement Universal Document Linking**:
   - Always present ANY document reference as a clickable markdown link
   - This includes work units, requirements, enhancement proposals, design documents, templates, etc.
   - Use consistent formatting for all document references

2. **Format Work Unit References with Status Information**:
   - Include status and completion percentage inline for work units
   - Use consistent formatting for all work unit references

3. **Implement Status-Based Filtering**:
   - Only show active (non-completed) work units when asked about current work
   - Provide clear status indicators for each work unit
   - Maintain a separate tracking system for completed work units
   - Allow explicit queries for completed work units

## Implementation Details

### 1. Universal Document Linking

Update the conversation_monitoring.md file to include a standardized approach for document references:

```markdown
# Document Reference Guidelines

## General Document References
When referencing any document in the framework, always use markdown links:

**[Document Title](./path/to/document.md)**

## Work Unit References
For work units, include status information:

**[WU-XXX: Work Unit Title](./path/to/WU-XXX_work_unit_title.md)** (XX% complete, Status)
- Brief description of the work unit
- Parent/child relationship information if applicable

## Enhancement Proposal References
For enhancement proposals, include status:

**[EP-XXX: Enhancement Title](./path/to/EP-XXX_enhancement_title.md)** (Status)
- Brief description of the enhancement

## Requirement Document References
For requirements, include status:

**[REQ-XXX: Requirement Title](./path/to/REQ-XXX_requirement_title.md)** (Status)
- Brief description of the requirement

## Design Document References
For design documents, include status:

**[DES-XXX: Design Title](./path/to/DES-XXX_design_title.md)** (Status)
- Brief description of the design document

## Template References
For templates:

**[Template: Template Name](./path/to/template_name.md)**
- Brief description of the template
```

### 2. Status Tracking and Filtering

1. Add a `status` field to the work unit registry with standardized values:
   - `Not Started`
   - `In Progress`
   - `On Hold`
   - `Completed`
   - `Cancelled`

2. Update the work unit registry to track completion status:
```markdown
### WU-013: Atavya Side Panel
- **Status**: In Progress
- **Completion**: 75% (15/20 tasks)
- **Child Units**: 
  - [WU-013-01: HVAC Field Management Side Panel](#wu-013-01-hvac-field-management-side-panel)

### WU-013-01: HVAC Field Management Side Panel
- **Status**: In Progress
- **Completion**: 45% (5/11 tasks)
- **Parent Unit**: [WU-013: Atavya Side Panel](#wu-013-atavya-side-panel)
```

3. Implement filtering logic in conversation_monitoring.md:
```javascript
// Pseudocode for work unit filtering
function getActiveWorkUnits() {
  return workUnits.filter(unit => unit.status !== 'Completed' && unit.status !== 'Cancelled');
}

function respondToWorkStatusQuery() {
  const activeUnits = getActiveWorkUnits();
  return formatWorkUnitList(activeUnits, "We are currently working on:");
}
```

4. Create separate query patterns for different status types:
   - "What are we working on?" → Shows only active work units
   - "What work have we completed?" → Shows only completed work units
   - "Show all work units" → Shows all work units regardless of status

### 3. Document Reference Detection

Implement a document reference detection system that:

1. Identifies when any document is mentioned in conversation
2. Automatically formats the reference as a markdown link
3. Includes appropriate status information based on document type
4. Uses consistent formatting for all document types

```javascript
// Pseudocode for document reference detection
function detectDocumentReference(text) {
  // Patterns for different document types
  const patterns = {
    workUnit: /WU-\d+/i,
    enhancementProposal: /EP-\d+/i,
    requirement: /REQ-\d+/i,
    design: /DES-\d+/i,
    template: /template:/i
  };
  
  // Check for matches and format appropriately
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(text)) {
      return formatDocumentReference(text, type);
    }
  }
  
  return text;
}

function formatDocumentReference(text, type) {
  // Look up document details
  const document = findDocument(text, type);
  
  // Format based on document type
  switch (type) {
    case 'workUnit':
      return `**[${document.id}: ${document.title}](${document.path})** (${document.completion}% complete, ${document.status})`;
    case 'enhancementProposal':
      return `**[${document.id}: ${document.title}](${document.path})** (${document.status})`;
    // Other document types...
    default:
      return `**[${document.title}](${document.path})**`;
  }
}
```

## Implementation Details
The Universal Document Linking and Status Tracking system has been fully implemented with the following components:

### Core Files
1. **Document Reference Patterns**: Defines patterns for detecting and formatting document references
   - File: document_reference_patterns.md

2. **Conversation Monitoring Updates**: Added document reference formatting and status query response sections
   - Updated: conversation_monitoring.md

### Templates
1. **Document Reference Template**: Defines standardized formatting for document references
   - File: document_reference_template.md

2. **Status Query Patterns**: Defines standardized query patterns for retrieving work unit status
   - File: status_query_patterns.md

### Work Unit Template Updates
Updated the work unit template to include standardized status fields:
- Added standardized status values: Not Started, In Progress, On Hold, Completed, Cancelled
- Added Last Updated field
- File: work_unit_template.md

### Registry Updates
Enhanced the work unit registry to include:
- Direct path links to each work unit
- Updated status tracking
- File: registry.md

## Verification
- [ ] Not Verified
- [x] Verified

## Outcome
The Universal Document Linking and Status Tracking system has been successfully implemented according to the proposal specifications. The system ensures that all document references in conversations are formatted as clickable markdown links with appropriate status information, and that status queries return properly filtered results based on work unit status. The implementation includes all required core files, templates, and updates to existing files.

Key benefits achieved:
1. Improved navigation between related documents
2. Clearer status understanding with visual indicators
3. Focused responses that show only relevant work units based on status
4. Consistent formatting across all document types

## Benefits

1. **Improved Navigation**: Users can quickly access any referenced document with a single click
2. **Clearer Status Understanding**: Users get an immediate visual indication of document status
3. **Focused Responses**: Conversations about current work stay focused on active items
4. **Comprehensive Tracking**: All documents are properly linked and accessible
5. **Consistent Experience**: All document references follow the same formatting patterns

## Required Changes

1. Update core framework files:
   - conversation_monitoring.md (add universal document linking and status filtering)
   - work_unit_template.md (add standardized status field)
   - registry.md (enhance status tracking)
   - document_reference_patterns.md (new file for reference detection patterns)

2. Create new template files:
   - document_reference_template.md (for consistent formatting)
   - status_query_patterns.md (to document different query patterns)

3. Update VERSION.md to increment the framework version

## Implementation Plan

1. Create document_reference_template.md
2. Create status_query_patterns.md
3. Update conversation_monitoring.md
4. Update work_unit_template.md
5. Update registry.md
6. Update VERSION.md

## Approval
- [x] Approved
- [ ] Rejected
- [ ] Needs Revision

## Implementation Status
- [ ] Not Started
- [ ] In Progress
- [x] Completed
