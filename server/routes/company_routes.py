from flask import Flask, make_response, request
from models import db, Employee, Company, Store, Product, Sale, InventoryItem
from config import app

@app.route('/companies', methods=['GET','POST'])
def companies():
    if request.method == 'GET':
        companies = Company.query.all()
        response = companies.to_dict(rules = ('', ))
        return make_response(response, 200)
    elif request.method == 'POST':
        form_data = request.get_json()
    try:
        new_company = Company(
        name = form_data['name']
        )
        db.session.add(new_company)
        db.session.commit()
        return make_response(new_company.to_dict(rules = ('', )), 201)
    except ValueError:
        response = {"errors": ["validation errors"]}
        return make_response(response, 403)
    
@app.route('/companies/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def company_by_id(id):
    company = Company.query.filter_by(id=id).first()
    if company is None:
        response = {"error": "Company not found"}
        return make_response(response, 404)
    elif request.method == 'GET':
        response = company.to_dict(rules = ('', ))
        return make_response(response, 200)
    elif request.method == 'PATCH':
        form_data = request.get_json()
        try:
            for attr in form_data:
                setattr(company, attr, form_data.get(attr))
            db.session.commit()
            response = company.to_dict(rules = ('', ))
            return make_response(response, 200)
        except ValueError:
            response = {"errors": ["validation errors"]}
            return make_response(response, 403)
    elif request.method == 'DELETE':
        db.session.delete(company)
        db.session.commit()
        response = {}
        return make_response(response, 200)