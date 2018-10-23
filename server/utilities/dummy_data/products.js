import moment from 'moment';
import uuid from 'uuid';


// [
//     {
//       "id":1,
//       "productName":"Men Timberland",
//       "priceEach":25000,
//       "inStock":15,
//       "mininumAllowedinStock":10,
//       "Date":"23/10/2018"
//     },
  
//     {
//       "id":2,
//       "productName":"women bridals",
//       "priceEach":5000,
//       "inStock":105,
//       "mininumAllowedinStock":10,
//       "Date":"29/10/2018"
//     },
  
//    {
//       "id":3,
//       "productName":"vans pro skate",
//       "priceEach":4500,
//       "inStock":100,
//       "mininumAllowedinStock":5,
//       "Date":"27/10/2018"
//     },

//     {
//         "id":4,
//         "productName":"cycling shoes",
//         "priceEach":6000,
//         "inStock":20,
//         "mininumAllowedinStock":3,
//         "Date":"25/10/2018"
//       }
    
  
//   ]


class product {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.products = [];
  }
  /**
   * 
   * @returns {object} product object
   */
  create(data) {
    const newProducts = {
      id: uuid.v4(),
      productName: data.productName || '',
      priceEach: data.priceEach || '',
      inStock: data.inStock || '',
      mininumAllowedinStock: data.mininumAllowedinStock || '',
      created_at: moment.now(),
      modified_at: moment.now()
    };
    this.products.push(newProducts);
    return newProducts
  }
  /**
   * 
   * @param {uuid} id
   * @returns {object} product object
   */
  findOne(id) {
    return this.products.find(product => product.id === id);
  }
  /**
   * @returns {object} returns all products
   */
  findAll() {
    return this.products;
  }
  /**
   * 
   * @param {uuid} id
   * @param {object} data 
   */
  update(id, data) {
    const product = this.findOne(id);
    const index = this.products.indexOf(product);
    this.products[index].productName = data['productName'] || product.productName;
    this.products[index].priceEach = data['priceEach'] || product.priceEach;
    this.products[index].inStock = data['inStock'] || product.inStock;
    this.products[index].mininumAllowedinStock = data['mininumAllowedinStock'] || product.mininumAllowedinStock;
    this.products[index].modified_at = moment.now()
    return this.products[index];
  }
  /**
   * 
   * @param {uuid} id 
   */
  delete(id) {
    const product = this.findOne(id);
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    return {};
  }
}
export default new product(); 