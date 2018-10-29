import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

export default {
    /**
     * Create A Product for admin only
     * @param {object} req 
     * @param {object} res
     * @returns {object} product object 
     */
    async create(req, res) {
      if(req.user.role ==='ADMIN'){
      const text = `INSERT INTO
        products(id,productname, minimum,description,images,price, quantity, created_date, modified_date)
        VALUES($1, $2, $3, $4, $5, $6 , $7, $8, $9)
        returning *`;
      const values = [
        uuidv4(),
        req.body.productname,
        req.body.minimum,
        req.body.description,
        req.body.images,
        req.body.price,
        req.body.quantity,
        moment(new Date()),
        moment(new Date())
      ];
  
      try {
        const { rows } = await db.query(text, values);
        return res.status(201).send(rows[0]);
      } catch(error) {
        return res.status(400).send(error);
      }
    }else{
            
            return res.status(401).send({ 'message': 'Only An Admin can add or create a product' });
     }
    }
  
   
  }