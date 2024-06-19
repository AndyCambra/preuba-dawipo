from flask import Blueprint, request, jsonify
from ia.utils.format import format_product


product_bp = Blueprint('product_bp', __name__)

@product_bp.route('/add_product', methods=['POST'])
def add_product():    
    data = request.json
    if not data:
        return jsonify({"error": "No data received"})
    
    formatted_data = format_product(data)
    return jsonify(formatted_data)