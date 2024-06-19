import json
from ..models.model import model, tokenizer

def transform_key_value(key, value):
    input_text = f"translate {key} : {value} to target"
    try:
        input_ids = tokenizer.encode(input_text, return_tensors="pt")
    except Exception as e:
        return {key: value}
    
    try:
        outputs = model.generate(input_ids, max_length=50, num_beams=2, early_stopping=True)
        output_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    except Exception as e:
        return {key: value}
    
    try:
        output_text = '{"' + output_text.replace(' : ', '": "').replace('_', ' ') + '"}'
        transformed = json.loads(output_text)
        return transformed
    except json.JSONDecodeError:
        return {key: value}
    except Exception as e:
        return {key: value}

def format_product(data):
    formatted_data = {}
    for key, value in data.items():
        formatted_pair = transform_key_value(key, value)
        formatted_data.update(formatted_pair)
    return formatted_data