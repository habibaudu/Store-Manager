import products from '../dummy_data/products.json';

export default {
  getproducts(req, res) {
    if (products) {
      return res.status(200).json({
        products,
        error: false
      });
    }
    return res.status(404).json({
      message: 'Could not get products',
      error: true
    });
  },
  getAproduct(req, res) {
    products.forEach((product) => {
      if (product.id === parseInt(req.params.productId, 10)) {
        const { id, productName, priceEach, inStock, mininumAllowedinStock, date } = product;
        const aProduct = [
          {
            id,
            productName,
            priceEach,
            inStock,
            mininumAllowedinStock,
            date
          }
        ];
        return res.status(200).json({
          aProduct,
          error: false
        });
      }
    });

    return res.status(404).json({
      message: 'Product not found',
      error: true
    });
  },

  createProduct(req, res) {
    if (req.decoded.role === 'Admin') {
      if (!req.body.productName || !req.body.priceEach || !req.body.mininumAllowedinStock || !req.body.Date || !req.body.inStock || !req.body.id) {
        return res.json({
          message: 'NO product created',
          error: true
        });
      }
      let Date2 = req.body.Date;
      Date2 = Date2.match(/^(\d{1,2})(\/)(\d{1,2})(\/)(\d{4})$/)||[Date2];
      if (Date2.length > 1) {
        products.push(req.body);
        return res.status(201).json({
          message: 'products Created successfully',
          error: false
        });
      }
      return res.json({
        message: 'wrong Date format, enter in 12/08/2020',
        error: true
      });
    }
    return res.json({
      message: 'Only the admin can create a product',
      error: true
    });
  }

};