# Work Unit Loading Protocol

## Overview

This protocol defines the standard process for loading, analyzing, and updating work units within the AI Documentation Framework, with special emphasis on properly identifying and handling hierarchical relationships between work units and maintaining accurate status information.

## Purpose

To ensure that all conversations properly recognize and account for the full context of work units, including:
- Parent-child relationships between work units
- Dependencies between work units
- Current status of all related work units
- The complete picture of what is being worked on
- Accurate and up-to-date progress tracking

## Protocol Steps

### 1. Check the Work Unit Registry

When starting a new conversation or when asked about current work:

1. **Always check the work unit registry first**:
   ```
   .ai/work_units/registry.md
   ```

2. **Identify all active work units** and their hierarchical relationships
   
3. **Note parent-child relationships** to understand the full context of work

### 2. Load All Relevant Work Units

When a work unit is mentioned or loaded:

1. **Load the specified work unit** to understand its current status and details

2. **Check for parent or child relationships** in:
   - The work unit's "Parent Work Unit" section
   - The work unit's "Related Work Units" section
   - The work unit registry

3. **Load all directly related work units** (parents and children) to ensure complete context

### 3. Report Hierarchical Relationships

When reporting on current work:

1. **Always include both parent and child work units** in the response
   
2. **Clearly indicate the hierarchical relationship** between work units
   
3. **Provide status information for all related work units**

### 4. Status Update Requirements

When working on tasks within a work unit, maintain accurate status information:

1. **Status Update Triggers**:
   - **Task Initiation**: When work begins on a task or subtask
     - Update status from "Not Started" to "In Progress"
     - Update completion percentage (typically to 10-20%)
     - Add timestamp with initiation note
     - **TRIGGER POINT**: Execute `work_unit_status_update` trigger
   - **Task Milestone**: When a significant milestone is reached
     - Update completion percentage to reflect progress
     - Add timestamp with milestone description
     - **TRIGGER POINT**: Execute `work_unit_status_update` trigger
   - **Task Completion**: When a task or subtask is completed
     - Update status from "In Progress" to "Completed"
     - Update completion percentage to 100%
     - Add timestamp with completion note
     - **TRIGGER POINT**: Execute `work_unit_status_update` trigger
   - **Blockers Encountered**: When progress is blocked
     - Add blocker note with timestamp
     - Update status to reflect blocked state
     - **TRIGGER POINT**: Execute `work_unit_status_update` trigger
   - **Regular Intervals**: At minimum, daily updates when work is active
     - **TRIGGER POINT**: Execute `work_unit_status_update` trigger daily

2. **Status Update Format**:
   ```markdown
   - **Status Update (YYYY-MM-DD HH:MM)**: Concise description of what was accomplished or changed
   ```

3. **Implementation Detail Updates**:
   - Checkbox Status:
     - `[ ]` for not started tasks
     - `[~]` for in-progress tasks
     - `[✓]` for completed tasks
   - Implementation Verb:
     - "Will implement" for future tasks
     - "Implementing" for in-progress tasks
     - "Implements" for completed tasks

4. **Completion Percentage Calculation**:
   - Parent task percentage = average of subtask percentages
   - Overall work unit percentage = average of main task percentages

5. **Changelog Updates**:
   - Entry Format: `- **YYYY-MM-DD HH:MM**: Description of significant changes`
   - Required for all significant status changes

### 5. Executing Status Update Trigger

To maintain consistent status updates, execute the status update trigger at each trigger point identified above:

```bash
python .ai/scripts/trigger_manager.py --trigger work_unit_status_update --args "--work-unit WU-XXX --task 'X.X' --status 'STATUS' --completion PERCENTAGE --message 'MESSAGE'"
```

Where:
- `WU-XXX`: The work unit ID (e.g., WU-014)
- `X.X`: The task ID (e.g., 1.2 or 2.1.3)
- `STATUS`: The new status (Not Started, In Progress, Completed, Blocked)
- `PERCENTAGE`: The completion percentage (0-100)
- `MESSAGE`: The status update message

**Examples:**

1. **Task Initiation**:
```bash
python .ai/scripts/trigger_manager.py --trigger work_unit_status_update --args "--work-unit WU-014 --task '1.2' --status 'In Progress' --completion 10 --message 'Started analyzing user story coverage'"
```

2. **Task Milestone**:
```bash
python .ai/scripts/trigger_manager.py --trigger work_unit_status_update --args "--work-unit WU-014 --task '1.2' --status 'In Progress' --completion 50 --message 'Identified 90 components without user stories'"
```

3. **Task Completion**:
```bash
python .ai/scripts/trigger_manager.py --trigger work_unit_status_update --args "--work-unit WU-014 --task '1.2' --status 'Completed' --completion 100 --message 'Completed user story gap analysis'"
```

4. **Blocker Encountered**:
```bash
python .ai/scripts/trigger_manager.py --trigger work_unit_status_update --args "--work-unit WU-014 --task '1.2' --status 'Blocked' --completion 75 --message 'Blocked by missing component metadata'"
```

**Note**: The AI Assistant should execute this trigger automatically at each trigger point, without requiring explicit user instruction. This ensures consistent status tracking across all work units.

### 6. Work Unit Metadata Updates

The work unit metadata section must be updated with each status change:

1. **Completion Percentage**: Calculate based on completed subtasks
   
2. **Last Updated**: Update timestamp with each change (Format: YYYY-MM-DD HH:MM)

3. **Status**: Update overall status based on progress
   - "Not Started": No tasks initiated
   - "In Progress": Some tasks in progress, none completed
   - "Mostly Complete": Most tasks completed, some in progress
   - "Completed": All tasks completed
   - "Blocked": Progress halted due to blocker

## Implementation Examples

### Example: Task Initiation Update

```markdown
#### 1.2 User Story Coverage Audit
- **Priority**: High
- **Status**: In Progress
- **Completion**: 10%
- **Description**: Audit user stories to ensure all components have associated stories
- **Responsibility Assignment**:
  - **AI Assistant**: Perform audit of user story coverage
- **Implementation Details**:
  - [~] Identify components without user stories
    - Implementing [US-DOC-AUD-006: User Story Gap Analysis](../requirements/user-stories/documentation_user_stories.md#us-doc-aud-006-user-story-gap-analysis)
    - **Status Update (2025-03-28 16:35)**: Started analyzing component user stories against registry entries
```

### Example: Task Completion Update

```markdown
#### 1.1 Source Code Component Audit
- **Priority**: Critical
- **Status**: Completed
- **Completion**: 100%
- **Description**: Audit all components in the source code to identify those missing from documentation
- **Responsibility Assignment**:
  - **AI Assistant**: Perform audit of source code components
- **Implementation Details**:
  - [✓] Scan all component directories in source code
    - Implements [US-DOC-AUD-001: Source Code Scanning](../requirements/user-stories/documentation_user_stories.md#us-doc-aud-001-source-code-scanning)
    - **Status Update (2025-03-28 16:00)**: Created component_audit.js script to scan all component directories
    - **Status Update (2025-03-28 16:10)**: Completed scanning of all component directories
```

## Compliance Verification

To verify compliance with this protocol:

1. Check that all active work units have been updated within the last 24 hours
2. Verify that completion percentages accurately reflect actual progress
3. Ensure all completed tasks have proper timestamps and implementation details
4. Confirm that changelog entries exist for all significant status changes

## Related Documents

- Work Unit Structure
- Documentation Maintenance Process
- Traceability Protocol

## Last Updated

- **2025-03-28 16:58**: Updated protocol with detailed status update requirements and trigger points
- **2025-03-28 10:00**: Initial creation of Work Unit Loading Protocol
