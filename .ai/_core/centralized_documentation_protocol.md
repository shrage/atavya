# Centralized Knowledge Documentation Protocol

## Overview

This protocol defines how domain-specific knowledge is documented, updated, and maintained in a centralized system. It ensures that knowledge from individual work units is properly consolidated into comprehensive domain documentation.

## Directory Structure

```
.ai/
  documentation/
    technical/
      [domain]_technical.md
    user/
      [domain]_user.md
    feature/
      [domain]_feature.md
    architecture/
      [domain]_architecture.md
```

## Documentation Types

### Technical Documentation
- Implementation details
- Code patterns
- Technical decisions
- API specifications
- Data models

### User Documentation
- User interfaces
- User workflows
- Feature usage
- Configuration options
- Troubleshooting

### Feature Documentation
- Feature descriptions
- Feature capabilities
- Feature limitations
- Feature configuration
- Feature examples

### Architecture Documentation
- Component relationships
- System design
- Design patterns
- Architectural decisions
- System boundaries

## Documentation File Format

Each domain-specific documentation file follows the format defined in the `domain_documentation_template.md` template:

```markdown
# [Domain] Documentation

## Overview
[General description of the domain]

## Components
[List of components in this domain]

## Knowledge Sections
[Domain-specific sections]

### [Section 1]
[Content]

**Contributors**: [WU-XXX], [WU-YYY]
**Last Updated**: YYYY-MM-DD

### [Section 2]
[Content]

**Contributors**: [WU-ZZZ]
**Last Updated**: YYYY-MM-DD

## Related Domains
[Links to related domain documentation]

## Work Unit Contributions
- [WU-XXX]: [Brief description of contribution]
- [WU-YYY]: [Brief description of contribution]
- [WU-ZZZ]: [Brief description of contribution]
```

## Update Protocol

### Triggers for Documentation Updates

1. **Work Unit Completion**:
   - Primary trigger when a work unit is marked as completed
   - System identifies knowledge contributions from the completed work unit

2. **Significant Milestone Completion**:
   - When a major feature or component is completed (even if parent work unit is not)
   - Ensures documentation reflects major developments without waiting for all tasks

3. **Checkpoint 4 Confirmation**:
   - As part of the final implementation review checkpoint
   - Ensures all implementation details are properly documented

4. **Explicit Documentation Enhancement Identification**:
   - When a work unit explicitly identifies information for documentation
   - Noted in the "Documentation Enhancements" section of work units

### Update Process

1. **Knowledge Extraction**:
   - System analyzes the completed work unit to identify documentable knowledge
   - Extracts key information, code patterns, design decisions, etc.

2. **Domain Identification**:
   - Determines which domain-specific documentation files should be updated
   - Based on work unit metadata and content analysis

3. **Section Identification**:
   - Identifies specific sections within those files that need updates
   - Creates new sections if needed

4. **Content Merging**:
   - Integrates new knowledge with existing documentation
   - Resolves conflicts and ensures consistency

5. **Attribution Addition**:
   - Adds references to the source work unit
   - Updates the contributors list and last updated date

6. **Consistency Verification**:
   - Ensures the updated documentation maintains internal consistency
   - Checks for contradictions or redundancies

7. **Update Notification**:
   - Records the update in the work unit's completion notes
   - Updates the work unit registry to reflect documentation contributions

## Documentation Contribution Process

1. **Identify Contribution**:
   - During work unit completion or checkpoint review
   - Identify knowledge that should be added to centralized documentation

2. **Create Contribution**:
   - Use the `documentation_contribution_template.md` template
   - Specify the domain, category, and section to update
   - Provide the content to be added or updated

3. **Submit Contribution**:
   - Submit the contribution for review
   - Link the contribution to the work unit

4. **Review Contribution**:
   - Review the contribution for accuracy and completeness
   - Ensure it follows documentation standards

5. **Integrate Contribution**:
   - Update the appropriate documentation file
   - Add attribution to the contributing work unit
   - Update the last updated date

## Integration with Work Units

### Work Unit Template Updates

The work unit template includes a "Documentation Contributions" section:

```markdown
## Documentation Contributions

### Technical Documentation
- [Domain]: [Brief description of contribution]
  - [Specific knowledge or insights to be added to documentation]

### User Documentation
- [Domain]: [Brief description of contribution]
  - [Specific knowledge or insights to be added to documentation]

### Feature Documentation
- [Domain]: [Brief description of contribution]
  - [Specific knowledge or insights to be added to documentation]

### Architecture Documentation
- [Domain]: [Brief description of contribution]
  - [Specific knowledge or insights to be added to documentation]
```

### Work Unit Completion Checklist

The work unit completion checklist includes documentation contribution steps:

1. Identify knowledge contributions
2. Create documentation contributions
3. Submit contributions for review
4. Ensure contributions are integrated

## Implementation Notes

- Documentation files should be created for each domain when it is first identified
- Documentation should be updated as soon as possible after a work unit is completed
- Documentation should be reviewed regularly for accuracy and completeness
- Documentation should be linked to from work units and other documentation
