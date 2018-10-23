// import products from '../dummy_data/products.json';
import productmodel from '../dummy_data/products';

// export default {
//   getproducts(req, res) {
//     if (products) {
//       return res.status(200).json({
//         products,
//         error: false
//       });
//     }
//     return res.status(404).json({
//       message: 'Could not get products',
//       error: true
//     });
//   },
//   getAproduct(req, res) {
//     for(let product of products){
//       if (product.id === parseInt(req.params.productId, 10)) {
//         const { id, productName, priceEach, inStock, mininumAllowedinStock, date } = product;
//         const aProduct = [
//           {
//             id,
//             productName,
//             priceEach,
//             inStock,
//             mininumAllowedinStock,
//             date
//           }
//         ];
//         return res.status(200).json({
//           aProduct,
//           error: false
//         });
//       }
//     }

//     return res.status(404).json({
//       message: 'Product not found',
//       error: true
//     });
//   },

//   createProduct(req, res) {
//     if (req.decoded.role === 'Admin') {
//       if (!req.body.productName || !req.body.priceEach || !req.body.mininumAllowedinStock || !req.body.Date || !req.body.inStock || !req.body.id) {
//         return res.json({
//           message: 'NO product created',
//           error: true
//         });
//       }
//       let Date2 = req.body.Date;
//       Date2 = Date2.match(/^(\d{1,2})(\/)(\d{1,2})(\/)(\d{4})$/)||[Date2];
//       if (Date2.length > 1) {
//         products.push(req.body);
//         return res.status(201).json({
//           message: 'products Created successfully',
//           error: false
//         });
//       }
//       return res.json({
//         message: 'wrong Date format, enter in 12/08/2020',
//         error: true
//       });
//     }
//     return res.json({
//       message: 'Only the admin can create a product',
//       error: true
//     });
//   }

// };

const product = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} product object 
   */
  create(req, res) {
    if (req.decoded.role === 'Admin') {
    if (!req.body.productName && !req.body.priceEach && !req.body.inStock && !req.body.mininumAllowedinStock) {
      return res.status(400).send({ message: 'All fields are required'})
    }
    const product = productmodel.create(req.body);
    return res.status(201).send({ message: 'products Created successfully'});
  }
  return res.json({
           message: 'Only the admin can create a product',
           error: true
         });
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} product array
   */
  getAll(req, res) {
    if (req.decoded.role === 'Admin' || req.decoded.role === 'user') {
    const products = productmodel.findAll();
    return res.status(200).send(products);
  }
  return res.json({
    message: 'Only a registered user can get all product',
    error: true
  });
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} products object
   */
  getOne(req, res) {
    if (req.decoded.role === 'Admin' || req.decoded.role === 'user') {
    const product = productmodel.findOne(req.params.productId);
    if (!product) {
      return res.status(404).send({message: 'product not found'});
    }
    return res.status(200).send(product);
  }

  return res.json({
    message: 'Only a registered user access a product',
    error: true
  });
    
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated product
   */
  update(req, res) {
    if (req.decoded.role === 'Admin') {
    const product = productmodel.findOne(req.params.productId);
    if (!product) {
      return res.status(404).send({message: 'product not found'});
    }
    const updatedproduct = productmodel.update(req.params.productId, req.body);
    return res.status(200).send(updatedproduct);
  }
  return res.json({
    message: 'Only an admin can update a product',
    error: true
  });
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return static code 204 
   */
  delete(req, res) {
    if (req.decoded.role === 'Admin') {
    const product = productmodel.findOne(req.params.productId);
    if (!product) {
      return res.status(404).send({message: 'product not found'});
    }
    const ref = productmodel.delete(req.params.productId);
    return res.status(204).send(ref);
  }
  return res.json({
    message: 'Only an admin can delete a product',
    error: true
  });
   }
}

export default product;
