'use strict';

module.exports= (req, res, next) => {
  const modelName = req.params.model;
  req.model = require(`../model/${modelName}`);
  
  next();
};
