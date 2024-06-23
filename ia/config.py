import os
import logging

# Rutas de archivos
BASE_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Ruta base del proyecto
MODEL_PATH = os.path.join(BASE_PATH, 'ia', 'models', 'fine-tuned-t5-base')  # Ruta del modelo fine-tuned
TRAINING_FILES = ["ia/data/training_examples.json", "ia/data/training_examples_updated.json"]  # Archivos de datos de entrenamiento
VALIDATION_FILE = "ia/data/training_validation.json"  # Archivo de datos de validación
UNFORMATTED_KEYS_FILE = "ia/data/unformatted_keys.txt"  # Archivo de claves no formateadas

# Hiperparámetros
LEARNING_RATE = 1e-4  # Tasa de aprendizaje
NUM_EPOCHS = 5  # Nmero de épocas
BATCH_SIZE = 16  # Tamaño del lote
PATIENCE = 3  # Nmero de épocas sin mejoras antes de parar el entrenamiento

# Hiperparámetros para reentrenamiento
RETRAIN_LEARNING_RATE = 5e-5  # Tasa de aprendizaje para reentrenamiento
RETRAIN_NUM_EPOCHS = 3  # Número de épocas para reentrenamiento
RETRAIN_BATCH_SIZE = 16  # Tamaño del lote para reentrenamiento
RETRAIN_PATIENCE = 2  # Nmero de épocas sin mejoras antes de parar el entrenamiento

# Configuración de logging
LOG_FORMAT = '%(asctime)s - %(levelname)s - %(message)s'  # Formato del logging
LOG_LEVEL = logging.INFO  # Nivel del logging

# Modelo T5
MODEL_NAME = 't5-base'  # Nombre del modelo T5
