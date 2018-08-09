const getThen = (res) => (data) => {
  console.log(data);
  res.status(200).json({ body: data });
  // res.status(200).send(`<h1>${JSON.stringify(data)}!</h1>`);
};
const getCatch = (res) => (err) => {
  console.log(`error`, err);
  res.status(505);
};

const postThen = (data) => console.log(`  return POST`, data);
const postCatch = (err) => console.log(`error`, err);

const putThen = (data) => console.log(`  return PUT`, data);
const putCatch = (err) => console.log(`error`, err);

const deleteThen = (data) => console.log(`  return DELETE`, data);
const deleteCatch = (err) => console.log(`error`, err);

export {
  getThen,
  getCatch,
  postThen,
  postCatch,
  putThen,
  putCatch,
  deleteThen,
  deleteCatch,
};
