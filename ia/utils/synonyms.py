import nltk
from nltk.corpus import wordnet
from difflib import SequenceMatcher
import json
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Descargar wordnet si no está disponible
try:
    wordnet.ensure_loaded()
except LookupError:
    nltk.download('wordnet')

import spacy

# Cargar el modelo de spaCy
nlp = spacy.load('en_core_web_sm')

# Función para encontrar sinónimos usando NLTK
def get_synonyms(word):
    synonyms = set()
    for syn in wordnet.synsets(word):
        for lemma in syn.lemmas():
            synonyms.add(lemma.name().replace('_', ' '))
    logging.info(f"Synonyms for {word}: {synonyms}")
    return synonyms

# Construcción dinámica del diccionario de sinónimos a partir de las claves en el archivo JSON
def build_synonym_dict(json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    keys = set()
    for entry in data:
        keys.update(entry['input'].keys())
        keys.update(entry['output'].keys())

    synonym_dict = {}
    for key in keys:
        synonyms = get_synonyms(key)
        if synonyms:
            synonym_dict[key] = synonyms

    return synonym_dict

# Función para encontrar la mejor coincidencia usando sinónimos y similitud de secuencias
def find_best_match(new_key, synonym_dict):
    best_match = None
    highest_similarity = 0

    for known_key, synonyms in synonym_dict.items():
        for synonym in synonyms:
            similarity = SequenceMatcher(None, new_key, synonym).ratio()
            if similarity > highest_similarity:
                highest_similarity = similarity
                best_match = known_key

    logging.info(f"Best match for {new_key}: {best_match} with similarity {highest_similarity}")
    return best_match, highest_similarity

# Función para mapear claves nuevas a las existentes
def map_keys(new_keys, synonym_dict, threshold=0.7):
    mapped_keys = {}
    for new_key in new_keys.keys():
        if new_key in synonym_dict:  # Si la clave ya está en el diccionario de sinónimos, no remapear
            mapped_keys[new_key] = new_key
            logging.info(f"Key {new_key} is already the desired key, keeping original key")
        else:
            best_match, similarity = find_best_match(new_key, synonym_dict)
            if best_match and similarity > threshold:  # Umbral de similitud ajustado
                mapped_keys[new_key] = best_match
                logging.info(f"Mapped {new_key} to {best_match} with similarity {similarity}")
            else:
                mapped_keys[new_key] = new_key  # Mantener la clave original si no hay coincidencia suficiente
                logging.info(f"No suitable match for {new_key}, keeping original key")
    return mapped_keys

# Archivo JSON a utilizar
json_file = 'ia/data/training_examples.json'

# Construir el diccionario de sinónimos
synonym_dict = build_synonym_dict(json_file)

# Ejemplo de nuevas claves a mapear
new_keys = {"fechaEntrega": "30/03/24", "fechaLlegada": "14/07/24"}

# Mapear las nuevas claves a las existentes
mapped_keys = map_keys(new_keys, synonym_dict)

print(mapped_keys)
