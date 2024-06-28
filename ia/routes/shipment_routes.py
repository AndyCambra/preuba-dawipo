from flask import Blueprint, request, jsonify
from ia.utils.format_utils import format_shipment

# Crear un blueprint para las rutas de shipments
shipment_bp = Blueprint('shipment_bp', __name__)

# Ruta para agregar un producto
@shipment_bp.route('/add_shipment', methods=['POST'])
def add_shipment():    
    data = request.json
    if not data:
        return jsonify({"error": "No data received"})
    print("data: ", data)
    formatted_data = format_shipment(data)
    print("formatted_data: ", formatted_data)
    return jsonify(formatted_data)