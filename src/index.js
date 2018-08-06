const express = require('express');
import { Router } from 'express'
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 8080;

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;

const db = pgp('postgres://ouhvltpduxmogf:14bd371be3883441bcb4d6d1a1aa1d990f8677665a7bc203a765069129b8e6c5@ec2-54-247-123-231.eu-west-1.compute.amazonaws.com:5432/d9fej1ob3jfs9u');

const router = Router();

app.get('/', function(req, res) {
  db.any('SELECT * FROM demo_2')
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));

  res.send(`<div>
  <h1>hello World!</h1>
  <h1>hello World! 22222222 22222 222</h1>
  </div>
  `);
});

app.get('/employee', function(req, res) {
  console.log('employee path');
  db.any('SELECT * FROM employee')
    .then((data) => {
      console.log('employee', data);
      res.status(200).send(`<div>
        <h1>hello World!</h1>
        <h1>hello World! 22222222 22222 222</h1>
      </div>
      `);
    })
    .catch((err) => {
      console.log(err);
      res.status(505);
    });
});

db.one('SELECT $1 AS value', 123)
  .then(function(data) {
    console.log('DATA:', data.value);
  })
  .catch(function(error) {
    console.log('ERROR:', error);
  });

app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});





// db.one('INSERT INTO employee(employee_id, name) VALUES($1, $2) RETURNING name', [2, 'Вася'])
//   .then((name) => console.log('return name ', name))
//   .catch((err) => console.log('error', err));

// work, employee, article, rate CREATE TABLES
// db.one(`CREATE TABLE work(
//   work_id bigserial primary key,

//   date timestamp NOT NULL,

//   employee_id BIGINT references employee(employee_id) NOT NULL,
//   name_day_id BIGINT NOT NULL,

//   full_time real NOT NULL
// );`);
// db.one(`CREATE TABLE article(
//   article_id bigserial primary key,
//   work_id BIGINT references work(work_id) NOT NULL,

//   article text NOT NULL,
//   time real NOT NULL,
//   amount BIGINT NOT NULL,
//   boxes BIGINT NOT NULL,
//   in_box BIGINT NOT NULL,

//   plus_box BIGINT NOT NULL
// );`);
// db.one(`CREATE TABLE employee(
//   employee_id bigserial primary key,

//   name text NOT NULL
// );`);
// db.one(`CREATE TABLE rate(
//   rate_id bigserial primary key,
//   employee_id BIGINT references employee(employee_id) NOT NULL,

//   start_date timestamp NOT NULL,
//   end_date timestamp NOT NULL,

//   rate_week_day real NOT NULL,
//   rate_week_end real NOT NULL
// );`);