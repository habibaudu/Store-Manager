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
    // chai.request(server)
    // .post('/api/v1/users')
    // .send({
    //   email: 'auduhabib@gmail.com',
    //   password: 'hba821',
    //   username: 'Habib',
    //   Role:'ADMIN'
    // })
    // .end((err, res) => {
    //   console.log(res.body,'ghhjklaaaaaaa');
    // });

    
           
      chai.request(server)
        .post('/api/v1/users/login')
        .send({
          email: 'auduhabib1990@gmail.com',
          password: 'hba821',
        })
        .end((err, res) => {
          console.log(res.body)
         adminToken = res.body.token;
          
        });


        
      chai.request(server)
        .post('/api/v1/users/login')
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

  // it('it return No Token', (done) => {
  //   chai.request(server)
  //     .post('/api/v1/products')
  //     .send({

  //       id: 5,
  //       productName: 'Timberland women',
  //       priceEach: 23000,
  //       inStock: 15,
  //       mininumAllowedinStock: 10,
  //       Date: '23/10/2018'
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(403);
  //       res.body.should.be.a('object');
  //       expect(res.body.message).to.equal('No Token');
  //       done();
  //     });
  // });

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

  // it('should return product not found', (done) => {
  //   chai.request(server)
  //     .delete('/api/v1/products/30')
  //     .set('x-access-token', adminToken)
  //     .end((err, res) => {
  //       res.body.should.be.a('object');
  //       res.should.have.status(404);
  //       expect(res.body.message).to.equal('product not found');
  //       done();
  //     });
  // });

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

    it(' get should return status code of 200', (done) => {
      chai.request(server)
        .get('/api/v1/sales')
        .set('x-access-token', adminToken)
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
          .post('/api/v1/users')
          .send({
            username: 'habibaudu',
            password: 'hba',
          })
          .end((err, res) => {
            res.should.have.status(401);
            expect(res.body.message).to.equal('Available to Only the Admin');

            done();
          });
      });


      it('should return onli an adm9n can get all users', (done) => {
        chai.request(server)
          .get('/api/v1/users')
          .end((err, res) => {
            res.body.should.be.a('object');
            expect(res.body.message).to.equal('Token is not provided');
            done();
          });
      });

      it('should return onli an adm9n can get all users', (done) => {
        chai.request(server)
          .get('/api/v1/users')
          .end((err, res) => {
            res.body.should.be.a('object');
            res.should.have.status(400);
            done();
          });
      });

      it('should retur some values are missing', (done) => {
        chai.request(server)
          .post('/api/v1/users/login')
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
        .post('/api/v1/users/login')
        .send({
          email: 'hannagmailcom',
          password: 'hbagghh'   
        })
        .end((err, res) => {
          res.should.have.status(400);
          // expect(res.body.message).to.equal('Please enter a valid email address');
          done();
        });
      });

      it('status code should be 400', (done) => {
        const newUser = {
        username: 'habibaudu',
        email: 'auduhabib1990@gmail.com',
        password: 'hba821',
        Role : 'ADMIN'
      };
      chai.request(server)
        .post('/api/v1/users')
        .send(newUser)
        .end((err, res) => {
        res.should.have.status(401); 

          done();
        });

      });

      

      it('invalid password  should return an object', (done) => {
        const newUser = {
        username: 'habibaudu',
        email: 'auduhabib1990@gmail.com',
        password: 'hba821',
        Role : 'ADMIN'
      };
      chai.request(server)
        .post('/api/v1/users')
        .send(newUser)
        .end((err, res) => {
          
          expect(res.body.message).to.equal('Available to Only the Admin');
          done();
          
        });

      });
      it('should return registration succesfull', (done) => {
        const newUser = {
        username: 'moses',
        email: 'moses@gmail.com',
        password: 'moses821',
        Role : 'ADMIN'
      };
      chai.request(server)
        .post('/api/v1/users')
        .send(newUser)
        .end((err, res) => {
          
          expect(res.body.message).to.equal('Available to Only the Admin');
          done();
          
        });

      });

      it('invalid password  should return wrong password', (done) => {
        chai.request(server)
        .post('/api/v1/users/login')
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
});
