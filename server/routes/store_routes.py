from flask import Flask, make_response, request
from models import db, Employee, Company, Store, Product, Sale, InventoryItem
from config import app

@app.route('/<int:company_id>/stores/<int:store_id>', methods=['GET'])
def all_inventory_by_store(company_id, store_id):
    if request.method == 'GET':
        inventory_items = InventoryItem.query.filter(InventoryItem.store_id == store_id).all()
        print("\n inventory \n")
        print(inventory_items)
        print("\n")
        response = make_response([inventory_item.to_dict(rules = ('-product_id', '-store_id', '-store')) for inventory_item in inventory_items], 200)
    return response

@app.route('/stores', methods=['GET','POST'])
def stores():
    if request.method == 'GET':
        stores = Store.query.all()
        response = [store.to_dict() for store in stores]
        return make_response(response, 200)
    elif request.method == 'POST':
        form_data = request.get_json()
    try:
        new_store = Store(
            name = form_data['name'],
            address = form_data['address'],
            company_id = form_data['company_id']
        )
        db.session.add(new_store)
        db.session.commit()
        return make_response(new_store.to_dict(), 201)
    except ValueError:
        response = {"errors": ["validation errors"]}
        return make_response(response, 403)
    
@app.route('/stores/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def store_by_id(id):
    store = Store.query.filter_by(id=id).first()
    if store is None:
        response = {"error": "Store not found"}
        return make_response(response, 404)
    elif request.method == 'GET':
        response = store.to_dict()
        return make_response(response, 200)
    elif request.method == 'PATCH':
        form_data = request.get_json()
        try:
            for attr in form_data:
                setattr(store, attr, form_data.get(attr))
            db.session.commit()
            response = store.to_dict()
            return make_response(response, 200)
        except ValueError:
            response = {"errors": ["validation errors"]}
            return make_response(response, 403)
    elif request.method == 'DELETE':
        db.session.delete(store)
        db.session.commit()
        response = {}
        return make_response(response, 200)