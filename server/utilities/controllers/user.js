import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../dummy_data/user.json';


dotenv.config({ path: '/Users/HabibAudu/Documents/boot/Store-Manager/server/.env' });

export default {
  login(req, res) {
    let token;
    let message;
    users.forEach((user) => {
      if (user.username !== req.body.username) {
        message = 'Wrong Name';
        return res.status(403).json({
          message
        });
      } 
      if (user.password !== req.body.password) {
        message = 'Wrong Password';
        return res.status(403).json({
          message
        });
      } 

      // create the token.
      token = jwt.sign(user, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });
      message = 'Login Successful';
      return res.status(200).json({
        message,
        token
      });
    });

    // If token is present pass the token to client else send respective message

    if (token) {
      res.status(200).json({
        message,
        token
      });
    } else {
      res.status(403).json({
        message
      });
    }
  }
};
