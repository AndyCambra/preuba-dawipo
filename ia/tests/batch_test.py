from ia.tests.test_model import run_test
from ia.utils.test_utils import sort_unformatted_keys

# Número de veces que quieres ejecutar el script
num_runs = 100

# Ejecutar el script principal varias veces
for i in range(num_runs):
    print(f"Ejecutando test_model.py - Iteración {i+1}/{num_runs}")
    run_test()

# Ordenar el archivo unformatted_keys.txt por la cantidad de veces que se repite cada clave
sort_unformatted_keys("ia/data/unformatted_keys.txt")
print(f"Claves no formateadas ordenadas por frecuencia en ia/data/unformatted_keys.txt.")