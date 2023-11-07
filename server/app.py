from config import app
from routes.store_routes import stores, store_by_id
from routes.product_routes import products, products_by_id
from routes.inventory_routes import inventory, inventory_by_id
from routes.sale_routes import sales, sales_by_id
from routes.company_routes import companies, company_by_id
from routes.employee_routes import employees, employees_by_id
from routes.non_restful_routes import all_stores_by_company, all_products_by_company, revenue, all_inventory_by_store

@app.route('/')
def index():
    return ''

# run python app.py
if __name__ == '__main__':
    app.run(port=5555, debug=True)