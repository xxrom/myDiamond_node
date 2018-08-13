import { Router } from 'express';
import db from './db/postgreSQL';
import * as handlers from './db/then-catch-handlers';

const router = Router();
const table = `employee-table`;

// http://localhost:8080/api/employee-table
router.get(`/employee-table`, function(req, res) {
  console.log(`GET: ${table} path`);

  db.any(
    `SELECT * FROM employee, rate WHERE employee.employee_id = rate.employee_id;`
  )
    .then(handlers.getThen(res))
    .catch(handlers.getCatch(res));
});

export default router;
