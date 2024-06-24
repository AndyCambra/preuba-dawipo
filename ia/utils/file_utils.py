import os
import shutil
import json
import logging
from typing import Dict, Any

# Crea una copia de seguridad del archivo dado.
def create_backup(file_path: str) -> str:
    backup_path = f"{file_path}.bak"
    shutil.copy2(file_path, backup_path)
    logging.info(f"Backup created: {backup_path}")
    return backup_path

# Compara dos archivos JSON y devuelve True si son diferentes.
def compare_json_files(file1: str, file2: str) -> bool:
    with open(file1, 'r') as f1, open(file2, 'r') as f2:
        return json.load(f1) != json.load(f2)

# Renombra un archivo de manera segura, creando los directorios necesarios.
def safe_rename(src: str, dst: str) -> None:
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    os.rename(src, dst)

# Realiza una copia de seguridad del archivo original y lo actualiza con nuevo contenido.
def backup_and_update_file(original_file: str, new_content: Dict[str, Any]) -> None:
    backup_path = create_backup(original_file)
    
    try:
        with open(original_file, 'w') as f:
            json.dump(new_content, f, indent=2)
        logging.info(f"File updated: {original_file}")
    except Exception as e:
        logging.error(f"Error updating file: {e}")
        safe_rename(backup_path, original_file)
        logging.info(f"Restored original file from backup")

# Resetea un archivo creando una copia de seguridad y luego vaciándolo.
def reset_file(file_path: str) -> None:
    create_backup(file_path)
    
    try:
        open(file_path, 'w').close()
        logging.info(f"File reset: {file_path}")
    except Exception as e:
        logging.error(f"Error resetting file: {e}")

# Asegura que un directorio exista, creándolo si es necesario.
def ensure_dir(directory: str) -> None:
    os.makedirs(directory, exist_ok=True)

# Carga un archivo JSON y devuelve su contenido como un diccionario.
def load_json(file_path: str) -> Dict[str, Any]:
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        logging.error(f"File not found: {file_path}")
        return {}
    except json.JSONDecodeError:
        logging.error(f"Invalid JSON in file: {file_path}")
        return {}

# Guarda un diccionario como un archivo JSON.
def save_json(file_path: str, data: Dict[str, Any]) -> None:
    ensure_dir(os.path.dirname(file_path))
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)
    logging.info(f"JSON saved to: {file_path}")