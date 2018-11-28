import { expect } from 'chai';
import moment from 'moment';
import request from 'supertest';
import server from '../app';

describe('Products', () => {
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
        email: 'tokenuser@gmail.com',
        password: 'hba821',
      })
      .end((err, res) => {
        attendantsToken = res.body.token;
        done();
      });
  });

  it(' get should return status code of 200', (done) => {
    request(server)
      .get('/api/v1/products')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it(' delete should return status code of 200', (done) => {
    request(server)
      .delete('/api/v1/products/2')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('product deleted');
        done();
      });
  });

  it(' delete should return product not found', (done) => {
    request(server)
      .delete('/api/v1/products/404')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('product not found');
        done();
      });
  });

  it(' get should return status code of 200', (done) => {
    request(server)
      .get('/api/v1/products/1')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it(' get should return status code of 404', (done) => {
    request(server)
      .get('/api/v1/products/100')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('product not found');
        done();
      });
  });

  it('it should return status code of 400', (done) => {
    request(server)
      .get('/api/v1/products')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
 
  it('it should return status code of 400', (done) => {
    request(server)
      .get('/api/v1/product/Men Loafer')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it(' delete should return product not found', (done) => {
    request(server)
      .get('/api/v1/product/Men loaf')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('product not found');
        done();
      });
  });

  it('it should return status code of 400', (done) => {
    request(server)
      .get('/api/v1/product/Men Loafer')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

   it('it should return a status code of 400', (done) => {
    request(server)
      .post('/api/v1/products')
      .send({ 
        productname: 'Timberland women',
        minimum:93,
        description:'durable boots',
        images :'hghhhhhh',
        price:'thesddd',
        quantity:23,
        created_date: moment(new Date()),
        modified_date:  moment(new Date())
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('price must be a number');
        done();
      });
  });

  it('it should return a status code of 400', (done) => {
    request(server)
      .post('/api/v1/products')
      .send({ 
        productname: 'Timberland women',
        minimum:93,
        description:'durable boots',
        images :'hghhhhhh',
        price:23000,
        quantity:'rtuopp',
        created_date: moment(new Date()),
        modified_date:  moment(new Date())
      })
      .set('x-access-token',adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('quantity must be a number');
        done();
      });
  });

  it('it should return a status code of 400', (done) => {
    request(server)
      .post('/api/v1/products')
      .send({ 
        productname: 'Timberland women',
        minimum:'thrhjj',
        description:'durable boots',
        images :'hghhhhhh',
        price:23000,
        quantity:50,
        created_date: moment(new Date()),
        modified_date:  moment(new Date())
      })
      .set('x-access-token',adminToken)
      .end((err, res) =>{ 
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('minimum must be a number');
        done();
      });
  });

  it('productname must contain at least one alphabet', (done) => {
    request(server)
      .post('/api/v1/products')
      .send({ 
        productname: '£$%^&*()!',
        minimum:234,
        description:'durable boots',
        images :'hghhhhhh',
        price:23000,
        quantity:50,
        created_date: moment(new Date()),
        modified_date:  moment(new Date())
      })
      .set('x-access-token',adminToken)
      .end((err, res) =>{ 
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('productname must contain at least one alphabet');
        done();
      });
  });

  it('description must contain at least one alphabet', (done) => {
    request(server)
      .post('/api/v1/products')
      .send({ 
        productname: 'boots cool',
        minimum:234,
        description:'&*()^%$£!',
        images :'hghhhhhh',
        price:23000,
        quantity:50,
        created_date: moment(new Date()),
        modified_date:  moment(new Date())
      })
      .set('x-access-token',adminToken)
      .end((err, res) =>{ 
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('description must contain at least one alphabet');
        done();
      });
  });

  it('minimum field is required', (done) => {
    request(server)
      .post('/api/v1/products')
      .send({ 
        productname:'boots cool',
        description:'wonderful Bots',
        images :'hghhhhhh',
        price:23000,
        quantity:50,
        created_date: moment(new Date()),
        modified_date:  moment(new Date())
      })
      .set('x-access-token',adminToken)
      .end((err, res) =>{ 
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('minimum field is required');
        done();
      });
  });
});
