import 'babel-polyfill';
import express from 'express';
import dotenv from 'dotenv';


import controllers from '../controllers/controllers';
import controller_db from '../controllers_db/controllers_db';
import authroutes from '../middleware/authroutes';
import auth from '../middleware/auth';
import validation from '../middleware/validation';

dotenv.config();
const controller = process.env.TYPE === 'db' ? controller_db : controllers ;

const { User } = controller_db;

const router = express.Router();

router.post('/users',User.create);
router.post('/users/login',User.login);



// router.get('/products', authroutes, products.getAll);
// router.put('/products/:productId',authroutes, products.update);
// router.delete('/products/:productId', authroutes, products.delete);
// router.get('/products/:productId',authroutes, products.getOne);
// router.post('/login', validation.login, users.login);
// router.get('/sales',authroutes, sales.allSales);
// router.get('/sales/:saleId', authroutes, sales.getAsalesRecord);
// router.post('/products', authroutes, validation.createproduct, products.create);
// router.post('/sales',authroutes, sales.createSalesOrder);

export default router;
