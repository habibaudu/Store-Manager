import controller from '../controllers/index';
import auth from '../auth/authroutes.js';
import Check from './validation';
const {products ,users, sales } = controller


 module.exports = (app) => {
  
   app.get('/api', (req, res) => res.status(200).send({
     message: 'Welcome to the Store Manager API!',
   }));

   app.get('/api/v1/products',products.getproducts);
   app.get('/api/v1/products/:productId',products.getAproduct);
   app.post('/api/v1/login',Check.login,users.login);
   app.get('/api/v1/sales',auth,sales.allSales);
   app.get('/api/v1/sales/:saleId',auth,sales.getAsalesRecord);  

   app.all('/sales/salesId/', (req, res) =>
     res.status(405).send({
       message: 'Method Not Allowed',
     }));
};
