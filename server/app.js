import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

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

app.listen(8080);
console.log('app running on port ', 8080);

require('../server/routes')(app);

app.get('*', (req, res) => res.status(200).send({ message: 'Welcome To Store Manager Api' }));

export default app;
