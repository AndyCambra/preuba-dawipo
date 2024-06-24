import logging
from ia.utils.train_utils import train
from ia.config import TRAINING_FILES, VALIDATION_FILE, MODEL_PATH, LEARNING_RATE, NUM_EPOCHS, BATCH_SIZE, LOG_FORMAT, LOG_LEVEL, PATIENCE

# Configura el logging con el nivel y formato especificados en la configuración
logging.basicConfig(level=LOG_LEVEL, format=LOG_FORMAT)

def main():
    # Inicia el proceso de entrenamiento
    logging.info("Starting training process...")
    
    # Llama a la función de entrenamiento con los parámetros especificados
    train(
        TRAINING_FILES,
        VALIDATION_FILE,
        MODEL_PATH,
        learning_rate=LEARNING_RATE,
        num_epochs=NUM_EPOCHS,
        batch_size=BATCH_SIZE,
        patience=PATIENCE
    )
    
    # Indica que el entrenamiento ha sido completado
    logging.info("Training completed.")

# Ejecuta la función principal si el script se ejecuta directamente
if __name__ == "__main__":
    main()
