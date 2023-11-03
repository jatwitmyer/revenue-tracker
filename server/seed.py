from random import randint, choice as rc

from faker import Faker
import faker_commerce

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
  stores = []
  for _ in range(6):
    st = Store(
      location = fake.address(),
      company_id = rc(companies).id
    )
    stores.append(st)
  return stores

def create_products():
  products = []
  for _ in range(20):
    p = Product(
      name = fake.ecommerce_name(),
      serial_number = fake.bothify(text='????########', letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      manufacturing_cost = fake.ecommerce_price() #"need" to make this smaller than sale price
    )
    products.append(p)
  return products

def create_sales():
  sales = []
  for _ in range(40):
    sa = Sale(
      price = fake.ecommerce_price(),
      product_id = rc(products).id,
      store_id = rc(stores).id
    )
    sales.append(sa)
  return sales

def create_inventory_items():
  inventory_items = []
  for _ in range(40):
    i = InventoryItem(
      is_in_stock = fake.boolean(),
      product_id = rc(products).id,
      store_id = rc(stores).id
    )
    inventory_items.append(i)
  return inventory_items

#sales and inventory are both joining products and stores from different companies right now

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

    print("Seeding users...")
    employees = create_employees()
    db.session.add_all(employees)
    db.session.commit()

    print("Seeding stores...")
    stores = create_stores()
    db.session.add_all(stores)
    db.session.commit()

    print("Seeding products...")
    products = create_products()
    db.session.add_all(products)
    db.session.commit()

    print("Seeding sales...")
    sales = create_sales()
    db.session.add_all(sales)
    db.session.commit()

    print("Seeding inventory items...")
    inventory_items = create_inventory_items()
    db.session.add_all(inventory_items)
    db.session.commit()

    print("Done seeding!")