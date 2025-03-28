#!/usr/bin/env python3
"""
Project Analyzer Script

This script analyzes a project to identify its structure and technologies:
1. Scans the project directory to identify files and technologies
2. Generates initial documentation based on analysis
3. Creates initial work units for identified components
4. Sets up the framework structure for a new project

Usage:
    python project_analyzer.py --project-dir DIR [--dry-run]

Options:
    --project-dir DIR    Path to the project directory to analyze
    --dry-run            Show analysis without applying changes
"""

import os
import re
import sys
import json
import argparse
import logging
import subprocess
from datetime import datetime
from collections import Counter, defaultdict

# Import other triggers
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from work_unit_creation import create_work_unit

# Constants
FRAMEWORK_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGS_DIR = os.path.join(FRAMEWORK_DIR, "logs")
os.makedirs(LOGS_DIR, exist_ok=True)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(LOGS_DIR, 'project_analyzer.log')),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('project_analyzer')

# File extension to technology mapping
TECH_MAPPING = {
    '.py': 'Python',
    '.js': 'JavaScript',
    '.ts': 'TypeScript',
    '.jsx': 'React',
    '.tsx': 'React with TypeScript',
    '.html': 'HTML',
    '.css': 'CSS',
    '.scss': 'SASS',
    '.less': 'LESS',
    '.java': 'Java',
    '.c': 'C',
    '.cpp': 'C++',
    '.cs': 'C#',
    '.go': 'Go',
    '.rb': 'Ruby',
    '.php': 'PHP',
    '.swift': 'Swift',
    '.kt': 'Kotlin',
    '.rs': 'Rust',
    '.sh': 'Shell',
    '.bat': 'Batch',
    '.ps1': 'PowerShell',
    '.sql': 'SQL',
    '.md': 'Markdown',
    '.json': 'JSON',
    '.xml': 'XML',
    '.yaml': 'YAML',
    '.yml': 'YAML',
    '.toml': 'TOML',
    '.ini': 'INI',
    '.cfg': 'Configuration',
    '.conf': 'Configuration',
    '.dockerfile': 'Docker',
    '.tf': 'Terraform',
    '.ipynb': 'Jupyter Notebook'
}

# Framework indicators
FRAMEWORK_INDICATORS = {
    'django': ['django', 'settings.py', 'wsgi.py', 'asgi.py'],
    'flask': ['flask', 'app.py', 'application.py'],
    'fastapi': ['fastapi'],
    'react': ['react', 'jsx', 'tsx'],
    'angular': ['angular', 'component.ts'],
    'vue': ['vue', 'vue.js', 'vue.config.js'],
    'express': ['express', 'app.js', 'server.js'],
    'spring': ['spring', 'application.properties', 'application.yml'],
    'laravel': ['laravel', 'artisan'],
    'rails': ['rails', 'gemfile'],
    'dotnet': ['.csproj', '.sln'],
    'tensorflow': ['tensorflow', 'tf.'],
    'pytorch': ['torch', 'pytorch'],
    'docker': ['dockerfile', 'docker-compose'],
    'kubernetes': ['kubernetes', 'k8s', '.yaml', '.yml'],
}

def scan_project(project_dir):
    """Scan the project directory to identify files and technologies."""
    if not os.path.exists(project_dir):
        logger.error(f"Project directory not found: {project_dir}")
        return None
    
    logger.info(f"Scanning project directory: {project_dir}")
    
    # Initialize counters and collections
    file_extensions = Counter()
    technologies = Counter()
    directories = []
    framework_indicators = defaultdict(int)
    
    # Walk through the directory
    for root, dirs, files in os.walk(project_dir):
        # Skip hidden directories and common directories to ignore
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', 'venv', 'env', '__pycache__', 'dist', 'build']]
        
        # Process each file
        for file in files:
            # Skip hidden files
            if file.startswith('.'):
                continue
            
            file_path = os.path.join(root, file)
            _, ext = os.path.splitext(file.lower())
            
            # Count file extensions
            file_extensions[ext] += 1
            
            # Map to technologies
            if ext in TECH_MAPPING:
                technologies[TECH_MAPPING[ext]] += 1
            
            # Check for framework indicators
            for framework, indicators in FRAMEWORK_INDICATORS.items():
                for indicator in indicators:
                    if indicator in file.lower() or indicator in file_path.lower():
                        framework_indicators[framework] += 1
            
            # Check for specific files that indicate technologies
            if file.lower() == 'package.json':
                technologies['Node.js'] += 1
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        package_data = json.load(f)
                        dependencies = package_data.get('dependencies', {})
                        dev_dependencies = package_data.get('devDependencies', {})
                        all_deps = list(dependencies.keys()) + list(dev_dependencies.keys())
                        for dep in all_deps:
                            if dep in ['react', 'react-dom']:
                                technologies['React'] += 1
                            elif dep in ['@angular/core']:
                                technologies['Angular'] += 1
                            elif dep == 'vue':
                                technologies['Vue.js'] += 1
                            elif dep == 'express':
                                technologies['Express.js'] += 1
                except Exception as e:
                    logger.warning(f"Error parsing package.json: {e}")
            
            elif file.lower() == 'requirements.txt':
                technologies['Python'] += 1
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        requirements = f.read().lower()
                        if 'django' in requirements:
                            technologies['Django'] += 1
                        if 'flask' in requirements:
                            technologies['Flask'] += 1
                        if 'fastapi' in requirements:
                            technologies['FastAPI'] += 1
                        if 'tensorflow' in requirements or 'tf-' in requirements:
                            technologies['TensorFlow'] += 1
                        if 'torch' in requirements:
                            technologies['PyTorch'] += 1
                except Exception as e:
                    logger.warning(f"Error parsing requirements.txt: {e}")
            
            elif file.lower() == 'gemfile':
                technologies['Ruby'] += 1
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        gemfile = f.read().lower()
                        if 'rails' in gemfile:
                            technologies['Ruby on Rails'] += 1
                except Exception as e:
                    logger.warning(f"Error parsing Gemfile: {e}")
            
            elif file.lower() == 'pom.xml':
                technologies['Java'] += 1
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        pom = f.read().lower()
                        if 'springframework' in pom:
                            technologies['Spring'] += 1
                except Exception as e:
                    logger.warning(f"Error parsing pom.xml: {e}")
            
            elif file.lower() == 'dockerfile' or file.lower() == 'docker-compose.yml' or file.lower() == 'docker-compose.yaml':
                technologies['Docker'] += 1
        
        # Add this directory if it contains files
        if files:
            rel_path = os.path.relpath(root, project_dir)
            if rel_path != '.':
                directories.append(rel_path)
    
    # Determine primary frameworks
    frameworks = []
    for framework, count in framework_indicators.items():
        if count > 0:
            frameworks.append(framework)
    
    # Sort technologies by count
    top_technologies = [tech for tech, _ in technologies.most_common(10)]
    
    return {
        'file_extensions': file_extensions,
        'technologies': technologies,
        'top_technologies': top_technologies,
        'frameworks': frameworks,
        'directories': directories
    }

def generate_initial_documentation(project_dir, analysis, dry_run=False):
    """Generate initial documentation based on project analysis."""
    project_name = os.path.basename(os.path.abspath(project_dir))
    
    # Create .ai directory structure if it doesn't exist
    ai_dir = os.path.join(project_dir, '.ai')
    work_units_dir = os.path.join(ai_dir, 'work_units')
    docs_dir = os.path.join(project_dir, 'docs')
    
    if not dry_run:
        os.makedirs(ai_dir, exist_ok=True)
        os.makedirs(work_units_dir, exist_ok=True)
        os.makedirs(docs_dir, exist_ok=True)
    
    # Generate context.md
    context_content = f"# Project Context: {project_name}\n\n"
    context_content += f"## Project Overview\n\n"
    context_content += f"{project_name} is a project that uses the following technologies:\n\n"
    
    for tech in analysis['top_technologies']:
        context_content += f"- {tech}\n"
    
    if analysis['frameworks']:
        context_content += f"\n## Frameworks\n\n"
        for framework in analysis['frameworks']:
            context_content += f"- {framework.title()}\n"
    
    context_content += f"\n## Project Structure\n\n"
    for directory in sorted(analysis['directories'])[:20]:  # Limit to 20 directories to avoid overwhelming
        context_content += f"- {directory}\n"
    
    if len(analysis['directories']) > 20:
        context_content += f"- ... and {len(analysis['directories']) - 20} more directories\n"
    
    context_content += f"\n## Generated\n\n"
    context_content += f"This context file was automatically generated by the AI Documentation Framework's project analyzer on {datetime.now().strftime('%Y-%m-%d')}."
    
    context_file = os.path.join(ai_dir, 'context.md')
    if not dry_run:
        with open(context_file, 'w', encoding='utf-8') as f:
            f.write(context_content)
        logger.info(f"Generated context file: {context_file}")
    else:
        logger.info(f"Would generate context file: {context_file}")
    
    # Generate README.md if it doesn't exist
    readme_file = os.path.join(project_dir, 'README.md')
    if not os.path.exists(readme_file) and not dry_run:
        readme_content = f"# {project_name}\n\n"
        readme_content += f"## Overview\n\n"
        readme_content += f"{project_name} is a project that uses the following technologies:\n\n"
        
        for tech in analysis['top_technologies']:
            readme_content += f"- {tech}\n"
        
        readme_content += f"\n## Getting Started\n\n"
        readme_content += f"Instructions for setting up and running the project will be added here.\n\n"
        
        readme_content += f"\n## Documentation\n\n"
        readme_content += f"Detailed documentation can be found in the [docs](./docs) directory.\n\n"
        
        with open(readme_file, 'w', encoding='utf-8') as f:
            f.write(readme_content)
        logger.info(f"Generated README.md: {readme_file}")
    elif not os.path.exists(readme_file):
        logger.info(f"Would generate README.md: {readme_file}")
    
    return {
        'context_file': context_file,
        'readme_file': readme_file
    }

def create_initial_work_units(project_dir, analysis, dry_run=False):
    """Create initial work units based on project analysis."""
    created_work_units = []
    
    # Create a work unit for project documentation
    docs_work_unit = create_work_unit(
        "Initial Project Documentation",
        "Documentation",
        "Create comprehensive documentation for the project structure, technologies, and components.",
        dry_run
    )
    
    if docs_work_unit:
        created_work_units.append(docs_work_unit)
    
    # Create work units for each major technology or framework
    for tech in analysis['top_technologies'][:3]:  # Limit to top 3 technologies
        tech_work_unit = create_work_unit(
            f"{tech} Component Documentation",
            "Documentation",
            f"Document the {tech} components and their usage within the project.",
            dry_run
        )
        
        if tech_work_unit:
            created_work_units.append(tech_work_unit)
    
    # Create work units for each framework
    for framework in analysis['frameworks']:
        framework_work_unit = create_work_unit(
            f"{framework.title()} Framework Documentation",
            "Documentation",
            f"Document how the {framework.title()} framework is used in the project.",
            dry_run
        )
        
        if framework_work_unit:
            created_work_units.append(framework_work_unit)
    
    return created_work_units

def setup_framework_structure(project_dir, dry_run=False):
    """Set up the framework structure for a new project."""
    # Create necessary directories
    ai_dir = os.path.join(project_dir, '.ai')
    work_units_dir = os.path.join(ai_dir, 'work_units')
    scripts_dir = os.path.join(ai_dir, 'scripts')
    templates_dir = os.path.join(ai_dir, 'templates')
    logs_dir = os.path.join(ai_dir, 'logs')
    reports_dir = os.path.join(ai_dir, 'reports')
    
    if not dry_run:
        os.makedirs(ai_dir, exist_ok=True)
        os.makedirs(work_units_dir, exist_ok=True)
        os.makedirs(scripts_dir, exist_ok=True)
        os.makedirs(templates_dir, exist_ok=True)
        os.makedirs(logs_dir, exist_ok=True)
        os.makedirs(reports_dir, exist_ok=True)
    
    # Copy framework scripts
    framework_scripts_dir = os.path.join(FRAMEWORK_DIR, "scripts")
    if os.path.exists(framework_scripts_dir) and not dry_run:
        for script_file in os.listdir(framework_scripts_dir):
            if script_file.endswith('.py'):
                source = os.path.join(framework_scripts_dir, script_file)
                destination = os.path.join(scripts_dir, script_file)
                with open(source, 'r', encoding='utf-8') as src:
                    with open(destination, 'w', encoding='utf-8') as dst:
                        dst.write(src.read())
                logger.info(f"Copied script: {script_file}")
    
    # Copy framework templates
    framework_templates_dir = os.path.join(FRAMEWORK_DIR, "templates")
    if os.path.exists(framework_templates_dir) and not dry_run:
        for template_file in os.listdir(framework_templates_dir):
            if template_file.endswith('.md'):
                source = os.path.join(framework_templates_dir, template_file)
                destination = os.path.join(templates_dir, template_file)
                with open(source, 'r', encoding='utf-8') as src:
                    with open(destination, 'w', encoding='utf-8') as dst:
                        dst.write(src.read())
                logger.info(f"Copied template: {template_file}")
    
    # Create registry.md
    registry_file = os.path.join(work_units_dir, 'registry.md')
    if not dry_run:
        registry_content = "# Work Unit Registry\n\n"
        registry_content += "## Active Work Units\n\n"
        registry_content += "No active work units yet.\n\n"
        registry_content += "## Completed Work Units\n\n"
        registry_content += "No completed work units yet.\n\n"
        registry_content += "## Registry Maintenance\n\n"
        registry_content += "This registry is maintained to track all work units in the project.\n\n"
        registry_content += "## Last Updated\n\n"
        registry_content += datetime.now().strftime('%Y-%m-%d')
        
        with open(registry_file, 'w', encoding='utf-8') as f:
            f.write(registry_content)
        logger.info(f"Created registry file: {registry_file}")
    else:
        logger.info(f"Would create registry file: {registry_file}")
    
    return {
        'ai_dir': ai_dir,
        'work_units_dir': work_units_dir,
        'scripts_dir': scripts_dir,
        'templates_dir': templates_dir,
        'logs_dir': logs_dir,
        'reports_dir': reports_dir,
        'registry_file': registry_file
    }

def main():
    parser = argparse.ArgumentParser(description='Analyze a project and set up the AI Documentation Framework.')
    parser.add_argument('--project-dir', required=True, help='Path to the project directory to analyze')
    parser.add_argument('--dry-run', action='store_true', help='Show analysis without applying changes')
    args = parser.parse_args()
    
    project_dir = os.path.abspath(args.project_dir)
    
    # Scan project
    analysis = scan_project(project_dir)
    if not analysis:
        return False
    
    # Print analysis summary
    print("\n" + "="*80)
    print(f"PROJECT ANALYSIS SUMMARY: {os.path.basename(project_dir)}")
    print("="*80)
    print(f"Top Technologies:")
    for tech in analysis['top_technologies']:
        print(f"- {tech}")
    
    print(f"\nFrameworks:")
    if analysis['frameworks']:
        for framework in analysis['frameworks']:
            print(f"- {framework.title()}")
    else:
        print("- No frameworks detected")
    
    print(f"\nProject Structure:")
    for directory in sorted(analysis['directories'])[:10]:
        print(f"- {directory}")
    if len(analysis['directories']) > 10:
        print(f"- ... and {len(analysis['directories']) - 10} more directories")
    print("="*80)
    
    # Set up framework structure
    logger.info("Setting up framework structure")
    structure = setup_framework_structure(project_dir, args.dry_run)
    
    # Generate initial documentation
    logger.info("Generating initial documentation")
    docs = generate_initial_documentation(project_dir, analysis, args.dry_run)
    
    # Create initial work units
    logger.info("Creating initial work units")
    work_units = create_initial_work_units(project_dir, analysis, args.dry_run)
    
    logger.info(f"Project analysis and framework setup completed successfully")
    
    # Print setup summary
    print("\n" + "="*80)
    print(f"FRAMEWORK SETUP SUMMARY")
    print("="*80)
    print(f"Framework structure set up in: {project_dir}")
    print(f"Documentation generated:")
    print(f"- {docs['context_file']}")
    if os.path.exists(docs['readme_file']):
        print(f"- {docs['readme_file']} (already existed)")
    else:
        print(f"- {docs['readme_file']}")
    
    print(f"\nWork Units Created:")
    for wu in work_units:
        print(f"- {wu['id']}: {wu['title']}")
    
    print(f"\nNext Steps:")
    print(f"1. Review the generated documentation")
    print(f"2. Complete the initial work units")
    print(f"3. Run validation to ensure framework consistency")
    print("="*80)
    
    return True

if __name__ == "__main__":
    sys.exit(0 if main() else 1)
