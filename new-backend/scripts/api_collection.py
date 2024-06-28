import json

def create_postman_collection():
    collection = {
        "info": {
            "name": "API Endpoints",
            "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        "item": [],
        "variable": [
            {
                "key": "base_url",
                "value": "http://localhost:3001",
                "type": "string"
            }
        ]
    }

    base_url = "{{base_url}}"

    endpoints = {
        "Shipments": [
            {"name": "Get All Shipments", "method": "GET", "path": "/shipments"},
            {"name": "Get Shipment by Name", "method": "GET", "path": "/shipments/name/{{name}}"},
            {"name": "Get Shipment by Tracking Number", "method": "GET", "path": "/shipments/trackingNumber/{{trackingNumber}}"},
            {"name": "Get Shipment by ID", "method": "GET", "path": "/shipments/id/{{id}}"},
            {"name": "Create Shipment", "method": "POST", "path": "/shipments"},
            {"name": "Update Shipment by Name", "method": "PUT", "path": "/shipments/name/{{name}}"},
            {"name": "Update Shipment by Tracking Number", "method": "PUT", "path": "/shipments/trackingNumber/{{trackingNumber}}"},
            {"name": "Update Shipment by ID", "method": "PUT", "path": "/shipments/id/{{id}}"},
            {"name": "Delete All Shipments", "method": "DELETE", "path": "/shipments/all"},
            {"name": "Delete Shipment by Name", "method": "DELETE", "path": "/shipments/name/{{name}}"},
            {"name": "Delete Shipment by Tracking Number", "method": "DELETE", "path": "/shipments/trackingNumber/{{trackingNumber}}"},
            {"name": "Delete Shipment by ID", "method": "DELETE", "path": "/shipments/id/{{id}}"}
        ],
        "Connectors": [
            {"name": "Get All Connectors", "method": "GET", "path": "/connectors"},
            {"name": "Get Connector by Name", "method": "GET", "path": "/connectors/name/{{name}}"},
            {"name": "Get Connector by ID", "method": "GET", "path": "/connectors/id/{{id}}"},
            {"name": "Create Connector", "method": "POST", "path": "/connectors"},
            {"name": "Update Connector by Name", "method": "PUT", "path": "/connectors/name/{{name}}"},
            {"name": "Update Connector by ID", "method": "PUT", "path": "/connectors/id/{{id}}"},
            {"name": "Delete All Connectors", "method": "DELETE", "path": "/connectors/all"},
            {"name": "Delete Connector by Name", "method": "DELETE", "path": "/connectors/name/{{name}}"},
            {"name": "Delete Connector by ID", "method": "DELETE", "path": "/connectors/id/{{id}}"}
        ],
        "Users": [
            {"name": "Get All Users", "method": "GET", "path": "/users"},
            {"name": "Get User by ID", "method": "GET", "path": "/users/id/{{id}}"},
            {"name": "Register User", "method": "POST", "path": "/users/register"}
        ]
    }

    for folder_name, folder_endpoints in endpoints.items():
        folder = {
            "name": folder_name,
            "item": []
        }
        for endpoint in folder_endpoints:
            item = {
                "name": endpoint["name"],
                "request": {
                    "method": endpoint["method"],
                    "header": [],
                    "url": {
                        "raw": f"{base_url}{endpoint['path']}",
                        "host": [
                            "{{base_url}}"
                        ],
                        "path": endpoint["path"].split("/")[1:]
                    }
                },
                "response": []
            }
            folder["item"].append(item)
        collection["item"].append(folder)

    with open("api_collection.json", "w") as f:
        json.dump(collection, f, indent=2)

create_postman_collection()