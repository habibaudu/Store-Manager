/**
 * @class Validation2
 */
/**
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   * @returns {object} users array
   */

class Validation2 {

  static Updateproduct(req, res, next) {
    const nonCharTest = /[^a-zA-Z0-9/\s/-/.]+/g;

    if (typeof req.body.description !== "string") {
      return res.status(400).send({ message: 'description must be string' }); }
    if (nonCharTest.test(req.body.description)) {
      return res.status(400).send({ message: 'description must be alphabetic, the use of spaces and "-" are allowed'}); }
    if ( typeof req.body.productname !== 'string') {
      return res.status(400).send({ message: 'Product Name must be string'});  }
    if (nonCharTest.test(req.body.productname)) {
      return res.status(400).send({message: 'productname must be alphabetic, the use of spaces and "-" are allowed'}); }
    if ( req.body.quantity < 5) {
      return res.status(400).send({ message: 'quantity must  be five and above'});  }
    if (typeof req.body.quantity !== 'number') {
      return res.status(400).send({ message: 'quantity must be a number'});  }
    if (typeof req.body.price !== 'number') {
      return res.status(400).send({ message: 'price must be a number'});  }
    if ( req.body.minimun < 5) {
      return res.status(400).send({ message: 'minimum must be 5 and above'});  }
    if (typeof req.body.minimum !== 'number') {
      return res.status(400).send({ message: 'minimum must be a number'});  }
    next();
  }

  static signup(req, res, next) {
    const nonCharTest = /[^a-zA-Z/\s/-]/g, nameTest = /[a-zA-Z]/g, passwordTest = /[^\S]/g;
    let str1, str2;

    if (!req.body.username && !req.body.email && !req.body.password && !req.body.Role) {
      return res.status(400).send({ message: 'All fields are required' }); }
    if (req.body.username) { str1 = req.body.username, str2 = str1.trim(); }
    if (req.body.username === '' || typeof req.body.username === 'undefined' || req.body.username === null ) {
      return res.status(400).send({  message: 'username field is required'}); }
    if (str2.length < 2) {
      return res.status(400).send({ message: 'username field needs additional characters' }); }
    if (!nameTest.test(req.body.username)) {
      return res.status(400).send({ message: 'username must contain at least one character'}); }
    if (req.body.username.length < 6) {
      return res.status(400).send({ message: 'Your username must be at least 6 characters'}); }
    if (nonCharTest.test(req.body.username)) {
      return res.status(400).send({ message: 'username must be alphabetic, the use of spaces and - are allowed'}); }        
    if ( req.body.password === '' || typeof req.body.password === 'undefined' || req.body.password === null || passwordTest.test(req.body.password)) {
      return res.status(400).send({ message: 'password is required'}); }
    if (req.body.password.length < 6) {
      return res.status(400).send({ message: 'Your password must be at least 6 characters'});  }
    if (!nameTest.test(req.body.password)) {
      return res.status(400).send({ message: 'password must contain at least 1 character'}); }
    next();
  }
  
  static giverights(req, res, next) {
    const roleTest = /[A-Z]+/g;

    if ( !req.body.Role ) {
      return res.status(400).send({ message: 'Role fields required'});
    }
    if (req.body.Role=== '' || typeof req.body.Role === 'undefined' || req.body.Role === null ) {
      return res.status(400).send({ message: 'Role field is required'});
    }
    if (!roleTest.test(req.body.Role)) {
      return res.status(400).send({ message: 'Role field must contain letters In BLOCK'});
    }
    next();
  }
}
export default Validation2;