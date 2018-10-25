import express from 'express';
import controller from '../controllers/controller';
import authroutes from '../middleware/authroutes';
import validation from '../middleware/validation';

const { products, users, sales } = controller;

const router = express.Router();


router.get('/api/v1/products', authroutes, products.getAll);
router.put('/api/v1/products/:productId',authroutes, products.update);
router.delete('/api/v1/products/:productId', authroutes, products.delete);
router.get('/api/v1/products/:productId',authroutes, products.getOne);
router.post('/api/v1/login', validation.login, users.login);
router.get('/api/v1/sales',authroutes, sales.allSales);
router.get('/api/v1/sales/:saleId', authroutes, sales.getAsalesRecord);
router.post('/api/v1/products', authroutes, validation.createproduct, products.create);
router.post('/api/v1/sales',authroutes, sales.createSalesOrder);

export default router;
