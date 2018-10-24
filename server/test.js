import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import server from './app';

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiaGFiaWJhdWR1IiwicGFzc3dvcmQiOiIkMmIkMDgkZnE4NFVxUG4wSlNTUjVKQTB0T092dUlsQ3NPVTJWRzJoNzVFaHVUNWJDUTluSWRtVjBXMlMiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE1NDAzNzE1NDQsImV4cCI6MTU0MDQ1Nzk0NH0.NVixVZplk1HrTn0Sj3HIyMVxclASAB8SFCWS0h56eZ8';

const attendantsToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsInVzZXJuYW1lIjoibHVjYXNkYW5pZWwiLCJwYXNzd29yZCI6IiQyYiQwOCRrWDUyNTdOeHRoS3RTTURId3dXbmN1d1pzcndYWG9UWUQ5Y2JxZDdPeWJOTi92b3dDSnNKZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTQwMzcxNDU5LCJleHAiOjE1NDA0NTc4NTl9.kxzDnCJj91iunDFsp7cUnTXIognMq2ryvhz5K1tTbe0';

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
