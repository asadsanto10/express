/**
 * Title: todo handeler
 * date: 4.03.21
 */

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const todoSchema = require('../modal/tofoSchema');

// middleware to protect
const checkLogin = require('../middleware/checkLogin');

// ?make modal todo
// eslint-disable-next-line new-cap
const Todo = new mongoose.model('Todo', todoSchema);

// ?Instance Methods, Static & Query Helpers -----------------------------

// !Instance Methods
// get active todo
router.get('/active', async (req, res) => {
  const todo = new Todo();
  const data = await todo.findActive();
  res.status(200).json({ data });
});

// get active todo with callback
router.get('/activeCall', (req, res) => {
  const todo = new Todo();
  todo.findActiveCallBack((err, data) => {
    if (!err) {
      res.status(200).json({ data });
    }
  });
});

// ! Static methods
// get find by js
router.get('/js', async (req, res) => {
  const data = await Todo.findByJs();
  res.status(200).json({
    data,
  });
});

// ! query helper
// get find by language
router.get('/language', async (req, res) => {
  const data = await Todo.find().byLanguage('react');
  res.status(200).json({
    data,
  });
});

// get all todo
// router.get('/', async (req, res) => {
//   await Todo.find({ status: 'active' }, (err, todo) => {
//     if (!err) {
//       res.status(200).json({
//         result: todo,
//       });
//     } else {
//       res.status(500).json({ error: 'there is a server side error' });
//     }
//   });
// });

// get todo list to condition
router.get('/', checkLogin, (req, res) => {
  console.log(req.username);
  console.log(req.userid);
  Todo.find({ status: 'active' })
    .select({
      _id: 0,
      __v: 0,
      date: 0,
    })
    .limit(2)
    .exec((err, todo) => {
      if (!err) {
        res.status(200).json({
          result: todo,
        });
      } else {
        res.status(500).json({ error: 'there is a server side error' });
      }
    });
});

// get a todp by id
router.get('/:id', async (req, res) => {
  await Todo.find({ _id: req.params.id }, (err, todo) => {
    if (!err) {
      res.status(200).json({
        result: todo,
      });
    } else {
      res.status(500).json({ error: 'there is a server side error' });
    }
  });
});

// post todo
router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json({
      message: 'Todo wase inserted Successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'there is a server side error' });
  }
});

// post multiple todo
router.post('/all', async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (!err) {
      res.status(200).json({
        message: 'Todo were inserted Successfully',
      });
    } else {
      res.status(500).json({ error: 'there is a server side error' });
    }
  });
});

// update  todo
// router.put('/:id', async (req, res) => {
//   await Todo.updateOne(
//     { _id: req.params.id },
//     {
//       $set: {
//         status: 'active',
//       },
//     },
//     (err) => {
//       if (!err) {
//         res.status(200).json({
//           message: 'Todo was update Successfully',
//         });
//       } else {
//         res.status(500).json({ error: 'there is a server side error' });
//       }
//     }
//   );
// });

// find by update and id
router.put('/:id', async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
        },
      },
      {
        useFindAndModify: false,
        new: true,
      }
    );
    res.status(200).json({
      result,
      message: 'Todo was update Successfully',
    });
  } catch (err) {
    res.status(500).json({ error: 'there is a server side error', err });
  }
});

// delete todo
router.delete('/:id', (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (!err) {
      res.status(200).json({
        message: 'Todo was deleted Successfully',
      });
    } else {
      res.status(500).json({ error: 'there is a server side error' });
    }
  });
});

module.exports = router;
