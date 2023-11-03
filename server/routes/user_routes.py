from flask import Flask, make_response, request
from models import db, User, Company, Store, Product, Sale, InventoryItem
from config import app

@app.route('/users', methods=['GET','POST'])
def users():
    if request.method == 'GET':
        users = User.query.all()
        response = users.to_dict(rules = ('', ))
        return make_response(response, 200)
    elif request.method == 'POST':
        form_data = request.get_json()
    try:
        new_user = User(
        username = form_data['username'],
        password = form_data['password']
        )
        db.session.add(new_user)
        db.session.commit()
        return make_response(new_user.to_dict(rules = ('', )), 201)
    except ValueError:
        response = {"errors": ["validation errors"]}
        return make_response(response, 403)
    
@app.route('/users/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def user_by_id(id):
    user = User.query.filter_by(id=id).first()
    if user is None:
        response = {"error": "User not found"}
        return make_response(response, 404)
    elif request.method == 'GET':
        response = user.to_dict(rules = ('', ))
        return make_response(response, 200)
    elif request.method == 'PATCH':
        form_data = request.get_json()
        try:
            for attr in form_data:
                setattr(user, attr, form_data.get(attr))
            db.session.commit()
            response = user.to_dict(rules = ('', ))
            return make_response(response, 200)
        except ValueError:
            response = {"errors": ["validation errors"]}
            return make_response(response, 403)
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        response = {}
        return make_response(response, 200)