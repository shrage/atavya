#!/usr/bin/env python3
"""
Work Unit Update Script

This script handles updates to existing work units:
1. Updates an existing work unit with new information
2. Updates status and completion percentage
3. Updates the registry
4. Generates update notification
5. Validates progress tracking compliance

Usage:
    python work_unit_update.py --work-unit WU_ID [--status STATUS] [--completion PERCENTAGE] [--dry-run]

Options:
    --work-unit WU_ID       The ID of the work unit to update (e.g., WU-006)
    --status STATUS         New status (Proposed, In Progress, Completed)
    --completion PERCENTAGE Completion percentage (e.g., 25%)
    --dry-run               Show changes without applying them
    --skip-validation       Skip validation of the work unit
"""

import os
import re
import sys
import argparse
import logging
from datetime import datetime

# Import other triggers
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from registry_updater import update_registry

# Try to import the validator
try:
    from work_unit_validator import validate_work_unit
    validator_available = True
except ImportError:
    validator_available = False

# Constants
WORK_UNITS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "work_units")
LOGS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logs")
os.makedirs(LOGS_DIR, exist_ok=True)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(LOGS_DIR, 'work_unit_update.log')),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('work_unit_update')

def find_work_unit_file(work_unit_id):
    """Find the file path for a work unit by its ID."""
    for filename in os.listdir(WORK_UNITS_DIR):
        if filename.endswith('.md') and filename != 'registry.md' and filename != 'project_tracker.md':
            file_path = os.path.join(WORK_UNITS_DIR, filename)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                id_match = re.search(r'^\s*-\s*\*\*ID\*\*:\s*([^\n]+)', content, re.MULTILINE)
                if id_match and id_match.group(1).strip() == work_unit_id:
                    return file_path
    return None

def update_requirement_completion(file_path, requirement_id, completion_status, dry_run=False):
    """Update the completion status of a specific requirement."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract work unit ID for logging
    id_match = re.search(r'^\s*-\s*\*\*ID\*\*:\s*([^\n]+)', content, re.MULTILINE)
    work_unit_id = id_match.group(1).strip() if id_match else os.path.basename(file_path)
    
    # Find the requirement
    requirement_pattern = re.compile(r'####\s+' + re.escape(requirement_id) + r'\s+[^\n]+\n((?:- \*\*[^\n]+\n)+)', re.MULTILINE)
    req_match = requirement_pattern.search(content)
    
    if not req_match:
        logger.error(f"Requirement {requirement_id} not found in {work_unit_id}")
        return False
    
    req_block = req_match.group(1)
    
    # Update completion status
    completion_pattern = re.compile(r'- \*\*Completion\*\*:\s*([^\n]+)')
    if completion_pattern.search(req_block):
        updated_req_block = completion_pattern.sub(f'- **Completion**: {completion_status}', req_block)
    else:
        # If no completion field exists, add it after status
        updated_req_block = req_block.replace('- **Status**:', f'- **Status**:\n- **Completion**: {completion_status}')
    
    # Replace the requirement block in the content
    updated_content = content.replace(req_block, updated_req_block)
    
    # Write updated content
    if not dry_run:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        logger.info(f"Updated requirement {requirement_id} completion to {completion_status} in {work_unit_id}")
    else:
        logger.info(f"Would update requirement {requirement_id} completion to {completion_status} in {work_unit_id}")
    
    return True

def calculate_completion_percentage(file_path):
    """Calculate the overall completion percentage based on individual requirements."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all requirement blocks
    requirement_pattern = re.compile(r'####\s+\d+\.\d+\s+[^\n]+\n((?:- \*\*[^\n]+\n)+)', re.MULTILINE)
    requirements = []
    
    for req_match in requirement_pattern.finditer(content):
        req_block = req_match.group(1)
        completion_match = re.search(r'- \*\*Completion\*\*:\s*([^\n]+)', req_block)
        if completion_match and completion_match.group(1).strip() == 'Completed':
            requirements.append({'completed': True})
        else:
            requirements.append({'completed': False})
    
    if not requirements:
        return 0
    
    completed = sum(1 for req in requirements if req['completed'])
    return int((completed / len(requirements)) * 100)

def update_work_unit(file_path, status=None, completion=None, dry_run=False):
    """Update a work unit file with new status and completion percentage."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    updated_content = content
    
    # Extract work unit ID for logging
    id_match = re.search(r'^\s*-\s*\*\*ID\*\*:\s*([^\n]+)', content, re.MULTILINE)
    work_unit_id = id_match.group(1).strip() if id_match else os.path.basename(file_path)
    
    # Update status if provided
    if status:
        status_pattern = re.compile(r'^\s*-\s*\*\*Status\*\*:\s*([^\n]+)', re.MULTILINE)
        if status_pattern.search(updated_content):
            updated_content = status_pattern.sub(f'- **Status**: {status}', updated_content)
            logger.info(f"Updated status to {status} for {work_unit_id}")
    
    # Update completion percentage if provided
    if completion:
        completion_pattern = re.compile(r'^\s*-\s*\*\*Completion\*\*:\s*([^\n]+)', re.MULTILINE)
        if completion_pattern.search(updated_content):
            updated_content = completion_pattern.sub(f'- **Completion**: {completion}', updated_content)
            logger.info(f"Updated completion to {completion} for {work_unit_id}")
        else:
            # If no completion field exists, add it after status
            updated_content = updated_content.replace('- **Status**:', f'- **Status**:\n- **Completion**: {completion}')
            logger.info(f"Added completion {completion} for {work_unit_id}")
    
    # Update last updated date
    last_updated_pattern = re.compile(r'^\s*-\s*\*\*Last Updated\*\*:\s*([^\n]+)', re.MULTILINE)
    today = datetime.now().strftime('%Y-%m-%d')
    if last_updated_pattern.search(updated_content):
        updated_content = last_updated_pattern.sub(f'- **Last Updated**: {today}', updated_content)
    
    # Add to changelog
    changelog_section = "## Changelog"
    changelog_entry = f"\n- **{today}**: "
    
    if status and completion:
        changelog_entry += f"Updated status to {status} and completion to {completion}."
    elif status:
        changelog_entry += f"Updated status to {status}."
    elif completion:
        changelog_entry += f"Updated completion to {completion}."
    else:
        changelog_entry += f"Work unit updated."
    
    if changelog_section in updated_content:
        # Add entry to existing changelog
        updated_content = updated_content.replace(changelog_section, f"{changelog_section}{changelog_entry}")
    else:
        # Add changelog section at the end
        updated_content += f"\n\n{changelog_section}{changelog_entry}"
    
    # Write updated content
    if not dry_run:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        logger.info(f"Updated work unit file: {file_path}")
    else:
        logger.info(f"Would update work unit file: {file_path}")
    
    return True

def generate_update_notification(work_unit_id, status=None, completion=None, dry_run=False):
    """Generate a notification about the work unit update."""
    notification = f"# Work Unit Update Notification\n\n"
    notification += f"## Work Unit: {work_unit_id}\n\n"
    notification += f"This work unit was updated on {datetime.now().strftime('%Y-%m-%d')}.\n\n"
    
    if status:
        notification += f"- Status updated to: **{status}**\n"
    
    if completion:
        notification += f"- Completion updated to: **{completion}**\n"
    
    notification += f"\nThis notification was automatically generated by the AI Documentation Framework's work unit update script."
    
    # Save notification
    if not dry_run:
        notification_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "reports", "update_notifications")
        os.makedirs(notification_dir, exist_ok=True)
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        notification_file = os.path.join(notification_dir, f"{work_unit_id}_update_{timestamp}.md")
        with open(notification_file, 'w', encoding='utf-8') as f:
            f.write(notification)
        logger.info(f"Generated update notification: {notification_file}")
    else:
        logger.info(f"Would generate update notification for {work_unit_id}")
    
    return notification

def main():
    parser = argparse.ArgumentParser(description='Update an existing work unit.')
    parser.add_argument('--work-unit', required=True, help='The ID of the work unit to update (e.g., WU-006)')
    parser.add_argument('--status', help='New status (Proposed, In Progress, Completed)')
    parser.add_argument('--completion', help='Completion percentage (e.g., 25%)')
    parser.add_argument('--requirement', help='Specific requirement ID to update (e.g., 1.1)')
    parser.add_argument('--requirement-completion', help='Completion status for the requirement (Completed/Not Completed)')
    parser.add_argument('--dry-run', action='store_true', help='Show changes without applying them')
    parser.add_argument('--skip-validation', action='store_true', help='Skip validation of the work unit')
    parser.add_argument('--recalculate', action='store_true', help='Recalculate overall completion based on requirements')
    args = parser.parse_args()
    
    # Validate arguments
    if not args.status and not args.completion and not args.requirement and not args.recalculate:
        logger.error("No updates specified. Please provide --status, --completion, --requirement, or --recalculate")
        return False
    
    # Find the work unit file
    file_path = find_work_unit_file(args.work_unit)
    if not file_path:
        logger.error(f"Work unit {args.work_unit} not found")
        return False
    
    # Update specific requirement if provided
    if args.requirement and args.requirement_completion:
        if not update_requirement_completion(file_path, args.requirement, args.requirement_completion, args.dry_run):
            return False
    
    # Recalculate completion percentage if requested
    if args.recalculate:
        calculated_completion = calculate_completion_percentage(file_path)
        args.completion = f"{calculated_completion}%"
        logger.info(f"Recalculated completion for {args.work_unit}: {args.completion}")
    
    # Update work unit
    if args.status or args.completion:
        if not update_work_unit(file_path, args.status, args.completion, args.dry_run):
            return False
    
    # Validate the work unit
    if not args.dry_run and validator_available and not args.skip_validation:
        logger.info(f"Validating work unit {args.work_unit} for progress tracking compliance")
        validation_result = validate_work_unit(file_path, fix=True)
        
        if validation_result['issues']:
            logger.warning(f"Found {len(validation_result['issues'])} issues in work unit {args.work_unit}")
            for issue in validation_result['issues']:
                logger.warning(f"  - {issue['message']}")
        else:
            logger.info(f"Work unit {args.work_unit} passed validation")
    
    # Generate update notification
    notification = generate_update_notification(args.work_unit, args.status, args.completion, args.dry_run)
    
    # Update registry
    if not args.dry_run:
        update_registry(check_only=False)
        logger.info(f"Updated registry with changes to work unit {args.work_unit}")
    else:
        logger.info(f"Would update registry with changes to work unit {args.work_unit}")
    
    # Check if status is Completed, and if so, trigger the completion process
    if args.status == 'Completed' or (args.completion and args.completion.strip() == '100%'):
        if not args.dry_run:
            logger.info(f"Work unit {args.work_unit} is marked as completed, triggering completion process")
            # Import here to avoid circular imports
            from work_unit_completion import main as completion_main
            sys.argv = ['work_unit_completion.py', '--work-unit', args.work_unit]
            completion_main()
        else:
            logger.info(f"Would trigger completion process for work unit {args.work_unit}")
    
    logger.info(f"Work unit update process for {args.work_unit} completed successfully")
    
    # Print notification to console
    print("\n" + "="*80)
    print(notification)
    print("="*80)
    
    return True

if __name__ == "__main__":
    sys.exit(0 if main() else 1)
