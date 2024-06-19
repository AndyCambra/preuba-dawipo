import json
import logging
import os
from ..utils.data_utils import load_data
from ..utils.synonyms import build_synonym_dict, map_keys
from ..utils.file_utils import backup_and_reset_unformatted_keys, backup_and_replace_training_json

# Configurar logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Leer el archivo de claves sin formatear
def load_unformatted_keys(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
    new_keys = {}
    for line in lines:
        key, freq = line.split(':')
        new_keys[key.strip()] = int(freq.strip())
    return new_keys

# Actualizar el conjunto de entrenamiento con las nuevas claves mapeadas
def update_training_data(training_data, mapped_keys):
    updated = False
    for entry in training_data:
        for input_key in list(entry["input"].keys()):
            if input_key in mapped_keys:
                new_input_key = mapped_keys[input_key]
                if new_input_key != input_key:
                    entry["input"][new_input_key] = entry["input"].pop(input_key)
                    updated = True
    return training_data, updated

# Comparar dos archivos JSON y reportar cambios
def compare_json_files(original_file, updated_file):
    with open(original_file, 'r') as file1, open(updated_file, 'r') as file2:
        original_data = json.load(file1)
        updated_data = json.load(file2)
    
    if original_data == updated_data:
        logging.info("No changes detected in the training examples.")
        return False
    else:
        logging.info("Changes detected in the training examples.")
        return True

def preprocess_data(training_file, validation_file, unformatted_keys_file):
    # Cargar datos de entrenamiento y validación
    training_examples, validation_examples = load_data(training_file, validation_file)

    # Cargar el archivo de claves sin formatear
    new_keys = load_unformatted_keys(unformatted_keys_file)

    # Construir el diccionario de sinónimos
    synonym_dict = build_synonym_dict(training_file)

    # Mapear las claves nuevas a las existentes
    mapped_keys = map_keys(new_keys, synonym_dict, threshold=0.7)  # Ajustar el umbral
    logging.info("Mapped keys: %s", mapped_keys)

    # Actualizar el conjunto de entrenamiento
    updated_training_data, updated = update_training_data(training_examples, mapped_keys)

    if not updated:
        logging.info("No updates made to the training data.")
        return training_examples, validation_examples

    # Guardar los datos de entrenamiento actualizados temporalmente
    temp_training_file = "ia/data/training_examples_updated.json"
    with open(temp_training_file, "w") as file:
        json.dump(updated_training_data, file)

    changes_detected = False
    try:
        # Comparar archivos JSON y reportar cambios
        changes_detected = compare_json_files(training_file, temp_training_file)

        # Respaldar el archivo de entrenamiento original y reemplazarlo por el nuevo si hay cambios
        if changes_detected:
            backup_and_replace_training_json(training_file, temp_training_file)
            # Respaldo y reseteo del archivo de claves sin formatear solo si hubo cambios
            backup_and_reset_unformatted_keys(unformatted_keys_file)
    finally:
        # Ensure the temporary file is deleted
        try:
            if os.path.exists(temp_training_file):
                os.remove(temp_training_file)
                logging.info("Deleted the temporary file after processing.")
            else:
                logging.warning(f"The temporary file {temp_training_file} does not exist.")
        except Exception as e:
            logging.error(f"Failed to delete the temporary file {temp_training_file}: {e}")

    return updated_training_data, validation_examples

