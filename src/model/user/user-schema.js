'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'doggy';

//What data/ funcs will users have?

const user = mongoose.Schema({
  username: {type: String, require: true, unique: true},
  password: {type: String, require: true, unique: true},
  role: {type: String, default: 'user', enum: ['user', 'admin', 'editor']},
});

const capabilities = {
  admin: ['create', 'read', 'update', 'delete'],
  editor: ['create', 'read', 'update'],
  user: ['read'],
};

//pre-hooks, before saving a new user we need to hash the password
user.pre('save', async function () {
  if (this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
  }
});


//////////////////////////////////Auth////////////////////////////////////////

//Token validation
user.statics.authenticateToken = function (token) {

  try{
    let parsedToken = jwt.verify(token, SECRET);
    let query = { _id: parsedToken.id };
    return this.fndOne(query);
  } catch (error) {
    throw new Error('Invalid Token');
  }
};

//basic auth
user.statics.authenticateBasic = function (auth) {
  let query = { username: auth.username };
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(error => { throw error; });
};

user.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};


//generating tokens
user.methods.generateToken = function (type) {
  let token = {
    id: this._id,
    capabilities: capabilities[this.role],
    type: type || 'user',
  };

  return jwt.sign(token, SECRET);
};

//dooes a capability exist for the role
user.methods.can = function (capability) {
  return capabilities[this.role].includes(capability);
};

module.exports = mongoose.model('User', user);
