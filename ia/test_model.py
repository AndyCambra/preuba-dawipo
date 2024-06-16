from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch
import json
from json_repair import repair_json

# Cargar el modelo ajustado y el tokenizer
model = T5ForConditionalGeneration.from_pretrained("fine-tuned-t5")
tokenizer = T5Tokenizer.from_pretrained("fine-tuned-t5")

# Función para formatear el producto utilizando el modelo ajustado
def format_product(data):
    input_text = f"Transform the following data: {json.dumps(data)}"
    input_ids = tokenizer.encode(input_text, return_tensors="pt")
    
    outputs = model.generate(input_ids, max_length=512, num_beams=5, early_stopping=True)
    output_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    # Verificar si la salida es un JSON válido
    if not output_text.startswith('{') or not output_text.endswith('}'):
        output_text = '{' + output_text + '}'
    
    # Intentar corregir el JSON malformado
    try:
        fixed_json = repair_json(output_text)
        formatted_response = json.loads(fixed_json)
    except Exception as e:
        print('Error al corregir el JSON:', e)
        formatted_response = {}
    
    return formatted_response

# Ejemplo de datos de prueba
test_data = {
    "numero_seguimiento": "66a49000-03f8-49cc-8abb-7106aab49dc4",
    "name": "Product C",
    "origen": "Country X",
    "destino": "Country Y",
    "enviado_en": "2023-10-01",
    "delivery_due": "2023-10-10",
    "estado_actual": "In Transit",
    "distribuidor": "Supplier Z",
    "servicio_envio": "Courier W"
}

# Formatear el producto utilizando el modelo ajustado
formatted_product = format_product(test_data)
print('Formatted Product:', formatted_product)
