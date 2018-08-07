import { Router } from 'express';
import db from './db/postgreSQL';
import * as handlers from './db/then-catch-handlers';

const router = Router();
const table = `employee`;

// http://localhost:8080/api/article
router.get(`/employee`, function(req, res) {
  console.log(`GET: ${table} path`);

  db.any(`SELECT * FROM employee;`)
    .then(handlers.selectThen(res))
    .catch(handlers.selectCatch(res));
});

// curl -d '{"name":"Саша"}' -H "Content-Type: application/json" -X POST http://localhost:8080/api/employee
// Создает полную новую запись
router.post('/employee', function(req, res) {
  console.log(`POST: ${table} path`, req.body);

  db.one(
    `INSERT INTO employee(employee_id, name) VALUES(DEFAULT, $1) RETURNING *;`,
    [req.body.name]
  )
    .then(handlers.postThen)
    .catch(handlers.postCatch);
});

// curl - d '{"name":"Аккакий"}' - H "Content-Type: application/json" - X PUT http://localhost:8080/api/employee/2
// Обновляет запись по ID
router.put(`/employee/:id`, (req, res) => {
  console.log(`PUT: ${table} path`, req.body);

  db.one(
    `UPDATE employee SET name = '${req.body.name}'
      WHERE employee_id = ${req.params.id}
      RETURNING *`
  )
    .then(handlers.putThen)
    .catch(handlers.putCatch);
});

// curl - H "Content-Type: application/json" - X DELETE http://localhost:8080/api/employee/5
// Удаляет запись по id
router.delete(`/employee/:id`, ({ params: { id } }, req) => {
  console.log(`DELETE: ${table} by ID ${id}`);

  db.one(`DELETE FROM employee WHERE employee_id = ${id} RETURNING *;`)
    .then(handlers.deleteThen)
    .catch(handlers.deleteCatch);
});

export default router;

// db.one(`CREATE TABLE employee(
//   employee_id bigserial primary key,
//   name text NOT NULL
// );`);
