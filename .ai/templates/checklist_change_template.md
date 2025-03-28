# Checklist Change Documentation

This template provides a standardized format for documenting changes to work unit checklists, ensuring proper tracking and status recalculation.

## Change Request Format

```markdown
## Checklist Change Request

- **Work Unit**: [WU-XXX: Title]
- **Component/Task**: [Component or task being modified]
- **Date**: [YYYY-MM-DD]
- **Requested By**: [Role/Person]

### Changes Requested
- [ ] Add new checklist item: [Description]
- [ ] Modify existing item: [Original] → [New]
- [ ] Remove item: [Description]

### Justification
[Explanation of why this change is necessary]

### Impact Assessment
- **Status Impact**: [Will this change affect completion status? Yes/No]
- **Completion Percentage Impact**: [Estimated change in completion percentage]
- **Timeline Impact**: [Estimated impact on completion timeline]
```

## Status Recalculation Process

When checklist items are added to a previously "completed" task:

1. Change the task status from "Completed" to "In Progress"
2. Update the checklist with the new items
3. Recalculate the overall work unit completion percentage
4. Update the work unit registry with the new status and percentage
5. Document the change in the Checklist History section

## Example Checklist History Entry

```markdown
| Date | Change | Reason | Requested By |
|------|--------|--------|--------------|
| 2025-03-27 | Added accessibility requirements to Component X | Compliance with WCAG standards | Accessibility Team |
```

## Notification Template

When significant checklist changes affect completion status:

```
Important Update: Work Unit [WU-XXX: Title] status has changed.

New checklist items have been added to [Component/Task], changing its status from "Completed" to "In Progress".

Updated completion percentage: [X]% (previously [Y]%)

These changes were requested by [Role/Person] due to [Reason].
```

## Best Practices

1. **Early Identification**: Try to identify all requirements during initial planning
2. **Clear Marking**: Clearly mark new items as additions to distinguish them from original requirements
3. **Transparent Communication**: Ensure all stakeholders are aware of status changes
4. **Documentation**: Always document the reason for adding new requirements
5. **Verification**: Review the entire checklist before marking as complete
