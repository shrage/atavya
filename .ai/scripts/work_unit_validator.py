#!/usr/bin/env python3
"""
Work Unit Validator Script

This script validates work units to ensure they follow the progress tracking protocol:
1. Verifies that all requirements have completion tracking
2. Calculates overall work unit completion based on individual requirements
3. Validates that work unit status is consistent with requirement completion
4. Generates warnings for any inconsistencies

Usage:
    python work_unit_validator.py [--work-unit WU_ID] [--fix] [--all]

Options:
    --work-unit WU_ID   Validate a specific work unit
    --fix               Automatically fix inconsistencies
    --all               Validate all work units
"""

import os
import re
import sys
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
        logging.FileHandler(os.path.join(LOGS_DIR, 'work_unit_validator.log')),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('work_unit_validator')

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

def extract_requirements(content):
    """Extract all requirements from a work unit file."""
    requirements = []
    
    # Find all requirement blocks
    requirement_pattern = re.compile(r'####\s+\d+\.\d+\s+[^\n]+\n((?:- \*\*[^\n]+\n)+)', re.MULTILINE)
    for req_match in requirement_pattern.finditer(content):
        req_block = req_match.group(1)
        
        # Extract requirement metadata
        status_match = re.search(r'- \*\*Status\*\*:\s*([^\n]+)', req_block)
        completion_match = re.search(r'- \*\*Completion\*\*:\s*([^\n]+)', req_block)
        
        requirement = {
            'block': req_block,
            'status': status_match.group(1).strip() if status_match else None,
            'completion': completion_match.group(1).strip() if completion_match else None,
        }
        
        requirements.append(requirement)
    
    return requirements

def extract_work_unit_metadata(content):
    """Extract metadata from a work unit file."""
    id_match = re.search(r'^\s*-\s*\*\*ID\*\*:\s*([^\n]+)', content, re.MULTILINE)
    status_match = re.search(r'^\s*-\s*\*\*Status\*\*:\s*([^\n]+)', content, re.MULTILINE)
    completion_match = re.search(r'^\s*-\s*\*\*Completion\*\*:\s*([^\n]+)', content, re.MULTILINE)
    
    return {
        'id': id_match.group(1).strip() if id_match else None,
        'status': status_match.group(1).strip() if status_match else None,
        'completion': completion_match.group(1).strip() if completion_match else None,
    }

def calculate_completion_percentage(requirements):
    """Calculate the overall completion percentage based on individual requirements."""
    if not requirements:
        return 0
    
    completed = 0
    for req in requirements:
        if req['completion'] and req['completion'] == 'Completed':
            completed += 1
    
    return int((completed / len(requirements)) * 100)

def validate_work_unit(file_path, fix=False):
    """Validate a work unit file for progress tracking compliance."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract work unit ID for logging
    id_match = re.search(r'^\s*-\s*\*\*ID\*\*:\s*([^\n]+)', content, re.MULTILINE)
    work_unit_id = id_match.group(1).strip() if id_match else os.path.basename(file_path)
    
    # Extract requirements and metadata
    requirements = extract_requirements(content)
    metadata = extract_work_unit_metadata(content)
    
    issues = []
    
    # Check if all requirements have completion tracking
    for i, req in enumerate(requirements):
        if not req['completion']:
            issues.append({
                'type': 'missing_completion',
                'message': f"Requirement {i+1} is missing completion tracking",
                'requirement': req
            })
    
    # Calculate expected completion percentage
    expected_completion = calculate_completion_percentage(requirements)
    
    # Check if work unit completion matches calculated value
    if metadata['completion']:
        try:
            current_completion = int(metadata['completion'].replace('%', ''))
            if current_completion != expected_completion:
                issues.append({
                    'type': 'completion_mismatch',
                    'message': f"Work unit completion is {current_completion}%, but calculated value is {expected_completion}%",
                    'current': current_completion,
                    'expected': expected_completion
                })
        except ValueError:
            issues.append({
                'type': 'invalid_completion',
                'message': f"Work unit completion '{metadata['completion']}' is not a valid percentage",
                'expected': expected_completion
            })
    else:
        issues.append({
            'type': 'missing_work_unit_completion',
            'message': f"Work unit is missing completion percentage",
            'expected': expected_completion
        })
    
    # Check if status is consistent with completion
    if requirements and all(req['completion'] == 'Completed' for req in requirements if req['completion']):
        if metadata['status'] != 'Completed':
            issues.append({
                'type': 'status_inconsistency',
                'message': f"All requirements are completed, but work unit status is '{metadata['status']}' instead of 'Completed'",
                'current': metadata['status'],
                'expected': 'Completed'
            })
    
    if requirements and all(req['completion'] == 'Not Completed' for req in requirements if req['completion']):
        if metadata['status'] == 'Completed':
            issues.append({
                'type': 'status_inconsistency',
                'message': f"No requirements are completed, but work unit status is 'Completed'",
                'current': metadata['status'],
                'expected': 'Proposed or In Progress'
            })
    
    # Fix issues if requested
    if fix and issues:
        updated_content = content
        
        # Fix missing completion tracking
        for issue in [i for i in issues if i['type'] == 'missing_completion']:
            req_block = issue['requirement']['block']
            updated_req_block = req_block.replace('- **Status**:', '- **Status**:\n- **Completion**: Not Completed')
            updated_content = updated_content.replace(req_block, updated_req_block)
        
        # Fix work unit completion percentage
        if any(i['type'] in ['completion_mismatch', 'invalid_completion', 'missing_work_unit_completion'] for i in issues):
            if metadata['completion']:
                updated_content = re.sub(
                    r'(^\s*-\s*\*\*Completion\*\*:)\s*([^\n]+)',
                    f'\\1 {expected_completion}%',
                    updated_content,
                    flags=re.MULTILINE
                )
            else:
                # Add completion after status
                updated_content = re.sub(
                    r'(^\s*-\s*\*\*Status\*\*:[^\n]+)',
                    f'\\1\n- **Completion**: {expected_completion}%',
                    updated_content,
                    flags=re.MULTILINE
                )
        
        # Fix status inconsistency
        for issue in [i for i in issues if i['type'] == 'status_inconsistency']:
            if issue['expected'] == 'Completed':
                updated_content = re.sub(
                    r'(^\s*-\s*\*\*Status\*\*:)\s*([^\n]+)',
                    '\\1 Completed',
                    updated_content,
                    flags=re.MULTILINE
                )
            elif issue['current'] == 'Completed':
                updated_content = re.sub(
                    r'(^\s*-\s*\*\*Status\*\*:)\s*([^\n]+)',
                    '\\1 In Progress',
                    updated_content,
                    flags=re.MULTILINE
                )
        
        # Write updated content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        logger.info(f"Fixed {len(issues)} issues in {work_unit_id}")
    
    return {
        'work_unit_id': work_unit_id,
        'file_path': file_path,
        'issues': issues,
        'requirements_count': len(requirements),
        'completion_percentage': expected_completion
    }

def validate_all_work_units(fix=False):
    """Validate all work units in the work_units directory."""
    results = []
    
    for filename in os.listdir(WORK_UNITS_DIR):
        if filename.endswith('.md') and filename != 'registry.md' and filename != 'project_tracker.md':
            file_path = os.path.join(WORK_UNITS_DIR, filename)
            result = validate_work_unit(file_path, fix)
            results.append(result)
    
    return results

def generate_report(results):
    """Generate a human-readable validation report."""
    report = "# Work Unit Validation Report\n\n"
    report += f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
    
    # Count total issues
    total_issues = sum(len(result['issues']) for result in results)
    
    if total_issues == 0:
        report += "No issues found. All work units follow the progress tracking protocol.\n\n"
    else:
        report += f"Found {total_issues} issues across {len([r for r in results if r['issues']])} work units:\n\n"
        
        for result in results:
            if result['issues']:
                report += f"## {result['work_unit_id']}\n\n"
                for issue in result['issues']:
                    report += f"- {issue['message']}\n"
                report += "\n"
    
    # Summary statistics
    report += "## Summary Statistics\n\n"
    report += f"- Total work units: {len(results)}\n"
    report += f"- Work units with issues: {len([r for r in results if r['issues']])}\n"
    report += f"- Total requirements: {sum(result['requirements_count'] for result in results)}\n"
    
    # Average completion
    if results:
        avg_completion = sum(result['completion_percentage'] for result in results) / len(results)
        report += f"- Average completion: {avg_completion:.1f}%\n"
    
    return report

def main():
    parser = argparse.ArgumentParser(description='Validate work units for progress tracking compliance.')
    parser.add_argument('--work-unit', help='Validate a specific work unit')
    parser.add_argument('--fix', action='store_true', help='Automatically fix inconsistencies')
    parser.add_argument('--all', action='store_true', help='Validate all work units')
    args = parser.parse_args()
    
    if args.work_unit:
        # Validate a specific work unit
        file_path = find_work_unit_file(args.work_unit)
        if not file_path:
            logger.error(f"Work unit {args.work_unit} not found")
            return False
        
        result = validate_work_unit(file_path, args.fix)
        results = [result]
    elif args.all or not args.work_unit:
        # Validate all work units
        results = validate_all_work_units(args.fix)
    else:
        logger.error("No work unit specified. Use --work-unit WU_ID or --all")
        return False
    
    # Generate and print report
    report = generate_report(results)
    print(report)
    
    # Save report
    report_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "reports")
    os.makedirs(report_dir, exist_ok=True)
    
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    report_file = os.path.join(report_dir, f'work_unit_validation_{timestamp}.md')
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report)
    logger.info(f"Validation report saved to {report_file}")
    
    return len([r for r in results if r['issues']]) == 0

if __name__ == "__main__":
    sys.exit(0 if main() else 1)
