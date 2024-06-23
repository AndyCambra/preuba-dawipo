import logging
import torch
from typing import List
from torch.utils.data import DataLoader
from tqdm import tqdm
from transformers import T5ForConditionalGeneration
from ia.utils.data_utils import load_data, prepare_data
from ia.utils.model_utils import save_model, initialize_model, get_device

# Función para entrenar el modelo
def train_model(model: T5ForConditionalGeneration, train_loader: DataLoader, optimizer: torch.optim.Optimizer, device: torch.device) -> float:
    model.train()  # Pone el modelo en modo de entrenamiento
    total_loss = 0
    progress_bar = tqdm(train_loader, desc="Training")  # Barra de progreso para el entrenamiento
    
    for batch in progress_bar:
        input_ids, target_ids = [b.to(device) for b in batch]  # Mueve los datos al dispositivo (GPU o CPU)
        optimizer.zero_grad()  # Resetea los gradientes del optimizador
        outputs = model(input_ids=input_ids, labels=target_ids)  # Pasa los datos por el modelo
        loss = outputs.loss  # Obtiene la pérdida
        total_loss += loss.item()  # Acumula la pérdida total
        loss.backward()  # Calcula los gradientes
        optimizer.step()  # Actualiza los parámetros del modelo
        progress_bar.set_postfix({"loss": loss.item()})  # Actualiza la barra de progreso con la pérdida actual
    
    avg_train_loss = total_loss / len(train_loader)  # Calcula la pérdida promedio
    return avg_train_loss

# Función para validar el modelo
def validate_model(model: T5ForConditionalGeneration, val_loader: DataLoader, device: torch.device) -> float:
    model.eval()  # Pone el modelo en modo de evaluación
    total_loss = 0
    progress_bar = tqdm(val_loader, desc="Validating")  # Barra de progreso para la validación
    
    with torch.no_grad():  # Desactiva el cálculo de gradientes
        for batch in progress_bar:
            input_ids, target_ids = [b.to(device) for b in batch]  # Mueve los datos al dispositivo
            outputs = model(input_ids=input_ids, labels=target_ids)  # Pasa los datos por el modelo
            loss = outputs.loss  # Obtiene la pérdida
            total_loss += loss.item()  # Acumula la pérdida total
            progress_bar.set_postfix({"loss": loss.item()})  # Actualiza la barra de progreso con la pérdida actual
    
    avg_val_loss = total_loss / len(val_loader)  # Calcula la pérdida promedio
    return avg_val_loss

# Función principal para entrenar el modelo desde cero
def train(training_files: List[str], validation_file: str, model_save_path: str, learning_rate: float, num_epochs: int, batch_size: int, patience: int):
    training_data, validation_data = load_data(training_files, validation_file)  # Carga los datos de entrenamiento y validación
    model, tokenizer = initialize_model(model_save_path, from_scratch=True)  # Inicializa el modelo desde cero
    device = get_device()  # Obtiene el dispositivo (GPU o CPU)
    model.to(device)  # Mueve el modelo al dispositivo

    train_loader = prepare_data(training_data, tokenizer, batch_size)  # Prepara los datos de entrenamiento
    val_loader = prepare_data(validation_data, tokenizer, batch_size)  # Prepara los datos de validación

    optimizer = torch.optim.AdamW(model.parameters(), lr=learning_rate)  # Inicializa el optimizador
    best_val_loss = float('inf')  # Inicializa la mejor pérdida de validación
    epochs_without_improvement = 0  # Contador de épocas sin mejora

    for epoch in range(num_epochs):
        logging.info(f"Epoch {epoch+1}/{num_epochs}")  # Log de la época actual
        
        train_loss = train_model(model, train_loader, optimizer, device)  # Entrena el modelo
        logging.info(f"Training loss: {train_loss:.4f}")  # Log de la pérdida de entrenamiento

        val_loss = validate_model(model, val_loader, device)  # Valida el modelo
        logging.info(f"Validation loss: {val_loss:.4f}")  # Log de la pérdida de validación

        if val_loss < best_val_loss:
            best_val_loss = val_loss  # Actualiza la mejor pérdida de validación
            save_model(model, tokenizer, model_save_path)  # Guarda el modelo
            logging.info("Model saved")  # Log de guardado del modelo
            epochs_without_improvement = 0  # Resetea el contador de épocas sin mejora
        else:
            epochs_without_improvement += 1  # Incrementa el contador de épocas sin mejora
            if epochs_without_improvement >= patience:
                logging.info(f"Early stopping triggered after {epoch+1} epochs")  # Log de parada temprana
                break

    return model, tokenizer

# Función principal para reentrenar el modelo existente
def retrain(training_files: List[str], validation_file: str, model_save_path: str, learning_rate: float, num_epochs: int, batch_size: int, patience: int):
    training_data, validation_data = load_data(training_files, validation_file)  # Carga los datos de entrenamiento y validación
    model, tokenizer = initialize_model(model_save_path)  # Inicializa el modelo desde el directorio especificado
    device = get_device()  # Obtiene el dispositivo (GPU o CPU)
    model.to(device)  # Mueve el modelo al dispositivo

    train_loader = prepare_data(training_data, tokenizer, batch_size)  # Prepara los datos de entrenamiento
    val_loader = prepare_data(validation_data, tokenizer, batch_size)  # Prepara los datos de validación

    optimizer = torch.optim.AdamW(model.parameters(), lr=learning_rate)  # Inicializa el optimizador
    best_val_loss = float('inf')  # Inicializa la mejor pérdida de validación
    epochs_without_improvement = 0  # Contador de épocas sin mejora

    for epoch in range(num_epochs):
        logging.info(f"Epoch {epoch+1}/{num_epochs}")  # Log de la época actual
        
        train_loss = train_model(model, train_loader, optimizer, device)  # Entrena el modelo
        logging.info(f"Training loss: {train_loss:.4f}")  # Log de la pérdida de entrenamiento

        val_loss = validate_model(model, val_loader, device)  # Valida el modelo
        logging.info(f"Validation loss: {val_loss:.4f}")  # Log de la pérdida de validación

        if val_loss < best_val_loss:
            best_val_loss = val_loss  # Actualiza la mejor pérdida de validación
            save_model(model, tokenizer, model_save_path)  # Guarda el modelo
            logging.info("Model saved")  # Log de guardado del modelo
            epochs_without_improvement = 0  # Resetea el contador de épocas sin mejora
        else:
            epochs_without_improvement += 1  # Incrementa el contador de épocas sin mejora
            if epochs_without_improvement >= patience:
                logging.info(f"Early stopping triggered after {epoch+1} epochs")  # Log de parada temprana
                break
