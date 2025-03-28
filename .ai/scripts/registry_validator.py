#!/usr/bin/env python3
"""
Registry Validator Script

This script validates the consistency between work unit files and the registry.md file.
It identifies missing or outdated registry entries, orphaned work units, and inconsistent relationships.

Usage:
    python registry_validator.py [--fix] [--report-file REPORT_FILE]

Options:
    --fix               Automatically fix inconsistencies
    --report-file FILE  Save the validation report to a file
"""

import os
import re
import sys
import json
import argparse
from datetime import datetime

# Import the registry updater to reuse functions
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from registry_updater import scan_work_units, extract_metadata, WORK_UNITS_DIR, REGISTRY_FILE

# Regular expressions for parsing registry.md
REGISTRY_ENTRY_PATTERN = re.compile(r'###\s+([^:]+):\s+([^\n]+)\n((?:\s*-\s*\*\*[^\n]+\n)+)', re.MULTILINE)
REGISTRY_METADATA_PATTERN = re.compile(r'\s*-\s*\*\*([^:]+)\*\*:\s*([^\n]+)', re.MULTILINE)

def parse_registry():
    """Parse the registry.md file and extract work unit entries."""
    if not os.path.exists(REGISTRY_FILE):
        return []
    
    with open(REGISTRY_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    registry_entries = []
    for match in REGISTRY_ENTRY_PATTERN.finditer(content):
        id_value = match.group(1).strip()
        description = match.group(2).strip()
        metadata_block = match.group(3)
        
        metadata = {'id': id_value, 'description': description}
        for meta_match in REGISTRY_METADATA_PATTERN.finditer(metadata_block):
            key = meta_match.group(1).strip().lower()
            value = meta_match.group(2).strip()
            metadata[key] = value
        
        registry_entries.append(metadata)
    
    return registry_entries

def validate_registry():
    """Validate the registry against work unit files and identify inconsistencies."""
    work_units = scan_work_units()
    registry_entries = parse_registry()
    
    # Create dictionaries for easier lookup
    work_units_dict = {wu['id']: wu for wu in work_units if wu['id']}
    registry_dict = {entry['id']: entry for entry in registry_entries if 'id' in entry}
    
    issues = []
    
    # Check for missing registry entries
    for wu_id, wu in work_units_dict.items():
        if wu_id not in registry_dict:
            issues.append({
                'type': 'missing_entry',
                'severity': 'high',
                'message': f"Work unit {wu_id} exists but is not in the registry",
                'work_unit': wu
            })
    
    # Check for outdated registry entries
    for wu_id in set(work_units_dict.keys()) & set(registry_dict.keys()):
        wu = work_units_dict[wu_id]
        reg_entry = registry_dict[wu_id]
        
        # Check for status mismatch
        if 'status' in wu and 'status' in reg_entry and wu['status'] != reg_entry['status']:
            issues.append({
                'type': 'status_mismatch',
                'severity': 'medium',
                'message': f"Status mismatch for {wu_id}: {wu['status']} (file) vs {reg_entry['status']} (registry)",
                'work_unit': wu,
                'registry_entry': reg_entry
            })
        
        # Check for completion mismatch
        if 'completion' in wu and 'completion' in reg_entry and wu['completion'] != reg_entry['completion']:
            issues.append({
                'type': 'completion_mismatch',
                'severity': 'medium',
                'message': f"Completion mismatch for {wu_id}: {wu['completion']} (file) vs {reg_entry['completion']} (registry)",
                'work_unit': wu,
                'registry_entry': reg_entry
            })
        
        # Check for description mismatch
        if 'description' in wu and 'description' in reg_entry and wu['description'] != reg_entry['description']:
            issues.append({
                'type': 'description_mismatch',
                'severity': 'low',
                'message': f"Description mismatch for {wu_id}: '{wu['description']}' (file) vs '{reg_entry['description']}' (registry)",
                'work_unit': wu,
                'registry_entry': reg_entry
            })
    
    # Check for orphaned registry entries
    for reg_id, reg_entry in registry_dict.items():
        if reg_id not in work_units_dict:
            issues.append({
                'type': 'orphaned_entry',
                'severity': 'high',
                'message': f"Registry entry {reg_id} exists but the work unit file is missing",
                'registry_entry': reg_entry
            })
    
    # Check for relationship consistency
    for wu_id, wu in work_units_dict.items():
        if 'relationship' in wu and wu['relationship'].startswith('Related to '):
            related_id = wu['relationship'].replace('Related to ', '').strip()
            if related_id not in work_units_dict:
                issues.append({
                    'type': 'invalid_relationship',
                    'severity': 'medium',
                    'message': f"Work unit {wu_id} references non-existent work unit {related_id}",
                    'work_unit': wu
                })
    
    return issues

def fix_issues(issues):
    """Automatically fix identified issues."""
    from registry_updater import update_registry
    
    # For now, we'll just update the registry which will fix most issues
    update_registry(check_only=False)
    
    # Return the number of issues that were fixed
    return len([issue for issue in issues if issue['type'] in ['missing_entry', 'status_mismatch', 'completion_mismatch', 'description_mismatch']])

def generate_report(issues):
    """Generate a human-readable validation report."""
    if not issues:
        return "No issues found. Registry is consistent with work unit files."
    
    report = "# Registry Validation Report\n\n"
    report += f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
    
    # Group issues by severity
    high_issues = [issue for issue in issues if issue['severity'] == 'high']
    medium_issues = [issue for issue in issues if issue['severity'] == 'medium']
    low_issues = [issue for issue in issues if issue['severity'] == 'low']
    
    report += f"Found {len(issues)} issues:\n"
    report += f"- {len(high_issues)} high severity\n"
    report += f"- {len(medium_issues)} medium severity\n"
    report += f"- {len(low_issues)} low severity\n\n"
    
    # Report high severity issues
    if high_issues:
        report += "## High Severity Issues\n\n"
        for issue in high_issues:
            report += f"- {issue['message']}\n"
        report += "\n"
    
    # Report medium severity issues
    if medium_issues:
        report += "## Medium Severity Issues\n\n"
        for issue in medium_issues:
            report += f"- {issue['message']}\n"
        report += "\n"
    
    # Report low severity issues
    if low_issues:
        report += "## Low Severity Issues\n\n"
        for issue in low_issues:
            report += f"- {issue['message']}\n"
        report += "\n"
    
    report += "## Recommended Actions\n\n"
    report += "1. Run `python registry_validator.py --fix` to automatically fix most issues\n"
    report += "2. Manually review any remaining issues, especially relationship inconsistencies\n"
    
    return report

def main():
    parser = argparse.ArgumentParser(description='Validate the work unit registry.')
    parser.add_argument('--fix', action='store_true', help='Automatically fix inconsistencies')
    parser.add_argument('--report-file', help='Save the validation report to a file')
    args = parser.parse_args()
    
    issues = validate_registry()
    
    if args.fix:
        fixed_count = fix_issues(issues)
        print(f"Fixed {fixed_count} issues.")
        # Re-validate to see if any issues remain
        issues = validate_registry()
    
    report = generate_report(issues)
    print(report)
    
    if args.report_file:
        with open(args.report_file, 'w', encoding='utf-8') as f:
            f.write(report)
        print(f"Report saved to {args.report_file}")
    
    return len(issues) == 0

if __name__ == "__main__":
    sys.exit(0 if main() else 1)
