import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../dummy_data/user.json';
import Helper from './Helper';


dotenv.config({ path: '/Users/HabibAudu/Documents/boot/Store-Manager/server/.env' });

  export default {
    login(req, res){
        let token;
        let message;
    for(let user of users){
      if(user.username !== req.body.username){
          message="Wrong Name";
      }else{
        if(!Helper.comparePassword(user.password, req.body.password)) {
            message ="Wrong Password";
            console.log('wrong password');
            break;
          }
          else{
            //create the token.
               token = jwt.sign(user,process.env.SECRET, {
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