'use strict';

const schema = require('./user-schema');
const MongooseModel = require('../mongoose-model');

class Users extends MongooseModel { }

module.exports = new Users(schema);
