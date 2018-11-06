import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const sql = `
DROP TABLE IF EXISTS productSales;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
    id serial PRIMARY KEY,
    username VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    Role VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP
);
CREATE TABLE products(
    id serial PRIMARY KEY,
    productname VARCHAR(255) NOT NULL,
    minimum INT  NOT NULL,
    description TEXT NOT NULL,
    price  INT  NOT NULL,
    quantity INT NOT NULL,
    images VARCHAR(255) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP
);

CREATE TABLE sales(
  id serial PRIMARY KEY,
  attendants_Id INT NOT NULL,
  totalPrice  INT,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  FOREIGN KEY (attendants_Id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE productSales(
    id SERIAL PRIMARY KEY,
    products_Id INT NOT NULL,
    sales_Id INT NOT NULL,
    created_date TIMESTAMP,
    FOREIGN KEY (products_Id) REFERENCES products (id) ON DELETE CASCADE,
    FOREIGN KEY (sales_Id) REFERENCES sales (id) ON DELETE CASCADE
);
`;
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.query(sql, (err) => {
  if (err) {
    console.log(err);
    client.end();
  } else {
    client.end();
  }
});
