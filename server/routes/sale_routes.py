from flask import Flask, make_response, request
from models import db, Employee, Company, Store, Product, Sale, InventoryItem
from config import app

@app.route('/sales', methods = ['GET', 'POST'])
def sales():
    
    if request.method == 'GET':
        sales = Sale.query.all()
        sales_dict = [sale.to_dict() for sale in sales]

        response = make_response(
            sales_dict,
            200
        )

    elif request.method == 'POST':
        form_data = request.get_json()
        price = form_data.get(price)
        manufacturing_cost = form_data.get(manufacturing_cost)

        if form_data['price'] == '':
            store_id = form_data.get(store_id)
            product_id = form_data.get(product_id)
            price = InventoryItem.query.filter(InventoryItem.store_id == store_id and InventoryItem.product_id == product_id).first().price
        if form_data['manufacturing_cost'] == '':
            product_id = form_data.get(product_id)
            manufacturing_cost = Product.query.filter_by(id=product_id).first().manufacturing_cost

        profit_margin = price - manufacturing_cost

        try:
            new_sale_obj = Sale(
                confirmation_number = form_data['confirmation_number'],
                date_time = form_data['date_time'],
                price = price,
                manufacturing_cost = manufacturing_cost,
                profit_margin = profit_margin,
                store_id = form_data['store_id'],
                product_id = form_data['product_id']
            )

            db.session.add(new_sale_obj)
            db.session.commit()

            response = make_response(
                new_sale_obj.to_dict(),
                201
            )
        except ValueError:
            response = make_response(
                {"errors": ["validation errors in POST to sale"]},
                400
            )
            return response

    return response

@app.route('/sales/<int:id>', methods = ['GET', 'PATCH', 'DELETE'])
def sales_by_id(id):
    sale = Sale.query.filter(Sale.id == id).first()

    if sale:
        if request.method == 'GET':

            response = make_response(
                sale.to_dict(),
                200
            )

        elif request.method == 'PATCH':
            form_data = request.get_json()

            try:
                for attr in form_data:
                    setattr(sale, attr, form_data.get(attr))
                
                db.session.commit()

                response = make_response(
                    sale.to_dict(),
                    202
                )

            except ValueError:
                response = make_response(
                    {"errors": ["validation errors in PATCH to sale id"]},
                    400
                )
                return response
            
        elif request.method == 'DELETE':
            db.session.delete(sale)
            db.session.commit()

            response = make_response(
                {},
                204
            )
    
    else:
        response = make_response(
            {"error": "Sale not found"},
            404
        )

    return response