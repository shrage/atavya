#!/usr/bin/env python3
"""
Registry Updater Script

This script automatically updates the registry.md file when work units are created, modified, or deleted.
It scans the work_units directory, extracts metadata from work unit files, and updates the registry accordingly.

Usage:
    python registry_updater.py [--check-only]

Options:
    --check-only    Only check for inconsistencies without making changes
"""

import os
import re
import sys
import argparse
from datetime import datetime

# Constants
WORK_UNITS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "work_units")
REGISTRY_FILE = os.path.join(WORK_UNITS_DIR, "registry.md")

# Regular expressions for extracting metadata
ID_PATTERN = re.compile(r'^\s*-\s*\*\*ID\*\*:\s*([^\n]+)', re.MULTILINE)
STATUS_PATTERN = re.compile(r'^\s*-\s*\*\*Status\*\*:\s*([^\n]+)', re.MULTILINE)
COMPLETION_PATTERN = re.compile(r'^\s*-\s*\*\*Completion\*\*:\s*([^\n]+)', re.MULTILINE)
DESCRIPTION_PATTERN = re.compile(r'^\s*-\s*\*\*Description\*\*:\s*([^\n]+)', re.MULTILINE)
RELATIONSHIP_PATTERN = re.compile(r'^\s*-\s*\*\*Relationship Type\*\*:\s*([^\n]+)', re.MULTILINE)
DEPENDENCIES_PATTERN = re.compile(r'^\s*-\s*\*\*Dependencies\*\*:\s*([^\n]+)', re.MULTILINE)
TITLE_PATTERN = re.compile(r'^#\s+Work Unit:\s+([^\n]+)', re.MULTILINE)

def extract_metadata(file_path):
    """Extract metadata from a work unit file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract title as fallback for description
        title_match = TITLE_PATTERN.search(content)
        title = title_match.group(1) if title_match else os.path.basename(file_path)
        
        # Extract other metadata
        id_match = ID_PATTERN.search(content)
        status_match = STATUS_PATTERN.search(content)
        completion_match = COMPLETION_PATTERN.search(content)
        description_match = DESCRIPTION_PATTERN.search(content)
        relationship_match = RELATIONSHIP_PATTERN.search(content)
        dependencies_match = DEPENDENCIES_PATTERN.search(content)
        
        # Process completion percentage
        completion = '0%'
        if completion_match:
            completion_value = completion_match.group(1).strip()
            # Ensure it ends with %
            if not completion_value.endswith('%'):
                try:
                    # Try to convert to int and add % sign
                    completion = f"{int(completion_value)}%"
                except ValueError:
                    completion = '0%'
            else:
                completion = completion_value
        
        return {
            'id': id_match.group(1).strip() if id_match else None,
            'status': status_match.group(1).strip() if status_match else 'Proposed',
            'completion': completion,
            'description': description_match.group(1).strip() if description_match else title,
            'relationship': relationship_match.group(1).strip() if relationship_match else 'Independent',
            'dependencies': dependencies_match.group(1).strip() if dependencies_match else 'None',
            'path': os.path.basename(file_path),
            'title': title
        }
    except Exception as e:
        print(f"Error extracting metadata from {file_path}: {e}")
        return None

def scan_work_units():
    """Scan the work_units directory and extract metadata from all work unit files."""
    work_units = []
    
    if not os.path.exists(WORK_UNITS_DIR):
        print(f"Work units directory not found: {WORK_UNITS_DIR}")
        return work_units
    
    for filename in os.listdir(WORK_UNITS_DIR):
        if filename.endswith('.md') and filename != 'registry.md' and filename != 'project_tracker.md':
            file_path = os.path.join(WORK_UNITS_DIR, filename)
            metadata = extract_metadata(file_path)
            if metadata:
                work_units.append(metadata)
    
    return work_units

def generate_registry_content(work_units):
    """Generate the content for the registry.md file."""
    # Sort work units by ID
    completed_units = [wu for wu in work_units if wu['status'].lower() == 'completed']
    active_units = [wu for wu in work_units if wu['status'].lower() != 'completed']
    
    # Sort by ID (assuming ID format like WU-001)
    completed_units.sort(key=lambda x: x['id'] if x['id'] else '')
    active_units.sort(key=lambda x: x['id'] if x['id'] else '')
    
    content = "# Work Unit Registry\n\n"
    
    # Active Work Units
    content += "## Active Work Units\n\n"
    for unit in active_units:
        content += f"### {unit['id']}: {unit['title']}\n"
        content += f"- **Status**: {unit['status']}\n"
        content += f"- **Completion**: {unit['completion']}\n"
        content += f"- **Description**: {unit['description']}\n"
        content += f"- **Relationship Type**: {unit['relationship']}\n"
        content += f"- **Dependencies**: {unit['dependencies']}\n"
        content += f"- **Last Updated**: {datetime.now().strftime('%Y-%m-%d')}\n"
        content += f"- **Path**: [./{unit['path']}](./{unit['path']})\n\n"
    
    # Completed Work Units
    if completed_units:
        content += "## Completed Work Units\n\n"
        for unit in completed_units:
            content += f"### {unit['id']}: {unit['title']}\n"
            content += f"- **Status**: {unit['status']}\n"
            content += f"- **Completion**: {unit['completion']}\n"
            content += f"- **Description**: {unit['description']}\n"
            content += f"- **Relationship Type**: {unit['relationship']}\n"
            content += f"- **Dependencies**: {unit['dependencies']}\n"
            content += f"- **Last Updated**: {datetime.now().strftime('%Y-%m-%d')}\n"
            content += f"- **Path**: [./{unit['path']}](./{unit['path']})\n\n"
    
    # Generate hierarchy diagram
    content += "## Work Unit Hierarchy\n\n```\n"
    for unit in active_units + completed_units:
        content += f"{unit['id']}: {unit['title']} ({unit['completion']} complete)\n\n"
    content += "```\n\n"
    
    # Registry maintenance section
    content += """## Registry Maintenance

This registry is maintained to track all work units in the AI Documentation Framework. Each entry includes status, relationships, dependencies, and other metadata to provide a comprehensive overview of the framework's development.

### Maintenance Protocol

1. **Adding New Work Units**:
   - Create a new entry in the appropriate section
   - Include all required metadata
   - Update the hierarchy diagram

2. **Updating Existing Work Units**:
   - Update the status, completion percentage, and last updated date
   - Modify relationships and dependencies as needed
   - Ensure the hierarchy diagram reflects any changes

3. **Completing Work Units**:
   - Move the entry from Active to Completed section
   - Update the completion percentage to 100%
   - Add the completion date

## Last Updated
"""
    content += datetime.now().strftime('%Y-%m-%d')
    
    return content

def update_registry(check_only=False):
    """Update the registry.md file with the current work units."""
    work_units = scan_work_units()
    new_content = generate_registry_content(work_units)
    
    if check_only:
        if os.path.exists(REGISTRY_FILE):
            with open(REGISTRY_FILE, 'r', encoding='utf-8') as f:
                current_content = f.read()
            if current_content != new_content:
                print("Registry is out of sync with work units.")
                return False
            else:
                print("Registry is up to date.")
                return True
        else:
            print("Registry file does not exist.")
            return False
    else:
        with open(REGISTRY_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Registry updated successfully: {REGISTRY_FILE}")
        return True

def main():
    parser = argparse.ArgumentParser(description='Update the work unit registry.')
    parser.add_argument('--check-only', action='store_true', help='Only check for inconsistencies without making changes')
    args = parser.parse_args()
    
    return update_registry(args.check_only)

if __name__ == "__main__":
    sys.exit(0 if main() else 1)
