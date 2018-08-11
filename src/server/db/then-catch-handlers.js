const getThen = (res) => (data) => {
  console.log(data);
  res.status(200).json({ data });
};
const getCatch = (res) => (err) => {
  console.log(`error`, err);
  res.status(505);
};

const postThen = (res) => (data) => {
  console.log(`  return POST`, data);
  res.status(200).json({ data });
};
const postCatch = (res) => (err) => {
  console.log(`error`, err);
  res.status(505).json({ err });
};

const putThen = (res) => (data) => {
  console.log(`  return PUT`, data);
  res.status(200).json({ data });
};
const putCatch = (res) => (err) => {
  console.log(`error`, err);
  res.status(505).json({ err });
};

const deleteThen = (res) => (data) => {
  console.log(`  return DELETE`, data);
  res.status(200).json({ data });
};
const deleteCatch = (res) => (err) => {
  console.log(`error`, err);
  res.status(505).json({ err });
};

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
