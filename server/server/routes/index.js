import controller from '../controllers/index';

const {products } = controller


 module.exports = (app) => {
  
   app.get('/api', (req, res) => res.status(200).send({
     message: 'Welcome to the Store Manager API!',
   }));

   app.get('/api/v1/products',products.getproducts);
   app.get('/api/v1/products/:productId',products.getAproduct);  

   app.all('/sales/:salesId/', (req, res) =>
     res.status(405).send({
       message: 'Method Not Allowed',
     }));
};
