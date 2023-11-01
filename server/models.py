from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

convention = {"fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s"}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, unique=True)
  password = db.Column(db.String)

  company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))

  #relationship
  #serialization
  #validations
  
  def __repr__(self):
    return f'\n\n<User {self.id}:\nUsername: {self.username}\nPassword: {self.password}\nCompany ID: {self.company_id}>'

class Company(db.Model, SerializerMixin):
  __tablename__ = 'companies'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, unique=True)

  #relationship
  #serialization
  #validations
  
  def __repr__(self):
    return f'\n\n<>'

class Store(db.Model, SerializerMixin):
  __tablename__ = 'stores'

  id = db.Column(db.Integer, primary_key=True)
  location = db.Column(db.String)

  company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))

  #relationship
  #serialization
  #validations
  
  def __repr__(self):
    return f'\n\n<>'

class Product(db.Model, SerializerMixin):
  __tablename__ = 'products'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  serial_number = db.Column(db.Integer)
  manufacturing_cost = db.Column(db.int) #what if this changes over time

  company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))

  #relationship
  #serialization
  #validations
  
  def __repr__(self):
    return f'\n\n<>'

class Sale(db.Model, SerializerMixin):
  __tablename__ = 'sales'

  id = db.Column(db.Integer, primary_key=True)
  price = db.Column(db.Integer)

  company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))
  product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
  store_id = db.Column(db.Integer, db.ForeignKey('stores.id'))

  #relationship
  #serialization
  #validations
  
  def __repr__(self):
    return f'\n\n<>'

class InventoryItem(db.Model, SerializerMixin):
  __tablename__ = 'inventory'

  id = db.Column(db.Integer, primary_key=True)
  is_in_stock = db.Column(db.Boolean)  

  company_id = db.Column(db.Integer, db.ForeignKey('inventory.id'))
  product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
  store_id = db.Column(db.Integer, db.ForeignKey('stores.id'))
  
  #relationship
  #serialization
  #validations
  
  def __repr__(self):
    return f'\n\n<>'
