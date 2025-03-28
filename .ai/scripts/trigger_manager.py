#!/usr/bin/env python3
"""
Trigger Manager Script

This script provides a central interface to execute all framework triggers:
1. Work Unit Creation Trigger
2. Work Unit Update Trigger
3. Work Unit Completion Trigger
4. Registry Update Trigger
5. Validation Trigger
6. Documentation Update Trigger
7. Project Analysis Trigger
8. Scheduled Maintenance Trigger
9. Work Unit Validation Trigger
10. Work Unit Status Update Trigger

Usage:
    python trigger_manager.py --trigger TRIGGER_NAME [--args ARGS]

Options:
    --trigger TRIGGER_NAME    Name of the trigger to execute
    --args ARGS               Arguments to pass to the trigger script
"""

import os
import sys
import argparse
import logging
import subprocess
from datetime import datetime

# Constants
SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
LOGS_DIR = os.path.join(os.path.dirname(SCRIPTS_DIR), "logs")
os.makedirs(LOGS_DIR, exist_ok=True)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(LOGS_DIR, 'trigger_manager.log')),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('trigger_manager')

# Trigger definitions
TRIGGERS = {
    'work_unit_creation': {
        'script': 'work_unit_creation.py',
        'description': 'Create a new work unit',
        'example': '--title "New Work Unit" --type Enhancement --description "Description of the work unit"'
    },
    'work_unit_update': {
        'script': 'work_unit_update.py',
        'description': 'Update an existing work unit',
        'example': '--work-unit WU-001 --status "In Progress" --completion "50%"'
    },
    'work_unit_completion': {
        'script': 'work_unit_completion.py',
        'description': 'Mark a work unit as completed',
        'example': '--work-unit WU-001'
    },
    'work_unit_status_update': {
        'script': 'work_unit_status_update.py',
        'description': 'Update the status of a specific task in a work unit',
        'example': '--work-unit WU-001 --task "1.2" --status "In Progress" --completion "25" --message "Completed initial analysis"'
    },
    'registry_update': {
        'script': 'registry_updater.py',
        'description': 'Update the work unit registry',
        'example': ''
    },
    'validation': {
        'script': 'registry_validator.py',
        'description': 'Validate the work unit registry',
        'example': '--fix'
    },
    'documentation_update': {
        'script': 'documentation_updater.py',
        'description': 'Update documentation based on work unit changes',
        'example': '--work-unit WU-001'
    },
    'project_analysis': {
        'script': 'project_analyzer.py',
        'description': 'Analyze a project and set up the framework',
        'example': '--project-dir /path/to/project'
    },
    'scheduled_maintenance': {
        'script': 'scheduled_validation.py',
        'description': 'Run scheduled maintenance tasks',
        'example': '--fix'
    },
    'work_unit_validation': {
        'script': 'work_unit_validator.py',
        'description': 'Validate work units for progress tracking compliance',
        'example': '--work-unit WU-001 --fix'
    }
}

def execute_trigger(trigger_name, args=None):
    """Execute a specific trigger with the given arguments."""
    if trigger_name not in TRIGGERS:
        logger.error(f"Unknown trigger: {trigger_name}")
        print(f"Unknown trigger: {trigger_name}")
        print(f"Available triggers: {', '.join(TRIGGERS.keys())}")
        return False
    
    trigger = TRIGGERS[trigger_name]
    script_path = os.path.join(SCRIPTS_DIR, trigger['script'])
    
    if not os.path.exists(script_path):
        logger.error(f"Trigger script not found: {script_path}")
        print(f"Trigger script not found: {script_path}")
        return False
    
    # Build command
    cmd = [sys.executable, script_path]
    if args:
        cmd.extend(args.split())
    
    logger.info(f"Executing trigger: {trigger_name}")
    logger.info(f"Command: {' '.join(cmd)}")
    
    # Execute command
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        # Log output
        if result.stdout:
            logger.info(f"Output:\n{result.stdout}")
            print(result.stdout)
        
        if result.stderr:
            logger.warning(f"Error output:\n{result.stderr}")
            print(result.stderr)
        
        if result.returncode != 0:
            logger.error(f"Trigger execution failed with code {result.returncode}")
            print(f"Trigger execution failed with code {result.returncode}")
            return False
        
        logger.info(f"Trigger execution completed successfully")
        return True
    
    except Exception as e:
        logger.error(f"Error executing trigger: {e}")
        print(f"Error executing trigger: {e}")
        return False

def list_triggers():
    """List all available triggers with descriptions and examples."""
    print("\nAvailable Triggers:\n")
    
    for name, info in TRIGGERS.items():
        print(f"{name}:")
        print(f"  Description: {info['description']}")
        print(f"  Script: {info['script']}")
        if info['example']:
            print(f"  Example: python trigger_manager.py --trigger {name} --args \"{info['example']}\"")
        else:
            print(f"  Example: python trigger_manager.py --trigger {name}")
        print()

def main():
    parser = argparse.ArgumentParser(description='Execute framework triggers.')
    parser.add_argument('--trigger', help='Name of the trigger to execute')
    parser.add_argument('--args', help='Arguments to pass to the trigger script')
    parser.add_argument('--list', action='store_true', help='List all available triggers')
    args = parser.parse_args()
    
    if args.list or not args.trigger:
        list_triggers()
        return True
    
    return execute_trigger(args.trigger, args.args)

if __name__ == "__main__":
    sys.exit(0 if main() else 1)
