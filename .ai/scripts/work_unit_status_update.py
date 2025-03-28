#!/usr/bin/env python3
"""
Work Unit Status Update Script

This script updates the status of a specific task within a work unit, following
the status update protocol defined in work_unit_loading_protocol.md.

Usage:
    python work_unit_status_update.py --work-unit WU-001 --task "1.2" --status "In Progress" --completion 25 --message "Completed initial analysis"

Options:
    --work-unit WORK_UNIT_ID    ID of the work unit to update (e.g., WU-001)
    --task TASK_ID              ID of the task to update (e.g., "1.2" or "2.1.3")
    --status STATUS             New status of the task (Not Started, In Progress, Completed, Blocked)
    --completion PERCENTAGE     Completion percentage (0-100), optional - will be calculated if not provided
    --message MESSAGE           Status update message (will be added to changelog, not inline)
    --subtask-caption CAPTION   Caption of the subtask to update (if updating a specific subtask)
"""

import os
import sys
import re
import argparse
import logging
from datetime import datetime

# Constants
WORK_UNITS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "work_units")
LOGS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logs")
os.makedirs(LOGS_DIR, exist_ok=True)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(LOGS_DIR, 'work_unit_status_update.log')),
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger('work_unit_status_update')

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Update work unit status')
    parser.add_argument('--work-unit', required=True, help='Work unit ID (e.g., WU-001)')
    parser.add_argument('--task', required=True, help='Task ID (e.g., 1.1) or full task path (e.g., 1.1.1)')
    parser.add_argument('--status', required=True, choices=['Not Started', 'In Progress', 'Completed', 'Blocked'], help='New status')
    parser.add_argument('--completion', type=int, help='Completion percentage (0-100)')
    parser.add_argument('--message', required=True, help='Message for the changelog')
    parser.add_argument('--subtask-caption', help='Caption of the subtask to update (if updating a specific subtask)')
    return parser.parse_args()

def find_work_unit_file(work_unit_id):
    """Find the work unit file based on its ID."""
    for filename in os.listdir(WORK_UNITS_DIR):
        if filename.startswith(work_unit_id) and filename.endswith('.md'):
            return os.path.join(WORK_UNITS_DIR, filename)
    
    logger.error(f"Work unit {work_unit_id} not found")
    return None

def update_task_status(work_unit_file, task_id, status, completion, message):
    """Update the status of a specific task in the work unit file."""
    if not os.path.exists(work_unit_file):
        logger.error(f"Work unit file {work_unit_file} not found")
        return False
    
    with open(work_unit_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the task section
    task_pattern = re.compile(r'(#+\s*' + re.escape(task_id) + r'\s+[^\n]+\n(?:.*?\n)*?)\s*-\s*\*\*Status\*\*:\s*([^\n]+)', re.DOTALL)
    task_match = task_pattern.search(content)
    
    if not task_match:
        logger.error(f"Task {task_id} not found in work unit file")
        return False
    
    task_section = task_match.group(1)
    current_status = task_match.group(2).strip()
    
    # Update status
    updated_content = content.replace(
        f"- **Status**: {current_status}",
        f"- **Status**: {status}"
    )
    
    # Find implementation details section
    impl_pattern = re.compile(r'(#+\s*' + re.escape(task_id) + r'.*?\n.*?- \*\*Implementation Details\*\*:\s*\n)(.*?)(?=\n\n|$)', re.DOTALL)
    impl_match = impl_pattern.search(updated_content)
    
    if not impl_match:
        logger.error(f"Implementation Details section not found for task {task_id}")
        return False
    
    impl_section = impl_match.group(1)
    impl_details_section = impl_match.group(2)
    
    # Check if this is a subtask update or a parent task update
    is_subtask = '.' in task_id
    logger.debug(f"Task {task_id} is_subtask: {is_subtask}")
    
    # Find all subtasks within the implementation details section
    # Look for lines with implementation verbs (Will implement, Implementing, Implements)
    subtask_lines = []
    for line in impl_details_section.split('\n'):
        if re.search(r'(Will implement|Implementing|Implements)', line):
            subtask_lines.append(line)
    
    logger.debug(f"Found {len(subtask_lines)} subtask lines")
    
    if subtask_lines:
        # If it's a subtask, only update that specific subtask
        if is_subtask:
            logger.info(f"Updating subtask {task_id}")
            updated_impl_details = update_subtask_status(work_unit_file, task_id, status, message)
            updated_content = updated_content.replace(impl_details_section, updated_impl_details)
        else:
            # Count completed and in-progress subtasks
            total_subtasks = len(subtask_lines)
            completed_subtasks = 0
            in_progress_subtasks = 0
            
            for line in subtask_lines:
                # Check for completed subtasks
                if "Implements" in line:
                    completed_subtasks += 1
                    logger.debug(f"Found completed subtask: {line[:50]}...")
                # Check for in-progress subtasks
                elif "Implementing" in line:
                    in_progress_subtasks += 1
                    logger.debug(f"Found in-progress subtask: {line[:50]}...")
                else:
                    logger.debug(f"Found not started subtask: {line[:50]}...")
            
            logger.info(f"Found {total_subtasks} subtasks: {completed_subtasks} completed, {in_progress_subtasks} in progress")
            
            # Calculate completion percentage based on subtask status
            # Completed subtasks count as 100%, in-progress as 50%
            if total_subtasks > 0:
                calculated_completion = int((completed_subtasks * 100 + in_progress_subtasks * 50) / total_subtasks)
                
                logger.info(f"Calculated completion for task {task_id}: {calculated_completion}% " +
                          f"({completed_subtasks} completed, {in_progress_subtasks} in progress, {total_subtasks} total)")
                
                # Always update the completion percentage based on calculation
                completion = calculated_completion
            else:
                logger.warning(f"No subtasks found to calculate completion percentage")
            
            # Update subtasks based on status and completion
            updated_lines = []
            subtask_index = 0
            
            for line in impl_details_section.split('\n'):
                if re.search(r'(Will implement|Implementing|Implements)', line):
                    # Determine verb replacement based on task status
                    if status == "Completed":
                        verb_replacement = "Implements"
                    elif status == "In Progress":
                        # If in progress, update verbs based on completion percentage
                        if completion is not None:
                            subtasks_to_update = int(round(total_subtasks * (completion / 100.0)))
                            if subtask_index < subtasks_to_update - 1:
                                verb_replacement = "Implements"
                            elif subtask_index == subtasks_to_update - 1:
                                verb_replacement = "Implementing"
                            else:
                                verb_replacement = "Will implement"
                        else:
                            # Default behavior if no completion percentage
                            verb_replacement = "Implementing"
                    else:
                        verb_replacement = "Will implement"
                    
                    # Update implementation verb
                    updated_line = re.sub(r'(Will implement|Implementing|Implements)\s+', f'{verb_replacement} ', line)
                    updated_lines.append(updated_line)
                    subtask_index += 1
                else:
                    updated_lines.append(line)
            
            # Replace the entire implementation details section in the updated content
            impl_details_start = impl_match.start(2)
            impl_details_end = impl_match.end(2)
            updated_content = updated_content[:impl_details_start] + '\n'.join(updated_lines) + updated_content[impl_details_end:]
    
    # Update completion percentage
    completion_pattern = re.compile(r'(#+\s*' + re.escape(task_id) + r'\s+[^\n]+\n(?:.*?\n)*?)\s*-\s*\*\*Completion\*\*:\s*(\d+)%', re.DOTALL)
    completion_match = completion_pattern.search(updated_content)
    
    if completion_match and completion is not None:
        current_completion = completion_match.group(2).strip()
        updated_content = updated_content.replace(
            f"- **Completion**: {current_completion}%",
            f"- **Completion**: {completion}%"
        )
    
    # Update work unit metadata
    # Update last updated timestamp
    metadata_pattern = re.compile(r'- \*\*Last Updated\*\*: (.*?)\n')
    metadata_match = metadata_pattern.search(updated_content)
    
    if metadata_match:
        updated_content = updated_content.replace(
            f"- **Last Updated**: {metadata_match.group(1)}",
            f"- **Last Updated**: {datetime.now().strftime('%Y-%m-%d %H:%M')}"
        )
    
    # Update changelog
    changelog_pattern = re.compile(r'## Changelog\s*\n')
    changelog_match = changelog_pattern.search(updated_content)
    
    if changelog_match:
        changelog_entry = f"- **{datetime.now().strftime('%Y-%m-%d %H:%M')}**: Updated task {task_id} to status '{status}'"
        if message:
            changelog_entry += f" - {message}"
        if completion is not None:
            changelog_entry += f" ({completion}% complete)"
        changelog_entry += "\n"
        
        updated_content = updated_content.replace(
            "## Changelog\n",
            f"## Changelog\n\n{changelog_entry}"
        )
    
    # Write updated content back to file
    with open(work_unit_file, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    logger.info(f"Updated task {task_id} in work unit {work_unit_file} to status '{status}'")
    if completion is not None:
        logger.info(f"Set completion percentage to {completion}%")
    return True

def update_subtask_status(work_unit_file, task_id, status, message=None):
    """Update the status of a specific subtask within a task."""
    if not os.path.exists(work_unit_file):
        logger.error(f"Work unit file {work_unit_file} not found")
        return False
    
    with open(work_unit_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the implementation details section for the task
    impl_pattern = re.compile(r'#{3,4}\s+' + re.escape(task_id) + r'.*?\n.*?- \*\*Implementation Details\*\*:\s*\n(.*?)(?=\n\n|$)', re.DOTALL)
    impl_match = impl_pattern.search(content)
    
    if not impl_match:
        logger.error(f"Implementation details section not found for task {task_id}")
        return False
    
    impl_details_section = impl_match.group(1)
    updated_impl_details = impl_details_section
    
    # Find the subtask line that matches the caption
    subtask_pattern = re.compile(r'^\s*-\s*(?:\[[ x✓~]\])?\s*' + re.escape(task_id.split('.')[1]) + r'.*?$', re.MULTILINE)
    subtask_match = subtask_pattern.search(impl_details_section)
    
    if not subtask_match:
        logger.error(f"Subtask with caption '{task_id.split('.')[1]}' not found in task {task_id}")
        return False
    
    subtask_line = subtask_match.group(0)
    
    # Extract the user story reference from the line
    user_story_ref_match = re.search(r'-\s+(\[.*?\](?:\(.*?\))?)', subtask_line)
    user_story_ref = user_story_ref_match.group(1) if user_story_ref_match else ""
    
    # Determine the new verb and symbol based on the status
    if status.lower() == "completed":
        new_verb = "Implements"
        new_symbol = "[✓]"
    elif status.lower() == "in progress":
        new_verb = "Implementing"
        new_symbol = "[~]"
    else:  # Not Started
        new_verb = "Will implement"
        new_symbol = "[ ]"
    
    # Create the updated line with the correct format
    # First, check if the line already has the new format (without implementation verb)
    if re.search(r'^\s*-\s*\[[ x✓~]\]\s*' + re.escape(task_id.split('.')[1]) + r'\s*-\s+\[.*?\]', subtask_line):
        # Line is already in the new format, just update the status symbol
        updated_line = re.sub(r'^\s*-\s*\[[ x✓~]\]', f'  - {new_symbol}', subtask_line)
    else:
        # Extract the caption and user story reference if possible
        caption_match = re.search(r'^\s*-\s*(?:\[[ x✓~]\])?\s*(.*?)(?:\s*-\s*|\s+)(Will implement|Implementing|Implements)\s+(\[.*?\](?:\(.*?\))?)', subtask_line)
        
        if caption_match:
            caption = caption_match.group(1).strip()
            user_story_ref = caption_match.group(3)
            
            # Create the new line with the correct format
            updated_line = f"  - {new_symbol} {caption} - {user_story_ref}"
            updated_impl_details = updated_impl_details.replace(subtask_line, updated_line)
        else:
            # If we can't extract the caption and user story reference, just update the verb and symbol
            updated_line = re.sub(r'(Will implement|Implementing|Implements)\s+', f'{new_verb} ', subtask_line)
            updated_line = re.sub(r'^\s*-\s*(?:\[[ x✓~]\])?', f'  - {new_symbol} ', updated_line)
            updated_impl_details = updated_impl_details.replace(subtask_line, updated_line)
    
    # Update the content with the updated implementation details
    updated_content = content.replace(impl_details_section, updated_impl_details)
    
    # Write the updated content back to the file
    with open(work_unit_file, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    logger.info(f"Updated subtask '{task_id.split('.')[1]}' in task {task_id} to {status}")
    
    # Update the changelog if a message is provided
    if message:
        update_changelog(work_unit_file, f"Updated subtask '{task_id.split('.')[1]}' in task {task_id} to {status}: {message}")
    
    # Update the task status and completion percentage
    update_task_status(work_unit_file, task_id, status, None, None)
    
    # Update the overall completion percentage of the work unit
    update_overall_completion(work_unit_file)
    
    return updated_impl_details

def update_overall_completion(work_unit_file):
    """Update the overall completion percentage of the work unit based on task completion."""
    if not os.path.exists(work_unit_file):
        logger.error(f"Work unit file {work_unit_file} not found")
        return False
    
    with open(work_unit_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all task sections and update their completion percentages
    task_sections = re.findall(r'(#{3,4}\s+\d+\.\d+\s+[^\n]+\n(?:.*?\n)*?)- \*\*Completion\*\*: (\d+)%', content)
    
    if not task_sections:
        logger.warning(f"No task sections found in work unit {work_unit_file}")
        return False
    
    updated_content = content
    total_completion = 0
    
    # Process each task section
    for task_section_match, current_completion in task_sections:
        # Extract task ID from the section heading
        task_id_match = re.search(r'#{3,4}\s+(\d+\.\d+)', task_section_match)
        if not task_id_match:
            continue
        
        task_id = task_id_match.group(1)
        
        # Check if the task status is "In Progress"
        status_match = re.search(r'- \*\*Status\*\*: ([^\n]+)', task_section_match)
        task_status = status_match.group(1) if status_match else "Not Started"
        
        # Find implementation details for this task
        impl_pattern = re.compile(r'#{3,4}\s+' + re.escape(task_id) + r'.*?\n.*?- \*\*Implementation Details\*\*:\s*\n(.*?)(?=\n\n|$)', re.DOTALL)
        impl_match = impl_pattern.search(updated_content)
        
        if not impl_match:
            continue
        
        impl_details_section = impl_match.group(1)
        
        # Find all subtasks by looking for caption lines followed by implementation verb lines
        caption_lines = []
        impl_verb_lines = []
        
        lines = impl_details_section.split('\n')
        i = 0
        while i < len(lines):
            line = lines[i].strip()
            # Check if this is a caption line (doesn't contain implementation verbs)
            if line.startswith('-') and not re.search(r'(Will implement|Implementing|Implements)', line):
                caption = line[1:].strip()
                # Check if the next line contains an implementation verb
                if i + 1 < len(lines) and re.search(r'(Will implement|Implementing|Implements)', lines[i+1]):
                    caption_lines.append(line)
                    impl_verb_lines.append(lines[i+1].strip())
                    i += 2  # Skip the next line since we've processed it
                    continue
            i += 1
        
        # If we found caption and implementation verb pairs, process them
        if caption_lines and impl_verb_lines and len(caption_lines) == len(impl_verb_lines):
            # Count completed and in-progress subtasks
            total_subtasks = len(caption_lines)
            completed_subtasks = sum(1 for line in impl_verb_lines if "Implements" in line)
            in_progress_subtasks = sum(1 for line in impl_verb_lines if "Implementing" in line)
            
            # Calculate completion percentage
            if total_subtasks > 0:
                calculated_completion = int((completed_subtasks * 100 + in_progress_subtasks * 50) / total_subtasks)
            else:
                calculated_completion = 0
            
            # If status is "In Progress" but calculated completion is 0, set a minimum value only if there are actual subtasks
            if task_status.strip() == "In Progress" and calculated_completion == 0 and total_subtasks > 0:
                calculated_completion = 10  # Minimum 10% for tasks marked as "In Progress"
                logger.info(f"Task {task_id} is marked as 'In Progress' but has no in-progress subtasks. Setting minimum completion to 10%.")
            elif task_status.strip() == "In Progress" and total_subtasks == 0:
                # If there are no subtasks but status is "In Progress", set to 0%
                calculated_completion = 0
                logger.info(f"Task {task_id} is marked as 'In Progress' but has no subtasks. Setting completion to 0%.")
            elif task_status.strip() == "Not Started":
                # If status is "Not Started", set to 0% regardless of subtasks
                calculated_completion = 0
                logger.info(f"Task {task_id} is marked as 'Not Started'. Setting completion to 0%.")
            
            logger.info(f"Calculated completion for task {task_id}: {calculated_completion}% " +
                      f"({completed_subtasks} completed, {in_progress_subtasks} in progress, {total_subtasks} total)")
            
            # Update the completion percentage in the content
            updated_content = re.sub(
                r'(#{3,4}\s+' + re.escape(task_id) + r'.*?\n(?:.*?\n)*?)- \*\*Completion\*\*: \d+%',
                r'\1- **Completion**: ' + str(calculated_completion) + '%',
                updated_content
            )
            
            # Create new implementation details with combined lines
            new_impl_details = "- **Implementation Details**:\n"
            for i in range(len(caption_lines)):
                caption = caption_lines[i][1:].strip()  # Remove the leading dash and whitespace
                impl_verb_line = impl_verb_lines[i]
                
                # Extract the implementation verb and user story reference with link
                # Look for Markdown links in the format [text](url)
                link_match = re.search(r'(Will implement|Implementing|Implements)\s+(\[.*?\]\(.*?\))', impl_verb_line)
                if link_match:
                    verb = link_match.group(1)
                    user_story_ref_with_link = link_match.group(2)
                    
                    # Determine the status symbol based on the verb
                    if verb == "Implements":
                        symbol = "[✓]"
                    elif verb == "Implementing":
                        symbol = "[~]"
                    else:  # Will implement
                        symbol = "[ ]"
                    
                    # Create the combined line with the correct format (without the verb text but preserving the link)
                    new_impl_details += f"  - {symbol} {caption} - {user_story_ref_with_link}\n"
                else:
                    # Try another pattern for references without links
                    impl_verb_match = re.search(r'(Will implement|Implementing|Implements)\s+(\[.*?\])', impl_verb_line)
                    if impl_verb_match:
                        verb = impl_verb_match.group(1)
                        user_story_ref = impl_verb_match.group(2)
                        
                        # Determine the status symbol based on the verb
                        if verb == "Implements":
                            symbol = "[✓]"
                        elif verb == "Implementing":
                            symbol = "[~]"
                        else:  # Will implement
                            symbol = "[ ]"
                        
                        # Create the combined line with the correct format (without the verb text)
                        new_impl_details += f"  - {symbol} {caption} - {user_story_ref}\n"
                    else:
                        # If we can't extract the verb and user story reference, just keep the original lines
                        new_impl_details += f"  {caption_lines[i]}\n  {impl_verb_lines[i]}\n"
            
            # Update the implementation details in the content
            impl_details_pattern = re.compile(r'- \*\*Implementation Details\*\*:\s*\n.*?(?=\n\n|$)', re.DOTALL)
            updated_content = re.sub(impl_details_pattern, new_impl_details.rstrip(), updated_content)
            
            total_completion += calculated_completion
        else:
            # If we couldn't find caption and implementation verb pairs, try the old approach
            # Find all subtasks with implementation verbs
            subtask_lines = []
            for line in impl_details_section.split('\n'):
                if re.search(r'(Will implement|Implementing|Implements)', line):
                    subtask_lines.append(line)
            
            if not subtask_lines:
                # If no subtasks found, set completion to 0%
                if task_status.strip() == "In Progress":
                    calculated_completion = 0
                    logger.info(f"Task {task_id} is marked as 'In Progress' but has no subtasks. Setting completion to 0%.")
                else:
                    calculated_completion = 0
                    logger.info(f"Task {task_id} has no subtasks. Setting completion to 0%.")
                
                # Update the completion percentage in the content
                updated_content = re.sub(
                    r'(#{3,4}\s+' + re.escape(task_id) + r'.*?\n(?:.*?\n)*?)- \*\*Completion\*\*: \d+%',
                    r'\1- **Completion**: ' + str(calculated_completion) + '%',
                    updated_content
                )
                
                total_completion += calculated_completion
                continue
            
            # Count completed and in-progress subtasks
            total_subtasks = len(subtask_lines)
            completed_subtasks = sum(1 for line in subtask_lines if "Implements" in line)
            in_progress_subtasks = sum(1 for line in subtask_lines if "Implementing" in line)
            
            # Calculate completion percentage
            if total_subtasks > 0:
                calculated_completion = int((completed_subtasks * 100 + in_progress_subtasks * 50) / total_subtasks)
            else:
                calculated_completion = 0
            
            # If status is "In Progress" but calculated completion is 0, set a minimum value only if there are actual subtasks
            if task_status.strip() == "In Progress" and calculated_completion == 0 and total_subtasks > 0:
                calculated_completion = 10  # Minimum 10% for tasks marked as "In Progress"
                logger.info(f"Task {task_id} is marked as 'In Progress' but has no in-progress subtasks. Setting minimum completion to 10%.")
            elif task_status.strip() == "In Progress" and total_subtasks == 0:
                # If there are no subtasks but status is "In Progress", set to 0%
                calculated_completion = 0
                logger.info(f"Task {task_id} is marked as 'In Progress' but has no subtasks. Setting completion to 0%.")
            elif task_status.strip() == "Not Started":
                # If status is "Not Started", set to 0% regardless of subtasks
                calculated_completion = 0
                logger.info(f"Task {task_id} is marked as 'Not Started'. Setting completion to 0%.")
            
            logger.info(f"Calculated completion for task {task_id}: {calculated_completion}% " +
                      f"({completed_subtasks} completed, {in_progress_subtasks} in progress, {total_subtasks} total)")
            
            # Update the completion percentage in the content
            updated_content = re.sub(
                r'(#{3,4}\s+' + re.escape(task_id) + r'.*?\n(?:.*?\n)*?)- \*\*Completion\*\*: \d+%',
                r'\1- **Completion**: ' + str(calculated_completion) + '%',
                updated_content
            )
            
            # Update the implementation verbs and status symbols based on the completion percentage
            new_impl_details = impl_details_section
            for i, line in enumerate(subtask_lines):
                # Look for Markdown links in the format [text](url)
                link_match = re.search(r'^\s*-\s*(?:\[[ x✓~]\])?\s*(.*?)(?:\s*-\s*|\s+)(Will implement|Implementing|Implements)\s+(\[.*?\]\(.*?\))', line)
                
                if link_match:
                    caption = link_match.group(1).strip()
                    user_story_ref_with_link = link_match.group(3)
                    
                    if i < completed_subtasks:
                        # Completed subtask (without "Implements" text but preserving the link)
                        new_impl_details = new_impl_details.replace(line, f"  - [✓] {caption} - {user_story_ref_with_link}")
                    elif i < completed_subtasks + in_progress_subtasks:
                        # In-progress subtask (without "Implementing" text but preserving the link)
                        new_impl_details = new_impl_details.replace(line, f"  - [~] {caption} - {user_story_ref_with_link}")
                    else:
                        # Not started subtask (without "Will implement" text but preserving the link)
                        new_impl_details = new_impl_details.replace(line, f"  - [ ] {caption} - {user_story_ref_with_link}")
                else:
                    # Try another pattern for references without links
                    caption_match = re.search(r'^\s*-\s*(?:\[[ x✓~]\])?\s*(.*?)(?:\s*-\s*|\s+)(Will implement|Implementing|Implements)\s+(\[.*?\])', line)
                    
                    if caption_match:
                        caption = caption_match.group(1).strip()
                        user_story_ref = caption_match.group(3)
                        
                        if i < completed_subtasks:
                            # Completed subtask (without "Implements" text)
                            new_impl_details = new_impl_details.replace(line, f"  - [✓] {caption} - {user_story_ref}")
                        elif i < completed_subtasks + in_progress_subtasks:
                            # In-progress subtask (without "Implementing" text)
                            new_impl_details = new_impl_details.replace(line, f"  - [~] {caption} - {user_story_ref}")
                        else:
                            # Not started subtask (without "Will implement" text)
                            new_impl_details = new_impl_details.replace(line, f"  - [ ] {caption} - {user_story_ref}")
                    else:
                        # If we can't extract the caption and user story reference, just update the verb and symbol
                        if i < completed_subtasks:
                            # Completed subtask
                            updated_line = re.sub(r'(Will implement|Implementing|Implements)\s+', '', line)
                            updated_line = re.sub(r'^\s*-\s*(?:\[[ x✓~]\])?', '  - [✓] ', updated_line)
                            new_impl_details = new_impl_details.replace(line, updated_line)
                        elif i < completed_subtasks + in_progress_subtasks:
                            # In-progress subtask
                            updated_line = re.sub(r'(Will implement|Implementing|Implements)\s+', '', line)
                            updated_line = re.sub(r'^\s*-\s*(?:\[[ x✓~]\])?', '  - [~] ', updated_line)
                            new_impl_details = new_impl_details.replace(line, updated_line)
                        else:
                            # Not started subtask
                            updated_line = re.sub(r'(Will implement|Implementing|Implements)\s+', '', line)
                            updated_line = re.sub(r'^\s*-\s*(?:\[[ x✓~]\])?', '  - [ ] ', updated_line)
                            new_impl_details = new_impl_details.replace(line, updated_line)
            
            updated_content = updated_content.replace(impl_details_section, new_impl_details)
            
            total_completion += calculated_completion
    
    # Calculate average completion
    if task_sections:
        average_completion = total_completion // len(task_sections)
    else:
        average_completion = 0
    
    # Update overall completion in metadata
    metadata_completion_pattern = re.compile(r'- \*\*Completion\*\*: (\d+)%\n')
    metadata_match = metadata_completion_pattern.search(updated_content)
    
    if metadata_match:
        updated_content = updated_content.replace(
            f"- **Completion**: {metadata_match.group(1)}%",
            f"- **Completion**: {average_completion}%"
        )
        
        # Write updated content back to file
        with open(work_unit_file, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        logger.info(f"Updated overall completion of work unit {work_unit_file} to {average_completion}%")
        return True
    
    logger.error(f"Could not find overall completion in metadata of work unit {work_unit_file}")
    return False

def update_changelog(work_unit_file, message):
    """Update the changelog with a new entry."""
    if not os.path.exists(work_unit_file):
        logger.error(f"Work unit file {work_unit_file} not found")
        return False
    
    with open(work_unit_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the changelog section
    changelog_pattern = re.compile(r'## Changelog\s*\n')
    changelog_match = changelog_pattern.search(content)
    
    if not changelog_match:
        logger.error(f"Changelog section not found in work unit file")
        return False
    
    # Create a new changelog entry
    changelog_entry = f"- **{datetime.now().strftime('%Y-%m-%d %H:%M')}**: {message}\n"
    
    # Update the content with the new changelog entry
    updated_content = content.replace(
        "## Changelog\n",
        f"## Changelog\n\n{changelog_entry}"
    )
    
    # Write the updated content back to the file
    with open(work_unit_file, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    logger.info(f"Updated changelog in work unit {work_unit_file}")
    return True

def main():
    """Main function."""
    args = parse_args()
    
    # Find the work unit file
    work_unit_file = find_work_unit_file(args.work_unit)
    if not work_unit_file:
        sys.exit(1)
    
    # Update the task status
    if args.subtask_caption:
        # Update a specific subtask
        success = update_subtask_status(work_unit_file, args.task, args.subtask_caption, args.status, args.message)
    else:
        # Update the entire task
        success = update_task_status(work_unit_file, args.task, args.status, args.completion, args.message)
    
    if not success:
        sys.exit(1)
    
    # Update the overall completion percentage of the work unit
    success = update_overall_completion(work_unit_file)
    if not success:
        sys.exit(1)
    
    logger.info(f"Successfully updated task {args.task} in work unit {args.work_unit}")
    sys.exit(0)

if __name__ == "__main__":
    main()
