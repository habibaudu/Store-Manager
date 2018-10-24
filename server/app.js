import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import controller from './controllers/controller';
import authroutes from './middleware/authroutes';
import validation from './middleware/validation';

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

app.get('/api/v1/products',authroutes, products.getAll);
app.put('/api/v1/products/:productId', authroutes, products.update);
app.delete('/api/v1/products/:productId',authroutes, products.delete);
app.get('/api/v1/products/:productId', authroutes, products.getOne);
app.post('/api/v1/login', validation.login, users.login);
app.get('/api/v1/sales',authroutes, sales.allSales);
app.get('/api/v1/sales/:saleId', authroutes, sales.getAsalesRecord);
app.post('/api/v1/products', authroutes, validation.createproduct, products.create);
app.post('/api/v1/sales',authroutes, validation.salesRecord, sales.createSalesOrder);
app.listen(8080);
console.log('app running on port ', 8080);


app.get('*', (req, res) => res.status(200).send({ message: 'Welcome To Store Manager Api' }));

export default app;
