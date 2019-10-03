'use strict';

const mongoose = require('mongoose');

const todo = mongoose.Schema({
  title: {type: String, require: true},
  content: {type: String, require: true},
});

module.exports = mongoose.model('Todo', todo);
