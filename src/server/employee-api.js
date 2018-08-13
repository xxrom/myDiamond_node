import { Router } from 'express';
import db from './db/postgreSQL';
import * as handlers from './db/then-catch-handlers';

const router = Router();
const table = `employee`;

// http://localhost:8080/api/article
router.get(`/employee`, function(req, res) {
  console.log(`GET: ${table} path`);

  db.any(`SELECT * FROM employee;`)
    .then(handlers.getThen(res))
    .catch(handlers.getCatch(res));
});

// curl -d '{"name":"Саша"}' -H "Content-Type: application/json" -X POST http://localhost:8080/api/employee
// Создает полную новую запись
router.post('/employee', function(req, res) {
  console.log(`POST: ${table} path`, req.body);

  db.one(
    `INSERT INTO employee(employee_id, name) VALUES(DEFAULT, $1) RETURNING *;`,
    [req.body.name]
  )
    .then(handlers.postThen(res))
    .catch(handlers.postCatch(res));
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
    .then(handlers.putThen(res))
    .catch(handlers.putCatch(res));
});

// curl - H "Content-Type: application/json" - X DELETE http://localhost:8080/api/employee/5
// Удаляет запись по id
router.delete(`/employee/:id`, (req, res) => {
  const { id } = req.params;
  console.log(`DELETE: ${table} by ID ${id}`);

  db.one(`DELETE FROM employee WHERE employee_id = ${id} RETURNING *;`)
    .then(handlers.deleteThen(res))
    .catch(handlers.deleteCatch(res));
});

export default router;

// db.one(`CREATE TABLE employee(
//   employee_id bigserial primary key,
//   name text NOT NULL
// );`);
