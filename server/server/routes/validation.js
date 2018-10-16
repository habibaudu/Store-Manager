/**
 * @class Check
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

  static createproduct(req, res, next) {
    req.checkBody('productName', 'product Name cannot be null').notEmpty();

    req.checkBody('priceEach', 'priceEach cannot be null').notEmpty();
    req.checkBody('priceEach', 'priceEach Must be a number').isInt();
    req.checkBody('mininumAllowedinStock', 'mininumAllowedinStock cannot be null').notEmpty();
  
    req.checkBody('Date', 'Date cannot be null').notEmpty();
    req.checkBody('inStock', 'inStock cannot be null').notEmpty();
  

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
    
    req.checkBody('Date', 'Date cannot be null').notEmpty();
    req.checkBody('customerName', 'customerName cannot be null').notEmpty();
   

    const errormsg = req.validationErrors();
    if (errormsg) {
      res.status(400).send({ message: 'create product error', errormsg });
      return;
    }
    next();
  }

}


export default Check;
