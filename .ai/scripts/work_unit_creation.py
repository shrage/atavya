#!/usr/bin/env python3
"""
Work Unit Creation Script

This script handles the creation of new work units:
1. Creates a new work unit file from template
2. Assigns a unique ID
3. Updates the registry
4. Creates initial documentation placeholders
5. Enforces progress tracking protocol
6. Validates the work unit for compliance

Usage:
    python work_unit_creation.py --title "Work Unit Title" [--type TYPE] [--description DESC] [--dry-run]

Options:
    --title TITLE       Title of the new work unit
    --type TYPE         Type of work unit (Enhancement, Feature, Bug Fix, Documentation)
    --description DESC  Brief description of the work unit
    --dry-run           Show changes without applying them
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
import documentation_updater

# Try to import the validator
try:
    from work_unit_validator import validate_work_unit
    validator_available = True
except ImportError:
    validator_available = False

# Constants
WORK_UNITS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "work_units")
TEMPLATE_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "templates", "work_unit_template.md")
LOGS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logs")
os.makedirs(LOGS_DIR, exist_ok=True)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(LOGS_DIR, 'work_unit_creation.log')),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('work_unit_creation')

def get_next_work_unit_id():
    """Get the next available work unit ID."""
    # Find all existing work unit files
    work_unit_ids = []
    if os.path.exists(WORK_UNITS_DIR):
        for filename in os.listdir(WORK_UNITS_DIR):
            if filename.endswith('.md') and filename != 'registry.md' and filename != 'project_tracker.md':
                file_path = os.path.join(WORK_UNITS_DIR, filename)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    id_match = re.search(r'^\s*-\s*\*\*ID\*\*:\s*([^\n]+)', content, re.MULTILINE)
                    if id_match:
                        work_unit_ids.append(id_match.group(1).strip())
    
    # Extract numeric parts of IDs
    numeric_ids = []
    for wu_id in work_unit_ids:
        if wu_id.startswith('WU-'):
            try:
                numeric_ids.append(int(wu_id[3:]))
            except ValueError:
                pass
    
    # Determine next ID
    next_id = 1
    if numeric_ids:
        next_id = max(numeric_ids) + 1
    
    return f"WU-{next_id:03d}"

def create_work_unit(title, work_unit_type, description, dry_run=False):
    """Create a new work unit file from template."""
    # Ensure work units directory exists
    os.makedirs(WORK_UNITS_DIR, exist_ok=True)
    
    # Get next work unit ID
    work_unit_id = get_next_work_unit_id()
    
    # Create file name
    file_name = f"{work_unit_id}_{title.lower().replace(' ', '_')}.md"
    file_path = os.path.join(WORK_UNITS_DIR, file_name)
    
    # Check if template exists
    if not os.path.exists(TEMPLATE_FILE):
        logger.error(f"Template file not found: {TEMPLATE_FILE}")
        return None
    
    # Read template
    with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
        template = f.read()
    
    # Replace placeholders
    today = datetime.now().strftime('%Y-%m-%d')
    content = template.replace('[Title]', title)
    content = content.replace('[Work Unit ID, e.g., WU-007]', work_unit_id)
    content = content.replace('[Enhancement/Feature/Bug Fix/Documentation]', work_unit_type)
    content = content.replace('[Proposed/In Progress/Completed]', 'Proposed')
    content = content.replace('[YYYY-MM-DD]', today)
    content = content.replace('[High/Medium/Low]', 'Medium')
    content = content.replace('[AI Assistant/Human Project Manager]', 'AI Assistant')
    
    # Add completion percentage
    content = content.replace('- **Status**: Proposed', '- **Status**: Proposed\n- **Completion**: 0%')
    
    # Replace description if provided
    if description:
        content = content.replace('[Provide a clear, concise description of the work unit. Explain what this work unit aims to accomplish and why it\'s important.]', description)
    
    # Write to file
    if not dry_run:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        logger.info(f"Created new work unit: {file_path}")
    else:
        logger.info(f"Would create new work unit: {file_path}")
    
    return {
        'id': work_unit_id,
        'title': title,
        'type': work_unit_type,
        'description': description,
        'file_path': file_path
    }

def main():
    parser = argparse.ArgumentParser(description='Create a new work unit.')
    parser.add_argument('--title', required=True, help='Title of the new work unit')
    parser.add_argument('--type', default='Enhancement', help='Type of work unit (Enhancement, Feature, Bug Fix, Documentation)')
    parser.add_argument('--description', help='Brief description of the work unit')
    parser.add_argument('--dry-run', action='store_true', help='Show changes without applying them')
    parser.add_argument('--skip-validation', action='store_true', help='Skip validation of the work unit')
    args = parser.parse_args()
    
    # Create work unit
    work_unit = create_work_unit(args.title, args.type, args.description, args.dry_run)
    if not work_unit:
        return False
    
    # Validate the work unit
    if not args.dry_run and validator_available and not args.skip_validation:
        logger.info(f"Validating work unit {work_unit['id']} for progress tracking compliance")
        validation_result = validate_work_unit(work_unit['file_path'], fix=True)
        
        if validation_result['issues']:
            logger.warning(f"Found {len(validation_result['issues'])} issues in work unit {work_unit['id']}")
            for issue in validation_result['issues']:
                logger.warning(f"  - {issue['message']}")
        else:
            logger.info(f"Work unit {work_unit['id']} passed validation")
    
    # Update registry
    if not args.dry_run:
        update_registry(check_only=False)
        logger.info(f"Updated registry with new work unit {work_unit['id']}")
    else:
        logger.info(f"Would update registry with new work unit {work_unit['id']}")
    
    # Create initial documentation placeholders
    if not args.dry_run:
        logger.info(f"Creating initial documentation placeholders for {work_unit['id']}")
        documentation_updater.update_documentation_for_work_unit(work_unit['id'], args.dry_run)
    else:
        logger.info(f"Would create initial documentation placeholders for {work_unit['id']}")
    
    logger.info(f"Work unit creation process for '{args.title}' completed successfully")
    
    # Print summary
    print("\n" + "="*80)
    print(f"WORK UNIT CREATION SUMMARY")
    print("="*80)
    print(f"ID: {work_unit['id']}")
    print(f"Title: {work_unit['title']}")
    print(f"Type: {work_unit['type']}")
    print(f"Description: {work_unit['description']}")
    print(f"File: {work_unit['file_path']}")
    print("="*80)
    
    return True

if __name__ == "__main__":
    sys.exit(0 if main() else 1)
