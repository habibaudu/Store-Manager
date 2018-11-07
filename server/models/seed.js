import db from  '../db';
import moment from 'moment';

import Helper from '../controllers_db/utilities/Helper';

const seedsales = () => {
  const salestext = `INSERT INTO
      sales(id,attendants_id,totalPrice,created_date, modified_date)
      VALUES($1, $2, $3, $4, $5) `;
   
         
       const values = [
        1,
        1,
        25000,
        moment(new Date()),
        moment(new Date())
      ];
    db.query(salestext,values);
  
    const value2 = [
      2,
      2,
      55000,
      moment(new Date()),
      moment(new Date())
    ];
  db.query(salestext,value2);
  
  
const value3 = [
  3,
  1,
  100000,
  moment(new Date()),
  moment(new Date())
];
db.query(salestext,value3);
  }
  
  seedsales();

const hash = Helper.hashPassword('hba821');
const seedproduct = () => {
const producttext = `INSERT INTO
        products(productname, minimum,description,images,price, quantity, created_date, modified_date)
        VALUES($1, $2, $3, $4, $5, $6 , $7, $8)
        returning *`;
 
        const productvalue1 = [
            'Timberland Men',
            34,
            'durable boots',
            'http:uuiiiggggg//dfff',
            300,
            50,
            moment(new Date()),
            moment(new Date())
          ];
  db.query(producttext,productvalue1);

  const productvalue2 = [

    'Women snikkers',
    30,
    'durable women boots',
    'http:uuiiiggggg//dfff',
    200,
    50,
    moment(new Date()),
    moment(new Date())
  ];
db.query(producttext,productvalue2);

const productvalue3 = [
  'ALL Stars',
  60,
  'durable Boots for hiking',
  'http:uuiiiggggg//dfff',
  100,
  50,
  moment(new Date()),
  moment(new Date())
];
db.query(producttext,productvalue3);
}

seedproduct();


const seedusers = ()=>{

const usertext =  `INSERT INTO
    users(id,username,email,Role, password,created_date, modified_date)
    VALUES($1, $2, $3, $4, $5,$6,$7)`;

const usersvalues = [
    1,
    'Habibaudu',
    'auduhabib1990@gmail.com',
    'ADMIN',
     hash,
    moment(new Date()),
    moment(new Date())
  ];
db.query(usertext,usersvalues);

const usersvalues2 = [
    2,
    'moses',
    'mose@gmail.com',
    'USER',
    hash,
    moment(new Date()),
    moment(new Date())
  ];
db.query(usertext,usersvalues2);

const usersvalues3 = [
  3,
  'mariam',
  'mariame@gmail.com',
  'USER',
  hash,
  moment(new Date()),
  moment(new Date())
];
db.query(usertext,usersvalues3);

}

seedusers();


// const seedproductsales = () => {
//   const text = `INSERT INTO
//       productSales(id,products_id, sales_id,created_date)
//       VALUES($1, $2, $3, $4) `;
   
         
//        const values = [
//         1,
//         1,
//         1,
//         moment(new Date())
//       ];
//     db.query(text,values);
  
//     const value2 = [
//       2,
//       2,
//       2,
//       moment(new Date())
//     ];
//   db.query(text,value2);
  
  
// const value3 = [
//   3,
//   2,
//   2,
//   moment(new Date())
// ];
// db.query(text,value3);
//   }
  
// seedproductsales();


