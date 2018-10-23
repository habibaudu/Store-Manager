import moment from 'moment';
import uuid from 'uuid';

import sales from '../dummy_data/sales.json';

export default {
  allSales(req, res) {
    if (req.decoded.role === 'Admin') {
      return res.status(200).json({
        sales,
        error: false
      });
    }
    return res.status(404).json({
      message: 'Only the admin can access all sales',
      error: true
    });
  },

  getAsalesRecord(req, res) {
    for(let sale of sales) {
      if (sale.id === parseInt(req.params.saleId, 10)) {
        const { id, username, customerName, date, price, product, quantity } = sale;
        const aSale = [
          {
            id,
            username,
            customerName,
            date,
            price,
            product,
            quantity
          }
        ];
        if (req.decoded.role === 'Admin' || req.decoded.username === username) {
          return res.status(200).json({
            aSale,
            error: false
          });
        }
        return res.status(401).json({
          message: 'Only the Admin or the creator of the sales record can access',
          error: true
        });
      }
    }

    return res.status(404).json({
      message: 'Sale record not found',
      error: true
    });
  },

  createSalesOrder(req, res) {
    if (req.decoded.role === 'user') {
      if (!req.body.product || !req.body.price || !req.body.quantity || !req.body.username || !req.body.customerName ) {
        return res.json({
          message: 'NO sales order created',
          error: true
        });
      }

      const newsales = {
        id: uuid.v4(),
        product: req.body.product || '',
        price: req.body.price || '',
        quantity: req.body.quantity || '',
        username: req.body.username || '',
        customerName: req.body.customerName || '',
        created_at: moment.now(),
      };

      sales.push(newsales);

      return res.json({
        message: 'sales Created successfully',
        error: false
      });
    }
   
    return res.json({
      message: 'Only a store attendant  can create a sales record',
      error: true
    });
  }

};
