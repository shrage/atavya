# Human-AI Communication Patterns

This document defines the communication patterns between the human project manager and the AI assistant within the AI Documentation Framework. Effective communication is essential for successful collaboration.

## Communication Principles

1. **Clarity**: All communication should be clear and unambiguous
2. **Efficiency**: Communication should be concise while providing necessary context
3. **Purpose**: Each communication should have a clear purpose
4. **Feedback Loop**: Communication should enable iterative improvement
5. **Appropriate Detail**: Level of detail should match the needs of the recipient
6. **Actionability**: Communication should lead to clear next steps

## AI-to-Human Communication Patterns

### Recommendation Pattern
Used when the AI is suggesting a course of action:

```
## Recommendation: [Brief Title]

### Context
[Concise explanation of the situation]

### Options
1. [Option 1]: [Brief description]
   - Pros: [List of advantages]
   - Cons: [List of disadvantages]

2. [Option 2]: [Brief description]
   - Pros: [List of advantages]
   - Cons: [List of disadvantages]

### Recommendation
[Specific recommendation with rationale]

### Next Steps
[Clear actions for human to take]
```

### Status Update Pattern
Used when the AI is reporting on progress:

```
## Status Update: [Work Unit/Task]

### Current Status
[Brief status summary]

### Progress
- [Completed item 1]
- [Completed item 2]
- [In-progress item 1]: [Percent complete]

### Blockers
[Any issues preventing progress]

### Next Steps
[Upcoming actions]

### Human Input Needed
[Specific decisions or information needed from human]
```

### Information Request Pattern
Used when the AI needs specific information:

```
## Information Request: [Topic]

### Context
[Why this information is needed]

### Specific Information Needed
1. [Information item 1]
2. [Information item 2]

### Impact
[How this information will be used]

### Timeline
[When the information is needed by]
```

### Verification Request Pattern
Used when the AI needs human verification:

```
## Verification Request: [Item to Verify]

### Item Details
[Description of what needs verification]

### Verification Criteria
- [Criterion 1]
- [Criterion 2]

### AI Assessment
[AI's initial assessment]

### Verification Options
- [x] Approve as is
- [ ] Approve with changes: [Specify changes]
- [ ] Reject: [Provide reason]
```

## Human-to-AI Communication Patterns

The human project manager is not expected to follow rigid patterns, but the AI should interpret human communication according to these patterns:

### Directive Pattern
When the human is giving a clear instruction:

```
[Action verb] [specific task] [optional: parameters, constraints, deadline]
```

Example interpretation:
- "Create a new work unit for the login feature" → Create a new work unit document with appropriate structure for the login feature

### Question Pattern
When the human is seeking information:

```
[Question word] [subject] [optional: context, constraints]
```

Example interpretation:
- "What's the status of EP-007?" → Provide a status update on EP-007 with current progress and next steps

### Feedback Pattern
When the human is providing feedback:

```
[Subject] [assessment] [optional: specific changes, rationale]
```

Example interpretation:
- "The documentation structure needs more detail in the API section" → Revise documentation to add more detail specifically in the API section

### Approval Pattern
When the human is approving something:

```
[Approval word] [subject] [optional: conditions, next steps]
```

Example interpretation:
- "Approved, please implement EP-010" → Begin implementation of EP-010 as proposed

## Communication Context

All communication should be interpreted within the context of:

1. **Current Work**: Active work units and enhancement proposals
2. **Project History**: Previous decisions and established patterns
3. **Domain Knowledge**: Specific knowledge about the project domain
4. **Human Preferences**: Known preferences of the human project manager
5. **Framework State**: Current state of the AI Documentation Framework

## Handling Communication Gaps

When communication is unclear:

1. **AI Response to Unclear Human Communication**:
   - Ask clarifying questions focused on the specific ambiguity
   - Provide options based on possible interpretations
   - Reference relevant context that might clarify the intent

2. **Human Response to Unclear AI Communication**:
   - Provide specific feedback on what was unclear
   - Clarify expectations for future communication
   - Reference examples of preferred communication style

## Communication Adaptation

The AI should adapt its communication based on:

1. **Human Feedback**: Explicit feedback on communication style
2. **Interaction History**: Patterns from previous interactions
3. **Task Complexity**: More detail for complex tasks, less for simple ones
4. **Urgency**: More concise for urgent matters
5. **Human Expertise**: Level of detail based on human's familiarity with topic

## Documentation of Communication Patterns

These communication patterns should be:

1. **Referenced**: In relevant framework documentation
2. **Applied**: In all human-AI interactions
3. **Refined**: Based on effectiveness and feedback
4. **Taught**: To new AI instances working with the framework
5. **Evolved**: As the collaboration model matures
