import controller from '../controllers/index';
import auth from '../middleware/authroutes';
import Check from '../middleware/validation';

const { products, users, sales } = controller;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Store Manager API!',
  }));

  app.get('/api/v1/products', products.getproducts);
  app.get('/api/v1/products/:productId', products.getAproduct);
  app.post('/api/v1/login', Check.login, users.login);
  app.get('/api/v1/sales', auth, sales.allSales);
  app.get('/api/v1/sales/:saleId', auth, sales.getAsalesRecord);
  app.post('/api/v1/products', auth, Check.createproduct, products.createProduct);
  app.post('/api/v1/sales', auth, Check.salesRecord, sales.createSalesOrder);
  app.all('/sales/salesId/', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};