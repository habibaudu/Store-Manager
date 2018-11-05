import chai ,{ expect } from 'chai';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import dotenv from 'dotenv';
import server from '../app';

dotenv.config();
const secret = process.env.SECRET;

import chaiHttp from 'chai-http';



const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
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
