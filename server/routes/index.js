import controller from '../controllers/controller';
import authroutes from '../middleware/authroutes';
import validation from '../middleware/validation';

const { products, users, sales } = controller;


module.exports = (app) => {

  app.get('/api/v1/products', authroutes, products.getAll);
  app.put('/api/v1/products/:productId',authroutes, products.update);
  app.delete('/api/v1/products/:productId', authroutes, products.delete);
  app.get('/api/v1/products/:productId',authroutes, products.getOne);
  app.post('/api/v1/login', validation.login, users.login);
  app.get('/api/v1/sales',authroutes, sales.allSales);
  app.get('/api/v1/sales/:saleId', authroutes, sales.getAsalesRecord);
  app.post('/api/v1/products', authroutes, validation.createproduct, products.create);
  app.post('/api/v1/sales',authroutes, sales.createSalesOrder);
}
