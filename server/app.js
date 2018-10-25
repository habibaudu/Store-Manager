import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';

import index from './routes/index';

dotenv.config();
const app = express();
app.use(expressValidator());


app.use(logger('dev'));


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;

app.use('/api/v1', index);

app.get('*', (req, res) => res.status(200).send({ message: 'Welcome To Store Manager Api' }));

app.listen(port, () => {
  console.log('app running on port ', port);
});

export default app;
