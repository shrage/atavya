#!/usr/bin/env python3
"""
Work Unit Completion Script

This script handles the post-implementation process for work units:
1. Updates the work unit status to "Completed"
2. Sets the completion percentage to 100%
3. Updates the registry
4. Generates a completion report
5. Triggers documentation updates

Usage:
    python work_unit_completion.py --work-unit WU_ID [--dry-run]

Options:
    --work-unit WU_ID   The ID of the completed work unit (e.g., WU-006)
    --dry-run           Show changes without applying them
"""

import os
import re
import sys
import argparse
import logging
from datetime import datetime

# Import registry updater
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from registry_updater import update_registry
import documentation_updater

# Constants
WORK_UNITS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "work_units")
LOGS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logs")
os.makedirs(LOGS_DIR, exist_ok=True)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(LOGS_DIR, 'work_unit_completion.log')),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('work_unit_completion')

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

def update_work_unit_status(file_path, dry_run=False):
    """Update the work unit status to Completed and set completion to 100%."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update status
    status_pattern = re.compile(r'^\s*-\s*\*\*Status\*\*:\s*([^\n]+)', re.MULTILINE)
    updated_content = status_pattern.sub('- **Status**: Completed', content)
    
    # Update completion percentage
    completion_pattern = re.compile(r'^\s*-\s*\*\*Completion\*\*:\s*([^\n]+)', re.MULTILINE)
    if completion_pattern.search(updated_content):
        updated_content = completion_pattern.sub('- **Completion**: 100%', updated_content)
    else:
        # If no completion field exists, add it after status
        updated_content = updated_content.replace('- **Status**: Completed', '- **Status**: Completed\n- **Completion**: 100%')
    
    # Update last updated date
    last_updated_pattern = re.compile(r'^\s*-\s*\*\*Last Updated\*\*:\s*([^\n]+)', re.MULTILINE)
    today = datetime.now().strftime('%Y-%m-%d')
    if last_updated_pattern.search(updated_content):
        updated_content = last_updated_pattern.sub(f'- **Last Updated**: {today}', updated_content)
    
    # Add to changelog
    changelog_section = "## Changelog"
    changelog_entry = f"\n- **{today}**: Work unit completed and marked as 100% complete."
    
    if changelog_section in updated_content:
        # Add entry to existing changelog
        updated_content = updated_content.replace(changelog_section, f"{changelog_section}{changelog_entry}")
    else:
        # Add changelog section at the end
        updated_content += f"\n\n{changelog_section}{changelog_entry}"
    
    if dry_run:
        logger.info(f"Would update work unit status to Completed and set completion to 100%")
        return True
    else:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        logger.info(f"Updated work unit status to Completed and set completion to 100%")
        return True

def generate_completion_report(work_unit_id, file_path, dry_run=False):
    """Generate a completion report for the work unit."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract work unit title
    title_match = re.search(r'^#\s+Work Unit:\s+([^\n]+)', content, re.MULTILINE)
    title = title_match.group(1) if title_match else work_unit_id
    
    # Extract description
    description_match = re.search(r'^\s*-\s*\*\*Description\*\*:\s*([^\n]+)', content, re.MULTILINE)
    description = description_match.group(1) if description_match else "No description available"
    
    # Extract objectives
    objectives_section = re.search(r'^## Objectives\s*\n(.*?)^##', content, re.MULTILINE | re.DOTALL)
    objectives = objectives_section.group(1).strip() if objectives_section else "No objectives listed"
    
    # Generate report
    report = f"# Work Unit Completion Report: {work_unit_id}\n\n"
    report += f"## Overview\n\n"
    report += f"- **Work Unit**: {title}\n"
    report += f"- **ID**: {work_unit_id}\n"
    report += f"- **Description**: {description}\n"
    report += f"- **Status**: Completed\n"
    report += f"- **Completion**: 100%\n"
    report += f"- **Completion Date**: {datetime.now().strftime('%Y-%m-%d')}\n\n"
    
    report += f"## Objectives Achieved\n\n{objectives}\n\n"
    
    report += f"## Implementation Summary\n\n"
    report += f"The work unit has been fully implemented according to the requirements and specifications.\n\n"
    
    report += f"## Next Steps\n\n"
    report += f"1. Review the implementation to ensure it meets all requirements\n"
    report += f"2. Update dependent work units if necessary\n"
    report += f"3. Consider creating follow-up work units for any identified enhancements\n\n"
    
    report += f"## Generated by\n\n"
    report += f"This completion report was automatically generated by the AI Documentation Framework's work unit completion script."
    
    # Save report
    if not dry_run:
        report_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "reports", "completion_reports")
        os.makedirs(report_dir, exist_ok=True)
        
        report_file = os.path.join(report_dir, f"{work_unit_id}_completion_report.md")
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write(report)
        logger.info(f"Generated completion report: {report_file}")
    else:
        logger.info(f"Would generate completion report for {work_unit_id}")
    
    return report

def main():
    parser = argparse.ArgumentParser(description='Handle work unit completion process.')
    parser.add_argument('--work-unit', required=True, help='The ID of the completed work unit (e.g., WU-006)')
    parser.add_argument('--dry-run', action='store_true', help='Show changes without applying them')
    args = parser.parse_args()
    
    work_unit_id = args.work_unit
    
    # Find the work unit file
    file_path = find_work_unit_file(work_unit_id)
    if not file_path:
        logger.error(f"Work unit {work_unit_id} not found")
        return False
    
    # Update work unit status
    if not update_work_unit_status(file_path, args.dry_run):
        return False
    
    # Generate completion report
    report = generate_completion_report(work_unit_id, file_path, args.dry_run)
    
    # Update registry
    if not args.dry_run:
        update_registry(check_only=False)
        logger.info(f"Updated registry with completed work unit {work_unit_id}")
    else:
        logger.info(f"Would update registry with completed work unit {work_unit_id}")
    
    # Trigger documentation update
    if not args.dry_run:
        logger.info(f"Triggering documentation update for work unit {work_unit_id}")
        documentation_updater.update_documentation_for_work_unit(work_unit_id, args.dry_run)
    else:
        logger.info(f"Would trigger documentation update for work unit {work_unit_id}")
    
    logger.info(f"Work unit {work_unit_id} completion process finished successfully")
    
    # Print report to console
    print("\n" + "="*80)
    print(f"WORK UNIT {work_unit_id} COMPLETION REPORT")
    print("="*80)
    print(report)
    print("="*80)
    
    return True

if __name__ == "__main__":
    sys.exit(0 if main() else 1)
