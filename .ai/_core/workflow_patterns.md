# AI Documentation Framework: Workflow Patterns

## Overview

This document defines the core workflow patterns used by the AI Documentation Framework. These patterns guide the conversation flow, documentation creation, and work tracking processes.

## Conversation-Based Workflow Checkpoints

The framework uses a conversation-based checkpoint system to ensure alignment at key points in the workflow. These checkpoints provide natural points for confirmation before proceeding to the next phase of work.

### Checkpoint 1: Requirements & Architecture Understanding

**Purpose**: Ensure shared understanding of requirements and architectural context before proceeding to design.

**Conversation Pattern**:
```
Based on our discussion, I understand that:
1. [Summarize key requirements]
2. [Note architectural considerations]
3. [Highlight constraints or assumptions]

Does this align with your expectations? Would you like me to proceed with designing an approach, or is there anything we should clarify first?
```

**Documentation Updates** (only if needed):
- Requirements documentation
- Initial architecture documentation
- Initial feature documentation
- Initial test specifications

**Work Unit Updates** (always required):
- Mark Checkpoint 1 as "Confirmed"
- Document key decisions and understanding

### Checkpoint 2: Design Approach

**Purpose**: Confirm the design approach before proceeding to implementation planning.

**Conversation Pattern**:
```
Here's my proposed approach for implementing this:
1. [Outline component design]
2. [Describe implementation patterns]
3. [Explain integration points]

Does this approach make sense to you? Should we adjust anything before I start planning the implementation details?
```

**Documentation Updates** (only if needed):
- Design documentation
- User flows (for UI changes)
- Refined architecture documentation
- Refined feature documentation

**Work Unit Updates** (always required):
- Mark Checkpoint 2 as "Confirmed"
- Document design decisions and rationale

### Checkpoint 3: Implementation Plan

**Purpose**: Confirm the implementation plan before starting implementation.

**Conversation Pattern**:
```
Here's my implementation plan:
1. [List implementation steps]
2. [Note integration points]
3. [Outline testing approach]

Are you comfortable with me proceeding with this implementation plan? Any adjustments you'd like to make?
```

**Documentation Updates** (only if needed):
- Implementation plan in work unit

**Work Unit Updates** (always required):
- Mark Checkpoint 3 as "Confirmed"
- Document implementation approach

### Checkpoint 4: Implementation Review

**Purpose**: Review the implementation and confirm it meets expectations.

**Conversation Pattern**:
```
I've completed the implementation according to our plan. Here's a summary:
1. [Summarize what was implemented]
2. [Note any deviations from the plan]
3. [Highlight test results]

Does this implementation meet your expectations? Any adjustments you'd like to make?
```

**Documentation Updates** (only if needed):
- How-to guides
- Test documentation
- API documentation

**Work Unit Updates** (always required):
- Mark Checkpoint 4 as "Confirmed"
- Update completion percentage
- Update work unit registry

## Determining Documentation Needs

Not every work unit requires all types of documentation. The decision about which documentation to create or update should be based on:

1. **Work Unit Scope**: 
   - Small bug fixes might only need work unit updates
   - Feature additions might need requirements, design, and user flow documentation
   - Architectural changes might need comprehensive documentation updates

2. **Impact Area**:
   - UI changes typically need design documentation and user flows
   - API changes typically need interface specifications and how-to guides
   - Internal refactoring might only need technical design documentation

3. **Complexity**:
   - Simple changes might only need work unit documentation
   - Complex changes might need more comprehensive documentation
   - Novel patterns might need how-to guides for future reference

4. **Audience**:
   - Developer-focused changes might need technical documentation
   - User-facing changes might need feature documentation and user flows
   - Cross-team changes might need more comprehensive documentation

During checkpoint conversations, explicitly discuss which documentation needs to be created or updated based on these factors, rather than assuming all documentation types are needed for every work unit.

## Work Unit Management

### Creating Work Units

Work units should be created at the beginning of a task to track progress and maintain context. Each work unit should:

1. Use the standard work unit template
2. Have a unique identifier (WU-XXX)
3. Include clear metadata (status, dependencies, etc.)
4. Define the scope and objectives
5. Include checkpoint status tracking

### Parent-Child Relationships

For complex tasks, use parent-child relationships between work units:

1. Parent work units define broader components or features
2. Child work units define specific implementations or sub-features
3. Relationships should be explicitly documented in the work unit registry
4. Child work units should reference their parent work unit

### Work Unit Registry

The work unit registry provides a central index of all work units and their relationships:

1. Update the registry when creating or updating work units
2. Include completion percentages and status
3. Document parent-child relationships
4. Track dependencies between work units

## Traceability

Maintain traceability between related artifacts to ensure consistency and completeness:

1. Link requirements to architectural components
2. Connect test cases to requirements
3. Map implementation files to requirements and test cases
4. Document design decisions and their rationale

Traceability notes should be included in work units and relevant documentation to maintain a clear chain of relationships.

## Continuous Improvement

The framework should continuously evolve based on feedback and experience:

1. Identify friction points in the workflow
2. Detect patterns that could be improved
3. Update framework documentation to reflect improvements
4. Share learnings across projects

## Conclusion

These workflow patterns provide a flexible but structured approach to documentation and work management. They ensure alignment through conversation-based checkpoints while maintaining appropriate documentation based on the specific needs of each work unit.
