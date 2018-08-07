const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
import articleApi from './server/article-api';
import employeeApi from './server/employee-api';

const port = process.env.PORT || 8080;

export default express()
  .use(logger('dev'))
  .use(bodyParser.json()) // Parse (https://github.com/expressjs/body-parser)
  .use(bodyParser.urlencoded({ extended: false }))
  .use('/api', articleApi)
  .use('/api', employeeApi)
  .listen(port, () => console.log(`🌎 app listening on port ${port}!`));
