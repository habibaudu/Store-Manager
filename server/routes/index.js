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

const { User, Product, Sales } = controller_db;

const router = express.Router();

router.post('/users',User.create);
router.post('/users/login',User.login);
router.post('/products',auth.verifyToken,Product.create);
router.put('/products/:productId',auth.verifyToken,Product.update);
router.delete('/products/:productId',auth.verifyToken,Product.delete);
router.get('/products',auth.verifyToken,Product.getAll);
router.get('/products/:productId',auth.verifyToken,Product.getOne);
router.post('/sales',auth.verifyToken,Sales.create);
router.get('/sales/:salesId',auth.verifyToken,Sales.getOne);
router.get('/sales',auth.verifyToken,Sales.getAll);
router.get('/sale',auth.verifyToken,Sales.getMy);



export default router;
