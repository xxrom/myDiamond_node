import { Router } from 'express';
import db from './db/postgreSQL';
import * as handlers from './db/then-catch-handlers';

const router = Router();
const table = `work`;

// http://localhost:8080/api/work
router.get(`/work`, function(req, res) {
  console.log(`GET: ${table} path`);

  db.any(`SELECT * FROM work;`)
    .then(handlers.getThen(res))
    .catch(handlers.getCatch(res));
});

// curl -d '{"date": "2010-09-29 00:00:00", "employee_id": 2, "name_day_id": 1, "full_time": 480}' -H "Content-Type: application/json" -X POST http://localhost:8080/api/work
// Создает полную новую запись
router.post('/work', function(req, res) {
  console.log(`POST: ${table} path`, req.body);
  const { date, employee_id, name_day_id, full_time } = req.body;
  db.one(
    `INSERT INTO work(
    work_id, date, employee_id, name_day_id, full_time
  ) VALUES(DEFAULT, $1, $2, $3, $4) RETURNING *;`,
    [date, employee_id, name_day_id, full_time]
  )
    .then(handlers.postThen(res))
    .catch(handlers.postCatch(res));
});

// curl -d '{"date": "2010-09-29 00:00:00", "employee_id": 3, "name_day_id": 4, "full_time": 360}' -H "Content-Type: application/json" -X PUT http://localhost:8080/api/work/2
// Обновляет запись по ID
router.put(`/work/:id`, (req, res) => {
  console.log(`PUT: ${table} path`, req.body);

  const { date, employee_id, name_day_id, full_time } = req.body;

  db.one(
    `UPDATE work SET
      date = '${date}',
      employee_id = '${employee_id}',
      name_day_id = '${name_day_id}',
      full_time = '${full_time}'
    WHERE work_id = ${req.params.id}
    RETURNING *;`
  )
    .then(handlers.putThen(res))
    .catch(handlers.putCatch(res));
});

// curl -H "Content-Type: application/json" -X DELETE http://localhost:8080/api/work/4
// Удаляет запись по id
router.delete(`/work/:id`, ({ params: { id } }, res) => {
  console.log(`DELETE: ${table} by ID ${id}`);
  console.log('res', res.status);

  db.one(`DELETE FROM work WHERE work_id = ${id} RETURNING *;`)
    .then(handlers.deleteThen(res))
    .catch(handlers.deleteCatch(res));
});

export default router;

// db.one(`CREATE TABLE work(
//   work_id bigserial primary key,

//   date timestamp NOT NULL,

//   employee_id BIGINT references employee(employee_id) NOT NULL,
//   name_day_id BIGINT NOT NULL,

//   full_time real NOT NULL
// );`);
