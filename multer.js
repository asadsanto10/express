const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// dfine the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const fileEXT = path.extname(file.originalname);
    const fileName = `${file.originalname
      .replace(fileEXT, '')
      .toLowerCase()
      .split(' ')
      .join('_')}_${Date.now()}`;
    cb(null, fileName + fileEXT);
  },
});

// preaper the file file
const upload = multer({
  // dest: './uploads/',
  storage,
  limits: {
    fileSize: 1000000, // 1mb
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'avater') {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg'
      ) {
        cb(null, true);
      } else {
        cb(new Error('only jpg png formated allowd'));
      }
    } else if (file.fieldname === 'doc') {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('only pdf formated allowd'));
      }
    }
  },
});
/* ---------------------- middleware ---------------------*/

const myMiddleware = (req, res, next) => {
  console.log('this is my middleware');
  next();
};

app.use(myMiddleware);

app.get('/', (req, res) => {
  res.send('This is express');
});

// ---------------multer file upload

// single file
// app.post('/', upload.single('avater'), (req, res) => {
//   res.send('file upload with multer');
// });

// mltipule file upload
// app.post('/', upload.array('avater', 3), (req, res) => {
//   res.send('file upload with multer');
// });

// multifile file option
app.post(
  '/',
  upload.fields([
    { name: 'avater', maxcount: 1 },
    { name: 'doc', maxcount: 2 },
  ]),
  (req, res) => {
    console.log(req.files);
    res.send('file upload with multer');
  }
);

// default error handeler
app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send('there was an upload error!');
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send('success');
  }
});

app.listen(3000, () => {
  console.log('listen to port 3000');
});
