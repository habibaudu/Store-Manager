import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import server from './app';

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiaGFiaWJhdWR1IiwicGFzc3dvcmQiOiIkMmIkMDgkZnE4NFVxUG4wSlNTUjVKQTB0T092dUlsQ3NPVTJWRzJoNzVFaHVUNWJDUTluSWRtVjBXMlMiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE1NDAzOTM4NDcsImV4cCI6MTU0MDk5ODY0N30.FJlIhxR-UbYGhhHwfq3e8Cg8lDiJdtekCXYwkBRw3h8';

const attendantsToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsInVzZXJuYW1lIjoibHVjYXNkYW5pZWwiLCJwYXNzd29yZCI6IiQyYiQwOCRrWDUyNTdOeHRoS3RTTURId3dXbmN1d1pzcndYWG9UWUQ5Y2JxZDdPeWJOTi92b3dDSnNKZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTQwMzkzOTQ4LCJleHAiOjE1NDA5OTg3NDh9.U7f_JMFZ-hEZGkaiLcer61Scmsb3wVEEvlujF8NQSCw';

const should = chai.should();

chai.use(chaiHttp);

describe('Products', () => {
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

  it(' get should return status code of 200', (done) => {
    chai.request(server)
      .get('/api/v1/products/1')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        should.equal(err, null);
        res.should.have.status(404);
        done();
      });
  });

  it('it should return status code of 403', (done) => {
    chai.request(server)
      .get('/api/v1/products')
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it('it return No Token', (done) => {
    chai.request(server)
      .post('/api/v1/products')
      .send({

        id: 5,
        productName: 'Timberland women',
        priceEach: 23000,
        inStock: 15,
        mininumAllowedinStock: 10,
        Date: '23/10/2018'
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('No Token');
        done();
      });
  });

  it('it should return a status code of 200', (done) => {
    chai.request(server)
      .post('/api/v1/products')
      .send({ 
        productName: 'Timberland women',
        priceEach: 23000,
        inStock: 15,
        mininumAllowedinStock: 10,
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('products Created successfully');
        done();
      });
  });

  it('should return only an admin can delete a product', (done) => {
    chai.request(server)
      .delete('/api/v1/products/1')
      .set('x-access-token', attendantsToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('Only an admin can delete a product');
        done();
      });
  });

  it('should return product not found', (done) => {
    chai.request(server)
      .delete('/api/v1/products/30')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(404);
        expect(res.body.message).to.equal('product not found');
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
        res.should.have.status(400);
        expect(res.body.message).to.equal('Only an admin can update a product');
        done();
      });
  });

  it('should return product not found', (done) => {
    chai.request(server)
      .put('/api/v1/products/50')
      .send({      
        productName: 'Timberland women',
        priceEach: 23000,
        inStock: 15,
        mininumAllowedinStock: 10    
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(404);
        expect(res.body.message).to.equal('product not found');
        done();
      });
  });
    
  it('should return product not found', (done) => {
    chai.request(server)
      .put('/api/v1/products/2')
      .send({      
        productName: 'Timberland women',
        priceEach: 23000,
        inStock: 15,
        mininumAllowedinStock: 10    
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(404);
        expect(res.body.message).to.equal('product not found');
        done();
      });
  });

  it('it return status code of 403', (done) => {
    chai.request(server)
      .post('/api/v1/products')
      .send({

        id: 5,
        productName: 'Timberland women',
        priceEach: 23000,
        inStock: 15,
        mininumAllowedinStock: 10,
        Date: '23/10/2018'
      })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it('it return an object', (done) => {
    chai.request(server)
      .post('/api/v1/products')
      .send({

        id: 5,
        productName: 'Timberland women',
        priceEach: 23000,
        inStock: 15,
        mininumAllowedinStock: 10,
        Date: '23/10/2018'
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return an object ', (done) => {
    chai.request(server)
      .get('/api/v1/products/1')
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return status code of 200', (done) => {
    chai.request(server)
      .get('/api/v1/products/1')
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it('should return product not found', (done) => {
    chai.request(server)
      .get('/api/v1/products/8')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('No Token');
        done();
      });
  });

  it('should return status code of 404', (done) => {
    chai.request(server)
      .get('/api/v1/products/8')
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it('should return an object', (done) => {
    chai.request(server)
      .get('/api/v1/products/8')
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });
  describe('Sales', () => {
    it(' get should return status code of 403', (done) => {
      chai.request(server)
        .get('/api/v1/sales')
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(403);
          done();
        });
    });

    it(' get should return status code of 200', (done) => {
      chai.request(server)
        .get('/api/v1/sales')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(200);
          done();
        });
    });

    it('should return sales not found', (done) => {
      chai.request(server)
        .get('/api/v1/sales/34')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(404);
          expect(res.body.message).to.equal('Sale record not found');
          done();
        });
    });

    it('should return sales not found', (done) => {
      chai.request(server)
        .get('/api/v1/sales')
        .set('x-access-token', attendantsToken)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(404);
          expect(res.body.message).to.equal('Only the admin can access all sales');
          done();
        });
    });

    it('should return status code of 200', (done) => {
      chai.request(server)
        .get('/api/v1/sales/1')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(200);
          done();
        });
    });

    it('should return status code of 200', (done) => {
      chai.request(server)
        .get('/api/v1/sales/2')
        .set('x-access-token', attendantsToken)
        .end((err, res) => {
          should.equal(err, null);
          expect(res.body.message).to.equal('Only the Admin or the creator of the sales record can access');
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
          
        })
        .set('x-access-token', attendantsToken)
        .end((err, res) => {
          should.equal(err, null);
          expect(res.body.message).to.equal('NO sales order created');
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
        .set('x-access-token', attendantsToken)
        .end((err, res) => {
          should.equal(err, null);
          expect(res.body.message).to.equal('sales Created successfully');
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
          expect(res.body.message).to.equal('Only a store attendant  can create a sales record');
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
          res.should.have.status(403);
          res.body.should.be.a('object');
          expect(res.body.message).to.equal('No Token');
          done();
        });
    });

    it('Create a sales should return No Token', (done) => {
      chai.request(server)
        .post('/api/v1/sales')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          expect(res.body.message).to.equal('No Token');
          done();
        });
    });
    describe('User', () => {
      it('valid credentials  should return status code of 200', (done) => {
        chai.request(server)
          .post('/api/v1/login')
          .send({
            username: 'habibaudu',
            password: 'hba',
          })
          .end((err, res) => {
            res.should.have.status(200);

            done();
          });
      });

      it('valid credentials  should return login was sucessful', (done) => {
        chai.request(server)
          .post('/api/v1/login')
          .send({
            username: 'habibaudu',
            password: 'hba',
          })
          .end((err, res) => {
            expect(res.body.message).to.equal('Login Successful');
            done();
          });
      });

      it('invalid username  should return wrong name', (done) => {
        chai.request(server)
          .post('/api/v1/login')
          .send({
            username: 'habibau',
            password: 'hba',
          })
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            expect(res.body.message).to.equal('Wrong Name');
            done();
          });
      });

      it('invalid username  should return wrong name', (done) => {
        chai.request(server)
          .post('/api/v1/login')
          .send({
            username: 'habibau',
            password: 'hba',
          })
          .end((err, res) => {
            expect(res.body.message).to.equal('Wrong Name');
            done();
          });
      });

      it('invalid username  should return an object', (done) => {
        chai.request(server)
          .post('/api/v1/login')
          .send({
            username: 'habibau',
            password: 'hba',
          })
          .end((err, res) => {
            res.body.should.be.a('object');
            done();
          });
      });

      it('invalid username  should return stattus code of 403', (done) => {
        chai.request(server)
          .post('/api/v1/login')
          .send({
            username: 'habibau',
            password: 'hba',
          })
          .end((err, res) => {
            res.should.have.status(403);
            done();
          });
      });

      it('invalid password should return status code of 403', (done) => {
        chai.request(server)
          .post('/api/v1/login')
          .send({
            username: 'habibaudu',
            password: 'hba123',
          })
          .end((err, res) => {
            res.should.have.status(403);
            done();
          });
      });

      it('invalid password  should return an object', (done) => {
        chai.request(server)
          .post('/api/v1/login')
          .send({
            username: 'habibaudu',
            password: 'hba123',
          })
          .end((err, res) => {
            res.body.should.be.a('object');
            done();
          });
      });

      it('invalid password  should return wrong password', (done) => {
        chai.request(server)
          .post('/api/v1/login')
          .send({
            username: 'habibaudu',
            password: 'hba123',
          })
          .end((err, res) => {
            expect(res.body.message).to.equal('Wrong Password');
            done();
          });
      });
    });
  });
});
