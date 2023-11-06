from flask import Flask, make_response, request
from models import db, Employee, Company, Store, Product, Sale, InventoryItem
from config import app

@app.route('/products', methods = ['GET', 'POST'])
def products():
    
    if request.method == 'GET':
        products = Product.query.all()
        product_dict = [product.to_dict() for product in products] # rules = ('-sale', '-inventory_item')

        response = make_response(
            product_dict,
            200
        )

    elif request.method == 'POST':
        form_data = request.get_json()

        try:
            new_product_obj = Product(
                name = form_data['name'],
                manufacturing_cost = form_data['manufacturing_cost'],
                serial_number = form_data['serial_number']
            )

            db.session.add(new_product_obj)
            db.session.commit()

            response = make_response(
                new_product_obj.to_dict(),
                201
            )
        except ValueError:
            response = make_response(
                {"errors": ["validation errors in POST to products"]},
                400
            )
            return response

    return response

@app.route('/products/<int:id>', methods = ['GET', 'PATCH', 'DELETE'])
def products_by_id(id):
    product = Product.query.filter(Product.id == id).first()

    if product:
        if request.method == 'GET':

            response = make_response(
                product.to_dict(),
                200
            )

        elif request.method == 'PATCH':
            form_data = request.get_json()

            try:
                for attr in form_data:
                    setattr(product, attr, form_data.get(attr))
                
                db.session.commit()

                response = make_response(
                    product.to_dict(rules = ('-sale', '-inventory_item')),
                    202
                )

            except ValueError:
                response = make_response(
                    {"errors": ["validation errors in PATCH to products id"]},
                    400
                )
                return response
            
        elif request.method == 'DELETE':
            db.session.delete(product)
            db.session.commit()

            response = make_response(
                {},
                204
            )
    
    else:
        response = make_response(
            {"error": "Product not found"},
            404
        )

    return response