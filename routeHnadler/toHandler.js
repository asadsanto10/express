const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const todoSchema = require('../modal/tofoSchema');
// ?make modal todo
// eslint-disable-next-line new-cap
const Todo = new mongoose.model('Todo', todoSchema);

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
router.get('/', async (req, res) => {
  await Todo.find({ status: 'active' })
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
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (!err) {
      res.status(200).json({
        message: 'Todo wase inserted Successfully',
      });
    } else {
      res.status(500).json({ error: 'there is a server side error' });
    }
  });
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
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: 'active',
      },
    },
    {
      useFindAndModify: false,
      new: true,
    },
    (err) => {
      if (!err) {
        res.status(200).json({
          message: 'Todo was update Successfully',
        });
      } else {
        res.status(500).json({ error: 'there is a server side error' });
      }
    }
  );
  console.log(result);
});

// delete todo
router.delete('/:id', async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
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
