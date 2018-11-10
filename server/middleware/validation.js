/**
 * @class Validation
 */

/**
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   * @returns {object} users array
   */

  class Validation {
  
    static login(req, res, next) {
            const Testpass = /[a-zA-Z0-9]/;
            const passwordTest = /[^\S]/g;

            if (req.body.email === '') {
              return res.status(400).send({
                message: 'Please enter a valid email address',
              });
            }
            if (
              req.body.password === ''
              || typeof req.body.password === 'undefined'
              || req.body.password === null
            ) {
              return res.status(400).send({
                message: 'password field is required',
              });
            }
            if (req.body.password.length < 6 || passwordTest.test(typeof req.body.password)) {
              return res.status(400).send({
                message: 'Minimum password length is 6',
              });
            }
            if (!Testpass.test(req.body.password)) {
              return res.status(400).send({
                
                message: 'password must contain one or more alphabet',
              });
            }
            next();
    }
  
    static product(req, res, next) {
      const nonCharTest = /[^a-zA-Z0-9/\s/-]+/g;
      const charTest = /[a-zA-Z/\s]/g;
      const numTest = /[0-9]+/g;
      const imgTest = /[a-zA-Z0-9/\s/-/]+/g;
 

  if (
    !req.body.productname
    && !req.body.minimum
    && !req.body.description
    && !req.body.images
    && !req.body.price
    && !req.body.quantity
  ) {
    return res.status(400).send({
      message: 'all fields required ',
    });
  }

  if (
    req.body.description === ''
    || typeof req.body.description === 'undefined'
    || req.body.description === null
  ) {
    return res.status(400).send({
    
      message: 'description field is required',
    });
  }
  if (!charTest.test(req.body.description)) {
    return res.status(400).send({

      message: 'description must contain at least one alphabet',
    });
  }
  if (nonCharTest.test(req.body.description)) {
    return res.status(400).send({
  
      message: 'description must be alphabetic, the use of spaces and "-" are allowed',
    });
  }
  if (
    req.body.productname === ''
    || typeof req.body.productname === 'undefined'
    || req.body.productname === null
  ) {
    return res.status(400).send({
 
      message: 'productname field is required',
    });
  }
  if (!charTest.test(req.body.productname)) {
    return res.status(400).send({
     
      message: 'productname must contain at least one alphabet',
    });
  }
  if (nonCharTest.test(req.body.productname)) {
    return res.status(400).send({
      
      message: 'productname must be alphabetic, the use of spaces and "-" are allowed',
    });
  }
  if (
    req.body.quantity === ''
    || typeof req.body.quantity === 'undefined'
    || req.body.quantity === null
  ) {
    return res.status(400).send({
     
      message: 'quantity field is required',
    });
  }
  if (typeof req.body.quantity !== 'number') {
    return res.status(400).send({
      
      message: 'quantity must be a number',
    });
  }
  if (
    req.body.price === ''
    || typeof req.body.price === 'undefined'
    || req.body.price === null
  ) {
    return res.status(400).send({
      message: 'price field is required',
    });
  }

  if (typeof req.body.price !== 'number') {
    return res.status(400).send({
      
      message: 'price must be a number',
    });
  }

  if (
    req.body.minimun === ''
    || typeof req.body.minimum === 'undefined'
    || req.body.minimum === null
  ) {
    return res.status(400).send({
      message: 'minimum field is required',
    });
  }

  if (typeof req.body.minimum !== 'number') {
    return res.status(400).send({
      
      message: 'minimum must be a number',
    });
  }

  if (
    req.body.images === ''
    || typeof req.body.images=== 'undefined'
    || req.body.images === null
  ) {
    return res.status(400).send({
      message: 'image field is required',
    });
  }

  if (!imgTest.test(req.body.images)) {
    return res.status(400).send({
      
      message: 'images must be in right format',
    });
  }

  
      next();
    }

  
    static signup(req, res, next) {
            const nonCharTest = /[^a-zA-Z/\s/-]/g;
            const nameTest = /[a-zA-Z]/g;
            
            const passwordTest = /[^\S]/g;
            let str1;
            let str2;

            if (!req.body.username && !req.body.email && !req.body.password && !req.body.Role) {
              return res.status(400).send({
            
                message: 'All fields are required',
              });
            }

            if (req.body.username) {
              str1 = req.body.username;
              str2 = str1.trim();
            }
            if (
              req.body.username === ''
              || typeof req.body.username === 'undefined'
              || req.body.username === null
            ) {
              return res.status(400).send({
              
                message: 'username field is required',
              });
            }
            if (str2.length < 2) {
              return res.status(400).send({
                
                message: 'username field needs additional characters',
              });
            }
            if (!nameTest.test(req.body.username)) {
              return res.status(400).send({
    
                message: 'username must contain at least one character',
              });
            }
            if (req.body.username.length < 6) {
              return res.status(400).send({
                
                message: 'Your username must be at least 6 characters',
              });
            }
            if (nonCharTest.test(req.body.username)) {
              return res.status(400).send({
                
                message: 'username must be alphabetic, the use of spaces and - are allowed',
              });
            }
            
            if (
              req.body.password === ''
              || typeof req.body.password === 'undefined'
              || req.body.password === null
              || passwordTest.test(req.body.password)
            ) {
              return res.status(400).send({
                
                message: 'password is required',
              });
            }
            if (req.body.password.length < 6) {
              return res.status(400).send({
                message: 'Your password must be at least 6 characters',
              });
            }
            if (!nameTest.test(req.body.password)) {
              return res.status(400).send({
                
                message: 'password must contain at least 1 character',
              });
            }
            next();
    }
  
    static giverights(req, res, next) {
    
      const roleTest = /[A-Z]+/g;

  if (
    !req.body.Role
  ) {
    return res.status(400).send({
      message: 'Role fields required',
    });
  }
  if (
    req.body.Role=== ''
    || typeof req.body.Role === 'undefined'
    || req.body.Role === null
  ) {
    return res.status(400).send({
    
      message: 'Role field is required',
    });
  }

  if (!roleTest.test(req.body.Role)) {
    return res.status(400).send({
      
      message: 'Role field must contain letters In BLOCK',
    });
  }
      next();
    }
  
  }
  
  
  export default Validation;