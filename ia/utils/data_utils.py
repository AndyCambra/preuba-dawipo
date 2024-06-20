import json
from transformers import T5Tokenizer
import torch
from torch.utils.data import DataLoader, TensorDataset

def load_data(training_file, validation_file):
    with open(training_file, 'r') as file:
        training_examples = json.load(file)
    with open(validation_file, 'r') as file:
        validation_examples = json.load(file)
    return training_examples, validation_examples

def get_input_text(example):
    input_key = list(example["input"].keys())[0]
    input_value = example["input"][input_key]
    return f"translate {input_key} : {input_value} to target"

def get_target_text(example):
    target_key = list(example["output"].keys())[0]
    target_value = example["output"][target_key]
    return f"{target_key} : {target_value}"

def prepare_data(examples, tokenizer):
    input_texts = [get_input_text(ex) for ex in examples]
    target_texts = [get_target_text(ex) for ex in examples]

    inputs = tokenizer(input_texts, return_tensors="pt", padding=True, truncation=True)
    targets = tokenizer(target_texts, return_tensors="pt", padding=True, truncation=True)

    data = TensorDataset(inputs.input_ids, targets.input_ids)
    return DataLoader(data, batch_size=16, shuffle=True)
