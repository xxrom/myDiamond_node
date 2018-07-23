var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.send(`<div>
  <h1>hello World!</h1>
  <h1>hello World!</h1>
  </div>
  `);
});

app.listen(3000, function() {
  console.log('app listening on port 3000!');
});
