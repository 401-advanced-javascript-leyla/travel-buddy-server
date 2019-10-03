'use strict';

const schema = require('./todo-schema');
const MongooseModel = require('../mongoose-model');

class Todos extends MongooseModel { }

module.exports = new Todos(schema);