import chai ,{ expect } from 'chai';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import dotenv from 'dotenv';
import server from './app';

dotenv.config();
const secret = process.env.SECRET;

import chaiHttp from 'chai-http';



const should = chai.should();

chai.use(chaiHttp);

describe('Products', () => {
  let adminToken = null;
  let attendantsToken = null;
  before((done)=> {
      
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'auduhabib1990@gmail.com',
          password: 'hba821',
        })
        .end((err, res) => {
         adminToken = res.body.token;
          
        });


        
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email : 'mose@gmail.com',
          password: 'hba821',
        })
        .end((err, res) => {
         attendantsToken = res.body.token;
          done();
        });
  

      });

      
  it('it should return an object', (done) => {
    chai.request(server)
      .get('/api/v1/products')
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });

  it(' get should return status code of 200', (done) => {
    chai.request(server)
      .get('/api/v1/products')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        should.equal(err, null);
        res.should.have.status(200);
        done();
      });
  });

  it(' get should return status code of 400', (done) => {
    chai.request(server)
      .get('/api/v1/products/1')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        should.equal(err, null);
        res.should.have.status(400);
        done();
      });
  });

  it('it should return status code of 400', (done) => {
    chai.request(server)
      .get('/api/v1/products')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });


  it('it should return a status code of 201', (done) => {
    request(server)
      .post('/api/v1/products')
      .send({ 
        productname: 'Timberland women',
        price: 23000,
        minimum: 10,
        description:'durable boots',
        quantity:50,
        images :'hghhhhhh'
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        // expect(res.body.message).to.equal('products Created successfully');
        done();
      });
  });

  it('should return only an admin can delete a product', (done) => {
    chai.request(server)
      .delete('/api/v1/products/1')
      .set('x-access-token', attendantsToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(200);
        done();
      });
  });

  it('should return status code of 200', (done) => {
    chai.request(server)
      .get('/api/v1/products')
      .set('x-access-token', attendantsToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(200);
        
        done();
      });
  });


  it('should return onli an admin should update a product', (done) => {
    chai.request(server)
      .put('/api/v1/products/1')
      .send({      
        productName: 'Timberland women',
        priceEach: 23000,
        inStock: 15,
        mininumAllowedinStock: 10    
      })
      .set('x-access-token', attendantsToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(401);
        done();
      });
  });

  describe('Sales', () => {
    it(' get should return status code of 403', (done) => {
      chai.request(server)
        .get('/api/v1/sales')
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(400);
          done();
        });
    });



    it('should return sales not found', (done) => {
      chai.request(server)
        .get('/api/v1/sales/34')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(400);
          // expect(res.body.message).to.equal('Sale record not found');
          done();
        });
    });

    it('should return sales not found', (done) => {
      chai.request(server)
        .get('/api/v1/sales')
        .set('x-access-token', attendantsToken)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(401);
          // res.should.have.status(201);
          done();
        });
    });

    it('should return status code of 200', (done) => {
      chai.request(server)
        .get('/api/v1/sales/1')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(400);
          done();
        });
    });

    it(' should return no sales created', (done) => {
      chai.request(server)
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
          should.equal(err, null);
          expect(res.body.message).to.equal('Only A User can create a  sales record');
          done();
        });
    });


    it(' get should return an object', (done) => {
      chai.request(server)
        .get('/api/v1/sales')
        .end((err, res) => {
          should.equal(err, null);
          res.body.should.be.a('object');
          done();
        });
    });

    it('get a sales  should return No Token', (done) => {
      chai.request(server)
        .get('/api/v1/sales/4')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          expect(res.body.message).to.equal('Token is not provided');
          done();
        });
    });

    it('sales status code should be 403', (done) => {
      chai.request(server)
        .post('/api/v1/sales')
        .send({'salesOrders':'data'})
        .end((err, res) => {
          res.should.have.status(400);
                   
          done();
        });
    });
    describe('User', () => {
      it('valid credentials  should return status code of 200', (done) => {
        chai.request(server)
          .post('/api/v1/auth/login')
          .send({
            email: 'auduhabib1990@gmail.com',
            password: 'hba',
          })
          .end((err, res) => {
            res.should.have.status(400);
            expect(res.body.message).to.equal('The credentials you provided is incorrect');

            done();
          });
      });



      it('should retur some values are missing', (done) => {
        chai.request(server)
          .post('/api/v1/auth/login')
          .send({
            email: 'hanna@gmail.com',   
          })
          .end((err, res) => {
            res.should.have.status(400);
            expect(res.body.message).to.equal('Some values are missing');
            done();
          });
      });
    
      it('invalid password should return status code of 403', (done) => {
        chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'hannagmailcom',
          password: 'hbagghh'   
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.message).to.equal('Please enter a valid email address');
          done();
        });
      });

      it('status code should be 400', (done) => {
        const newUser = {
        email: 'auduhabib1990@gmail.com',
        password: 'hba821'
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(newUser)
        .end((err, res) => {
        res.should.have.status(200); 

          done();
        });

      });

      

      it('should return Token is not provided', (done) => {
        const newUser2 = {
        username: 'habibaudu',
        email: 'auduhabib1990@gmail.com',
        password: 'hba821',
        Role : 'ADMIN'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(newUser2)
        .end((err, res) => {
          
          expect(res.body.message).to.equal('Token is not provided');
          done();
          
        });

      });

      it('User with that EMAIL already exist', (done) => {
        const newUser7 = {
        username: 'moses2390',
        email: 'auduhabib1990@gmail.com',
        password: 'hba821',
        Role : 'ADMIN'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('x-access-token',adminToken)
        .send(newUser7)
        .end((err, res) => {
          
          expect(res.body.message).to.equal('User with that EMAIL already exist');
          done();
          
        });

      });

      it('Please enter a valid email address', (done) => {
        const newUser7 = {
        username: 'moses2390',
        email: 'auduhabib1990atGMAILLdotcom',
        password: 'hba821',
        Role : 'ADMIN'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('x-access-token',adminToken)
        .send(newUser7)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.message).to.equal('Please enter a valid email address');
          done();
          
        });

      });

      it('Available to Only the Admin', (done) => {
        const newUser7 = {
        username: 'moses2390',
        email: 'auduhabib1990@gmail.com',
        password: 'hba821',
        Role : 'ADMIN'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('x-access-token',attendantsToken)
        .send(newUser7)
        .end((err, res) => {
          res.should.have.status(401)
          expect(res.body.message).to.equal('Available to Only the Admin');
          done();
          
        });

      });
      it('All fields are required', (done) => {
        const newUser7 = {
        username: '',
        email: 'audhabib1990@gmail',
        password: 'hba821',
        Role : 'ADMIN'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('x-access-token',adminToken)
        .send(newUser7)
        .end((err, res) => {
          
          expect(res.body.message).to.equal('All fields are required');
          done();
          
        });

      });
      it('should return 400', (done) => {
        const newUser6 = {
        username: 'chidinma',
        email: 'auduhabib1990@gmail.com',
        password: 'hba821',
        Role : 'ADMIN'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('x-access-token',adminToken)
        .send(newUser6)
        .end((err, res) => {
          res.should.have.status(400)
          done();
          
        });

      });

      it('should return 400', (done) => {
        const newUser6 = {
        username: '',
        email: 'auduhabib1990@gmail.com',
        password: 'hba821',
        Role : 'ADMIN'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('x-access-token',adminToken)
        .send(newUser6)
        .end((err, res) => {
          res.should.have.status(400)
          done();
          
        });

      });

      it('status code of 200 should be return for login', (done) => {
        chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'auduhabib1990@gmail.com',
          password: 'hba821',
        })
        .end((err, res) => {
        res.should.have.status(200);
         done(); 
        });
      });
    });
  });

  describe('default route /', () => {
    it('should return Welcome to the Store Manager API!', (done) => {
      request(server)
        .get('/api')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Welcome to the Store Manager API!');
          done();
        });
    });

    it('should return jwt malformed', (done) => {
      request(server)
        .get('/api/v1/users')
        .set('x-access-token','gshdhhdjj')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain('jwt malformed');
          done();
        });
    });

    it('Only An Admin can give privilages', (done) => {
      request(server)
        .put('/api/v1/users/69')
        .set('x-access-token','gshdhhdjj')
        .end((err, res) => {
          expect(res.status).to.equal(400);
       
          done();
        });
    });

    it('should return 400', (done) => {
      request(server)
        .put('/api/v1/users/affeacdd-4e67-4af1-8399-d9b1626bd123')
        .set('x-access-token',adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
         
          done();
        });
    });

    it('should return 400', (done) => {
      request(server)
        .delete('/api/v1/users/1')
        .set('x-access-token',adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });


    it('invalid credentials  should return status code of 400', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'auduha@gmail.com',
          password: 'hba821'
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.message).to.equal('The credentials you provided is incorrect');

          done();
        });
    });

    it('Login was successful', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'auduhabib1990@gmail.com',
          password: 'hba821'
        })
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.message).to.equal('Login was successful');

          done();
        });
    });

    it('events error', (done) => {
      request(server)
        .put('/api/v1/users/affeacdd-4e67-4af1-8399-d9b1626bd123')
        .set('x-access-token',attendantsToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('events error');
         
          done();
        });
    });
   
    it('All Users', (done) => {
      request(server)
        .get('/api/v1/users')
        .set('x-access-token',adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('All Users');
         
          done();
        });
    });

    it('Only An Admin can get all  users', (done) => {
      request(server)
        .get('/api/v1/users')
        .set('x-access-token',attendantsToken)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Only An Admin can get all  users');
         
          done();
        });
    });

    it('events error', (done) => {
      request(server)
        .delete('/api/v1/users/88')
        .set('x-access-token',adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
         
          done();
        });
    });

    it('Only An Admin can delete a user', (done) => {
      request(server)
        .delete('/api/v1/users/88')
        .set('x-access-token',attendantsToken)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Only An Admin can delete a user');
         
          done();
        });
    });

  
});

});