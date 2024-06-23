import os
import shutil
import json
import logging
from typing import Dict, Any

def create_backup(file_path: str) -> str:
    """Create a backup of the given file."""
    backup_path = f"{file_path}.bak"
    shutil.copy2(file_path, backup_path)
    logging.info(f"Backup created: {backup_path}")
    return backup_path

def compare_json_files(file1: str, file2: str) -> bool:
    """Compare two JSON files and return True if they are different."""
    with open(file1, 'r') as f1, open(file2, 'r') as f2:
        return json.load(f1) != json.load(f2)

def safe_rename(src: str, dst: str) -> None:
    """Safely rename a file, creating necessary directories."""
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    os.rename(src, dst)

def backup_and_update_file(original_file: str, new_content: Dict[str, Any]) -> None:
    """Backup the original file and update it with new content."""
    backup_path = create_backup(original_file)
    
    try:
        with open(original_file, 'w') as f:
            json.dump(new_content, f, indent=2)
        logging.info(f"File updated: {original_file}")
    except Exception as e:
        logging.error(f"Error updating file: {e}")
        safe_rename(backup_path, original_file)
        logging.info(f"Restored original file from backup")

def reset_file(file_path: str) -> None:
    """Reset a file by creating a backup and then emptying it."""
    create_backup(file_path)
    
    try:
        open(file_path, 'w').close()
        logging.info(f"File reset: {file_path}")
    except Exception as e:
        logging.error(f"Error resetting file: {e}")

def ensure_dir(directory: str) -> None:
    """Ensure that a directory exists, creating it if necessary."""
    os.makedirs(directory, exist_ok=True)

def load_json(file_path: str) -> Dict[str, Any]:
    """Load a JSON file and return its contents as a dictionary."""
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        logging.error(f"File not found: {file_path}")
        return {}
    except json.JSONDecodeError:
        logging.error(f"Invalid JSON in file: {file_path}")
        return {}

def save_json(file_path: str, data: Dict[str, Any]) -> None:
    """Save a dictionary as a JSON file."""
    ensure_dir(os.path.dirname(file_path))
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)
    logging.info(f"JSON saved to: {file_path}")