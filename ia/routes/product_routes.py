from flask import Blueprint, request, jsonify
from ia.utils.format_utils import format_product

# Crear un blueprint para las rutas de productos
product_bp = Blueprint('product_bp', __name__)

# Ruta para agregar un producto
@product_bp.route('/add_product', methods=['POST'])
def add_product():    
    data = request.json
    if not data:
        return jsonify({"error": "No data received"})
    
    formatted_data = format_product(data)
    return jsonify(formatted_data)