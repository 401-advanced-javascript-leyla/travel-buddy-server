//in app.js, we wanna put all the routes together
const express = require('express');

//app level middleware libraries
const morgan = require('morgan');
const cors = require('cors');

//costume middlesare
const errorHandler = require('./middleware/server-error');
const notFound = require('./middleware/not-found');

//Routes

const authRouter = require('./route/auth');
const apiRouter = require('./route/api');
//Models

const app = express();

app.use(cors());
//handle all the login
app.use(morgan('dev'));
//this allows you to get access to json in the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(apiRouter);

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log('server is up!'));
  }, 
};
