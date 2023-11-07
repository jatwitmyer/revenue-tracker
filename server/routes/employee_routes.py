from flask import Flask, make_response, request
from models import db, Employee, Company, Store, Product, Sale, InventoryItem
from config import app

@app.route('/employees', methods=['GET','POST'])
def employees():
    if request.method == 'GET':
        employees = Employee.query.all()
        response = [employee.to_dict() for employee in employees]
        return make_response(response, 200)
    elif request.method == 'POST':
        form_data = request.get_json()
    try:
        new_employee = Employee(
        username = form_data['username'],
        password = form_data['password']
        )
        db.session.add(new_employee)
        db.session.commit()
        return make_response(new_employee.to_dict(), 201)
    except ValueError:
        response = {"errors": ["validation errors"]}
        return make_response(response, 403)
    
@app.route('/employees/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def employees_by_id(id):
    employee = Employee.query.filter_by(id=id).first()
    if employee is None:
        response = {"error": "Employee not found"}
        return make_response(response, 404)
    elif request.method == 'GET':
        response = employee.to_dict()
        return make_response(response, 200)
    elif request.method == 'PATCH':
        form_data = request.get_json()
        try:
            for attr in form_data:
                setattr(employee, attr, form_data.get(attr))
            db.session.commit()
            response = employee.to_dict()
            return make_response(response, 200)
        except ValueError:
            response = {"errors": ["validation errors"]}
            return make_response(response, 403)
    elif request.method == 'DELETE':
        db.session.delete(employee)
        db.session.commit()
        response = {}
        return make_response(response, 200)