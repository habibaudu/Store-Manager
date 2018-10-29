import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import Helper from './utilities/Helper';

const User = {
  /**
   * Create A User for Admin only
   * @param {object} req 
   * @param {object} res
   * @returns {object} user  object 
   */
   async create(req, res) {
    // if(req.user.role === 'ADMIN'){
    if (!req.body.email || !req.body.password || !req.body.username || !req.body.Role) {
      return res.status(400).send({'message': 'All fields are required'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    
    const createQuery = `INSERT INTO
      users(id, username,email,Role, password,created_date, modified_date)
      VALUES($1, $2, $3, $4, $5,$6,$7)
      returning *`;
    const values = [
      uuidv4(),
      req.body.username,
      req.body.email,
      req.body.Role,
      hashPassword,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      // const token = Helper.generateToken(rows[0].id,rows[0].Role);
      let message = 'Registration was successful';
      return res.status(201).send({message});
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' })
      }
      return res.status(400).send(error);
    }
// }else{

//     return res.status(401).send({ 'message': 'Available to Only the Admin' });
// }
  }

}

export default User;