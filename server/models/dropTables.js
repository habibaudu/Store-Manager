const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();



const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
  
pool.on('connect', () => {
  console.log('connected to the db');
});


const dropproductTable = () => {
    const queryText = 'DROP TABLE IF EXISTS products returning *';
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
   * Drop User Table
   */
  const dropUserTable = () => {
    const queryText = 'DROP TABLE IF EXISTS users returning *';
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
   * Drop Sales Table
   */
  const dropSalesTable = () => {
    const queryText = 'DROP TABLE IF EXISTS sales returning *';
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
 * Drop All Tables
 */
const dropAllTables = () => {
    dropUserTable();
    dropproductTable();
    dropSalesTable();
  }

  module.exports = {
    dropUserTable,
    dropproductTable,
    dropSalesTable
  }