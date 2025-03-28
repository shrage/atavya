#!/usr/bin/env python3
"""
Scheduled Validation Script

This script runs scheduled validation checks on the framework and generates reports.
It can be set up as a cron job or scheduled task to run periodically.

Usage:
    python scheduled_validation.py [--fix] [--report-dir REPORT_DIR]

Options:
    --fix                Automatically fix inconsistencies
    --report-dir DIR     Directory to save validation reports (default: ../logs)
"""

import os
import sys
import argparse
import logging
from datetime import datetime

# Import validation scripts
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import registry_validator
import registry_updater

# Set up logging
LOGS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logs")
os.makedirs(LOGS_DIR, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(LOGS_DIR, 'scheduled_validation.log')),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('scheduled_validation')

def run_registry_validation(fix=False, report_dir=None):
    """Run registry validation and generate a report."""
    logger.info("Running registry validation...")
    
    issues = registry_validator.validate_registry()
    
    if fix:
        logger.info("Fixing registry issues...")
        fixed_count = registry_validator.fix_issues(issues)
        logger.info(f"Fixed {fixed_count} registry issues.")
        # Re-validate to see if any issues remain
        issues = registry_validator.validate_registry()
    
    report = registry_validator.generate_report(issues)
    
    if report_dir:
        os.makedirs(report_dir, exist_ok=True)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        report_file = os.path.join(report_dir, f'registry_validation_{timestamp}.md')
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write(report)
        logger.info(f"Registry validation report saved to {report_file}")
    
    if issues:
        logger.warning(f"Found {len(issues)} registry issues.")
    else:
        logger.info("No registry issues found.")
    
    return len(issues) == 0

def run_all_validations(fix=False, report_dir=None):
    """Run all validation checks."""
    logger.info("Starting scheduled validation...")
    
    # Set default report directory if not specified
    if not report_dir:
        report_dir = LOGS_DIR
    
    # Run registry validation
    registry_valid = run_registry_validation(fix, report_dir)
    
    # Add more validation checks here as they are developed
    
    # Log summary
    if registry_valid:
        logger.info("All validation checks passed.")
    else:
        logger.warning("Some validation checks failed. See reports for details.")
    
    return registry_valid

def main():
    parser = argparse.ArgumentParser(description='Run scheduled validation checks.')
    parser.add_argument('--fix', action='store_true', help='Automatically fix inconsistencies')
    parser.add_argument('--report-dir', help='Directory to save validation reports')
    args = parser.parse_args()
    
    return run_all_validations(args.fix, args.report_dir)

if __name__ == "__main__":
    sys.exit(0 if main() else 1)
