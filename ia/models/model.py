import os
from ia.utils.model_utils import initialize_model

# Definir la ruta base del proyecto
base_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Definir la ruta del modelo
model_path = os.path.join(base_path, 'ia', 'models', 'fine-tuned-t5-base')

# Inicializar el modelo y el tokenizador
model, tokenizer = initialize_model(model_path)

# Exportar las variables
__all__ = ['model', 'tokenizer', 'model_path']
