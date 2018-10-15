import express from "express";
import jwt from 'jsonwebtoken';
import config from '../configkey/key.js';

const app = express();
app.set('superSecret', config.secret);
export default (req, res, next) => {
// check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if(token){
          //Decode the token
          jwt.verify(token,app.get('superSecret'),(err,decoded)=>{
            if(err){
              res.status(403).json({
                message:"Wrong Token"
              });
            }
            else{
              //If decoded then call next() so that respective route is called.
              req.decoded=decoded;
              next();
            }
          });
        }
        else{
          res.status(403).json({
            message:"No Token"
          });
        }
}

