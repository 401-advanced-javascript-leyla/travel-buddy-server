'use strict';

const express = require('express');
const router = express.Router();

//use model-finder middleware to import models
const modelFinder = require('../middleware/model-finder');

const auth = require('../middleware/auth');
//define a parameter which would run our middleware, it is always the first mw to run
router.param('model', modelFinder);

//define a consistent set of routes that can be reusable for all the modles
router.get('/api/v1/:model', handleGetAll);
router.get('/api/v1/:model/:id', handleGetOne);

//if we add the auth() as middleware, we have to add headers (username, password) to make the route work
router.post('/api/v1/:model', handlePost);
router.put('/api/v1/:model/:id', handlePut);
router.delete('/api/v1/:model/:id', handleDelete);

function handleGetAll(req, res, next) {
  req.model.get()
    .then(result=>{
      return res.json(result);
    })
    .catch(next);
}

function handleGetOne(req, res, next) {
  req.model.get(req.params.id)
    .then(result=>{
      return res.json(result[0]);  
    })
    .catch(next);
}

function handlePost(req, res, next) {
  req.model.post(req.body)
    .then(result=>{
      return res.json(result);  
    })
    .catch(next);
}

function handlePut(req, res, next) {
  console.log('here', req.params);
  req.model.put(req.params.id, req.body)
    .then(result=>{
      return res.json(result);  
    })
    .catch(next);
}

function handleDelete(req, res, next) {
  req.model.delete(req.params.id)
    .then(()=>{
      res.send(200);
    })
    .catch(next);
}

module.exports = router;
    