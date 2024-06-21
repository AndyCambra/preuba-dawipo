import json
import torch
from transformers import T5ForConditionalGeneration, T5Tokenizer
from ia.utils.data_utils import prepare_data
from ia.utils.model_utils import train_model, validate_model, save_model
from ia.utils.train_utils import preprocess_data
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def main():
    # Definir rutas de archivo
    training_file = "ia/data/training_examples.json"
    validation_file = "ia/data/training_validation.json"
    unformatted_keys_file = "ia/data/unformatted_keys.txt"

    # Preguntar si se debe realizar el reentrenamiento en base a sinónimos
    reentrenar = input("¿Desea realizar el reentrenamiento en base a sinónimos? (s/n): ").strip().lower()

    if reentrenar == 's':
        # Preprocesar los datos
        updated_training_data, validation_examples = preprocess_data(training_file, validation_file, unformatted_keys_file)

        # Guardar los datos de entrenamiento actualizados
        with open("ia/data/training_examples_updated.json", "w") as file:
            json.dump(updated_training_data, file)
    else:
        # Cargar los datos originales sin cambios
        with open(training_file, 'r') as file:
            updated_training_data = json.load(file)
        with open(validation_file, 'r') as file:
            validation_examples = json.load(file)

    # Preparar datos de entrenamiento y validación
    tokenizer = T5Tokenizer.from_pretrained("t5-base")
    train_loader = prepare_data(updated_training_data, tokenizer)
    val_loader = prepare_data(validation_examples, tokenizer)

    # Fine-Tuning del modelo
    model = T5ForConditionalGeneration.from_pretrained("t5-base")
    optimizer = torch.optim.AdamW(model.parameters(), lr=5e-5)

    num_epochs = 4
    patience = 3
    best_val_loss = float('inf')
    patience_counter = 0

    logging.info("Iniciando entrenamiento...")
    for epoch in range(num_epochs):
        avg_train_loss = train_model(model, train_loader, optimizer)
        logging.info(f"Epoch {epoch+1}: Training loss: {avg_train_loss}")

        avg_val_loss = validate_model(model, val_loader)
        logging.info(f"Epoch {epoch+1}: Validation loss: {avg_val_loss}")

        # Early stopping
        if avg_val_loss < best_val_loss:
            best_val_loss = avg_val_loss
            patience_counter = 0
            # Guardar el mejor modelo
            save_model(model, tokenizer, "ia/models/best-fine-tuned-t5-base")
        else:
            patience_counter += 1
            if patience_counter >= patience:
                logging.info("Early stopping triggered")
                break

    logging.info("Entrenamiento completado.")

if __name__ == "__main__":
    main()
