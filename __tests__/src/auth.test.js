'use strict';

const app = require('../../src/app');
const supergoose = require('../supergoose');
const auth = require('../../src/middleware/auth');
const Users = require('../../src/model/user/user-schema');
const mockRequest = supergoose.server(app.server);

const users = {
  admin: {username: 'admin', password: 'password', role: 'admin'},
  editor: {username: 'editor', password: 'password', role: 'editor'},
  user: {username: 'user', password: 'password', role: 'user'},    
};

beforeAll(async (done) => {
  await supergoose.startDB();
  const userAdmin = await new Users(users.admin).save();
  const userEditor = await  new Users(users.editor).save();
  const userUser = await new Users(users.user).save();
  done();
});

afterAll(supergoose.stopDB);

describe('testing for auth middleware', () => {
  it('signs up new user', ()=>{
    return mockRequest
      .post('/signup')
      .send({'username':'test', 'password':'test1', 'role': 'user'})
      .then(result=>{expect(result.status).toBe(200);
      });
  });

  it('does not sign up for existing users', ()=>{
    return mockRequest
      .post('/signup')
      .send({'username':'test', 'password': 'test1', 'role': 'user'})
      .then(result=>{
        expect(result.status).toBe(500);
      });
  });

  it('signs in for existing users', ()=>{
    return mockRequest
      .post('/signin')
      .auth('test', 'test1')
      .then(result=>{
        expect(result.status).toBe(200);
      });
  });

});