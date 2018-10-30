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
  },

  /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({'message': 'The credentials you provided is incorrect'});
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(rows[0].id,rows[0].role);
     
      let message = 'Login was successful';
      return res.status(200).send({
        message, 
        token });
    } catch(error) {
      return res.status(400).send(error)
    }
  },

  /**
   * Give admin rights to A users
   * @param {object} req 
   * @param {object} res 
   * @returns {object} users array
   */
  async grantAdminRights(req, res) {
    if(req.user.role === 'ADMIN'){
        const findOneQuery = 'SELECT firstname, lastname,email,password,Role, modified_date, id FROM users WHERE id=$1';
        const updateOneQuery =`UPDATE users 
        SET firstname=$1,lastname=$2,email=$3,password=$4,Role=$5,modified_date=$6 WHERE id = $7 returning *`;
        try {
          const { rows } = await db.query(findOneQuery, [req.params.userId]);
          if(!rows[0]) {
            return res.status(404).send({'message': 'user not found'});
          }
          const values = [
            req.body.firstname || rows[0].firstname,
            req.body.lastname || rows[0].lastname,
            req.body.email || rows[0].email,
            req.body.password || rows[0].password,
            req.body.Role || rows[0].role,
            moment(new Date()),
            req.params.userId 
          ];
          const response = await db.query(updateOneQuery, values);
          return res.status(200).send(response.rows[0]);
        } catch(err) {
          return res.status(400).send(err);
        }
  }else{
       
    return res.status(401).send({ 'message': 'Only An Admin can give privilages' });
  }
}


}

export default User;