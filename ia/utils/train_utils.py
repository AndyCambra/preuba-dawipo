import json
import logging
import torch
from typing import Dict, List
from transformers import T5ForConditionalGeneration, T5Tokenizer
from utils.data_utils import load_data, load_unformatted_keys, update_training_data, prepare_data
from utils.file_utils import backup_and_update_file, compare_json_files, reset_file
from utils.model_utils import train_model, validate_model, save_model, get_device

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def initialize_model(model_name: str = "t5-base") -> tuple[T5ForConditionalGeneration, T5Tokenizer]:
    model = T5ForConditionalGeneration.from_pretrained(model_name)
    tokenizer = T5Tokenizer.from_pretrained(model_name)
    return model, tokenizer

def process_data(training_file: str, validation_file: str, unformatted_keys_file: str) -> tuple[List[Dict], List[Dict]]:
    training_data, validation_data = load_data(training_file, validation_file)
    new_keys = load_unformatted_keys(unformatted_keys_file)
    mapped_keys = {key: key for key in new_keys}  # No synonym mapping

    updated_training_data, updated = update_training_data(training_data, mapped_keys)
    if not updated:
        logging.info("No updates made to the training data.")
        return training_data, validation_data

    temp_file = "ia/data/training_examples_updated.json"
    with open(temp_file, "w") as f:
        json.dump(updated_training_data, f, indent=2)

    if compare_json_files(training_file, temp_file):
        backup_and_update_file(training_file, updated_training_data)
        reset_file(unformatted_keys_file)
        logging.info("Training data updated and unformatted keys reset.")
    else:
        logging.info("No changes detected in training data.")

    return updated_training_data, validation_data

def train(training_data: List[Dict], validation_data: List[Dict], model_save_path: str):
    device = get_device()
    model, tokenizer = initialize_model()
    model.to(device)

    train_loader = prepare_data(training_data, tokenizer)
    val_loader = prepare_data(validation_data, tokenizer)

    optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4)
    num_epochs = 5  # You may want to adjust this

    for epoch in range(num_epochs):
        train_loss = train_model(model, train_loader, optimizer, device)
        val_loss = validate_model(model, val_loader, device)
        logging.info(f"Epoch {epoch+1}/{num_epochs}, Train Loss: {train_loss:.4f}, Val Loss: {val_loss:.4f}")

    save_model(model, tokenizer, model_save_path)

def main():
    training_file = "ia/data/training_examples.json"
    validation_file = "ia/data/training_validation.json"
    unformatted_keys_file = "ia/data/unformatted_keys.txt"
    model_save_path = "ia/models/best-fine-tuned-t5-base"

    training_data, validation_data = process_data(training_file, validation_file, unformatted_keys_file)
    train(training_data, validation_data, model_save_path)

if __name__ == "__main__":
    main()