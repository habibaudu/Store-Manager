/**
 * @class Check
 */

/**
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   * @returns {object} users array
   */

  class Check {
  
    static login(req, res, next) {
      req.checkBody('password', 'password cannot be null').notEmpty();
      req.checkBody('username', ' username Must be a String').isAlpha();
      req.checkBody('username', ' username cannot be null').notEmpty();
      
      const errormsg = req.validationErrors();
      if (errormsg) {
        res.status(400).send({ message: 'login error', errormsg });
        return;
      }
      next();
    }
  
    static updateproduct(req, res, next) {
      req.checkBody('productname', 'product Name cannot be null').notEmpty();
      req.checkBody('price', 'price  cannot be null').notEmpty();
      req.checkBody('price', 'price Must be a number').isInt();
      req.checkBody('minimum', 'minimum can not be empty').notEmpty();
      req.checkBody('minimum', 'minimum must be a number ').isInt();
      req.checkBody('quantity', 'quantity can not be empty').notEmpty();
      req.checkBody('quantitiy', 'quantity must be a number ').isInt();
      req.checkBody('decription', 'description can not be empty').notEmpty();
      req.checkBody('description', 'description must be alpha ').isAlpha();
      req.checkBody('images', 'images can not be empty').notEmpty();
     
    
      const errormsg = req.validationErrors();
      if (errormsg) {
        res.status(400).send({ message: 'create product error', errormsg });
        return;
      }
      next();
    }
  
  
    static salesRecord(req, res, next) {
      req.checkBody('product', 'product Name cannot be null').notEmpty();
      
      req.checkBody('price', 'price cannot be null').notEmpty();
      req.checkBody('price', 'price Must be a number').isInt();
      req.checkBody('quantity', 'quantity cannot be null').notEmpty();
      
      req.checkBody('customerName', 'customerName cannot be null').notEmpty();
     
  
      const errormsg = req.validationErrors();
      if (errormsg) {
        res.status(400).send({ message: 'create product error', errormsg });
        return;
      }
      next();
    }
  
    static signup(req, res, next) {
      req.checkBody('username', 'username  cannot be null').notEmpty()
      req.checkBody('password', 'password cannot be null').notEmpty();
      req.checkBody('username', 'username Must be a String').isAlpha();
      req.checkBody('password', 'password must contain either letters or number').isAlphanumeric();
      req.checkBody('email', 'email cannot be null').notEmpty();
      const errormsg = req.validationErrors();
      if (errormsg) {
        res.status(400).send({ message: 'signup error', errormsg });
        return;
      }
      next();
    }
  
    static signin(req, res, next) {
      req.checkBody('password', 'password cannot be null').notEmpty();
      req.checkBody('password', 'password must contain either letters or number').isAlphanumeric();
      req.checkBody('email', 'email cannot be null').notEmpty();
      const errormsg = req.validationErrors();
      if (errormsg) {
        res.status(400).send({ message: 'login error', errormsg });
        return;
      }
      next();
    }
  
    static giverights(req, res, next) {
      req.checkBody('Role', 'ROLE  cannot be null').notEmpty();
      req.checkBody('Role','Role Must be a String').isAlpha();
      const errormsg = req.validationErrors();
      if (errormsg) {
        res.status(400).send({ message: 'events error', errormsg });
        return;
      }
      next();
    }
  
  }
  
  
  export default Check;