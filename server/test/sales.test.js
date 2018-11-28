import { expect } from 'chai';
import moment from 'moment';
import request from 'supertest';
import server from '../app';

describe('Sales', () => {
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

  it(' get should return status code of 403', (done) => {
    request(server)
      .get('/api/v1/sales')
      .end((err, res) => {  
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return sales not found', (done) => {
    request(server)
      .get('/api/v1/sales/34')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should return sales not found', (done) => {
    request(server)
      .get('/api/v1/sales/2')
      .set('x-access-token', adminToken)
      .end((err, res) => { 
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('sales not found');
        done();
      });
  });

  it('should return sales not found', (done) => {
    request(server)
      .get('/api/v1/sales/10000')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('sales not found'); 
        done();
      });
  });

  it('should return sales not found', (done) => {
    request(server)
      .get('/api/v1/sales')
      .set('x-access-token', attendantsToken)
      .end((err, res) => { 
        expect(res.status).to.equal(401);  
        done();
      });
  });

  it('should return sales not found', (done) => {
    request(server)
      .get('/api/v1/sale')
      .set('x-access-token', attendantsToken)
      .end((err, res) => { 
        expect(res.status).to.equal(200); 
        done();
      });
  });

  it('should return 200', (done) => {
    request(server)
      .get('/api/v1/sales')
      .set('x-access-token',adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);  
        done();
      });
  });

  it('Only Admin can get all sales record', (done) => {
    request(server)
      .get('/api/v1/sales')
      .set('x-access-token',attendantsToken)
      .end((err, res) => { 
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Only Admin can get all sales record'); 
        done();
      });
  });

  it('get attendants sales should return 200', (done) => {
    request(server)
      .get('/api/v1/sale')
      .set('x-access-token',attendantsToken)
      .end((err, res) => { 
        expect(res.status).to.equal(200);  
        done();
      });
  });

  it('Only Sales atttendant can access this route', (done) => {
    request(server)
      .get('/api/v1/sale')
      .set('x-access-token',adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Only Sales atttendant can access this route') 
        done();
      });
  });

  it('should return sales not found', (done) => {
    request(server)
      .get('/api/v1/sales/1000')
      .set('x-access-token',adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('sales not found');   
        done();
      });
  });

  it('Only Admin can filter  sales record by attendant', (done) => {
    request(server)
      .get('/api/v1/sales/1')
      .set('x-access-token',attendantsToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Only Admin can filter  sales record by attendant') 
        done();
      });
  });

  it(' should return no sales created', (done) => {
    request(server)
      .post('/api/v1/sales')
      .send({
        id: 5,
        product: 'Timberland women',
        price: 23000,
        quantity: 15,
        username: 'habib',
        customerName: 'David'   
      })
      .set('x-access-token', adminToken)
      .end((err, res) => { 
        expect(res.body.message).to.equal('Only A User can create a  sales record');
        done();
      });
  });
  
  it(' should return status code of 201', (done) => {
    request(server)
      .post('/api/v1/sales')
      .send({'salesOrders': 
        [
          {'product_id' :1,'quantity':4},
          {'product_id' :3, 'quantity' :300} 
        ]
      })
      .set('x-access-token', attendantsToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('quantity exceeds available product inStock');
        done();
      });
  });

  it(' should return status code of 201', (done) => {
    request(server)
      .post('/api/v1/sales')
      .send({'salesOrders': 
        [
          {'product_id' :1,'quantity':4},
          
          {'product_id' :2, 'quantity' :4} 
        ]
      })
      .set('x-access-token', attendantsToken)
      .end((err, res) => { 
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('product not found');
        done();
      });
  });

  it(' should return status code of 201', (done) => {
    request(server)
      .post('/api/v1/sales')
      .send({'salesOrders': 
        [
          {'product_id' :1,'quantity':4},
          {'product_id' :3, 'quantity' :4} 
        ]
      })
      .set('x-access-token', attendantsToken)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('sales record record created');
        done();
      });
  });

  it(' should return status code of 201', (done) => {
    request(server)
      .post('/api/v1/sales')
      .send({'salesOrders': 
        [
          {'product_id' :1,'quantity':4},
          {'product_id' :3, 'quantity' :4} 
        ]
      })
      .set('x-access-token', adminToken)
      .end((err, res) => { 
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Only A User can create a  sales record');
        done();
      });
  });

});
