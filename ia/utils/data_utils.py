import json
import logging
from typing import List, Dict, Tuple
from transformers import T5Tokenizer
from torch.utils.data import DataLoader, TensorDataset
from ia.utils.file_utils import backup_and_update_file, compare_json_files, reset_file

# Carga los datos de entrenamiento y validación desde archivos JSON
def load_data(training_files: List[str], validation_file: str) -> Tuple[List[Dict], List[Dict]]:
    training_data = []
    # Itera sobre cada archivo de entrenamiento y carga los datos
    for training_file in training_files:
        with open(training_file, 'r') as f:
            training_data.extend(json.load(f))
    
    # Carga los datos de validación
    with open(validation_file, 'r') as f:
        validation_data = json.load(f)
    
    return training_data, validation_data

# Carga las claves no formateadas desde un archivo de texto
def load_unformatted_keys(file_path: str) -> Dict[str, int]:
    new_keys = {}
    try:
        # Abre el archivo y lee línea por línea
        with open(file_path, 'r') as file:
            for line in file:
                try:
                    # Divide cada línea en clave y frecuencia
                    key, freq = line.strip().split(':')
                    new_keys[key.strip()] = int(freq.strip())
                except ValueError:
                    # Si hay un error en el formato de la línea, se omite
                    logging.warning(f"Skipping invalid line: {line.strip()}")
    except FileNotFoundError:
        logging.error(f"File not found: {file_path}")
    except IOError:
        logging.error(f"Error reading file: {file_path}")
    return new_keys

# Actualiza los datos de entrenamiento con nuevas claves
def update_training_data(training_data: List[Dict], mapped_keys: Dict[str, str]) -> Tuple[List[Dict], bool]:
    updated = False
    # Itera sobre cada entrada en los datos de entrenamiento
    for entry in training_data:
        input_keys = list(entry["input"].keys())
        for input_key in input_keys:
            if input_key in mapped_keys:
                new_input_key = mapped_keys[input_key]
                if new_input_key != input_key:
                    # Actualiza la clave en la entrada
                    entry["input"][new_input_key] = entry["input"].pop(input_key)
                    updated = True
    return training_data, updated

# Obtiene el texto de entrada a partir de un ejemplo
def get_input_text(example: Dict) -> str:
    input_key = list(example["input"].keys())[0]
    input_value = example["input"][input_key]
    # Formatea el texto de entrada para el modelo
    return f"translate {input_key} : {input_value} to target"

# Obtiene el texto de salida a partir de un ejemplo
def get_target_text(example: Dict) -> str:
    target_key = list(example["output"].keys())[0]
    target_value = example["output"][target_key]
    # Formatea el texto de salida para el modelo
    return f"{target_key} : {target_value}"

# Prepara los datos para el entrenamiento
def prepare_data(examples: List[Dict], tokenizer: T5Tokenizer, batch_size: int = 16) -> DataLoader:
    # Obtiene los textos de entrada y salida de cada ejemplo
    input_texts = [get_input_text(ex) for ex in examples]
    target_texts = [get_target_text(ex) for ex in examples]

    # Tokeniza los textos de entrada y salida
    inputs = tokenizer(input_texts, return_tensors="pt", padding=True, truncation=True)
    targets = tokenizer(target_texts, return_tensors="pt", padding=True, truncation=True)

    # Crea un TensorDataset y un DataLoader
    data = TensorDataset(inputs.input_ids, targets.input_ids)
    return DataLoader(data, batch_size=batch_size, shuffle=True)

# Procesa los datos de entrenamiento y validación
def process_data(training_files: List[str], validation_file: str, unformatted_keys_file: str) -> tuple[List[Dict], List[Dict]]:
    # Carga los datos de entrenamiento y validación
    training_data, validation_data = load_data(training_files, validation_file)
    # Carga las nuevas claves no formateadas
    new_keys = load_unformatted_keys(unformatted_keys_file)
    mapped_keys = {key: key for key in new_keys}  # Sin mapeo de sinónimos
    # Actualiza los datos de entrenamiento con las nuevas claves
    updated_training_data, updated = update_training_data(training_data, mapped_keys)
    if not updated:
        logging.info("No updates made to the training data.")
        return training_data, validation_data

    # Guarda los datos de entrenamiento actualizados en un archivo temporal
    temp_file = "ia/data/training_examples_updated.json"
    with open(temp_file, "w") as f:
        json.dump(updated_training_data, f, indent=2)

    # Compara el archivo temporal con el archivo original y actualiza si hay cambios
    if compare_json_files(training_files[0], temp_file):
        backup_and_update_file(training_files[0], updated_training_data)
        reset_file(unformatted_keys_file)
        logging.info("Training data updated and unformatted keys reset.")
    else:
        logging.info("No changes detected in training data.")

    return updated_training_data, validation_data
