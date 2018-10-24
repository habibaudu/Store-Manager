import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

const Helper = {

  /**
   * comparePassword
   * @param {string} hashPassword 
   * @param {string} password 
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

};

export default Helper;
