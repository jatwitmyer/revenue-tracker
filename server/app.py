from config import app
from routes.store_routes import stores, store_by_id
from routes.product_routes import products, products_by_id
from routes.inventory_routes import inventory, inventory_by_id
from routes.sale_routes import sales, sales_by_id

# run python app.py
if __name__ == '__main__':
    app.run(port=5555, debug=True)