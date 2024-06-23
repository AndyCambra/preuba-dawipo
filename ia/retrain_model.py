import logging
from ia.utils.train_utils import retrain
from ia.config import TRAINING_FILES, VALIDATION_FILE, MODEL_PATH, RETRAIN_LEARNING_RATE, RETRAIN_NUM_EPOCHS, RETRAIN_BATCH_SIZE, RETRAIN_PATIENCE, LOG_FORMAT, LOG_LEVEL

# Configura el logging con el nivel y formato especificados en la configuración
logging.basicConfig(level=LOG_LEVEL, format=LOG_FORMAT)

def main():
    # Inicia el proceso de reentrenamiento incremental
    logging.info("Starting incremental training process...")
    
    # Llama a la función de reentrenamiento con los parámetros especificados
    retrain(
        TRAINING_FILES,
        VALIDATION_FILE,
        MODEL_PATH,
        learning_rate=RETRAIN_LEARNING_RATE,
        num_epochs=RETRAIN_NUM_EPOCHS,
        batch_size=RETRAIN_BATCH_SIZE,
        patience=RETRAIN_PATIENCE
    )
    
    # Indica que el reentrenamiento ha sido completado
    logging.info("Incremental training completed.")

# Ejecuta la función principal si el script se ejecuta directamente
if __name__ == "__main__":
    main()
