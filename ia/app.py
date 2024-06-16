from flask import Flask, request, jsonify
from transformers import T5ForConditionalGeneration, T5Tokenizer
import json
from json_repair import repair_json

app = Flask(__name__)

# Cargar el modelo ajustado
model = T5ForConditionalGeneration.from_pretrained("fine-tuned-t5")
tokenizer = T5Tokenizer.from_pretrained("fine-tuned-t5")

@app.route('/add_product', methods=['POST'])
def add_product():
    data = request.json
    print('Received Data:', data)  # Debugging line
    if not data:
        return jsonify({"error": "No data received"})
    
    formatted_data = format_product(data)
    return jsonify(formatted_data)

def format_product(data):
    input_text = json.dumps(data)
    print('Input Text:', input_text)  # Debugging line
    input_ids = tokenizer.encode(input_text, return_tensors="pt")
    print('Input IDs:', input_ids)  # Debugging line
    
    outputs = model.generate(input_ids, max_length=512, num_beams=5, early_stopping=True)
    output_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    print('Model Output:', output_text)  # Debugging line

    # Verificar si la salida es un JSON válido
    if not output_text.startswith('{') or not output_text.endswith('}'):
        output_text = '{' + output_text + '}'
    
    # Intentar corregir el JSON malformado
    try:
        fixed_json = repair_json(output_text)
        print('Fixed JSON:', fixed_json)  # Debugging line
        formatted_response = json.loads(fixed_json)
    except Exception as e:
        print('Error al corregir el JSON:', e)
        formatted_response = {}
    
    print('Formatted Response:', formatted_response)  # Log the response
    return formatted_response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
