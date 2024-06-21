## Configuración

Primero, asegúrate de tener Python 3.8 o superior instalado. Luego, clona el repositorio y navega a la carpeta `ia`:

# Crear entorno virtual

```sh
python -m venv venv
```

```sh
cd ia
```

# Activar entorno virtual

```sh
source venv/bin/activate  # En Linux/Mac
venv\Scripts\activate     # En Windows
```

# Instalar las dependencias

```sh
pip install -r requirements.txt
```

```sh
pip install spacy
python -m spacy download en_core_web_sm
```

## Ejecutar scripts

Ejecutar estos comandos en la raíz del proyecto:

### Ejecutar en entorno virtual

```sh
source ia/venv/bin/activate  # En Linux/Mac
ia\venv\Scripts\activate     # En Windows
```

### Entrenamiento del modelo

```sh
python -m ia.train_model
```

### Ejecutar la aplicación Flask

```sh
python -m ia.app
```

### Ejecutar pruebas unitarias

```sh
python -m ia.tests.test_model
```

### Ejecutar pruebas en lote

```sh
python -m ia.tests.batch_test
```

## Estructura del proyecto

```
ia/
├── __init__.py
├── app.py
├── data/
│   ├── training_examples.json
│   ├── training_validation.json
├── models/
│   ├── __init__.py
│   ├── model.py
├── routes/
│   ├── __init__.py
│   ├── product_routes.py
├── utils/
│   ├── __init__.py
│   ├── format.py
│   ├── test_utils.py
├── tests/
│   ├── __init__.py
│   ├── test_model.py
│   ├── batch_test.py
├── train_model.py
```

### Descripción de carpetas

- **data/**: Contiene los archivos JSON de datos de entrenamiento y validación.
- **models/**: Contiene la definición y carga del modelo y tokenizer.
- **routes/**: Contiene las rutas de la aplicación Flask.
- **utils/**: Contiene funciones utilitarias para formateo y pruebas.
- **tests/**: Contiene los scripts de prueba y pruebas en lote.
