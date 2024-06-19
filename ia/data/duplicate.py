#DEPRECATED

import json

# Cargar los ejemplos de entrenamiento existentes
with open("training_validation.json", "r") as file:
    training_examples = json.load(file)

# Reformatear los ejemplos de entrenamiento
reformatted_examples = []
for example in training_examples:
    input_key = example["original_key"]
    input_value = example["value"]
    target_key = example["target_key"]
    target_value = example["value"]
    
    reformatted_example = {
        "input": {input_key: input_value},
        "output": {target_key: target_value}
    }
    reformatted_examples.append(reformatted_example)

# Guardar los ejemplos reformateados en un nuevo archivo JSON
with open("training_validation.json", "w") as file:
    json.dump(reformatted_examples, file, indent=2)

print("Ejemplos de entrenamiento reformateados guardados en 'reformatted_training_examples.json'.")
