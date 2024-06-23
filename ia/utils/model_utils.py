import torch
import logging
from typing import Tuple
from transformers import PreTrainedModel, PreTrainedTokenizer
from torch.utils.data import DataLoader
from tqdm import tqdm

def train_model(model: PreTrainedModel, train_loader: DataLoader, optimizer: torch.optim.Optimizer, device: torch.device) -> float:
    model.train()
    total_loss = 0
    progress_bar = tqdm(train_loader, desc="Training")
    
    for batch in progress_bar:
        input_ids, target_ids = [b.to(device) for b in batch]
        optimizer.zero_grad()
        outputs = model(input_ids=input_ids, labels=target_ids)
        loss = outputs.loss
        total_loss += loss.item()
        loss.backward()
        optimizer.step()
        progress_bar.set_postfix({"loss": loss.item()})
    
    avg_train_loss = total_loss / len(train_loader)
    return avg_train_loss

def validate_model(model: PreTrainedModel, val_loader: DataLoader, device: torch.device) -> float:
    model.eval()
    total_loss = 0
    progress_bar = tqdm(val_loader, desc="Validating")
    
    with torch.no_grad():
        for batch in progress_bar:
            input_ids, target_ids = [b.to(device) for b in batch]
            outputs = model(input_ids=input_ids, labels=target_ids)
            loss = outputs.loss
            total_loss += loss.item()
            progress_bar.set_postfix({"loss": loss.item()})
    
    avg_val_loss = total_loss / len(val_loader)
    return avg_val_loss

def save_model(model: PreTrainedModel, tokenizer: PreTrainedTokenizer, save_directory: str) -> None:
    try:
        model.save_pretrained(save_directory)
        tokenizer.save_pretrained(save_directory)
        logging.info(f"Model and tokenizer saved to {save_directory}")
    except Exception as e:
        logging.error(f"Error saving model and tokenizer: {e}")

def load_model(model_class: type, tokenizer_class: type, model_path: str) -> Tuple[PreTrainedModel, PreTrainedTokenizer]:
    try:
        model = model_class.from_pretrained(model_path)
        tokenizer = tokenizer_class.from_pretrained(model_path)
        logging.info(f"Model and tokenizer loaded from {model_path}")
        return model, tokenizer
    except Exception as e:
        logging.error(f"Error loading model and tokenizer: {e}")
        raise

def get_device() -> torch.device:
    return torch.device("cuda" if torch.cuda.is_available() else "cpu")