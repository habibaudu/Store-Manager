/**
 * @class Check
 */

class Check {

  static login(req, res, next) {
    req.checkBody('password', 'password cannot be null').notEmpty();
    req.checkBody('username', ' username Must be a String').isAlpha();
    req.checkBody('username', ' username cannot be null').notEmpty();
    req.checkBody('password', 'password must contain either letters or number').isAlphanumeric();
    const errormsg = req.validationErrors();
    if (errormsg) {
      res.status(400).send({ message: 'login error', errormsg });
      return;
    }
    next();
  }

}


export default Check;
