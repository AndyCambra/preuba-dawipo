from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch
import json

# Cargar los datos de entrenamiento y validación reformateados
print("Cargando ejemplos de entrenamiento...")
with open("ia/data/training_examples.json", "r") as file:
    training_examples = json.load(file)

print("Cargando ejemplos de validación...")
with open("ia/data/training_validation.json", "r") as file:
    validation_examples = json.load(file)

print("Cargando modelo y tokenizer...")
model_name = "t5-base"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

# Preparar datos de entrenamiento
print("Preparando datos de entrenamiento...")
def get_input_text(example):
    input_key = list(example["input"].keys())[0]
    input_value = example["input"][input_key]
    return f"translate {input_key} : {input_value} to target"

def get_target_text(example):
    target_key = list(example["output"].keys())[0]
    target_value = example["output"][target_key]
    return f"{target_key} : {target_value}"

input_texts = [get_input_text(ex) for ex in training_examples]
target_texts = [get_target_text(ex) for ex in training_examples]

print("Input Texts Example: ", input_texts[:3])  # Debugging
print("Target Texts Example: ", target_texts[:3])  # Debugging

inputs = tokenizer(input_texts, return_tensors="pt", padding=True, truncation=True)
targets = tokenizer(target_texts, return_tensors="pt", padding=True, truncation=True)

print("Tokenized Inputs Example: ", inputs.input_ids[:3])  # Debugging
print("Tokenized Targets Example: ", targets.input_ids[:3])  # Debugging

train_data = torch.utils.data.TensorDataset(inputs.input_ids, targets.input_ids)
train_loader = torch.utils.data.DataLoader(train_data, batch_size=16, shuffle=True)

# Preparar datos de validación
print("Preparando datos de validación...")
val_input_texts = [get_input_text(ex) for ex in validation_examples]
val_target_texts = [get_target_text(ex) for ex in validation_examples]

val_inputs = tokenizer(val_input_texts, return_tensors="pt", padding=True, truncation=True)
val_targets = tokenizer(val_target_texts, return_tensors="pt", padding=True, truncation=True)

validation_data = torch.utils.data.TensorDataset(val_inputs.input_ids, val_targets.input_ids)
val_loader = torch.utils.data.DataLoader(validation_data, batch_size=16, shuffle=False)

# Bucle de entrenamiento y validación con early stopping
optimizer = torch.optim.AdamW(model.parameters(), lr=5e-5)  # Aumentar la tasa de aprendizaje
num_epochs = 10  # Aumentar el número de épocas
patience = 3
best_val_loss = float('inf')
patience_counter = 0

print("Iniciando entrenamiento...")
for epoch in range(num_epochs):
    model.train()
    train_loss = 0
    for batch in train_loader:
        input_ids, target_ids = batch
        outputs = model(input_ids=input_ids, labels=target_ids)
        loss = outputs.loss
        train_loss += loss.item()
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
    avg_train_loss = train_loss / len(train_loader)
    print(f"Epoch {epoch+1}: Training loss: {avg_train_loss}")

    model.eval()
    val_loss = 0
    with torch.no_grad():
        for batch in val_loader:
            input_ids, target_ids = batch
            outputs = model(input_ids=input_ids, labels=target_ids)
            val_loss += outputs.loss.item()
    avg_val_loss = val_loss / len(val_loader)
    print(f"Epoch {epoch+1}: Validation loss: {avg_val_loss}")

    # Early stopping
    if avg_val_loss < best_val_loss:
        best_val_loss = avg_val_loss
        patience_counter = 0
        # Guardar el mejor modelo
        model.save_pretrained("best-fine-tuned-t5-base")
        tokenizer.save_pretrained("best-fine-tuned-t5-base")
    else:
        patience_counter += 1
        if patience_counter >= patience:
            print("Early stopping triggered")
            break

print("Entrenamiento completado.")
