from random import randint, choice as rc

from faker import Faker
import faker_commerce
import datetime

from app import app
from models import db, Employee, Company, Store, Product, Sale, InventoryItem

fake = Faker()
fake.add_provider(faker_commerce.Provider)

def create_companies():
  companies = []
  for _ in range(2):
    c = Company(
      name = fake.company()
    )
    companies.append(c)
  return companies

def create_employees():
  employees = []
  for _ in range(20):
    e = Employee(
      username = fake.bothify(text='user#####'),
      password = fake.bothify(text='password#####'),
      company_id = rc(companies).id
    )
    employees.append(e)
  return employees

def create_stores():
  stores_c1 = []
  stores_c2 = []
  for _ in range(3):
    st = Store(
      name = fake.street_name(),
      address = fake.address(),
      company_id = companies[0].id
    )
    stores_c1.append(st)
  for _ in range(3):
    st = Store(
      name = fake.street_name(),
      address = fake.address(),
      company_id = companies[1].id
    )
    stores_c2.append(st)
  stores = [stores_c1, stores_c2]
  return stores

def create_products():
  products_c1 = []
  products_c2 = []
  for _ in range(10):
    p = Product(
      name = fake.ecommerce_name(),
      serial_number = fake.bothify(text='????########', letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      manufacturing_cost = str(randint(5, 99)) + fake.random_element(elements=('.00', '.50', '.99')) #"need" to make this smaller than sale price
    )
    products_c1.append(p)
  for _ in range(10):
    p = Product(
      name = fake.ecommerce_name(),
      serial_number = fake.bothify(text='????########', letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      manufacturing_cost = str(randint(5, 99)) + fake.random_element(elements=('.00', '.50', '.99')) #"need" to make this smaller than sale price
    )
    products_c2.append(p)
  products = [products_c1, products_c2]
  return products

def create_inventory_items():
  inventory_items_c1 = []
  inventory_items_c2 = []
  for _ in range(30):
    i = InventoryItem(
      price = float(str(randint(5, 99)) + fake.random_element(elements=('.00', '.50', '.99'))),
      product_id = rc(products[0]).id,
      store_id = rc(stores[0]).id
    )
    inventory_items_c1.append(i)
  for _ in range(30):
    i = InventoryItem(
      price = float(str(randint(5, 99)) + fake.random_element(elements=('.00', '.50', '.99'))),
      product_id = rc(products[1]).id,
      store_id = rc(stores[1]).id
    )
    inventory_items_c2.append(i)
  inventory_items = [inventory_items_c1, inventory_items_c2]
  return inventory_items

def create_sales():
  sales_c1 = []
  sales_c2 = []
  #create sales for company one
  for _ in range(30):
    product_id = rc(products[0]).id
    store_id = rc(stores[0]).id
    manufacturing_cost = 0
    #find the product grab the manufacturing cost
    for product in products[0]:
      if product.id == product_id:
        manufacturing_cost = product.manufacturing_cost
    #find the inventory instance and grab the price
    for inventory_item in inventory_items[0]:
      if (inventory_item.store_id == store_id) and (inventory_item.product_id == product_id):
        price = inventory_item.price
    #create a new sales item which has this information
    sa = Sale(
      confirmation_number = fake.bothify(text='????########', letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      date_time = fake.date_time_between_dates(
        datetime_start=datetime.date(2023, 4, 1),
        datetime_end=datetime.date(2023, 11, 9),
        tzinfo=None,
        ),
      product_id = product_id,
      store_id = store_id,
      price = price,
      manufacturing_cost = manufacturing_cost,
      profit_margin = round((price - manufacturing_cost), 2)
    )
    sales_c1.append(sa)
  #create sales for company two
  for _ in range(30):
    product_id = rc(products[1]).id
    store_id = rc(stores[1]).id
    manufacturing_cost = 0
    #find the product grab the manufacturing cost
    for product in products[1]:
      if product.id == product_id:
        manufacturing_cost = product.manufacturing_cost
    #find the inventory instance and grab the price
    for inventory_item in inventory_items[1]:
      if (inventory_item.store_id == store_id) and (inventory_item.product_id == product_id):
        price = inventory_item.price
    #create a new sales item which has this information
    sa = Sale(
      confirmation_number = fake.bothify(text='????########', letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      date_time = fake.date_time_between_dates(
        datetime_start=datetime.date(2023, 4, 1),
        datetime_end=datetime.date(2023, 11, 9),
        tzinfo=None,
        ),
      product_id = product_id,
      store_id = store_id,
      price = price,
      manufacturing_cost = manufacturing_cost,
      profit_margin = round((price - manufacturing_cost), 2)
    )
    sales_c2.append(sa)
  sales = [sales_c1, sales_c2]
  return sales


if __name__ == '__main__':

  with app.app_context():
    print("Clearing db...")
    Company.query.delete() #stuck here bc it can't find foreign keys connecting companies and inventory
    Employee.query.delete()
    Store.query.delete()
    Product.query.delete()
    Sale.query.delete()
    InventoryItem.query.delete()

    print("Seeding companies...")
    companies = create_companies()
    db.session.add_all(companies)
    db.session.commit()

    print("Seeding employees...")
    employees = create_employees()
    db.session.add_all(employees)
    db.session.commit()

    print("Seeding stores...")
    stores = create_stores()
    for list in stores:
      db.session.add_all(list)
    db.session.commit()

    print("Seeding products...")
    products = create_products()
    for list in products:
      db.session.add_all(list)
    db.session.commit()

    print("Seeding inventory items...")
    inventory_items = create_inventory_items()
    for list in inventory_items:
      db.session.add_all(list)
    db.session.commit()

    print("Seeding sales...")
    sales = create_sales()
    for list in sales:
      db.session.add_all(list)
    db.session.commit()

    print("Done seeding!")