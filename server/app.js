import 'babel-polyfill';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';
import index from './routes/index';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(expressValidator());


app.use(logger('dev'));


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const port = process.env.PORT || 80;

app.use(function(req, res, next) {
  var oneof = false;
  if(req.headers.origin) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      oneof = true;
  }
  if(req.headers['access-control-request-method']) {
      res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
      oneof = true;
  }
  if(req.headers['access-control-request-headers']) {
      res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
      oneof = true;
  }
  if(oneof) {
      res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }

  // intercept OPTIONS method
  if (oneof && req.method == 'OPTIONS') {
      res.send(200);
  }
  else {
      next();
  }
});
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

app.use('/api/v1', index);

app.get('*', (req, res) => res.status(200).send({ message: 'Welcome To Store Manager Api' }));

app.listen(port, () => {
  console.log('app running on port ', port);
});

export default app;
