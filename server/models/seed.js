import db from  '../db';
import moment from 'moment';
import uuidv4 from 'uuid/v4';

const sales1 ="salesOrders": [{"product_id" :"d88dddca-dba9-4ff4-8eaf-506a6afe7708","quantity":2},{"product_id" :"d88dddca-dba9-4ff4-8eaf-506a6afe7708", "quantity" :4} ]}

const sales2 ="salesOrders": [{"product_id" :"d88dddca-dba9-4ff4-8eaf-506a6afe7708","quantity":5},{"product_id" :"d88dddca-dba9-4ff4-8eaf-506a6afe7708", "quantity" :10} ]}

const sales3 ="salesOrders": [{"product_id" :"d88dddca-dba9-4ff4-8eaf-506a6afe7708","quantity":3},{"product_id" :"d88dddca-dba9-4ff4-8eaf-506a6afe7708", "quantity" :20} ]}

const text = `INSERT INTO
      sales(id,attendants_id, salesOrders,totalPrice ,created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
       *`;

       const values = [
        uuidv4(),
        1,
        JSON.stringify(sales1),
        total,
        moment(new Date()),
        moment(new Date())
      ];

db.query(text,values);

const value2 = [
    uuidv4(),
    2,
    JSON.stringify(sales2),
    total,
    moment(new Date()),
    moment(new Date())
  ];
db.query(text,values2);

const value3 = [
    uuidv4(),
    3,
    JSON.stringify(sales3),
    total,
    moment(new Date()),
    moment(new Date())
  ];
db.query(text,values3);

const producttext = `INSERT INTO
        products(id,productname, minimum,description,images,price, quantity, created_date, modified_date)
        VALUES($1, $2, $3, $4, $5, $6 , $7, $8, $9)
        returning *`;
 
        const productvalue1 = [
            uuidv4(),
            'Timberland Men',
            34,
            'durable boots',
            'http:uuiiiggggg//dfff',
            300,
            50,
            moment(new Date()),
            moment(new Date())
          ];
db.query(producttext,productvalue)

const productvalue2 = [
    uuidv4(),
    'snikkers',
    40,
    'durable women boots',
    'http:uuiiiggggg//dfff',
    3000,
    50,
    moment(new Date()),
    moment(new Date())
  ];
db.query(producttext,productvalue2);

const usertext =  `INSERT INTO
users(id, username,email,Role, password,created_date, modified_date)
VALUES($1, $2, $3, $4, $5,$6,$7)
returning *`;

const usersvalues = [
    uuidv4(),
    'Habibaudu',
    'auduhabib1990@gmail.com',
    'ADMIN',
    'hba821',
    moment(new Date()),
    moment(new Date())
  ];
db.query(usertext,usersvalues);

const usersvalues2 = [
    uuidv4(),
    'moses',
    'mose1990@gmail.com',
    'USER',
    'moses821',
    moment(new Date()),
    moment(new Date())
  ];
db.query(usertext,usersvalues2);