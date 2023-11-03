from flask import Flask, make_response, request
from models import db, User, Company, Store, Product, Sale, InventoryItem
from config import app

@app.route('/inventory', methods = ['GET', 'POST'])
def inventory():
    
    if request.method == 'GET':
        inventory_items = InventoryItem.query.all()
        inventory_dict = [inventory.to_dict(rules = ('-product', '-store', '-company')) for inventory in inventory_items]

        response = make_response(
            inventory_dict,
            200
        )

    elif request.method == 'POST':
        form_data = request.get_json()

        try:
            new_inventory_obj = InventoryItem(
                price = form_data['price'],
                store_id = form_data['store_id'],
                product_id = form_data['product_id'],
                company_id = form_data['company_id']
            )

            db.session.add(new_inventory_obj)
            db.session.commit()

            response = make_response(
                new_inventory_obj.to_dict(),
                201
            )
        except ValueError:
            response = make_response(
                {"errors": ["validation errors in POST to inventory"]},
                400
            )
            return response

    return response

@app.route('/inventory/<int:id>', methods = ['GET', 'PATCH', 'DELETE'])
def inventory_by_id(id):
    inventory = InventoryItem.query.filter(InventoryItem.id == id).first()

    if inventory:
        if request.method == 'GET':

            response = make_response(
                inventory.to_dict(),
                200
            )

        elif request.method == 'PATCH':
            form_data = request.get_json()

            try:
                for attr in form_data:
                    setattr(inventory, attr, form_data.get(attr))
                
                db.session.commit()

                response = make_response(
                    inventory.to_dict(rules = ('-product', '-store', '-company')),
                    202
                )

            except ValueError:
                response = make_response(
                    {"errors": ["validation errors in PATCH to inventory id"]},
                    400
                )
                return response
            
        elif request.method == 'DELETE':
            db.session.delete(inventory)
            db.session.commit()

            response = make_response(
                {},
                204
            )
    
    else:
        response = make_response(
            {"error": "Inventory item not found"},
            404
        )

    return response