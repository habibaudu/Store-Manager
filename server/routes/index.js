import 'babel-polyfill';
import express from 'express';
import dotenv from 'dotenv';

import controller_db from '../controllers_db/controllers_db';
import auth from '../middleware/auth';
import validation from '../middleware/validation';

dotenv.config();


const { User, Product, Sales } = controller_db;

const router = express.Router();

router.post('/auth/signup',validation.signup,auth.verifyToken,User.create);
router.post('/auth/login',validation.login,User.login);
router.get('/users',auth.verifyToken,User.getAllUsers);
router.delete('/users/:userId',auth.verifyToken,User.delete);
router.post('/products',validation.product,auth.verifyToken,Product.create);
router.put('/products/:productId',validation.product,auth.verifyToken,Product.update);
router.delete('/products/:productId',auth.verifyToken,Product.delete);
router.get('/products',auth.verifyToken,Product.getAll);
router.get('/products/:productId',auth.verifyToken,Product.getOne);
router.post('/sales',auth.verifyToken,Sales.create);
router.get('/sales/:salesId',auth.verifyToken,Sales.getOne);
router.get('/sales',auth.verifyToken,Sales.getAll);
router.get('/sale',auth.verifyToken,Sales.getMy);
router.put('/users/:userId',validation.giverights,auth.verifyToken,User.grantAdminRights);



export default router;
