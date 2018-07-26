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

router.get('/demos', (req, res) => {
  db.any('SELECT * FROM demo_2')
    .then((data) => {
      console.log('demo_2', data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(505);
    });
});

// db.one('CREATE TABLE demo_1(a int);')
//   .then((data) => {
//     console.log(`Data: ${data}`)
//   })
//   .catch((err) => console.log(`error: ${err}`));
// db.one('INSERT INTO demo_1(a) VALUES($1) RETURNING a', [321])
//   .then(data => {
//     console.log(data.id); // print new user id;
//   })
//   .catch(error => {
//     console.log('ERROR:', error); // print error;
//   });

// db.one(`CREATE TABLE demo_2(
//   id bigserial primary key,
//   name varchar(20) NOT NULL,
//   title text NOT NULL,
//   number real default NULL
// );`);

// db.one(`CREATE TABLE main_1(
//   main_id bigserial primary key,
//   date timestamp NOT NULL,
//   name_id text NOT NULL,
//   name text NOT NULL,
//   full_time real NOT NULL,
//   rate_id BIGINT references rates_1(rate_id) NOT NULL
// );`);
// db.one(`CREATE TABLE rates_1(
//   rate_id bigserial primary key,
//   rate_week_day real NOT NULL,
//   rate_week_end real NOT NULL
// );`);

// db.one('INSERT INTO demo_2(name, title, number) VALUES($1, $2, $3) RETURNING name', ['Nikita', 'title long text', 2333.234])
//   .then((name) => console.log('return name ' + name))
//   .catch((err) => console.log('error', err));

// db.any('SELECT * FROM demo_2')
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err));

// db.any("SELECT * FROM demo_1;")
//   .then(function (data) {
//     console.log("demo_1:", data);
//   })
//   .catch(function (error) {
//     console.log("ERROR:", error);
//   });

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
