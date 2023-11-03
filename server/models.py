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
  serialize_rules= ('-company.users', '-stores.users', '-sales.users', '-products.users', '-inventory.users' )

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, unique=True)
  password = db.Column(db.String)

  company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))

  #relationships
  company = db.relationship('Company', back_populates = 'users')
  stores = association_proxy('companies', 'stores')
  sales = association_proxy('companies', 'sales')
  products = association_proxy('companies', 'products')
  inventory = association_proxy('companies', 'inventory')

  @validates('company_id')
  def validates_company_id(self, key, company_id):
    if company_id:
      return company_id
    else:
      raise ValueError('User must be assigned to a company.')

  def __repr__(self):
    return f'\n\n<User {self.id}:\nUsername: {self.username}\nPassword: {self.password}\nCompany ID: {self.company_id}>'



class Company(db.Model, SerializerMixin):
  __tablename__ = 'companies'
  serialize_rules = ('-users.company', '-sales.company', '-inventory.company', '-products.company', '-stores.company')

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, unique=True)

  #relationships
  users = db.relationship('User', back_populates = 'company', cascade='all, delete-orphan')
  sales = db.relationship('Sale', back_populates = 'company', cascade='all, delete-orphan')
  inventory = db.relationship('InventoryItem', back_populates = 'company', cascade='all, delete-orphan')
  products = db.relationship('Product', back_populates = 'company', cascade='all, delete-orphan')
  stores = db.relationship('Store', back_populates = 'company', cascade='all, delete-orphan')

  @validates('name')
  def validates_name(self, key, name):
    if name:
      return name
    else:
      raise ValueError('Company must be given a name.')

  def __repr__(self):
    return f'\n\n<Company {self.id}: {self.name}>'



class Store(db.Model, SerializerMixin):
  __tablename__ = 'stores'
  serialize_rules = ('-company.stores', '-sales.store', '-inventory.store', '-products.store', '-users.stores')

  id = db.Column(db.Integer, primary_key=True)
  address = db.Column(db.String)

  company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))

  #relationships
  company = db.relationship('Company', back_populates = 'stores')
  sales = db.relationship('Sale', back_populates = 'store', cascade='all, delete-orphan')
  inventory = db.relationship('InventoryItem', back_populates = 'store', cascade='all, delete-orphan')
  products = association_proxy('inventory', 'products')
  users = association_proxy('companies', 'users')

  @validates('address')
  def validates_address(self, key, address):
    if address:
      return address
    else:
      raise ValueError('Store must be given an address.')

  @validates('company_id')
  def validates_company_id(self, key, company_id):
    if company_id:
      return company_id
    else:
      raise ValueError('Store must be assigned to a company.')

  def __repr__(self):
    return f'\n\n<Store {self.id}:\naddress: {self.address}>'



class Product(db.Model, SerializerMixin):
  __tablename__ = 'products'
  serialize_rules = ('-company.products', '-sales.product', '-inventory.product', '-stores.products', '-users.products')

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  serial_number = db.Column(db.Integer)
  manufacturing_cost = db.Column(db.Integer)

  company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))

  #relationships
  company = db.relationship('Company', back_populates = 'products')
  sales = db.relationship('Sale', back_populates = 'product', cascade='all, delete-orphan')
  inventory = db.relationship('InventoryItem', back_populates = 'product', cascade='all, delete-orphan')
  stores = association_proxy('inventory', 'stores')
  users = association_proxy('companies', 'users')

  @validates('name')
  def validates_name(self, key, name):
    if name:
      return name
    else:
      raise ValueError('Product must be given a name.')
    
  @validates('serial_number')
  def validates_serial_number(self, key, serial_number):
    if serial_number:
      return serial_number
    else:
      raise ValueError('Product must be given a serial number.')
  
  @validates('manufacturing_cost')
  def validates_manufacturing_cost(self, key, manufacturing_cost):
    if manufacturing_cost :
      return manufacturing_cost
    else:
      raise ValueError('Product must be given a manufacturing cost.')
    
  @validates('company_id')
  def validates_company_id(self, key, company_id):
    if company_id:
      return company_id
    else:
      raise ValueError('Product must be assigned to a company.')

  def __repr__(self):
    return f'\n\n<>'



class Sale(db.Model, SerializerMixin):
  __tablename__ = 'sales'
  serialize_rules = ('-company.sales', '-store.sales', '-product.sales', '-users.sales')

  id = db.Column(db.Integer, primary_key=True)
  #recieved from user
  confirmation_number = db.Column(db.Integer)

  #handled full by back-end. not directly recieved from the user
  price = db.Column(db.Integer) #at time of sale
  manufacturing_cost = db.Column(db.Integer) # at time of sale
  profit_margin = db.Column(db.Integer) # at time of sale

  company_id = db.Column(db.Integer, db.ForeignKey('companies.id')) #ooooo this shouldn't be sent by user either. this should be assumed by their associated company (handled by front-end)

  #recieved from user
  product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
  store_id = db.Column(db.Integer, db.ForeignKey('stores.id'))

  #relationships
  company = db.relationship('Company', back_populates = 'sales')
  store = db.relationship('Store', back_populates = 'sales')
  product = db.relationship('Product', back_populates = 'sales')
  users = association_proxy('companies', 'users')
  
  @validates('confirmation_number')
  def validates_confirmation_number(self, key, confirmation_number):
    if confirmation_number:
      return confirmation_number
    else:
      raise ValueError('Sale must be given a confirmation number.')

  @validates('company_id')
  def validates_company_id(self, key, company_id):
    if company_id:
      return company_id
    else:
      raise ValueError('Sale must be assigned to a company.')
    
  @validates('product_id')
  def validates_product_id(self, key, product_id):
    if product_id:
      return product_id
    else:
      raise ValueError('Sale must be assigned to a product.')
    
  @validates('store_id')
  def validates_store_id(self, key, store_id):
    if store_id:
      return store_id
    else:
      raise ValueError('Sale must be assigned to a store.')
  
  def __repr__(self):
    return f'\n\n<>'



class InventoryItem(db.Model, SerializerMixin):
  __tablename__ = 'inventory'
  serialize_rules = ('-company.inventory', '-store.inventory', '-product.inventory', '-users.inventory')

  id = db.Column(db.Integer, primary_key=True)
  price = db.Column(db.Integer)

  company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))
  product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
  store_id = db.Column(db.Integer, db.ForeignKey('stores.id'))

  #relationships
  company = db.relationship('Company', back_populates = 'inventory')
  store = db.relationship('Store', back_populates = 'inventory')
  product = db.relationship('Product', back_populates = 'inventory')
  users = association_proxy('companies', 'users')

  @validates('price')
  def validates_price(self, key, price):
    if price:
      return price
    else:
      raise ValueError('Inventory item must be given a price.')
    
  @validates('company_id')
  def validates_company_id(self, key, company_id):
    if company_id:
      return company_id
    else:
      raise ValueError('Inventory item must be assigned to a company.')
    
  @validates('product_id')
  def validates_product_id(self, key, product_id):
    if product_id:
      return product_id
    else:
      raise ValueError('Inventory item must be assigned to a product.')
    
  @validates('store_id')
  def validates_store_id(self, key, store_id):
    if store_id:
      return store_id
    else:
      raise ValueError('Inventory item must be assigned to a store.')

  def __repr__(self):
    return f'\n\n<>'
