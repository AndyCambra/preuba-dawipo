import json
from ia.utils.format import format_product
from ia.utils.test_utils import generate_random_test_object, save_unformatted_keys_to_file, sort_unformatted_keys

def run_test():
    # Cargar los datos de entrenamiento para extraer claves y valores
    print("Cargando ejemplos de entrenamiento...")
    with open("ia/data/training_examples.json", "r") as file:
        training_examples = json.load(file)

    # Target keys con valores de ejemplo
    target_keys = {
        "name": "Product-50",
        "originCountry": "Country-50",
        "finalCountry": "Destination-50",
        "departureDate": "21/10/24",
        "arrivalDate": "25/12/24",
        "status": "Traitement",
        "provider": "Provider-50",
        "courier": "DHL"
    }

    # Generar un objeto de prueba aleatorio asegurando que las target keys estén presentes
    random_test_object = generate_random_test_object(target_keys, training_examples)
    print('Random Test Object:', random_test_object)

    # Formatear el objeto utilizando el modelo ajustado
    formatted_data = format_product(random_test_object)

    # Asegurar que todas las target keys estén presentes
    final_data = {target_key: formatted_data.get(target_key, None) for target_key in target_keys}
    print('Final Formatted Data:', final_data)

    # Identificar las origin_keys que no pudieron ser formateadas correctamente
    unformatted_keys = []
    for key, value in random_test_object.items():
        target_key = next((t_key for t_key, t_value in target_keys.items() if formatted_data.get(t_key) == value), None)
        if target_key is None or final_data.get(target_key) is None:
            unformatted_keys.append(key)

    if unformatted_keys:
        print('\nClaves que no pudieron ser formateadas:', unformatted_keys)
        save_unformatted_keys_to_file(unformatted_keys)
    else:
        print('\nTodas las claves fueron formateadas correctamente.')

    

if __name__ == "__main__":
    run_test()
    sort_unformatted_keys()