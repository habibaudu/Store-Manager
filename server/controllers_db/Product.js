import moment from 'moment';

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
        products(productname, minimum,description,images,price, quantity, created_date, modified_date)
        VALUES($1, $2, $3, $4, $5 , $6, $7, $8)
        returning *`;
      const values = [
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
        return res.status(201).send({message: 'Product Created sucessfully' });
      } catch(error) {
        return res.status(400).send(error);
      }
    }else{
            
      return res.status(401).send({message: 'Only An Admin can add or create a product' });
    }
  },

  /**
   * Update A product for Admin only
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated product
   */
  async update(req, res) {
    if (req.user.role === 'ADMIN') {
      const findOneQuery = 'SELECT * FROM products WHERE id=$1';
      const updateOneQuery =`UPDATE products SET productname=$1,description=$2,minimum=$3,price=$4,quantity=$5,images=$6,modified_date=$7
      WHERE id=$8 returning *`;
      try {
        const { rows } = await db.query(findOneQuery, [req.params.productId]);
        if(!rows[0]) {
          return res.status(404).send({message: 'product not found'});  }
        const values = [
          req.body.productname || rows[0].productname,
          req.body.description || rows[0].description,
          req.body.minimum || rows[0].minimum,
          req.body.price || rows[0].price,
          req.body.quantity || rows[0].quantity,
          req.body.images || rows[0].images,
          moment(new Date()),
          req.params.productId];
        const response = await db.query(updateOneQuery, values);
        return res.status(200).send({message: 'product updated sucessfully'});
      } catch(err) {
        return res.status(400).send(err); }
    } else {  
      return res.status(401).send({ 'message': 'Only An Admin can update a product' }); }
  },

  /**
   * Delete A product
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  async delete(req, res) {
    if (req.user.role === 'ADMIN') {
      const deleteQuery = 'DELETE FROM products WHERE id=$1 returning *';
      try {
        const { rows } = await db.query(deleteQuery, [req.params.productId]);
        if(!rows[0]) {
          return res.status(404).send({message: 'product not found'});
        }
        return res.status(200).send({ message: 'product deleted' });
      } catch(error) {
        return res.status(400).send(error);
      }
    }else{ 
      return res.json({
        message: 'Only an admin can delete a product' }); }
  },

  /**
   * Get All products
   * @param {object} req 
   * @param {object} res 
   * @returns {object} products array
   */
  async getAll(req, res) {
    if (req.user.role === 'ADMIN' || req.user.role === 'USER') {
      const findAllQuery = 'SELECT * FROM products';
      try {
        const { rows, rowCount } = await db.query(findAllQuery);
        return res.status(200).send({ rows, rowCount });
      } catch(error) {
        return res.status(400).send(error);
      }
    } else { 
      return res.status(401).send({ message: 'Only An Admin or a store attendant can get all product' });
    }
  },

  /**
   * Get A product
   * @param {object} req 
   * @param {object} res
   * @returns {object} product object
   */
  async getOne(req, res) {
    if (req.user.role === 'ADMIN' || req.user.role === 'USER') {
      const text = 'SELECT * FROM products WHERE id = $1';
      try {
        const { rows } = await db.query(text, [req.params.productId]);
        if (!rows[0]) {
          return res.status(404).send({message: 'product not found'});
        }
        return res.status(200).send(rows[0]);
      } catch(error) {
        return res.status(400).send(error)
      }
    } else { 
      return res.status(401).send({ message: 'Only An Admin or a store attendant can get a product' });
    }
  }  
}