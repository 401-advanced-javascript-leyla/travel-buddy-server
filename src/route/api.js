'use strict';

const express = require('express');
const router = express.Router();

//use model-finder middleware to import models
const modelFinder = require('../middleware/model-finder');

router.param('model', modelFinder);

//define a consistent set of routes that can be reusable for all the modles

/**
 * @route GET /api/v1/:model
 * @returns {string} 200 a status code means okay
 * @returns {object}  return all the data
 * @returns {Error} returns an error
 */
router.get('/api/v1/:model', handleGetAll);

/**
 * @route GET /api/v1/:model/:id
 * @returns {string} 200 a status code means okay
 * @returns {object}  return all the data
 * @returns {Error} returns an error
 */
router.get('/api/v1/:model/:id', handleGetOne);

//if we add the auth() as middleware, we have to add headers (username, password) to make the route work

/**
 * @route POST /api/v1/:model
 * @returns {string} 200 a status code means okay
 * @returns {object}  return all the data
 * @returns {Error} returns an error
 */
router.post('/api/v1/:model', handlePost);

/**
 * @route PUT /api/v1/:model/:id
 * @returns {string} 200 a status code means okay
 * @returns {object}  return all the data
 * @returns {Error} returns an error
 */
router.put('/api/v1/:model/:id', handlePut);

/**
 * @route DELETE /api/v1/:model/:id
 * @returns {string} 200 a status code means okay
 * @returns {object}  return all the data
 * @returns {Error} returns an error
 */
router.delete('/api/v1/:model/:id', handleDelete);

/**
   * handler function for the route to get data from database
   * @param request {object}
   * @param response {object}
   * @param next {function} a middleware function for the route to get data from the database
   * @returns {string} the status code 200 and {object}
   */

function handleGetAll(req, res, next) {
  req.model.get()
    .then(result=>{
      return res.json(result);
    })
    .catch(next);
}

/**
   * handler function for the route to get one data with the given id from database
   * @param request {object}
   * @param response {object}
   * @param request.params.id {string}
   * @param next {function} a middleware function for the route to get data with the id from the database
   * @returns {string} the status code 200 and {object}
   */

function handleGetOne(req, res, next) {
  req.model.get(req.params.id)
    .then(result=>{
      return res.json(result[0]);  
    })
    .catch(next);
}

/**
   * handler function for the route to create data from database with the request.body
   * @param request {object}
   * @param response {object}
   * @param request.body {object}
   * @param next {function} a middleware function for the route to create data from the database
   * @returns {string} the status code 201 and {object}
   */

function handlePost(req, res, next) {
  req.model.post(req.body)
    .then(result=>{
      return res.json(result);  
    })
    .catch(next);
}

/**
   * handler function for the route to update one data with the given id from database with the reaquest body
   * @param request {object}
   * @param response {object}
   * @param request.params.id {string}
   * @param request.body {object}
   * @param next {function} a middleware function for the route to delete data from the database
   * @returns {string} the status code 200 and {object}
   */

function handlePut(req, res, next) {
  console.log('here', req.body);
  req.model.put(req.params.id, req.body)
    .then(result=>{
      return res.json(result);  
    })
    .catch(next);
}

/**
   * handler function for the route to delete one data with the given id from database
   * @param request {object}
   * @param response {object}
   * @param request.params.id {string}
   * @param request.body {object}
   * @param next {function} a middleware function for the route to delete data from the database
   * @returns {string} the status code 200 and {object}
   */

function handleDelete(req, res, next) {
  req.model.delete(req.params.id)
    .then(()=>{
      res.send(200);
    })
    .catch(next);
}

module.exports = router;
    