'use strict';

const mongoose = require('mongoose');

const todo = mongoose.Schema({
  id: {type: String, require: true},
  day: {type: String, require: true},
  plan: {type: String, require: true},
});

module.exports = mongoose.model('Todo', todo);
