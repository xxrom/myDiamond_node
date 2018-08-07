import { Router } from 'express';
import db from './db/postgreSQL';
import * as handlers from './db/then-catch-handlers';

const router = Router();
const table = `article`;

// http://localhost:8080/api/article
router.get(`/article`, function(req, res) {
  console.log(`GET: ${table} path`);

  db.any(`SELECT * FROM article;`)
    .then(handlers.selectThen(res))
    .catch(handlers.selectCatch(res));
});

// curl -d '{"work_id": 1, "article": "LIDT-4", "time": 120, "amount": 400, "boxes": 7, "in_box": 60, "plus_box": 40}' -H "Content-Type: application/json" -X POST http://localhost:8080/api/article
// Создает полную новую запись
router.post('/article', function(req, res) {
  console.log(`POST: ${table} path`, req.body);
  const { work_id, article, time, amount, boxes, in_box, plus_box } = req.body;
  db.one(
    `INSERT INTO article(
    article_id, work_id, article, time, amount, boxes, in_box, plus_box
  ) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
    [work_id, article, time, amount, boxes, in_box, plus_box]
  )
    .then(handlers.postThen)
    .catch(handlers.postCatch);
});

// curl -d '{"work_id": 1, "article": "LIDT-4-2", "time": 120, "amount": 400, "boxes": 7, "in_box": 60, "plus_box": 40}' -H "Content-Type: application/json" -X PUT http://localhost:8080/api/article/1
// Обновляет запись по ID
router.put(`/article/:id`, (req, res) => {
  console.log(`PUT: ${table} path`, req.body);

  const { work_id, article, time, amount, boxes, in_box, plus_box } = req.body;

  db.one(
    `UPDATE article SET
      work_id = '${work_id}',
      article = '${article}',
      time = '${time}',
      amount = '${amount}',
      boxes = '${boxes}',
      in_box = '${in_box}',
      plus_box = '${plus_box}'
    WHERE article_id = ${req.params.id}
    RETURNING *;`
  )
    .then(handlers.putThen)
    .catch(handlers.putCatch);
});

// curl -H "Content-Type: application/json" -X DELETE http://localhost:8080/api/article/2
// Удаляет запись по id
router.delete(`/article/:id`, ({ params: { id } }, req) => {
  console.log(`DELETE: ${table} by ID ${id}`);

  db.one(`DELETE FROM article WHERE article_id = ${id} RETURNING *;`)
    .then(handlers.deleteThen)
    .catch(handlers.deleteCatch);
});

export default router;

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
