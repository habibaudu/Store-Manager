import productmodel from '../dummy_data/products';

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
    return res.status(200).send({message: 'Product update was successful'});
  }
  return res.status(400).json({
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
