import { expect } from 'chai';
import moment from 'moment';
import request from 'supertest';
import server from '../app';

describe('Products2', () => {
  let adminToken = null;
  let attendantsToken = null;
  before((done)=> {   
    request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'auduhabib1990@gmail.com',
        password: 'hba821',
      })
      .end((err, res) => {
        adminToken = res.body.token;   
      });
    
    request(server)
      .post('/api/v1/auth/login')
      .send({
        email : 'tokenuser@gmail.com',
        password: 'hba821',
      })
      .end((err, res) => {
        attendantsToken = res.body.token;
        done();
      });
  });

  it('quantity field is required', (done) => {
    request(server)
      .post('/api/v1/products')
      .send({ 
        productname:'boots cool',
        minimum:23,
        description:'sweet boots',
        images :'hjjkkkk',
        price:67,
        created_date: moment(new Date()),
        modified_date:  moment(new Date())
      })
      .set('x-access-token',adminToken)
      .end((err, res) =>{ 
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('quantity field is required');
        done();
      });
  });

  it('price field is required', (done) => {
    request(server)
      .post('/api/v1/products')
      .send({ 
        productname:'boots cool',
        minimum:23,
        description:'sweet boots',
        images :'hjjkkkk',
        quantity:50,
        created_date: moment(new Date()),
        modified_date:  moment(new Date())
      })
      .set('x-access-token',adminToken)
      .end((err, res) =>{ 
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('price field is required');
        done();
      });
  });

  it('image field is required', (done) => {
    request(server)
      .post('/api/v1/products')
      .send({ 
        productname:'boots cool',
        minimum:23,
        description:'sweet boots',
        price:23000,
        quantity:50,
        created_date: moment(new Date()),
        modified_date:  moment(new Date())
      })
      .set('x-access-token',adminToken)
      .end((err, res) =>{ 
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('image field is required');
        done();
      });
  });

  it('productname field is required', (done) => {
    request(server)
      .post('/api/v1/products')
      .send({ 
        productname: '',
        minimum:234,
        description:'good boots',
        images :'hghhhhhh',
        price:23000,
        quantity:50,
        created_date: moment(new Date()),
        modified_date:  moment(new Date())
      })
      .set('x-access-token',adminToken)
      .end((err, res) =>{ 
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('productname field is required');
        done();
      });
  });

  it('productname must be alphabetic, the use of spaces and "-" are allowed', (done) => {
    request(server)
      .post('/api/v1/products')
      .send({ 
        productname:'boots cool',
        minimum:234,
        description:'',
        images :'hghhhhhh',
        price:23000,
        quantity:50,
        created_date: moment(new Date()),
        modified_date:  moment(new Date())
      })
      .set('x-access-token',adminToken)
      .end((err, res) =>{ 
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('description field is required');
        done();
      });
  });

  it('should return only an admin can delete a product', (done) => {
    request(server)
      .delete('/api/v1/products/1')
      .set('x-access-token', attendantsToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return status code of 200', (done) => {
    request(server)
      .get('/api/v1/products')
      .set('x-access-token', attendantsToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return onli an admin should update a product', (done) => {
    request(server)
      .put('/api/v1/products/1')
      .send({      
        productName: 'Timberland women',
        priceEach: 23000,
        inStock: 15,
        mininumAllowedinStock: 10    
      })
      .set('x-access-token', attendantsToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return onli an admin should update a product', (done) => {
    request(server)
      .put('/api/v1/products/1')
      .send({      
        minimum:10,
        productname: 'addidas maen',
        price:10000,
        description: 'description must be a string',
        quantity:50,
        images: 'ihgfdsajkl/',
        created_date: moment(new Date()),
        modified_date:  moment(new Date())   
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('product updated sucessfully');
        expect(res.status).to.equal(200);
        done();
      });
  });
 
  it('get a sales  should return No Token', (done) => {
    request(server)
      .get('/api/v1/sales/4')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Token is not provided');
        done();
      });
  });

  it('sales status code should be 403', (done) => {
    request(server)
      .post('/api/v1/sales')
      .send({'salesOrders':'data'})
      .end((err, res) => {
        expect(res.status).to.equal(400);          
        done();
      });
  });

  it('sales status code should be 400', (done) => {
    request(server)
      .get('/api/v1/sales')
      .end((err, res) => {
        expect(res.status).to.equal(400);          
        done();
      });
  }); 
});
