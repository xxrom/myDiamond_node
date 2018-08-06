import { Router } from 'express';
//import { v4 } from 'uuid';
import db from './postgreSQL';

const router = Router();

router.get('/article', function(req, res) {
  // http://localhost:8080/api/employee
  const table = 'article';
  console.log(`${table} path`);

  db.any(`SELECT * FROM ${table}`)
    .then((data) => {
      console.log(table, data);
      res.status(200).send(`<h1>${table}!</h1>`);
    })
    .catch((err) => {
      console.log(err);
      res.status(505);
    });
});

export default router;

// app.listen(port, function() {
//   console.log(`app listening on port ${port}!`);
// });

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
