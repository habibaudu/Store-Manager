import express from 'express';
import controller from '../controllers/controller';
import authroutes from '../middleware/authroutes';
import validation from '../middleware/validation';

const { products, users, sales } = controller;

const router = express.Router();


router.get('/products', authroutes, products.getAll);
router.put('/products/:productId',authroutes, products.update);
router.delete('/products/:productId', authroutes, products.delete);
router.get('/products/:productId',authroutes, products.getOne);
router.post('/login', validation.login, users.login);
router.get('/sales',authroutes, sales.allSales);
router.get('/sales/:saleId', authroutes, sales.getAsalesRecord);
router.post('/products', authroutes, validation.createproduct, products.create);
router.post('/sales',authroutes, sales.createSalesOrder);

export default router;
