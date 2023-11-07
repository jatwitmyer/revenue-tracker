from flask import Flask, make_response, request
from models import db, Employee, Company, Store, Product, Sale, InventoryItem
from config import app

@app.route('/stores', methods=['GET','POST'])
def stores():
    if request.method == 'GET':
        stores = Store.query.all()
        response = stores.to_dict()
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