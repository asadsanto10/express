const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoHandler = require('./routeHnadler/toHandler');
const userHandler = require('./routeHnadler/userHandler');

const app = express();
app.use(express.json());
dotenv.config({ path: './.env' });
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
app.use('/user', userHandler);

// default error handeler

// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
