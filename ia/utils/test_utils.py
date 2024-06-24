import random
from collections import defaultdict
from ia.config import UNFORMATTED_KEYS_FILE

# Guarda las claves no formateadas en un archivo, actualizando el conteo de cada clave.
def save_unformatted_keys_to_file(unformatted_keys, file_path=UNFORMATTED_KEYS_FILE):
    counter = defaultdict(int)
    try:
        # Abre el archivo y lee las claves y sus conteos
        with open(file_path, "r") as file:
            for line in file:
                key, count = line.strip().split(": ")
                counter[key] = int(count)
    except FileNotFoundError:
        pass
    
    # Actualiza el conteo de cada clave no formateada
    for key in unformatted_keys:
        counter[key] += 1

    # Escribe las claves y sus conteos actualizados en el archivo
    with open(file_path, "w") as file:
        for key, count in counter.items():
            file.write(f"{key}: {count}\n")

# Ordena las claves no formateadas en el archivo por su conteo en orden descendente.
def sort_unformatted_keys(file_path=UNFORMATTED_KEYS_FILE):
    counter = defaultdict(int)
    
    # Lee las claves y sus conteos del archivo
    with open(file_path, "r") as file:
        for line in file:
            key, count = line.strip().split(": ")
            counter[key] = int(count)
    
    # Ordena las claves por su conteo en orden descendente
    sorted_keys = sorted(counter.items(), key=lambda item: item[1], reverse=True)
    
    # Escribe las claves ordenadas en el archivo
    with open(file_path, "w") as file:
        for key, count in sorted_keys:
            file.write(f"{key}: {count}\n")

# Obtiene una clave y un valor aleatorios para una clave objetivo de los ejemplos de entrenamiento.
def get_random_key_value_for_target(target_key, training_examples):
    # Filtra los ejemplos que contienen la clave objetivo en la salida
    possible_examples = [ex for ex in training_examples if target_key in ex["output"].keys()]
    if not possible_examples:
        return None, None
    # Selecciona un ejemplo aleatorio de los posibles
    example = random.choice(possible_examples)
    input_key = list(example["input"].keys())[0]
    input_value = example["input"][input_key]
    return input_key, input_value

# Genera un objeto de prueba aleatorio basado en las claves objetivo y los ejemplos de entrenamiento.
def generate_random_test_object(target_keys, training_examples):
    test_object = {}
    # Para cada clave objetivo, obtiene una clave y un valor aleatorios de los ejemplos de entrenamiento
    for target_key in target_keys.keys():
        origin_key, value = get_random_key_value_for_target(target_key, training_examples)
        if origin_key and value:
            test_object[origin_key] = value
    # Mezcla aleatoriamente las claves y valores en el objeto de prueba
    shuffled_test_object = dict(random.sample(list(test_object.items()), len(test_object)))
    return shuffled_test_object