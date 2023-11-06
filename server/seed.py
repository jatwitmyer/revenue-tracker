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
      address = fake.address(),
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
      manufacturing_cost = str(randint(5, 99)) + fake.random_element(elements=('.00', '.50', '.99')) #"need" to make this smaller than sale price
    )
    products.append(p)
  return products

def create_inventory_items():
  inventory_items = []
  for _ in range(40):
    i = InventoryItem(
      price = float(str(randint(5, 99)) + fake.random_element(elements=('.00', '.50', '.99'))),
      product_id = rc(products).id,
      store_id = rc(stores).id
    )
    inventory_items.append(i)
  return inventory_items

def create_sales():
  sales = []
  for _ in range(40):
    product_id = rc(products).id
    store_id = rc(stores).id
    manufacturing_cost = 0

    #find the product id that matches and grab the manufacturing cost
    for product in products:
      if product.id == product_id:
        manufacturing_cost = product.manufacturing_cost
    # print(manufacturing_cost)

    for inventory_item in inventory_items:
      if inventory_item.store_id == store_id:
        price = inventory_item.price


    sa = Sale(
      confirmation_number = fake.bothify(text='????########', letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      # profit_margin = (int(price) - int(manufacturing_cost)),
      product_id = product_id,
      store_id = store_id,
      price = price,
      manufacturing_cost = manufacturing_cost,
      profit_margin = round((price - manufacturing_cost), 2)
    )
    sales.append(sa)
  return sales


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

    print("Seeding employees...")
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

    print("Seeding inventory items...")
    inventory_items = create_inventory_items()
    db.session.add_all(inventory_items)
    db.session.commit()

    print("Seeding sales...")
    sales = create_sales()
    db.session.add_all(sales)
    db.session.commit()


    print("Done seeding!")