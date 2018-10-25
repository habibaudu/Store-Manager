import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../dummy_data/user.json';
import checkPassword from './Helper/checkPassword';


dotenv.config();

  export default {
    login(req, res){
        let token;
        let message;
    for(let user of users){
      if(user.username !== req.body.username){
          message="Wrong Name";
      }else{
        if(!checkPassword.comparePassword(user.password, req.body.password)) {
            message ="Wrong Password";
            console.log('wrong password');
            break;
          }
          else{
          
               token = jwt.sign(user,process.env.SECRET, {
          expiresIn: '7d'
        });
              message="Login Successful";
              break;
          }
      }
    }
  
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