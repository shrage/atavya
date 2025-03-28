# Work Unit Completion Workflow

This template guides the completion process for work units in the Atavya-Fresh project, ensuring proper documentation, status propagation, and transition to related work.

## Completion Checklist

Before marking a work unit as complete, verify:

- [ ] All tasks and subtasks are marked as completed
- [ ] All implementation details are documented
- [ ] Documentation Enhancements section is populated
- [ ] Parent Unit Impact is documented (for child work units)
- [ ] Checklist History is up to date
- [ ] Registry has been updated with completion status

## Status Propagation

For child work units:

1. Identify impacts on parent work unit:
   - Components that should be marked as completed
   - Status changes in the parent unit
   - Completion percentage updates

2. Update the parent work unit:
   - Mark affected components as completed
   - Update completion percentage
   - Add reference to the completed child unit

3. Update the work unit registry:
   - Change status to "Completed"
   - Update completion percentage to 100%
   - Add completion date
   - Document impact on parent unit

## Completion Message Template

```
Work Unit [WU-XXX: Title] is now complete! (100%)

## Summary of Achievements
- [Key achievement 1]
- [Key achievement 2]
- [Key achievement 3]

## Documentation Enhancements Identified
- [Enhancement 1] → [Target documentation]
- [Enhancement 2] → [Target documentation]

## Related Work Units
You can continue with:

1. **[WU-XXX: Title](./WU-XXX_title.md)** ([X]% complete, [Status])
   - [Brief description]
   - [Key metrics]

2. **[WU-XXX: Title](./WU-XXX_title.md)** ([Y]% complete, [Status])
   - [Brief description]
   - [Key metrics]

To continue with option 1, start a new chat with:
"Let's continue implementing [Work Unit Title] for Atavya-Fresh. Please check
.ai/work_units/[work_unit_file].md to see where we left off."
```

## Final Verification

Before concluding:

1. Run any necessary tests to verify implementation
2. Check for any implicit requirements that might have been missed
3. Ensure all code is properly documented
4. Verify that the implementation meets all technical requirements
5. Check for any potential impacts on other components or systems
