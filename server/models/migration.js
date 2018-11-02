const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.DATABASE_URL);
const pool = new Pool({
   connectionString: process.env.DATABASE_URL
});
pool.on('connect', () => {
  console.log('connected to the db');
});


const createsalesTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      sales(
        id UUID PRIMARY KEY,
        attendants_Id UUID NOT NULL,
        totalPrice  INT,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        FOREIGN KEY (attendants_Id) REFERENCES users (id) ON DELETE CASCADE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
}


/**
 * Create User Table
 */

const createUserTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        username VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        Role VARCHAR(11) NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
}

const createproductSalesTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      productSales(
        id UUID PRIMARY KEY,
        products_Id UUID NOT NULL,
        sales_Id UUID NOT NULL,
        created_date TIMESTAMP,
        FOREIGN KEY (products_Id) REFERENCES products (id) ON DELETE CASCADE,
        FOREIGN KEY (sales_Id) REFERENCES sales (id) ON DELETE CASCADE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}


/**
 * Create products Table
 */

const createProductTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      products(
        id UUID PRIMARY KEY,
        productname TEXT NOT NULL,
        minimum INT  NOT NULL,
        description TEXT NOT NULL,
        price  INT  NOT NULL,
        quantity INT NOT NULL,
        images TEXT NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
}
createproductSalesTable();
createProductTable();
createsalesTable();
createUserTable();


pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});



