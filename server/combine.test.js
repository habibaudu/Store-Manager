import { expect } from 'chai';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import dotenv from 'dotenv';
import server from './app';

dotenv.config();
const secret = process.env.SECRET;

import chaiHttp from 'http';

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
          email : 'tokenuser@gmail.com',
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

  it(' get should return status code of 400', (done) => {
    request(server)
      .get('/api/v1/products/1')
      .set('x-access-token', adminToken)
      .end((err, res) => {
       
        expect(res.status).to.equal(200);
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


  it('it should return a status code of 201', (done) => {
    request(server)
      .post('/api/v1/products')
      .send({ 
        productname: 'Timberland women',
        minimum:10,
        description:'durable boots',
        images :'hghhhhhh',
        price:23000,
        quantity:50,
        created_date: moment(new Date()),
        modified_date:  moment(new Date())
      })
      .set('x-access-token',adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Product Created sucessfully');
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

  it('productname must be alphabetic, the use of spaces and "-" are allowed', (done) => {
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

  it('productname must be alphabetic, the use of spaces and "-" are allowed', (done) => {
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

  describe('Sales', () => {
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
         
          expect(res.status).to.equal(200);
         
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

    // it('Only Sales atttendant can access this route', (done) => {
    //   request(server)
    //     .get('/api/v1/sales/1')
    //     .set('x-access-token',adminToken)
    //     .end((err, res) => {
         
    //       expect(res.status).to.equal(200);
       
          
    //       done();
    //     });
    // });

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
        .send({"salesOrders": 
        [
          {"product_id" :1,"quantity":4},
          
          {"product_id" :3, "quantity" :300} 
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
        .send({"salesOrders": 
        [
          {"product_id" :1,"quantity":4},
          
          {"product_id" :2, "quantity" :4} 
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
        .send({"salesOrders": 
        [
          {"product_id" :1,"quantity":4},
          
          {"product_id" :3, "quantity" :4} 
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
        .send({"salesOrders": 
        [
          {"product_id" :1,"quantity":4},
          
          {"product_id" :3, "quantity" :4} 
        ]
        })
        .set('x-access-token', adminToken)
        .end((err, res) => {
         
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Only A User can create a  sales record');
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
    describe('User', () => {
      it('should return Minimum password length is 6', (done) => {
        request(server)
          .post('/api/v1/auth/login')
          .send({
            email: 'auduhabib1990@gmail.com',
            password: 'hba',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Minimum password length is 6');

            done();
          });
      });

      it(' update users should return status code of 200', (done) => {
        request(server)
          .put('/api/v1/users/2')
          .send({
            Role:'ADMIN',
            modified_date: moment(new Date()),
            userId:2
              
          })
          .set('x-access-token', adminToken)
          .end((err, res) => {
           
            expect(res.status).to.equal(200);
            done();
          });
      });

      it(' update users should return status code of 404', (done) => {
        request(server)
          .put('/api/v1/users/30')
          .send({
            Role:'ADMIN',
            modified_date: moment(new Date())
            
              
          })
          .set('x-access-token', adminToken)
          .end((err, res) => {
           
            expect(res.status).to.equal(404);
            done();
          });
      });
  



      it('should retur password field is required', (done) => {
        request(server)
          .post('/api/v1/auth/login')
          .send({
            email: 'hanna@gmail.com',   
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('password field is required');
            done();
          });
      });
    
      it('invalid password should return status code of 403', (done) => {
        request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'hannagmailcom',
          password: 'hbagghh'   
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please enter a valid email address');
          done();
        });
      });

      it('status code should be 400', (done) => {
        const newUser = {
        email: 'auduhabib1990@gmail.com',
        password: 'hba821'
      };
    request(server)
        .post('/api/v1/auth/login')
        .send(newUser)
        .end((err, res) => {
        expect(res.status).to.equal(200); 

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
    request(server)
        .post('/api/v1/auth/signup')
        .send(newUser2)
        .end((err, res) => {
          
          expect(res.body.message).to.equal('Token is not provided');
          done();
          
        });

      });


      it('should return updted sucessful', (done) => {
        const newUser12 = {
        Role2 : 'ADMIN'
      
      };
    request(server)
        .put('/api/v1/users/2')
        .send(newUser12)
        .set('x-access-token',adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
         
          done();
          
        });

      });

      it('User with that EMAIL already exist', (done) => {
        const newUser7 = {
        username: 'mosesss',
        email: 'auduhabib1990@gmail.com',
        password: 'hba821',
        Role : 'ADMIN'
      };
    request(server)
        .post('/api/v1/auth/signup')
        .set('x-access-token',adminToken)
        .send(newUser7)
        .end((err, res) => {
          
          expect(res.body.message).to.equal('User with that EMAIL already exist');
          done();
          
        });

      });

      it('username must be alphabetic, the use of spaces and - are allowed', (done) => {
        const newUser7 = {
        username: 'moses2390',
        email: 'auduhabib1990atGMAILLdotcom',
        password: 'hba821',
        Role : 'ADMIN'
      };
    request(server)
        .post('/api/v1/auth/signup')
        .set('x-access-token',adminToken)
        .send(newUser7)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('username must be alphabetic, the use of spaces and - are allowed');
          done();
          
        });

      });
      it('Your username must be at least 6 characters', (done) => {
        const newUser7 = {
        username: 'moses',
        email: 'auduhabib1990atGMAILLdotcom',
        password: 'hba821',
        Role : 'ADMIN'
      };
    request(server)
        .post('/api/v1/auth/signup')
        .set('x-access-token',adminToken)
        .send(newUser7)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Your username must be at least 6 characters');
          done();
          
        });

      });

      it('Please enter a valid email address', (done) => {
        const newUser7 = {
        username: 'mosesss',
        email: 'auduhabib1990atGMAILLdotcom',
        password: 'hba821',
        Role : 'ADMIN'
      };
    request(server)
        .post('/api/v1/auth/signup')
        .set('x-access-token',adminToken)
        .send(newUser7)
        .end((err, res) => {
          expect(res.status).to.equal(400);
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
    request(server)
        .post('/api/v1/auth/signup')
        .set('x-access-token',attendantsToken)
        .send(newUser7)
        .end((err, res) => {
          expect(res.status).to.equal(400)
    
          done();
          
        });

      });
      it('username field is required', (done) => {
        const newUser7 = {
        username: '',
        email: 'audhabib1990@gmail',
        password: 'hba821',
        Role : 'ADMIN'
      };
    request(server)
        .post('/api/v1/auth/signup')
        .set('x-access-token',adminToken)
        .send(newUser7)
        .end((err, res) => {
          
          expect(res.body.message).to.equal('username field is required');
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
    request(server)
        .post('/api/v1/auth/signup')
        .set('x-access-token',adminToken)
        .send(newUser6)
        .end((err, res) => {
          expect(res.status).to.equal(400)
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
    request(server)
        .post('/api/v1/auth/signup')
        .set('x-access-token',adminToken)
        .send(newUser6)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          done();
          
        });

      });

      it('status code of 200 should be return for login', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'auduhabib1990@gmail.com',
          password: 'hba821',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
         done(); 
        });
      });

      it('password field is required', (done) => {
        request(server)
          .post('/api/v1/auth/login')
          .send({
            email: 'auduhabib1990@gmail.com',
            
          })
          .end((err, res) => {
            expect(res.body.message).to.equal('password field is required');
           done(); 
          });
        });

        it('password must contain one or more alphabet', (done) => {
          request(server)
            .post('/api/v1/auth/login')
            .send({
              email: 'auduhabib1990@gmail.com',
              password:'$£"%^&'
              
            })
            .end((err, res) => {
              expect(res.body.message).to.equal('password must contain one or more alphabet');
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
        .put('/api/v1/users/3')
        .set('x-access-token',adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
         
          done();
        });
    });

    it('delete should return 200', (done) => {
      request(server)
        .delete('/api/v1/users/3')
        .set('x-access-token',adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('User deleted');
          done();
        });
    });

    it('invalid credentials  should return status code of 400', (done) => {
    request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'auduha@gmail.com',
          password: 'hba821'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('The credentials you provided is incorrect');

          done();
        });
    });

    it('Login was successful', (done) => {
    request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'auduhabib1990@gmail.com',
          password: 'hba821'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Login was successful');

          done();
        });
    });

    it('Role fields required', (done) => {
      request(server)
        .put('/api/v1/users/affeacdd-4e67-4af1-8399-d9b1626bd123')
        .set('x-access-token',attendantsToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Role fields required');
         
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

    it('should return 404', (done) => {
      request(server)
        .delete('/api/v1/users/88')
        .set('x-access-token',adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('user not found');
         
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
