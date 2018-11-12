const express = require('express');
const logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');
import {
  articleApi,
  employeeApi,
  rateApi,
  workApi,
  employeeTableApi,
  workTableApi,
} from './server';

const port = process.env.PORT || 8080;

export default express()
  .use(logger('dev'))
  .use(bodyParser.json()) // https://github.com/expressjs/body-parser
  .use(bodyParser.urlencoded({ extended: false }))
  .use(function(req, res, next) {
    console.log('Time: %d', Date.now());
    next();
  })
  .use(cors())
  .use('/api', articleApi)
  .use('/api', employeeApi)
  .use('/api', rateApi)
  .use('/api', workApi)
  .use('/api', employeeTableApi)
  .use('/api', workTableApi)
  .listen(port, () => console.log(`🌎 app listening on port ${port}!`));
