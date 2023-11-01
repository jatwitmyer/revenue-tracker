from flask import Flask, make_response, request
from models import db, User, Company, Store, Product, Sale, InventoryItem
from flask_migrate import Migrate


app = Flask(__name__)

# make the connection to the DB through SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///revenue.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# create our migration using our db
migrate = Migrate(app, db)

# initialize the flask app
db.init_app(app)