# Status Query Patterns

This document defines standardized query patterns for retrieving work unit status information and how the AI Documentation Framework should respond to each pattern.

## Active Work Units Query

### Query Patterns
- "What are we working on?"
- "What is the current work?"
- "Show active work units"
- "What work is in progress?"

### Response Format
```markdown
We are currently working on:

1. **[WU-XXX: Work Unit Title](./path/to/WU-XXX_work_unit_title.md)** (XX% complete, In Progress)
   - Brief description of the work unit
   - Parent/child relationship information if applicable

2. **[WU-YYY: Work Unit Title](./path/to/WU-YYY_work_unit_title.md)** (XX% complete, In Progress)
   - Brief description of the work unit
   - Parent/child relationship information if applicable
```

### Filtering Logic
Only include work units with status:
- `Not Started`
- `In Progress`
- `On Hold`

## Completed Work Units Query

### Query Patterns
- "What work have we completed?"
- "Show completed work units"
- "What has been finished?"

### Response Format
```markdown
We have completed the following work:

1. **[WU-XXX: Work Unit Title](./path/to/WU-XXX_work_unit_title.md)** (100% complete, Completed)
   - Brief description of the work unit
   - Completion date: YYYY-MM-DD

2. **[WU-YYY: Work Unit Title](./path/to/WU-YYY_work_unit_title.md)** (100% complete, Completed)
   - Brief description of the work unit
   - Completion date: YYYY-MM-DD
```

### Filtering Logic
Only include work units with status:
- `Completed`

## All Work Units Query

### Query Patterns
- "Show all work units"
- "List all work"
- "What is the status of all work units?"

### Response Format
```markdown
Here is the status of all work units:

### Active Work Units

1. **[WU-XXX: Work Unit Title](./path/to/WU-XXX_work_unit_title.md)** (XX% complete, In Progress)
   - Brief description of the work unit
   - Parent/child relationship information if applicable

### On Hold Work Units

1. **[WU-YYY: Work Unit Title](./path/to/WU-YYY_work_unit_title.md)** (XX% complete, On Hold)
   - Brief description of the work unit
   - Reason for hold: [reason]

### Completed Work Units

1. **[WU-ZZZ: Work Unit Title](./path/to/WU-ZZZ_work_unit_title.md)** (100% complete, Completed)
   - Brief description of the work unit
   - Completion date: YYYY-MM-DD
```

### Filtering Logic
Include all work units, grouped by status

## Specific Work Unit Query

### Query Patterns
- "What is the status of WU-XXX?"
- "Tell me about WU-XXX"
- "Show details for WU-XXX"

### Response Format
```markdown
**[WU-XXX: Work Unit Title](./path/to/WU-XXX_work_unit_title.md)** (XX% complete, Status)

- **Description**: [work unit description]
- **Status**: [status]
- **Completion**: XX% (X/Y tasks)
- **Created**: YYYY-MM-DD
- **Last Updated**: YYYY-MM-DD

### Related Work Units

#### Parent Work Unit
- **[WU-YYY: Parent Work Unit Title](./path/to/WU-YYY_parent_work_unit_title.md)** (XX% complete, Status)

#### Child Work Units
- **[WU-ZZZ: Child Work Unit Title](./path/to/WU-ZZZ_child_work_unit_title.md)** (XX% complete, Status)
```

### Filtering Logic
Show the specific work unit and its related work units (parent and children)

## Implementation Notes

1. Always use absolute paths for links to ensure they work correctly
2. Include status information for all work units
3. Provide brief context about each work unit
4. For hierarchical work units, always mention the relationships
5. Use consistent formatting across all response types
