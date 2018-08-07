import { Router } from 'express';
import db from './db/postgreSQL';
import * as handlers from './db/then-catch-handlers';

const router = Router();
const table = `rate`;

// http://localhost:8080/api/rate
router.get(`/rate`, function(req, res) {
  console.log(`GET: ${table} path`);

  db.any(`SELECT * FROM ${table}`)
    .then(handlers.selectThen(res))
    .catch(handlers.selectCatch(res));
});

// curl -d '{"employee_id": 2, "start_date": "2001-09-29 00:00:00", "end_date": "2002-09-29 00:00:00", "rate_week_day": 100, "rate_week_end": 150}' -H "Content-Type: application/json" -X POST http://localhost:8080/api/rate
// Создает полную новую запись
router.post('/rate', function(req, res) {
  console.log(`POST: ${table} path`, req.body);
  const {
    employee_id, // не закидываем, но он его проверяет САМ!!! КРУТО!!!
    start_date, // in JS => ath.floor(Date.now() / 1000) in seconds from
    end_date, // "2002-09-29 00:00:00"
    rate_week_day,
    rate_week_end,
  } = req.body;
  db.one(
    `INSERT INTO rate(
    rate_id, employee_id, start_date, end_date, rate_week_day, rate_week_end
  ) VALUES(DEFAULT, $1, $2, $3, $4, $5) RETURNING *;`,
    [employee_id, start_date, end_date, rate_week_day, rate_week_end]
  )
    .then(handlers.postThen)
    .catch(handlers.postCatch);
});

// curl -d '{"employee_id": 2, "start_date": "2001-09-29 00:00:00", "end_date": "2002-09-29 00:00:00", "rate_week_day": 100, "rate_week_end": 150}' -H "Content-Type: application/json" -X PUT http://localhost:8080/api/rate/2
// Обновляет запись по ID
router.put(`/rate/:id`, (req, res) => {
  console.log(`PUT: ${table} path`, req.body);

  const {
    employee_id,
    start_date,
    end_date,
    rate_week_day,
    rate_week_end,
  } = req.body;

  db.one(
    `UPDATE rate SET
      employee_id = '${employee_id}',
      start_date = '${start_date}',
      end_date = '${end_date}',
      rate_week_day = '${rate_week_day}',
      rate_week_end = '${rate_week_end}'
    WHERE rate_id = ${req.params.id}
    RETURNING *;`
  )
    .then(handlers.putThen)
    .catch(handlers.putCatch);
});

// curl -H "Content-Type: application/json" -X DELETE http://localhost:8080/api/rate/2
// Удаляет запись по id
router.delete(`/rate/:id`, ({ params: { id } }, req) => {
  console.log(`DELETE: ${table} by ID ${id}`);

  db.one(`DELETE FROM rate WHERE rate_id = ${id} RETURNING *;`)
    .then(handlers.deleteThen)
    .catch(handlers.deleteCatch);
});

export default router;

// db.one(`CREATE TABLE rate(
//   rate_id bigserial primary key,
//   employee_id BIGINT references employee(employee_id) NOT NULL,

//   start_date timestamp NOT NULL,
//   end_date timestamp NOT NULL,

//   rate_week_day real NOT NULL,
//   rate_week_end real NOT NULL
// );`);
