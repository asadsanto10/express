const express = require('express');

const app = express();
// const cookieParser = require('cookie-parser');
// app.enable('case sensitive routing');

// app.get('/', (req, res) => {
//   res.send('This is home page');
// });

// app.post('/ap', (req, res) => {
//   console.log(req.body);
//   res.send('This is page with post request');
// });

// const adminRoute = express.Router();

// app.use(express.json());
// app.use(cookieParser());

// /------------------ request property ------------/
// adminRoute.get('/dashborad', (req, res) => {
// console.log(req.baseUrl);
// console.log(req.originalUrl);
// console.log(req.url);
// console.log(req.path);
// console.log(req.hostname);
// console.log(req.ip);
// console.log(req.method);
// console.log(req.protocol);
// console.log(req.params);
// console.log(req.query);
// console.log(req.body);
//   console.log(req.cookies);
//   res.send('we are in admin dashbord');
// });

// app.use('/admin', adminRoute);

// app.get('/user/:id', (req, res) => {
// console.log(req.baseUrl);
// console.log(req.originalUrl);
// console.log(req.url);
// console.log(req.path);
// console.log(req.hostname);
// console.log(req.ip);
// console.log(req.method);
// console.log(req.protocol);
// console.log(req.params);
// console.log(req.query);
// console.log(req.body);
// console.log(req.cookies);
//   console.log(req.secure);
//   res.send('Hellow world');
// });

// app.post('/user', (req, res) => {
//   console.log(req.body);
//   res.send('this is post');
// });

// app.listen(3000, () => {
//   console.log('Listening on port 3000');
// });

// /------------------ responce property ------------/

app.set('view engine', 'ejs'); // ejs is templte views

// app.get('/about', (req, res) => {
//   console.log(res.headersSent);
//   res.render('pages/about', {
//     name: 'asaduzzaman santo',
//   });
//   console.log(res.headersSent);
// });
app.get('/test', (req, res) => {
  res.send('this is a test');
});
app.get('/about', (req, res) => {
  // res.send('about');
  // res.end();

  // res.json({
  //   name: 'asaduzzaman santo',
  // });

  // res.status(401);
  // res.sendStatus(200);
  // res.format({
  //   'text/plain': () => {
  //     res.send('Hellow');
  //   },
  //   'text/html': () => {
  //     res.render('pages/about', {
  //       name: 'asaduzzaman santo',
  //     });
  //   },
  //   'application/json': () => {
  //     res.json({
  //       message: 'About',
  //     });
  //   },
  //   default: () => {
  //     res.status(406).send('not acceptable');
  //   },
  // });

  // res.cookie('name', 'santo', {
  //   expires: new Date(Date.now() + 8 * 3600000),
  // });

  // res.redirect('/test');
  // res.location('/test');

  res.set('Title', 'asad santo');
  console.log(res.get('Title'));
  res.end();
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
