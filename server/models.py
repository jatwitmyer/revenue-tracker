from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

convention = {"fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s"}
metadata = MetaData(naming_convention=convention)
db = SQLAlchemy(metadata=metadata)



class Employee(db.Model, SerializerMixin):
  __tablename__ = 'employees'
  serialize_rules= ('-company.employees', '-company.stores', '-stores.employees', '-sales.employees', '-products.employees', '-inventory.employees', '-company_id')

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, unique=True)
  password = db.Column(db.String)

  company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))

  #relationships
  company = db.relationship('Company', back_populates = 'employees')
  stores = association_proxy('companies', 'stores')
  sales = association_proxy('companies', 'sales')
  products = association_proxy('companies', 'products')
  inventory = association_proxy('companies', 'inventory')

  @validates('username')
  def validates_username(self, key, username):
    if username:
      return username
    else:
      raise ValueError('Employee must be given a unique username.')
    
  @validates('password')
  def validates_password(self, key, password):
    if password:
      return password
    else:
      raise ValueError('Employee must be given a password.')
    
  @validates('company_id')
  def validates_company_id(self, key, company_id):
    if company_id:
      return company_id
    else:
      raise ValueError('Employee must be assigned to a company.')

  def __repr__(self):
    return f'<Employee {self.id}: {self.username}. Password: {self.password}. Company ID: {self.company_id}.\n>'



class Company(db.Model, SerializerMixin):
  __tablename__ = 'companies'
  serialize_rules = ('-employees.company', '-stores.company', '-inventory.company', '-products.company', '-sales.company', '-employees.company_id', '-employees.password')

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, unique=True)

  #relationships
  employees = db.relationship('Employee', back_populates = 'company', cascade='all, delete-orphan')
  stores = db.relationship('Store', back_populates = 'company', cascade='all, delete-orphan')

  # Association proxies
  sales = association_proxy('stores', 'sales')
  inventory = association_proxy('stores', 'inventory')
  products = association_proxy('stores', 'products')

  @validates('name')
  def validates_name(self, key, name):
    if name:
      return name
    else:
      raise ValueError('Company must be given a name.')

  def __repr__(self):
    return f'<Company {self.id}: {self.name}\n>'



class Store(db.Model, SerializerMixin):
  __tablename__ = 'stores'
  serialize_rules = ('-company.stores', '-sales.store', '-inventory.store', '-inventory.product', '-products.stores', '-employees.stores', '-company.employees', '-company_id', '-sales.product.inventory')

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  address = db.Column(db.String)

  company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))

  #relationships
  company = db.relationship('Company', back_populates = 'stores')
  sales = db.relationship('Sale', back_populates = 'store', cascade='all, delete-orphan')
  inventory = db.relationship('InventoryItem', back_populates = 'store', cascade='all, delete-orphan')
  products = association_proxy('inventory', 'products')
  employees = association_proxy('companies', 'employees')

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
    return f'<Store {self.id} Address: {self.address}.\n>'



class Product(db.Model, SerializerMixin):
  __tablename__ = 'products'
  serialize_rules = ('-sales.product', '-inventory.product', '-company.employees', '-inventory.store.company', '-inventory.store.sales', '-inventory.product_id', '-inventory.store_id')
  # '-employees.products', '-company.products' 

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  serial_number = db.Column(db.Integer)
  manufacturing_cost = db.Column(db.Integer)

  #relationships
  sales = db.relationship('Sale', back_populates = 'product', cascade='all, delete-orphan')
  inventory = db.relationship('InventoryItem', back_populates = 'product', cascade='all, delete-orphan')


  # stores = association_proxy('inventory', 'store')
  # company = association_proxy('stores', 'companies')
  # employees = association_proxy('companies', 'employees')

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

  def __repr__(self):
    return f'<Product {self.id}: {self.name}. Serial Number: {self.serial_number}. Manufacturing Cost: {self.manufacturing_cost}.\n>'



class Sale(db.Model, SerializerMixin):
  __tablename__ = 'sales'
  serialize_rules = ('-product.sales', '-company.sales', '-employees.sales', '-product.inventory', '-product.manufacturing_cost', '-store.sales', '-store.inventory', '-store.company', '-store_id', '-product_id')

  id = db.Column(db.Integer, primary_key=True)
  #recieved from user
  confirmation_number = db.Column(db.String)
  date_time = db.Column(db.String)

  #handled full by back-end. not directly recieved from the user
  price = db.Column(db.Integer) #at time of sale
  manufacturing_cost = db.Column(db.Integer) # at time of sale
  profit_margin = db.Column(db.Integer) # at time of sale
  #recieved from user
  product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
  store_id = db.Column(db.Integer, db.ForeignKey('stores.id'))

  #relationships
  store = db.relationship('Store', back_populates = 'sales')
  product = db.relationship('Product', back_populates = 'sales')
  # employees = association_proxy('companies', 'employees')
  # company = association_proxy('stores', 'companies')
  
  @validates('confirmation_number')
  def validates_confirmation_number(self, key, confirmation_number):
    if confirmation_number:
      return confirmation_number
    else:
      raise ValueError('Sale must be given a confirmation number.')
    
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
    return f'<Sale {self.id} Confirmation Number: {self.confirmation_number}. >'



class InventoryItem(db.Model, SerializerMixin):
  __tablename__ = 'inventory'
  serialize_rules = ('-store.inventory', '-product.inventory', '-product_id', '-product.sales', '-store_id', '-store.company', '-store.sales.product')
  # '-company.inventory', '-employees.inventory'

  id = db.Column(db.Integer, primary_key=True)
  price = db.Column(db.Integer)
  product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
  store_id = db.Column(db.Integer, db.ForeignKey('stores.id'))

  #relationships
  store = db.relationship('Store', back_populates = 'inventory')
  product = db.relationship('Product', back_populates = 'inventory') 

  # employees = association_proxy('companies', 'employees')
  # company = association_proxy('stores', 'companies')

  @validates('price')
  def validates_price(self, key, price):
    if price:
      return price
    else:
      raise ValueError('Inventory item must be given a price.')
    
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
