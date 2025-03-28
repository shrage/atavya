#!/usr/bin/env python3
"""
Documentation Updater Script

This script updates project documentation based on completed work units.
It analyzes the changes made in work units and updates relevant documentation files.

Usage:
    python documentation_updater.py [--work-unit WU_ID] [--dry-run]

Options:
    --work-unit WU_ID   Update documentation based on a specific work unit
    --dry-run           Show changes without applying them
"""

import os
import re
import sys
import argparse
import logging
import shutil
from datetime import datetime

# Constants
WORK_UNITS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "work_units")
CORE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "_core")
DOCS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "docs")
LOGS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logs")
os.makedirs(LOGS_DIR, exist_ok=True)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(LOGS_DIR, 'documentation_updater.log')),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('documentation_updater')

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

def extract_work_unit_info(file_path):
    """Extract relevant information from a work unit file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract basic metadata
    id_match = re.search(r'^\s*-\s*\*\*ID\*\*:\s*([^\n]+)', content, re.MULTILINE)
    title_match = re.search(r'^#\s+Work Unit:\s+([^\n]+)', content, re.MULTILINE)
    description_match = re.search(r'^\s*-\s*\*\*Description\*\*:\s*([^\n]+)', content, re.MULTILINE)
    type_match = re.search(r'^\s*-\s*\*\*Type\*\*:\s*([^\n]+)', content, re.MULTILINE)
    
    # Extract sections
    description_section = re.search(r'^## Description\s*\n(.*?)^##', content, re.MULTILINE | re.DOTALL)
    objectives_section = re.search(r'^## Objectives\s*\n(.*?)^##', content, re.MULTILINE | re.DOTALL)
    requirements_section = re.search(r'^## Requirements\s*\n(.*?)^##', content, re.MULTILINE | re.DOTALL)
    
    # Extract components affected
    components_section = re.search(r'^## Related Components\s*\n(.*?)^##', content, re.MULTILINE | re.DOTALL)
    components = []
    if components_section:
        component_lines = components_section.group(1).strip().split('\n')
        for line in component_lines:
            if line.strip().startswith('- '):
                components.append(line.strip()[2:])
    
    return {
        'id': id_match.group(1).strip() if id_match else None,
        'title': title_match.group(1).strip() if title_match else os.path.basename(file_path),
        'description': description_match.group(1).strip() if description_match else None,
        'type': type_match.group(1).strip() if type_match else None,
        'description_text': description_section.group(1).strip() if description_section else None,
        'objectives': objectives_section.group(1).strip() if objectives_section else None,
        'requirements': requirements_section.group(1).strip() if requirements_section else None,
        'components': components,
        'file_path': file_path
    }

def update_component_documentation(component_name, work_unit_info, dry_run=False):
    """Update documentation for a specific component based on work unit info."""
    # Determine the likely documentation file
    component_file = component_name.lower().replace(' ', '_') + '.md'
    doc_path = os.path.join(DOCS_DIR, component_file)
    core_path = os.path.join(CORE_DIR, component_file)
    
    # Check if documentation exists in docs or _core directory
    if os.path.exists(doc_path):
        target_path = doc_path
    elif os.path.exists(core_path):
        target_path = core_path
    else:
        # Create new documentation file in docs directory
        os.makedirs(DOCS_DIR, exist_ok=True)
        target_path = doc_path
        if not dry_run:
            with open(target_path, 'w', encoding='utf-8') as f:
                f.write(f"# {component_name}\n\n")
        logger.info(f"Created new documentation file for {component_name}: {target_path}")
    
    # Read existing documentation
    if os.path.exists(target_path):
        with open(target_path, 'r', encoding='utf-8') as f:
            content = f.read()
    else:
        content = f"# {component_name}\n\n"
    
    # Create backup
    if not dry_run and os.path.exists(target_path):
        backup_path = target_path + '.bak'
        shutil.copy2(target_path, backup_path)
        logger.info(f"Created backup of {target_path} at {backup_path}")
    
    # Update documentation based on work unit type
    if work_unit_info['type'] and 'enhancement' in work_unit_info['type'].lower():
        # Add enhancement information
        updated_content = update_for_enhancement(content, work_unit_info)
    elif work_unit_info['type'] and 'feature' in work_unit_info['type'].lower():
        # Add feature information
        updated_content = update_for_feature(content, work_unit_info)
    elif work_unit_info['type'] and 'bug' in work_unit_info['type'].lower():
        # Add bug fix information
        updated_content = update_for_bugfix(content, work_unit_info)
    else:
        # Generic update
        updated_content = update_generic(content, work_unit_info)
    
    # Add changelog entry
    changelog_section = "## Changelog\n\n"
    today = datetime.now().strftime('%Y-%m-%d')
    changelog_entry = f"- **{today}**: Updated based on {work_unit_info['id']} - {work_unit_info['title']}\n"
    
    if "## Changelog" in updated_content:
        updated_content = updated_content.replace("## Changelog\n", f"## Changelog\n{changelog_entry}")
    else:
        updated_content += f"\n\n{changelog_section}{changelog_entry}"
    
    # Write updated documentation
    if not dry_run:
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        logger.info(f"Updated documentation for {component_name}: {target_path}")
    else:
        logger.info(f"Would update documentation for {component_name}: {target_path}")
    
    return target_path

def update_for_enhancement(content, work_unit_info):
    """Update documentation for an enhancement work unit."""
    # Check if there's an Enhancements section
    if "## Enhancements" not in content:
        content += "\n\n## Enhancements\n\n"
    
    # Add enhancement information
    enhancement_info = f"### {work_unit_info['title']}\n\n"
    if work_unit_info['description_text']:
        enhancement_info += f"{work_unit_info['description_text']}\n\n"
    
    if work_unit_info['objectives']:
        enhancement_info += "**Key Improvements:**\n\n"
        for line in work_unit_info['objectives'].split('\n'):
            if line.strip() and not line.strip().startswith('#'):
                enhancement_info += f"{line.strip()}\n"
        enhancement_info += "\n"
    
    # Add the enhancement section
    if "## Enhancements" in content:
        content = content.replace("## Enhancements", f"## Enhancements\n\n{enhancement_info}")
    else:
        content += enhancement_info
    
    return content

def update_for_feature(content, work_unit_info):
    """Update documentation for a feature work unit."""
    # Check if there's a Features section
    if "## Features" not in content:
        content += "\n\n## Features\n\n"
    
    # Add feature information
    feature_info = f"### {work_unit_info['title']}\n\n"
    if work_unit_info['description_text']:
        feature_info += f"{work_unit_info['description_text']}\n\n"
    
    if work_unit_info['objectives']:
        feature_info += "**Key Capabilities:**\n\n"
        for line in work_unit_info['objectives'].split('\n'):
            if line.strip() and not line.strip().startswith('#'):
                feature_info += f"{line.strip()}\n"
        feature_info += "\n"
    
    # Add the feature section
    if "## Features" in content:
        content = content.replace("## Features", f"## Features\n\n{feature_info}")
    else:
        content += feature_info
    
    return content

def update_for_bugfix(content, work_unit_info):
    """Update documentation for a bug fix work unit."""
    # Check if there's a Bug Fixes section
    if "## Bug Fixes" not in content:
        content += "\n\n## Bug Fixes\n\n"
    
    # Add bug fix information
    bugfix_info = f"### {work_unit_info['title']}\n\n"
    if work_unit_info['description_text']:
        bugfix_info += f"{work_unit_info['description_text']}\n\n"
    
    # Add the bug fix section
    if "## Bug Fixes" in content:
        content = content.replace("## Bug Fixes", f"## Bug Fixes\n\n{bugfix_info}")
    else:
        content += bugfix_info
    
    return content

def update_generic(content, work_unit_info):
    """Generic update for documentation."""
    # Check if there's an Updates section
    if "## Updates" not in content:
        content += "\n\n## Updates\n\n"
    
    # Add update information
    update_info = f"### {work_unit_info['title']}\n\n"
    if work_unit_info['description_text']:
        update_info += f"{work_unit_info['description_text']}\n\n"
    
    if work_unit_info['objectives']:
        update_info += "**Key Changes:**\n\n"
        for line in work_unit_info['objectives'].split('\n'):
            if line.strip() and not line.strip().startswith('#'):
                update_info += f"{line.strip()}\n"
        update_info += "\n"
    
    # Add the update section
    if "## Updates" in content:
        content = content.replace("## Updates", f"## Updates\n\n{update_info}")
    else:
        content += update_info
    
    return content

def update_main_readme(work_unit_info, updated_docs, dry_run=False):
    """Update the main README.md file with information about the work unit."""
    readme_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "README.md")
    
    if not os.path.exists(readme_path):
        logger.warning(f"README.md not found at {readme_path}")
        return False
    
    with open(readme_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Create backup
    if not dry_run:
        backup_path = readme_path + '.bak'
        shutil.copy2(readme_path, backup_path)
        logger.info(f"Created backup of README.md at {backup_path}")
    
    # Check if there's a Recent Updates section
    if "## Recent Updates" not in content:
        # Find a good place to insert it (after introduction, before other sections)
        if "## Introduction" in content:
            content = content.replace("## Introduction", "## Introduction\n\n## Recent Updates\n\nThis section lists recent updates to the framework.\n\n")
        else:
            # Add at the end
            content += "\n\n## Recent Updates\n\nThis section lists recent updates to the framework.\n\n"
    
    # Add update information
    today = datetime.now().strftime('%Y-%m-%d')
    update_info = f"- **{today}**: {work_unit_info['title']} ({work_unit_info['id']})\n"
    
    # Add the update to the Recent Updates section
    if "## Recent Updates" in content:
        # Find the position after the section header and description
        section_match = re.search(r'## Recent Updates.*?\n\n', content, re.DOTALL)
        if section_match:
            insert_pos = section_match.end()
            content = content[:insert_pos] + update_info + content[insert_pos:]
        else:
            # Fallback: just replace the header
            content = content.replace("## Recent Updates", f"## Recent Updates\n\n{update_info}")
    
    # Update the Documentation section if it exists
    if "## Documentation" in content and updated_docs:
        doc_links = ""
        for doc_path in updated_docs:
            doc_name = os.path.basename(doc_path)
            doc_title = os.path.splitext(doc_name)[0].replace('_', ' ').title()
            rel_path = os.path.relpath(doc_path, os.path.dirname(readme_path))
            doc_links += f"- [{doc_title}]({rel_path})\n"
        
        # Find the Documentation section and add links if they don't exist
        doc_section = re.search(r'## Documentation.*?(?=^##|\Z)', content, re.MULTILINE | re.DOTALL)
        if doc_section:
            doc_content = doc_section.group(0)
            for doc_path in updated_docs:
                doc_name = os.path.basename(doc_path)
                if doc_name in doc_content:
                    # Link already exists
                    continue
                
                # Add the link
                doc_title = os.path.splitext(doc_name)[0].replace('_', ' ').title()
                rel_path = os.path.relpath(doc_path, os.path.dirname(readme_path))
                new_link = f"- [{doc_title}]({rel_path})\n"
                
                # Insert after the section header and description
                section_header_match = re.search(r'## Documentation.*?\n\n', doc_content, re.DOTALL)
                if section_header_match:
                    insert_pos = section_header_match.end() + doc_section.start()
                    content = content[:insert_pos] + new_link + content[insert_pos:]
    
    # Write updated README
    if not dry_run:
        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(content)
        logger.info(f"Updated README.md with information about {work_unit_info['id']}")
    else:
        logger.info(f"Would update README.md with information about {work_unit_info['id']}")
    
    return True

def update_documentation_for_work_unit(work_unit_id, dry_run=False):
    """Update documentation based on a specific work unit."""
    # Find the work unit file
    file_path = find_work_unit_file(work_unit_id)
    if not file_path:
        logger.error(f"Work unit {work_unit_id} not found")
        return False
    
    # Extract work unit information
    work_unit_info = extract_work_unit_info(file_path)
    if not work_unit_info['id']:
        logger.error(f"Could not extract ID from {file_path}")
        return False
    
    logger.info(f"Updating documentation for work unit {work_unit_id}: {work_unit_info['title']}")
    
    # Update documentation for each affected component
    updated_docs = []
    if work_unit_info['components']:
        for component in work_unit_info['components']:
            doc_path = update_component_documentation(component, work_unit_info, dry_run)
            updated_docs.append(doc_path)
    else:
        # If no components specified, update a generic documentation file
        generic_doc = os.path.join(DOCS_DIR, f"{work_unit_id.lower()}_documentation.md")
        with open(generic_doc, 'w', encoding='utf-8') as f:
            f.write(f"# {work_unit_info['title']}\n\n")
            if work_unit_info['description_text']:
                f.write(f"{work_unit_info['description_text']}\n\n")
            if work_unit_info['objectives']:
                f.write(f"## Objectives\n\n{work_unit_info['objectives']}\n\n")
            if work_unit_info['requirements']:
                f.write(f"## Requirements\n\n{work_unit_info['requirements']}\n\n")
        updated_docs.append(generic_doc)
        logger.info(f"Created generic documentation for {work_unit_id}: {generic_doc}")
    
    # Update the main README.md
    update_main_readme(work_unit_info, updated_docs, dry_run)
    
    logger.info(f"Documentation update for work unit {work_unit_id} completed successfully")
    return True

def main():
    parser = argparse.ArgumentParser(description='Update documentation based on completed work units.')
    parser.add_argument('--work-unit', help='Update documentation based on a specific work unit')
    parser.add_argument('--dry-run', action='store_true', help='Show changes without applying them')
    args = parser.parse_args()
    
    if args.work_unit:
        return update_documentation_for_work_unit(args.work_unit, args.dry_run)
    else:
        logger.error("No work unit specified. Use --work-unit WU_ID")
        return False

if __name__ == "__main__":
    sys.exit(0 if main() else 1)
