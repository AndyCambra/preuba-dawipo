import json
from ..models.model import model, tokenizer

# Transforma un par clave-valor utilizando el modelo
def transform_key_value(key, value):
    # Prepara el texto de entrada para el modelo
    input_text = f"translate {key} : {value} to target"
    try:
        # Tokeniza el texto de entrada
        input_ids = tokenizer.encode(input_text, return_tensors="pt")
    except Exception as e:
        # Devuelve el par clave-valor original si la tokenización falla
        return {key: value}
    
    try:
        # Genera la salida utilizando el modelo
        outputs = model.generate(input_ids, max_length=50, num_beams=2, early_stopping=True)
        # Decodifica la salida a texto
        output_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    except Exception as e:
        # Devuelve el par clave-valor original si la generación falla
        return {key: value}
    
    try:
        # Formatea el texto de salida a JSON
        output_text = '{"' + output_text.replace(' : ', '": "').replace('_', ' ') + '"}'
        transformed = json.loads(output_text)
        return transformed
    except json.JSONDecodeError:
        # Devuelve el par clave-valor original si la decodificación JSON falla
        return {key: value}
    except Exception as e:
        # Devuelve el par clave-valor original si ocurre cualquier otra excepción
        return {key: value}

# Formatea los datos de un producto transformando cada par clave-valor
def format_product(data):
    formatted_data = {}
    for key, value in data.items():
        # Transforma cada par clave-valor y actualiza los datos formateados
        formatted_pair = transform_key_value(key, value)
        formatted_data.update(formatted_pair)
    return formatted_data