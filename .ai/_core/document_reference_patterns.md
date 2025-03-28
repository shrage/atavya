# Document Reference Patterns

This core file defines the patterns and implementation details for detecting and formatting document references in conversations.

## Document Type Patterns

The following regular expression patterns are used to detect different document types in conversation:

```javascript
const documentPatterns = {
  workUnit: /WU-\d+(-\d+)?/i,
  enhancementProposal: /EP-\d+/i,
  requirement: /REQ-\d+/i,
  design: /DES-\d+/i,
  template: /template:\s*([a-z0-9_\s]+)/i,
  coreFile: /core file:\s*([a-z0-9_\s]+)/i
};
```

## Document Reference Formatting

When a document reference is detected, it should be formatted according to these guidelines:

### Work Units

```markdown
**[WU-XXX: Work Unit Title](absolute/path/to/WU-XXX_work_unit_title.md)** (XX% complete, Status)
- Brief description of the work unit
- Parent/child relationship information if applicable
```

### Enhancement Proposals

```markdown
**[EP-XXX: Enhancement Title](absolute/path/to/EP-XXX_enhancement_title.md)** (Status)
- Brief description of the enhancement
```

### Requirements

```markdown
**[REQ-XXX: Requirement Title](absolute/path/to/REQ-XXX_requirement_title.md)** (Status)
- Brief description of the requirement
```

### Design Documents

```markdown
**[DES-XXX: Design Title](absolute/path/to/DES-XXX_design_title.md)** (Status)
- Brief description of the design document
```

### Templates

```markdown
**[Template: Template Name](absolute/path/to/template_name.md)**
- Brief description of the template
```

### Core Files

```markdown
**[Core File: File Name](absolute/path/to/file_name.md)**
- Brief description of the core file
```

## Document Reference Detection Algorithm

The following pseudocode describes how to detect and format document references:

```javascript
function processConversationText(text) {
  // For each document pattern
  for (const [type, pattern] of Object.entries(documentPatterns)) {
    // Find all matches in the text
    const matches = text.match(new RegExp(pattern, 'g'));
    
    if (matches) {
      // For each match
      for (const match of matches) {
        // Get document details
        const document = findDocumentByIdentifier(match, type);
        
        if (document) {
          // Format the reference based on document type
          const formattedReference = formatDocumentReference(document, type);
          
          // Replace the reference in the text
          text = text.replace(match, formattedReference);
        }
      }
    }
  }
  
  return text;
}

function findDocumentByIdentifier(identifier, type) {
  // Implementation depends on the document registry structure
  // This should search the appropriate registry file based on document type
  // and return the document details if found
}

function formatDocumentReference(document, type) {
  // Format based on document type
  switch (type) {
    case 'workUnit':
      return `**[${document.id}: ${document.title}](${document.path})** (${document.completion}% complete, ${document.status})`;
    case 'enhancementProposal':
      return `**[${document.id}: ${document.title}](${document.path})** (${document.status})`;
    case 'requirement':
      return `**[${document.id}: ${document.title}](${document.path})** (${document.status})`;
    case 'design':
      return `**[${document.id}: ${document.title}](${document.path})** (${document.status})`;
    case 'template':
      return `**[Template: ${document.title}](${document.path})**`;
    case 'coreFile':
      return `**[Core File: ${document.title}](${document.path})**`;
    default:
      return `**[${document.title}](${document.path})**`;
  }
}
```

## Document Registry Structure

For this system to work effectively, each document type should have a registry that can be queried to find document details. The registry should include:

1. Document identifier (e.g., WU-001, EP-002)
2. Document title
3. Document path (absolute path)
4. Document status (if applicable)
5. Completion percentage (if applicable)
6. Related documents (parent/child relationships)

## Implementation Notes

1. Always use absolute paths for links to ensure they work correctly
2. Include status information for any document type that has a status field
3. Provide brief context about the document when first referencing it
4. For hierarchical documents (like parent-child work units), always mention the relationship
5. Use consistent formatting across all document types
