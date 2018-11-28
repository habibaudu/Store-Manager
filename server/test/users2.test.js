import { expect } from 'chai';
import moment from 'moment';
import request from 'supertest';
import server from '../app';

describe('User2', () => {
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
});
