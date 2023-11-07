from flask import Flask, make_response, request
from models import db, Employee, Company, Store, Product, Sale, InventoryItem
from config import app


#sales overview page
@app.route('/<int:company_id>/sales_overview/stores', methods=['GET'])
def all_stores_by_company(company_id):
  if request.method == 'GET':
    stores = Store.query.filter(Store.company_id == company_id).all()
    response = make_response([store.to_dict(rules=('-company', '-inventory')) for store in stores], 200)
  return response


@app.route('/<int:company_id>/sales_overview/products', methods=['GET'])
def all_products_by_company(company_id):
  if request.method == 'GET':
    stores = Store.query.filter(Store.company_id == company_id).all()
    store_ids = [store.id for store in stores]
    inventory_items = []
    for store_id in store_ids:
      inventory_items.extend(InventoryItem.query.filter(InventoryItem.store_id == store_id).all())
    products = []
    for inventory_item in inventory_items:
      products.extend(Product.query.filter(Product.id == inventory_item.product_id).all())
    
    response = make_response([product.to_dict() for product in products], 200)
  return response


@app.route('/<int:company_id>/sales_overview/revenue', methods=['GET'])
def revenue(company_id):
  if request.method == 'GET':
    stores = Store.query.filter(Store.company_id == company_id).all()
    print("\n stores \n")
    print(stores)
    print("\n")
    # for store in stores:
    response = make_response({"greeting": "hi, jessica"}, 200)
  return response


#stores page
@app.route('/<int:company_id>/stores/<int:store_id>', methods=['GET'])
def all_inventory_by_store(company_id, store_id):
    if request.method == 'GET':
        inventory_items = InventoryItem.query.filter(InventoryItem.store_id == store_id).all()
        print("\n inventory \n")
        print(inventory_items)
        print("\n")
        response = make_response([inventory_item.to_dict(rules = ('-product_id', '-store_id', '-store')) for inventory_item in inventory_items], 200)
    return response