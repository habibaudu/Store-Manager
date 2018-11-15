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
    VALUES('Timberland Women',10,'durable boots for hiking men','img/timberland women.jpg',30000,20,Now(),Now());

    INSERT INTO
    products(productname, minimum,description,images,price, quantity, created_date, modified_date)
    VALUES('Men Loafers',10,'light weight boots for hiking women','img/men loafers.jpg',5000,70,Now(),Now());

    INSERT INTO
    products(productname, minimum,description,images,price, quantity, created_date, modified_date)
    VALUES('steel pipe dance',10,'light weight  snikers','img/steel pipe dance.jpg',5000,25,Now(),Now());

    INSERT INTO
    products(productname, minimum,description,images,price, quantity, created_date, modified_date)
    VALUES('Cycling Shoes',10,'light weight  snikers','img/ccling shoes.jpg',6000,20,Now(),Now());

    INSERT INTO
    products(productname, minimum,description,images,price, quantity, created_date, modified_date)
    VALUES('Adidas Women',10,'light weight  snikers','img/adidas women.jpg',6000,20,Now(),Now());

    INSERT INTO
    products(productname, minimum,description,images,price, quantity, created_date, modified_date)
    VALUES('Block Heel  Sandal',10,'light weight  snikers','img/block heel transparent sandal.jpg',7000,30,Now(),Now());

    INSERT INTO
    products(productname, minimum,description,images,price, quantity, created_date, modified_date)
    VALUES('Vans pro skate',10,'light weight  snikers','img/vans pro skate.png',7000,30,Now(),Now());

    INSERT INTO
    products(productname, minimum,description,images,price, quantity, created_date, modified_date)
    VALUES('Blue Nike Shoes',10,'light weight  snikers','img/blue nike shoe.jpeg',7000,45,Now(),Now());

    INSERT INTO
    products(productname, minimum,description,images,price, quantity, created_date, modified_date)
    VALUES('Anbessa Women Shoe',10,'light weight  snikers','img/anbessa women shoe.jpg',3000,45,Now(),Now());

    INSERT INTO
    products(productname, minimum,description,images,price, quantity, created_date, modified_date)
    VALUES('Women Bridals',10,'light weight  snikers','img/women bridals.jpg',5000,30,Now(),Now());

    INSERT INTO
    products(productname, minimum,description,images,price, quantity, created_date, modified_date)
    VALUES('Blue Timberland',10,'light weight  snikers','img/shoe5.jpg',75000,30,Now(),Now());

    INSERT INTO
    products(productname, minimum,description,images,price, quantity, created_date, modified_date)
    VALUES('Men Shoe',10,'light weight  snikers','img/shoe3.jpg',7500,20,Now(),Now());
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


