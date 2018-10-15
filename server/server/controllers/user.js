import express from "express";
import jwt from 'jsonwebtoken';
import users from '../dummy_data/users.json';
import config from '../configkey/key.js';

const app = express();
app.set('superSecret', config.secret);

export default {
    login(req, res){
        let token;
        let message;
    for(let user of users){
      if(user.username!=req.body.username){
          message="Wrong Name";
      }else{
          if(user.password!=req.body.password){
              message="Wrong Password";
              break;
          }
          else{
            //create the token.
               token = jwt.sign(user,app.get('superSecret'), {
          expiresIn: 86400 // expires in 24 hours
        });
              message="Login Successful";
              break;
          }
      }
    }
    //If token is present pass the token to client else send respective message
    if(token){
        res.status(200).json({
            message,
            token
        });
    }
    else{
        res.status(403).json({
            message
        });
    }
}


    
};