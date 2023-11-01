from config import app
from routes.store_routes import stores, store_by_id
from routes.product_routes import products, products_by_id
from routes.company_routes import products, products_by_id
from routes.user_routes import products, products_by_id

@app.route('/')
def index():
    return ''

# run python app.py
if __name__ == '__main__':
    app.run(port=5555, debug=True)