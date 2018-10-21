import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '/Users/HabibAudu/Documents/boot/Store-Manager/server/.env' });


export default (req, res, next) => {
// check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({
          message: 'Wrong Token'
        });
      } else {
        //If decoded then call next() so that respective route is called.                  
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
