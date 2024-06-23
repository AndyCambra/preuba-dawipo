import torch
from transformers import T5ForConditionalGeneration, T5Tokenizer
from ia.utils.data_utils import load_data, prepare_data
from ia.utils.model_utils import train_model, validate_model, save_model, get_device
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def retrain_model():
    logging.info("Starting incremental training process...")

    # File paths
    training_file = "ia/data/training_examples_updated.json"
    validation_file = "ia/data/training_validation.json"
    model_path = "ia/models/fine-tuned-t5-base"
    
    # Load data
    training_data, validation_data = load_data(training_file, validation_file)

    # Load pre-trained model and tokenizer
    device = get_device()
    model = T5ForConditionalGeneration.from_pretrained(model_path)
    tokenizer = T5Tokenizer.from_pretrained(model_path)
    model.to(device)

    # Prepare data loaders
    train_loader = prepare_data(training_data, tokenizer)
    val_loader = prepare_data(validation_data, tokenizer)

    # Set up optimizer with a lower learning rate for fine-tuning
    optimizer = torch.optim.AdamW(model.parameters(), lr=5e-5)

    # Training loop
    num_epochs = 3  # Fewer epochs for fine-tuning
    best_val_loss = float('inf')

    for epoch in range(num_epochs):
        logging.info(f"Epoch {epoch+1}/{num_epochs}")
        
        train_loss = train_model(model, train_loader, optimizer, device)
        logging.info(f"Training loss: {train_loss:.4f}")

        val_loss = validate_model(model, val_loader, device)
        logging.info(f"Validation loss: {val_loss:.4f}")

        if val_loss < best_val_loss:
            best_val_loss = val_loss
            save_model(model, tokenizer, model_path)
            logging.info("Model saved")

    logging.info("Incremental training completed.")

if __name__ == "__main__":
    retrain_model()