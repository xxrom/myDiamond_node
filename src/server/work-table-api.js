import { Router } from 'express';
import db from './db/postgreSQL';
import * as handlers from './db/then-catch-handlers';

const router = Router();
const table = `work-table`;

// curl -H "Content-Type: application/json" -X GET http://localhost:8080/api/work-table
router.get(`/work-table`, function(req, res) {
  console.log(`GET: ${table} path`);

  db.any(`SELECT * FROM work, article WHERE work.work_id = article.work_id;`)
    .then(handlers.getThen(res))
    .catch(handlers.getCatch(res));
});

export default router;
