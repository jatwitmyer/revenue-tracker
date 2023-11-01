from flask import Flask, make_response #, request
from flask_migrate import Migrate

# import db from models
from models import db, User

app = Flask(__name__)

# make the connection to the DB through SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///revenue.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# create our migration using our db
migrate = Migrate(app, db)

# initialize the flask app
db.init_app(app)



### add routes




# run python app.py
if __name__ == '__main__':
    app.run(port=5555, debug=True)