import { expect } from 'chai';
import moment from 'moment';
import request from 'supertest';
import server from '../app';

describe('User', () => {
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
