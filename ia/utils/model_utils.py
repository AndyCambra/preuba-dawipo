import os
import logging
from typing import Tuple
import torch
from ia.config import MODEL_NAME
from transformers import PreTrainedModel, PreTrainedTokenizer, T5ForConditionalGeneration, T5Tokenizer

# Guarda el modelo y el tokenizador en el directorio especificado
def save_model(model: PreTrainedModel, tokenizer: PreTrainedTokenizer, save_directory: str) -> None:
    try:
        # Guarda el modelo y el tokenizador en el directorio
        model.save_pretrained(save_directory)
        tokenizer.save_pretrained(save_directory)
        logging.info(f"Model and tokenizer saved to {save_directory}")
    except Exception as e:
        logging.error(f"Error saving model and tokenizer: {e}")

# Carga el modelo y el tokenizador desde el directorio especificado
def load_model(model_class: type, tokenizer_class: type, model_path: str) -> Tuple[PreTrainedModel, PreTrainedTokenizer]:
    try:
        # Carga el modelo y el tokenizador desde el directorio
        model = model_class.from_pretrained(model_path)
        tokenizer = tokenizer_class.from_pretrained(model_path)
        logging.info(f"Model and tokenizer loaded from {model_path}")
        return model, tokenizer
    except Exception as e:
        logging.error(f"Error loading model and tokenizer: {e}")
        raise

# Inicializa el modelo y el tokenizador, ya sea desde cero o desde un directorio existente
def initialize_model(model_path: str, from_scratch: bool = False) -> Tuple[T5ForConditionalGeneration, T5Tokenizer]:
    if from_scratch or not os.path.exists(model_path):
        # Inicializa el modelo y el tokenizador desde el modelo base de Hugging Face
        model = T5ForConditionalGeneration.from_pretrained('t5-base')
        tokenizer = T5Tokenizer.from_pretrained('t5-base')
    else:
        # Carga el modelo y el tokenizador desde el directorio especificado
        model = T5ForConditionalGeneration.from_pretrained(model_path)
        tokenizer = T5Tokenizer.from_pretrained(model_path)
    return model, tokenizer

# Obtiene el dispositivo (GPU si está disponible, de lo contrario CPU)
def get_device() -> torch.device:
    return torch.device("cuda" if torch.cuda.is_available() else "cpu")
