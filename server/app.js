import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import controller from './utilities/controllers/controller';
import auth from './utilities/middleware/authroutes';
import Check from './utilities/middleware/validation';

const { products, users, sales } = controller;
/**
 * set up app server
 */


const app = express();

/**
  * express validator to validate user input
  */

app.use(expressValidator());

/**
 * log request to the console
 */

app.use(logger('dev'));

/**
 * Parsing incomming data request
 */

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));


/**
 * created my server using http.createServer
 * @param {app} - express app
 * set port to 4000
 * @param {integer} - port number
 * server.listen(port)
 * @param {integer} -Binds and listens for connections on port 4000
 * @param {function} - callback function that console port number
 */

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
app.listen(8080);
console.log('app running on port ', 8080);


app.get('*', (req, res) => res.status(200).send({ message: 'Welcome To Store Manager Api' }));

export default app;
