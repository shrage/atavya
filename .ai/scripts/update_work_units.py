#!/usr/bin/env python3
"""
Work Unit Updater Script

This script updates existing work unit files to include responsibility assignments
for each requirement and ensures they follow the latest template format.

Usage:
    python update_work_units.py [--dry-run] [--work-unit WU_ID]

Options:
    --dry-run           Show changes without applying them
    --work-unit WU_ID   Update only the specified work unit (e.g., WU-001)
"""

import os
import re
import sys
import argparse
import logging
from datetime import datetime

# Constants
WORK_UNITS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "work_units")
TEMPLATE_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "templates", "work_unit_template.md")

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('update_work_units')

# Regular expressions for parsing work unit files
REQUIREMENT_PATTERN = re.compile(r'(#+\s+\d+\.\d+\s+[^\n]+\n(?:- \*\*[^\n]+\n)+)', re.MULTILINE)
RESPONSIBILITY_PATTERN = re.compile(r'- \*\*Responsibility Assignment\*\*:', re.MULTILINE)

def load_work_units():
    """Load all work unit files except registry.md."""
    work_units = []
    
    if not os.path.exists(WORK_UNITS_DIR):
        logger.error(f"Work units directory not found: {WORK_UNITS_DIR}")
        return work_units
    
    for filename in os.listdir(WORK_UNITS_DIR):
        if filename.endswith('.md') and filename != 'registry.md' and filename != 'project_tracker.md':
            file_path = os.path.join(WORK_UNITS_DIR, filename)
            work_units.append({
                'path': file_path,
                'filename': filename
            })
    
    return work_units

def extract_work_unit_id(content):
    """Extract the work unit ID from the content."""
    id_match = re.search(r'^\s*-\s*\*\*ID\*\*:\s*([^\n]+)', content, re.MULTILINE)
    return id_match.group(1).strip() if id_match else None

def add_responsibility_to_requirement(requirement_block):
    """Add responsibility assignment to a requirement block if it doesn't exist."""
    if RESPONSIBILITY_PATTERN.search(requirement_block):
        return requirement_block  # Already has responsibility assignment
    
    # Find where to insert the responsibility section
    lines = requirement_block.split('\n')
    insert_index = -1
    
    for i, line in enumerate(lines):
        if line.strip().startswith('- **Implementation Details**:'):
            insert_index = i
            break
    
    if insert_index == -1:
        # If no implementation details, add before the last line
        insert_index = len(lines) - 1
    
    # Insert responsibility assignment
    responsibility_lines = [
        '- **Responsibility Assignment**:',
        '  - **AI Assistant**: Implement and validate this requirement',
    ]
    
    updated_lines = lines[:insert_index] + responsibility_lines + lines[insert_index:]
    return '\n'.join(updated_lines)

def update_work_unit(work_unit, dry_run=False):
    """Update a work unit file to include responsibility assignments."""
    with open(work_unit['path'], 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract work unit ID
    work_unit_id = extract_work_unit_id(content)
    if not work_unit_id:
        logger.warning(f"Could not extract ID from {work_unit['filename']}")
        return False
    
    # Check if the file already has the latest format
    has_all_responsibilities = True
    for req_match in REQUIREMENT_PATTERN.finditer(content):
        req_block = req_match.group(1)
        if not RESPONSIBILITY_PATTERN.search(req_block):
            has_all_responsibilities = False
            break
    
    if has_all_responsibilities:
        logger.info(f"{work_unit_id} already has responsibility assignments for all requirements")
        return True
    
    # Update each requirement block
    updated_content = content
    for req_match in REQUIREMENT_PATTERN.finditer(content):
        req_block = req_match.group(1)
        updated_req_block = add_responsibility_to_requirement(req_block)
        updated_content = updated_content.replace(req_block, updated_req_block)
    
    # Update the last updated date
    last_updated_pattern = re.compile(r'^\s*-\s*\*\*Last Updated\*\*:\s*([^\n]+)', re.MULTILINE)
    if last_updated_pattern.search(updated_content):
        updated_content = last_updated_pattern.sub(f'- **Last Updated**: {datetime.now().strftime("%Y-%m-%d")}', updated_content)
    
    if dry_run:
        logger.info(f"Would update {work_unit_id} with responsibility assignments")
        return True
    else:
        with open(work_unit['path'], 'w', encoding='utf-8') as f:
            f.write(updated_content)
        logger.info(f"Updated {work_unit_id} with responsibility assignments")
        return True

def main():
    parser = argparse.ArgumentParser(description='Update work unit files with responsibility assignments.')
    parser.add_argument('--dry-run', action='store_true', help='Show changes without applying them')
    parser.add_argument('--work-unit', help='Update only the specified work unit (e.g., WU-001)')
    args = parser.parse_args()
    
    work_units = load_work_units()
    
    if args.work_unit:
        # Update only the specified work unit
        target_work_units = [wu for wu in work_units if extract_work_unit_id(open(wu['path'], 'r', encoding='utf-8').read()) == args.work_unit]
        if not target_work_units:
            logger.error(f"Work unit {args.work_unit} not found")
            return False
    else:
        # Update all work units
        target_work_units = work_units
    
    success = True
    for work_unit in target_work_units:
        if not update_work_unit(work_unit, args.dry_run):
            success = False
    
    if args.dry_run:
        logger.info("Dry run completed. No changes were made.")
    else:
        logger.info(f"Updated {len(target_work_units)} work unit(s) with responsibility assignments")
    
    return success

if __name__ == "__main__":
    sys.exit(0 if main() else 1)
