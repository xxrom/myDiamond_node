const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
import { articleApi, employeeApi, rateApi, workApi } from './server';

const port = process.env.PORT || 8080;

export default express()
  .use(logger('dev'))
  .use(bodyParser.json()) // https://github.com/expressjs/body-parser
  .use(bodyParser.urlencoded({ extended: false }))
  .use('/api', articleApi)
  .use('/api', employeeApi)
  .use('/api', rateApi)
  .use('/api', workApi)
  .listen(port, () => console.log(`🌎 app listening on port ${port}!`));
