# Knowledge Extraction Patterns

## Overview

This document defines patterns for extracting documentable knowledge from work units, conversations, and other sources. These patterns ensure that valuable information is identified and properly documented in the Centralized Knowledge Documentation System.

## Knowledge Types

### Technical Knowledge

**Definition**: Information about implementation details, code patterns, technical decisions, and technical specifications.

**Extraction Patterns**:
- Code implementation details
- Technical design decisions
- API specifications
- Data models
- Performance considerations
- Technical limitations
- Technical dependencies

**Example**:
```
The RichTextEditor component uses a custom wrapper around TinyMCE with specific plugins for formatting needs. It implements a standardized interface that all text editing components must follow.
```

### User Knowledge

**Definition**: Information about user interfaces, user workflows, feature usage, and user-facing configuration.

**Extraction Patterns**:
- User interface descriptions
- User workflow steps
- Feature usage instructions
- Configuration options
- Troubleshooting steps
- User-facing error messages
- Accessibility considerations

**Example**:
```
The NumberField component supports mouse wheel interaction for incrementing/decrementing values, with configurable step sizes and min/max constraints. Users can also type directly into the field.
```

### Feature Knowledge

**Definition**: Information about feature capabilities, limitations, configuration, and examples.

**Extraction Patterns**:
- Feature descriptions
- Feature capabilities
- Feature limitations
- Feature configuration
- Feature examples
- Feature interactions
- Feature requirements

**Example**:
```
The EmailField component supports validation of multiple email addresses when the 'multiple' prop is set to true. It provides visual feedback for validation state and can be configured to validate on blur or on change.
```

### Architecture Knowledge

**Definition**: Information about component relationships, system design, design patterns, and architectural decisions.

**Extraction Patterns**:
- Component relationships
- System design
- Design patterns
- Architectural decisions
- System boundaries
- Integration points
- Extension mechanisms

**Example**:
```
The UI Component Registry uses a layered resolution approach where components are resolved in this order: Organization-specific → Industry-specific → Default → Base entity → System default.
```

## Extraction Sources

### Work Unit Content

**Source Areas**:
- Implementation details
- Design decisions
- Technical specifications
- Feature descriptions
- User interface descriptions
- Architecture descriptions

**Extraction Method**:
1. Analyze work unit content
2. Identify knowledge sections
3. Categorize knowledge by type
4. Extract knowledge into documentation contributions

### Conversation Content

**Source Areas**:
- User explanations
- Design discussions
- Implementation discussions
- Feature discussions
- Problem-solving discussions
- Decision-making discussions

**Extraction Method**:
1. Monitor conversations for knowledge sharing
2. Identify valuable information
3. Categorize knowledge by type
4. Extract knowledge into documentation contributions

### Code Analysis

**Source Areas**:
- Code comments
- Function signatures
- Data structures
- API definitions
- Implementation patterns
- Configuration options

**Extraction Method**:
1. Analyze code referenced in work units
2. Identify documentable patterns and decisions
3. Extract technical knowledge
4. Create documentation contributions

## Extraction Process

### 1. Knowledge Identification

Identify knowledge using these criteria:
- Relevance to a domain or component
- Usefulness for future reference
- Non-obvious information
- Important decisions or rationales
- Patterns or approaches
- Configuration or usage details

### 2. Knowledge Categorization

Categorize knowledge by:
- Knowledge type (Technical, User, Feature, Architecture)
- Domain
- Component
- Importance level

### 3. Knowledge Formatting

Format knowledge for documentation:
- Clear, concise language
- Structured format
- Code examples where appropriate
- Visual diagrams where helpful
- Links to related information

### 4. Knowledge Attribution

Attribute knowledge to its source:
- Work unit reference
- Contributor reference
- Date of extraction
- Context of extraction

## Integration with Documentation System

### Documentation Contribution Creation

Create documentation contributions using the `documentation_contribution_template.md`:

```markdown
# Documentation Contribution

## Work Unit Information
- **Work Unit**: [WU-XXX: Title]
- **Contributor**: [Name/Role]
- **Date**: YYYY-MM-DD

## Contribution Type
- [ ] New Knowledge
- [ ] Update to Existing Knowledge
- [ ] Correction
- [ ] Clarification
- [ ] Example/Use Case

## Target Documentation
- **Domain**: [Domain Name]
- **Category**: [Technical/User/Feature/Architecture]
- **Section**: [Specific section to update]
- **File Path**: [Path to documentation file]

## Contribution Content

### Summary
[Brief summary of the contribution]

### Detailed Content
[Full content to be added or updated in the documentation]

```
[Code examples if applicable]
```

### Rationale
[Why this information should be added to the documentation]

### Related Work Units
- [WU-YYY: Title] - [Relationship]
- [WU-ZZZ: Title] - [Relationship]

## Review Status
- [ ] Submitted
- [ ] Reviewed
- [ ] Approved
- [ ] Integrated

## Integration Notes
[Notes about how the contribution was integrated into the documentation]
```

### Documentation Update Process

1. Extract knowledge using the patterns defined in this document
2. Create documentation contributions
3. Review contributions for accuracy and completeness
4. Integrate contributions into documentation
5. Update attribution and last updated date

## Implementation Notes

- Knowledge extraction should be an ongoing process throughout the work unit lifecycle
- Knowledge should be extracted as soon as it is identified
- Knowledge extraction should be proactive, not reactive
- Knowledge extraction should focus on valuable, non-obvious information
- Knowledge extraction should prioritize information that will be useful for future reference
