const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;

const db = pgp('postgres://ouhvltpduxmogf:14bd371be3883441bcb4d6d1a1aa1d990f8677665a7bc203a765069129b8e6c5@ec2-54-247-123-231.eu-west-1.compute.amazonaws.com:5432/d9fej1ob3jfs9u');



app.get('/', function(req, res) {
  res.send(`<div>
  <h1>hello World!</h1>
  <h1>hello World! 22222222 22222 222</h1>
  </div>
  `);
});

db.one('SELECT $1 AS value', 123)
  .then(function(data) {
    console.log('DATA:', data.value);
  })
  .catch(function(error) {
    console.log('ERROR:', error);
  });

app.listen(3000, function() {
  console.log('app listening on port 3000!');
});
