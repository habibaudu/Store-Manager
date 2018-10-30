import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

export default {
  /**
   * Create A  for sales Record only for store attendants
   * @param {object} req 
   * @param {object} res
   * @returns {object} sales object 
   */
  async create(req, res) {
    // if(req.user.role === 'USER'){
    
    const text = `INSERT INTO
      sales(id,attendants_id, salesOrders,totalPrice ,created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;

    let total = 0;
    for(let i = 0; i < req.body.salesOrders.length; i++) {
      const { product_id , quantity } = req.body.salesOrders[i];
      const findOneQuery = 'SELECT * FROM products WHERE id=$1';
        
      try {
        const { rows } = await db.query(findOneQuery, [product_id]);

        if(!rows[0]) {
          return res.status(404).send({ message : 'product not found'});
        }
                
        if(rows[0].quantity < quantity) {
          return res.status(400).send({ message: 'quantity exceeds available product inStock'});
        }

        total += rows[0].price * quantity;

      }catch(error) {
        return res.status(400).send(error);
      }

            
    }

    for (let i = 0; i < req.body.salesOrders.length; i++) {
        const { product_id , quantity } = req.body.salesOrders[i];
        const findOneQuery = 'SELECT * FROM products WHERE id=$1';
          
        try {
          const { rows } = await db.query(findOneQuery, [product_id]);

          const newQuantity = rows[0].quantity - quantity;
          const updateOneQuery =`UPDATE products SET quantity=$1
            WHERE id=$2 `;
            
          const response = await db.query(updateOneQuery,[newQuantity,product_id] );
  
         
        }catch(error) {
          return res.status(400).send(error);
        }
  
              
      }
    
    const values = [
      uuidv4(),
      req.user.id,
      JSON.stringify(req.body.salesOrders),
      total,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
        console.log(error)
      return res.status(400).send(error);
    }

    
    // }else{

    // return res.status(401).send({ 'message': 'Only A User can create a  sales record' });
    // }
  }

}
