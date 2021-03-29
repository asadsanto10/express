const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHnadler/toHandler');

const app = express();
app.use(express.json());

// database connect
mongoose
  .connect('mongodb://localhost:27017/mongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connect success');
  })
  .catch((err) => {
    console.log(err);
  });

// route
app.use('/todo', todoHandler);

// default error handeler

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(3000, () => {
  console.log('listening on port 3000');
});
