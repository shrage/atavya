# AI Documentation Framework: Human-AI Workflow Patterns

## Overview

This document defines the core workflow patterns used by the AI Documentation Framework. These patterns guide the conversation flow, documentation creation, and work tracking processes between the human project manager and the AI assistant.

## Human-AI Collaboration in Workflow

The AI Documentation Framework is built on a collaboration model between a human project manager and an AI assistant. All workflow patterns reflect this collaboration model:

1. **Human Decision Authority**: The human project manager has final decision-making authority at all checkpoints
2. **AI Recommendation Role**: The AI assistant provides recommendations and implements approved decisions
3. **Clear Responsibility Delineation**: Each workflow step has clear human and AI responsibilities
4. **Iterative Refinement**: Workflows incorporate feedback loops between human and AI
5. **Documentation Responsibility**: The AI maintains documentation with human approval

## Checkpoint Completion Criteria and Documentation Practices

Each checkpoint in the workflow has specific completion criteria and associated documentation practices:

### Checkpoint 1: Requirements & Architecture Understanding
**Completion Criteria**:
- All requirements are documented in a dedicated requirements file
- User stories are created for each requirement
- Requirements are linked to architectural components
- Requirements document has been reviewed and approved by the human project manager
- Work unit has been updated with a reference to the requirements document

**Documentation Practices**:
- AI creates a dedicated file in `.ai/requirements/[domain]/[component]_requirements.md`
- AI includes functional and non-functional requirements based on human input
- AI adds user stories for each requirement
- AI links to architectural components
- AI references in the work unit
- Human reviews and approves the documentation

### Checkpoint 2: Design Approach
**Completion Criteria**:
- Design approach is documented in a dedicated design file
- Component structure is defined
- Technical decisions are documented with rationale
- Design is aligned with architectural principles
- Design document has been reviewed and approved by the human project manager
- Work unit has been updated with a reference to the design document

**Documentation Practices**:
- AI creates a dedicated file in `.ai/design/[component]_design.md`
- AI includes component structure based on human input and project requirements
- AI documents technical decisions and rationale
- AI includes diagrams where appropriate
- AI references in the work unit
- Human reviews and approves the design

### Checkpoint 3: Implementation Plan
**Completion Criteria**:
- Implementation tasks are broken down in detail
- Dependencies between tasks are identified
- Testing approach is defined
- Implementation plan has been reviewed and approved by the human project manager
- Work unit has been updated with the implementation plan

**Documentation Practices**:
- AI documents directly in the work unit
- AI breaks down into phases with specific tasks
- AI includes testing approach
- AI documents dependencies
- Human reviews and approves the implementation plan

### Checkpoint 4: Implementation Review
**Completion Criteria**:
- All implementation tasks are complete
- Tests are passing
- Documentation is updated
- Implementation has been reviewed by the human project manager
- Implementation has been approved by the human project manager
- Work unit has been updated with implementation details

**Documentation Practices**:
- AI updates the work unit with implementation summary
- AI creates how-to guides if needed in `.ai/guides/`
- AI updates API documentation if applicable
- Human reviews and approves the implementation and documentation

## Human-AI Conversation-Based Workflow Checkpoints

The framework uses a human-AI conversation-based checkpoint system to ensure alignment at key points in the workflow. These checkpoints provide natural points for human confirmation before proceeding to the next phase of work.

### Checkpoint 1: Requirements & Architecture Understanding

**Purpose**: Ensure shared understanding of requirements and architectural context before proceeding to design.

**AI Conversation Pattern**:
```
Based on our discussion, I understand that:
1. [Summarize key requirements]
2. [Note architectural considerations]
3. [Highlight constraints or assumptions]

Does this align with your expectations? Would you like me to proceed with designing an approach, or is there anything we should clarify first?
```

**Human Response Options**:
- Confirm understanding and authorize proceeding to design
- Provide clarifications or corrections
- Request additional information or analysis

**Documentation Updates** (AI responsibility):
- Requirements documentation
- Initial architecture documentation
- Initial feature documentation
- Initial test specifications

**Work Unit Updates** (AI responsibility):
- Mark Checkpoint 1 as "Confirmed" after human approval
- Document key decisions and understanding

### Checkpoint 2: Design Approach

**Purpose**: Confirm the design approach before proceeding to implementation planning.

**AI Conversation Pattern**:
```
Here's my proposed approach for implementing this:
1. [Outline component design]
2. [Describe implementation patterns]
3. [Explain integration points]

Does this approach make sense to you? Should we adjust anything before I start planning the implementation details?
```

**Human Response Options**:
- Approve design approach and authorize proceeding to implementation planning
- Request modifications to the design
- Ask for clarification or additional details

**Documentation Updates** (AI responsibility):
- Design documentation
- User flows (for UI changes)
- Refined architecture documentation
- Refined feature documentation

**Work Unit Updates** (AI responsibility):
- Mark Checkpoint 2 as "Confirmed" after human approval
- Document design decisions and rationale

### Checkpoint 3: Implementation Plan

**Purpose**: Confirm the implementation plan before starting implementation.

**AI Conversation Pattern**:
```
Here's my implementation plan:
1. [List implementation steps]
2. [Note integration points]
3. [Outline testing approach]

Are you comfortable with me proceeding with this implementation plan? Any adjustments you'd like to make?
```

**Human Response Options**:
- Approve implementation plan and authorize proceeding to implementation
- Request modifications to the plan
- Ask for clarification on specific implementation details

**Documentation Updates** (AI responsibility):
- Implementation plan in work unit

**Work Unit Updates** (AI responsibility):
- Mark Checkpoint 3 as "Confirmed" after human approval
- Document implementation approach

### Checkpoint 4: Implementation Review

**Purpose**: Review the implementation and confirm it meets expectations.

**AI Conversation Pattern**:
```
I've completed the implementation according to our plan. Here's a summary:
1. [Summarize what was implemented]
2. [Note any deviations from the plan]
3. [Highlight test results]

Does this implementation meet your expectations? Any adjustments you'd like to make?
```

**Human Response Options**:
- Approve implementation and mark work unit as complete
- Request modifications or improvements
- Ask for clarification on specific implementation details

**Documentation Updates** (AI responsibility):
- How-to guides
- Test documentation
- API documentation

**Work Unit Updates** (AI responsibility):
- Mark Checkpoint 4 as "Confirmed" after human approval
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

During checkpoint conversations, the AI should explicitly propose which documentation needs to be created or updated based on these factors, and the human project manager should approve or modify these recommendations.

## Work Unit Management

### Creating Work Units

Work units should be created at the beginning of a task to track progress and maintain context. Each work unit should:

1. Use the standard work unit template
2. Have a unique identifier (WU-XXX)
3. Include clear metadata (status, dependencies, etc.)

**Human Responsibility**:
- Approve work unit creation
- Define high-level scope and objectives
- Approve or modify work unit structure

**AI Responsibility**:
- Propose work unit creation when appropriate
- Create work unit documentation
- Maintain work unit status
- Link work unit to related documentation

### Updating Work Units

Work units should be updated at each checkpoint and whenever significant progress is made:

**Human Responsibility**:
- Review and approve work unit updates
- Provide feedback on progress
- Make key decisions on direction changes

**AI Responsibility**:
- Update work unit status and completion percentage
- Document progress and decisions
- Highlight blockers or issues requiring human input
- Maintain links to related documentation

### Completing Work Units

When a work unit is complete:

**Human Responsibility**:
- Verify work unit completion
- Approve final documentation
- Make final acceptance decision

**AI Responsibility**:
- Update work unit status to "Completed"
- Ensure all documentation is complete and linked
- Update work unit registry
- Propose follow-up work if appropriate
