import os

def backup_and_reset_unformatted_keys(current_file_path):
    # Crear un nombre de archivo de respaldo fijo
    backup_file_path = f"{os.path.splitext(current_file_path)[0]}_prev{os.path.splitext(current_file_path)[1]}"
    
    # Si existe un archivo de respaldo anterior, elimínalo
    if os.path.exists(backup_file_path):
        os.remove(backup_file_path)
    
    # Renombrar el archivo actual al archivo de respaldo
    os.rename(current_file_path, backup_file_path)
    
    # Crear un nuevo archivo vacío en la ubicación original
    with open(current_file_path, 'w') as file:
        pass

    print(f"Archivo de claves no formateadas respaldado como: {backup_file_path}")

def backup_and_replace_training_json(original_file_path, new_file_path):
    # Crear un nombre de archivo de respaldo fijo
    backup_file_path = f"{os.path.splitext(original_file_path)[0]}_prev{os.path.splitext(original_file_path)[1]}"

    # Si existe un archivo de respaldo anterior, elimínalo
    if os.path.exists(backup_file_path):
        os.remove(backup_file_path)
    
    # Renombrar el archivo original al archivo de respaldo
    os.rename(original_file_path, backup_file_path)

    # Renombrar el nuevo archivo al nombre original
    os.rename(new_file_path, original_file_path)

    print(f"Archivo de entrenamiento respaldado como: {backup_file_path} y reemplazado por el nuevo archivo.")
