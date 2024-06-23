import json
import logging
from typing import List, Dict, Tuple
from transformers import T5Tokenizer
from torch.utils.data import DataLoader, TensorDataset

def load_data(training_files: List[str], validation_file: str) -> Tuple[List[Dict], List[Dict]]:
    training_data = []
    for training_file in training_files:
        with open(training_file, 'r') as f:
            training_data.extend(json.load(f))
    
    with open(validation_file, 'r') as f:
        validation_data = json.load(f)
    
    return training_data, validation_data

def load_unformatted_keys(file_path: str) -> Dict[str, int]:
    new_keys = {}
    try:
        with open(file_path, 'r') as file:
            for line in file:
                try:
                    key, freq = line.strip().split(':')
                    new_keys[key.strip()] = int(freq.strip())
                except ValueError:
                    logging.warning(f"Skipping invalid line: {line.strip()}")
    except FileNotFoundError:
        logging.error(f"File not found: {file_path}")
    except IOError:
        logging.error(f"Error reading file: {file_path}")
    return new_keys

def update_training_data(training_data: List[Dict], mapped_keys: Dict[str, str]) -> Tuple[List[Dict], bool]:
    updated = False
    for entry in training_data:
        input_keys = list(entry["input"].keys())
        for input_key in input_keys:
            if input_key in mapped_keys:
                new_input_key = mapped_keys[input_key]
                if new_input_key != input_key:
                    entry["input"][new_input_key] = entry["input"].pop(input_key)
                    updated = True
    return training_data, updated

def get_input_text(example: Dict) -> str:
    input_key = list(example["input"].keys())[0]
    input_value = example["input"][input_key]
    return f"translate {input_key} : {input_value} to target"

def get_target_text(example: Dict) -> str:
    target_key = list(example["output"].keys())[0]
    target_value = example["output"][target_key]
    return f"{target_key} : {target_value}"

def prepare_data(examples: List[Dict], tokenizer: T5Tokenizer, batch_size: int = 16) -> DataLoader:
    input_texts = [get_input_text(ex) for ex in examples]
    target_texts = [get_target_text(ex) for ex in examples]

    inputs = tokenizer(input_texts, return_tensors="pt", padding=True, truncation=True)
    targets = tokenizer(target_texts, return_tensors="pt", padding=True, truncation=True)

    data = TensorDataset(inputs.input_ids, targets.input_ids)
    return DataLoader(data, batch_size=batch_size, shuffle=True)