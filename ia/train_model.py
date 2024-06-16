from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch
import json

# Cargar ejemplos de entrenamiento desde el archivo modificado
print("Cargando ejemplos de entrenamiento...")
with open("training_examples.json", "r") as file:
    training_examples = json.load(file)

print("Cargando modelo y tokenizer...")
model_name = "t5-small"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

# Prepara datos de entrenamiento
print("Preparando datos de entrenamiento...")

def get_input_text(ex):
    if 'entrada' in ex:
        return f"Transform the following data: {json.dumps(ex['entrada'])}"
    elif 'input_data' in ex:
        return f"Transform the following data: {json.dumps(ex['input_data'])}"
    elif 'data_input' in ex:
        return f"Transform the following data: {json.dumps(ex['data_input'])}"
    elif 'input' in ex:
        return f"Transform the following data: {json.dumps(ex['input'])}"
    elif 'ingreso' in ex:
        return f"Transform the following data: {json.dumps(ex['ingreso'])}"
    else:
        return "Transform the following data: {}"

def get_target_text(ex):
    if 'salida' in ex:
        return json.dumps(ex['salida'])
    elif 'output_data' in ex:
        return json.dumps(ex['output_data'])
    elif 'data_output' in ex:
        return json.dumps(ex['data_output'])
    elif 'resultado' in ex:
        return json.dumps(ex['resultado'])
    elif 'output' in ex:
        return json.dumps(ex['output'])
    else:
        return json.dumps({})

input_texts = [get_input_text(ex) for ex in training_examples]
target_texts = [get_target_text(ex) for ex in training_examples]

inputs = tokenizer(input_texts, return_tensors="pt", padding=True, truncation=True)
targets = tokenizer(target_texts, return_tensors="pt", padding=True, truncation=True)

# Fine-tune the model
print("Preparando datos para el entrenamiento...")
train_data = torch.utils.data.TensorDataset(inputs.input_ids, targets.input_ids)
train_loader = torch.utils.data.DataLoader(train_data, batch_size=16, shuffle=True)

optimizer = torch.optim.AdamW(model.parameters(), lr=3e-5)

print("Iniciando entrenamiento...")
model.train()
num_epochs = 10
for epoch in range(num_epochs):
    print(f"Epoch {epoch + 1}/{num_epochs}...")
    total_loss = 0
    for batch in train_loader:
        input_ids, target_ids = batch
        outputs = model(input_ids=input_ids, labels=target_ids)
        loss = outputs.loss
        total_loss += loss.item()
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
    avg_loss = total_loss / len(train_loader)
    print(f"  Average loss: {avg_loss}")

# Guardar el modelo ajustado
print("Guardando el modelo ajustado...")
model.save_pretrained("fine-tuned-t5")
tokenizer.save_pretrained("fine-tuned-t5")
print("Entrenamiento completado y modelo guardado.")
