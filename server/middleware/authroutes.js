import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export default (req, res, next) => {

  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({
          message: 'Wrong Token'
        });
      } else {
                         
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({
      message: 'No Token'
    });
  }
};
