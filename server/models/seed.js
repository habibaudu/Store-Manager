import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

import Helper from '../controllers_db/utilities/Helper';
const hash = Helper.hashPassword('hba821');

const sql = `INSERT INTO
    users(username,email,Role, password,created_date, modified_date)
    VALUES('habibaudu','auduhabib1990@gmail.com','ADMIN','$2b$08$VRlMzq6xZXxbrkyrt1JnbeQD2vdhPnHrmmQZhN.E.MdvjCmJDyXN.',Now(),Now());

    INSERT INTO
    users(username,email,Role, password,created_date, modified_date)
    VALUES('mariam','mariam@gmail.com','USER','$2b$08$VRlMzq6xZXxbrkyrt1JnbeQD2vdhPnHrmmQZhN.E.MdvjCmJDyXN.',Now(),Now());

    INSERT INTO
    users(username,email,Role, password,created_date, modified_date)
    VALUES('moses','moses@gmail.com','USER','$2b$08$VRlMzq6xZXxbrkyrt1JnbeQD2vdhPnHrmmQZhN.E.MdvjCmJDyXN.',Now(),Now());

    INSERT INTO
    users(username,email,Role, password,created_date, modified_date)
    VALUES('moses','tokenuser@gmail.com','USER','$2b$08$VRlMzq6xZXxbrkyrt1JnbeQD2vdhPnHrmmQZhN.E.MdvjCmJDyXN.',Now(),Now());

    INSERT INTO
    sales(attendants_id,totalPrice,created_date, modified_date)
    VALUES(2,75000,Now(),Now());

    INSERT INTO
    sales(attendants_id,totalPrice,created_date, modified_date)
    VALUES(3,55000,Now(),Now());

    INSERT INTO
    sales(attendants_id,totalPrice,created_date, modified_date)
    VALUES(2,150000,Now(),Now());

    INSERT INTO
    products(productname, minimum,description,images,price, quantity, created_date, modified_date)
    VALUES('Timberland Men',10,'durable boots for hiking men','path/to/picture',75000,20,Now(),Now());

    INSERT INTO
    products(productname, minimum,description,images,price, quantity, created_date, modified_date)
    VALUES('Timberland Women',10,'light weight boots for hiking women','path/to/picture',25000,15,Now(),Now());

    INSERT INTO
    products(productname, minimum,description,images,price, quantity, created_date, modified_date)
    VALUES('Allstars',10,'light weight  snikers','path/to/picture',5000,25,Now(),Now());
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


