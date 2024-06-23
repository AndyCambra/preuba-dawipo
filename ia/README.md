## Setup

First, ensure you have Python 3.8 or higher installed. Then, clone the repository and navigate to the `ia` folder:

# Create a virtual environment

```sh
python -m venv venv
```

```sh
cd ia
```

# Activate the virtual environment

```sh
source venv/bin/activate  # On Linux/Mac
venv\Scripts\activate     # On Windows
```

# Install dependencies

```sh
pip install -r requirements.txt
```

## Run scripts

Run these commands from the root of the project:

### Activate the virtual environment

```sh
source ia/venv/bin/activate  # On Linux/Mac
ia\venv\Scripts\activate     # On Windows
```

### Train the model

```sh
python -m ia.train_model
```

### Retrain the model

```sh
python -m ia.retrain_model
```

### Run the Flask application

```sh
python -m ia.app
```

### Run unit tests

```sh
python -m ia.tests.test_model
```

### Run batch tests

```sh
python -m ia.tests.batch_test [n]
# Where [n] is an optional number specifying how many tests you want to run.
# If [n] is not provided, 10 tests will be run by default.
```

### Project structure

```
ia/
├── __init__.py
├── app.py
├── data/
│   ├── training_examples.json
│   ├── training_validation.json
│   ├── unformatted_keys.txt
├── models/
│   ├── __init__.py
│   ├── model.py
├── routes/
│   ├── __init__.py
│   ├── product_routes.py
├── utils/
│   ├── __init__.py
│   ├── format_utils.py
│   ├── test_utils.py
│   ├── data_utils.py
│   ├── model_utils.py
│   ├── file_utils.py
│   ├── train_utils.py
├── tests/
│   ├── __init__.py
│   ├── test_model.py
│   ├── batch_test.py
├── train_model.py
├── retrain_model.py

### Folder descriptions

- **data/**: Contains JSON files for training and validation data.
- **models/**: Contains the model and tokenizer definitions and loading.
- **routes/**: Contains the Flask application routes.
- **utils/**: Contains utility functions for formatting and testing.
- **tests/**: Contains test scripts and batch tests.
```
